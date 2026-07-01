import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function OnDemandDeps() {
  return (
      <Section id="os-on-demand-deps" title="On-Demand Dependency Resolution" subtitle="The agent installs what it needs, when it needs it — into a writable volume, not the rootfs.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>Coding agents can&apos;t know in advance what tools a task will require. A prompt like <em>&quot;run the Node tests&quot;</em> needs <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">mocha</code>; <em>&quot;lint the Python files&quot;</em> needs <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">ruff</code>. These dependencies are discovered <strong>during execution</strong>, not before it.</p>
            <p>The OpenShell sandbox runs with a <strong>read-only container rootfs</strong> and <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">/sandbox</code> is mounted as a <strong>writable volume</strong> (emptyDir, tmpfs, or PVC). The image ships with <strong>three tiers of package management</strong> — userspace, system, and standalone — all working as non-root with arbitrary UIDs (OpenShift, Podman):</p>
            <div className="space-y-3 mt-4">
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Python packages</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">uv pip install pytest ruff mypy</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Installs to <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/.venv</code> (already in PATH)</div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Node packages</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">npm install mocha eslint typescript</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Installs to <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/node_modules</code></div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">CLI tools</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">uv tool install ruff</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Installs to <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/.local/bin</code> (already in PATH)</div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">System packages</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">sandbox-install htop tree vim</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Wraps <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">sudo apt-get</code> — works with any UID (OpenShift, Podman, K8s, Docker)</div>
              </div>
              <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-3 bg-neutral-50 dark:bg-neutral-900/60">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">Standalone binaries</div>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded block">curl -fsSL https://example.com/tool | tar -xz -C /sandbox/.local/bin</code>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Any binary the agent downloads lands in the writable volume</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock lang="bash" code={`# Run the agent in a sandbox — it installs deps on demand
$ docker run --rm \\
    --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
    -e AI_API_KEY=\${AI_API_KEY} \\
    -e AGENT_PROMPT="Install cowsay and run: python -c \\
       'import cowsay; cowsay.cow(hello)'" \\
    openshell-ami`} />
            <CodeBlock lang="json" code={`// Actual JSONL output from the sandbox run:

// 1. Agent decides to install the package
{"type":"tool_use_start","toolName":"bash",
 "input":{"command":"uv pip install cowsay && \\
   python -c 'import cowsay; cowsay.cow(\"hello\")'"}
}

// 2. uv resolves and installs into /sandbox/.venv (195ms)
{"type":"tool_use_result","toolName":"bash",
 "output":"Resolved 1 package in 174ms\\n\\
   Installed 1 package in 7ms\\n + cowsay==6.1\\n\\
    _____\\n| hello |\\n  =====\\n\\
        ^__^\\n  (oo)\\\\_______\\n"
}

// No rootfs was mutated. The writable /sandbox volume
// absorbed the install. Container stays read-only.`} />
            <CodeBlock lang="yaml" code={`# Writable paths in the sandbox policy
permissions:
  filesystem:
    write:
      - /sandbox     # writable volume (deps go here)
      - /tmp         # tmpfs
    deny:
      - /etc         # read-only rootfs
      - /usr         # read-only rootfs
      - /var         # read-only rootfs`} />
            <div className="rounded-lg border border-blue-200 dark:border-blue-900/50 p-3 bg-blue-50 dark:bg-blue-900/20">
              <div className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Air-gapped on-demand deps</div>
              <div className="text-sm text-blue-700 dark:text-blue-400 mt-1">For disconnected environments, pre-populate a PVC with a Python wheel cache or npm registry mirror. Mount it at <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">/sandbox/.cache</code> and both uv and npm will resolve packages locally without network access.</div>
            </div>
          </div>
        </div>
      </Section>
  );
}
