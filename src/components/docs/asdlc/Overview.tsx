import Mermaid from "@/components/Mermaid";
import { asdlcOverview } from "@/data/charts";

export default function Overview() {
  return (
    <section id="asdlc-overview" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Overview</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
          <p><strong>The Paradigm Shift.</strong> The agentic software development lifecycle (ASDLC) is a software delivery practice where AI agents participate meaningfully across the full lifecycle — planning, coding, reviewing, testing, deploying, and monitoring. The developer sets intent and reviews results; the agent handles the workflow in between. This is fundamentally different from code completion tools that operate at the keystroke level. Agentic systems operate at the level of a repository, a feature, or an entire workflow.</p>
          <p><strong>From Copilots to Agents.</strong> Earlier AI tools like autocomplete operate at the granularity of a line or function. Modern agentic systems operate at the granularity of a repository. They read code, reason about architecture, write across multiple files, run tests, interpret failures, and iterate — all autonomously. The shift is from <em>AI-assisted</em> development (a productivity aid) to <em>AI-led</em> development (an autonomous collaborator).</p>
          <p><strong>The Unsolved Problem.</strong> Most agentic systems rely on arbitrary stopping criteria — fixed turn limits, token budgets, or heuristic &quot;I think I&apos;m done&quot; signals. They lack principled mechanisms for reasoning under uncertainty or for determining when additional interaction is beneficial. This leads to two failure modes: stopping too early (incomplete solutions) or running too long (wasted resources, hallucination drift).</p>
          <p><strong>AMI&apos;s Approach.</strong> SuperInference frames agent reasoning as feedback-driven inference with measurable information gain. AMI (Agentic Multi-step Inference) is the implementation: a multi-platform coding agent grounded in a partially observable decision process (POMDP) with 45+ tools, multi-provider cost optimization, and containerized execution. Instead of guessing when to stop, AMI tracks a mathematical belief state and uses information-theoretic criteria to know when further reasoning is unproductive.</p>
        </div>
        <div>
          <Mermaid chart={asdlcOverview} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
            "Plan": "Plan mode, workspace indexing, task decomposition, codebase exploration — AMI analyzes before it acts.",
            "Code": "45+ tools for file operations, code generation, multi-file edits, and worktree isolation for parallel work.",
            "Review": "Two-layer review: the PRE loop's Critic evaluates agent output, then humans review. Code-review and security-review skills provide structured analysis.",
            "Test": "Bash execution, test output parsing, LSP diagnostics. 87 challenges evaluate agent performance across SDLC task categories.",
            "Deploy": "OpenShell containers for isolated execution. Detached mode for CI/CD pipelines with structured JSONL output and semantic exit codes.",
            "Monitor": "Session persistence, cron scheduling, analytics, FRITO cost tracking. Belief state tracks confidence across the full lifecycle.",
          }} />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 1.</strong> The agentic SDLC loop. AMI participates at every phase with specific tools and capabilities, using belief-driven stopping to know when each phase is complete.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-5">
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Scope of Action</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">Copilots suggest completions within a file. Agents read, write, and coordinate across entire repositories. AMI&apos;s 45+ tools span file operations, search, execution, web access, and workflow orchestration.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-5">
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Decision Autonomy</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">Copilots wait for keystrokes. Agents decide what to do next based on observations. AMI uses POMDP belief tracking and expected information gain to select tools and determine when to stop.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-5">
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Lifecycle Coverage</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">Copilots help with implementation only. Agents participate in planning, review, testing, deployment, and monitoring. AMI provides dedicated tools and skills for each SDLC phase.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Layer</th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Component</th>
              <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Role in ASDLC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
            <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Foundation</td><td className="py-2 pr-4">SuperInference POMDP</td><td className="py-2">Belief tracking, critic evaluation, information-theoretic stopping</td></tr>
            <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Engine</td><td className="py-2 pr-4">PRE Loop</td><td className="py-2">Plan-Retrieve-Execute cycle with feedback-driven iteration</td></tr>
            <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Tools</td><td className="py-2 pr-4">45+ Built-in Tools</td><td className="py-2">File ops, search, execution, web, workflow, git integration</td></tr>
            <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Cost</td><td className="py-2 pr-4">FRITO</td><td className="py-2">Multi-provider routing across 13 LLM providers for cost optimization</td></tr>
            <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Execution</td><td className="py-2 pr-4">OpenShell</td><td className="py-2">Containerized, isolated execution for CI/CD and enterprise deployment</td></tr>
            <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Evaluation</td><td className="py-2 pr-4">Challenge Framework</td><td className="py-2">87 challenges measuring agent performance across SDLC task categories</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
