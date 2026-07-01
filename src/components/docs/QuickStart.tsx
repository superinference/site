import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function QuickStart() {
  return (
    <DocSection id="quickstart" title="Quick Start">
      <p>AMI auto-detects providers from API key environment variables or CLI flags. The fastest way to start:</p>

      <DocSubSection id="qs-google" title="Google Gemini (free tier)">
        <ol className="list-decimal list-inside space-y-2">
          <li>Get a free API key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="underline hover:no-underline text-blue-500">aistudio.google.com/apikey</a></li>
          <li>Export it and run:</li>
        </ol>
        <CodeBlock lang="bash" code={`export GOOGLE_API_KEY="AIza..."
ami`} />
        <p>AMI detects the <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">GOOGLE_API_KEY</code> prefix, auto-selects the Google provider, and opens an interactive REPL.</p>
      </DocSubSection>

      <DocSubSection id="qs-groq" title="Groq (free tier)">
        <CodeBlock lang="bash" code={`export GROQ_API_KEY="gsk_..."
ami`} />
      </DocSubSection>

      <DocSubSection id="qs-any" title="Any OpenAI-compatible provider">
        <CodeBlock lang="bash" code={`ami --api-key "sk-..." --base-url "https://api.provider.com/v1" --model "model-name"`} />
      </DocSubSection>

      <DocSubSection id="qs-noninteractive" title="Non-interactive (scripting)">
        <CodeBlock lang="bash" code={`GOOGLE_API_KEY="AIza..." ami --prompt "What is 2+2?"
# Outputs structured JSON:
# {"ok":true,"model":"gemini-2.5-flash","provider":"google","baseUrl":"...","prompt":"What is 2+2?","response":"4","error":null,"elapsedMs":487}`} />
      </DocSubSection>
    </DocSection>
  );
}
