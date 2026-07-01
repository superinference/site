import Section from "@/components/Section";
import Mermaid from "@/components/Mermaid";
import { openshellArchChart } from "@/data/charts";

export default function ImageArchitecture() {
  return (
      <Section id="os-architecture" title="Image Architecture" subtitle="Built on the OpenShell Community base with on-demand dependency resolution.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <Mermaid chart={openshellArchChart} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{
              Base: "Community Base",
              AMI: "AMI Flavor",
              Writable: "Writable Volume",
            }} descriptions={{
              Base: "NVIDIA OpenShell Community base image (Ubuntu Noble). Ships with Node.js 26, Python 3.14.3 (via uv), build-essential, git, gh, npm 11, and common agent CLIs. Provides a comprehensive dev environment out of the box.",
              AMI: "AMI flavor — extends the community base with a single binary (~30 MB). Apache 2.0 licensed, baked in at build time. Instant cold-start, zero runtime downloads. The only agent in the ecosystem with multi-provider LLM routing.",
              Writable: "The /sandbox volume is mounted writable even when the container rootfs is read-only. The agent uses uv, npm, and sandbox-install to install dependencies on demand — Python packages to /sandbox/.venv, Node packages to /sandbox/node_modules, system packages via apt-get, CLI tools to /sandbox/.local/bin. Works with arbitrary UIDs (OpenShift, Podman) via GID 0 group-writable paths.",
            }} />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 11.</strong> OpenShell Community base + AMI flavor with writable /sandbox for on-demand dependency resolution.</div>
          </div>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>The <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-ami</code> image builds on the <strong>OpenShell Community base</strong> — a comprehensive Ubuntu Noble image maintained by NVIDIA. The base provides the full dev environment (Node.js, Python, build tools, git), and AMI adds a single binary on top. This means the agent starts with everything most coding tasks need, and installs anything else on demand.</p>
            <p>The container runs with a <strong>read-only rootfs</strong> for security, but <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">/sandbox</code> is mounted as a <strong>writable volume</strong>. Three package managers cover every dependency type: <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">uv</code> for Python, <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">npm</code> for Node, and <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">sandbox-install</code> for system packages (apt). All work as non-root with arbitrary UIDs — compatible with OpenShift restricted SCCs, vanilla Kubernetes, Docker, and Podman.</p>
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th className="px-4 py-2 text-left font-semibold text-neutral-900 dark:text-white">Feature</th>
                    <th className="px-4 py-2 text-left font-semibold text-neutral-900 dark:text-white">AMI</th>
                    <th className="px-4 py-2 text-left font-semibold text-neutral-900 dark:text-white">Other Agents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                  <tr>
                    <td className="px-4 py-2 text-sm">LLM Providers</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400 text-sm">13 (via FRITO)</td>
                    <td className="px-4 py-2 text-amber-600 dark:text-amber-400 text-sm">1 each</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-900/30">
                    <td className="px-4 py-2 text-sm">License</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400 text-sm">Apache 2.0</td>
                    <td className="px-4 py-2 text-amber-600 dark:text-amber-400 text-sm">Mixed</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Cold Start</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400 text-sm">Instant</td>
                    <td className="px-4 py-2 text-amber-600 dark:text-amber-400 text-sm">0-20s</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-900/30">
                    <td className="px-4 py-2 text-sm">On-Demand Deps</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400 text-sm">uv + npm</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400 text-sm">uv + npm</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Air-Gap Ready</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400 text-sm">Yes</td>
                    <td className="px-4 py-2 text-amber-600 dark:text-amber-400 text-sm">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
  );
}
