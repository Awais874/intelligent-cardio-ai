import { useState } from "react";
import { Calculator } from "lucide-react";
import FieldCard from "../FieldCard";
import SegmentedField from "../fields/SegmentedField";
import SelectField from "../fields/SelectField";
import { labels, tooltips, options } from "../../constants/formConfig";

function BmiCalculator({ onApply }) {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  const bmi = h > 0 && w > 0 ? w / (h * h) : null;

  return (
    <div className="mt-3 rounded-lg border border-dashed border-border bg-paper p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-500">
        <Calculator className="h-3.5 w-3.5" />
        Don't know your BMI? Calculate it
      </div>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1 text-xs text-ink-500">
          Height (cm)
          <input
            type="number"
            min="0"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="w-24 rounded-md border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-ink-500">
          Weight (kg)
          <input
            type="number"
            min="0"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="w-24 rounded-md border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:border-brand-500"
          />
        </label>
        <button
          type="button"
          disabled={!bmi}
          onClick={() => onApply(Math.round(bmi * 10) / 10)}
          className="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {bmi ? `Use ${Math.round(bmi * 10) / 10}` : "Use this BMI"}
        </button>
      </div>
    </div>
  );
}

export default function StepOnePersonal({ formData, onFieldChange, errors }) {
  const fields = ["Sex", "Age", "Education", "Income", "BMI"];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((name) => (
        <FieldCard
          key={name}
          label={labels[name]}
          tooltip={tooltips[name]}
          error={errors?.[name]}
        >
          {name === "Sex" && (
            <SegmentedField
              name={name}
              value={formData[name]}
              onChange={onFieldChange}
              options={options.Sex}
            />
          )}
          {(name === "Age" || name === "Education" || name === "Income") && (
            <SelectField
              name={name}
              value={formData[name]}
              onChange={onFieldChange}
              options={options[name]}
            />
          )}
          {name === "BMI" && (
            <>
              <input
                type="number"
                step="0.1"
                min="10"
                max="100"
                value={formData.BMI}
                onChange={(e) => onFieldChange("BMI", e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="e.g. 24.5"
                className="w-full rounded-lg border border-border bg-paper px-4 py-2.5 text-sm outline-none transition focus:border-brand-500"
              />
              <BmiCalculator onApply={(v) => onFieldChange("BMI", v)} />
            </>
          )}
        </FieldCard>
      ))}
    </div>
  );
}
