"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const crossLangData = [
  { language: "Go", AMI: 74.6, "Best Non-AMI": 44.1 },
  { language: "Lite (Python)", AMI: 63.0, "Best Non-AMI": 36.0 },
  { language: "TS/JS", AMI: 54.9, "Best Non-AMI": 48.0 },
  { language: "Rust", AMI: 48.9, "Best Non-AMI": 37.8 },
];

const goModelData = [
  { model: "Opus", fullName: "Claude-4.6-Opus", score: 74.6, provider: "Anthropic" },
  { model: "Sonnet", fullName: "Claude-4.6-Sonnet", score: 71.7, provider: "Anthropic" },
  { model: "Haiku", fullName: "Claude-4.5-Haiku", score: 65.2, provider: "Anthropic" },
  { model: "Gemini Flash", fullName: "Gemini-3.6-Flash", score: 56.5, provider: "Google" },
  { model: "Gemini Pro", fullName: "Gemini-3.1-Pro", score: 52.2, provider: "Google" },
];

const GO_BAR_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#0d9488", "#14b8a6"];

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const check = () => setDark(html.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function BenchmarkCharts() {
  const dark = useDarkMode();

  const axisColor = dark ? "#a3a3a3" : "#525252";
  const gridColor = dark ? "#333333" : "#e5e5e5";
  const bgTooltip = dark ? "#1c1c1c" : "#ffffff";
  const borderTooltip = dark ? "#404040" : "#d4d4d4";
  const labelColor = dark ? "#e5e5e5" : "#171717";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Chart 1: Cross-Language Performance */}
      <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Cross-Language Performance
        </h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-6">
          AMI&apos;s best result vs the strongest non-AMI agent on each SWE-bench Live track.
        </p>
        <div className="w-full" style={{ height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={crossLangData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barCategoryGap="30%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="language"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, undefined]}
                contentStyle={{
                  backgroundColor: bgTooltip,
                  border: `1px solid ${borderTooltip}`,
                  borderRadius: 8,
                  fontSize: 13,
                  color: dark ? "#f5f5f5" : "#171717",
                }}
                cursor={{ fill: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="square"
                iconSize={10}
              />
              <Bar dataKey="AMI" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={800}>
                <LabelList dataKey="AMI" position="top" formatter={(v) => `${v}%`} style={{ fill: labelColor, fontSize: 11, fontWeight: 600 }} />
              </Bar>
              <Bar dataKey="Best Non-AMI" fill="#6b7280" radius={[4, 4, 0, 0]} animationDuration={800} animationBegin={200}>
                <LabelList dataKey="Best Non-AMI" position="top" formatter={(v) => `${v}%`} style={{ fill: axisColor, fontSize: 11 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Go Model Comparison */}
      <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-6">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Go Top 5 — Model Breakdown
        </h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-6">
          All five AMI configurations that swept the Go leaderboard. Every bar clears the non-AMI ceiling.
        </p>
        <div className="w-full" style={{ height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={goModelData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barCategoryGap="25%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="model"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Resolution Rate"]}
                labelFormatter={(label) => {
                  const entry = goModelData.find((d) => d.model === String(label));
                  return entry ? `${entry.fullName} (${entry.provider})` : String(label);
                }}
                contentStyle={{
                  backgroundColor: bgTooltip,
                  border: `1px solid ${borderTooltip}`,
                  borderRadius: 8,
                  fontSize: 13,
                  color: dark ? "#f5f5f5" : "#171717",
                }}
                cursor={{ fill: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
              />
              <ReferenceLine
                y={44.1}
                stroke="#ef4444"
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: "Best Non-AMI  44.1%",
                  position: "insideTopRight",
                  fill: "#ef4444",
                  fontSize: 11,
                  fontWeight: 600,
                  offset: 6,
                }}
              />
              <Bar dataKey="score" name="AMI" radius={[4, 4, 0, 0]} animationDuration={800}>
                {goModelData.map((_, i) => (
                  <Cell key={i} fill={GO_BAR_COLORS[i]} />
                ))}
                <LabelList dataKey="score" position="top" formatter={(v) => `${v}%`} style={{ fill: labelColor, fontSize: 11, fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
