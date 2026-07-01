import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function AirGapped() {
  return (
      <Section id="os-enterprise" title="Disconnected and Air-Gapped Deployment" subtitle="For regulated environments where no external network calls are permitted at runtime.">
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
  );
}
