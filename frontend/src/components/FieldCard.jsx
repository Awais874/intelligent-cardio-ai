import { Info } from "lucide-react";
import { useState } from "react";

export default function FieldCard({ label, tooltip, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-700">{label}</label>

        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className="h-4 w-4 cursor-pointer text-slate-400 transition hover:text-slate-600" />

          {showTooltip && (
            <div className="absolute right-0 top-6 z-50 w-64 rounded-xl bg-slate-900 p-3 text-xs leading-5 text-white shadow-xl">
              {tooltip}
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}