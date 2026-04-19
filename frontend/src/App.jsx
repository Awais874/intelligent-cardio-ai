import { useState } from "react";
import AssessmentForm from "./components/AssessmentForm";
import ResultPanel from "./components/ResultPanel";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function App() {
  const [result, setResult] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="flex-1 mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <AssessmentForm
            setResult={setResult}
            setSubmittedData={setSubmittedData}
          />
          <ResultPanel result={result} formData={submittedData} />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}