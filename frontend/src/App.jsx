import { useState } from "react";
import AssessmentForm from "./components/AssessmentForm";
import ResultPanel from "./components/ResultPanel";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <AssessmentForm setResult={setResult} />
          <div className="lg:sticky lg:top-8">
            <ResultPanel result={result} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}