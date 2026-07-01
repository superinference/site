import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function Security() {
  return (
    <DocSection id="security" title="Security">
      <DocSubSection id="security-keys" title="API Key Security">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>FRITO config is stored at <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">~/.ami/frito.json</code> with <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">0600</code> permissions (owner-only).</li>
          <li>API keys are never logged, never printed in output, and never stored in VS Code settings.</li>
          <li>The <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--prompt</code> JSON output never contains API keys.</li>
          <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">~/.ami/</code> should be excluded from git (add to <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">.gitignore</code>).</li>
        </ul>
      </DocSubSection>

      <DocSubSection id="security-binary" title="Distribution">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>AMI is distributed as a self-contained binary via GitHub Releases.</li>
          <li>Install and update through the official install script.</li>
        </ul>
      </DocSubSection>

      <DocSubSection id="security-ci" title="CI Security">
        <p>For CI/CD pipelines, store API keys as secrets and write them to a temporary file:</p>
        <CodeBlock lang="yaml" code={`# GitHub Actions example
- name: Setup FRITO config
  run: |
    mkdir -p ~/.ami
    echo '$\{{ secrets.AMI_FRITO }}' > ~/.ami/frito.json
    chmod 600 ~/.ami/frito.json`} />
      </DocSubSection>
    </DocSection>
  );
}
