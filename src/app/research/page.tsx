"use client";

import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import CodeBlock from "@/components/CodeBlock";
import { researchToc } from "@/data/nav";
import { papers } from "@/data/papers";
import Abstract from "@/components/research/Abstract";
import Background from "@/components/research/Background";
import PreLoop from "@/components/research/PreLoop";
import Architecture from "@/components/research/Architecture";
import Retrieval from "@/components/research/Retrieval";
import Results from "@/components/research/Results";
import Benchmarks from "@/components/research/Benchmarks";
import WorkedExample from "@/components/research/WorkedExample";
import Cite from "@/components/research/Cite";
import Acknowledgements from "@/components/research/Acknowledgements";

const linkClass = "underline decoration-neutral-400 dark:decoration-neutral-500 hover:decoration-neutral-700 dark:hover:decoration-neutral-300 transition-colors";

const funders = [
  {
    logos: [{ src: "/research_eu.svg", alt: "Co-funded by the European Union", width: 406 }],
    description: <>European Union&apos;s Horizon Europe research and innovation programme under grant agreement No <a href="https://cordis.europa.eu/project/id/101093129" target="_blank" rel="noopener noreferrer" className={linkClass}>101093129</a>.</>,
  },
  {
    logos: [
      { src: "/research_es.svg", alt: "Gobierno de España — Ministerio de Ciencia, Innovación y Universidades", width: 352 },
      { src: "/research_aei.svg", alt: "Agencia Estatal de Investigación", width: 300 },
    ],
    description: <>Spanish Ministry of Science and Agencia Estatal de Investigación (AEI) with projects <a href="https://produccioncientifica.ucm.es/proyectos/921051/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2023-149943OB-I00</a> and <a href="https://ucase.gitlab.io/public/awesome/" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2021-122215NB-C31</a>.</>,
  },
  {
    logos: [{ src: "/research_mad.svg", alt: "Comunidad de Madrid", width: 252 }],
    description: <>Region of Madrid project <a href="https://produccioncientifica.ucm.es/proyectos/1049052/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>TEC-2024/COM-235</a>.</>,
  },
];

