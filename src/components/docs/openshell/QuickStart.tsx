import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function QuickStart() {
  return (
      <Section id="os-quickstart" title="Quick Start" subtitle="Three ways to run AMI in a container. No cluster required for the first two.">
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
  );
}
