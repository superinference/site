import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

function ToolBadge({ name }: { name: string }) {
  return <span className="inline-block text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 mr-1.5 mb-1.5">{name}</span>;
}

export default function Phases() {
  return (
    <section id="phases" className="scroll-mt-20 space-y-12">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">SDLC Phases</h2>

      <DocSection id="planning" title="1. Plan">
        <p>Before writing a single line of code, AMI analyzes the task, explores the codebase, and builds an execution plan. The planning phase uses read-only tools and belief tracking to determine when enough context has been gathered to proceed.</p>
        <DocSubSection id="plan-mode" title="Plan Mode">
          <p>AMI&apos;s dedicated plan mode restricts the agent to read-only tools — file reads, grep, glob, symbol search — preventing premature modifications. The agent explores the codebase, identifies relevant files, and designs an approach. Plan mode requires explicit user approval before transitioning to implementation, ensuring alignment before any changes are made.</p>
        </DocSubSection>
        <DocSubSection id="task-decomposition" title="Task Decomposition">
          <p>Complex tasks are broken into discrete sub-tasks using the task tracker. Each sub-task has a status (pending, in-progress, completed), dependencies, and can be delegated to specialized sub-agents. This mirrors how human teams decompose work into tickets — but the agent does it in seconds.</p>
        </DocSubSection>
        <DocSubSection id="codebase-exploration" title="Codebase Exploration">
          <p>AMI uses workspace indexing to build a symbol map of the codebase — functions, classes, imports — across TypeScript, Python, Go, Rust, and Java. Combined with grep, glob, and fuzzy matching, the agent rapidly locates relevant code without reading every file.</p>
        </DocSubSection>
        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Tools used in this phase</div>
          <ToolBadge name="plan-mode" /><ToolBadge name="task-tracker" /><ToolBadge name="grep" /><ToolBadge name="glob" /><ToolBadge name="file-read" /><ToolBadge name="search-symbols" /><ToolBadge name="list-dir" /><ToolBadge name="web-search" />
        </div>
      </DocSection>

      <DocSection id="implementation" title="2. Code">
        <p>The implementation phase is where AMI writes, edits, and refactors code. Unlike line-level autocomplete, AMI operates at the repository level — coordinating changes across multiple files, understanding dependencies, and maintaining consistency.</p>
        <DocSubSection id="file-operations" title="File Operations">
          <p>AMI provides granular file manipulation: exact-match string replacement (file-edit), full file creation (file-write), and atomic multi-file edits (multi-edit) for cross-file refactors that must succeed or fail together. The checkpoint system snapshots files before mutations, enabling one-command undo.</p>
        </DocSubSection>
        <DocSubSection id="worktree-isolation" title="Worktree Isolation">
          <p>For parallel development work, AMI creates isolated git worktrees. Multiple agents can work on different branches simultaneously without conflicting. Each worktree is automatically cleaned up when the work is complete, maintaining a clean repository state.</p>
        </DocSubSection>
        <DocSubSection id="context-aware-generation" title="Context-Aware Generation">
          <p>Code generation is informed by retrieved context — not just the current file, but related files, test patterns, coding conventions, and project-specific instructions (via CLAUDE.md). The PRE loop&apos;s retriever ensures generated code is consistent with the existing codebase.</p>
        </DocSubSection>
        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Tools used in this phase</div>
          <ToolBadge name="file-write" /><ToolBadge name="file-edit" /><ToolBadge name="multi-edit" /><ToolBadge name="file-read" /><ToolBadge name="notebook-edit" /><ToolBadge name="enter-worktree" /><ToolBadge name="exit-worktree" />
        </div>
      </DocSection>

      <DocSection id="review" title="3. Review">
        <p>AMI implements two-layer review: the agent&apos;s internal Critic evaluates intermediate outputs, and structured review skills provide human-readable analysis. Research shows that agent + human review catches more issues than either approach alone.</p>
        <DocSubSection id="critic-review" title="Critic-Gated Quality">
          <p>The PRE loop&apos;s Critic evaluates every tool output before it enters memory. With a positive predictive value (PPV) of ~0.977, it filters out incorrect intermediate results, preventing error propagation through the reasoning chain. Rejected outputs trigger retry with adjusted approach.</p>
        </DocSubSection>
        <DocSubSection id="review-skills" title="Review Skills">
          <p>Dedicated skills provide structured code review at configurable effort levels: <em>code-review</em> scans for correctness bugs and optimization opportunities; <em>security-review</em> audits for OWASP top 10 vulnerabilities; <em>simplify</em> identifies reuse and abstraction opportunities. Each can post inline PR comments or apply fixes directly.</p>
        </DocSubSection>
        <DocSubSection id="git-integration" title="Git Integration">
          <p>AMI integrates with git for structured commit messages, diff analysis, and PR creation. The agent understands branch state, staged changes, and commit history — enabling it to create well-scoped commits and pull requests with proper descriptions.</p>
        </DocSubSection>
        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Tools used in this phase</div>
          <ToolBadge name="bash (git)" /><ToolBadge name="code-review" /><ToolBadge name="security-review" /><ToolBadge name="simplify" />
        </div>
      </DocSection>

      <DocSection id="testing" title="4. Test">
        <p>Testing is where ASDLC agents prove their value — or fail. AMI runs test suites, interprets failures, fixes code, and re-runs until tests pass. The belief state tracks confidence in correctness, with test results providing the strongest observations.</p>
        <DocSubSection id="test-execution" title="Test Execution &amp; Parsing">
          <p>AMI executes tests via the bash tool and parses structured output from Node.js test runners, TAP format, pytest, and other frameworks. The test output parser detects pass/fail counts and signals the engine when verification is complete — no manual interpretation needed.</p>
        </DocSubSection>
        <DocSubSection id="lsp-diagnostics" title="LSP Diagnostics">
          <p>Language Server Protocol integration provides real-time type checking, reference finding, and diagnostic reporting. AMI can detect type errors before running tests, catch import issues, and verify that refactors maintain type safety across the codebase.</p>
        </DocSubSection>
        <DocSubSection id="challenge-framework" title="Challenge Framework">
          <p>AMI&apos;s evaluation suite includes 87 challenges across categories that span the SDLC: single-file bug fixes, multi-file refactors, code generation from spec, performance optimization, API migration, and more. Each challenge has isolated test suites that serve as ground truth — the agent cannot cheat by modifying tests.</p>
        </DocSubSection>
        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Tools used in this phase</div>
          <ToolBadge name="bash" /><ToolBadge name="lsp-diagnostics" /><ToolBadge name="lsp-references" /><ToolBadge name="file-read" />
        </div>
      </DocSection>

      <DocSection id="deployment" title="5. Deploy">
        <p>Agentic deployment means agents run in CI/CD pipelines without human interaction, producing structured output that downstream systems can consume. AMI&apos;s detached mode and OpenShell containers make this production-ready.</p>
        <DocSubSection id="detached-mode" title="Detached Execution">
          <p>AMI&apos;s detached mode (<code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--prompt</code>) runs headlessly with structured JSONL output. Semantic exit codes (0 = success, 1 = partial, 2 = failure, 3 = error, 4 = timeout) integrate directly with CI/CD pipeline logic. Permission defaults to deny-all in headless mode for safety.</p>
        </DocSubSection>
        <DocSubSection id="openshell-containers" title="OpenShell Containers">
          <p>OpenShell provides pre-built container images with AMI baked in. Each agent runs in an isolated sandbox with controlled tool access, audit logging, and startup probes for Kubernetes readiness. Air-gapped deployment is supported via self-hosted models (Ollama, vLLM).</p>
        </DocSubSection>
        <DocSubSection id="exit-code-semantics" title="Pipeline Integration">
          <p>Structured output enables pipeline decisions: exit code 0 triggers merge, exit code 1 requests human review, exit code 2 blocks the pipeline. JSONL streaming allows real-time monitoring of agent progress within CI runners.</p>
        </DocSubSection>
        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Tools used in this phase</div>
          <ToolBadge name="--prompt" /><ToolBadge name="--yolo" /><ToolBadge name="--output-format" /><ToolBadge name="OpenShell" />
        </div>
      </DocSection>

      <DocSection id="monitoring" title="6. Monitor">
        <p>The monitoring phase closes the ASDLC loop. AMI tracks costs, logs analytics events, persists sessions for resume, and supports recurring scheduled tasks for continuous monitoring.</p>
        <DocSubSection id="cost-tracking" title="Cost &amp; Usage Tracking">
          <p>FRITO tracks reference cost vs. actual cost across 13 providers, reporting savings rate per session. Usage breakdowns show prompt vs. completion tokens, cache hits, and per-provider spend — essential for managing ASDLC at scale where agents generate millions of tokens.</p>
        </DocSubSection>
        <DocSubSection id="session-persistence" title="Session Persistence">
          <p>Every session is persisted with full conversation history, enabling resume across interruptions. For long-running SDLC tasks (multi-day refactors, migration projects), the agent picks up exactly where it left off with full context.</p>
        </DocSubSection>
        <DocSubSection id="scheduled-tasks" title="Scheduled &amp; Recurring Tasks">
          <p>Cron-based scheduling enables recurring agent tasks: periodic code reviews, dependency update checks, test suite monitoring, or deployment health checks. Workflows orchestrate multi-agent pipelines for complex recurring operations.</p>
        </DocSubSection>
        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Tools used in this phase</div>
          <ToolBadge name="cron-create" /><ToolBadge name="workflow" /><ToolBadge name="analytics" /><ToolBadge name="session-resume" /><ToolBadge name="/cost" /><ToolBadge name="/usage" />
        </div>
      </DocSection>

    </section>
  );
}
