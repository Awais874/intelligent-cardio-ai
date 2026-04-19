import { Waves } from "lucide-react";
import FieldCard from "../FieldCard";
import { labels, tooltips, options } from "../../constants/formConfig";

export default function StepOnePersonal({ formData, handleChange }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Waves className="h-5 w-5 text-slate-700" />
        <h3 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldCard label={labels.age} tooltip={tooltips.age}>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            min="1"
            max="120"
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </FieldCard>

        <FieldCard label={labels.sex} tooltip={tooltips.sex}>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select</option>
            {options.sex.map((item) => (
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