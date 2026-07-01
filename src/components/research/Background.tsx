import Mermaid from "@/components/Mermaid";
import { timelineEvolution } from "@/data/charts";

export default function Background() {
  return (
    <section id="background" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">The Challenge</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
          <p>Despite rapid scaling, frontier LLMs still struggle with tasks that require multi-step reasoning, iterative planning, and self-correction. Standard benchmarks measure single-shot accuracy — they don&apos;t capture whether a model can decompose a hard problem, verify its own intermediate steps, and refine its approach when something goes wrong.</p>
          <p>Meanwhile, agentic frameworks like ReAct, LangChain, and AutoGen have introduced tool use, memory, and iterative loops. But they rely on heuristic retry limits: &quot;try 5 times and stop.&quot; There&apos;s no principled answer to <em>how much reasoning is enough</em> — a question that sits at the intersection of information theory, decision processes, and cognitive science.</p>
          <p>SuperInference brings these threads together. By formalizing LLM reasoning as a noisy decision process, we can apply tools from information theory and partially observable decision processes to derive when additional reasoning is expected to help — and when it&apos;s time to stop.</p>
        </div>
        <div>
          <Mermaid chart={timelineEvolution} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
            "Static Benchmarks": "Standard benchmarks like MMLU capture aggregate capability but miss multi-step reasoning and iterative planning.",
            "Human-Centric Evaluation": "Essential for fluency and creativity, but limited by annotator bias and poor scalability.",
            "Dynamic & Adversarial Evaluation": "Frameworks like HELM and PromptBench introduce evolving test conditions closer to real deployment.",
            "Comparative & Pairwise Evaluation": "Expose qualitative differences between models invisible in aggregate accuracy scores.",
            "Uncertainty, Calibration & Information-Theoretic Metrics": "Information-theoretic measures quantify the value of additional reasoning steps.",
            "Agentic LLM Architectures": "Chain-of-thought, ReAct, tool-augmented models, and retrieval-augmented generation.",
            "SuperInference": "Integrates memory, critic-based filtering, and information-theoretic stopping into a unified framework.",
          }} />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 1.</strong> Converging research threads leading to SuperInference.</div>
        </div>
      </div>
    </section>
  );
}
