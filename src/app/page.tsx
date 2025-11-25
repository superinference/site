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

// Timeline: Evolution of LLM evaluation (from 02_results.tex fig:timeline_superinference_scaled)
const timelineEvolution = `flowchart TD
  Bench["Static Benchmarks<br/>(MMLU, SuperGLUE)"]
  Human["Human-Centric<br/>Evaluation"]
  Comp["Comparative<br/>Evaluation"]
  Noise["Deviation- and<br/>Noise-Aware Metrics"]
  Agent["Agentic LLM<br/>Architectures"]
  Super["SuperInference<br/>Feedback-Augmented LLM Agent"]
  
  Bench -->|evolution| Human
  Human -->|evolution| Comp
  Comp -->|evolution| Noise
  Noise -->|evolution| Agent
  Agent -->|evolution| Super
  
  style Bench fill:#1e3a5f,color:#ffffff
  style Human fill:#2d5a3d,color:#ffffff
  style Comp fill:#8b5a2b,color:#ffffff
  style Noise fill:#5a3d7a,color:#ffffff
  style Agent fill:#2d5a5a,color:#ffffff
  style Super fill:#8b2d2d,color:#ffffff
`;

// PRE Architecture: Event-driven PRE loop (from 03_method.tex fig:combined-arch)
const preArchitecture = `flowchart TD
  Event["Event e_t<br/>(spike)"]
  Planner["Planner<br/>(belief b_t)"]
  Retriever["Retriever"]
  Memory["External Memory<br/>M_t"]
  Executor["Executor"]
  Critic["Critic<br/>(α, β)"]
  
  Event -->|triggers| Planner
  Planner -->|query q_t| Retriever
  Retriever <-->|read/write| Memory
  Retriever -->|context m̃_t| Executor
  Executor -->|candidate a_t| Critic
  Critic -->|approve/reject| Memory
  Critic -.->|feedback| Planner
  
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
  Obs["Observation:<br/>Receive task o₀"]
  Task["Q1: In a class of 50 students,<br/>40% are men. If 10 men leave.<br/>How many men remain?"]
  
  E1["Event e₁"]
  Plan["Planner decomposes<br/>task into subquestions"]
  SQ1["SQ1: How many men<br/>were originally?"]
  SQ2["SQ2: Given original number<br/>and 10 leave, how many remain?"]
  
  E2["Event e₂"]
  LM1["Language Model"]
  SA1["SA1: 20 men"]
  Crit1["Critic"]
  
  LM2["Language Model"]
  SA2["SA2: 10 men<br/>(20-10)"]
  Crit2["Critic"]
  
  Mem["Memory M_{t+1}"]
  
  E0 -->|triggers| Obs
  Obs --> Task
  E1 -->|triggers| Plan
  Plan --> SQ1
  Plan --> SQ2
  E2 -->|triggers| SQ2
  SQ1 --> LM1
  LM1 --> SA1
  SA1 --> Crit1
  SQ2 --> LM2
  LM2 --> SA2
  SA2 --> Crit2
  Crit1 -->|store SQ1,SA1| Mem
  Crit2 -->|store final result| Mem
  Crit1 -.->|feedback o₁| Plan
  
  style E0 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style E1 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style E2 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style Plan fill:#1e3a5f,color:#ffffff
  style Mem fill:#5a5a1e,color:#ffffff
  style LM1 fill:#2d5a3d,color:#ffffff
  style LM2 fill:#2d5a3d,color:#ffffff
  style Crit1 fill:#5a3d7a,color:#ffffff
  style Crit2 fill:#5a3d7a,color:#ffffff
`;

// Simple PRE loop (from 03_method.tex line 643-648)
const preLoop = `flowchart TD
  Planner["Planner"]
  Retriever["Retriever"]
  Executor["Executor"]
  Critic["Critic"]
  Memory["Memory /<br/>Feedback"]
  
  Planner -->|q_t| Retriever
  Retriever -->|m̃_t| Executor
  Executor -->|a_t| Critic
  Critic -->|c_t| Memory
  Memory -.->|feedback| Planner
  
  style Planner fill:#1e3a5f,color:#ffffff
  style Retriever fill:#8b5a2b,color:#ffffff
  style Executor fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
`;

