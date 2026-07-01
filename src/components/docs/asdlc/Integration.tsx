import Mermaid from "@/components/Mermaid";
import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";
import { asdlcPipeline } from "@/data/charts";

export default function Integration() {
  return (
    <section id="asdlc-integration" className="scroll-mt-20 space-y-12">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Integration</h2>

      <DocSection id="cicd" title="CI/CD Integration">
        <p>AMI&apos;s detached mode transforms the agent from an interactive tool into a pipeline component. The agent runs headlessly, produces structured output, and returns semantic exit codes that CI/CD systems can act on.</p>
        <DocSubSection id="cicd-detached" title="Detached Execution">
          <p>Pass a prompt directly to AMI with the <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--prompt</code> flag for non-interactive execution. Combined with <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--output-format jsonl</code>, every tool call, result, and decision is emitted as structured JSON for downstream consumption.</p>
          <CodeBlock lang="bash" code={`ami --prompt "Fix the failing tests in src/auth/" \\
    --output-format jsonl \\
    --yolo  # auto-approve safe tool calls`} />
        </DocSubSection>
        <DocSubSection id="exit-codes" title="Exit Code Semantics">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Code</th>
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Meaning</th>
                  <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Pipeline Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">0</td><td className="py-2 pr-4">Task completed successfully</td><td className="py-2">Proceed to next stage / merge</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">1</td><td className="py-2 pr-4">Partial completion</td><td className="py-2">Flag for human review</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">2</td><td className="py-2 pr-4">Task failed</td><td className="py-2">Block pipeline, alert team</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">3</td><td className="py-2 pr-4">Internal error</td><td className="py-2">Retry or escalate</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">4</td><td className="py-2 pr-4">Timeout</td><td className="py-2">Increase budget or decompose task</td></tr>
              </tbody>
            </table>
          </div>
        </DocSubSection>
        <DocSubSection id="github-actions" title="GitHub Actions Example">
          <CodeBlock lang="yaml" code={`name: AMI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/superinference/openshell-ami:latest
    steps:
      - uses: actions/checkout@v4
      - name: Run AMI review
        run: |
          ami --prompt "Review the changes in this PR for bugs and security issues. \\
               Run the test suite and verify all tests pass." \\
              --output-format jsonl \\
              --yolo
        env:
          GOOGLE_API_KEY: \${{ secrets.GOOGLE_API_KEY }}`} />
        </DocSubSection>
      </DocSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <DocSection id="openshell-scale" title="OpenShell at Scale">
          <p>OpenShell containers provide isolated, reproducible execution environments for agentic SDLC. Each agent runs in its own sandbox with controlled tool access and audit logging.</p>
          <DocSubSection id="parallel-agents" title="Parallel Agent Execution">
            <p>Run multiple agents in parallel, each working on independent components. OpenShell handles container lifecycle, resource limits, and output collection. Kubernetes CRDs enable declarative agent orchestration:</p>
            <CodeBlock lang="yaml" code={`apiVersion: kagenti.dev/v1alpha1
kind: AgentTask
metadata:
  name: fix-auth-module
spec:
  image: ghcr.io/superinference/openshell-ami
  prompt: "Fix authentication timeout bug"
  provider: google
  timeout: 600
  resources:
    limits:
      memory: 2Gi`} />
          </DocSubSection>
          <DocSubSection id="air-gapped" title="Air-Gapped Deployment">
            <p>For environments without internet access, OpenShell supports self-hosted models via Ollama or vLLM. The container image includes all necessary tooling — no external dependencies at runtime. Audit logging captures every tool call for compliance.</p>
          </DocSubSection>
        </DocSection>
        <div>
          <Mermaid chart={asdlcPipeline} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
            "Git Push / PR": "A git push or pull request triggers the CI pipeline.",
            "CI Pipeline": "GitHub Actions, GitLab CI, or any pipeline runner orchestrates the agent stages.",
            "Pull OpenShell": "The pipeline pulls a pre-built OpenShell container image with AMI installed.",
            "Plan Agent": "Analyzes the diff, scopes the work, decomposes into sub-tasks.",
            "Code Agents": "Multiple agents work in parallel worktrees on independent components.",
            "Review Agent": "Runs code-review and security-review skills on the changes.",
            "Test Agent": "Executes the test suite, verifies all tests pass, checks for regressions.",
            "FRITO Router": "All agents route through FRITO for cost-optimized multi-provider access.",
            "Structured Output": "JSONL stream with semantic exit codes for pipeline integration.",
            "Merge / Deploy": "On exit code 0, the pipeline proceeds to merge or deploy.",
          }} />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 3.</strong> End-to-end CI/CD pipeline with AMI agents at each stage, using FRITO for cost-optimized provider routing and structured output for pipeline decisions.</div>
        </div>
      </div>

      <DocSection id="frito-cost" title="FRITO Cost Optimization">
        <p>Agentic SDLC at scale generates millions of tokens per day. Without cost optimization, this is economically unviable. FRITO (Free-tier Retrieval &amp; Inference Token Ops) makes it sustainable.</p>
        <DocSubSection id="multi-provider" title="Multi-Provider Routing">
          <p>FRITO manages 13 LLM providers across four tiers: permanent free (Google AI Studio, Groq, OpenRouter, GitHub Models, Cerebras, Hugging Face, Mistral), credits-based (DeepSeek, xAI, Together), self-hosted (Ollama), and paid (OpenAI, Anthropic). When one provider rate-limits or errors, FRITO seamlessly rotates to another with multi-key support per provider.</p>
        </DocSubSection>
        <DocSubSection id="quality-tiers" title="Quality-Aware Routing">
          <p>Not all SDLC phases require the same model quality. FRITO supports three quality tiers:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
            <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Min</h4>
              <p className="text-sm">All available models. Best for exploration, grep, file reads — high volume, low stakes.</p>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Balanced</h4>
              <p className="text-sm">Standard and premium models. Good for code generation and review — moderate quality requirements.</p>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Max</h4>
              <p className="text-sm">Premium models only. Use for security review, architectural decisions — highest quality, highest cost.</p>
            </div>
          </div>
        </DocSubSection>
        <DocSubSection id="savings-tracking" title="Savings at Scale">
          <p>FRITO tracks reference cost (what you would have paid with a single premium provider) vs. actual cost (what you paid with multi-provider routing). Teams running ASDLC pipelines report 60-90% cost reductions while maintaining equivalent output quality for most SDLC tasks.</p>
        </DocSubSection>
      </DocSection>

      <DocSection id="multi-agent" title="Multi-Agent Orchestration">
        <p>Complex SDLC tasks benefit from multiple specialized agents working in coordination. AMI&apos;s workflow system enables deterministic multi-agent pipelines.</p>
        <DocSubSection id="workflow-orchestration" title="Workflow Orchestration">
          <p>The workflow tool scripts multi-agent execution with pipeline and parallel primitives. Agents can fan out for independent work, barrier-sync for deduplication, and pipeline for staged processing. Each agent runs with its own context and tool access.</p>
          <CodeBlock lang="javascript" code={`// Example: parallel code review across dimensions
const results = await pipeline(
  ['bugs', 'security', 'performance'],
  dim => agent(\`Review for \${dim} issues\`, {
    label: \`review:\${dim}\`,
    schema: FINDINGS_SCHEMA
  }),
  review => parallel(
    review.findings.map(f => () =>
      agent(\`Verify: \${f.title}\`, {
        label: \`verify:\${f.file}\`,
        schema: VERDICT_SCHEMA
      })
    )
  )
);`} />
        </DocSubSection>
        <DocSubSection id="specialized-agents" title="Specialized Agent Roles">
          <p>Different SDLC phases benefit from different agent configurations. A planning agent might use max-quality models with extensive context; a file-search agent might use min-quality models for speed; a review agent might use multiple independent perspectives for thoroughness. FRITO&apos;s quality tiers and the workflow system&apos;s model overrides enable this specialization.</p>
        </DocSubSection>
      </DocSection>

    </section>
  );
}
