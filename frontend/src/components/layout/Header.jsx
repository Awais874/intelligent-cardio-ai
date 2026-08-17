import { HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-brand-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <HeartPulse className="h-5 w-5 text-brand-200" />
          <span className="font-display text-lg text-white">CardioSense</span>
        </div>

        <span className="hidden text-xs font-medium uppercase tracking-wide text-brand-200 sm:block">
          Lifestyle Risk Screening
        </span>
      </div>
    </header>
  );
}
