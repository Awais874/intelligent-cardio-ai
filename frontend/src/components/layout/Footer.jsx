export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-slate-500">

        <p>
          © {new Date().getFullYear()} CardioSense AI. All rights reserved.
        </p>

        <p className="mt-2">
          This tool provides an estimated screening result for educational purposes only.
          It is not a medical diagnosis and should not replace professional clinical judgment.
        </p>

      </div>
    </footer>
  );
}