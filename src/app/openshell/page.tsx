"use client";

import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import Mermaid from "@/components/Mermaid";
import PageLayout from "@/components/PageLayout";
import { openshellToc } from "@/data/nav";
import { openshellArchChart, openshellFlowChart } from "@/data/charts";

export default function OpenShellPage() {
  return (
    <PageLayout title="OpenShell Integration" subtitle="Run AMI as an autonomous coding agent inside validated, license-clean container sandboxes." toc={openshellToc}>

      <Section id="openshell" title="Overview">
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

      {/* Quick Start */}
      <Section id="quickstart" title="Quick Start" subtitle="Three ways to run AMI in a container. No cluster required for the first two.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">With OpenShell CLI</h3>
            <CodeBlock lang="bash" code={`openshell sandbox create --from ubi-ami \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -e AGENT_PROMPT="Fix the failing tests in src/auth/"

# Or interactively (drops into bash, ami available on PATH)
openshell sandbox create --from ubi-ami -e ANTHROPIC_API_KEY=sk-ant-...`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">With Podman / Docker</h3>
            <CodeBlock lang="bash" code={`# Detached mode — read-only rootfs, writable /sandbox
podman run --rm \\
  --tmpfs /tmp:rw,nosuid,nodev,size=1g \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -e AGENT_PROMPT="Refactor the database layer to use connection pooling" \\
  -v ./myproject:/sandbox/project \\
  ghcr.io/superinference/openshell-ami

# Direct CLI arguments
podman run --rm \\
  --tmpfs /tmp:rw,nosuid,nodev,size=1g \\
  -e OPENAI_API_KEY=sk-... \\
  -v ./myproject:/sandbox/project \\
  ghcr.io/superinference/openshell-ami \\
  ami --prompt "Add unit tests for utils.ts" --yolo --output-format jsonl`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">With Kubernetes (AgentRuntime CR)</h3>
            <CodeBlock lang="yaml" code={`apiVersion: kagenti.dev/v1alpha1
kind: AgentRuntime
metadata:
  name: code-review-agent
spec:
  harness: ami
  image: ghcr.io/superinference/openshell-ami:latest
  securityContext:
    readOnlyRootFilesystem: true    # rootfs read-only
  volumes:
    - name: sandbox
      emptyDir: {}                  # writable /sandbox for on-demand deps
    - name: tmp
      emptyDir:
        medium: Memory
        sizeLimit: 1Gi
    - name: shm
      emptyDir:
        medium: Memory
        sizeLimit: 2Gi
  volumeMounts:
    - name: sandbox
      mountPath: /sandbox
    - name: tmp
      mountPath: /tmp
    - name: shm
      mountPath: /dev/shm
  env:
    - name: ANTHROPIC_API_KEY
      valueFrom:
        secretKeyRef:
          name: llm-credentials
          key: anthropic-key
    - name: AGENT_PROMPT
      value: "Review the pending PR and post findings as comments"
  resources:
    limits:
      memory: 4Gi
      cpu: "4"`} />
          </div>
        </div>
      </Section>

      {/* Architecture */}
      <Section id="architecture" title="Image Architecture" subtitle="Built on the OpenShell Community base with on-demand dependency resolution.">
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

      {/* Detached Mode */}
      <Section id="detached" title="Autonomous Detached Execution" subtitle="AMI was built for non-interactive, container-native operation from the start.">
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

      {/* FRITO Multi-Provider */}
      <Section id="multi-provider" title="Multi-Provider LLM Routing" subtitle="One image, any LLM backend. FRITO routes across 13 providers with automatic fallback.">
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          <p>Every other agent in the OpenShell ecosystem is locked to a single LLM provider: <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-claude</code> needs Anthropic, <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-codex</code> needs OpenAI, <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-adk</code> needs Google. AMI&apos;s <strong>FRITO</strong> (Free-tier Retrieval & Inference Token Ops) makes <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-ami</code> the <strong>universal agent flavor</strong> — it works with whatever model endpoint the infrastructure provides.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Cloud Providers</h4>
              <ul className="space-y-1 text-sm">
                <li>Anthropic (Claude)</li>
                <li>OpenAI (GPT, o-series)</li>
                <li>Google (Gemini)</li>
                <li>DeepSeek</li>
                <li>xAI (Grok)</li>
                <li>Mistral</li>
              </ul>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Free-Tier Routing</h4>
              <ul className="space-y-1 text-sm">
                <li>GROQ</li>
                <li>OpenRouter</li>
                <li>GitHub Models</li>
                <li>Cerebras</li>
                <li>HuggingFace</li>
                <li>Together.AI</li>
              </ul>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Self-Hosted / Air-Gapped</h4>
              <ul className="space-y-1 text-sm">
                <li>Ollama (local)</li>
                <li>vLLM</li>
                <li>Any OpenAI-compatible API</li>
                <li>Red Hat AI (RHOAI)</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Air-Gapped / Enterprise */}
      <Section id="enterprise" title="Disconnected and Air-Gapped Deployment" subtitle="For regulated environments where no external network calls are permitted at runtime.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>Banks, government agencies, and defense contractors mirror container images to internal registries and prohibit runtime downloads. AMI is one of the few agents that works <strong>immediately after mirroring</strong> with zero external dependencies at runtime.</p>
            <div className="space-y-3">
              <div className="rounded-lg border border-green-200 dark:border-green-900/50 p-3 bg-green-50 dark:bg-green-900/20">
                <div className="font-semibold text-green-800 dark:text-green-300 text-sm">AMI (openshell-ami)</div>
                <div className="text-sm text-green-700 dark:text-green-400 mt-1">Binary baked in. Mirror the image, configure an Ollama or vLLM endpoint on the internal network, and run. For on-demand deps, pre-populate a PVC with Python wheels and npm tarballs — uv and npm resolve from the local cache.</div>
              </div>
              <div className="rounded-lg border border-red-200 dark:border-red-900/50 p-3 bg-red-50 dark:bg-red-900/20">
                <div className="font-semibold text-red-800 dark:text-red-300 text-sm">Claude Code (openshell-claude)</div>
                <div className="text-sm text-red-700 dark:text-red-400 mt-1">Proprietary binary downloaded from Anthropic&apos;s CDN at every boot. Requires mirroring the install script and CDN internally, or pre-populating a persistent volume cache.</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock lang="bash" code={`# Air-gapped deployment with local vLLM backend
# Pre-populated cache PVC for on-demand deps without network
podman run --rm --read-only --network=none \\
  --tmpfs /tmp:rw,nosuid,nodev,size=1g \\
  -v dep-cache:/sandbox/.cache \\
  -e DEFAULT_PROVIDER=vllm \\
  -e OPENAI_BASE_URL=http://vllm.internal:8000/v1 \\
  -e OPENAI_API_KEY=dummy \\
  -e AGENT_PROMPT="Audit src/ for security vulnerabilities" \\
  -v ./codebase:/sandbox/project \\
  internal-registry.corp/openshell-ami:v0.1`} />
            <CodeBlock lang="bash" code={`# With Ollama on the local network
podman run --rm \\
  --tmpfs /tmp:rw,nosuid,nodev,size=1g \\
  -e DEFAULT_PROVIDER=ollama \\
  -e OLLAMA_HOST=http://ollama.internal:11434 \\
  -e AGENT_PROMPT="Write integration tests for the API layer" \\
  -v ./codebase:/sandbox/project \\
  internal-registry.corp/openshell-ami:v0.1`} />
          </div>
        </div>
      </Section>

      {/* On-Demand Dependencies */}
      <Section id="on-demand-deps" title="On-Demand Dependency Resolution" subtitle="The agent installs what it needs, when it needs it — into a writable volume, not the rootfs.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>Coding agents can&apos;t know in advance what tools a task will require. A prompt like <em>&quot;run the Node tests&quot;</em> needs <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">mocha</code>; <em>&quot;lint the Python files&quot;</em> needs <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">ruff</code>. These dependencies are discovered <strong>during execution</strong>, not before it.</p>
            <p>The OpenShell sandbox runs with a <strong>read-only container rootfs</strong> and <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">/sandbox</code> is mounted as a <strong>writable volume</strong> (emptyDir, tmpfs, or PVC). The image ships with <strong>three tiers of package management</strong> — userspace, system, and standalone — all working as non-root with arbitrary UIDs (OpenShift, Podman):</p>
            <div className="space-y-3 mt-4">
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Python packages</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">uv pip install pytest ruff mypy</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Installs to <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/.venv</code> (already in PATH)</div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Node packages</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">npm install mocha eslint typescript</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Installs to <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/node_modules</code></div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">CLI tools</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">uv tool install ruff</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Installs to <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/.local/bin</code> (already in PATH)</div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">System packages</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">sandbox-install htop tree vim</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Wraps <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">sudo apt-get</code> — works with any UID (OpenShift, Podman, K8s, Docker)</div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Standalone binaries</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">curl -fsSL https://example.com/tool | tar -xz -C /sandbox/.local/bin</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Any binary the agent downloads lands in the writable volume</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock lang="bash" code={`# Run the agent in a sandbox — it installs deps on demand
$ docker run --rm \\
    --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
    -e AI_API_KEY=\${AI_API_KEY} \\
    -e AGENT_PROMPT="Install cowsay and run: python -c \\
       'import cowsay; cowsay.cow(hello)'" \\
    openshell-ami`} />
            <CodeBlock lang="json" code={`// Actual JSONL output from the sandbox run:

// 1. Agent decides to install the package
{"type":"tool_use_start","toolName":"bash",
 "input":{"command":"uv pip install cowsay && \\
   python -c 'import cowsay; cowsay.cow(\"hello\")'"}
}

// 2. uv resolves and installs into /sandbox/.venv (195ms)
{"type":"tool_use_result","toolName":"bash",
 "output":"Resolved 1 package in 174ms\\n\\
   Installed 1 package in 7ms\\n + cowsay==6.1\\n\\
    _____\\n| hello |\\n  =====\\n\\
        ^__^\\n  (oo)\\\\_______\\n"
}

// No rootfs was mutated. The writable /sandbox volume
// absorbed the install. Container stays read-only.`} />
            <CodeBlock lang="yaml" code={`# Writable paths in the sandbox policy
permissions:
  filesystem:
    write:
      - /sandbox     # writable volume (deps go here)
      - /tmp         # tmpfs
    deny:
      - /etc         # read-only rootfs
      - /usr         # read-only rootfs
      - /var         # read-only rootfs`} />
            <div className="rounded-lg border border-blue-200 dark:border-blue-900/50 p-3 bg-blue-50 dark:bg-blue-900/20">
              <div className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Air-gapped on-demand deps</div>
              <div className="text-sm text-blue-700 dark:text-blue-400 mt-1">For disconnected environments, pre-populate a PVC with a Python wheel cache or npm registry mirror. Mount it at <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/.cache</code> and both uv and npm will resolve packages locally without network access.</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Containerfile */}
      <Section id="containerfile" title="Containerfile" subtitle="AMI extends the OpenShell Community base with a single binary.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <CodeBlock lang="dockerfile" code={`# openshell-ami: SuperInference AMI agent on OpenShell Community base
# The base provides Node.js 26, Python 3.14 (uv), build-essential,
# git, gh, npm — everything a coding agent typically needs.
# Additional deps installed on demand into writable /sandbox.

ARG BASE_IMAGE=ghcr.io/nvidia/openshell-community/sandboxes/base:latest
FROM \${BASE_IMAGE}

# Passwordless sudo for system package management
USER root
RUN echo "ALL ALL=(root) NOPASSWD: /usr/bin/apt-get, \\
      /usr/bin/apt-get *, /usr/bin/dpkg, /usr/bin/dpkg *" \\
      > /etc/sudoers.d/sandbox-apt && \\
    chmod 0440 /etc/sudoers.d/sandbox-apt

# OpenShift: allow entrypoint to add passwd entry for arbitrary UIDs
RUN chmod g+w /etc/passwd

# sandbox-install: agents can install system packages without sudo
RUN printf '#!/bin/bash\\nset -euo pipefail\\n\\
    sudo apt-get update -qq 2>/dev/null\\n\\
    exec sudo apt-get install -y -qq "$@"\\n' \\
      > /usr/local/bin/sandbox-install && \\
    chmod +x /usr/local/bin/sandbox-install

# AMI-specific directories
USER sandbox
RUN mkdir -p /sandbox/.config/superinference \\
             /sandbox/.superinference

# Install AMI binary (Apache 2.0)
RUN curl -fsSL https://www.superinference.org/install.sh | bash

USER root
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
COPY policy.yaml /etc/openshell/policy.yaml

# OpenShift: writable /sandbox for arbitrary UIDs (GID 0)
RUN chgrp -R 0 /sandbox && chmod -R g=u /sandbox

LABEL io.openshell.sandbox.harness="ami" \\
      io.openshell.sandbox.license="Apache-2.0"

USER sandbox
WORKDIR /sandbox
ENV PATH="/sandbox/.local/bin:\${PATH}" HOME=/sandbox \\
    AGENT_NAME=ami UV_NO_SANDBOX=1 \\
    PIP_NO_BUILD_ISOLATION=1
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["ami"]`} />
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>The Containerfile follows the <strong>Agent Runtime Contract (ARC)</strong> conventions and builds on the OpenShell Community base:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Community base</strong> provides <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox</code> user, <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">supervisor</code> user, Node.js, Python, uv, npm, git, build-essential</li>
              <li>AMI adds the binary (~30 MB), config dirs, and <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox-install</code> for system packages</li>
              <li><strong>OpenShift-ready</strong>: arbitrary UID support (GID 0 group-writable), passwd entry generation at startup</li>
              <li><code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">UV_NO_SANDBOX=1</code> and <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">PIP_NO_BUILD_ISOLATION=1</code> — package installs work without SYS_ADMIN</li>
              <li>Passwordless <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sudo</code> scoped to apt-get/dpkg only — agents install system packages via <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox-install</code></li>
              <li><code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox/.venv</code> pre-created by base, writable, in PATH — uv/pip install packages here</li>
              <li><code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox/.local/bin</code> in PATH — CLI tools and standalone binaries go here</li>
              <li>Policy at <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/etc/openshell/policy.yaml</code>, startup probe at <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/tmp/agent-ready</code>, OCI labels for kagenti</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Security */}
      <Section id="security" title="Security Model" subtitle="Two-layer security: AMI's internal permission system operates within the OpenShell sandbox boundary.">
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-5 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Outer Layer: OpenShell Sandbox Policy</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Container isolation</strong> — non-root user, read-only rootfs, restricted mounts, network policy</li>
                <li><strong>Filesystem confinement</strong> — rootfs is read-only; writes limited to writable <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox</code> volume and <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/tmp</code> tmpfs</li>
                <li><strong>Resource limits</strong> — CPU, memory, disk quotas enforced by cgroup</li>
                <li><strong>Network controls</strong> — outbound filtered, inbound blocked by default</li>
                <li><strong>SPIFFE/mTLS</strong> — sidecar-injected identity certificates</li>
              </ul>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-5 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Inner Layer: AMI Permission System</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>25 bash security validators</strong> — command injection, shell quoting, redirections, obfuscation detection</li>
                <li><strong>Recursive descent AST parser</strong> — full bash command structure analysis</li>
                <li><strong>4-tier command classification</strong> — safe, unsafe, destructive, hardline-blocked</li>
                <li><strong>Environment scrubbing</strong> — 30+ patterns strip API keys and credentials from output</li>
                <li><strong>Self-kill protection</strong> — prevents the agent from terminating its own process</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Even when running with <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">--yolo</code> (full autonomy), AMI&apos;s hardline security rules remain active — fork bombs, <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">rm -rf /</code>, and 19 other destructive patterns are unconditionally blocked regardless of permission mode. The OpenShell sandbox provides the infrastructure-level boundary on top of this.</p>
        </div>
      </Section>

      {/* Competitive Advantages */}
      <Section id="advantages" title="Why AMI for OpenShell" subtitle="The only agent in the ecosystem that combines all five properties.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "On-Demand Deps", desc: "Read-only rootfs with writable /sandbox. Agent installs Python packages (uv), Node packages (npm), or system packages (sandbox-install) at runtime — works across OpenShift, K8s, Docker, and Podman." },
            { title: "Zero Cold-Start", desc: "Binary baked in at build time. Apache 2.0 means no licensing workaround — instant boot, every time." },
            { title: "Multi-Provider", desc: "FRITO routes across 13 LLM providers. Works with Anthropic, OpenAI, Google, Ollama, vLLM, or any OpenAI-compatible endpoint." },
            { title: "True Detached Mode", desc: "Built for autonomous execution. Structured JSONL output, semantic exit codes, audit logging, session resume." },
            { title: "37 Built-in Tools", desc: "File operations, shell execution, code search, web access, MCP integration, workflow orchestration, task management." },
            { title: "Air-Gap Ready", desc: "Mirror the image, pre-populate a wheel/registry cache on a PVC, point at a local model endpoint, and run. No vendor CDN dependency." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{item.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Use Cases */}
      <Section id="use-cases" title="Use Cases">
        <div className="space-y-6 text-neutral-700 dark:text-neutral-300 text-base/7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 dark:text-white">CI/CD Agent</h4>
              <p className="text-sm">Run AMI as a Kubernetes Job triggered by PR webhooks. It reviews code, runs tests, posts findings as PR comments, and exits. The JSONL output integrates with any log aggregator.</p>
              <CodeBlock lang="bash" code={`# GitHub Actions step
- run: |
    podman run --rm \\
      --tmpfs /tmp:rw,nosuid,nodev,size=1g \\
      -e ANTHROPIC_API_KEY=\${{ secrets.ANTHROPIC_KEY }} \\
      -e AGENT_PROMPT="Review changes and run tests" \\
      -v \${{ github.workspace }}:/sandbox/project \\
      ghcr.io/superinference/openshell-ami`} />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 dark:text-white">Developer Sandbox</h4>
              <p className="text-sm">Spin up an ephemeral coding environment with AMI pre-installed. Mount your project, pass a task, and let the agent work autonomously while you do other things.</p>
              <CodeBlock lang="bash" code={`openshell sandbox create --from ubi-ami \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -e AGENT_PROMPT="Add comprehensive error handling \\
     to the payment processing module" \\
  --volume ./payments:/sandbox/project`} />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 dark:text-white">Platform-Managed Agent</h4>
              <p className="text-sm">Deploy via the kagenti operator with an AgentRuntime CR. The operator resolves the harness to a validated image, manages lifecycle, injects sidecars for telemetry and identity.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 dark:text-white">Conformance Testing</h4>
              <p className="text-sm">Validate agent runtime compatibility via automated e2e tests. Boot the image, run a task, verify tool use works (file creation, command execution, model API call), gate publication.</p>
            </div>
          </div>
        </div>
      </Section>

    </PageLayout>
  );
}
