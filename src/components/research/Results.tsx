import Image from "next/image";

export default function Results() {
  return (
    <section id="results" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Results</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          <p><strong>Benchmark Performance.</strong> We evaluated SuperInference on the DABStep benchmark, a competitive leaderboard for data-science reasoning tasks. On hard tasks — where single-shot approaches typically plateau — SuperInference with Gemini 2.5 Pro achieved a 3.25&times; improvement over the base model, ranking among the top systems on the official leaderboard.</p>
          <p><strong>Diminishing Returns of Deliberation.</strong> A consistent finding across our experiments is that performance gains are sharply concentrated in the first few reasoning rounds. Most successful tasks converge within one to three iterations, after which additional rounds yield negligible improvement. This pattern — reminiscent of diminishing returns in human deliberation — empirically validates the information-theoretic stopping criteria at the core of the framework.</p>
          <p><strong>Read the Paper.</strong> The full analysis includes efficiency–accuracy trade-offs, information-gain dynamics across rounds, task completion patterns, and a detailed comparison with state-of-the-art systems. These results and the formal framework behind them are presented in the paper.</p>
        </div>
        <div>
          <Image src="/plots/fig11_sota_leaderboard.png" alt="SuperInference vs state-of-the-art models on DABStep benchmark (Hard Tasks)" width={1200} height={800} className="w-full h-auto rounded-lg border border-neutral-200 dark:border-white/10" />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 2.</strong> SuperInference vs state-of-the-art models on the DABStep benchmark (Hard Tasks).</div>
        </div>
      </div>
    </section>
  );
}
