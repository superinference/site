"use client";

import CopyButton from "@/components/CopyButton";
import Asciinema from "@/components/Asciinema";
import MotionCard from "@/components/MotionCard";
import Mermaid from "@/components/Mermaid";
import PageLayout from "@/components/PageLayout";
import { CLIDownloadCount, VSCodeDownloadCount } from "@/components/DownloadCount";
import { vscodeChart } from "@/data/charts";
import { homeToc } from "@/data/nav";

export default function Home() {
  return (
    <PageLayout title="SuperInference" subtitle="An iterative reasoning framework for large language models. Open source. Information-theoretic. Feedback-augmented." toc={homeToc} titleClassName="text-5xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">

      {/* Framework */}
      <div id="framework" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Framework</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">Plan, retrieve, execute, and loop with feedback.</p>
        </div>

        <div className="mt-8 space-y-10">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>SuperInference replaces heuristic retry limits with information-theoretic stopping criteria. Instead of guessing once or retrying blindly, the framework plans actions, retrieves context, executes steps, and loops with critic-gated feedback — stopping exactly when additional reasoning stops helping.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "Plan", copy: "Assemble context and create a task list." },
              { title: "Retrieve", copy: "Search, read, and gather relevant code and documentation." },
              { title: "Execute", copy: "Apply edits, run tools, and capture feedback for the next loop." },
            ].map((card, i) => (
              <MotionCard key={card.title} title={card.title} delay={0.1 * i}>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm/6">{card.copy}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </div>

      {/* AMI */}
      <div id="ami" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">AMI</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">The autonomous coding agent built on SuperInference. Model-agnostic. Sovereign. Free.</p>
        </div>

        <div className="mt-8 space-y-10">
          {/* Install */}
          <div id="install" className="scroll-mt-20">
            <div className="relative rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-5 shadow-lg">
              <div className="absolute top-3 right-3">
                <CopyButton text="curl -fsSL https://www.superinference.org/install.sh | bash" label="Copy" />
              </div>
              <code className="text-sm sm:text-base text-neutral-800 dark:text-green-400 font-mono">curl -fsSL https://www.superinference.org/install.sh | bash</code>
            </div>
          </div>

          {/* Download links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
            <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="group rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">VS Code Extension</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Marketplace</div>
              <VSCodeDownloadCount />
            </a>
            <a href="https://github.com/superinference/releases/releases/latest" target="_blank" rel="noreferrer" className="group rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">CLI Binary</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">All platforms</div>
              <CLIDownloadCount />
            </a>
          </div>

          {/* Features */}
          <div id="features" className="scroll-mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Terminal & editor", desc: "Interactive REPL in your terminal with a VS Code extension for monitoring sessions. Full access to your codebase, tools, and environment." },
              { title: "Any model, free tiers", desc: "Works with OpenAI, Anthropic, Google, Groq, Mistral, and any OpenAI-compatible API. FRITO routes through free providers automatically." },
              { title: "Iterative reasoning", desc: "Plans, retrieves context, executes actions, and verifies results in a feedback loop — instead of guessing in a single shot." },
              { title: "You stay in control", desc: "Permission system classifies tool operations as safe, unsafe, or blocked. Full audit trail. Pause or redirect at any point." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-neutral-200 dark:border-white/10 p-5">
                <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{f.title}</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">How It Works</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">From exploration to verified fix in a single session.</p>
        </div>

        <div className="mt-8 space-y-10">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>A typical session starts with exploration: ask for an explanation of a file, jump to a symbol, or request a map of call sites. Once the task is clear, the agent drafts a plan that names the files it intends to change and the checks it will run. When approved, the agent performs the smallest safe step, runs inexpensive validators, and reports back with logs and a preview diff. Because the loop prefers objective signals — compilers, tests, type systems — the agent&apos;s suggestions converge toward correctness rather than style alone.</p>
          </div>

          {/* Architecture */}
          <div id="architecture" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Architecture</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">VS Code extension, terminal CLI, and OpenClaw plugin — all sharing a single core engine.</p>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-sm/6">
                <p>AMI unifies planning, retrieval, execution, and verification into a single reasoning loop. The shared engine implements the PRE loop with 45+ built-in tools and multi-provider LLM support (OpenAI, Anthropic, Google, DeepSeek, Ollama, OpenRouter).</p>
                <p>The engine houses tools behind typed interfaces with a permission system that classifies operations as safe, unsafe, or blocked. Organizations can restrict available tools, add project-specific actions, and audit usage centrally.</p>
              </div>
              <div>
                <Mermaid chart={vscodeChart} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ UI: "Interface", VSCode: "VS Code", CLI: "CLI", OpenClaw: "OpenClaw", Engine: "Engine", Tools: "Tools", Codebase: "Files", DABStep: "Benchmark" }} descriptions={{
                  UI: "Developer-facing interface. Presents chat, diffs, logs, and navigation.",
                  VSCode: "AMI VS Code extension for monitoring active agent sessions, viewing diffs, and tracking progress.",
                  CLI: "Terminal REPL interface for scripting and headless workflows. Supports session management and all 45+ built-in tools.",
                  OpenClaw: "OpenClaw plugin (in development) that wraps all SuperInference tools for integration with OpenClaw agents.",
                  Engine: "Core TypeScript engine: runs the complete PRE loop — planning, retrieval, execution, belief updates, and critic-gated memory.",
                  Tools: "45+ built-in tools: file operations, code search, execution, web access, interaction, and notebook editing.",
                  Codebase: "The repository of files and symbols the agent navigates and modifies.",
                  DABStep: "DABStep benchmark integration for systematic evaluation with ground-truth verifiers.",
                }} />
              </div>
            </div>
          </div>

          {/* Demo */}
          <div id="demo" className="scroll-mt-20 space-y-10">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Demo</h3>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Basic workflow</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Install AMI, start a session, and interact with your codebase using natural language.</p>
              <Asciinema id="LiYxHAXGPB8ehrl4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">FRITO — Free-tier Retrieval & Inference Token Ops</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Route requests through free-tier providers automatically — no API keys or costs required.</p>
              <Asciinema id="jZDshuH2K2jjIuLv" />
            </div>
          </div>
        </div>
      </div>

      {/* Sovereignty */}
      <div id="sovereignty" className="scroll-mt-20">
        <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Sovereign AI</h2>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">Full control over your AI agents, models, and data — on your infrastructure.</p>
        </div>

        <div className="mt-8 space-y-10">
          <div id="sovereign-cloud" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Sovereign Cloud</h3>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p>The European Union&apos;s sovereign cloud strategy requires that critical infrastructure — including AI systems — operates under European jurisdiction with full data residency, transparency, and independence from non-EU providers. AMI is designed from the ground up to meet these requirements.</p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Data stays on-premise", desc: "AMI runs entirely on your infrastructure. Code, prompts, and outputs never leave your environment. No telemetry, no cloud dependencies." },
                { title: "Any model, any provider", desc: "Connect to self-hosted models via Ollama, vLLM, or any OpenAI-compatible endpoint. No mandatory dependency on US hyperscalers." },
                { title: "Air-gapped deployment", desc: "OpenShell containers run fully disconnected. Mirror the image, point to a local LLM endpoint, and operate without internet access." },
                { title: "Open source core", desc: "The core SuperInference framework is distributed under the Apache 2.0 license." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-neutral-200 dark:border-white/10 p-5">
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{f.title}</div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="sovereign-agents" className="scroll-mt-20">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Sovereign Agents</h3>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
              <p>Agentic sovereignty means owning the full stack — the agent, the models it reasons with, and the infrastructure it runs on. Most AI coding agents are locked to a single commercial provider, making your development workflow dependent on external APIs, pricing decisions, and data policies you don&apos;t control.</p>
              <p>AMI breaks this dependency chain. The agent is built on the open-source SuperInference framework. The model is your choice — from frontier APIs to fully local inference. The deployment is your infrastructure — a laptop, a private cloud, or an air-gapped data center. FRITO eliminates cost as a barrier by routing through free-tier providers. The result is the AI coding agent that is genuinely yours: sovereign in code, sovereign in compute, sovereign in data.</p>
            </div>
          </div>
        </div>
      </div>

    </PageLayout>
  );
}
