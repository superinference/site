import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";

export default function Installation() {
  return (
    <DocSection id="install" title="Installation">
      <p>Install AMI with one command. Pick the installer for your platform — all three fetch the same release from GitHub and install to a per-user directory that is added to your <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">PATH</code>.</p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-neutral-900 dark:text-white">macOS / Linux</h3>
      <CodeBlock lang="bash" code="curl -fsSL https://www.superinference.org/install.sh | bash" />
      <p>Installs the binary to <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.local/bin/ami</code>. To pin a specific version, pass it as an argument:</p>
      <CodeBlock lang="bash" code="curl -fsSL https://www.superinference.org/install.sh | bash -s -- v0.7.2" />

      <h3 className="text-lg font-semibold mt-6 mb-2 text-neutral-900 dark:text-white">Windows (PowerShell)</h3>
      <p>The recommended installer. Works in PowerShell 5.1+ (pre-installed on Windows 10/11).</p>
      <CodeBlock lang="powershell" code="irm https://www.superinference.org/install.ps1 | iex" />
      <p>To pin a specific version:</p>
      <CodeBlock lang="powershell" code="& ([scriptblock]::Create((irm https://www.superinference.org/install.ps1))) v0.7.2" />

      <h3 className="text-lg font-semibold mt-6 mb-2 text-neutral-900 dark:text-white">Windows (CMD)</h3>
      <p>Fallback for locked-down environments where PowerShell is restricted by policy.</p>
      <CodeBlock lang="cmd" code="curl -fsSL https://www.superinference.org/install.cmd -o install.cmd && install.cmd && del install.cmd" />

      <h3 className="text-lg font-semibold mt-6 mb-2 text-neutral-900 dark:text-white">npm (all platforms)</h3>
      <CodeBlock lang="bash" code="npm install -g @superinference/cli" />

      <p>The Windows installers place <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">ami-tui.exe</code> in <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">%USERPROFILE%\.local\bin</code> and create <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">ami.cmd</code> (CMD/PowerShell) and <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">ami</code> (Git Bash, with bundled winpty for TTY support) wrappers, so <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">ami</code> works from every shell.</p>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">Note: the interactive TUI needs a terminal that supports raw mode. On Windows use <strong>PowerShell</strong>, <strong>Windows Terminal</strong>, or <strong>CMD</strong>. Git Bash (MinTTY) does not expose raw mode, so use <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">ami --prompt &quot;...&quot;</code> there instead.</p>

      <p>Verify the installation:</p>
      <CodeBlock lang="bash" code={`ami --version
# superinference v0.7.2`} />
      <p>To update, re-run the install command for your platform. The installer overwrites the existing binary and removes stale installations.</p>
    </DocSection>
  );
}
