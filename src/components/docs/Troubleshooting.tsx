import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function Troubleshooting() {
  return (
    <DocSection id="troubleshooting" title="Troubleshooting">
      <DocSubSection id="ts-no-key" title="&quot;API key required&quot;">
        <p>AMI needs at least one API key. Set a provider-specific env var or use <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--api-key</code>:</p>
        <CodeBlock lang="bash" code={`export GOOGLE_API_KEY="AIza..."
# or
ami --api-key "your-key-here"`} />
      </DocSubSection>

      <DocSubSection id="ts-rate-limit" title="Rate Limits (429)">
        <p>Free-tier providers have rate limits. Enable FRITO to auto-rotate across providers:</p>
        <CodeBlock lang="bash" code={`# Inside AMI:
/frito setup    # Configure multiple providers
/frito on       # Enable automatic rotation`} />
      </DocSubSection>

      <DocSubSection id="ts-timeout" title="Timeouts / Hanging">
        <p>Some providers may hang intermittently through the AI SDK. If a provider consistently hangs:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/frito rotate</code> to manually switch to the next provider.</li>
          <li>Use <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/frito remove &lt;provider&gt;</code> to remove a problematic provider from the pool.</li>
          <li>In non-interactive mode, wrap with <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">timeout</code>:</li>
        </ul>
        <CodeBlock lang="bash" code={`timeout 30 ami --prompt "hello" || echo "timed out"`} />
      </DocSubSection>

      <DocSubSection id="ts-wrong-provider" title="Wrong Provider Detected">
        <p>If AMI selects the wrong provider, force it explicitly:</p>
        <CodeBlock lang="bash" code={`# Force provider via specific env var
GROQ_API_KEY="gsk_..." ami --model "llama-3.3-70b-versatile"

# Or use --base-url to force the endpoint
ami --api-key "key" --base-url "https://api.groq.com/openai/v1" --model "llama-3.3-70b-versatile"`} />
      </DocSubSection>

      <DocSubSection id="ts-frito-perms" title="FRITO Config Permissions">
        <p>If FRITO reports a permissions error:</p>
        <CodeBlock lang="bash" code={`chmod 600 ~/.ami/frito.json
ls -la ~/.ami/frito.json
# -rw------- 1 user user ... frito.json`} />
      </DocSubSection>
    </DocSection>
  );
}