export default function ResearchPage() {
  const amiPaper = papers.find((p) => p.id === 2)!;

  return (
    <PageLayout title="Research" subtitle="Papers and publications from the SuperInference project." toc={researchToc} tocTitle="Papers">

      {/* Paper: SuperInference */}
      <div id="superinference" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">SuperInference</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Feedback-augmented, information-theoretic, and open-source framework for iterative reasoning in LLMs.
          </p>
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
            Universidad Complutense de Madrid &middot; 2026
          </p>
        </div>
        <div className="mt-8 space-y-10">
          <Abstract />
          <Background />
          <PreLoop />
          <Architecture />
          <Retrieval />
          <Results />
          <Benchmarks />
          <WorkedExample />
          <Cite />
          <Acknowledgements />
        </div>
      </div>

      {/* Paper: AMI */}
      <div id="ami" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">AMI</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Agentic Multi-Step Inference for Autonomous Software Engineering.
          </p>
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
            Universidad Complutense de Madrid &middot; 2026
          </p>
        </div>

        <div className="mt-8 space-y-10">

          {/* Abstract */}
          <section id="ami-abstract" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Abstract</h2>
            <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
              <p>We present AMI (Agentic Multi-step Inference), an autonomous software engineering agent that combines multi-step inference with tool-augmented reasoning to resolve real-world programming tasks. Built on the SuperInference framework, AMI implements a closed-loop architecture where planning, code retrieval, editing, and verification are orchestrated through iterative self-correction rather than single-shot generation.</p>
              <p>AMI operates as both a VS Code extension and a terminal CLI, interfacing with multiple LLM providers while maintaining a model-agnostic design. The agent decomposes complex software engineering tasks into manageable sub-goals, retrieves relevant code context through embedding-based search, applies targeted edits, and validates changes against test suites and static analysis — looping until convergence or budget exhaustion.</p>
              <p>On SWE-bench-Live Lite, AMI paired with Claude-4.6-Opus achieves a 63.0% resolution rate across 300 validated instances, ranking first on the leaderboard and nearly doubling the second-place result (36.0%). This performance demonstrates that iterative, feedback-driven inference with principled stopping criteria can substantially outperform single-pass approaches on realistic software engineering benchmarks.</p>
            </div>
          </section>

          {/* Approach */}
          <section id="ami-approach" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Approach</h2>
            <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
              <p>AMI extends the Plan-Retrieve-Execute (PRE) loop introduced in SuperInference with agent-specific capabilities for autonomous software engineering. The system receives a task description (typically a GitHub issue), explores the repository structure, formulates an edit plan, and iteratively refines its solution through execution feedback.</p>
              <p>The architecture is organized around three core phases that repeat until the task is resolved or the iteration budget is exhausted:</p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Plan", desc: "Decompose the task into sub-goals, identify relevant files and symbols, and draft a sequence of edits." },
                { title: "Act", desc: "Apply code modifications using structured tool calls, run tests, and capture execution results." },
                { title: "Reflect", desc: "Evaluate outcomes against expectations, update beliefs, and decide whether to iterate, backtrack, or commit." },
              ].map((phase) => (
                <div key={phase.title} className="rounded-xl border border-neutral-200 dark:border-white/10 p-5">
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{phase.title}</div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Results */}
          <section id="ami-results" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Results</h2>
            <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
              <p>AMI was evaluated on SWE-bench-Live Lite, a continuously updated benchmark of 300 real-world GitHub issues spanning multiple programming languages and frameworks. The benchmark uses recent issues to prevent data contamination and ensure genuine reasoning over unfamiliar codebases.</p>
            </div>
            <div className="mt-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Rank</th>
                    <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Method</th>
                    <th className="text-right py-2 font-semibold text-neutral-900 dark:text-white">Resolved</th>
                    <th className="text-right py-2 font-semibold text-neutral-900 dark:text-white">Instances</th>
                    <th className="text-right py-2 font-semibold text-neutral-900 dark:text-white">Date</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700 dark:text-neutral-300">
                  <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-blue-50/50 dark:bg-blue-900/10">
                    <td className="py-2 font-semibold text-blue-600 dark:text-blue-400">1</td>
                    <td className="py-2 font-semibold">AMI Agent + Claude-4.6-Opus</td>
                    <td className="py-2 text-right font-semibold text-blue-600 dark:text-blue-400">63.0%</td>
                    <td className="py-2 text-right">300</td>
                    <td className="py-2 text-right">06/23/2026</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-2">2</td>
                    <td className="py-2">SWE-agent + Claude-4.5-Sonnet</td>
                    <td className="py-2 text-right">36.0%</td>
                    <td className="py-2 text-right">300</td>
                    <td className="py-2 text-right">12/01/2025</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-neutral-800">
                    <td className="py-2">3</td>
                    <td className="py-2">OpenHands + Qwen3-Coder-480B-A35B</td>
                    <td className="py-2 text-right">24.7%</td>
                    <td className="py-2 text-right">300</td>
                    <td className="py-2 text-right">07/25/2025</td>
                  </tr>
                  <tr>
                    <td className="py-2">4</td>
                    <td className="py-2">SWE-agent + GPT5-Thinking (Medium)</td>
                    <td className="py-2 text-right">24.3%</td>
                    <td className="py-2 text-right">300</td>
                    <td className="py-2 text-right">11/01/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              Source: <a href="https://swe-bench-live.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">swe-bench-live.github.io</a> &middot; June 2026
            </p>
          </section>

          {/* Cite */}
          <section id="ami-cite" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Cite</h2>
            <div className="w-full space-y-6">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 p-4 shadow-sm dark:shadow-none">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {amiPaper.title} <a href={amiPaper.doi} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">(doi)</a>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {amiPaper.venue} &middot; <a href={amiPaper.doi} target="_blank" rel="noreferrer" className="underline hover:no-underline">{amiPaper.doi}</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300 text-base/7">{amiPaper.summary}</p>
                <div className="mt-3">
                  <CodeBlock lang="bibtex" code={amiPaper.bibtex} />
                </div>
              </div>
            </div>
          </section>

          {/* Acknowledgements */}
          <section id="ami-funding" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Acknowledgements</h2>
            <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-8">
              <p>This project has received funding from the European Union&apos;s Horizon Europe research and innovation programme under grant agreement No <a href="https://cordis.europa.eu/project/id/101093129" target="_blank" rel="noopener noreferrer" className={linkClass}>101093129</a>, the Spanish Ministry of Science with projects <a href="https://produccioncientifica.ucm.es/proyectos/921051/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2023-149943OB-I00</a> and <a href="https://ucase.gitlab.io/public/awesome/" target="_blank" rel="noopener noreferrer" className={linkClass}>PID2021-122215NB-C31</a>, and the Region of Madrid project <a href="https://produccioncientifica.ucm.es/proyectos/1049052/detalle?lang=en" target="_blank" rel="noopener noreferrer" className={linkClass}>TEC-2024/COM-235</a>.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {funders.map((f) => (
                  <div key={f.logos[0].src} className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 p-5">
                    <div className="flex flex-col items-center justify-center gap-3 w-full">
                      {f.logos.map((l) => (
                        <Image key={l.src} src={l.src} alt={l.alt} width={l.width} height={95} className="h-10 w-auto max-w-full" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>

    </PageLayout>
  );
}
