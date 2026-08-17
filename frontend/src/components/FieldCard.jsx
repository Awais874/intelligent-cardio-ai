import { Info } from "lucide-react";
import { useState } from "react";

export default function FieldCard({ label, tooltip, children, error }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`flex flex-col rounded-xl border bg-surface p-4 transition-colors ${
        error ? "border-risk-high" : "border-border"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <label className="text-sm font-medium text-ink-700">{label}</label>

        {tooltip ? (
          <div
            className="relative shrink-0"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="h-4 w-4 cursor-help text-ink-300 transition hover:text-ink-500" />

            {showTooltip && (
              <div className="absolute right-0 top-6 z-50 w-64 rounded-lg bg-ink-900 p-3 text-xs leading-5 text-white shadow-lg">
                {tooltip}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {children}

      {error ? <p className="mt-2 text-xs font-medium text-risk-high">{error}</p> : null}
    </div>
  );
}
