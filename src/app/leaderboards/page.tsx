"use client";

import PageLayout from "@/components/PageLayout";
import { leaderboardsToc } from "@/data/nav";
import Image from "next/image";

export default function LeaderboardsPage() {
  return (
    <PageLayout
      title="Leaderboards"
      subtitle="AMI's performance on industry-standard benchmarks."
      toc={leaderboardsToc}
      tocTitle="Leaderboards"
    >
      {/* Overview */}
      <div id="overview" className="scroll-mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Overview</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          AMI demonstrates state-of-the-art performance across multiple software engineering benchmarks,
          achieving top rankings through its iterative reasoning approach and comprehensive tool integration.
        </p>
      </div>

      {/* SWE Bench Live Lite */}
      <div id="swebench-live-lite" className="scroll-mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">SWE Bench Live Lite</h2>

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
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">🥇 #1</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Ranking</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">63.0%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">300</div>
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

    </PageLayout>
  );
}
