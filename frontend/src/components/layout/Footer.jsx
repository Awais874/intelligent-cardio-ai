export default function Footer() {
  return (
    <footer className="mt-12 border-t border-blue-100 bg-blue-50">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-slate-500">

        <p className="font-medium text-slate-600">
          © {new Date().getFullYear()} CardioSense AI. All rights reserved.
        </p>

        <p className="mt-2 text-slate-400">
          This tool provides an estimated screening result for educational purposes only.
          It is not a medical diagnosis and should not replace professional clinical judgment.
        </p>

      </div>
    </footer>
  );
}