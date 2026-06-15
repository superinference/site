"use client";

import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import Mermaid from "@/components/Mermaid";
import { openshellArchChart, openshellFlowChart } from "@/data/charts";

export default function OpenShellPage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">

      {/* Hero */}
      <Section id="openshell" title="OpenShell Integration" subtitle="Run AMI as an autonomous coding agent inside validated, license-clean container sandboxes. Works with OpenShell, plain Podman/Docker, or Kubernetes.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p><strong>OpenShell</strong> provides sandboxed container environments for AI coding agents. AMI integrates as a <strong>validated flavor image</strong> — a minimal, UBI-based container with the AMI binary baked in at build time. Because AMI is licensed under Apache 2.0, the binary can be redistributed directly in the image with zero licensing risk, unlike proprietary agents that require runtime installation from vendor CDNs on every boot.</p>
            <p>The <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-ami</code> image runs exclusively in <strong>detached mode</strong> — no REPL, no TUI, no human in the loop. The operator or sandbox gateway passes a task prompt, AMI executes autonomously with structured JSONL output, and exits with a semantic status code. This makes it ideal for platform-managed deployments, CI/CD pipelines, and air-gapped enterprise environments.</p>
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
            <CodeBlock lang="bash" code={`# Detached mode with a task prompt
podman run --rm \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -e AGENT_PROMPT="Refactor the database layer to use connection pooling" \\
  -v ./myproject:/sandbox/project \\
  ghcr.io/superinference/openshell-ami

# Direct CLI arguments
podman run --rm \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
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
      <Section id="architecture" title="Image Architecture" subtitle="Thin base + flavor pattern. Each agent image contains only what it needs.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <Mermaid chart={openshellArchChart} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{
              Base: "Thin Base",
              AMI: "AMI Flavor",
              Claude: "Claude Flavor",
              Codex: "Codex Flavor",
              ADK: "ADK Flavor",
            }} descriptions={{
              Base: "UBI 10-minimal base image (150-200 MB). Contains only OS-level dependencies: ca-certs, curl, git, jq. No language runtimes, no agents. Every flavor inherits this shared layer.",
              AMI: "AMI flavor (~200-250 MB). The smallest flavor image — AMI ships as a single binary, so no Node.js or Python runtime layer is needed in the image itself. Apache 2.0 licensed, baked in at build time. Instant cold-start, zero runtime downloads.",
              Claude: "Claude Code flavor (~350-400 MB). Requires Node.js 22 runtime layer. Proprietary license ('All rights reserved') means the agent must be downloaded from Anthropic's CDN at every uncached boot — 10-20 second cold-start penalty.",
              Codex: "Codex flavor (~350-400 MB). Requires Node.js 22 runtime layer. Apache 2.0 licensed, so the binary is baked in at build time. Instant cold-start.",
              ADK: "Google ADK flavor (~300-350 MB). Requires Python 3.13 + uv runtime layer. Apache 2.0 licensed, baked in. Instant cold-start.",
            }} />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 11.</strong> OpenShell thin-base + flavor architecture. Each flavor extends a shared UBI base with only the runtimes its agent requires.</div>
          </div>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>The upstream OpenShell Community base image is a <strong>2.81 GB monolith</strong> (1.4 GB compressed) that bundles every agent CLI, full build toolchains, and system utilities into a single image. The thin-base + flavor approach replaces this with a minimal shared base and per-agent images that contain only what each agent needs.</p>
            <p>AMI has the <strong>smallest footprint</strong> of any flavor because it ships as a single compiled binary — no Node.js, no Python, no npm packages needed in the container. The result is an image roughly <strong>12x smaller</strong> than the upstream monolith.</p>
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-neutral-100 dark:bg-neutral-800/60">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300">Image</th>
                    <th className="px-4 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300">Size</th>
                    <th className="px-4 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300">Cold Start</th>
                    <th className="px-4 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300">License</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">upstream monolith</td>
                    <td className="px-4 py-2">2.81 GB</td>
                    <td className="px-4 py-2">Fast</td>
                    <td className="px-4 py-2 text-amber-600 dark:text-amber-400">Mixed</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-900/30">
                    <td className="px-4 py-2 font-mono text-xs font-semibold">openshell-ami</td>
                    <td className="px-4 py-2 font-semibold">~200-250 MB</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400">Instant</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400">Apache 2.0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">openshell-claude</td>
                    <td className="px-4 py-2">~350-400 MB</td>
                    <td className="px-4 py-2 text-amber-600 dark:text-amber-400">10-20s</td>
                    <td className="px-4 py-2 text-red-600 dark:text-red-400">Proprietary</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-900/30">
                    <td className="px-4 py-2 font-mono text-xs">openshell-codex</td>
                    <td className="px-4 py-2">~350-400 MB</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400">Instant</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400">Apache 2.0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">openshell-adk</td>
                    <td className="px-4 py-2">~300-350 MB</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400">Instant</td>
                    <td className="px-4 py-2 text-green-600 dark:text-green-400">Apache 2.0</td>
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
                <div><strong className="text-neutral-900 dark:text-white">Task prompt</strong> — passed via <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--prompt</code> or <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">AGENT_PROMPT</code> env var</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">2</div>
                <div><strong className="text-neutral-900 dark:text-white">Autonomous execution</strong> — <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--yolo</code> bypasses permission prompts for full autonomy within sandbox policy</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">3</div>
                <div><strong className="text-neutral-900 dark:text-white">Structured output</strong> — JSONL stream with execution traces, tool calls, file changes, and audit events</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">4</div>
                <div><strong className="text-neutral-900 dark:text-white">Semantic exit codes</strong> — 0 (success), 1 (error), 2 (permission denied), 3 (max turns), 4 (aborted)</div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">5</div>
                <div><strong className="text-neutral-900 dark:text-white">Audit logging</strong> — complete JSONL audit trail at <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.superinference/audit.jsonl</code></div>
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
          <p>Every other agent in the OpenShell ecosystem is locked to a single LLM provider: <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-claude</code> needs Anthropic, <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-codex</code> needs OpenAI, <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-adk</code> needs Google. AMI&apos;s <strong>FRITO</strong> (Free-tier Retrieval & Inference Token Ops) makes <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">openshell-ami</code> the <strong>universal agent flavor</strong> — it works with whatever model endpoint the infrastructure provides.</p>
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
                <div className="text-sm text-green-700 dark:text-green-400 mt-1">Binary baked in. Mirror the image, configure an Ollama or vLLM endpoint on the internal network, and run. Zero internet access needed.</div>
              </div>
              <div className="rounded-lg border border-red-200 dark:border-red-900/50 p-3 bg-red-50 dark:bg-red-900/20">
                <div className="font-semibold text-red-800 dark:text-red-300 text-sm">Claude Code (openshell-claude)</div>
                <div className="text-sm text-red-700 dark:text-red-400 mt-1">Proprietary binary downloaded from Anthropic&apos;s CDN at every boot. Requires mirroring the install script and CDN internally, or pre-populating a persistent volume cache.</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock lang="bash" code={`# Air-gapped deployment with local vLLM backend
podman run --rm --network=none \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
  -e DEFAULT_PROVIDER=vllm \\
  -e OPENAI_BASE_URL=http://vllm.internal:8000/v1 \\
  -e OPENAI_API_KEY=dummy \\
  -e AGENT_PROMPT="Audit src/ for security vulnerabilities" \\
  -v ./codebase:/sandbox/project \\
  internal-registry.corp/openshell-ami:v0.1`} />
            <CodeBlock lang="bash" code={`# With Ollama on the local network
podman run --rm \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
  -e DEFAULT_PROVIDER=ollama \\
  -e OLLAMA_HOST=http://ollama.internal:11434 \\
  -e AGENT_PROMPT="Write integration tests for the API layer" \\
  -v ./codebase:/sandbox/project \\
  internal-registry.corp/openshell-ami:v0.1`} />
          </div>
        </div>
      </Section>

      {/* Containerfile */}
      <Section id="containerfile" title="Containerfile" subtitle="The complete AMI flavor image. Extends the OpenShell thin base with a single binary.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <CodeBlock lang="dockerfile" code={`# openshell-ami: SuperInference AMI agent (Apache 2.0, baked in)
# Target size: 200-250 MB
ARG BASE_IMAGE=registry.access.redhat.com/ubi10/ubi-minimal:latest
FROM \${BASE_IMAGE}

USER root
RUN microdnf install -y --nodocs --setopt=install_weak_deps=0 \\
        ca-certificates curl git jq tar gzip libatomic procps-ng shadow-utils \\
    && microdnf clean all

# Users: supervisor (non-login) and sandbox (interactive)
RUN useradd -r -s /usr/sbin/nologin supervisor \\
    && useradd -m -s /bin/bash -d /sandbox sandbox

RUN mkdir -p /sandbox/.local/bin /sandbox/.config/superinference \\
    && chown -R sandbox:sandbox /sandbox

# Install AMI binary (Apache 2.0 — safe to redistribute)
USER sandbox
RUN curl -fsSL https://www.superinference.org/install.sh | bash

USER root
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
COPY policy.yaml /etc/openshell/policy.yaml

# OCI labels for operator discovery
LABEL io.openshell.sandbox.harness="ami" \\
      io.openshell.sandbox.license="Apache-2.0"

USER sandbox
WORKDIR /sandbox
ENV PATH="/sandbox/.local/bin:\${PATH}" AGENT_NAME=ami
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["ami"]`} />
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>The Containerfile follows the <strong>Agent Runtime Contract (ARC)</strong> conventions defined by the OpenShell proposal:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox</code> user with home at <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox</code></li>
              <li><code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">supervisor</code> non-login user for the OpenShell supervisor process</li>
              <li>Policy at <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/etc/openshell/policy.yaml</code></li>
              <li>Startup probe marker at <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/tmp/agent-ready</code></li>
              <li>OCI labels for kagenti operator discovery</li>
              <li><code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">BASE_IMAGE</code> build arg for base swapping</li>
            </ul>
            <p>The <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">BASE_IMAGE</code> arg allows swapping the base for different distributions — UBI for Red Hat validated builds, Ubuntu for upstream OpenShell Community contributions, or a custom base for specialized environments.</p>
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
                <li><strong>Container isolation</strong> — non-root user, restricted mounts, network policy</li>
                <li><strong>Filesystem confinement</strong> — writes limited to <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox</code> and <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/tmp</code></li>
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
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Even when running with <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">--yolo</code> (full autonomy), AMI&apos;s hardline security rules remain active — fork bombs, <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">rm -rf /</code>, and 19 other destructive patterns are unconditionally blocked regardless of permission mode. The OpenShell sandbox provides the infrastructure-level boundary on top of this.</p>
        </div>
      </Section>

      {/* Competitive Advantages */}
      <Section id="advantages" title="Why AMI for OpenShell" subtitle="The only agent in the ecosystem that combines all five properties.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Smallest Footprint", desc: "~200-250 MB. Single binary, no runtime layer. 12x smaller than the upstream monolith." },
            { title: "Zero Cold-Start", desc: "Binary baked in at build time. Apache 2.0 means no licensing workaround — instant boot, every time." },
            { title: "Multi-Provider", desc: "FRITO routes across 13 LLM providers. Works with Anthropic, OpenAI, Google, Ollama, vLLM, or any OpenAI-compatible endpoint." },
            { title: "True Detached Mode", desc: "Built for autonomous execution. Structured JSONL output, semantic exit codes, audit logging, session resume." },
            { title: "37 Built-in Tools", desc: "File operations, shell execution, code search, web access, MCP integration, workflow orchestration, task management." },
            { title: "Air-Gap Ready", desc: "Zero runtime downloads. Mirror the image, point at a local model endpoint, and run. No vendor CDN dependency." },
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
      --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
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

    </main>
  );
}
