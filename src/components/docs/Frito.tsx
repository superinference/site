import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function Frito() {
  return (
    <>
      <DocSection id="frito" title="FRITO: Free-Tier Retrieval & Inference Token Ops">
        <p>FRITO is a cost-optimization layer that routes prompts through free-tier LLM providers, automatically rotating on rate limits for zero-cost inference. Instead of paying for every API call, FRITO cycles through providers with generous free tiers.</p>

        <DocSubSection id="frito-how" title="How It Works">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Pool creation</strong> &mdash; FRITO reads <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.ami/frito.json</code> and builds a pool of available free-tier providers.</li>
            <li><strong>Provider selection</strong> &mdash; On each prompt, FRITO selects the best available provider based on quality preference and rate-limit state.</li>
            <li><strong>Automatic rotation</strong> &mdash; If a provider returns a rate limit (HTTP 429), FRITO instantly rotates to the next available provider with no retries on the failed one.</li>
            <li><strong>Footer update</strong> &mdash; The CLI footer shows the current active provider/model, updating live on rotation.</li>
            <li><strong>Savings tracking</strong> &mdash; FRITO tracks estimated cost savings vs. using a paid provider.</li>
          </ol>
        </DocSubSection>

        <DocSubSection id="frito-setup" title="Setup">
          <p>The fastest way to configure FRITO is the interactive setup wizard:</p>
          <CodeBlock lang="text" code={`# Inside an AMI session:
/frito setup`} />
          <p>The wizard walks you through adding API keys for each free provider. Alternatively, create the config file manually:</p>
        </DocSubSection>
      </DocSection>

      <DocSection id="frito-config" title="frito.json Configuration">
        <p>FRITO configuration lives at <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.ami/frito.json</code> with file permissions <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">0600</code> (owner-only read/write). The file is never committed to git and never logged.</p>

        <DocSubSection id="frito-schema" title="Schema">
          <CodeBlock lang="json" code={`{
  "enabled": true,
  "quality": "balanced",
  "referenceProvider": "openai",
  "referenceModel": "gpt-4o",
  "providers": {
    "<provider-id>": {
      "keys": ["<api-key-1>", "<api-key-2>"],
      "model": "<model-id>",
      "tier": "permanent"
    }
  }
}`} />
        </DocSubSection>

        <DocSubSection id="frito-fields" title="Top-Level Fields">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Field</th>
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Type</th>
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Default</th>
                  <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">enabled</td><td className="py-2 pr-4 text-xs">boolean</td><td className="py-2 pr-4 text-xs">true</td><td className="py-2">Whether FRITO is active on startup. Toggle at runtime with <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/frito on</code> or <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/frito off</code>.</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">quality</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2 pr-4 text-xs">&quot;balanced&quot;</td><td className="py-2">Routing strategy. Options: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">speed</code> (fastest provider), <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">balanced</code> (quality/speed trade-off), <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">quality</code> (best model available).</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">referenceProvider</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2 pr-4 text-xs">&quot;openai&quot;</td><td className="py-2">Baseline provider for savings comparison.</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">referenceModel</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2 pr-4 text-xs">&quot;gpt-4o&quot;</td><td className="py-2">Baseline model for savings comparison.</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">providers</td><td className="py-2 pr-4 text-xs">object</td><td className="py-2 pr-4 text-xs">{"{}"}</td><td className="py-2">Map of provider configurations keyed by provider ID.</td></tr>
              </tbody>
            </table>
          </div>
        </DocSubSection>

        <DocSubSection id="frito-provider-fields" title="Provider Entry Fields">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Field</th>
                  <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Type</th>
                  <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">keys</td><td className="py-2 pr-4 text-xs">string[]</td><td className="py-2">Array of API keys. Multiple keys enable key rotation within a single provider for higher throughput.</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">model</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">Default model ID for this provider. Must match a valid model name in the provider&apos;s API.</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">tier</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">Pricing tier: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">permanent</code> (always free), <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">credits</code> (free credits), <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">self-hosted</code>, <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">paid</code>.</td></tr>
              </tbody>
            </table>
          </div>
        </DocSubSection>

        <DocSubSection id="frito-example" title="Full Example">
          <CodeBlock lang="json" code={`{
  "enabled": true,
  "quality": "balanced",
  "referenceProvider": "openai",
  "referenceModel": "gpt-4o",
  "providers": {
    "google": {
      "keys": ["AIzaSy..."],
      "model": "gemini-2.5-flash",
      "tier": "permanent"
    },
    "groq": {
      "keys": ["gsk_..."],
      "model": "llama-3.3-70b-versatile",
      "tier": "permanent"
    },
    "openrouter": {
      "keys": ["sk-or-..."],
      "model": "auto",
      "tier": "permanent"
    },
    "mistral": {
      "keys": ["..."],
      "model": "mistral-small-latest",
      "tier": "permanent"
    },
    "cerebras": {
      "keys": ["csk-..."],
      "model": "zai-glm-4.7",
      "tier": "permanent"
    }
  }
}`} />
        </DocSubSection>
      </DocSection>
    </>
  );
}
