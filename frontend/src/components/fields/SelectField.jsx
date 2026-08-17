import { ChevronDown } from "lucide-react";

export default function SelectField({ name, value, onChange, options, placeholder = "Select" }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full appearance-none rounded-lg border border-border bg-paper px-4 py-2.5 pr-10 text-sm text-ink-900 outline-none transition focus:border-brand-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
    </div>
  );
}
