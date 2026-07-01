import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";

export default function Environment() {
  return (
    <DocSection id="env" title="Environment Variables">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Variable</th>
              <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">AI_API_KEY</td><td className="py-2">Generic API key. Provider auto-detected from key prefix.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">GOOGLE_API_KEY</td><td className="py-2">Google Gemini API key. Forces Google provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">ANTHROPIC_API_KEY</td><td className="py-2">Anthropic Claude API key. Forces Anthropic provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">OPENAI_API_KEY</td><td className="py-2">OpenAI API key. Forces OpenAI provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">GROQ_API_KEY</td><td className="py-2">Groq API key. Forces Groq provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">MISTRAL_API_KEY</td><td className="py-2">Mistral API key. Forces Mistral provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">CEREBRAS_API_KEY</td><td className="py-2">Cerebras API key. Forces Cerebras provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">AI_BASE_URL</td><td className="py-2">Override the API base URL for any provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">AI_MODEL</td><td className="py-2">Override the model name.</td></tr>
          </tbody>
        </table>
      </div>
      <CodeBlock lang="bash" code={`# Use multiple env vars — provider-specific takes precedence over AI_API_KEY
export AI_API_KEY="sk-fallback..."
export GOOGLE_API_KEY="AIza..."   # This wins for Google provider
export AI_MODEL="gemini-2.5-flash"

ami`} />
    </DocSection>
  );
}
