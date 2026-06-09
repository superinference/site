"use client";

import Section from "@/components/Section";
import Mermaid from "@/components/Mermaid";
import { timelineEvolution } from "@/data/charts";

export default function BackgroundPage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section id="timeline" className="pt-4" title="Background and Related Work" subtitle="Evolution of LLM evaluation and agentic architectures leading to SuperInference (paper Section 1, Fig. 1).">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
            <p><strong>Motivation and Context.</strong> As large language models (LLMs) are deployed across scientific discovery, engineering, and decision-support domains, rigorous assessment of their reasoning, planning, and reliability has become increasingly important. MMLU and SuperGLUE are standard static benchmarks that have been indispensable for tracking aggregate gains from scale and pretraining. However, these benchmarks capture only static snapshots of capability and therefore struggle to characterize multi-step reasoning, iterative planning, and evolving knowledge requirements. Despite rapid scaling, even frontier LLMs achieve only incremental improvements on broad, multi-domain reasoning benchmarks, particularly when evaluated under static, single-shot protocols.</p>
            <p><strong>Limitations of Current Approaches.</strong> Surface-level metrics based on token- or sequence-level overlap (e.g., exact match, BLEU, ROUGE) fail to reflect semantic correctness, intermediate chain-of-thought, or the compositional planning demanded by many downstream applications. Human judgments remain essential for fluency and creativity, but they suffer from annotator bias, limited reproducibility, and poor scalability. These limitations complicate their use as primary evaluation tools, motivating richer evaluation approaches to improve accuracy, robustness, calibration, and behavioral stability under ambiguity and noise.</p>
            <p><strong>Converging Research Threads.</strong> Recent methodological advances address this problem by combining standardized evaluation with dynamic and adversarial probes. Large-scale frameworks such as HELM and PromptBench promote unified protocols that expose failure modes in multi-turn reasoning and adversarial conditions. Comparative and pairwise evaluations expose subtle qualitative differences between model behaviors that are often unclear from aggregated accuracy scores, while dynamic evaluation frameworks introduce evolving test conditions that better approximate deployment settings. A parallel line of research focuses on uncertainty quantification and deviation-aware metrics, using calibration techniques and information-theoretic measures such as entropy, mutual information, and expected information gain to quantify the value of additional evidence or reasoning steps. Meanwhile, LLM architectures are evolving toward agentic systems with planning, tool use, memory, and iterative self-feedback—from chain-of-thought prompting and self-consistency to agentic frameworks like ReAct that interleave reasoning and acting, tool-augmented models, and retrieval-augmented generation.</p>
            <p><strong>SuperInference Integration.</strong> Figure 1 illustrates these converging threads. Building on them, SuperInference is a fully open-source framework integrating embedding-augmented memory, critic-based filtering, and information-theoretic evaluation within an agentic LLM architecture built on the Transformer foundation. The term <em>noisy decision process</em> formalizes the fact that an LLM agent&apos;s intermediate computations, retrieval operations, and critic assessments are stochastic and error-prone. Each reasoning step corresponds to a stochastic transition over latent beliefs, with transition probabilities modulated by retrieval imperfections, critic false positives and negatives, and model-internal variability. This framing enables analysis of multi-step reasoning using tools from partially observable decision processes and information theory, yielding provable bounds on convergence and expected information gain.</p>
          </div>
          <div>
            <Mermaid chart={timelineEvolution} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
              "Static Benchmarks": "MMLU and SuperGLUE: indispensable for tracking aggregate gains from scale and pretraining, but capture only static snapshots and struggle with multi-step reasoning, iterative planning, and evolving knowledge requirements.",
              "Human-Centric Evaluation": "Human judgments remain essential for fluency and creativity, but suffer from annotator bias, limited reproducibility, and poor scalability, complicating their use as primary evaluation tools.",
              "Dynamic & Adversarial Evaluation": "Large-scale frameworks such as HELM and PromptBench promote unified protocols that expose failure modes in multi-turn reasoning and adversarial conditions, introducing evolving test conditions that better approximate deployment settings.",
              "Comparative & Pairwise Evaluation": "Comparative and pairwise evaluations expose subtle qualitative differences between model behaviors that are often unclear from aggregated accuracy scores, particularly for ambiguous or underspecified tasks.",
              "Uncertainty, Calibration & Information-Theoretic Metrics": "Calibration techniques (temperature scaling, Bayesian binning, ensembles) and information-theoretic measures (entropy, mutual information, expected information gain) quantify the value of additional evidence or reasoning steps.",
              "Agentic LLM Architectures": "Chain-of-thought prompting, self-consistency, ReAct (interleaving reasoning and acting), tool-augmented models, retrieval-augmented generation, and multi-agent frameworks that coordinate sub-tasks and maintain external memory.",
              "SuperInference": "Fully open-source framework integrating embedding-augmented memory, critic-based filtering, and information-theoretic evaluation. Formalizes LLM reasoning as a noisy decision process with provable bounds on convergence and expected information gain.",
            }} />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 1.</strong> Timeline showing the evolution of LLM evaluation and agentic architectures leading to SuperInference.</div>
          </div>
        </div>
      </Section>
    </main>
  );
}
