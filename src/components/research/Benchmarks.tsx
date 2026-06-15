import Image from "next/image";

export default function Benchmarks() {
  return (
    <section id="benchmarks" className="scroll-mt-20 space-y-12">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Benchmarks</h2>

      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>Competitive Performance.</strong> Figure 5 compares SuperInference with leading models on the DABStep Hard Tasks dataset. The y-axis reports accuracy (higher is better), while the x-axis lists the state-of-the-art models. Using Gemini 2.5 Pro as the base model, SuperInference achieves substantially improved results, particularly on hard tasks where iterative refinement is most beneficial. Submitted to the official DABStep leaderboard, the system ranked third place on hard data-scientist-oriented tasks (as of December 2025). Results are shown in sorted order, with the best-performing models placed on the left.</p>
            <p><strong>Evidence Accumulation.</strong> These results support our hypothesis that modeling reasoning as a partially observable process and accumulating evidence across rounds improves accuracy. Interpreting each attempt as a noisy, evidence-bearing sample transforms inference from a single-shot prediction into a structured evidence-accumulation process with diminishing returns. Performance gains are strongly concentrated in the first few refinement rounds—most successful tasks terminate within one to three iterations, after which success rates rapidly saturate.</p>
            <p><strong>Fair Evaluation.</strong> All tasks with ground-truth labels are evaluated under identical conditions, ensuring comparability. The analysis accounts for True Positives, True Negatives, False Positives, and False Negatives, providing a complete picture of the framework&apos;s performance across all outcomes.</p>
          </div>
          <div>
            <Image src="/plots/fig11_sota_leaderboard.png" alt="SuperInference vs state-of-the-art models on DABStep benchmark (Hard Tasks)" width={1200} height={800} className="w-full h-auto rounded-lg border border-neutral-200 dark:border-white/10" />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 5.</strong> SuperInference vs state-of-the-art models on the DABStep benchmark (Hard Tasks dataset).</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="lg:order-2">
            <Image src="/plots/fig53_time_eig_efficiency_comparison.png" alt="Efficiency analysis: time per round and information-gain efficiency" width={1200} height={800} className="w-full h-auto rounded-lg border border-neutral-200 dark:border-white/10" />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 6.</strong> Efficiency analysis: time per round and information-gain efficiency.</div>
          </div>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7 lg:order-1">
            <p><strong>Time-Per-Round Analysis.</strong> Panel (a) shows the mean time per round given the number of rounds required to predict a solution. Bubble color denotes the success rate for tasks terminating in each round, while bubble size indicates the number of problems solved in that round. The mean time per round increases with iteration count, reflecting the increasing complexity of the tasks. The color gradient reflects a <em>selection effect</em>: tasks that terminate early (rounds 1–2) are inherently easier and therefore exhibit higher success rates (green), while tasks requiring more rounds (4+) are more complex and ultimately fail despite additional iterations (red). More rounds do not cause failure—instead, difficult tasks both require more rounds and are less likely to succeed.</p>
            <p><strong>EIG Efficiency Trends.</strong> Panel (b) shows Expected Information Gain (EIG) efficiency, which decreases with the number of rounds—early rounds extract most of the available information, reaching correct predictions quickly. Both panels show that no problems were solved with 6 or 7 rounds; after the 4th round the agent was not able to correctly predict any problem, indicating a potential stopping rule at round 4. This analysis informs optimal stopping criteria, balancing accuracy gains against computational costs.</p>
            <p><strong>Efficiency-Accuracy Trade-offs.</strong> Later iterations incur higher latency while contributing progressively less information. This behavior motivates adaptive stopping criteria that terminate refinement once expected information gain falls below a task-dependent threshold. The dashed line in panel (a) shows a linear trend fit to illustrate the increasing time cost. Each data point represents the mean over all tasks terminating at that round, with error bars indicating standard deviation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>Task Completion Dynamics.</strong> Panel (a) shows the number of tasks terminating at each round together with cumulative success and failure rates. The left y-axis shows task count (bars), while the right y-axis shows cumulative rates (lines). Most tasks terminate within the first few iterations, with a pronounced peak at rounds 1–3, while both cumulative success and failure curves rapidly saturate thereafter. This behavior indicates that the majority of useful information is acquired early in the reasoning process, and supports the interpretation of SuperInference as an evidence-accumulating process with a natural stopping point, rather than an open-ended iterative loop.</p>
            <p><strong>Code Complexity Analysis.</strong> Panel (b) relates final code length (x-axis) to task success rate (y-axis), with bubble size indicating task frequency. Shorter solutions are associated with higher success rates, whereas longer code refinements exhibit a monotonic decline in performance. This trend suggests that excessive refinement often reflects uncertainty or error accumulation, while concise updates are more reliable. Together, these results motivate efficiency-aware stopping strategies that balance accuracy gains against computational cost, and empirically validate the event-driven design principles underlying SuperInference.</p>
            <p><strong>A Unified Multi-Metric Behavioral Lens.</strong> Beyond accuracy, SuperInference tracks belief evolution, task termination patterns, and EIG efficiency across rounds. In combination, these metrics reveal behavioral patterns—such as early termination for easy tasks, diminishing EIG with iteration depth, and inverse correlation between code length and success—that remain invisible under static, single-shot benchmarks. This supports multi-dimensional, noise-aware evaluation pipelines for agentic LLMs.</p>
          </div>
          <div>
            <Image src="/plots/fig54_task_completion_code_efficiency.png" alt="Task completion dynamics and code-refinement efficiency" width={1200} height={800} className="w-full h-auto rounded-lg border border-neutral-200 dark:border-white/10" />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 7.</strong> Task completion dynamics and code-refinement efficiency.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
