import Section from "@/components/Section";
import Mermaid from "@/components/Mermaid";
import { openshellFlowChart } from "@/data/charts";

export default function Overview() {
  return (
      <Section id="os-overview" title="Overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>OpenShell</strong> provides sandboxed container environments for AI coding agents. The <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-ami</code> image is built on the <strong>OpenShell Community base</strong> — a comprehensive Ubuntu Noble image with Node.js 26, Python 3.14 (via uv), build-essential, git, and gh pre-installed. AMI extends it with a single binary, baked in at build time under Apache 2.0 with zero licensing risk.</p>
            <p>The container rootfs runs <strong>read-only</strong>, but <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">/sandbox</code> is mounted as a <strong>writable volume</strong>. When the agent discovers it needs a dependency at runtime — a Python library, an npm package, a system tool — it installs it on demand using <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">uv</code>, <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">npm</code>, or <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">sandbox-install</code> (for system packages via apt). Works across OpenShift, Kubernetes, Docker, and Podman — including arbitrary UIDs.</p>
            <p>AMI is the only agent in the OpenShell ecosystem that supports <strong>multi-provider LLM routing</strong> via FRITO (Free-tier Retrieval & Inference Token Ops). A single image works with any model backend — Anthropic, OpenAI, Google, DeepSeek, Ollama, vLLM, or any OpenAI-compatible endpoint — making it the universal agent flavor for heterogeneous infrastructure.</p>
          </div>
          <div>
            <Mermaid chart={openshellFlowChart} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{
              User: "Developer / Operator",
              OpenShell: "OpenShell CLI",
              Registry: "Container Registry",
              Container: "Sandbox",
              Entry: "Entrypoint",
              Probe: "Startup Probe",
              AMI: "AMI Agent",
              FRITO: "FRITO Routing",
              Tools: "37 Tools",
              Output: "Structured Output",
            }} descriptions={{
              User: "A developer using the OpenShell CLI, or a Kubernetes operator managing agent workloads via AgentRuntime custom resources.",
              OpenShell: "The OpenShell CLI or kagenti operator. Pulls the validated image, creates a sandbox container, injects API keys and task prompts as environment variables.",
              Registry: "Container images published to ghcr.io/superinference. Built and tested via CI with automated publication on push to main. The AMI image is ~200-250 MB compressed.",
              Container: "An isolated sandbox container running as the non-root 'sandbox' user. Filesystem writes are confined to /sandbox and /tmp. Network policy and resource limits are enforced by the OpenShell policy.",
              Entry: "The entrypoint script detects the agent name, verifies the binary is present, writes the startup probe marker, and execs into AMI detached mode.",
              Probe: "Writes /tmp/agent-ready after the agent is initialized. Consumed by kubelet liveness probes and the kagenti operator to confirm the agent is ready to accept work.",
              AMI: "AMI running in detached mode: --prompt for the task, --yolo for full autonomy, --output-format jsonl for structured streaming output, --max-turns for iteration control.",
              FRITO: "Free-tier Retrieval & Inference Token Ops. Routes LLM calls across 13 providers with automatic fallback, quota tracking, and cost optimization. Works with any backend the operator configures.",
              Tools: "37 built-in tools covering file operations, shell execution, code search, web access, MCP integration, workflow orchestration, and task management. All subject to the sandbox security policy.",
              Output: "Structured JSONL output streamed to stdout. Includes complete execution traces, tool call logs, file changes, and audit events. Exit codes: 0=success, 1=error, 2=permission-denied, 3=max-turns, 4=aborted.",
            }} />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 10.</strong> AMI execution flow inside an OpenShell sandbox: from task prompt to structured output.</div>
          </div>
        </div>
      </Section>
  );
}
