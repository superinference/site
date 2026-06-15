"use client";

import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";
import DocSubSection from "@/components/DocSubSection";
import PageLayout from "@/components/PageLayout";
import { docsToc } from "@/data/nav";

export default function DocsPage() {
  return (
    <PageLayout title="Documentation" subtitle="AMI CLI, FRITO cost-optimization, providers, and configuration reference." toc={docsToc}>

          {/* ── Installation ── */}
          <DocSection id="install" title="Installation">
            <p>AMI is distributed as a single self-contained binary for Linux x64. Install with one command:</p>
            <CodeBlock lang="bash" code="curl -fsSL https://www.superinference.org/install.sh | bash" />
            <p>This downloads the latest release from GitHub, places the binary at <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">~/.local/bin/ami</code>, and ensures it is in your <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">PATH</code>.</p>
            <p>Verify the installation:</p>
            <CodeBlock lang="bash" code={`ami --version
# superinference v0.6.2`} />
            <p>To update, re-run the install command. The installer overwrites the existing binary.</p>
          </DocSection>

          {/* ── Quick Start ── */}
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

          {/* ── CLI Reference ── */}
          <DocSection id="cli" title="CLI Reference">
            <CodeBlock lang="text" code={`Si:AMI CLI v0.6.2

Usage: ami [options]

Options:
  --base-url <url>          API base URL (env: AI_BASE_URL)
  --api-key <key>           API key (env: AI_API_KEY)
  --model <model>           Model name (env: AI_MODEL, default: gpt-4o)
  --permission-mode <mode>  Permission mode: ask, auto-allow, deny-all (default: ask)
  --prompt <text>           Non-interactive: send prompt, print JSON, exit
  --resume [session-id]     Resume a previous session (latest if no ID)
  --help                    Show help message
  --version                 Show version`} />

            <DocSubSection id="cli-flags" title="Flags">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                      <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Flag</th>
                      <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Env Var</th>
                      <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--api-key</td><td className="py-2 pr-4 font-mono text-xs">AI_API_KEY</td><td className="py-2">API key for the provider. Required unless a provider-specific env var is set.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--base-url</td><td className="py-2 pr-4 font-mono text-xs">AI_BASE_URL</td><td className="py-2">Override the API base URL. Auto-detected from key prefix when possible.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--model</td><td className="py-2 pr-4 font-mono text-xs">AI_MODEL</td><td className="py-2">Model name. Defaults to gpt-4o. Auto-detected from provider.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--permission-mode</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Tool permission level: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">ask</code> (default), <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">auto-allow</code>, or <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">deny-all</code>.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--prompt</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Non-interactive mode. Sends prompt, prints structured JSON, exits.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--resume</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Resume a previous conversation session. Optionally takes a session ID.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--version</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Print version and exit.</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">--help</td><td className="py-2 pr-4 font-mono text-xs"></td><td className="py-2">Print help and exit.</td></tr>
                  </tbody>
                </table>
              </div>
            </DocSubSection>

            <DocSubSection id="cli-precedence" title="Precedence Rules">
              <p>When both a CLI flag and an environment variable provide the same setting, the CLI flag always wins:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--api-key</code> overrides <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_API_KEY</code> and provider-specific keys</li>
                <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--model</code> overrides <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_MODEL</code></li>
                <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--base-url</code> overrides <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_BASE_URL</code></li>
                <li>Provider-specific env vars (<code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">GOOGLE_API_KEY</code>, etc.) override <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">AI_API_KEY</code></li>
              </ol>
            </DocSubSection>
          </DocSection>

          {/* ── Providers ── */}
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

          {/* ── FRITO ── */}
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

          {/* ── frito.json ── */}
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

          {/* ── FRITO Slash Commands ── */}
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

          {/* ── Free Providers ── */}
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

          {/* ── Environment Variables ── */}
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

          {/* ── Non-Interactive Mode ── */}
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

          {/* ── Permissions ── */}
          <DocSection id="permissions" title="Permissions">
            <p>AMI has 15 built-in tools (file ops, search, execution, web, etc.). The <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">--permission-mode</code> flag controls how tool invocations are authorized.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th className="text-left py-2 pr-4 font-semibold text-neutral-900 dark:text-white">Mode</th>
                    <th className="text-left py-2 font-semibold text-neutral-900 dark:text-white">Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                  <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">ask</td><td className="py-2">Default. Prompts for approval before each tool invocation. Safe reads are auto-approved.</td></tr>
                  <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">auto-allow</td><td className="py-2">All tool invocations are auto-approved. Use in trusted environments.</td></tr>
                  <tr><td className="py-2 pr-4 font-mono text-xs text-blue-500">deny-all</td><td className="py-2">All tool invocations are denied. Chat-only mode.</td></tr>
                </tbody>
              </table>
            </div>

            <CodeBlock lang="bash" code={`# Interactive with auto-approval (trusted project)
ami --permission-mode auto-allow

# Chat-only, no file access
ami --permission-mode deny-all`} />
          </DocSection>

          {/* ── Sessions ── */}
          <DocSection id="sessions" title="Sessions">
            <p>AMI automatically saves conversation sessions. Resume a previous session with:</p>
            <CodeBlock lang="bash" code={`# Resume the most recent session
ami --resume

# Resume a specific session by ID
ami --resume abc123`} />
            <p>Sessions store the full conversation history including tool invocations and their results, allowing you to continue exactly where you left off.</p>
          </DocSection>

          {/* ── Security ── */}
          <DocSection id="security" title="Security">
            <DocSubSection id="security-keys" title="API Key Security">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>FRITO config is stored at <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">~/.ami/frito.json</code> with <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">0600</code> permissions (owner-only).</li>
                <li>API keys are never logged, never printed in output, and never stored in VS Code settings.</li>
                <li>The <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">--prompt</code> JSON output never contains API keys.</li>
                <li><code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">~/.ami/</code> should be excluded from git (add to <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">.gitignore</code>).</li>
              </ul>
            </DocSubSection>

            <DocSubSection id="security-binary" title="Binary Security">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>AMI is distributed as a Node.js Single Executable Application (SEA) — a self-contained ELF binary.</li>
                <li>No <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">.ts</code> source files are included in the binary or npm tarball.</li>
                <li>The binary is signed and distributed via GitHub Releases.</li>
              </ul>
            </DocSubSection>

            <DocSubSection id="security-ci" title="CI Security">
              <p>For CI/CD pipelines, store API keys as secrets and write them to a temporary file:</p>
              <CodeBlock lang="yaml" code={`# GitHub Actions example
- name: Setup FRITO config
  run: |
    mkdir -p ~/.ami
    echo '$\{{ secrets.AMI_FRITO }}' > ~/.ami/frito.json
    chmod 600 ~/.ami/frito.json`} />
            </DocSubSection>
          </DocSection>

          {/* ── VS Code ── */}
          <DocSection id="vscode" title="VS Code Extension">
            <p>AMI is available as a VS Code extension from the <a href="https://marketplace.visualstudio.com/items?itemName=superinference.ami-vscode" target="_blank" rel="noreferrer" className="underline hover:no-underline text-blue-500">VS Code Marketplace</a>.</p>

            <DocSubSection id="vscode-features" title="Features">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Chat panel with streaming responses and diff previews.</li>
                <li>Access to open files, active selection, and language servers for context.</li>
                <li>All 15 built-in tools (file ops, search, execution, web).</li>
                <li>FRITO integration — all <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/frito</code> slash commands work identically.</li>
                <li>Session management with resume capability.</li>
                <li>Diff viewer for reviewing proposed changes.</li>
              </ul>
            </DocSubSection>

            <DocSubSection id="vscode-config" title="Configuration">
              <p>The VS Code extension reads API keys from environment variables or the FRITO config file. Keys are never stored in VS Code settings.</p>
              <CodeBlock lang="bash" code={`# Set your API key in your shell profile (~/.bashrc, ~/.zshrc)
export GOOGLE_API_KEY="AIza..."

# Or configure FRITO for multi-provider routing
# Keys are stored in ~/.ami/frito.json, not VS Code settings`} />
            </DocSubSection>
          </DocSection>

          {/* ── Troubleshooting ── */}
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

    </PageLayout>
  );
}
