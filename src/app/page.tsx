"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Mermaid from "@/components/Mermaid";
import Section from "@/components/Section";
import MotionCard from "@/components/MotionCard";
import CopyButton from "@/components/CopyButton";

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54 0-.26-.01-1.12-.02-2.03-3.11.68-3.77-1.32-3.77-1.32-.5-1.27-1.22-1.6-1.22-1.6-.99-.68.07-.66.07-.66 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.68-1.45-2.48-.28-5.08-1.24-5.08-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.4.11-2.92 0 0 .94-.3 3.08 1.15A10.7 10.7 0 0 1 12 6.8c.95 0 1.9.13 2.79.38 2.14-1.46 3.08-1.15 3.08-1.15.61 1.52.23 2.64.11 2.92.72.78 1.16 1.78 1.16 3 0 4.3-2.61 5.25-5.1 5.53.39.34.73 1.01.73 2.04 0 1.47-.01 2.66-.01 3.02 0 .3.2.64.78.53A10.77 10.77 0 0 0 23.23 11.7C23.23 5.46 18.27.5 12 .5z"/>
  </svg>
);

// Timeline: Evolution of LLM evaluation (from 02_results.tex Introduction)
const timelineEvolution = `flowchart TD
  Bench["Static Benchmarks<br/>(MMLU, SuperGLUE)"]
  Human["Human-Centric<br/>Evaluation"]
  Dynamic["Dynamic &amp; Adversarial<br/>Evaluation<br/>(HELM, PromptBench)"]
  Comp["Comparative &amp;<br/>Pairwise Evaluation"]
  Noise["Uncertainty, Calibration<br/>&amp; Information-Theoretic<br/>Metrics"]
  Agent["Agentic LLM<br/>Architectures<br/>(CoT, ReAct, RAG)"]
  Super["SuperInference<br/>Feedback-Augmented<br/>MCP Framework"]
  
  Bench -->|limitations| Human
  Human -->|scalability gap| Dynamic
  Dynamic -->|complementary| Comp
  Comp -->|parallel strand| Noise
  Noise -->|convergence| Agent
  Agent -->|formalization| Super
  
  style Bench fill:#1e3a5f,color:#ffffff
  style Human fill:#2d5a3d,color:#ffffff
  style Dynamic fill:#5a4a1e,color:#ffffff
  style Comp fill:#8b5a2b,color:#ffffff
  style Noise fill:#5a3d7a,color:#ffffff
  style Agent fill:#2d5a5a,color:#ffffff
  style Super fill:#8b2d2d,color:#ffffff
`;

// PRE Architecture: Event-driven PRE loop (from 02_results.tex fig:combined-arch panel a)
const preArchitecture = `flowchart TD
  Event["Event e_t<br/>(spike)"]
  Planner["Planner<br/>(policy π, belief b_t)"]
  Retriever["Retriever<br/>(action space 𝒜)"]
  Memory["External Memory<br/>M_t"]
  Executor["Executor<br/>(action space 𝒜)"]
  Critic["Critic<br/>(𝒵, α, β)"]
  
  Event -->|triggers| Planner
  Planner -->|query q_t| Retriever
  Retriever <-->|read/write| Memory
  Retriever -->|context m̃_t| Executor
  Executor -->|candidate a_t| Critic
  Critic -->|"c_t: approve/reject"| Memory
  Critic -.->|"feedback o_{t+1}"| Planner
  
  style Event fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style Planner fill:#1e3a5f,color:#ffffff
  style Retriever fill:#8b5a2b,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
  style Executor fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
`;

// Event-driven PRE stages example (from 03_method.tex fig:event-driven-combined)
const eventDrivenStages = `flowchart TD
  E0["Event e₀"]
  Obs["Observation:<br/>Receive task x"]
  Task["Task x: 50 students,<br/>40% are men. If 10 men leave,<br/>how many remain?"]
  
  E1["Event e₁"]
  Plan["Planner decomposes<br/>task into queries"]
  SQ1["q₀: How many men<br/>originally? (50 × 0.4)"]
  SQ2["q₁: After 10 leave,<br/>how many remain?"]
  
  E2["Event e₂"]
  Ret1["Retriever<br/>m̃₀ ~ C_η"]
  Exec1["Executor → a₀"]
  SA1["a₀ = 20 men"]
  Crit1["Critic → c₀"]
  
  Ret2["Retriever<br/>m̃₁ from M₁"]
  Exec2["Executor → a₁"]
  SA2["a₁ = 10 men<br/>(20 − 10)"]
  Crit2["Critic → c₁"]
  
  Mem["Memory M_{t+1}<br/>= M_t ∪ {(q_t, a_t)}"]
  
  E0 -->|triggers| Obs
  Obs --> Task
  E1 -->|triggers| Plan
  Plan --> SQ1
  Plan --> SQ2
  E2 -->|triggers| SQ2
  SQ1 --> Ret1
  Ret1 --> Exec1
  Exec1 --> SA1
  SA1 --> Crit1
  SQ2 --> Ret2
  Ret2 --> Exec2
  Exec2 --> SA2
  SA2 --> Crit2
  Crit1 -->|"c₀ = approve"| Mem
  Crit2 -->|"c₁ = approve"| Mem
  Crit1 -.->|"if rejected: retry"| Plan
  
  style E0 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style E1 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style E2 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style Plan fill:#1e3a5f,color:#ffffff
  style Mem fill:#5a5a1e,color:#ffffff
  style Ret1 fill:#8b5a2b,color:#ffffff
  style Ret2 fill:#8b5a2b,color:#ffffff
  style Exec1 fill:#2d5a3d,color:#ffffff
  style Exec2 fill:#2d5a3d,color:#ffffff
  style Crit1 fill:#5a3d7a,color:#ffffff
  style Crit2 fill:#5a3d7a,color:#ffffff
`;

// Simple PRE loop (from Algorithm 1 in 03_method.tex)
const preLoop = `flowchart TD
  Planner["Planner<br/>(policy π)"]
  Retriever["Retriever"]
  Executor["Executor"]
  Critic["Critic<br/>(α, β)"]
  Memory["Memory M_t"]
  
  Planner -->|"query q_t"| Retriever
  Retriever -->|"context m̃_t"| Executor
  Executor -->|"candidate a_t"| Critic
  Critic -->|"c_t → update M_{t+1}"| Memory
  Memory -.->|"observation o_{t+1}"| Planner
  
  style Planner fill:#1e3a5f,color:#ffffff
  style Retriever fill:#8b5a2b,color:#ffffff
  style Executor fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
`;

