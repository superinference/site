import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function Providers() {
  return (
    <DocSection id="providers" title="Providers">
      <p>AMI supports multiple LLM providers through a unified interface. The provider is auto-detected from the API key format or environment variable name.</p>

      <DocSubSection id="provider-detection" title="Auto-Detection">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Env Variable</th>
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Key Prefix</th>
                <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Provider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
              <tr><td className="py-2 pr-4 font-mono text-xs">GOOGLE_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">AIza...</td><td className="py-2">Google (Gemini)</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">ANTHROPIC_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">sk-ant-...</td><td className="py-2">Anthropic (Claude)</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">OPENAI_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">sk-...</td><td className="py-2">OpenAI</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">GROQ_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">gsk_...</td><td className="py-2">Groq</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">MISTRAL_API_KEY</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Mistral</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">CEREBRAS_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">csk-...</td><td className="py-2">Cerebras</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">AI_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">sk-or-...</td><td className="py-2">OpenRouter (auto-detected from prefix)</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">AI_API_KEY</td><td className="py-2 pr-4 font-mono text-xs">(other)</td><td className="py-2">OpenAI-compatible (default)</td></tr>
            </tbody>
          </table>
        </div>
      </DocSubSection>

      <DocSubSection id="provider-custom" title="Custom / Self-Hosted">
        <p>Any OpenAI-compatible API can be used with <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--base-url</code>:</p>
        <CodeBlock lang="bash" code={`# Ollama (local)
ami --base-url http://localhost:11434/v1 --model llama3 --api-key ollama

# LM Studio
ami --base-url http://localhost:1234/v1 --model local-model --api-key lm-studio

# vLLM
ami --base-url http://gpu-server:8000/v1 --model meta-llama/Llama-3-70B --api-key vllm`} />
      </DocSubSection>
    </DocSection>
  );
}
