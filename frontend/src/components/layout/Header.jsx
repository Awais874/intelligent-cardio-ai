<<<<<<< HEAD
import { HeartPulse, ShieldPlus } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-700 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/20 p-2">
=======
import { HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-2 backdrop-blur">
>>>>>>> 428d4597c850bfc36abbcbdcecd7fd698cb418b0
            <HeartPulse className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              CardioSense AI
            </h1>
<<<<<<< HEAD
            <p className="text-sm text-blue-100">
=======
            <p className="text-sm text-slate-300">
>>>>>>> 428d4597c850bfc36abbcbdcecd7fd698cb418b0
              AI-Powered Cardiovascular Risk Assessment
            </p>
          </div>
        </div>

<<<<<<< HEAD
        
        <div className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white md:flex">
          <ShieldPlus className="h-4 w-4" />
=======
        {/* RIGHT */}
        <div className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur md:block">
>>>>>>> 428d4597c850bfc36abbcbdcecd7fd698cb418b0
          Clinical Decision Support
        </div>
      </div>
    </header>
  );
}