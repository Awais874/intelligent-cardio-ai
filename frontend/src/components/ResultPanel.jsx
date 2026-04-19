import { HeartPulse, ShieldCheck } from "lucide-react";
import KeyConcerns from "./keyConcerns";

export default function ResultPanel({ result, formData }) {
  const riskStyles =
    result?.risk_level === "High"
      ? {
          card: "bg-rose-50",
          text: "text-rose-600",
          badge: "bg-rose-100 text-rose-700",
        }
      : result?.risk_level === "Moderate"
      ? {
          card: "bg-amber-50",
          text: "text-amber-600",
          badge: "bg-amber-100 text-amber-700",
        }
      : {
          card: "bg-emerald-50",
          text: "text-emerald-600",
          badge: "bg-emerald-100 text-emerald-700",
        };

  return (
    <aside className="space-y-6">
      <div className="rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
            AI-Powered Health Intelligence
          </p>
        </div>

        <h3 className="mt-4 text-3xl font-bold">
          Intelligent Heart Risk Prediction
        </h3>

        <p className="mt-4 leading-7 text-slate-300">
          This system uses machine learning to analyze patient data and estimate
          heart disease risk, helping identify potential concerns early. It turns
          clinical indicators into clear, structured insights for smarter screening
          and better health awareness.
        </p>
      </div>

      {result ? (
        <div className="rounded-[28px] bg-white p-8 shadow-xl ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 p-2">
                <HeartPulse className="h-5 w-5 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Result</h3>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${riskStyles.badge}`}
            >
              {result.risk_level} Risk
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm text-slate-500">Prediction</p>
              <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {result.prediction === 1
                  ? "Potential Risk Detected"
                  : "No Strong Risk Signal"}
              </h4>
            </div>

            <div className={`rounded-2xl p-5 ${riskStyles.card}`}>
              <p className="text-sm text-slate-500">Estimated Risk</p>
              <h4 className={`mt-2 text-4xl font-bold ${riskStyles.text}`}>
                {result.risk_percent}%
              </h4>
            </div>

            <div className="rounded-2xl bg-slate-100 p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-slate-600" />
                <p className="text-sm text-slate-500">Clinical Note</p>
              </div>
              <p className="mt-2 leading-7 text-slate-700">{result.message}</p>
            </div>
          </div>

          <KeyConcerns formData={formData} />
        </div>
      ) : (
        <div className="rounded-[28px] bg-white p-8 shadow-xl ring-1 ring-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">Result Panel</h3>
          <p className="mt-3 text-slate-600">
            Submit the assessment form to view estimated risk, category, and
            screening guidance.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm text-slate-500">Estimated Risk</p>
              <h4 className="mt-2 text-3xl font-bold text-slate-300">--%</h4>
            </div>

            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-sm text-slate-500">Risk Level</p>
              <h4 className="mt-2 text-2xl font-bold text-slate-300">Waiting</h4>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}