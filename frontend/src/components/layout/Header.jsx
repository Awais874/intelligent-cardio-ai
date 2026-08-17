import { HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#b1c3e0]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <div className="flex items-center gap-3">
          <HeartPulse className="h-6 w-6 text-brand-800" />
          <span className="font-display text-xl text-brand-900">CardioSense</span>
        </div>

        <span className="hidden text-xs font-medium uppercase tracking-wide text-brand-800 sm:block">
          Lifestyle Risk Screening
        </span>
      </div>
    </header>
  );
}
