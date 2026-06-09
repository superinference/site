"use client";

import Section from "@/components/Section";
import Mermaid from "@/components/Mermaid";
import { vscodeChart } from "@/data/charts";

export default function AmiPage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section id="editor" title="AMI: Agentic Multi-step Inference" subtitle="VS Code extension (Marketplace), terminal CLI (releases), and OpenClaw plugin (in development).">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>AMI (Agentic Multi-step Inference)</strong> unifies planning, retrieval, execution, and verification into a single reasoning loop. The framework is built around a shared <strong>TypeScript engine</strong> that implements the PRE loop—planning, retrieval, execution, belief updates, and critic-gated memory—with 15 built-in tools and multi-provider LLM support (OpenAI, Anthropic, Google, DeepSeek, Ollama, OpenRouter). AMI is available through multiple frontends: a <strong>VS Code extension</strong> publicly available at <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="underline hover:no-underline">Microsoft&apos;s VS Code Marketplace</a>, a <strong>terminal CLI</strong> distributed via the <a href="https://github.com/superinference/site/releases/latest" target="_blank" rel="noreferrer" className="underline hover:no-underline">project releases</a>, and an <strong>OpenClaw plugin</strong> currently in development. The initial implementation used for the benchmark evaluation described in the paper is available in a separate branch of the repository.</p>
            <p>The VS Code extension meets developers where they work. It has access to open files, the active selection, and language servers, making it ideal for context gathering and precise edits. The terminal CLI provides a lightweight REPL interface for scripting and headless workflows. The OpenClaw plugin (in development) will integrate SuperInference tools into OpenClaw agents. From a UX standpoint, the agent feels like an expert teammate: it can navigate to symbols, explain unfamiliar code, propose diffs, and run tests without forcing you to switch windows. Every action is visible in a panel with logs and a diff viewer so that review remains fast and safe. We evaluate on DABStep, a benchmark with stepwise reasoning tasks and ground-truth verifiers, measuring per-step correctness, critic precision, and overall accuracy.</p>
            <p>The engine houses tools behind typed interfaces with a permission system that classifies operations as safe, unsafe, or blocked. This architecture allows organizations to restrict which tools are available, add project-specific actions, and audit usage centrally. Future work will expand the scope of SuperInference across architectures and deployment contexts, including systematic evaluation on diverse model families—from frontier multimodal systems to emerging lightweight models such as the Granite family, LLaMA variants, and Mistral models—to map out cost-accuracy trade-offs and identify optimal configuration regimes where feedback-driven refinement can compensate for reduced model capacity.</p>
          </div>
          <div>
            <Mermaid chart={vscodeChart} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ UI: "Interface", VSCode: "VS Code", CLI: "CLI", OpenClaw: "OpenClaw", Engine: "Engine", Tools: "Tools", Codebase: "Files", DABStep: "Benchmark" }} descriptions={{
              UI: "Developer-facing interface. Presents chat, diffs, logs, and navigation, keeping focus on code while exposing the PRE reasoning loop in a controlled, reviewable workflow.",
              VSCode: "AMI VS Code extension hosting the assistant. Publicly available at Microsoft's VS Code Marketplace. Gathers context from language servers and applies edits with explicit approvals.",
              CLI: "Terminal REPL interface for scripting and headless workflows. Supports session management, persona switching, and all 15 built-in tools.",
              OpenClaw: "OpenClaw plugin (in development) that wraps all SuperInference tools for integration with OpenClaw agents. Will include workspace symbol indexing and memory auto-loading.",
              Engine: "Core TypeScript engine: runs the complete PRE loop — planning, retrieval, execution, belief updates, and critic-gated memory. Supports multiple LLM providers (OpenAI, Anthropic, Google, DeepSeek, Ollama, OpenRouter). Logs all decisions for analysis.",
              Tools: "15 built-in tools: file operations (read, write, edit, multi-edit), code search (grep, glob, search-symbols), execution (bash, list-dir), web (fetch, search), interaction (ask-user, task, tool-search), and notebook editing.",
              Codebase: "The repository of files and symbols. Supplies definitions, references, and examples the agent navigates and modifies, providing context m̃_t for the Executor.",
              DABStep: "DABStep benchmark integration for systematic evaluation. Provides stepwise reasoning tasks with ground-truth verifiers, measuring per-step correctness, critic precision, and overall accuracy.",
            }} />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 9.</strong> AMI implementation architecture: UI → frontends (VS Code, CLI, OpenClaw) → Core Engine → tools, codebase, and DABStep benchmark.</div>
          </div>
        </div>
      </Section>
    </main>
  );
}
