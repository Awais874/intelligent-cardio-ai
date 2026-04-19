import { useState } from "react";
import {
  Activity,
  HeartPulse,
  ShieldAlert,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { initialState } from "../constants/formConfig";
import { predictHeartRisk } from "../services/api";
import StepOnePersonal from "./steps/StepOnePersonal";
import StepTwoSymptoms from "./steps/StepTwoSymptoms";
import StepThreeVitals from "./steps/StepThreeVitals";

export default function AssessmentForm({ setResult, setSubmittedData }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value !== "" && Number(value) < 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateForm = () => {
    if (Number(formData.age) < 1 || Number(formData.age) > 120) {
      return "Age must be between 1 and 120.";
    }

    if (Number(formData.trestbps) < 80 || Number(formData.trestbps) > 250) {
      return "Resting blood pressure must be between 80 and 250.";
    }

    if (Number(formData.chol) < 100 || Number(formData.chol) > 600) {
      return "Cholesterol must be between 100 and 600.";
    }

    if (Number(formData.thalach) < 60 || Number(formData.thalach) > 220) {
      return "Max heart rate must be between 60 and 220.";
    }

    if (Number(formData.oldpeak) < 0 || Number(formData.oldpeak) > 10) {
      return "Oldpeak must be between 0 and 10.";
    }

    if (Number(formData.ca) < 0 || Number(formData.ca) > 4) {
      return "Number of major vessels must be between 0 and 4.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    try {
      setSubmittedData(formData);
      const data = await predictHeartRisk(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend or get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[28px] bg-white p-8 shadow-xl ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3">
          <HeartPulse className="h-6 w-6 text-slate-800" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Heart Risk Assessment
          </h2>
          <p className="mt-1 text-slate-600">
            Enter patient indicators to generate a screening estimate.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-slate-600" />
            <p className="text-sm font-medium text-slate-700">Clinical Inputs</p>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Structured patient indicators used for risk estimation.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-slate-600" />
            <p className="text-sm font-medium text-slate-700">Screening Tool</p>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Designed for educational and screening support purposes.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-slate-600" />
            <p className="text-sm font-medium text-slate-700">Not Diagnosis</p>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            The result should not replace a clinician’s medical judgment.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-600">
          <span>Assessment Progress</span>
          <span>Step {step} of 3</span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div
            className={`rounded-xl p-3 ${
              step >= 1
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            Personal
          </div>
          <div
            className={`rounded-xl p-3 ${
              step >= 2
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            Symptoms
          </div>
          <div
            className={`rounded-xl p-3 ${
              step >= 3
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            Vitals
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        {step === 1 && (
          <StepOnePersonal formData={formData} handleChange={handleChange} />
        )}

        {step === 2 && (
          <StepTwoSymptoms formData={formData} handleChange={handleChange} />
        )}

        {step === 3 && (
          <StepThreeVitals formData={formData} handleChange={handleChange} />
        )}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-lg transition hover:opacity-95"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Generate Screening Result"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}