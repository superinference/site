"use client";

import Section from "@/components/Section";
import report from "@/data/challenges-report.json";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type ModelResult = {
  testsPass: number;
  passed: boolean;
  turns: number;
  toolCalls: number;
  elapsedMs: number;
};

type Challenge = {
  id: string;
  slug: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  testsTotal: number;
  results: Record<string, ModelResult>;
};

type ModelDef = {
  slug: string;
  runner: string;
  label: string;
  color: string;
};

type Summary = {
  passed: number;
  total: number;
  passRate: number;
  weightedScore: number;
  avgTurns: number;
  avgTime: number;
};

const models = report.models as ModelDef[];
const challenges = report.challenges as Challenge[];
const summary = report.summary as Record<string, Summary>;

const shortLabel: Record<string, string> = {
  frito: "FRITO",
  "gemini-2.5-flash": "Gemini Flash",
  "gemini-2.5-pro": "Gemini Pro",
  "claude-opus-4": "Opus 4",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatTime(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m${rem}s` : `${m}m`;
}

const difficultyStyle: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-500",
  Medium: "bg-amber-500/10 text-amber-500",
  Hard: "bg-red-500/10 text-red-500",
};

/* ------------------------------------------------------------------ */
/*  Circular gauge SVG                                                */
/* ------------------------------------------------------------------ */

function CircularGauge({ value, size = 160, stroke = 12 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  const gap = circ - filled;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" className="text-neutral-200 dark:text-white/5" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#gaugeGrad)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${filled} ${gap}`} strokeDashoffset={circ / 4} style={{ transition: "stroke-dasharray 0.8s ease" }} />
      <defs>
        <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="fill-neutral-900 dark:fill-white text-3xl font-bold" style={{ fontSize: size * 0.2 }}>{value}%</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Challenges() {
  const allSummaries = Object.values(summary);
  const totalPassed = allSummaries.reduce((a, s) => a + s.passed, 0);
  const totalChallenges = allSummaries.reduce((a, s) => a + s.total, 0);
  const overallRate = totalChallenges > 0 ? Math.round((totalPassed / totalChallenges) * 100) : 0;
  const overallWeighted = allSummaries.length > 0
    ? Math.round(allSummaries.reduce((a, s) => a + (s.weightedScore ?? s.passRate), 0) / allSummaries.length)
    : 0;

  return (
    <section id="overview" className="scroll-mt-20 space-y-12">
      <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
        <p>AMI&apos;s agentic coding capabilities are evaluated across diverse programming challenges using the FRITO multi-provider routing feature. Each challenge is run against multiple free-tier models to measure pass rates, efficiency, and solution quality — without requiring API keys or incurring costs.</p>
      </div>

      {/* Overall gauge */}
      <div className="flex flex-col items-center mb-12">
        <CircularGauge value={overallRate} />
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Overall Pass Rate</p>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">Weighted score: {overallWeighted}%</p>
      </div>

      {/* Model summary cards */}
      <Section id="models" title="Model Summary">
        <div className="grid grid-cols-2 gap-3">
          {models.map((m) => {
            const s = summary[m.slug];
            if (!s) return null;
            const pct = s.passRate;
            const ws = s.weightedScore ?? pct;
            return (
              <div key={m.slug} className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">{m.label}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">{s.passed}/{s.total}</span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}cc)` }} />
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-[11px] text-neutral-600 dark:text-neutral-500">
                  <span>Weighted: {ws}%</span>
                  <span>Avg turns: {s.avgTurns}</span>
                  <span>Avg time: {formatTime(s.avgTime)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Challenge table */}
      <Section id="results" title="Challenge Results">
        <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60">
          <table className="w-full text-sm text-left table-fixed">
            <colgroup>
              <col className="w-[24%]" />
              {models.map((m) => (
                <col key={m.slug} style={{ width: `${76 / models.length}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 text-[11px] uppercase tracking-wider">
                <th className="px-3 py-2.5 font-medium">Challenge</th>
                {models.map((m) => (
                  <th key={m.slug} className="px-2 py-2.5 font-medium text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                      <span className="truncate">{shortLabel[m.slug] ?? m.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {challenges.map((ch) => (
                <tr key={ch.id} className="border-b border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-mono text-neutral-500">{ch.id}</span>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white truncate">{ch.name}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${difficultyStyle[ch.difficulty] ?? ""}`}>{ch.difficulty}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-500">{ch.category}</div>
                  </td>
                  {models.map((m) => {
                    const res = ch.results[m.slug];
                    if (!res) {
                      return (
                        <td key={m.slug} className="px-2 py-2.5 text-center text-neutral-500 text-xs">--</td>
                      );
                    }
                    const pct = Math.min(100, Math.round((res.testsPass / ch.testsTotal) * 100));
                    return (
                      <td key={m.slug} className="px-2 py-2.5">
                        <div className="space-y-1">
                          <div className="h-1 rounded-full bg-neutral-200 dark:bg-white/5 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: res.passed ? "#22c55e" : "#ef4444" }} />
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none ${res.passed ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                              {res.passed ? "Pass" : "Fail"}
                            </span>
                            <span className="text-[10px] text-neutral-500">{res.testsPass}/{ch.testsTotal}</span>
                          </div>
                          <div className="text-[10px] text-neutral-500 text-center">{res.turns}t &middot; {formatTime(res.elapsedMs)}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-neutral-600 text-center">
          Report generated {new Date(report.generated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </Section>

      {/* Container-based evaluation */}
      <Section id="container-evaluation" title="Container Evaluation">
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          <p>
            Challenges can be run inside the OpenShell container image for reproducible, sandboxed evaluation
            of AMI&apos;s agentic capabilities. This is the recommended way to run the full evaluation suite — the
            container includes the AMI binary, Node.js {'>'}= 26, and all required tooling.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Run a single challenge</h4>
            <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-xl p-4 text-sm overflow-x-auto">
{`docker run --rm \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
  -e TMPDIR=/tmp \\
  -e AI_API_KEY="$AI_API_KEY" \\
  -v ./challenges:/sandbox/challenges \\
  ghcr.io/superinference/openshell-ami:latest \\
  bash -c 'bash /sandbox/challenges/framework/run-challenge.sh \\
    /sandbox/challenges/software-development/array-operations/031-array-flatten'`}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Run all challenges</h4>
            <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-xl p-4 text-sm overflow-x-auto">
{`docker run --rm \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
  -e TMPDIR=/tmp \\
  -e AI_API_KEY="$AI_API_KEY" \\
  -v ./challenges:/sandbox/challenges \\
  ghcr.io/superinference/openshell-ami:latest \\
  bash -c 'bash /sandbox/challenges/framework/run-all.sh'`}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Use FRITO (free-tier, no API key)</h4>
            <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-xl p-4 text-sm overflow-x-auto">
{`docker run --rm \\
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=2g \\
  -e TMPDIR=/tmp \\
  -e FRITO=1 \\
  -v ./challenges:/sandbox/challenges \\
  ghcr.io/superinference/openshell-ami:latest \\
  bash -c 'bash /sandbox/challenges/framework/run-all.sh'`}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Environment variables</h4>
            <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 text-[11px] uppercase tracking-wider">
                    <th className="px-3 py-2.5 font-medium">Variable</th>
                    <th className="px-3 py-2.5 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700 dark:text-neutral-300">
                  <tr className="border-b border-neutral-100 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-xs">AI_API_KEY</td>
                    <td className="px-3 py-2">API key for the model provider</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-xs">AI_MODEL</td>
                    <td className="px-3 py-2">Model to use (default: gemini-2.5-pro)</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-xs">AI_PROVIDER</td>
                    <td className="px-3 py-2">Provider name (default: google)</td>
                  </tr>
                  <tr className="border-b border-neutral-100 dark:border-white/5">
                    <td className="px-3 py-2 font-mono text-xs">FRITO</td>
                    <td className="px-3 py-2">Set to 1 for free-tier multi-provider routing (no API key needed)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono text-xs">PLAN_MODE</td>
                    <td className="px-3 py-2">Set to 1 to start AMI in plan mode</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Results</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Each challenge writes a JSON result file to <code className="bg-neutral-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs">{'<challenge>/results/ami-<model>.json'}</code> containing
              pass/fail status, test counts, turn count, token usage, estimated cost, and behavioral metrics
              (file reads, edits, bash calls, web searches). Use <code className="bg-neutral-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs">framework/generate-report.ts</code> to
              aggregate results into the report displayed above.
            </p>
          </div>
        </div>
      </Section>
    </section>
  );
}
