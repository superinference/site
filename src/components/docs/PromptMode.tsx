import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function PromptMode() {
  return (
    <DocSection id="prompt-mode" title="Non-Interactive Mode (--prompt)">
      <p>The <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--prompt</code> flag runs AMI in non-interactive mode: send a prompt, get structured JSON output, exit. Ideal for scripting, CI pipelines, and automation.</p>

      <DocSubSection id="prompt-output" title="Output Schema">
        <CodeBlock lang="json" code={`{
  "ok": true,
  "model": "gemini-2.5-flash",
  "provider": "google",
  "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
  "prompt": "What is 2+2?",
  "response": "4",
  "error": null,
  "elapsedMs": 487
}`} />
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
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">ok</td><td className="py-2 pr-4 text-xs">boolean</td><td className="py-2">Whether inference succeeded.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">model</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">Model name used.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">provider</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">Provider ID used.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">baseUrl</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">API base URL used.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">prompt</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">The input prompt (echoed back).</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">response</td><td className="py-2 pr-4 text-xs">string</td><td className="py-2">The model&apos;s response text.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">error</td><td className="py-2 pr-4 text-xs">string | null</td><td className="py-2">Error message if ok=false, null otherwise.</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">elapsedMs</td><td className="py-2 pr-4 text-xs">number</td><td className="py-2">Response time in milliseconds.</td></tr>
            </tbody>
          </table>
        </div>
      </DocSubSection>

      <DocSubSection id="prompt-examples" title="Scripting Examples">
        <CodeBlock lang="bash" code={`# Simple query
GOOGLE_API_KEY="AIza..." ami --prompt "Capital of France?"

# Parse with jq
response=$(GOOGLE_API_KEY="AIza..." ami --prompt "What is 2+2?" | jq -r '.response')
echo "$response"  # 4

# Check success
result=$(GROQ_API_KEY="gsk_..." ami --model llama-3.3-70b-versatile --prompt "Say hello")
ok=$(echo "$result" | jq -r '.ok')
if [ "$ok" = "true" ]; then
  echo "Success: $(echo "$result" | jq -r '.response')"
else
  echo "Error: $(echo "$result" | jq -r '.error')"
fi

# Batch processing
for question in "What is 2+2?" "Capital of France?" "Largest planet?"; do
  MISTRAL_API_KEY="..." ami --prompt "$question" | jq '{q: .prompt, a: .response}'
done

# CI health check
output=$(timeout 30 CEREBRAS_API_KEY="csk_..." ami --prompt "Say ok")
echo "$output" | jq -e '.ok == true' >/dev/null && echo "PASS" || echo "FAIL"`} />
      </DocSubSection>
    </DocSection>
  );
}
