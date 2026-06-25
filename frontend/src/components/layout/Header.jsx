import { HeartPulse, ShieldPlus } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/20 p-2">
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

        
        <div className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white md:flex">
          <ShieldPlus className="h-4 w-4" />
          Clinical Decision Support
        </div>
      </div>
    </header>
  );
}