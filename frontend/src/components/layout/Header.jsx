import { HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-2 backdrop-blur">
            <HeartPulse className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              CardioSense AI
            </h1>
            <p className="text-sm text-slate-300">
              AI-Powered Cardiovascular Risk Assessment
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur md:block">
          Clinical Decision Support
        </div>
      </div>
    </header>
  );
}