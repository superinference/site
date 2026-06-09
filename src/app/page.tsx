import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import Asciinema from "@/components/Asciinema";

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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-center">
        <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="group rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
          <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">VS Code Extension</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Marketplace</div>
        </a>
        <a href="https://github.com/superinference/site/releases/latest" target="_blank" rel="noreferrer" className="group rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
          <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">CLI Binary</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Linux x64</div>
        </a>
        <Link href="/docs/" className="group rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
          <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Documentation</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Get started</div>
        </Link>
      </div>

      {/* What AMI does */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: "terminal", title: "Terminal & editor", desc: "Interactive REPL in your terminal or VS Code side panel. Full access to your codebase, tools, and environment." },
          { icon: "providers", title: "Any model, free tiers", desc: "Works with OpenAI, Anthropic, Google, Groq, Mistral, and any OpenAI-compatible API. FRITO routes through free providers automatically." },
          { icon: "loop", title: "Iterative reasoning", desc: "Plans, acts, retrieves context, and verifies results in a feedback loop — instead of guessing in a single shot." },
          { icon: "permissions", title: "You stay in control", desc: "Permission system classifies tool operations as safe, unsafe, or blocked. Full audit trail. Pause or redirect at any point." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-neutral-200 dark:border-white/10 p-5">
            <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">{f.title}</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Demo */}
      <div className="mt-16 max-w-2xl mx-auto space-y-10">
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
