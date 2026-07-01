export default function Abstract() {
  return (
    <section id="abstract" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Abstract</h2>
      <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
        <p>When should an AI agent stop thinking? Current LLM systems either generate a single response and hope for the best, or iterate with ad-hoc retry limits that waste compute on easy problems and quit too early on hard ones. SuperInference answers this question with a formal framework that treats LLM reasoning as inference under uncertainty — giving agents a principled way to know when additional thinking will help and when it won&apos;t.</p>
        <p>The framework is model-agnostic, requires no retraining, and works with any LLM provider. It combines a planning–retrieval–execution loop with information-theoretic stopping criteria and critic-gated memory, enabling agents to iteratively refine their reasoning while preventing error propagation. Applied to competitive benchmarks, the approach produces substantial accuracy improvements — particularly on hard tasks where single-shot approaches consistently fail. The core framework is open source and available on <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="underline hover:no-underline">GitHub</a>.</p>
      </div>
    </section>
  );
}
