export default function Footer() {
  return (
    <footer className="bg-brand-900">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-brand-100">
        <p className="font-medium text-white">
          © {new Date().getFullYear()} CardioSense
        </p>
        <p className="mt-2 max-w-2xl leading-6">
          Built on self-reported CDC BRFSS survey data. This estimate reflects statistical
          association with lifestyle and health-history factors. It is not a clinical diagnosis
          and should not replace advice from a healthcare provider.
        </p>
      </div>
    </footer>
  );
}
