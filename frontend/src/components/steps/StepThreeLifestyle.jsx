import FieldCard from "../FieldCard";
import SegmentedField from "../fields/SegmentedField";
import { labels, tooltips, options } from "../../constants/formConfig";

const FIELDS = ["Smoker", "PhysActivity", "Fruits", "Veggies", "HvyAlcoholConsump"];

export default function StepThreeLifestyle({ formData, onFieldChange, errors }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {FIELDS.map((name) => (
        <FieldCard key={name} label={labels[name]} tooltip={tooltips[name]} error={errors?.[name]}>
          <SegmentedField
            name={name}
            value={formData[name]}
            onChange={onFieldChange}
            options={options[name]}
          />
        </FieldCard>
      ))}
    </div>
  );
}
