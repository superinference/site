import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function FritoProviders() {
  return (
    <DocSection id="frito-providers" title="Free-Tier Providers">
      <p>These providers offer permanent free tiers suitable for FRITO routing. Sign up, get an API key, and add it to your <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">frito.json</code>.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Provider</th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">ID</th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Tier</th>
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Models</th>
              <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Sign Up</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            <tr>
              <td className="py-2 pr-4 font-semibold">Google AI Studio</td>
              <td className="py-2 pr-4 font-mono text-xs">google</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">gemini-2.5-flash, gemini-2.5-pro</td>
              <td className="py-2"><a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">aistudio.google.com</a></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Groq</td>
              <td className="py-2 pr-4 font-mono text-xs">groq</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">llama-3.3-70b-versatile, llama-3.1-8b-instant</td>
              <td className="py-2"><a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">console.groq.com</a></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">OpenRouter</td>
              <td className="py-2 pr-4 font-mono text-xs">openrouter</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">auto (routes to free models)</td>
              <td className="py-2"><a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">openrouter.ai</a></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Mistral</td>
              <td className="py-2 pr-4 font-mono text-xs">mistral</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">mistral-small-latest, codestral-latest</td>
              <td className="py-2"><a href="https://console.mistral.ai/api-keys" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">console.mistral.ai</a></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Cerebras</td>
              <td className="py-2 pr-4 font-mono text-xs">cerebras</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">zai-glm-4.7</td>
              <td className="py-2"><a href="https://cloud.cerebras.ai" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">cloud.cerebras.ai</a></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">GitHub Models</td>
              <td className="py-2 pr-4 font-mono text-xs">github</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">deepseek-r1</td>
              <td className="py-2"><a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">github.com/settings</a></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Hugging Face</td>
              <td className="py-2 pr-4 font-mono text-xs">huggingface</td>
              <td className="py-2 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">free</span></td>
              <td className="py-2 pr-4 text-xs">auto</td>
              <td className="py-2"><a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">huggingface.co</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocSubSection id="frito-credit-providers" title="Credit-Based Providers">
        <p>These providers offer free credits that eventually expire. They work with FRITO but are not permanent free tiers.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Provider</th>
                <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">ID</th>
                <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Sign Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
              <tr><td className="py-2 pr-4">DeepSeek</td><td className="py-2 pr-4 font-mono text-xs">deepseek</td><td className="py-2"><a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">platform.deepseek.com</a></td></tr>
              <tr><td className="py-2 pr-4">xAI (Grok)</td><td className="py-2 pr-4 font-mono text-xs">xai</td><td className="py-2"><a href="https://console.x.ai" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">console.x.ai</a></td></tr>
              <tr><td className="py-2 pr-4">Together AI</td><td className="py-2 pr-4 font-mono text-xs">together</td><td className="py-2"><a href="https://api.together.xyz/settings/api-keys" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">together.xyz</a></td></tr>
            </tbody>
          </table>
        </div>
      </DocSubSection>
    </DocSection>
  );
}
