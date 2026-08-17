export default function SliderField({ name, value, onChange, min = 0, max = 30, unit = "days" }) {
  const numeric = value === "" ? min : Number(value);
  const pct = ((numeric - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-display text-2xl text-ink-900">{numeric}</span>
        <span className="text-xs text-ink-500">{unit}</span>
      </div>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={1}
        value={numeric}
        onChange={(e) => onChange(name, Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand-600"
        style={{
          background: `linear-gradient(to right, var(--color-brand-500) ${pct}%, var(--color-border) ${pct}%)`,
        }}
      />
      <div className="mt-1.5 flex justify-between text-xs text-ink-300">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
