import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Abstract - SuperInference",
  description: "Feedback-augmented, information-theoretic, and open-source framework for iterative reasoning in LLMs.",
};

export default function AbstractPage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section id="abstract" title="Abstract" subtitle="Feedback-augmented, information-theoretic, and open-source framework for iterative reasoning in LLMs.">
        <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
          <p>We introduce SuperInference, a feedback-augmented, open-source architecture for large-language-model (LLM) agents designed for complex programming and multi-step reasoning. This project is a collaboration between the Departamento de Sistemas Informáticos y Computación and the Departamento de Física de la Tierra y Astrofísica at Universidad Complutense de Madrid, and Red Hat (Emerging Partnership Engineering, Ecosystem Engineering).</p>
          <p>Existing LLM agents largely rely on single-shot prompting or heuristic, ad hoc prompt iteration. As a result, they often lack principled mechanisms for reasoning under uncertainty or for determining when additional interaction is beneficial—particularly in resource-constrained settings where retraining or architectural modification is infeasible. We frame LLM reasoning as feedback-driven inference with measurable information gain, enabling SuperInference to improve reliability and providing a theoretical account of iterative, multi-turn reasoning without modifying the underlying model.</p>
          <p>The system integrates an explicit planner, a task router, and an embedding-based memory, enabling the agent to iteratively refine its actions using execution feedback. The approach is model-agnostic and requires no architectural changes. We provide AMI (Agentic Multi-step Inference)—available as a VS Code extension and a terminal CLI, with an OpenClaw plugin in development—for interactive experimentation, and a formalization of the agent&apos;s operation as a partially observable decision process, yielding probabilistic and information-theoretic bounds that link retrieval quality, memory updates, and iteration budgets to success.</p>
          <p>To assess SuperInference, we introduce metrics for semantic fidelity, calibration, and behavioral stability, applied to the DABStep framework. Across algorithmic reasoning, code debugging, and multi-step problem solving, SuperInference raises Gemini 2.5 Pro performance from 12.7% to 41.3%. All resources are released under open-source licenses and are publicly available through the project website and <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="underline hover:no-underline">GitHub organization</a>.</p>
        </div>
      </Section>
    </main>
  );
}
