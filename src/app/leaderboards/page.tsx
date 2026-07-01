"use client";

import PageLayout from "@/components/PageLayout";
import { leaderboardsToc } from "@/data/nav";
import Image from "next/image";

export default function LeaderboardsPage() {
  return (
    <PageLayout
      title="Leaderboards"
      subtitle="Benchmark results from the SuperInference project."
      toc={leaderboardsToc}
      tocTitle="Benchmarks"
    >

      {/* AMI Benchmarks */}
      <div id="ami-benchmarks" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">AMI</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">Agentic Multi-Step Inference benchmark results.</p>
        </div>

        <div className="mt-8 space-y-10">
          {/* SWE Bench Live Lite */}
          <div id="swebench-live-lite" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">SWE Bench Live Lite</h3>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">June 2026</p>

            <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                SWE-bench-Live is a continuously updated benchmark that evaluates AI coding agents on real-world software
                engineering tasks from active GitHub repositories. The Lite variant consists of 300 curated test instances
                spanning multiple programming languages and frameworks, testing an agent&apos;s ability to understand codebases,
                locate bugs, and implement correct fixes.
              </p>
              <p>
                Unlike static benchmarks, SWE-bench-Live uses recent GitHub issues to prevent data contamination and ensure
                that evaluated systems must genuinely reason about unfamiliar code rather than retrieve memorized solutions.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">🥇 #1</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">63.0%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">300</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Valid Instances</div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 space-y-3">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold">AMI Agent + Claude-4.6-Opus</span> achieved a 63.0% resolution rate on SWE-bench-Live Lite,
                    securing first place and establishing a new state-of-the-art result on this benchmark.
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    This performance is <span className="font-semibold text-blue-600 dark:text-blue-400">nearly twice as strong</span> as
                    the second-place result (36.0%), demonstrating AMI&apos;s superior ability to understand complex codebases,
                    retrieve relevant context, and iteratively refine solutions through its PRE loop architecture.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden">
                <Image
                  src="/leaderboards/swebench_live_lite.png"
                  alt="SWE Bench Live Lite Leaderboard showing AMI Agent + Claude-4.6-Opus at #1 with 63.0%"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                Evaluation conducted June 2026. Source: <a href="https://swe-bench-live.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">swe-bench-live.github.io</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SuperInference Benchmarks */}
      <div id="superinference-benchmarks" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">SuperInference</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">SuperInference framework benchmark results.</p>
        </div>

        <div className="mt-8 space-y-10">
          {/* DABStep */}
          <div id="dabstep" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">DABStep</h3>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">2025</p>

            <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                DABStep (Data Agent Benchmark for Structured Tasks) is a benchmark designed to evaluate AI agents on
                hard data analysis tasks requiring multi-step reasoning, code generation, and structured output.
                The Hard Tasks subset tests the most challenging problems where agents must navigate complex data
                transformations and produce precise numerical answers.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">🥉 #3</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">41.3%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Hard Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">Gemini 2.5 Pro</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Model</div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 space-y-3">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold">SuperInference + Gemini 2.5 Pro</span> achieved 41.3% hard accuracy on the DABStep benchmark,
                    ranking 3rd overall and outperforming direct prompting baselines from larger and more expensive model families.
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    This result demonstrates that SuperInference&apos;s iterative PRE loop architecture can elevate a
                    mid-tier model to compete with top-tier agents, raising Gemini 2.5 Pro&apos;s baseline performance
                    from 12.7% to 41.3% — a <span className="font-semibold text-blue-600 dark:text-blue-400">3.25x improvement</span> through
                    feedback-augmented reasoning alone.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden">
                <Image
                  src="/plots/fig11_sota_leaderboard.png"
                  alt="DABStep Hard Tasks leaderboard showing SuperInference + Gemini 2.5 Pro at #3 with 41.3%"
                  width={1200}
                  height={500}
                  className="w-full h-auto"
                />
              </div>

              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                SuperInference vs State-of-the-Art on DABStep Hard Tasks Dataset.
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageLayout>
  );
}
