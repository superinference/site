import Section from "@/components/Section";

export default function MultiProvider() {
  return (
      <Section id="os-multi-provider" title="Multi-Provider LLM Routing" subtitle="One image, any LLM backend. FRITO routes across 13 providers with automatic fallback.">
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
              </ul>
            </div>
          </div>
        </div>
      </Section>
  );
}