// Noisy retrieval and critic gating (from 03_method.tex fig:combined-arch panel b)
const noisyRetrieval = `flowchart TD
  Query["Planner query<br/>q_t"]
  Channel["Retrieval channel<br/>C_η<br/>(noise η)"]
  Context["Context<br/>m̃_t"]
  Exec["Executor<br/>→ a_t"]
  Critic["Critic<br/>(α, β)"]
  Memory["Memory<br/>M_{t+1}"]
  
  Query --> Channel
  Channel -->|noise η| Context
  Context --> Exec
  Exec -->|candidate a_t| Critic
  Critic -->|approve| Memory
  Critic -.->|reject| Query
  
  style Query fill:#1e3a5f,color:#ffffff
  style Channel fill:#8b5a2b,color:#ffffff
  style Context fill:#2d5a5a,color:#ffffff
  style Exec fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
`;

// VS Code extension integration (from paper Section: Engineering components)
const vscode = `flowchart TD
  UI["UI<br/>(Developer Interface)"]
  Extension["AMI VS Code<br/>Extension"]
  Chat["Chat API<br/>(AMI MCP Client)"]
  Backend["AMI MCP Server<br/>(Backend)"]
  Tools["Tools<br/>(MCP)"]
  Codebase["Codebase<br/>(Files)"]
  Context["Context<br/>(Retrieved)"]
  
  UI --> Extension
  Extension --> Chat
  Chat --> Backend
  Backend --> Tools
  Backend --> Codebase
  Codebase --> Context
  Context --> Chat
  
  style UI fill:#1e3a5f,color:#ffffff
  style Extension fill:#8b5a2b,color:#ffffff
  style Chat fill:#2d5a5a,color:#ffffff
  style Backend fill:#2d5a3d,color:#ffffff
  style Tools fill:#5a3d7a,color:#ffffff
  style Codebase fill:#5a5a1e,color:#ffffff
  style Context fill:#7a3d5a,color:#ffffff
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
    venue: "ArXiv, 2025",
    doi: "https://doi.org/xx.xxxx/x.xxxxx.xxxx.xx.xxx",
    summary:
      "A feedback-augmented, information-theoretic, and open-source framework for iterative reasoning in large language models.",
    authors: "Carlos Camacho González and Cristina Catalán-Torrecilla and Luis Tomas-Bolivar and Luis Llana",
    year: "2025",
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
  //   venue: "ArXiv, 2025",
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
            <p>We introduce SuperInference, a feedback-augmented, open architecture for large-language-model (LLM) agents designed for complex programming and multi-step reasoning. This project is a collaboration between the Facultad de Informática at Universidad Complutense de Madrid (Department of Sistemas Informáticos y Computación), the Facultad de Ciencias Físicas (Department of Astrofísica) at Universidad Complutense de Madrid, and Red Hat (Emerging Partnerships &amp; Ecosystem Engineering). The system integrates an explicit planner, a task router, and an embedding-based memory, enabling the agent to iteratively refine its actions using execution feedback. We provide AMI (Agentic Multi-step Inference)—comprising the AMI VS Code extension, AMI MCP server, and AMI MCP client—for interactive experimentation, and evaluate on the DABStep benchmark for systematic assessment. We formalize the agent&apos;s operation as a partially observable decision process, yielding probabilistic and information-theoretic bounds that link retrieval quality, memory updates, and iteration budgets to success.</p>
            <p>To assess SuperInference, we introduce metrics for semantic fidelity, calibration, and behavioral stability, applied to the DABStep benchmark. Across algorithmic reasoning, code debugging, and multi-step problem solving, SuperInference raises Gemini 2.5 Pro performance from 12.7% to 41.3%. By treating LLM reasoning as feedback-driven inference with measurable information gain, SuperInference advances both practical reliability and theoretical understanding of interactive AI agents.</p>
          </div>
        </Section>

        <Section id="timeline" className="pt-4" title="Evolution of LLM Evaluation" subtitle="Timeline showing the progression leading to SuperInference (Fig. 1 from paper).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
              <p><strong>Motivation and Context.</strong> As large language models (LLMs) are deployed across scientific discovery, engineering, and decision-support domains, rigorous assessment of their reasoning, planning, and reliability has become increasingly important. Standard static benchmarks such as MMLU and SuperGLUE have been indispensable for tracking aggregate gains from scale and pretraining, yet they capture only fixed snapshots of capability and struggle to characterize multi-step reasoning, iterative planning, and evolving knowledge requirements.</p>
              <p><strong>Limitations of Current Approaches.</strong> Surface-level metrics based on token- or sequence-level overlap (e.g., exact match, BLEU, ROUGE) fail to reflect semantic correctness, intermediate chain-of-thought, or the compositional planning demanded by many downstream applications. Human judgments remain essential for fluency and creativity but suffer from annotator bias, limited reproducibility, and poor scalability.</p>
              <p><strong>Converging Research Threads.</strong> Recent methodological advances address parts of this gap by combining standardized evaluation with dynamic and adversarial probes. Large-scale frameworks such as HELM and PromptBench promote unified protocols that expose failure modes in multi-turn reasoning. A parallel research strand emphasizes uncertainty quantification and deviation-aware metrics, while LLM architectures evolve toward agentic systems with planning, tool use, memory, and iterative self-feedback.</p>
              <p><strong>SuperInference Integration.</strong> Figure 1 illustrates these converging threads. Building on them, SuperInference integrates embedding-augmented memory, critic-based filtering, and information-theoretic evaluation within an agentic LLM architecture. The framework models retrieval noise, critic error rates, iteration budgets, and posterior uncertainty, providing a principled bridge between architectural design and evaluation rigor. This supports predictions of iterative reasoning convergence, clarifies when feedback improves performance, and yields metrics reflecting deployability concerns: robustness under retrieval noise, calibrated confidence, and per-step information gain.</p>
            </div>
            <div>
              <Mermaid chart={timelineEvolution} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Static Benchmarks": "Early evaluation approaches using fixed datasets like MMLU and SuperGLUE that capture aggregate gains but struggle with multi-step reasoning.",
                "Human-Centric Evaluation": "Evaluation methods emphasizing fluency and creativity, though limited by annotator bias and scalability.",
                "Comparative Evaluation": "Pairwise evaluation placing model outputs side-by-side to reveal nuanced differences.",
                "Deviation- and Noise-Aware Metrics": "Metrics that account for semantic divergence, calibration, and drift under noisy conditions.",
                "Agentic LLM Architectures": "Systems integrating planning, tool use, memory, and iterative self-feedback.",
                "SuperInference": "Feedback-augmented LLM agent integrating embedding-augmented memory, critic-based filtering, and information-theoretic evaluation.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 1.</strong> Timeline showing the evolution of LLM evaluation and agentic architectures leading to SuperInference.</div>
            </div>
          </div>
        </Section>

        <Section id="overview" className="pt-4" title="PRE Loop Architecture" subtitle="Event-driven Planner-Retriever-Executor loop with critic-gated memory (from paper Section 3).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
              <Mermaid chart={basicLoop} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                Planner: "Maintains belief state b_t and fires events e_t when EIG ≥ τ. Generates queries q_t to decompose tasks into subgoals.",
                Retriever: "Accesses external memory M_t with noisy retrieval channel C_η. Returns context m̃_t with success probability p(η).",
                Executor: "Generates candidate actions a_t conditional on subgoals g_t and retrieved context m̃_t.",
                Critic: "Evaluates candidates with error rates α (false positive) and β (false negative). Gates memory updates based on precision formula.",
                "Memory / Feedback": "Stores critic-approved artifacts. Provides feedback o_{t+1} to planner for iterative refinement.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 2.</strong> Event-driven PRE loop showing Planner → Retriever → Executor → Critic → Memory with feedback.</div>
              </div>
            <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
              <p><strong>POMDP Formulation.</strong> SuperInference formalizes the agent as a Partially Observable Markov Decision Process (POMDP) with noisy retrieval and verification channels. The state s_t encodes task progress and environment facts (e.g., ground-truth variables in a math problem, available tools, unresolved subgoals), but the agent cannot directly observe s_t. Instead, it maintains a belief state b_t, a probability distribution over all possible states, summarizing all past information from observations and actions.</p>
              <p><strong>Event-Driven Architecture.</strong> Traditional reasoning systems operate step-by-step, executing computation at every time step. In contrast, SuperInference draws inspiration from spiking neural networks (SNNs), where discrete &quot;reasoning events&quot; play the role of spikes. The Planner remains silent most of the time and only &quot;fires&quot; when the system determines a reasoning step is necessary—when new information arrives or uncertainty exceeds a threshold. This event-driven approach achieves sparsity (computation only when needed) and adaptivity (events depend on uncertainty and information gain).</p>
              <p><strong>PRE Loop Components.</strong> The architecture can be summarized as an event-driven cognitive loop: Planner → Retriever → Executor → Critic → Memory / Feedback. The Planner maintains belief state b_t and fires events e_t when Expected Information Gain (EIG) exceeds threshold τ. The Retriever accesses external memory M_t through a noisy channel C_η with noise parameter η. The Executor generates candidate actions a_t conditional on subgoals and retrieved context. The Critic evaluates candidates with error rates (α, β) and gates memory updates according to precision formulas, ensuring only high-confidence items are stored.</p>
              <p><strong>Information-Theoretic Stopping.</strong> Reasoning halts when belief is sufficiently concentrated (max_s b_t(s) ≥ κ), marginal EIG falls below threshold (EIG_t ≤ ε), or budgets are exhausted. These criteria ensure a predictable trade-off between efficiency (few events) and solution quality.</p>
            </div>
          </div>
        </Section>

        <Section id="architecture" title="Event-Driven PRE Architecture" subtitle="Complete architecture with event triggering and noisy retrieval mechanism (from paper Fig. 2).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="lg:order-2">
              <Mermaid chart={deepAgent} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Event e_t (spike)": "Discrete reasoning events that trigger computation only when expected information gain exceeds threshold τ. Red spike visualization indicates event-driven activation.",
                Planner: "Maintains belief state b_t about hidden reasoning state. Fires events e_t=1 only when EIG threshold is met. Generates queries q_t to decompose tasks.",
                Retriever: "Accesses external memory M_t through noisy retrieval channel. Reads/writes memory with success probability p(η) where η controls retrieval reliability.",
                "External Memory M_t": "Vector database storing critic-approved artifacts with provenance metadata. Only high-precision items (per Eq. PPV) are stored.",
                Executor: "Generates candidate actions a_t conditional on planner subgoals g_t and retrieved context m̃_t. Uses specialized agents (Analyzer, Coder, Finalyzer, Debugger).",
                Critic: "Binary noisy observation with false-positive rate α and false-negative rate β. Returns approve/reject decisions that gate memory updates and trigger belief updates.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 3.</strong> Event-driven PRE architecture showing Planner → Retriever → Executor → Critic with Memory and feedback loops (from paper Fig. 2a).</div>
            </div>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7 lg:order-1">
              <p><strong>Event-Driven Efficiency.</strong> The combination of sparse Planner activation (red spikes e_t), noisy retrieval, and critic gating ensures that computation is concentrated only on informative events. This design achieves: (1) reduced number of unnecessary queries (sparse computation), (2) memory efficiency through only vetted candidates being stored, (3) multi-step reasoning capability where the system chains events to solve complex tasks, updating beliefs and memory iteratively, and (4) predictable performance through thresholds (τ, κ, ε) and critic error parameters (α, β) that allow controlling the trade-off between speed, accuracy, and memory usage.</p>
              <p><strong>Belief State Updates.</strong> The Planner maintains a belief state b_t, a probability distribution over hidden reasoning states. When the agent takes an action a_t and receives observation o_{'{'}t+1{'}'}, the belief updates via: b_{'{'}t+1{'}'}(s&apos;) ∝ Z(o_{'{'}t+1{'}'}|s&apos;,a_t) Σ_s T(s&apos;|s,a_t) b_t(s), combining a prediction step (based on previous belief and transition model) with a correction step (using the observation model). This Bayesian update allows the agent to track uncertainty and make informed decisions about when to fire events.</p>
              <p><strong>Expected Information Gain (EIG).</strong> Events fire only when Expected Information Gain exceeds threshold τ. EIG measures the expected reduction in uncertainty: EIG_t = E[H(b_t) - H(b_{'{'}t+1{'}'})] over observations o_{'{'}t+1{'}'}, where H(·) denotes Shannon entropy. This information-theoretic approach ensures computation occurs only when new information is expected to reduce uncertainty, making the reasoning process both efficient and principled.</p>
            </div>
          </div>
        </Section>

        <Section id="embeddings" title="Noisy Retrieval and Critic Gating" subtitle="Retrieval channel and precision mechanism (from paper Fig. 2b).">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Mermaid chart={embeddings} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
                "Planner query q_t": "Query generated by planner to retrieve relevant context from memory. May be perfectly formed but retrieval introduces noise.",
                "Retrieval channel C_η": "Noisy channel with parameter η controlling expected reliability. Lower η corresponds to cleaner, more accurate retrieval. Models approximate nearest neighbor search and imperfect summarization.",
                "Context m̃_t": "Noisy retrieved evidence from memory. May be partial, corrupted, or slightly off-topic due to retrieval noise η.",
                "Executor → a_t": "Generates candidate actions conditional on retrieved context. Actions are evaluated by the critic.",
                "Critic (α, β)": "Evaluates candidates with false-positive rate α and false-negative rate β. Precision of approved items follows P(correct|approve) = (1-β)p' / [(1-β)p' + α(1-p')].",
                "Memory M_{t+1}": "Only critic-approved artifacts are stored. Precision formula ensures memory quality. Rejected candidates trigger feedback loop for iterative refinement.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 4.</strong> Noisy retrieval channel C_η and critic gating mechanism showing how retrieval probability p(η) and critic errors (α,β) determine memory precision (from paper Fig. 2b).</div>
            </div>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p><strong>Noisy Channels Formalism.</strong> In SuperInference, both memory retrieval and candidate evaluation are treated as noisy channels, formalizing the idea that information is imperfect. This allows reasoning about reliability and errors, connecting to biological and information-theoretic analogies.</p>
              <p><strong>Retrieval Channel.</strong> When the Planner emits a query q_t, the Retriever accesses external memory M_t and returns a candidate snippet m̃_t. However, this process is not perfect: the returned item may be noisy, partially relevant, or even off-topic. We model this with a corruption channel C_η controlled by noise parameter η, where Pr(relevant | q_t) = p(η). Even if the query is perfectly formed, real retrieval systems (like approximate nearest neighbor search or imperfect summarization) may return partial, corrupted, or slightly off-topic information.</p>
              <p><strong>Critic Channel.</strong> The Critic evaluates candidate actions and outputs decisions c_t that can be either approve or reject, with error rates: α = Pr(c_t=approve | y_t=incorrect) (false positive rate) and β = Pr(c_t=reject | y_t=correct) (false negative rate). The precision of approved items—the probability that an approved candidate is actually correct—is given by P(correct|approve) = (1-β)p&apos; / [(1-β)p&apos; + α(1-p&apos;)], where p&apos; = Pr(y_t=correct) is the pre-critic probability of correctness.</p>
              <p><strong>Critic-Gated Memory (STDP Analogy).</strong> Once the Critic evaluates a_t, memory M_t is updated only if the candidate is approved. This mirrors spike-timing dependent plasticity (STDP) in neuroscience: only well-timed and verified events produce lasting changes in memory. Failed or incorrect candidates are ignored, preventing corruption. By modeling retrieval and Critic decisions as noisy channels, we quantify uncertainty and reliability in reasoning, connect to information-theoretic principles, and provide a principled mechanism for gated memory updates.</p>
            </div>
          </div>
        </Section>

        <Section id="results" title="Results" subtitle="Performance comparisons and efficiency analyses demonstrating SuperInference's effectiveness (from paper Section: Results).">
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
                <p><strong>Competitive Performance.</strong> Figure 5 compares SuperInference with leading models on the DABStep benchmark (Hard Tasks dataset). Using Gemini 2.5-pro as the base model, SuperInference achieves competitive or stronger results, especially on hard tasks where iterative refinement offers substantial benefit. Submitted to the official DABStep leaderboard, the system obtained an overall 3rd place overall on hard data-scientist–oriented tasks.</p>
                <p><strong>Evidence Accumulation.</strong> These results support our hypothesis that modeling reasoning as a partially observable process and accumulating evidence across rounds improves accuracy. The framework treats each attempt as a noisy evidence-bearing sample, transforming inference from a single-shot prediction to an accumulating reasoning process. Early attempts carry substantial informational value: models correct misconceptions, refine hypotheses, and approach the correct solution. Errors serve as informative signals rather than terminal failures.</p>
                <p><strong>Fair Evaluation.</strong> All tasks with ground truth are included, ensuring fair comparison. The analysis accounts for True Positives, True Negatives, False Positives, and False Negatives, providing a complete picture of the framework&apos;s performance across all outcomes.</p>
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
                <p><strong>Time-Per-Round Analysis.</strong> Panel (a) shows that mean time per round increases with iteration count, reflecting the growing complexity of tasks that require more iterations. However, the success rate (indicated by bubble color) remains high across all rounds, suggesting that the additional computational investment yields consistent improvements. This pattern indicates that SuperInference effectively leverages multiple rounds of reasoning to improve accuracy on challenging tasks.</p>
                <p><strong>EIG Efficiency Trends.</strong> Panel (b) shows Expected Information Gain (EIG) efficiency, measuring how effectively the framework gains information per unit time. The decreasing trend in EIG efficiency with more rounds indicates diminishing returns, as expected from information-theoretic principles: early rounds extract the most valuable information, while later rounds provide incremental refinements. This analysis informs optimal stopping criteria, balancing accuracy gains against computational costs.</p>
                <p><strong>Efficiency–Accuracy Trade-offs.</strong> Additional rounds improve accuracy but increase computational cost. EIG per unit time decreases as iterations progress, consistent with information-theoretic predictions. These trade-offs guide adaptive stopping strategies that balance target accuracy against latency and compute constraints. The visualization includes all tasks with ground truth, providing a complete picture of efficiency dynamics across both successful and failed attempts.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
                <p><strong>Task Completion Dynamics.</strong> Panel (a) tracks task completion across rounds, showing that most tasks complete within the first few rounds, with a sharp drop-off in later rounds. The cumulative success and failure rates reveal how the framework&apos;s performance accumulates over time, with success rates increasing more rapidly than failure rates in early rounds. This pattern aligns with theoretical predictions: early rounds provide the most significant improvements, while later rounds offer diminishing returns.</p>
                <p><strong>Code Complexity Analysis.</strong> Panel (b) investigates code refinement efficiency by correlating code length with success rate. The negative correlation suggests that longer code solutions are less likely to succeed, potentially indicating that successful solutions tend to be more concise and focused. This finding has practical implications for designing stopping criteria and guiding the refinement process toward simpler, more effective solutions.</p>
                <p><strong>Multi-Metric Evaluation.</strong> SuperInference evaluates reasoning not only through accuracy but through a family of complementary and theoretically grounded metrics: semantic deviation, calibration error, behavioral drift, entropy reduction, and mutual information. These metrics reveal behavioral signatures—such as latent signal accumulation, oscillatory drift, retrieval sensitivity, or over-long code refinements—that static benchmarks systematically miss. This supports multi-dimensional, noise-aware evaluation pipelines for agentic LLMs.</p>
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
                "Event e₀": "Initial event triggering observation of task o₀. Red spike indicates discrete reasoning activation.",
                "Observation: Receive task o₀": "Environment provides the task: 'In a class of 50 students, 40% are men. If 10 men leave. How many men remain?'",
                "Event e₁": "Triggers planner to decompose task into subquestions SQ1 and SQ2.",
                "Planner decomposes task": "Produces subquestions: SQ1 (how many men originally?) and SQ2 (how many remain after 10 leave?).",
                "SQ1: How many men were originally?": "First subquestion requiring intermediate computation.",
                "SQ2: Given original number and 10 leave, how many remain?": "Second subquestion that depends on SQ1 result.",
                "Event e₂": "Triggers execution of SQ2 after SQ1 is resolved.",
                "Language Model": "Generates candidate answers for each subquestion.",
                "SA1: 20 men": "Answer to SQ1 computed as 40% of 50.",
                "SA2: 10 men (20-10)": "Final answer computed using SA1 result.",
                Critic: "Validates answers with error rates (α, β). SA1 approved with probability 1-β, rejected with β.",
                "Memory M_{t+1}": "Stores approved answers (SQ1,SA1) and final result. Only critic-approved artifacts are persisted.",
              }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 8.</strong> Event-driven PRE stages showing complete flow with events e₀, e₁, e₂, execution chains for SQ1 and SQ2, critic validation, and memory updates (from paper Fig. 3a).</div>
            </div>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p><strong>Worked Example: Multi-Step Math.</strong> The example demonstrates how the event-driven Planner-Retriever-Executor (PRE) loop operates on a multi-step reasoning task. The problem is: &quot;In a class of 50 students, 40% are men. If 10 men leave. How many men remain?&quot; The agent cannot directly access the final answer and must reason through intermediate steps while interacting with memory and a Critic.</p>
              <p><strong>Event-Driven Activation.</strong> Events e_t represent discrete reasoning activations: e₀ triggers the Planner to observe the task o₀; e₁ triggers decomposition into subquestions SQ1 and SQ2; e₂ triggers execution for SQ2 after SQ1 has been resolved. This sparse, spike-like activation ensures computation occurs only when expected information gain is high, reducing unnecessary module usage.</p>
              <p><strong>Execution Flow.</strong> The Planner decomposes the task into subquestions: SQ1 asks how many men were originally in the class, and SQ2 asks how many remain after 10 leave. The Retriever may supply prior knowledge m̃_t with probability p, modeling noisy retrieval. The Executor computes candidate answers: SA1 = 20 men (40% of 50), and SA2 = 10 men (via 20-10). The Critic validates answers with error rates (α, β): SA1 is approved with probability 1-β, rejected with β. Approved answers are stored in M_{'{'}t+1{'}'} for future retrieval.</p>
              <p><strong>Belief Bookkeeping.</strong> Define S as the set containing s₂₀ and s_¬₂₀, representing whether the intermediate fact is 20. Initialize b₀(s₂₀) = 0.5. Each event observation updates the belief via the Bayesian update rule. A reliable Critic (small α, β) concentrates posterior mass on s₂₀, enabling the subsequent step. This example makes the abstract PRE framework concrete: the agent fires discrete reasoning events, retrieves or recalls context, computes candidate answers, checks them via a Critic, and updates memory iteratively.</p>
            </div>
          </div>
        </Section>

        <Section id="editor" title="AMI" subtitle="Agentic Multi-step Inference: VS Code extension, MCP server, and MCP client.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p><strong>AMI (Agentic Multi-step Inference)</strong> is the integrated system comprising three components: the AMI VS Code extension, the AMI MCP server, and the AMI MCP client. Together, they provide a complete agentic development environment.</p>
              <p>We chose the AMI VS Code extension as the primary interface because it meets developers where they work. The extension has access to open files, the active selection, and language servers, making it ideal for context gathering and precise edits. From a UX standpoint, the agent feels like an expert teammate: it can navigate to symbols, explain unfamiliar code, propose diffs, and run tests without forcing you to switch windows. Every action is visible in a panel with logs and a diff viewer so that review remains fast and safe.</p>
              <p>The AMI MCP server houses tools behind typed interfaces, while the AMI MCP client ensures protocol fidelity and typed schema validation. This separation allows organizations to restrict which tools are available, add project‑specific actions, and audit usage centrally. For example, a company could expose internal documentation search, a deployment simulator, or security scanners only through AMI MCP, while keeping the editor client simple. The result is a pragmatic path to agentic development that respects privacy, governance, and team standards.</p>
            </div>
          <div>
            <Mermaid chart={vscode} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ UI: "Interface", Extension: "Add-on", "Chat API": "Messaging", Backend: "Orchestrator", Tools: "Utilities", Codebase: "Files", Context: "References" }} descriptions={{
              UI: "Developer-facing interface inside the editor. Presents chat, diffs, logs, and navigation, keeping focus on code while exposing powerful retrieval and automation in a controlled, reviewable workflow that accelerates safe changes.",
                Extension: "The AMI VS Code extension hosting the assistant. Bridges UI and backend tools, gathers context from language servers, and applies edits with explicit approvals, preserving project standards and safety constraints consistently.",
                "Chat API": "Messaging layer enabling structured interactions through the AMI MCP client. Supports streaming responses, tool calls, and explanations, so users can understand reasoning, steer plans, and request changes without leaving their coding environment during active work.",
                Backend: "AMI MCP server coordinator behind the scenes running validators, searches, and code operations. Exposes typed tools with auditing, rate limits, and policies, allowing organizations to manage capabilities while keeping clients lightweight and secure.",
                Tools: "Operational actions such as grep, test, type-check, build, docker, or project tasks accessible through AMI MCP. Provide measurable outcomes that anchor agent decisions and verify progress continuously across steps with evidence.",
              Codebase: "The repository of files and symbols. Supplies definitions, references, and examples the agent navigates and modifies, ensuring proposed changes reflect real code and established patterns within the project over time.",
              Context: "Assembled knowledge passed to the model, blending retrieved snippets, summaries, and metadata. Keeps prompts compact and grounded so outputs remain accurate, actionable, and easy to review within constraints and budgets.",
            }} />
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 9.</strong> AMI architecture: UI ↔ VS Code extension ↔ MCP client ↔ MCP server ↔ tools and codebase.</div>
            </div>
          </div>
        </Section>

        <Section id="copy" title="How it Works" subtitle="Plan, act, observe, and loop with feedback.">
          <div className="mt-4 w-full space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>Figure 1–5 references.</strong> The session narrative ties back to Figures 1–5: you start with the overview loop, follow the architecture flow, pull in embedding context, iterate through feedback, and act through AMI.</p>
            <p>This section ties everything together from a developer’s perspective. A typical session starts with exploration: ask for an explanation of a file, jump to a symbol, or request a map of call sites. Once the task is clear, the agent drafts a plan that names the files it intends to change and the checks it will run. You can edit that plan like a checklist. When approved, the agent performs the smallest safe step, runs inexpensive validators, and reports back with logs and a preview diff. If results are good, it proceeds; if not, it explains what failed and proposes alternatives.</p>
            <p>The key benefit is momentum without loss of control. You always see context, plan, and evidence, and you can pause or redirect the flow at any time. Because the loop prefers objective signals—compilers, tests, type systems—the agent’s suggestions converge toward correctness rather than style alone. Over time, the system builds a memory of accepted patterns and project conventions, reducing friction and helping new engineers onboard faster. The outcome is a smoother path from idea to change request, all inside the editor.</p>
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
            <p>This project has received funding from the European Union&apos;s Horizon Europe research and innovation programme under grant agreement No 101093129.</p>
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
