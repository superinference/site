import Section from "@/components/Section";

export default function Advantages() {
  return (
      <Section id="os-advantages" title="Why AMI for OpenShell" subtitle="The only agent in the ecosystem that combines all five properties.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "On-Demand Deps", desc: "Read-only rootfs with writable /sandbox. Agent installs Python packages (uv), Node packages (npm), or system packages (sandbox-install) at runtime — works across OpenShift, K8s, Docker, and Podman." },
            { title: "Zero Cold-Start", desc: "Binary baked in at build time. Apache 2.0 means no licensing workaround — instant boot, every time." },
            { title: "Multi-Provider", desc: "FRITO routes across 13 LLM providers. Works with Anthropic, OpenAI, Google, Ollama, vLLM, or any OpenAI-compatible endpoint." },
            { title: "True Detached Mode", desc: "Built for autonomous execution. Structured JSONL output, semantic exit codes, audit logging, session resume." },
            { title: "45+ Built-in Tools", desc: "File operations, shell execution, code search, web access, MCP integration, workflow orchestration, task management." },
            { title: "Air-Gap Ready", desc: "Mirror the image, pre-populate a wheel/registry cache on a PVC, point at a local model endpoint, and run. No vendor CDN dependency." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{item.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
  );
}
