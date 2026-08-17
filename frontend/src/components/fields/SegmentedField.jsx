export default function SegmentedField({ name, value, onChange, options }) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((option) => {
        const active = String(value) === String(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(name, option.value)}
            aria-pressed={active}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-paper text-ink-700 hover:bg-brand-50"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
