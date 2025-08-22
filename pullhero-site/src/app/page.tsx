import Image from "next/image";
import Mermaid from "@/components/Mermaid";
import Section from "@/components/Section";
import MotionCard from "@/components/MotionCard";

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.94 3.2 9.13 7.64 10.61.56.1.77-.24.77-.54 0-.26-.01-1.12-.02-2.03-3.11.68-3.77-1.32-3.77-1.32-.5-1.27-1.22-1.6-1.22-1.6-.99-.68.07-.66.07-.66 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.68-1.45-2.48-.28-5.08-1.24-5.08-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.4.11-2.92 0 0 .94-.3 3.08 1.15A10.7 10.7 0 0 1 12 6.8c.95 0 1.9.13 2.79.38 2.14-1.46 3.08-1.15 3.08-1.15.61 1.52.23 2.64.11 2.92.72.78 1.16 1.78 1.16 3 0 4.3-2.61 5.25-5.1 5.53.39.34.73 1.01.73 2.04 0 1.47-.01 2.66-.01 3.02 0 .3.2.64.78.53A10.77 10.77 0 0 0 23.23 11.7C23.23 5.46 18.27.5 12 .5z"/>
  </svg>
);

const basicLoop = `flowchart LR
    User["User"] --> Core["Core"]
    Core --> Tools["Tools"]
    Tools --> Core
    Core --> Output["Output"]
`;

const deepAgent = `flowchart TD
    User["Request"] --> Main["Engine"]

    subgraph Internals["Internals"]
        Plan["Planning"]
        Mods["Modules"]
        Store["Storage"]
        Prompt["Instructions"]
    end

    Main --> Plan
    Main --> Mods
    Main --> Store
    Main --> Prompt

    Plan --> Main
    Mods --> Main
    Store --> Main
    Prompt --> Main

    Main --> Ext["External Tools"]
    Ext --> Main

    Main --> Response["Response"]
    Response --> User
`;

const embeddings = `flowchart LR
  subgraph Editor
    Ctx[Current Context] --> M1[Short-term]
    Ctx --> E[Embedding]
  end
  M1 --> A[Core]
  E --> DB[Vector Store]
  DB --> Sim[Similarity]
  Sim --> A
`;

const feedback = `flowchart TD
  A[Suggestion] --> B[Feedback]
  B --> C{Accepted?}
  C -->|Yes| D[Apply]
  C -->|No| E[Revise]
  E --> F[Refine]
  F --> A
`;

const vscode = `flowchart LR
  subgraph Env[Editor Environment]
    UI[UI] --> Ext[Extension]
    Ext --> Chat[Chat API]
    Chat --> BE[Backend]
    BE -->|Tools| Shell[Tools]
    BE -->|Code| Repo[Codebase]
  end
  Repo --> Ctx[Context]
  Ctx --> Chat
`;

const roadmap = `gantt
    title Roadmap
    dateFormat  YYYY-MM-DD
    section Milestones
    Feature A     :done,    a1, 2025-05-01, 2025-05-15
    Feature B     :active,  a2, 2025-05-15, 2025-08-01
    Feature C     :        a3, 2025-08-01, 2025-10-01
    Feature D     :        a4, 2025-09-01, 2025-11-01
`;

