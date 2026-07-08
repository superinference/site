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

      {/* SuperInference Benchmarks */}
      <div id="superinference" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">SuperInference</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Iterative reasoning framework for LLMs.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {/* DABStep */}
          <div id="dabstep" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">DABStep</h3>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">2025</p>

            <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                DABStep (Data Agent Benchmark for Structured Tasks) evaluates AI agents on
                hard data analysis tasks requiring multi-step reasoning, code generation, and structured output.
                The Hard Tasks subset tests the most challenging problems where agents must navigate complex data
                transformations and produce precise numerical answers.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">#3</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">41.3%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Hard Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">3.25&times;</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">vs Baseline</div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 space-y-3">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold">SuperInference + Gemini 2.5 Pro</span> achieved 41.3% hard accuracy on DABStep,
                    ranking 3rd overall — a <span className="font-semibold text-blue-600 dark:text-blue-400">3.25&times; improvement</span> over
                    the base model&apos;s 12.7% through feedback-augmented reasoning alone.
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
                SuperInference vs state-of-the-art on DABStep Hard Tasks. December 2025.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AMI Benchmarks */}
      <div id="ami" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">AMI</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Autonomous software engineering agent built on SuperInference.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {/* SWE Bench Live Lite */}
          <div id="swebench-live-lite" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">SWE Bench Live Lite</h3>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">June 2026</p>

            <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                SWE-bench Live is a continuously updated benchmark of 300 real-world GitHub issues
                spanning multiple programming languages and frameworks. It uses recent issues to prevent
                data contamination, ensuring agents must genuinely reason about unfamiliar code.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">#1</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">63.0%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">189</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">1.75&times;</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">More Solved vs 2nd</div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 space-y-3">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold">AMI Agent + Claude-4.6-Opus</span> solved <span className="font-semibold text-blue-600 dark:text-blue-400">189 out of 300</span> issues
                    (63.0%), securing first place. The runner-up solved 108 out of 300 (36.0%) — AMI
                    solved <span className="font-semibold text-blue-600 dark:text-blue-400">1.75&times; more problems</span> in
                    absolute terms.
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
                Source: <a href="https://swe-bench-live.github.io/#leaderboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">swe-bench-live.github.io</a>. June 2026.
              </div>
            </div>
          </div>

          {/* SWE Bench Live Rust */}
          <div id="swebench-live-rust" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">SWE Bench Live Rust</h3>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">June 2026</p>

            <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                The Rust subset of SWE-bench Live evaluates agents on real-world Rust issues —
                a particularly demanding language for automated software engineering due to its strict
                type system, ownership model, and compiler constraints.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">#1</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">48.9%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">46</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">2.7&times;</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">More Solved vs 2nd</div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 space-y-3">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-semibold">AMI Agent + Claude-4.6-Opus</span> solved <span className="font-semibold text-blue-600 dark:text-blue-400">46 out of 94</span> Rust
                    issues (48.9%), securing first place. The runner-up (SWE-agent + Gemini3-Flash) solved 17 out of 45 (37.8%) — AMI
                    solved <span className="font-semibold text-blue-600 dark:text-blue-400">2.7&times; more problems</span> in
                    absolute terms, while also maintaining a higher resolution rate across a test set that
                    was more than twice as large.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden">
                <Image
                  src="/leaderboards/swebench_live_rust.png"
                  alt="SWE Bench Live Rust Leaderboard showing AMI Agent + Claude-4.6-Opus at #1 with 48.9%"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                Source: <a href="https://swe-bench-live.github.io/#leaderboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">swe-bench-live.github.io</a>. June 2026.
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageLayout>
  );
}
