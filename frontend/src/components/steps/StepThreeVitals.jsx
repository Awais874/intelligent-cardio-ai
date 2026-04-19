import { Stethoscope } from "lucide-react";
import FieldCard from "../FieldCard";
import { labels, tooltips, options } from "../../constants/formConfig";

export default function StepThreeVitals({ formData, handleChange }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Stethoscope className="h-5 w-5 text-slate-700" />
        <h3 className="text-lg font-semibold text-slate-900">
          Vitals & Lab Indicators
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FieldCard label={labels.trestbps} tooltip={tooltips.trestbps}>
          <input
            type="number"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            min="80"
            max="250"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </FieldCard>

        <FieldCard label={labels.chol} tooltip={tooltips.chol}>
          <input
            type="number"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            min="100"
            max="600"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </FieldCard>

        <FieldCard label={labels.fbs} tooltip={tooltips.fbs}>
          <select
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.fbs.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FieldCard>

        <FieldCard label={labels.thalach} tooltip={tooltips.thalach}>
          <input
            type="number"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            min="60"
            max="220"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </FieldCard>

        <FieldCard label={labels.ca} tooltip={tooltips.ca}>
          <input
            type="number"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            min="0"
            max="4"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </FieldCard>
      </div>
    </div>
  );
}