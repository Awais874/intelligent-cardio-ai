import { CircleCheck, TriangleAlert } from "lucide-react";

export default function ContributingFactors({ factors }) {
  if (!factors || factors.length === 0) {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-risk-low bg-risk-low-bg p-4">
        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-risk-low" />
        <p className="text-sm leading-6 text-ink-700">
          None of your answers matched the model's flagged risk indicators. That's a reassuring
          sign, not a guarantee.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-ink-900">What's driving this estimate</h4>
      <p className="mt-1 text-xs text-ink-500">
        Ranked by how much weight the model places on each factor, filtered to the ones your
        answers flagged.
      </p>

      <ul className="mt-4 space-y-2.5">
        {factors.map((factor) => (
          <li
            key={factor.feature}
            className="flex items-start gap-3 rounded-xl border border-border bg-paper p-3.5"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-risk-moderate" />
            <div>
              <p className="text-sm font-medium text-ink-900">{factor.label}</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-500">{factor.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
