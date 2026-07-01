import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function DetachedExecution() {
  return (
      <Section id="os-detached" title="Autonomous Detached Execution" subtitle="AMI was built for non-interactive, container-native operation from the start.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>Most coding agents are interactive-first tools being adapted for container deployment. AMI&apos;s <strong>detached mode</strong> is a first-class execution path designed from the ground up for autonomous operation — no terminal, no user prompts, no human approval required.</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">1</div>
                <div><strong className="text-neutral-900 dark:text-white">Task prompt</strong> — passed via <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--prompt</code> or <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">AGENT_PROMPT</code> env var</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">2</div>
                <div><strong className="text-neutral-900 dark:text-white">Autonomous execution</strong> — <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--yolo</code> bypasses permission prompts for full autonomy within sandbox policy</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">3</div>
                <div><strong className="text-neutral-900 dark:text-white">Structured output</strong> — JSONL stream with execution traces, tool calls, file changes, and audit events</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">4</div>
                <div><strong className="text-neutral-900 dark:text-white">Semantic exit codes</strong> — 0 (success), 1 (error), 2 (permission denied), 3 (max turns), 4 (aborted)</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">5</div>
                <div><strong className="text-neutral-900 dark:text-white">Audit logging</strong> — complete JSONL audit trail at <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.superinference/audit.jsonl</code></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock lang="bash" code={`# Detached mode: autonomous execution
ami --prompt "Migrate the auth module from callbacks to async/await" \\
    --yolo \\
    --output-format jsonl \\
    --max-turns 50 \\
    --thinking high

# Output (JSONL stream):
# {"type":"tool_call","tool":"grep","args":{"pattern":"callback","path":"src/auth"},...}
# {"type":"tool_call","tool":"file_edit","args":{"file_path":"src/auth/login.ts",...},...}
# {"type":"tool_call","tool":"bash","args":{"command":"npm test -- --testPathPattern=auth"},...}
# {"type":"result","status":"success","files_changed":4,"tools_used":23,"tokens":45000}`} />
            <CodeBlock lang="bash" code={`# Session resume for multi-turn workflows
ami --prompt "Continue the migration" --resume latest`} />
          </div>
        </div>
      </Section>
  );
}
