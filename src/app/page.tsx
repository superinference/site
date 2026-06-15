"use client";

import CopyButton from "@/components/CopyButton";
import Asciinema from "@/components/Asciinema";
import MotionCard from "@/components/MotionCard";
import Mermaid from "@/components/Mermaid";
import { CLIDownloadCount, VSCodeDownloadCount } from "@/components/DownloadCount";
import { vscodeChart } from "@/data/charts";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">AMI</h1>
        <p className="text-sm sm:text-base font-medium tracking-wide text-neutral-500 dark:text-neutral-400">Agentic Multi-step Inference</p>
        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">An open-source AI coding agent that runs in your terminal and editor. Model-agnostic. Free.</p>
      </div>

      {/* Install */}
      <div className="mt-10 max-w-2xl mx-auto">
        <div className="relative rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-5 shadow-lg">
          <div className="absolute top-3 right-3">
            <CopyButton text="curl -fsSL https://www.superinference.org/install.sh | bash" label="Copy" />
          </div>
          <code className="text-sm sm:text-base text-neutral-800 dark:text-green-400 font-mono">curl -fsSL https://www.superinference.org/install.sh | bash</code>
        </div>
      </div>

      {/* Download links */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-center">
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

      {/* What AMI does */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: "Terminal & editor", desc: "Interactive REPL in your terminal or VS Code side panel. Full access to your codebase, tools, and environment." },
          { title: "Any model, free tiers", desc: "Works with OpenAI, Anthropic, Google, Groq, Mistral, and any OpenAI-compatible API. FRITO routes through free providers automatically." },
          { title: "Iterative reasoning", desc: "Plans, acts, retrieves context, and verifies results in a feedback loop — instead of guessing in a single shot." },
          { title: "You stay in control", desc: "Permission system classifies tool operations as safe, unsafe, or blocked. Full audit trail. Pause or redirect at any point." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-neutral-200 dark:border-white/10 p-5">
            <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{f.title}</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">How It Works</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Plan, act, observe, and loop with feedback.</p>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300 text-base/7">A typical session starts with exploration: ask for an explanation of a file, jump to a symbol, or request a map of call sites. Once the task is clear, the agent drafts a plan that names the files it intends to change and the checks it will run. When approved, the agent performs the smallest safe step, runs inexpensive validators, and reports back with logs and a preview diff. Because the loop prefers objective signals — compilers, tests, type systems — the agent&apos;s suggestions converge toward correctness rather than style alone.</p>
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
      </div>

      {/* Architecture */}
      <div id="architecture" className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Architecture</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">VS Code extension, terminal CLI, and OpenClaw plugin — all sharing a single TypeScript engine.</p>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-sm/6">
            <p>AMI unifies planning, retrieval, execution, and verification into a single reasoning loop. The shared engine implements the PRE loop with 15 built-in tools and multi-provider LLM support (OpenAI, Anthropic, Google, DeepSeek, Ollama, OpenRouter).</p>
            <p>The engine houses tools behind typed interfaces with a permission system that classifies operations as safe, unsafe, or blocked. Organizations can restrict available tools, add project-specific actions, and audit usage centrally.</p>
          </div>
          <div>
            <Mermaid chart={vscodeChart} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ UI: "Interface", VSCode: "VS Code", CLI: "CLI", OpenClaw: "OpenClaw", Engine: "Engine", Tools: "Tools", Codebase: "Files", DABStep: "Benchmark" }} descriptions={{
              UI: "Developer-facing interface. Presents chat, diffs, logs, and navigation.",
              VSCode: "AMI VS Code extension. Gathers context from language servers and applies edits with explicit approvals.",
              CLI: "Terminal REPL interface for scripting and headless workflows. Supports session management and all 15 built-in tools.",
              OpenClaw: "OpenClaw plugin (in development) that wraps all SuperInference tools for integration with OpenClaw agents.",
              Engine: "Core TypeScript engine: runs the complete PRE loop — planning, retrieval, execution, belief updates, and critic-gated memory.",
              Tools: "15 built-in tools: file operations, code search, execution, web access, interaction, and notebook editing.",
              Codebase: "The repository of files and symbols the agent navigates and modifies.",
              DABStep: "DABStep benchmark integration for systematic evaluation with ground-truth verifiers.",
            }} />
          </div>
        </div>
      </div>

      {/* Demo */}
      <div className="mt-20 max-w-2xl mx-auto space-y-10">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">Basic workflow</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Install AMI, start a session, and interact with your codebase using natural language.</p>
          <Asciinema id="LiYxHAXGPB8ehrl4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">FRITO — Free-tier Retrieval & Inference Token Ops</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Route requests through free-tier providers automatically — no API keys or costs required.</p>
          <Asciinema id="jZDshuH2K2jjIuLv" />
        </div>
      </div>

    </main>
  );
}
