import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function UseCases() {
  return (
      <Section id="os-use-cases" title="Use Cases">
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
  );
}