// Noisy retrieval and critic gating (from 02_results.tex fig:combined-arch panel b)
const noisyRetrieval = `flowchart TD
  Query["Planner query<br/>q_t"]
  Channel["Retrieval channel<br/>C_η"]
  Context["Context<br/>m̃_t ~ C_η(m_t)"]
  Exec["Executor<br/>→ a_t"]
  Critic["Critic<br/>(α, β)"]
  PPV["PPV:<br/>P(correct|approve)"]
  Memory["Memory<br/>M_{t+1}"]
  
  Query --> Channel
  Channel -->|"noise η, p(η)"| Context
  Context --> Exec
  Exec -->|"candidate a_t"| Critic
  Critic --> PPV
  PPV -->|"approve"| Memory
  Critic -.->|"reject"| Query
  
  style Query fill:#1e3a5f,color:#ffffff
  style Channel fill:#8b5a2b,color:#ffffff
  style Context fill:#2d5a5a,color:#ffffff
  style Exec fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
  style PPV fill:#5a3d7a,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
`;

// VS Code extension integration (from 03_method.tex Implementation section)
const vscode = `flowchart TD
  UI["UI<br/>(Developer Interface)"]
  Extension["AMI VS Code<br/>Extension"]
  Client["AMI MCP Client<br/>(validation, retry,<br/>schema fidelity)"]
  Server["AMI MCP Server<br/>(PRE loop, belief updates,<br/>memory gating, logging)"]
  Tools["Tools<br/>(MCP)"]
  Codebase["Codebase<br/>(Files)"]
  DABStep["DABStep<br/>(Benchmark)"]
  
  UI --> Extension
  Extension --> Client
  Client --> Server
  Server --> Tools
  Server --> Codebase
  Server --> DABStep
  Codebase -.->|"context"| Client
  DABStep -.->|"ground-truth<br/>verifiers"| Server
  
  style UI fill:#1e3a5f,color:#ffffff
  style Extension fill:#8b5a2b,color:#ffffff
  style Client fill:#2d5a5a,color:#ffffff
  style Server fill:#2d5a3d,color:#ffffff
  style Tools fill:#5a3d7a,color:#ffffff
  style Codebase fill:#5a5a1e,color:#ffffff
  style DABStep fill:#7a3d5a,color:#ffffff
`;

const basicLoop = preLoop;
const deepAgent = preArchitecture;
const embeddings = noisyRetrieval;
const feedback = eventDrivenStages;

// const roadmap = `gantt
//     title Roadmap
//     dateFormat  YYYY-MM-DD
//     section Milestones
//     Feature A     :done,    a1, 2025-05-01, 2025-05-15
//     Feature B     :active,  a2, 2025-05-15, 2025-08-01
//     Feature C     :        a3, 2025-08-01, 2025-10-01
//     Feature D     :        a4, 2025-09-01, 2025-11-01
// `;

