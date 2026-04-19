function getMetricStatus(type, value) {
  const num = Number(value);

  switch (type) {
    case "bp":
      if (num < 90) return { label: "Low", pos: 15 };
      if (num <= 120) return { label: "Normal", pos: 45 };
      if (num <= 140) return { label: "Elevated", pos: 70 };
      return { label: "High", pos: 88 };

    case "chol":
      if (num < 200) return { label: "Desirable", pos: 45 };
      if (num <= 239) return { label: "Borderline High", pos: 70 };
      return { label: "High", pos: 90 };

    case "thalach":
      if (num < 100) return { label: "Low", pos: 25 };
      if (num <= 170) return { label: "Good", pos: 60 };
      return { label: "High", pos: 85 };

    default:
      return { label: "Unknown", pos: 50 };
  }
}

function getColor(label) {
  if (
    label.includes("Normal") ||
    label.includes("Good") ||
    label.includes("Desirable")
  ) {
    return "text-emerald-600 bg-emerald-100";
  }

  if (
    label.includes("Mild") ||
    label.includes("Borderline") ||
    label.includes("Elevated")
  ) {
    return "text-amber-600 bg-amber-100";
  }

  return "text-rose-600 bg-rose-100";
}

function ConcernCard({ title, value, unit, type, min, max }) {
  const status = getMetricStatus(type, value);
  const colorClass = getColor(status.label);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm leading-5 text-slate-500">{title}</p>

        <div className="rounded-full bg-slate-100 p-2 text-xs text-slate-400">
          ↗
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-end gap-1">
          <span className="text-2xl font-bold text-slate-900">{value}</span>
          {unit ? (
            <span className="whitespace-nowrap text-xs text-slate-500 sm:text-sm">
              {unit}
            </span>
          ) : null}
        </div>

        <span
          className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${colorClass}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-5">
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 opacity-40" />

          <div
            className="absolute top-1/2 h-5 w-1.5 -translate-y-1/2 rounded-full bg-slate-900 shadow"
            style={{ left: `${status.pos}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}

export default function KeyConcerns({ formData }) {
  if (!formData) return null;

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Key Areas of Concern
      </h3>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <ConcernCard
          title="Blood Pressure"
          value={formData.trestbps}
          unit="mmHg"
          type="bp"
          min="80"
          max="180"
        />

        <ConcernCard
          title="Cholesterol"
          value={formData.chol}
          unit="mg/dL"
          type="chol"
          min="100"
          max="300"
        />

        <ConcernCard
          title="Max Heart Rate"
          value={formData.thalach}
          unit="bpm"
          type="thalach"
          min="60"
          max="220"
        />
      </div>
    </div>
  );
}