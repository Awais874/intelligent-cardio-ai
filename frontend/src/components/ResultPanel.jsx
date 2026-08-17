import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { HeartPulse, Info } from "lucide-react";
import ContributingFactors from "./ContributingFactors";

const RISK_STYLES = {
  Low: { text: "text-risk-low", bg: "bg-risk-low-bg", badge: "bg-risk-low-bg text-risk-low" },
  Moderate: { text: "text-risk-moderate", bg: "bg-risk-moderate-bg", badge: "bg-risk-moderate-bg text-risk-moderate" },
  High: { text: "text-risk-high", bg: "bg-risk-high-bg", badge: "bg-risk-high-bg text-risk-high" },
};

function RiskGauge({ percent, colorVar }) {
  const data = [{ value: percent, fill: colorVar }];
  return (
    <div className="relative mx-auto h-40 w-40">
      <RadialBarChart
        width={160}
        height={160}
        cx="50%"
        cy="50%"
        innerRadius="72%"
        outerRadius="100%"
        barSize={12}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
        <RadialBar background={{ fill: "#e7e2d8" }} dataKey="value" cornerRadius={8} />
      </RadialBarChart>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl text-ink-900">{percent}%</span>
        <span className="text-[11px] text-ink-500">estimated risk</span>
      </div>
    </div>
  );
}

export default function ResultPanel({ result }) {
  const styles = RISK_STYLES[result?.risk_level] ?? RISK_STYLES.Low;
  const colorVar =
    result?.risk_level === "High" ? "#b3352c" : result?.risk_level === "Moderate" ? "#b4790a" : "#2f7a4f";

  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-brand-50 p-2.5">
            <HeartPulse className="h-5 w-5 text-brand-700" />
          </div>
          <div>
            <h3 className="font-display text-xl text-ink-900">CardioSense</h3>
            <p className="text-xs text-ink-500">Lifestyle-based risk screening</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-500">
          Trained on CDC BRFSS survey data (behavioral and health-history indicators, not lab
          results or ECG readings). Meant to prompt a conversation with a clinician, not replace one.
        </p>
      </div>

      {result ? (
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Your result</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>
              {result.risk_level} risk
            </span>
          </div>

          <div className="mt-6">
            <RiskGauge percent={result.risk_percent} colorVar={colorVar} />
          </div>

          <p className="mt-6 text-center font-display text-lg text-ink-900">
            {result.prediction === 1 ? "Risk indicators present" : "No strong risk signal"}
          </p>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-paper p-3.5">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-500" />
            <p className="text-xs leading-5 text-ink-500">{result.message}</p>
          </div>

          <ContributingFactors factors={result.contributing_factors} />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-6 sm:p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-paper">
            <HeartPulse className="h-5 w-5 text-ink-300" />
          </div>
          <h3 className="mt-4 font-display text-lg text-ink-900">Your result will appear here</h3>
          <p className="mt-2 text-sm leading-6 text-ink-500">
            Complete the four sections to generate a risk estimate and see which factors are
            driving it.
          </p>
        </div>
      )}
    </aside>
  );
}
