import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";

export default function FritoCommands() {
  return (
    <DocSection id="frito-commands" title="FRITO Slash Commands">
      <p>All FRITO commands are available inside the AMI REPL (both CLI and VS Code) via the <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">/frito</code> prefix.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Command</th>
              <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito</td><td className="py-2">Show help with all available commands and current status.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito on</td><td className="py-2">Enable FRITO. Selects the best free provider and updates the footer.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito off</td><td className="py-2">Disable FRITO. Reverts to the configured provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito status</td><td className="py-2">Show current state: enabled/disabled, active provider, configured providers count.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito models</td><td className="py-2">List all available models across configured providers with quality and cost info.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito quality &lt;level&gt;</td><td className="py-2">Set quality preference: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">speed</code>, <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">balanced</code>, or <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">quality</code>.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito rotate</td><td className="py-2">Manually rotate to the next available provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito setup</td><td className="py-2">Launch the interactive setup wizard to configure provider keys.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito add &lt;provider&gt; &lt;key&gt;</td><td className="py-2">Add or update a provider API key.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito remove &lt;provider&gt;</td><td className="py-2">Remove a provider from the configuration.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito savings</td><td className="py-2">Show estimated cost savings vs. the reference provider.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito validate</td><td className="py-2">Test all configured provider keys and report which are working.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito reset</td><td className="py-2">Reset FRITO configuration to defaults.</td></tr>
            <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500 whitespace-nowrap">/frito example</td><td className="py-2">Show an example frito.json configuration.</td></tr>
          </tbody>
        </table>
      </div>

      <DocSubSection id="frito-commands-examples" title="Usage Examples">
        <CodeBlock lang="text" code={`# Enable FRITO and check what provider it selected
/frito on
# ✓ FRITO enabled — routes prompts through free-tier LLM providers,
#   auto-rotating on rate limits for zero-cost inference.

# Check status
/frito status
# FRITO: ON  Quality: balanced
# ────────────────────────────────────────
# ✓ Google AI Studio      free       1 key(s)
# ✓ Groq                  free       1 key(s)
# ✓ OpenRouter             free       1 key(s)
# ✓ Mistral               free       1 key(s)
# ✓ Cerebras              free       1 key(s)

# Switch to quality-first routing
/frito quality quality

# Add a new provider key
/frito add groq gsk_newkeyhere...

# Check savings so far
/frito savings

# Validate all keys are working
/frito validate`} />
      </DocSubSection>
    </DocSection>
  );
}
