import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";

export default function Permissions() {
  return (
    <DocSection id="permissions" title="Permissions">
      <p>AMI has 45+ built-in tools (file ops, search, execution, web, etc.). The <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--permission-mode</code> flag controls how tool invocations are authorized.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Mode</th>
              <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Behavior</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">ask</td><td className="py-2">Default. Prompts for approval before each tool invocation. Safe reads are auto-approved.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">auto-allow</td><td className="py-2">All tool invocations are auto-approved. Use in trusted environments.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">deny-all</td><td className="py-2">All tool invocations are denied. Chat-only mode.</td></tr>
          </tbody>
        </table>
      </div>

      <CodeBlock lang="bash" code={`# Interactive with auto-approval (trusted project)
ami --permission-mode auto-allow

# Chat-only, no file access
ami --permission-mode deny-all`} />
    </DocSection>
  );
}