const papers = [
  {
    id: 1,
    title: "SuperInference: Supervised Inference for Partially Observable Environments",
    venue: "ArXiv, 2026",
    doi: "https://doi.org/xx.xxxx/x.xxxxx.xxxx.xx.xxx",
    summary:
      "A feedback-augmented, information-theoretic, and open-source framework for iterative reasoning in large language models.",
    authors: "Carlos Camacho-González and Cristina Catalán-Torrecilla and Luis Llana and Alberto Núñez and Luis Tomás",
    year: "2026",
    eprint: "XXXX.XXXXX",
    archivePrefix: "arXiv",
    primaryClass: "cs.AI",
    get bibtexId() {
      // Generate ID from first author's last name (simplified) and year
      const firstAuthor = this.authors.split(" and ")[0];
      const lastName = firstAuthor.split(" ").pop()?.toLowerCase().replace(/[^a-z]/g, "") || "superinference";
      return `superinference_${lastName}_${this.year}`;
    },
    get bibtex() {
      const doiNumber = this.doi.replace("https://doi.org/", "");
      return `@misc{${this.bibtexId},\n  title        = {${this.title}},\n  subtitle     = {${this.summary}},\n  author       = {${this.authors}},\n  year         = {${this.year}},\n  doi          = {${doiNumber}},\n  eprint       = {${this.eprint}},\n  archivePrefix= {${this.archivePrefix}},\n  primaryClass = {${this.primaryClass}}\n}`;
    },
  },
  // {
  //   id: 2,
  //   title: "Validating Reasoning with Programmatic Checks",
  //   venue: "ArXiv, 2026",
  //   doi: "https://doi.org/10.1016/j.aprim.2020.09.002",
  //   summary:
  //     "Studies automatic validators for multi-step reasoning and their effect on accuracy and reproducibility.",
  //   bibtex: `@misc{superinference_paper_b_2025,\n  title        = {Validating Reasoning with Programmatic Checks},\n  author       = {Your Name and Collaborator Name},\n  year         = {2025},\n  doi          = {10.1016/j.aprim.2020.09.002},\n  eprint       = {YYYY.YYYYY},\n  archivePrefix= {arXiv},\n  primaryClass = {cs.AI}\n}`,
  // },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const navLinks = [
    { href: "#abstract", label: "Abstract" },
    { href: "#timeline", label: "Evolution" },
    { href: "#overview", label: "Loop" },
    { href: "#architecture", label: "Event" },
    { href: "#embeddings", label: "Retrieval" },
    { href: "#results", label: "Results" },
    { href: "#feedback", label: "Example" },
    { href: "#editor", label: "AMI" },
    { href: "#copy", label: "Works" },
    { href: "#research", label: "Research" },
    { href: "#funding", label: "Funding" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="SuperInference" width={28} height={28} />
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-white">SuperInference</span>
          </div>
          <nav className="hidden sm:flex gap-4 text-sm text-neutral-700 dark:text-neutral-300 items-center">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
              <GitHubIcon />
            </a>
          </nav>
          {/* Mobile menu button */}
          <button
            className="sm:hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="sm:hidden border-t border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white py-2 w-full text-left transition-colors"
              >
                {isDark ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              <a
                href="https://github.com/superinference"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
        <Section id="abstract">
          <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
            <p>We introduce SuperInference, a feedback-augmented, open-source architecture for large-language-model (LLM) agents designed for complex programming and multi-step reasoning. This project is a collaboration between the Departamento de Sistemas Informáticos y Computación and the Departamento de Física de la Tierra y Astrofísica at Universidad Complutense de Madrid, and Red Hat (Emerging Partnership Engineering, Ecosystem Engineering).</p>
            <p>Existing LLM agents largely rely on single-shot prompting or heuristic, ad hoc prompt iteration. As a result, they often lack principled mechanisms for reasoning under uncertainty or for determining when additional interaction is beneficial—particularly in resource-constrained settings where retraining or architectural modification is infeasible. We frame LLM reasoning as feedback-driven inference with measurable information gain, enabling SuperInference to improve reliability and providing a theoretical account of iterative, multi-turn reasoning without modifying the underlying model.</p>
            <p>The system integrates an explicit planner, a task router, and an embedding-based memory, enabling the agent to iteratively refine its actions using execution feedback. The approach is model-agnostic and requires no architectural changes. We provide AMI (Agentic Multi-step Inference)—comprising the AMI VS Code extension, AMI MCP server, and AMI MCP client—for interactive experimentation, and a formalization of the agent&apos;s operation as a partially observable decision process, yielding probabilistic and information-theoretic bounds that link retrieval quality, memory updates, and iteration budgets to success.</p>
            <p>To assess SuperInference, we introduce metrics for semantic fidelity, calibration, and behavioral stability, applied to the DABStep framework. Across algorithmic reasoning, code debugging, and multi-step problem solving, SuperInference raises Gemini 2.5 Pro performance from 12.7% to 41.3%. All resources are released under open-source licenses and are publicly available through the project website and <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="underline hover:no-underline">GitHub organization</a>.</p>
          </div>
        </Section>

        <Section id="timeline" className="pt-4" title="Evolution of LLM Evaluation" subtitle="Timeline showing the progression leading to SuperInference (Fig. 1 from paper).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
              <p><strong>Motivation and Context.</strong> As large language models (LLMs) are deployed across scientific discovery, engineering, and decision-support domains, rigorous assessment of their reasoning, planning, and reliability has become increasingly important. MMLU and SuperGLUE are standard static benchmarks that have been indispensable for tracking aggregate gains from scale and pretraining. However, these benchmarks capture only static snapshots of capability and therefore struggle to characterize multi-step reasoning, iterative planning, and evolving knowledge requirements. Despite rapid scaling, even frontier LLMs achieve only incremental improvements on broad, multi-domain reasoning benchmarks, particularly when evaluated under static, single-shot protocols.</p>
              <p><strong>Limitations of Current Approaches.</strong> Surface-level metrics based on token- or sequence-level overlap (e.g., exact match, BLEU, ROUGE) fail to reflect semantic correctness, intermediate chain-of-thought, or the compositional planning demanded by many downstream applications. Human judgments remain essential for fluency and creativity, but they suffer from annotator bias, limited reproducibility, and poor scalability. These limitations complicate their use as primary evaluation tools, motivating richer evaluation approaches to improve accuracy, robustness, calibration, and behavioral stability under ambiguity and noise.</p>
              <p><strong>Converging Research Threads.</strong> Recent methodological advances address this problem by combining standardized evaluation with dynamic and adversarial probes. Large-scale frameworks such as HELM and PromptBench promote unified protocols that expose failure modes in multi-turn reasoning and adversarial conditions. Comparative and pairwise evaluations expose subtle qualitative differences between model behaviors that are often unclear from aggregated accuracy scores, while dynamic evaluation frameworks introduce evolving test conditions that better approximate deployment settings. A parallel line of research focuses on uncertainty quantification and deviation-aware metrics, using calibration techniques and information-theoretic measures such as entropy, mutual information, and expected information gain to quantify the value of additional evidence or reasoning steps. Meanwhile, LLM architectures are evolving toward agentic systems with planning, tool use, memory, and iterative self-feedback—from chain-of-thought prompting and self-consistency to agentic frameworks like ReAct that interleave reasoning and acting, tool-augmented models, and retrieval-augmented generation.</p>
              <p><strong>SuperInference Integration.</strong> Figure 1 illustrates these converging threads. Building on them, SuperInference is a fully open-source Model Context Protocol (MCP) client/server framework integrating embedding-augmented memory, critic-based filtering, and information-theoretic evaluation within an agentic LLM architecture built on the Transformer foundation. The term <em>noisy decision process</em> formalizes the fact that an LLM agent&apos;s intermediate computations, retrieval operations, and critic assessments are stochastic and error-prone. Each reasoning step corresponds to a stochastic transition over latent beliefs, with transition probabilities modulated by retrieval imperfections, critic false positives and negatives, and model-internal variability. This framing enables analysis of multi-step reasoning using tools from partially observable decision processes and information theory, yielding provable bounds on convergence and expected information gain.</p>
            </div>
            <div>
              <Mermaid chart={timelineEvolution} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Static Benchmarks": "MMLU and SuperGLUE: indispensable for tracking aggregate gains from scale and pretraining, but capture only static snapshots and struggle with multi-step reasoning, iterative planning, and evolving knowledge requirements.",
                "Human-Centric Evaluation": "Human judgments remain essential for fluency and creativity, but suffer from annotator bias, limited reproducibility, and poor scalability, complicating their use as primary evaluation tools.",
                "Dynamic & Adversarial Evaluation": "Large-scale frameworks such as HELM and PromptBench promote unified protocols that expose failure modes in multi-turn reasoning and adversarial conditions, introducing evolving test conditions that better approximate deployment settings.",
                "Comparative & Pairwise Evaluation": "Comparative and pairwise evaluations expose subtle qualitative differences between model behaviors that are often unclear from aggregated accuracy scores, particularly for ambiguous or underspecified tasks.",
                "Uncertainty, Calibration & Information-Theoretic Metrics": "Calibration techniques (temperature scaling, Bayesian binning, ensembles) and information-theoretic measures (entropy, mutual information, expected information gain) quantify the value of additional evidence or reasoning steps.",
                "Agentic LLM Architectures": "Chain-of-thought prompting, self-consistency, ReAct (interleaving reasoning and acting), tool-augmented models, retrieval-augmented generation, and multi-agent frameworks that coordinate sub-tasks and maintain external memory.",
                "SuperInference": "Fully open-source MCP client/server framework integrating embedding-augmented memory, critic-based filtering, and information-theoretic evaluation. Formalizes LLM reasoning as a noisy decision process with provable bounds on convergence and expected information gain.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 1.</strong> Timeline showing the evolution of LLM evaluation and agentic architectures leading to SuperInference.</div>
            </div>
          </div>
        </Section>

        <Section id="overview" className="pt-4" title="PRE Loop Architecture" subtitle="Event-driven Planner-Retriever-Executor loop with critic-gated memory (from paper Section 3).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
              <Mermaid chart={basicLoop} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Planner (policy π)": "Implements the policy π. Maintains belief state b_t and proposes query q_t only when expected information gain exceeds threshold τ. When e_t=0, the system remains idle, reducing unnecessary computation.",
                Retriever: "Part of action space 𝒜. Receives q_t and accesses External Memory M_t to obtain context m̃_t through noisy channel C_η. Read/write interface stores verified intermediate results for future use.",
                Executor: "Part of action space 𝒜. Uses query q_t together with retrieved context m̃_t to produce a candidate action or subgoal a_t.",
                "Critic (α, β)": "Implements observation function 𝒵 and reward R. Evaluates a_t and produces decision c_t ∈ {approve, reject} based on error probabilities (α,β). Critic's output forms observation o_{t+1} and contributes to reward r_t.",
                "Memory M_t": "Stores critic-approved artifacts with provenance metadata. Updates: M_{t+1} = M_t ∪ {(q_t, a_t, metadata)} if approved, unchanged if rejected. Provides observation o_{t+1} to Planner for iterative refinement.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 2.</strong> Event-driven PRE loop showing Planner → Retriever → Executor → Critic → Memory with feedback.</div>
              </div>
            <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
              <p><strong>POMDP Formulation.</strong> SuperInference formalizes the multi-step reasoning task as a Partially Observable Markov Decision Process (POMDP) with noisy retrieval and verification channels, defined belief updates, learning objectives, and information-theoretic quantities. The hidden state space \(\mathcal{'{'}S{'}'}\) represents task progress, ground-truth variables, available tools, and unresolved subgoals that the agent cannot directly access. The action space \(\mathcal{'{'}A{'}'}\) encompasses planning queries, retrieval operations, and execution steps realized through the Planner, Retriever, and Executor modules. The observation space \(\mathcal{'{'}O{'}'}\) contains agent-visible feedback such as critic decisions, execution results, and retrieved context.</p>
              <p><strong>Event-Driven Architecture.</strong> Traditional reasoning systems operate step-by-step, executing computation at every time step. In contrast, SuperInference draws inspiration from spiking neural networks (SNNs), where discrete &quot;reasoning events&quot; play the role of spikes. The Planner remains silent most of the time and only &quot;fires&quot; when the system determines a reasoning step is necessary—when new information arrives or uncertainty exceeds a threshold. When e_t=0, the system remains idle, reducing unnecessary computation. This event-driven approach achieves sparsity (computation only when needed) and adaptivity (events depend on uncertainty and information gain).</p>
              <p><strong>PRE Loop Components.</strong> The architecture realizes an abstract POMDP whose components are mapped through the Planner-Retriever-Executor (PRE) loop with critic-gated memory. The Planner implements the policy π, maintaining belief state b_t and firing events e_t when Expected Information Gain (EIG) exceeds threshold τ. The Retriever and Executor realize the action space, accessing external memory M_t through a noisy channel C_η and generating candidate actions a_t. The Critic implements the observation function with error rates (α, β) and gates memory updates—approved items update memory while rejected items trigger feedback to the Planner for correction. The critic&apos;s output forms the observation o_&#123;t+1&#125; and contributes to reward r_t.</p>
              <p><strong>Information-Theoretic Stopping.</strong> The agent should reason only when worthwhile—when new information would significantly reduce uncertainty. Reasoning halts when belief is sufficiently concentrated (max_s b_t(s) ≥ κ), when expected information gain falls below threshold (EIG_t ≤ ε, meaning further reasoning won&apos;t help), or when the step budget is exhausted. These criteria ensure a predictable trade-off between efficiency (few events) and solution quality.</p>
            </div>
          </div>
        </Section>

        <Section id="architecture" title="Event-Driven PRE Architecture" subtitle="Complete architecture with event triggering and noisy retrieval mechanism (from paper Fig. 2).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="lg:order-2">
              <Mermaid chart={deepAgent} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Event e_t (spike)": "Discrete reasoning events that trigger computation only when expected information gain exceeds threshold τ. When e_t=0, the system remains idle, reducing unnecessary computation. Inspired by spiking neural networks.",
                "Planner (policy π, belief b_t)": "Implements policy π. Maintains belief state b_t about the hidden reasoning state s_t. Proposes query q_t only when EIG ≥ τ. Discrete activation visualized as event e_t.",
                "Retriever (action space 𝒜)": "Part of action space 𝒜. Receives q_t and accesses External Memory M_t to obtain context m̃_t. Read/write interface through noisy channel C_η with retrieval probability p(η).",
                "External Memory M_t": "Critic-gated memory storing verified intermediate results with provenance metadata. Only high-PPV items are stored. Memory grows only when Critic approves: M_{t+1} = M_t ∪ {(q_t, a_t, metadata)}.",
                "Executor (action space 𝒜)": "Part of action space 𝒜. Uses query q_t together with retrieved context m̃_t to produce candidate action or subgoal a_t.",
                "Critic (𝒵, α, β)": "Implements observation function 𝒵 and reward R. Evaluates a_t, produces decision c_t ∈ {approve, reject} with error rates α (false approval) and β (false rejection). Output forms observation o_{t+1} and contributes to reward r_t.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 3.</strong> Event-driven PRE architecture showing Planner → Retriever → Executor → Critic with Memory and feedback loops (from paper Fig. 2a).</div>
            </div>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7 lg:order-1">
              <p><strong>Event-Driven Efficiency.</strong> A key design feature is that the combination of sparse Planner activation (event e_t), noisy retrieval, and Critic gating ensures that computation is concentrated on informative events. This design achieves: (1) reduction of unnecessary queries (sparse computation), (2) memory efficiency, as only verified candidates are stored, (3) multi-step reasoning where the system chains events to solve complex tasks, updating beliefs and memory iteratively, and (4) predictable performance, as thresholds (τ, κ, ε) and critic error parameters (α, β) allow controlling the trade-off between speed, accuracy, and memory usage.</p>
              <p><strong>Belief State Updates.</strong> The Planner maintains a belief state b_t, a probability distribution over hidden reasoning states. When the agent takes an action a_t and receives observation o_{'{'}t+1{'}'}, the belief updates via: b_{'{'}t+1{'}'}(s&apos;) ∝ Z(o_{'{'}t+1{'}'}|s&apos;,a_t) Σ_s T(s&apos;|s,a_t) b_t(s), combining a prediction step (based on previous belief and transition model) with a correction step (using the observation model). This Bayesian update allows the agent to track uncertainty and make informed decisions about when to fire events.</p>
              <p><strong>Expected Information Gain (EIG).</strong> Events fire only when Expected Information Gain exceeds threshold τ. EIG measures the expected reduction in uncertainty: EIG_t = E[H(b_t) - H(b_{'{'}t+1{'}'})] over observations o_{'{'}t+1{'}'}, where H(·) denotes Shannon entropy. This information-theoretic approach ensures computation occurs only when new information is expected to reduce uncertainty, making the reasoning process both efficient and principled.</p>
            </div>
          </div>
        </Section>

        <Section id="embeddings" title="Noisy Retrieval and Critic Gating" subtitle="Retrieval channel and precision mechanism (from paper Fig. 2b).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Mermaid chart={embeddings} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Planner query q_t": "Query generated by the Planner to retrieve relevant context from memory. Even if perfectly formed, the retrieval process introduces noise due to embedding misalignment or approximate search errors.",
                "Retrieval channel C_η": "Corruption channel parameterized by noise level η. m̃_t ~ C_η(m_t) is probabilistically correlated with the true memory item m_t. Lower η yields more accurate retrieval; higher η introduces more errors.",
                "Context m̃_t ~ C_η(m_t)": "Noisy retrieved evidence. The actual retrieved result (possibly corrupted) is probabilistically correlated with the true relevant memory entry. Models imperfect recall from approximate nearest neighbor search.",
                "Executor → a_t": "Produces candidate action a_t conditional on query q_t and retrieved context m̃_t. The candidate is then evaluated by the Critic.",
                "Critic (α, β)": "α = Pr(approve|incorrect) is the false approval rate; β = Pr(reject|correct) is the false rejection rate. PPV: P(correct|approve) = (1-β)p' / [(1-β)p' + α(1-p')]. Minimizing α and β ensures high-quality memory.",
                "PPV: P(correct|approve)": "Positive predictive value: how confident we can be that an approved candidate is actually correct. A high PPV means Critic approvals are trustworthy, controlling memory quality.",
                "Memory M_{t+1}": "Memory grows only when Critic approves. Rejected candidates leave no trace, preventing incorrect results from contaminating future reasoning steps. Mirrors spike-timing dependent plasticity (STDP).",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 4.</strong> Noisy retrieval channel C_η and critic gating mechanism showing how retrieval probability p(η) and critic errors (α,β) determine memory precision (from paper Fig. 2b).</div>
            </div>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p><strong>Noisy Channels Formalism.</strong> Both memory retrieval and candidate evaluation are imperfect—they can return wrong results or make incorrect judgments. We model these as <em>noisy channels</em> to formally reason about error propagation, connecting to information-theoretic principles.</p>
              <p><strong>Retrieval Channel.</strong> When the Planner queries memory, the Retriever may return imperfect results due to embedding misalignment or approximate search errors. The retrieved context m̃_t ~ C_η(m_t) is probabilistically correlated with the true memory item m_t. Noise η reduces the retrieval probability p(η), modeling imperfect recall or approximation in memory access. Lower η yields more accurate retrieval; higher η introduces more errors.</p>
              <p><strong>Critic Channel.</strong> The Critic can make two types of errors when evaluating a candidate: α = Pr(approve | incorrect) is the false approval rate—the probability of approving a wrong answer—and β = Pr(reject | correct) is the false rejection rate—the probability of rejecting a correct answer. The <em>positive predictive value</em> (PPV) of approved items is given by P(correct|approve) = (1-β)p&apos; / [(1-β)p&apos; + α(1-p&apos;)], where p&apos; is the prior probability that a candidate is correct. Minimizing α and β ensures high-quality memory; a high PPV means that when the Critic approves a candidate, we can be confident it is actually correct.</p>
              <p><strong>Critic-Gated Memory Update.</strong> Memory grows only when the Critic approves: M_&#123;t+1&#125; = M_t ∪ &#123;(q_t, a_t, metadata)&#125; if approved, or M_&#123;t+1&#125; = M_t if rejected. This mirrors spike-timing dependent plasticity (STDP) in neuroscience: only well-timed and verified events produce lasting changes in memory. Rejected candidates leave no trace, preventing incorrect results from contaminating future reasoning steps.</p>
            </div>
          </div>
        </Section>

        <Section id="results" title="Results" subtitle="Performance comparisons and efficiency analyses demonstrating SuperInference's effectiveness (from paper Section: Results).">
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
                <p><strong>Competitive Performance.</strong> Figure 5 compares SuperInference with leading models on the DABStep Hard Tasks dataset. The y-axis reports accuracy (higher is better), while the x-axis lists the state-of-the-art models. Using Gemini 2.5 Pro as the base model, SuperInference achieves substantially improved results, particularly on hard tasks where iterative refinement is most beneficial. Submitted to the official DABStep leaderboard, the system ranked third place on hard data-scientist–oriented tasks (as of December 2025). Results are shown in sorted order, with the best-performing models placed on the left.</p>
                <p><strong>Evidence Accumulation.</strong> These results support our hypothesis that modeling reasoning as a partially observable process and accumulating evidence across rounds improves accuracy. Interpreting each attempt as a noisy, evidence-bearing sample transforms inference from a single-shot prediction into a structured evidence-accumulation process with diminishing returns. Performance gains are strongly concentrated in the first few refinement rounds—most successful tasks terminate within one to three iterations, after which success rates rapidly saturate.</p>
                <p><strong>Fair Evaluation.</strong> All tasks with ground-truth labels are evaluated under identical conditions, ensuring comparability. The analysis accounts for True Positives, True Negatives, False Positives, and False Negatives, providing a complete picture of the framework&apos;s performance across all outcomes.</p>
              </div>
          <div>
                <Image src="/plots/fig11_sota_leaderboard.png" alt="SuperInference vs state-of-the-art models on DABStep benchmark (Hard Tasks)" width={1200} height={800} className="w-full h-auto rounded-lg border border-white/10" />
                <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 5.</strong> SuperInference vs state-of-the-art models on the DABStep benchmark (Hard Tasks dataset).</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="lg:order-2">
                <Image src="/plots/fig53_time_eig_efficiency_comparison.png" alt="Efficiency analysis: time per round and information-gain efficiency" width={1200} height={800} className="w-full h-auto rounded-lg border border-white/10" />
                <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 6.</strong> Efficiency analysis: time per round and information-gain efficiency.</div>
              </div>
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7 lg:order-1">
                <p><strong>Time-Per-Round Analysis.</strong> Panel (a) shows the mean time per round given the number of rounds required to predict a solution. Bubble color denotes the success rate for tasks terminating in each round, while bubble size indicates the number of problems solved in that round. The mean time per round increases with iteration count, reflecting the increasing complexity of the tasks. The color gradient reflects a <em>selection effect</em>: tasks that terminate early (rounds 1–2) are inherently easier and therefore exhibit higher success rates (green), while tasks requiring more rounds (4+) are more complex and ultimately fail despite additional iterations (red). More rounds do not cause failure—instead, difficult tasks both require more rounds and are less likely to succeed.</p>
                <p><strong>EIG Efficiency Trends.</strong> Panel (b) shows Expected Information Gain (EIG) efficiency, which decreases with the number of rounds—early rounds extract most of the available information, reaching correct predictions quickly. Both panels show that no problems were solved with 6 or 7 rounds; after the 4th round the agent was not able to correctly predict any problem, indicating a potential stopping rule at round 4. This analysis informs optimal stopping criteria, balancing accuracy gains against computational costs.</p>
                <p><strong>Efficiency–Accuracy Trade-offs.</strong> Later iterations incur higher latency while contributing progressively less information. This behavior motivates adaptive stopping criteria that terminate refinement once expected information gain falls below a task-dependent threshold. The dashed line in panel (a) shows a linear trend fit to illustrate the increasing time cost. Each data point represents the mean over all tasks terminating at that round, with error bars indicating standard deviation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
                <p><strong>Task Completion Dynamics.</strong> Panel (a) shows the number of tasks terminating at each round together with cumulative success and failure rates. The left y-axis shows task count (bars), while the right y-axis shows cumulative rates (lines). Most tasks terminate within the first few iterations, with a pronounced peak at rounds 1–3, while both cumulative success and failure curves rapidly saturate thereafter. This behavior indicates that the majority of useful information is acquired early in the reasoning process, and supports the interpretation of SuperInference as an evidence-accumulating process with a natural stopping point, rather than an open-ended iterative loop.</p>
                <p><strong>Code Complexity Analysis.</strong> Panel (b) relates final code length (x-axis) to task success rate (y-axis), with bubble size indicating task frequency. Shorter solutions are associated with higher success rates, whereas longer code refinements exhibit a monotonic decline in performance. This trend suggests that excessive refinement often reflects uncertainty or error accumulation, while concise updates are more reliable. Together, these results motivate efficiency-aware stopping strategies that balance accuracy gains against computational cost, and empirically validate the event-driven design principles underlying SuperInference.</p>
                <p><strong>A Unified Multi-Metric Behavioral Lens.</strong> Beyond accuracy, SuperInference tracks belief evolution, task termination patterns, and EIG efficiency across rounds. In combination, these metrics reveal behavioral patterns—such as early termination for easy tasks, diminishing EIG with iteration depth, and inverse correlation between code length and success—that remain invisible under static, single-shot benchmarks. This supports multi-dimensional, noise-aware evaluation pipelines for agentic LLMs.</p>
              </div>
              <div>
                <Image src="/plots/fig54_task_completion_code_efficiency.png" alt="Task completion dynamics and code-refinement efficiency" width={1200} height={800} className="w-full h-auto rounded-lg border border-white/10" />
                <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 7.</strong> Task completion dynamics and code-refinement efficiency.</div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="feedback" title="Event-Driven PRE Stages Example" subtitle="Multi-step math example showing event triggering and execution chains (from paper Fig. 3).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Mermaid chart={feedback} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Event e₀": "Initial event. Agent receives task x. Initial belief b₀ = 0.3 (low confidence). EIG₀ = 0.8 is high, so reasoning is worthwhile.",
                "Observation: Receive task x": "Environment provides task x: '50 students, 40% are men. If 10 men leave, how many remain?'",
                "Event e₁": "Triggers Planner to decompose task into queries q₀ and q₁.",
                "Planner decomposes task into queries": "Planner (policy π) generates planning queries: q₀ (how many men originally? — requires 50 × 0.4) and q₁ (after 10 leave, how many remain? — depends on q₀).",
                "q₀: How many men originally? (50 × 0.4)": "First query requiring intermediate computation. Retriever checks memory M₀ (empty initially).",
                "q₁: After 10 leave, how many remain?": "Second query dependent on q₀ result. Retriever fetches m̃₁ = 20 from M₁ via noisy channel C_η.",
                "Event e₂": "Triggers execution of q₁ after q₀ is resolved and approved.",
                "Retriever m̃₀ ~ C_η": "Retriever accesses memory through noisy channel. For q₀, memory is empty; for q₁, retrieves previously stored result.",
                "Executor → a₀": "Executor computes candidate a₀ = 50 · 0.4 = 20 men.",
                "a₀ = 20 men": "Candidate answer: 20 men originally. Evaluated by Critic with PPV ≈ 0.98.",
                "Critic → c₀": "Critic evaluates a₀. c₀ = approve. Belief updates: b₁ = 0.6. EIG₁ = 0.4 > τ, so reasoning continues.",
                "Retriever m̃₁ from M₁": "Retriever fetches verified result (20 men) from memory M₁ stored after first cycle.",
                "Executor → a₁": "Executor computes candidate a₁ = 20 − 10 = 10 men using retrieved context.",
                "a₁ = 10 men (20 − 10)": "Final answer: 10 men remain. Belief reaches b₂ = 0.95 ≥ κ (high confidence).",
                "Critic → c₁": "Critic evaluates a₁. c₁ = approve. EIG₂ ≈ 0 < τ (nothing left to learn). Two stopping conditions met.",
                "Memory M_{t+1} = M_t ∪ {(q_t, a_t)}": "Critic-gated memory. Stores approved (q₀, 20) and (q₁, 10). Rejected candidates would leave no trace. Agent returns: 10 men.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 8.</strong> Event-driven PRE stages showing complete flow: task decomposition into queries q₀ and q₁, Retriever → Executor → Critic chains with belief updates (b₀=0.3 → b₁=0.6 → b₂=0.95), and critic-gated memory updates (from paper Fig. 3a).</div>
            </div>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p><strong>Worked Example: Multi-Step Math.</strong> The task is: &quot;50 students, 40% are men. If 10 men leave, how many remain?&quot; The agent receives the task with initial belief b₀ = 0.3 (low confidence). Expected information gain EIG₀ = 0.8 is high, so reasoning is worthwhile. The Planner decomposes the task into subquestions: q₀ (how many men originally? — requires computing 50 × 0.4) and q₁ (after 10 leave, how many remain? — requires q₀&apos;s answer).</p>
              <p><strong>First PRE Cycle (t=0).</strong> The Retriever checks memory M₀ (empty initially). The Executor computes a₀ = 50 · 0.4 = 20 men. The Critic evaluates: c₀ = approve (with PPV ≈ 0.98). Memory updates: M₁ = M₀ ∪ &#123;(q₀, 20)&#125;. Belief rises to b₁ = 0.6, still below threshold κ = 0.9. Since EIG₁ = 0.4 &gt; τ, reasoning continues.</p>
              <p><strong>Second PRE Cycle (t=1).</strong> The Retriever fetches m̃₁ = 20 from M₁ via the noisy channel C_η. The Executor computes a₁ = 20 − 10 = 10 men. The Critic evaluates: c₁ = approve. Memory updates: M₂ = M₁ ∪ &#123;(q₁, 10)&#125;. Belief reaches b₂ = 0.95 ≥ κ (high confidence), and EIG₂ ≈ 0 &lt; τ (nothing left to learn). Two stopping conditions are met—the agent returns: <strong>10 men</strong>.</p>
              <p><strong>Key Observations.</strong> Belief b_t rises monotonically as evidence accumulates (30% → 60% → 95%). EIG_t falls as uncertainty is reduced (0.8 → 0.4 → 0). Memory stores only Critic-approved results, ensuring high precision. The agent stops after 2 cycles—efficient, not exhaustive. If c₀ had been &quot;reject&quot; (e.g., the Executor produced 25 instead of 20), the rejected candidate would <em>not</em> be stored in memory; the Planner would receive feedback, retry the query, and the Executor would attempt again.</p>
            </div>
          </div>
        </Section>

        <Section id="editor" title="AMI" subtitle="Agentic Multi-step Inference: VS Code extension, MCP server, and MCP client.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p><strong>AMI (Agentic Multi-step Inference)</strong> unifies planning, retrieval, execution, and verification into a single reasoning loop. SuperInference is implemented as three components: the <strong>MCP Server</strong> runs the PRE loop—planning, retrieval, execution, belief updates, and memory gating, logging all decisions for analysis; the <strong>MCP Client</strong> handles communication, validation, and retry logic, allowing runtime tuning of confidence thresholds and budgets; and the <strong>VS Code Extension</strong> provides the user interface for observing agent reasoning, previewing plans, and adjusting parameters during execution. The extension is publicly available at <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="underline hover:no-underline">Microsoft&apos;s VS Code Marketplace</a>.</p>
              <p>We chose the AMI VS Code extension as the primary interface because it meets developers where they work. The extension has access to open files, the active selection, and language servers, making it ideal for context gathering and precise edits. From a UX standpoint, the agent feels like an expert teammate: it can navigate to symbols, explain unfamiliar code, propose diffs, and run tests without forcing you to switch windows. Every action is visible in a panel with logs and a diff viewer so that review remains fast and safe. We evaluate on DABStep, a benchmark with stepwise reasoning tasks and ground-truth verifiers, measuring per-step correctness, critic precision, and overall accuracy.</p>
              <p>The MCP server houses tools behind typed interfaces, while the MCP client ensures protocol fidelity and typed schema validation. This separation allows organizations to restrict which tools are available, add project-specific actions, and audit usage centrally. Future work will expand the scope of SuperInference across architectures and deployment contexts, including systematic evaluation on diverse model families—from frontier multimodal systems to emerging lightweight models such as the Granite family, LLaMA variants, and Mistral models—to map out cost-accuracy trade-offs and identify optimal configuration regimes where feedback-driven refinement can compensate for reduced model capacity.</p>
            </div>
          <div>
            <Mermaid chart={vscode} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ UI: "Interface", Extension: "Extension", Client: "Client", Server: "Server", Tools: "Tools", Codebase: "Files", DABStep: "Benchmark" }} descriptions={{
              UI: "Developer-facing interface inside the editor. Presents chat, diffs, logs, and navigation, keeping focus on code while exposing the PRE reasoning loop in a controlled, reviewable workflow.",
              Extension: "AMI VS Code extension hosting the assistant. Publicly available at Microsoft's VS Code Marketplace. Bridges UI and MCP backend, gathers context from language servers, and applies edits with explicit approvals.",
              Client: "AMI MCP Client: handles communication, validation, and retry logic. Ensures protocol fidelity and typed schema validation. Allows runtime tuning of confidence thresholds (κ), EIG thresholds (τ), and iteration budgets (N_max).",
              Server: "AMI MCP Server: runs the complete PRE loop — planning, retrieval, execution, belief updates, and critic-gated memory. Logs all decisions for analysis. Exposes typed tools with auditing, rate limits, and policies.",
              Tools: "Operational actions accessible through MCP: grep, test, type-check, build, docker, or project-specific tasks. Provide measurable outcomes that anchor agent decisions and verify progress across reasoning steps.",
              Codebase: "The repository of files and symbols. Supplies definitions, references, and examples the agent navigates and modifies, providing context m̃_t for the Executor.",
              DABStep: "DABStep benchmark integration for systematic evaluation. Provides stepwise reasoning tasks with ground-truth verifiers, measuring per-step correctness, critic precision, and overall accuracy.",
            }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 9.</strong> AMI implementation architecture: UI → VS Code extension → MCP Client → MCP Server → tools, codebase, and DABStep benchmark.</div>
            </div>
          </div>
        </Section>

        <Section id="copy" title="How it Works" subtitle="Plan, act, observe, and loop with feedback.">
          <div className="mt-4 w-full space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>From Theory to Practice.</strong> SuperInference provides a principled and empirically validated approach to improve LLM reasoning under partial observability. Combining a planner, embedding-augmented memory, and critic-based verification, SuperInference formalizes multi-step reasoning as a noisy decision process where retrieval, critic assessments, and model sampling jointly induce stochastic transitions over latent beliefs. Theoretical results connect iteration budgets, critic characteristics, and expected information gain. The framework is model-agnostic and requires no architectural changes.</p>
            <p>A typical session starts with exploration: ask for an explanation of a file, jump to a symbol, or request a map of call sites. Once the task is clear, the agent drafts a plan that names the files it intends to change and the checks it will run. You can edit that plan like a checklist. When approved, the agent performs the smallest safe step, runs inexpensive validators, and reports back with logs and a preview diff. If results are good, it proceeds; if not, it explains what failed and proposes alternatives.</p>
            <p>The key benefit is momentum without loss of control. You always see context, plan, and evidence, and you can pause or redirect the flow at any time. Because the loop prefers objective signals—compilers, tests, type systems—the agent&apos;s suggestions converge toward correctness rather than style alone. Across the DABStep Hard Tasks benchmark, this translates into a performance increase from 12.7% to 41.3% when applied to Gemini 2.5 Pro, with most gains achieved within the first three refinement rounds. Over time, the system builds a memory of accepted patterns and project conventions, reducing friction and helping new engineers onboard faster.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "Plan", copy: "Assemble context and create a task list." },
              { title: "Act", copy: "Apply edits and run tools." },
              { title: "Observe", copy: "Capture results and feedback for the next loop." },
            ].map((card, i) => (
              <MotionCard key={card.title} title={card.title} delay={0.1 * i}>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm/6">{card.copy}</p>
              </MotionCard>
            ))}
          </div>
        </Section>

        {/* <Section id="roadmap" title="Roadmap" subtitle="Illustrative milestones.">
          <div>
            <Mermaid chart={roadmap} className="roadmap-gantt rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 10.</strong> Roadmap gantt highlighting major milestones.</div>
            <ul className="mt-4 list-disc ml-6 text-neutral-300 text-base/7 space-y-1">
              <li><strong>Feature A</strong>: Initial planning, architecture setup, and core scaffolding delivered.</li>
              <li><strong>Feature B</strong>: Retrieval, embeddings, and tool integration wired into the loop.</li>
              <li><strong>Feature C</strong>: Feedback-driven iteration with validators and user approvals.</li>
              <li><strong>Feature D</strong>: Roadmap alignment, polish, and documentation for rollout.</li>
            </ul>
            <div className="mt-6 w-full space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
                <div className="flex items-center gap-2">
                <Image src="/superinference_icon.svg" alt="VS Code extension icon" width={72} height={72} className="invert" />
                <p><strong>Implementation components.</strong> SuperInference provides an open-source ecosystem with formal specification, evaluation framework, and AMI VS Code extension, enabling reproducible experimentation and broad adoption.</p>
                </div>
                <ul className="list-disc ml-6 space-y-2">
                <li><a href="https://github.com/superinference/vshero" target="_blank" rel="noreferrer" className="underline hover:no-underline">AMI VS Code extension (vshero)</a>: chat‑driven development, context retrieval (files/LSP), semantic search, multi‑file edits, task orchestration, and status streaming.</li>
                <li><a href="https://github.com/superinference/mcp/" target="_blank" rel="noreferrer" className="underline hover:no-underline">AMI MCP server (mcp)</a>: exposes validated tools (search/grep/shell/git/docker and project‑specific tasks), typed schemas for inputs/outputs, rate‑limiting & auditing, versioned endpoints.</li>
                <li><strong>AMI MCP client</strong>: ensures protocol fidelity, typed schema validation, retry logic and runtime tuning.</li>
                <li><strong>DABStep benchmark</strong>: Integration for systematic evaluation with ground-truth artifacts and verifiers.</li>
                  <li>Agents & feedback loops: plan → retrieve → act → validate → refine using tests/linters/type‑checks; optional user approvals; automatic retries with error context.</li>
                </ul>
                <p>Together these components turn everyday coding tasks into supervised agentic flows, all without leaving VS Code.</p>
              </div>
            </div>
        </Section> */}

        <Section id="research" title="Research" subtitle="Published papers and how to cite them.">
          <div className="w-full space-y-6">
            {papers.map((p) => (
              <div key={p.id} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 p-4 shadow-sm dark:shadow-none">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {p.title} <a href={p.doi} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">(doi)</a>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {p.venue} · <a href={p.doi} target="_blank" rel="noreferrer" className="underline hover:no-underline">{p.doi}</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300 text-base/7">{p.summary}</p>
                <div className="mt-3 relative">
                  <div className="absolute right-2 top-2 z-10">
                    <CopyButton text={p.bibtex} label="Copy BibTeX" />
                  </div>
                  <pre className="rounded bg-neutral-100 dark:bg-neutral-950/80 border border-neutral-200 dark:border-white/10 p-3 pr-10 text-[11px] text-neutral-800 dark:text-neutral-200 overflow-x-auto"><code>{p.bibtex}</code></pre>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="funding" title="Funding" subtitle="Research and innovation funding sources.">
          <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>This project has received funding from the European Union&apos;s Horizon Europe research and innovation programme under grant agreement No 101093129, the Spanish Ministry of Science with projects PID2023-149943OB-I00 and PID2021-122215NB-C31, and the Region of Madrid project TEC-2024/COM-235.</p>
          </div>
        </Section>
      </main>

      <footer className="py-8 border-t border-neutral-200 dark:border-white/10 text-center text-sm text-neutral-600 dark:text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="SuperInference" width={18} height={18} />
            <span>SuperInference</span>
          </div>
          <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}
