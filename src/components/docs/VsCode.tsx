import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function VsCode() {
  return (
    <DocSection id="vscode" title="VS Code Extension">
      <p>AMI is available as a VS Code extension from the <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="underline hover:no-underline text-blue-500">VS Code Marketplace</a>.</p>

      <DocSubSection id="vscode-features" title="Features">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Chat panel with streaming responses and diff previews.</li>
          <li>Access to open files, active selection, and language servers for context.</li>
          <li>All 15 built-in tools (file ops, search, execution, web).</li>
          <li>FRITO integration — all <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/frito</code> slash commands work identically.</li>
          <li>Session management with resume capability.</li>
          <li>Diff viewer for reviewing proposed changes.</li>
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
