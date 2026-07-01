import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function CliReference() {
  return (
    <DocSection id="cli" title="CLI Reference">
      <CodeBlock lang="text" code={`Si:AMI CLI v0.6.2

Usage: ami [options]

Options:
  --base-url <url>          API base URL (env: AI_BASE_URL)
  --api-key <key>           API key (env: AI_API_KEY)
  --model <model>           Model name (env: AI_MODEL, default: gpt-4o)
  --permission-mode <mode>  Permission mode: ask, auto-allow, deny-all (default: ask)
  --prompt <text>           Non-interactive: send prompt, print JSON, exit
  --resume [session-id]     Resume a previous session (latest if no ID)
  --help                    Show help message
  --version                 Show version`} />

      <DocSubSection id="cli-flags" title="Flags">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Flag</th>
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Env Var</th>
                <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--api-key</td><td className="py-2 pr-4 font-mono text-xs">AI_API_KEY</td><td className="py-2">API key for the provider. Required unless a provider-specific env var is set.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--base-url</td><td className="py-2 pr-4 font-mono text-xs">AI_BASE_URL</td><td className="py-2">Override the API base URL. Auto-detected from key prefix when possible.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--model</td><td className="py-2 pr-4 font-mono text-xs">AI_MODEL</td><td className="py-2">Model name. Defaults to gpt-4o. Auto-detected from provider.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--permission-mode</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Tool permission level: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">ask</code> (default), <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">auto-allow</code>, or <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">deny-all</code>.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--prompt</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Non-interactive mode. Sends prompt, prints structured JSON, exits.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--resume</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Resume a previous conversation session. Optionally takes a session ID.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--version</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Print version and exit.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--help</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Print help and exit.</td></tr>
            </tbody>
          </table>
        </div>
      </DocSubSection>

      <DocSubSection id="cli-precedence" title="Precedence Rules">
        <p>When both a CLI flag and an environment variable provide the same setting, the CLI flag always wins:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--api-key</code> overrides <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_API_KEY</code> and provider-specific keys</li>
          <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--model</code> overrides <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_MODEL</code></li>
          <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--base-url</code> overrides <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_BASE_URL</code></li>
          <li>Provider-specific env vars (<code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">GOOGLE_API_KEY</code>, etc.) override <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_API_KEY</code></li>
        </ol>
      </DocSubSection>
    </DocSection>
  );
}
