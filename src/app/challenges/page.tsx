"use client";

import Section from "@/components/Section";
import report from "@/data/challenges-report.json";

/* ------------------------------------------------------------------ */
/*  Inline types for the challenges report JSON                       */
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
  avgTurns: number;
  avgTime: number;
};

const models = report.models as ModelDef[];
const challenges = report.challenges as Challenge[];
const summary = report.summary as Record<string, Summary>;

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatTime(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
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
      {/* background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        className="text-neutral-200 dark:text-white/5"
        strokeWidth={stroke}
      />
      {/* filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${gap}`}
        strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.8s ease" }}
      />
      <defs>
        <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* center text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-neutral-900 dark:fill-white text-3xl font-bold"
        style={{ fontSize: size * 0.2 }}
      >
        {value}%
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ChallengesPage() {
  // Compute overall pass rate across all models
  const totalPassed = Object.values(summary).reduce((a, s) => a + s.passed, 0);
  const totalChallenges = Object.values(summary).reduce((a, s) => a + s.total, 0);
  const overallRate = totalChallenges > 0 ? Math.round((totalPassed / totalChallenges) * 100) : 0;

  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section
        id="challenges"
        title="Challenges"
        subtitle="Evaluating AMI's agentic coding capabilities across 10 diverse programming challenges."
      >
        {/* ---------- Overall gauge ---------- */}
        <div className="flex flex-col items-center mb-12">
          <CircularGauge value={overallRate} />
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Overall Pass Rate</p>
        </div>

        {/* ---------- Model summary cards ---------- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {models.map((m) => {
            const s = summary[m.slug];
            if (!s) return null;
            const pct = s.passRate;
            return (
              <div
                key={m.slug}
                className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">{m.label}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {s.passed}/{s.total}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{pct}% pass rate</span>
                </div>
                {/* progress bar */}
                <div className="h-2 rounded-full bg-neutral-200 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${m.color}, ${m.color}cc)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-neutral-500">
                  <span>{s.passed} passed</span>
                  <span>{s.total - s.passed} failed</span>
                </div>
                <div className="flex gap-4 mt-3 text-xs text-neutral-500">
                  <span>Avg turns: {s.avgTurns}</span>
                  <span>Avg time: {formatTime(s.avgTime)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------- Challenge table ---------- */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Challenge</th>
                <th className="px-4 py-3 font-medium">Difficulty</th>
                <th className="px-4 py-3 font-medium">Category</th>
                {models.map((m) => (
                  <th key={m.slug} className="px-4 py-3 font-medium text-center">
                    {m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {challenges.map((ch) => (
                <tr
                  key={ch.id}
                  className="border-b border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* number */}
                  <td className="px-4 py-3 text-neutral-500 font-mono text-xs">
                    {ch.id}
                  </td>

                  {/* name + description */}
                  <td className="px-4 py-3">
                    <div className="text-neutral-900 dark:text-white font-medium">{ch.name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{ch.description}</div>
                  </td>

                  {/* difficulty badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyStyle[ch.difficulty] ?? ""}`}
                    >
                      {ch.difficulty}
                    </span>
                  </td>

                  {/* category */}
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400 text-xs whitespace-nowrap">
                    {ch.category}
                  </td>

                  {/* per-model results */}
                  {models.map((m) => {
                    const res = ch.results[m.slug];
                    if (!res) {
                      return (
                        <td key={m.slug} className="px-4 py-3 text-center text-neutral-600">
                          --
                        </td>
                      );
                    }
                    const pct = Math.min(100, Math.round((res.testsPass / ch.testsTotal) * 100));
                    return (
                      <td key={m.slug} className="px-4 py-3">
                        <div className="flex flex-col items-center gap-1.5 min-w-[110px]">
                          {/* bar */}
                          <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: res.passed ? "#22c55e" : "#ef4444",
                              }}
                            />
                          </div>
                          {/* badge + test count */}
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                res.passed
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {res.passed ? "Pass" : "Fail"}
                            </span>
                            <span className="text-xs text-neutral-500">
                              {res.testsPass}/{ch.testsTotal}
                            </span>
                          </div>
                          {/* turns + time */}
                          <div className="text-[11px] text-neutral-600">
                            {res.turns} turns &middot; {formatTime(res.elapsedMs)}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- Generated timestamp ---------- */}
        <p className="mt-6 text-xs text-neutral-600 text-center">
          Report generated {new Date(report.generated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </Section>
    </main>
  );
}
