"use client";

import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import CodeBlock from "@/components/CodeBlock";
import { researchToc } from "@/data/nav";
import { papers } from "@/data/papers";
import Abstract from "@/components/research/Abstract";
import Background from "@/components/research/Background";
import PreLoop from "@/components/research/PreLoop";
import Results from "@/components/research/Results";
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
          <Results />
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
              <p>AMI (Agentic Multi-step Inference) is an autonomous software engineering agent built on SuperInference. It takes a task — typically a GitHub issue — and autonomously plans edits, retrieves code context, applies changes, and validates them against tests, looping until the fix converges or the budget runs out. No single-shot guessing: every edit is verified before the agent moves on.</p>
              <p>Available as a VS Code extension and terminal CLI, AMI is model-agnostic and works with any LLM provider. On <a href="https://swe-bench-live.github.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">SWE-bench Live Lite</a> — a continuously updated benchmark of 300 real-world GitHub issues — AMI currently holds first place, resolving 63.0% of tasks and nearly doubling the second-place system.</p>
            </div>
          </section>

          {/* The Challenge */}
          <section id="ami-challenge" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">The Challenge</h2>
            <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
              <p>Autonomous coding agents face a harder version of the reasoning problem: they must navigate large, unfamiliar codebases, make precise edits across multiple files, and verify that their changes actually work — all without human guidance. A single wrong edit can cascade through tests and break unrelated functionality.</p>
              <p>Existing agents either generate a patch in one shot and hope it passes, or retry with simple heuristics. Neither approach scales to real-world issues where the fix requires understanding repository structure, tracing dependencies, and iterating on test failures. AMI addresses this by applying SuperInference&apos;s formal reasoning loop to the software engineering domain.</p>
            </div>
          </section>

          {/* How It Works */}
          <section id="ami-approach" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">How It Works</h2>
            <div className="w-full text-neutral-700 dark:text-neutral-300 text-base/7 space-y-3">
              <p>AMI extends SuperInference&apos;s PRE loop with software-engineering-specific capabilities. Given a GitHub issue, the agent explores the repository, identifies relevant files, formulates an edit plan, applies changes through structured tool calls, and runs the test suite. If tests fail, the critic rejects the attempt and the agent refines its approach — with each iteration informed by what it learned from the failure.</p>
              <p>The same information-theoretic stopping criteria govern when AMI should keep iterating and when it should commit. This prevents both premature stops on hard bugs and wasteful retries when the fix is already correct.</p>
            </div>
          </section>

          {/* Results */}
          <section id="ami-results" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Results</h2>

            {/* SWE-bench Live Lite */}
            <div id="ami-results-lite" className="scroll-mt-20">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white mt-6 mb-3">SWE-bench Live Lite</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">#1</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Ranking</div>
                </div>
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">63.0%</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Resolved</div>
                </div>
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">189</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Problems Solved</div>
                </div>
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">1.75&times;</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">More Solved vs 2nd</div>
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-5 overflow-x-auto">
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
                      <td className="py-2 text-right">06/25/2026</td>
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
            </div>

            {/* SWE-bench Live Rust */}
            <div id="ami-results-rust" className="scroll-mt-20">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white mt-8 mb-3">SWE-bench Live Rust</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">#1</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Ranking</div>
                </div>
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">48.9%</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Resolved</div>
                </div>
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">46</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Problems Solved</div>
                </div>
                <div className="text-center rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 py-3 px-2">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">2.7&times;</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">More Solved vs 2nd</div>
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-5 overflow-x-auto">
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
                      <td className="py-2 text-right font-semibold text-blue-600 dark:text-blue-400">48.9%</td>
                      <td className="py-2 text-right">94</td>
                      <td className="py-2 text-right">06/25/2026</td>
                    </tr>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2">2</td>
                      <td className="py-2">SWE-agent + Gemini3-Flash</td>
                      <td className="py-2 text-right">37.8%</td>
                      <td className="py-2 text-right">45</td>
                      <td className="py-2 text-right">01/08/2026</td>
                    </tr>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2">3</td>
                      <td className="py-2">OpenHands + Gemini3-Flash</td>
                      <td className="py-2 text-right">35.6%</td>
                      <td className="py-2 text-right">45</td>
                      <td className="py-2 text-right">01/08/2026</td>
                    </tr>
                    <tr>
                      <td className="py-2">4</td>
                      <td className="py-2">SWE-agent + Deepseek-v4-Pro</td>
                      <td className="py-2 text-right">34.4%</td>
                      <td className="py-2 text-right">64</td>
                      <td className="py-2 text-right">06/05/2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
                Source: <a href="https://swe-bench-live.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">swe-bench-live.github.io</a> &middot; June 2026
              </p>
            </div>
          </section>

          {/* Cite */}
          <section id="ami-cite" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Cite</h2>
            <div className="w-full space-y-6">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 p-4 shadow-sm dark:shadow-none">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {amiPaper.title} {amiPaper.doi && <a href={amiPaper.doi} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">(doi)</a>}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {amiPaper.venue}
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
