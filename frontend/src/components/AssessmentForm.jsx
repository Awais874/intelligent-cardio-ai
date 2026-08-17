import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MotionStep = motion.div;
import {
  Activity,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { initialState, steps } from "../constants/formConfig";
import { predictHeartRisk } from "../services/api";
import StepOnePersonal from "./steps/StepOnePersonal";
import StepTwoHealthHistory from "./steps/StepTwoHealthHistory";
import StepThreeLifestyle from "./steps/StepThreeLifestyle";
import StepFourWellbeing from "./steps/StepFourWellbeing";

// Must stay index-aligned with `steps` in constants/formConfig.js.
const STEP_COMPONENTS = [StepOnePersonal, StepTwoHealthHistory, StepThreeLifestyle, StepFourWellbeing];

function validateStep(stepIndex, formData) {
  const errors = {};
  const step = steps[stepIndex];

  for (const field of step.fields) {
    if (formData[field] === "" || formData[field] === null || formData[field] === undefined) {
      errors[field] = "This field is required.";
    }
  }

  if (formData.BMI !== "" && (Number(formData.BMI) < 10 || Number(formData.BMI) > 100)) {
    errors.BMI = "Enter a BMI between 10 and 100.";
  }

  return errors;
}

export default function AssessmentForm({ setResult }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await predictHeartRisk(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      setSubmitError("Could not reach the prediction service. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const StepComponent = STEP_COMPONENTS[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-brand-50 p-2.5">
          <Activity className="h-5 w-5 text-brand-700" />
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink-900">Risk Assessment</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-500">
            21 questions about your health history, habits, and wellbeing. No lab results needed.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-ink-500">
          <span>{steps[step].title}</span>
          <span>{step + 1} / {steps.length}</span>
        </div>

        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-brand-600" : "bg-border"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-sm text-ink-500">{steps[step].description}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <AnimatePresence mode="wait">
          <MotionStep
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <StepComponent formData={formData} onFieldChange={handleFieldChange} errors={errors} />
          </MotionStep>
        </AnimatePresence>

        {submitError ? (
          <div className="mt-6 flex items-start gap-2 rounded-lg border border-risk-high bg-risk-high-bg px-4 py-3 text-sm text-risk-high">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {submitError}
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              <ShieldCheck className="h-4 w-4" />
              {loading ? "Analyzing…" : "Get my result"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
