import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";

export default function Installation() {
  return (
    <DocSection id="install" title="Installation">
      <p>Install AMI with one command:</p>
      <CodeBlock lang="bash" code="curl -fsSL https://www.superinference.org/install.sh | bash" />
      <p>This downloads the latest release from GitHub, places the binary at <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.local/bin/ami</code>, and ensures it is in your <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">PATH</code>.</p>
      <p>Verify the installation:</p>
      <CodeBlock lang="bash" code={`ami --version
# superinference v0.6.2`} />
      <p>To update, re-run the install command. The installer overwrites the existing binary.</p>
    </DocSection>
  );
}
