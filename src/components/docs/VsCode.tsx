import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function VsCode() {
  return (
    <DocSection id="vscode" title="VS Code Extension">
      <p>The AMI VS Code extension provides a monitoring interface for active agent sessions. Available from the <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="underline hover:no-underline text-blue-500">VS Code Marketplace</a>.</p>

      <DocSubSection id="vscode-features" title="Features">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Monitor active AMI sessions in real time from the VS Code side panel.</li>
          <li>View streaming responses, tool calls, and agent progress.</li>
          <li>Inspect diffs and proposed changes as they happen.</li>
          <li>Session overview with status and history.</li>
        </ul>
      </DocSubSection>

      <DocSubSection id="vscode-config" title="Configuration">
        <p>The VS Code extension reads API keys from environment variables or the FRITO config file. Keys are never stored in VS Code settings.</p>
        <CodeBlock lang="bash" code={`# Set your API key in your shell profile (~/.bashrc, ~/.zshrc)
export GOOGLE_API_KEY="AIza..."

# Or configure FRITO for multi-provider routing
# Keys are stored in ~/.ami/frito.json, not VS Code settings`} />
      </DocSubSection>
    </DocSection>
  );
}
