import FieldCard from "../FieldCard";
import SegmentedField from "../fields/SegmentedField";
import SliderField from "../fields/SliderField";
import { labels, tooltips, options } from "../../constants/formConfig";

export default function StepFourWellbeing({ formData, onFieldChange, errors }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FieldCard label={labels.GenHlth} tooltip={tooltips.GenHlth} error={errors?.GenHlth}>
        <SegmentedField
          name="GenHlth"
          value={formData.GenHlth}
          onChange={onFieldChange}
          options={options.GenHlth}
        />
      </FieldCard>

      <FieldCard label={labels.AnyHealthcare} tooltip={tooltips.AnyHealthcare} error={errors?.AnyHealthcare}>
        <SegmentedField
          name="AnyHealthcare"
          value={formData.AnyHealthcare}
          onChange={onFieldChange}
          options={options.AnyHealthcare}
        />
      </FieldCard>

      <FieldCard label={labels.MentHlth} tooltip={tooltips.MentHlth} error={errors?.MentHlth}>
        <SliderField name="MentHlth" value={formData.MentHlth} onChange={onFieldChange} />
      </FieldCard>

      <FieldCard label={labels.PhysHlth} tooltip={tooltips.PhysHlth} error={errors?.PhysHlth}>
        <SliderField name="PhysHlth" value={formData.PhysHlth} onChange={onFieldChange} />
      </FieldCard>

      <FieldCard label={labels.NoDocbcCost} tooltip={tooltips.NoDocbcCost} error={errors?.NoDocbcCost}>
        <SegmentedField
          name="NoDocbcCost"
          value={formData.NoDocbcCost}
          onChange={onFieldChange}
          options={options.NoDocbcCost}
        />
      </FieldCard>
    </div>
  );
}
