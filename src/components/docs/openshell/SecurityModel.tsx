import Section from "@/components/Section";

export default function SecurityModel() {
  return (
      <Section id="os-security" title="Security Model" subtitle="Two-layer security: AMI's internal permission system operates within the OpenShell sandbox boundary.">
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-5 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Outer Layer: OpenShell Sandbox Policy</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Container isolation</strong> — non-root user, read-only rootfs, restricted mounts, network policy</li>
                <li><strong>Filesystem confinement</strong> — rootfs is read-only; writes limited to writable <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox</code> volume and <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/tmp</code> tmpfs</li>
                <li><strong>Resource limits</strong> — CPU, memory, disk quotas enforced by cgroup</li>
                <li><strong>Network controls</strong> — outbound filtered, inbound blocked by default</li>
                <li><strong>SPIFFE/mTLS</strong> — sidecar-injected identity certificates</li>
              </ul>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-white/10 p-5 bg-neutral-50 dark:bg-neutral-900/60">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Inner Layer: AMI Permission System</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>25 bash security validators</strong> — command injection, shell quoting, redirections, obfuscation detection</li>
                <li><strong>Recursive descent AST parser</strong> — full bash command structure analysis</li>
                <li><strong>4-tier command classification</strong> — safe, unsafe, destructive, hardline-blocked</li>
                <li><strong>Environment scrubbing</strong> — 30+ patterns strip API keys and credentials from output</li>
                <li><strong>Self-kill protection</strong> — prevents the agent from terminating its own process</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Even when running with <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">--yolo</code> (full autonomy), AMI&apos;s hardline security rules remain active — fork bombs, <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs">rm -rf /</code>, and 19 other destructive patterns are unconditionally blocked regardless of permission mode. The OpenShell sandbox provides the infrastructure-level boundary on top of this.</p>
        </div>
      </Section>
  );
}
