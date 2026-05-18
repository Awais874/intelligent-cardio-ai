import { HeartPulse } from "lucide-react";
import FieldCard from "../FieldCard";
import { labels, tooltips, options } from "../../constants/formConfig";

export default function StepTwoSymptoms({ formData, handleChange }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <HeartPulse className="h-5 w-5 text-slate-700" />
        <h3 className="text-lg font-semibold text-slate-900">
          Symptoms & ECG Indicators
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldCard label={labels.cp} tooltip={tooltips.cp}>
          <select
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.cp.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldCard>

        <FieldCard label={labels.restecg} tooltip={tooltips.restecg}>
          <select
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.restecg.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldCard>

        <FieldCard label={labels.exang} tooltip={tooltips.exang}>
          <select
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.exang.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldCard>

        <FieldCard label={labels.slope} tooltip={tooltips.slope}>
          <select
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.slope.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldCard>

        <FieldCard label={labels.oldpeak} tooltip={tooltips.oldpeak}>
          <input
            type="number"
            step="0.1"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            min="0"
            max="10"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </FieldCard>

        <FieldCard label={labels.thal} tooltip={tooltips.thal}>
          <select
            name="thal"
            value={formData.thal}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.thal.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldCard>
      </div>
    </div>
  );
}