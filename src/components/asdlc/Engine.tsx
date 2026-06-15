import Mermaid from "@/components/Mermaid";
import { asdlcBeliefFlow } from "@/data/charts";

export default function Engine() {
  return (
    <section id="engine" className="scroll-mt-20 space-y-10">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Decision Engine</h2>

      <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">The Stopping Problem</h2>
        <p>Every agentic system faces the same fundamental question: <em>when should the agent stop?</em> This is not a cosmetic concern — it determines whether the agent delivers complete solutions or wastes resources on hallucination drift.</p>
        <p>Most systems use one of three heuristic approaches, each with clear failure modes:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Fixed Turn Limits</h4>
            <p className="text-sm">Stop after N turns. Simple but arbitrary — easy tasks waste turns, hard tasks get cut off mid-solution.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Token Budgets</h4>
            <p className="text-sm">Stop after N tokens. Correlates loosely with work done, but ignores whether the work was productive.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Self-Assessment</h4>
            <p className="text-sm">Ask the model &quot;are you done?&quot; Unreliable — models are poorly calibrated about their own completion state.</p>
          </div>
        </div>
        <p>AMI solves this with a formally grounded approach: the SuperInference POMDP (Partially Observable Markov Decision Process), which provides mathematical criteria for when to continue reasoning and when to stop.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-10">
        <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Belief Tracking in Practice</h2>
          <p><strong>Hidden State.</strong> The true state — &quot;is the code correct and complete?&quot; — is not directly observable. The agent can only observe signals: test results, compiler output, lint warnings, grep matches. These observations are noisy and incomplete.</p>
          <p><strong>Belief State.</strong> AMI maintains a scalar belief b<sub>t</sub> &isin; [0.25, 0.95] representing its confidence that the task is complete. This belief updates after every tool execution based on the Critic&apos;s evaluation of the result. A test passing is a strong positive observation; a grep returning no matches is a weak negative observation.</p>
          <p><strong>Critic Evaluation.</strong> The PRE loop&apos;s Critic is an LLM-based evaluator that scores each tool output with false-positive rate &alpha; and false-negative rate &beta;. With default parameters, the positive predictive value (PPV) is ~0.977 — when the Critic approves a result, it is correct 97.7% of the time. Rejected results trigger retry with adjusted approach.</p>
          <p><strong>Information-Theoretic Stopping.</strong> AMI uses binary entropy H(b<sub>t</sub>) and expected information gain (EIG) to decide whether further reasoning is productive. When EIG drops below 0.01 bits — meaning the next tool call is unlikely to change the belief state meaningfully — the agent stops. This prevents both premature termination and wasteful over-computation.</p>
          <p>For the full mathematical formalization, see the <a href="/pre-loop/" className="underline hover:no-underline">PRE Loop</a> and <a href="/results/" className="underline hover:no-underline">Formal Results</a> sections of the research paper.</p>
        </div>
        <div>
          <Mermaid chart={asdlcBeliefFlow} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
            "Task Received": "Initial belief is low (0.25) — the agent has no information about whether the task can be completed.",
            "Explore Codebase": "Reading files and searching the codebase provides context. Belief increases slightly as the agent understands the problem space.",
            "Plan Approach": "Task decomposition and planning raise belief further. The agent now has a strategy, but hasn't verified it.",
            "Implement": "Writing code increases belief based on the agent's confidence in the implementation, modulated by Critic evaluation.",
            "Tests Fail": "Test failures are strong negative observations. Belief drops as the Critic rejects the implementation.",
            "Fix & Retry": "Debugging and fixing informed by test output. Belief recovers as the agent addresses specific failure modes.",
            "Tests Pass": "Test successes are strong positive observations. Belief jumps significantly — the implementation is externally verified.",
            "EIG < 0.01": "Expected information gain drops below threshold. Further reasoning is unlikely to change the outcome. The agent stops with high confidence.",
          }} />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 2.</strong> Belief state evolution during a typical SDLC task. The agent&apos;s confidence rises and falls based on observations (test results, compiler output), stopping when expected information gain is exhausted.</div>
        </div>
      </div>

      <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300 mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">POMDP Applied to SDLC Phases</h2>
        <p>The belief-driven approach is not limited to coding tasks — it applies to every SDLC phase. The key insight is that each phase has its own notion of &quot;done&quot; and its own observation signals:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Phase</th>
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Hidden State</th>
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Observations</th>
                <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Stopping Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Plan</td><td className="py-2 pr-4">&quot;Do I understand the task?&quot;</td><td className="py-2 pr-4">File reads, symbol searches, grep results</td><td className="py-2">EIG from exploration drops — reading more files won&apos;t change the plan</td></tr>
              <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Code</td><td className="py-2 pr-4">&quot;Is the implementation correct?&quot;</td><td className="py-2 pr-4">Compiler output, type checks, lint results</td><td className="py-2">All diagnostics clean, Critic approves the diff</td></tr>
              <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Review</td><td className="py-2 pr-4">&quot;Are there remaining issues?&quot;</td><td className="py-2 pr-4">Review findings, security scan results</td><td className="py-2">No new findings after comprehensive scan</td></tr>
              <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Test</td><td className="py-2 pr-4">&quot;Does the code behave correctly?&quot;</td><td className="py-2 pr-4">Test pass/fail counts, coverage metrics</td><td className="py-2">All tests pass, high confidence in coverage</td></tr>
              <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Deploy</td><td className="py-2 pr-4">&quot;Is the artifact ready?&quot;</td><td className="py-2 pr-4">Build output, container startup probes</td><td className="py-2">Exit code 0, structured output complete</td></tr>
              <tr><td className="py-2 pr-4 font-medium text-neutral-900 dark:text-white">Monitor</td><td className="py-2 pr-4">&quot;Is the system healthy?&quot;</td><td className="py-2 pr-4">Analytics events, cost metrics, error rates</td><td className="py-2">Metrics within expected bounds</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300 mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">EIG for Tool Selection</h2>
        <p>Expected information gain doesn&apos;t just determine when to stop — it informs what to do next. The agent implicitly selects tools that maximize information gain given the current belief state:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">High-EIG actions</h4>
            <ul className="text-sm space-y-1.5">
              <li><strong>Running tests</strong> after a code change — binary pass/fail is maximally informative</li>
              <li><strong>Grep for error messages</strong> during debugging — directly addresses the unknown</li>
              <li><strong>Reading test files</strong> during planning — reveals the expected behavior</li>
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">Low-EIG actions</h4>
            <ul className="text-sm space-y-1.5">
              <li><strong>Re-reading a file</strong> already in context — no new information</li>
              <li><strong>Running tests</strong> without changing code — same result expected</li>
              <li><strong>Searching broadly</strong> after the problem is localized — diminishing returns</li>
            </ul>
          </div>
        </div>
        <p>This information-theoretic framing explains why good agents &quot;feel&quot; efficient: they naturally gravitate toward actions that resolve uncertainty fastest. AMI makes this intuition formal and measurable.</p>
      </div>

    </section>
  );
}