const papers = [
  {
    id: 1,
    title: "Supervised Inference for Reliable Agents",
    venue: "ArXiv, 2025",
    doi: "https://doi.org/10.1016/j.aprim.2020.09.002",
    summary:
      "Introduces SuperInference and demonstrates reliability gains from programmatic validation loops.",
    bibtex: `@misc{superinference_paper_a_2025,\n  title        = {Supervised Inference for Reliable Agents},\n  author       = {Your Name and Collaborator Name},\n  year         = {2025},\n  doi          = {10.1016/j.aprim.2020.09.002},\n  eprint       = {XXXX.XXXXX},\n  archivePrefix= {arXiv},\n  primaryClass = {cs.AI}\n}`,
  },
  {
    id: 2,
    title: "Validating Reasoning with Programmatic Checks",
    venue: "ArXiv, 2025",
    doi: "https://doi.org/10.1016/j.aprim.2020.09.002",
    summary:
      "Studies automatic validators for multi-step reasoning and their effect on accuracy and reproducibility.",
    bibtex: `@misc{superinference_paper_b_2025,\n  title        = {Validating Reasoning with Programmatic Checks},\n  author       = {Your Name and Collaborator Name},\n  year         = {2025},\n  doi          = {10.1016/j.aprim.2020.09.002},\n  eprint       = {YYYY.YYYYY},\n  archivePrefix= {arXiv},\n  primaryClass = {cs.AI}\n}`,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="SuperInference" width={28} height={28} />
            <span className="font-semibold tracking-tight">SuperInference</span>
          </div>
          <nav className="hidden sm:flex gap-4 text-sm text-neutral-400 items-center">
            <a href="#abstract" className="hover:text-white">Abstract</a>
            <a href="#overview" className="hover:text-white">Overview</a>
            <a href="#architecture" className="hover:text-white">Architecture</a>
            <a href="#embeddings" className="hover:text-white">Embedding</a>
            <a href="#feedback" className="hover:text-white">Feedback</a>
            <a href="#editor" className="hover:text-white">Editor</a>
            <a href="#roadmap" className="hover:text-white">Roadmap</a>
            <a href="#research" className="hover:text-white">Research</a>
            <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white">
              <GitHubIcon />
            </a>
          </nav>
        </div>
      </header>

      <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
        <Section id="abstract">
          <div className="w-full text-neutral-300 text-base/7 space-y-3">
            <p>SuperInference means Supervised Inference — a framework pattern where model outputs are supervised by explicit, programmatic checks and contextual retrieval. Instead of trusting raw generations, each inference step is reviewed, corrected, or augmented using tools, tests, and memory.</p>
            <p>Practically, this looks like a loop: plan → retrieve → act → validate → refine. The result is more reliable outcomes, deterministic guardrails, and a clearer audit trail for how results were produced.</p>
            <p>In practice, the framework treats developer intent as the starting point and then builds a rich context envelope around it. SuperInference enumerates the relevant files and symbols near the cursor, queries language servers for definitions and references, and fetches project knowledge such as README snippets or ADRs. That material is summarized and routed into a plan that decomposes the task into safe, verifiable steps. Each step opts to use the minimal tool that can produce a stable signal: a unit test result, a linter error, a type checker failure, a benchmark number, a diff that compiles. Those signals are treated as supervision for the next turn, guiding the agent away from speculation and toward evidence. The process is conservative about edits, prefers explicit approvals for invasive changes, and leaves a trail that can be reviewed or rolled back. Because the supervision loop is explicit, teams can tune how strict it should be: from permissive assistants that suggest code, to near-automated flows that won’t advance until tests and policies pass. The outcome is not just a working change, but a reproducible path to that change that can be shared, audited, and re‑run as the codebase evolves.</p>
          </div>
        </Section>

        <Section id="overview" className="pt-4" title="Overview" subtitle="SuperInference showcases animated diagrams and a simple architecture.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-base/7 text-neutral-300">
              <p><strong>Figure 1 reference.</strong> Figure 1 illustrates the high‑level loop the system follows in practice.</p>
              <p>Builds a compact view of how components interact: core, tools, storage, and feedback. The overview sets expectations for the developer’s experience: you stay inside the editor while an agent helps navigate, search, and change code. Rather than replacing engineering judgment, the agent shortens the path to correct answers by surfacing the right local context and related examples from the codebase. It can walk to definitions, show inbound and outbound calls, and assemble a reading list of files worth skimming before a change. When you ask for a modification, it explains the plan at a high level and identifies the risks or tests that need attention, so you can approve or redirect the approach before any code is touched.</p>
              <p>All visuals are client-rendered diagrams with subtle motion and hover explanations. The site mirrors the product structure: a core planner, a set of modules for retrieval and tooling, and persistent storage for state. Each part is designed to work with deterministic checks such as compilers and tests, anchoring the loop in objective feedback. The result is a predictable, legible experience where you understand why a suggestion appears, what it depends on, and what it will change. This foundation lets teams adopt the system incrementally, starting with read‑only navigation and moving toward supervised edits as confidence grows.</p>
            </div>
            <div>
              <Mermaid chart={basicLoop} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ User: "You", Core: "Core logic", Tools: "External utilities", Output: "Result" }} />
              <div className="mt-2 text-xs text-neutral-300"><strong>Figure 1.</strong> Overview loop showing Core ↔ Tools interactions and resulting Output.</div>
            </div>
          </div>
        </Section>

        <Section id="architecture" title="Architecture" subtitle="Planning, modules, storage, and instructions working with external tools.">
          <div>
            <Mermaid chart={deepAgent} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ Planning: "Plan steps", Modules: "Specialized units", Storage: "State", Instructions: "Guidance" }} />
            <div className="mt-2 text-xs text-neutral-300"><strong>Figure 2.</strong> Architecture diagram showing planner, modules, storage, and instruction flow.</div>
          </div>
          <div className="mt-4 w-full space-y-3 text-neutral-300 text-base/7">
            <p><strong>Figure 2 reference.</strong> Figure 2 shows how the planner orchestrates modules and storage while instructions flow through the system.</p>
            <p>The architecture revolves around a small core that holds the task plan and orchestrates modules. The planner proposes steps and chooses tools; the retrieval module consults the project graph, embeddings, and external documentation; the storage layer records state such as the current diff, run logs, and test outputs. A thin prompt layer binds these parts together so the agent can reason about next actions using concrete signals rather than speculation. This separation of concerns keeps the core stable while tools and retrieval evolve.</p>
            <p>Each module is isolated and replaceable. For instance, retrieval can be implemented with a local index, a Sourcegraph instance, or a hosted vector database; the interface is the same: given a query or code span, return ranked context chunks with provenance. Likewise, the tool layer can expose a handful of high‑value actions—lint, type‑check, test, run command—while allowing project‑specific tools to be added through MCP. The planner uses a simple policy: prefer cheap checks first, escalate only when needed, and always record evidence for the next turn. This policy produces fast feedback for easy tasks while still handling deeper changes that require tests, migrations, or code generation.</p>
          </div>
        </Section>

        <Section id="embeddings" title="Embedding Context" subtitle="Vector retrieval augments the core with relevant snippets.">
          <div>
            <Mermaid chart={embeddings} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ "Current Context": "Active view", "Short-term": "Buffer", Embedding: "To vectors", "Vector Store": "DB", Similarity: "Nearest", Core: "Uses context" }} />
            <div className="mt-2 text-xs text-neutral-300"><strong>Figure 3.</strong> Embedding context showing editor context, embedding engine, vector store, and similarity lookup.</div>
          </div>
          <div className="mt-4 w-full space-y-3 text-neutral-300 text-base/7">
            <p><strong>Figure 3 reference.</strong> Figure 3 summarizes how the editor’s context is embedded and matched against a vector store to retrieve the most useful snippets.</p>
            <p>Embedding‑based retrieval gives the agent a semantic memory for source code and documentation. Rather than relying on exact string matches, the system converts snippets into vectors and searches by meaning. This is valuable when identifiers differ across modules or when a pattern—like a debounce wrapper or a pagination helper—appears in many places with different names. The retrieval module combines embeddings with lexical and graph‑based search so that results include exact hits, near‑neighbors, and dependency‑aware references.</p>
            <p>To keep prompts lean, SuperInference deduplicates and compresses results before sending them to the model, and it annotates each chunk with provenance so diffs and explanations can refer back to the source. As edits land, the index can be updated incrementally to track new symbols and file moves. Teams can plug in their preferred backends, from local FAISS indexes to cloud stores. The goal is to maximize the quality of context while staying within token budgets, and to make the model’s output grounded in code that actually exists in the repository.</p>
          </div>
        </Section>

        <Section id="feedback" title="Feedback Loops" subtitle="Iterate with suggestions and feedback until done.">
          <div>
            <Mermaid chart={feedback} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ Suggestion: "Proposed change", Feedback: "Review", Apply: "Commit", Revise: "Fix", Refine: "Improve" }} />
            <div className="mt-2 text-xs text-neutral-300"><strong>Figure 4.</strong> Feedback loop from suggestion to review, acceptance or revision, and refinement.</div>
          </div>
          <div className="mt-4 w-full space-y-3 text-neutral-300 text-base/7">
            <p><strong>Figure 4 reference.</strong> Figure 4 captures the control flow the agent follows after each action, using objective signals to choose the next step.</p>
            <p>The feedback loop is the backbone of SuperInference. After each action, the system collects concrete signals—compiler diagnostics, test results, type errors, linter output, or runtime logs—and uses them to decide the next step. When a change compiles but tests fail, the failure message and the diff are summarized and fed back to the planner; when a linter highlights risky patterns, the agent proposes low‑impact fixes and explains trade‑offs. Users can accept partial changes, request revisions, or escalate to larger refactors. Because every cycle is grounded in measurable outcomes, the agent converges toward correctness rather than drifting into plausible but broken edits.</p>
            <p>Human input is part of the loop. Developers can pin files to the context, mark non‑negotiable constraints, and request style‑aligned rewrites. The agent records these preferences and applies them in future steps, effectively treating guidance as supervision. This collaboration keeps velocity high without compromising codebase standards. Over time, the loop captures a dataset of changes and outcomes that can be mined for documentation, examples, or even offline evaluation of new tooling policies.</p>
          </div>
        </Section>

        <Section id="editor" title="Editor Integration" subtitle="Runs inside your editor with access to files and tools.">
          <div>
            <Mermaid chart={vscode} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" highlights={{ UI: "Interface", Extension: "Add-on", "Chat API": "Messaging", Backend: "Orchestrator", Tools: "Utilities", Codebase: "Files", Context: "References" }} />
            <div className="mt-2 text-xs text-neutral-300"><strong>Figure 5.</strong> Editor integration: UI ↔ extension ↔ chat API ↔ backend tools and codebase.</div>
          </div>
          <div className="mt-4 w-full space-y-3 text-neutral-300 text-base/7">
            <p><strong>Figure 5 reference.</strong> Figure 5 shows how the extension mediates between the UI, chat API, and backend tools to apply edits safely.</p>
            <p>We chose a Visual Studio Code extension as the primary interface because it meets developers where they work. The extension has access to open files, the active selection, and language servers, making it ideal for context gathering and precise edits. From a UX standpoint, the agent feels like an expert teammate: it can navigate to symbols, explain unfamiliar code, propose diffs, and run tests without forcing you to switch windows. Every action is visible in a panel with logs and a diff viewer so that review remains fast and safe.</p>
            <p>On the backend, the extension connects to an MCP server that houses tools behind typed interfaces. This separation allows organizations to restrict which tools are available, add project‑specific actions, and audit usage centrally. For example, a company could expose internal documentation search, a deployment simulator, or security scanners only through MCP, while keeping the editor client simple. The result is a pragmatic path to agentic development that respects privacy, governance, and team standards.</p>
          </div>
        </Section>

        <Section id="copy" title="How it Works" subtitle="Plan, act, observe, and loop with feedback.">
          <div className="mt-4 w-full space-y-3 text-neutral-300 text-base/7">
            <p><strong>Figure 1–5 references.</strong> The session narrative ties back to Figures 1–5: you start with the overview loop, follow the architecture flow, pull in embedding context, iterate through feedback, and act from the editor integration.</p>
            <p>This section ties everything together from a developer’s perspective. A typical session starts with exploration: ask for an explanation of a file, jump to a symbol, or request a map of call sites. Once the task is clear, the agent drafts a plan that names the files it intends to change and the checks it will run. You can edit that plan like a checklist. When approved, the agent performs the smallest safe step, runs inexpensive validators, and reports back with logs and a preview diff. If results are good, it proceeds; if not, it explains what failed and proposes alternatives.</p>
            <p>The key benefit is momentum without loss of control. You always see context, plan, and evidence, and you can pause or redirect the flow at any time. Because the loop prefers objective signals—compilers, tests, type systems—the agent’s suggestions converge toward correctness rather than style alone. Over time, the system builds a memory of accepted patterns and project conventions, reducing friction and helping new engineers onboard faster. The outcome is a smoother path from idea to change request, all inside the editor.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "Plan", copy: "Assemble context and create a task list." },
              { title: "Act", copy: "Apply edits and run tools." },
              { title: "Observe", copy: "Capture results and feedback for the next loop." },
            ].map((card, i) => (
              <MotionCard key={card.title} title={card.title} delay={0.1 * i}>
                <p className="text-neutral-300 text-sm/6">{card.copy}</p>
              </MotionCard>
            ))}
          </div>
        </Section>

        <Section id="roadmap" title="Roadmap" subtitle="Illustrative milestones.">
          <div>
            <Mermaid chart={roadmap} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 overflow-x-auto" />
            <div className="mt-2 text-xs text-neutral-300"><strong>Figure 6.</strong> Roadmap gantt highlighting major milestones.</div>
          </div>
          <div className="mt-6 w-full space-y-3 text-neutral-300 text-base/7">
            <div className="flex items-center gap-2">
              <Image src="/pullhero_icon.svg" alt="VS Code extension icon" width={72} height={72} className="invert" />
              <p><strong>Figure 6 reference.</strong> Figure 6 presents the implementation schedule and how the pieces land in sequence.</p>
            </div>
            <ul className="list-disc ml-6 space-y-2">
              <li><a href="https://github.com/superinference/vshero" target="_blank" rel="noreferrer" className="underline hover:no-underline">VS Code extension (vshero)</a>: chat‑driven development, context retrieval (files/LSP), semantic search, multi‑file edits, task orchestration, and status streaming.</li>
              <li><a href="https://github.com/superinference/mcp/" target="_blank" rel="noreferrer" className="underline hover:no-underline">MCP server (mcp)</a>: exposes validated tools (search/grep/shell/git/docker and project‑specific tasks), typed schemas for inputs/outputs, rate‑limiting & auditing, versioned endpoints.</li>
              <li>Agents & feedback loops: plan → retrieve → act → validate → refine using tests/linters/type‑checks; optional user approvals; automatic retries with error context.</li>
            </ul>
            <p>Together these components turn everyday coding tasks into supervised agentic flows, all without leaving VS Code.</p>
          </div>
        </Section>

        <Section id="research" title="Research" subtitle="Published papers and how to cite them.">
          <div className="w-full space-y-6">
            {papers.map((p) => (
              <div key={p.id} className="rounded-xl border border-white/10 bg-neutral-900/60 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-neutral-100">
                      {p.title} <a href={p.doi} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white">(doi)</a>
                    </div>
                    <div className="text-xs text-neutral-400">
                      {p.venue} · <a href={p.doi} target="_blank" rel="noreferrer" className="underline hover:no-underline">{p.doi}</a>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-neutral-300 text-base/7">{p.summary}</p>
                <pre className="mt-3 rounded bg-neutral-950/80 border border-white/10 p-3 text-[11px] text-neutral-200 overflow-x-auto"><code>{p.bibtex}</code></pre>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer className="py-8 border-t border-white/10 text-center text-sm text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="SuperInference" width={18} height={18} />
            <span>SuperInference</span>
          </div>
          <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white">
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}
