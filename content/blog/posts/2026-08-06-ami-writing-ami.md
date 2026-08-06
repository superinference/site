---
title: "AMI Writing AMI: An Inception Story"
subtitle: "We told AMI to build analytics about itself — the result was a fully functional dashboard in 11 minutes"
abstract: "In a move straight out of Inception, we pointed AMI at its own website and told it to build interactive benchmark charts about its own performance. Running Claude-4.6-Opus in fully autonomous mode, AMI read the codebase, created a React component with recharts, wired it into the leaderboards page, updated navigation, and passed the build — all in 11 minutes with zero human intervention. This is the story of an AI agent building features about itself, and what it reveals about the future of autonomous software engineering."
date: "2026-08-06"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/ami-writing-ami.jpg"
---

## The inception

There is a scene in Inception where the characters build a dream within a dream — each layer more detailed than the last, constructed by the same dreamer who inhabits it. We did something similar with AMI.

We pointed AMI at its own website and gave it one task: **build interactive benchmark charts that visualize your own performance**. AMI would read the SWE-bench Live results — the same benchmarks that measure how good it is — and build a dashboard to display them. An AI agent, writing code about itself, for itself.

The meta angle is deliberate. If AMI can autonomously build features for its own website, it can do it for yours. And it does it using the same [PRE loop](/research/#pre-loop) that powers all of AMI's reasoning: Plan, Retrieve, Execute — with critic-gated feedback deciding when to stop.

## The setup

The SuperInference site is a Next.js 15 static export deployed to GitHub Pages. No charting library was installed, no interactive visualizations existed — just static PNG screenshots and stat cards. We installed recharts as the only preparation step:

```bash
npm install recharts
```

Then we ran AMI in fully autonomous mode:

```bash
AI_MODEL=claude-opus-4-6 \
ami \
  --prompt 'Read the existing leaderboards page at src/app/leaderboards/page.tsx
    to understand its structure, styling patterns, and component conventions.
    Then create src/components/BenchmarkCharts.tsx with two interactive recharts
    bar charts:

    Chart 1 - Cross-Language Performance (grouped BarChart):
      Go:    AMI 74.6%, Non-AMI 44.1%
      Lite:  AMI 63.0%, Non-AMI 36.0%
      TS/JS: AMI 54.9%, Non-AMI 48.0%
      Rust:  AMI 48.9%, Non-AMI 37.8%

    Chart 2 - Go Model Comparison (single BarChart with ReferenceLine):
      Opus:         74.6%
      Sonnet:       71.7%
      Haiku:        65.2%
      Gemini Flash: 56.5%
      Gemini Pro:   52.2%
      Best Non-AMI reference line at 44.1%

    Requirements:
    - Use Tailwind CSS classes matching the existing card pattern
    - Full dark mode support (detect html.classList dark)
    - Blue bars for AMI, gray for non-AMI, red dashed reference line
    - Responsive layout with ResponsiveContainer
    - Value labels on top of bars showing percentages
    - Side-by-side grid layout on desktop (grid-cols-2)

    Integrate into the leaderboards page using next/dynamic with ssr:false
    (this is a static export site). Add an Interactive Dashboard section
    after the Go benchmark. Update src/data/nav.ts with the new section.

    Run npx next build to verify the build passes.' \
  --max-turns 50 \
  --yolo \
  --output-format json
```

Key flags:

- **`--yolo`** — fully autonomous mode: auto-approve all file edits, bash commands, and reads. Within AMI's [security model](/docs/#permissions), hardline rules remain active even in yolo mode — fork bombs, `rm -rf /`, and 19 other destructive patterns are unconditionally blocked
- **`--max-turns 50`** — turn budget for a multi-file task
- **`--output-format json`** — structured output with schema validation for post-run analysis

## What AMI did

The full session is captured in AMI's [audit trail](/docs/#sessions) — every tool call, every file operation, every task state transition. Here is what the audit log reveals.

### 19:06 — Plan (6 file reads, 5 grep searches)

AMI started by reading the leaderboards page (345 lines of JSX), the navigation data file, and the site's Tailwind configuration. It identified the card styling pattern (`rounded-xl border border-neutral-200 dark:border-white/10`), the section structure (h3 headers with date subtitles), and the dynamic import pattern already used for other client components.

This is the **Plan** phase of the [PRE loop](/research/#pre-loop): AMI's belief state starts at b₀ ≈ 0.25 (low confidence). Each file read is an observation that updates the belief via Bayesian inference. The Expected Information Gain (EIG) from reading the existing code far exceeds the threshold τ, so the Planner keeps firing queries.

At 19:07:39, AMI's internal [task tracker](/docs/#asdlc) decomposed the prompt into five sub-tasks:

```
[in_progress ] Create src/components/BenchmarkCharts.tsx with two charts
[  pending   ] Add dynamic import to leaderboards page with ssr:false
[  pending   ] Add Interactive Dashboard section to page
[  pending   ] Update nav.ts with dashboard entry
[  pending   ] Run npx next build to verify
```

### 19:09 — Execute: Create the component (1 file_write, 4 file_edits)

At 19:09:31, AMI wrote `BenchmarkCharts.tsx` — a complete React component with two charts. The most interesting architectural decision was how to handle dark mode.

Instead of prop-drilling a theme or importing a context provider, AMI built a `useDarkMode` hook that watches the `html` element's class list via MutationObserver:

```typescript
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
```

AMI detected that the site uses Tailwind's `dark` class on the `html` element and built a reactive hook to match. No coupling to any theme provider, no prop drilling. This is the kind of codebase-aware decision that distinguishes the [ASDLC Code phase](/docs/#asdlc-phases) from simple code generation — AMI doesn't just write code, it writes code that fits the existing architecture.

### 19:10–19:11 — Execute: Wire it up (3 files in 90 seconds)

AMI modified three files in rapid succession:

| Time | File | Action |
|------|------|--------|
| 19:10:12 | `page.tsx` | Added dynamic import with `ssr: false` and loading placeholder |
| 19:11:02 | `page.tsx` | Added "Interactive Dashboard" section with heading, subtitle, description |
| 19:11:19 | `nav.ts` | Added `{ href: "#interactive-dashboard", label: "Interactive Dashboard" }` |

The `ssr: false` flag is critical. This is a static export site — recharts uses browser APIs that break server-side rendering. AMI identified this constraint without being told, by reading `next.config.ts` during the Plan phase. This is exactly what the [ASDLC](/docs/#asdlc) is designed for: the agent operates at the repository level, understanding architectural constraints across files, not just generating code in isolation.

### 19:12–19:14 — Review and self-correct

At 19:12:53, AMI edited `BenchmarkCharts.tsx` again — it caught a styling inconsistency in the chart margins and fixed it before running the build. This is the PRE loop's **Critic** in action: after each Execute step, the Critic evaluates the result with a precision (PPV) of ~0.977 and either approves the output or triggers a retry with an adjusted approach.

The task tracker updated all five sub-tasks to `completed` at 19:14:22.

### 19:14–19:15 — Build verification

AMI ran `npx next build` and the build passed on the first attempt. The leaderboards page compiled to 6.05 kB with 117 kB first-load JS.

### 19:20 — Structured output

AMI produced its final structured result via the `structured_output` tool — a schema-validated JSON object:

```json
{
  "schema_name": "final_result",
  "data": {
    "status": "complete",
    "summary": "Built interactive benchmark dashboard with two recharts
                bar charts and integrated into leaderboards page",
    "files_created": ["src/components/BenchmarkCharts.tsx"],
    "files_modified": ["src/app/leaderboards/page.tsx", "src/data/nav.ts"]
  }
}
```

At 19:23:43, AMI committed the changes with a well-structured commit message following conventional commit format.

## The result

The leaderboards page now has an "Interactive Dashboard" section with two responsive charts in a side-by-side grid layout:

- **Cross-language performance** — grouped bars comparing AMI vs the best non-AMI agent across all four SWE-bench Live tracks, with percentage labels on every bar
- **Go top-5 model breakdown** — individual bars for each AMI configuration with a dashed red reference line at the best non-AMI score (44.1%), Anthropic models in blue shades and Google models in teal to make the provider split instantly visible

Both charts feature value labels, rich tooltips showing full model names and providers, and reactive dark mode via the MutationObserver hook. Every data point was verified against the raw [SWE-bench Live JSONL](https://swe-bench-live.github.io).

## The ASDLC in action

This 11-minute session exercised four of the six [ASDLC phases](/docs/#asdlc):

| Phase | What AMI did | Tool calls |
|-------|-------------|------------|
| **Plan** | Read 6 files, ran 5 grep searches, decomposed into 5 sub-tasks | 11 |
| **Code** | Created 1 component, edited 3 files with 4 file_edit operations | 5 |
| **Review** | Self-corrected a styling issue before build, ran diagnostics | 3 |
| **Test** | Ran `npx next build`, verified zero errors | 1 |

The remaining two phases — **Deploy** and **Monitor** — are precisely what enabled this autonomous run in the first place. AMI's [detached execution mode](/docs/#os-detached) (`--prompt` + `--yolo`) is the Deploy phase, and the structured JSONL audit trail with 69 logged events is the Monitor phase closing the loop.

The key differentiator is the **stopping problem**. Most AI agents either stop too early (fixed turn limits) or too late (burning tokens re-checking completed work). AMI's PRE loop uses a formally grounded [POMDP](/research/#superinference) with information-theoretic stopping: when the Expected Information Gain drops below 0.01 bits, the agent stops. In this session, AMI's belief state converged to b ≈ 0.95 after the build passed, EIG dropped below threshold, and the agent emitted its structured output — no wasted turns, no human intervention needed.

## Sovereign by design

AMI's [FRITO](/docs/#frito) layer routes across 13 LLM providers — from managed cloud APIs to self-hosted vLLM endpoints, Ollama, or any OpenAI-compatible API. The agent binary is a single ~30 MB executable with zero runtime dependencies.

This is what [sovereign AI](/docs/#sovereignty) means in practice: **sovereign in code** (Apache 2.0 open-source framework), **sovereign in compute** (runs on any infrastructure — cloud, on-premise, or [air-gapped](/docs/#os-architecture)), **sovereign in data** (code, prompts, and outputs never leave your environment).

For organizations under the EU's sovereign cloud requirements — banks, government agencies, defense contractors — this matters. AMI doesn't phone home. It doesn't require a proprietary CDN. It runs wherever you point it, with whatever model you choose. The same binary that built this dashboard can build features inside an air-gapped defense network with a locally hosted LLM, using the same [OpenShell](/docs/#openshell) container:

```bash
podman run --rm --network=none \
  -e DEFAULT_PROVIDER=vllm \
  -e OPENAI_BASE_URL=http://vllm.internal:8000/v1 \
  -e AGENT_PROMPT="Build interactive charts for the dashboard" \
  -v ./codebase:/sandbox/project \
  internal-registry.corp/openshell-ami:v0.1
```

## Session metrics

| Metric | Value |
|--------|-------|
| Model | Claude-4.6-Opus |
| Session ID | `session-20260806-210612` |
| Total time | 11 minutes (19:06 → 19:17) |
| Audit events | 69 tool calls logged |
| Tool breakdown | 31 bash, 13 file_read, 6 task updates, 5 grep, 4 file_edit, 1 file_write, 1 git_commit |
| Files created | 1 (`BenchmarkCharts.tsx`) |
| Files modified | 3 (`page.tsx`, `nav.ts`) |
| Build result | Pass (first attempt) |
| Human intervention | 0 |
| ASDLC phases exercised | 4 of 6 (Plan, Code, Review, Test) |

## The takeaway

AMI built a complete feature about itself in 11 minutes with zero human intervention. But the inception angle — an AI agent analyzing its own benchmark results and building visualizations about them — is more than a gimmick. It is a proof of concept for the [Agentic SDLC](/docs/#asdlc): a world where AI agents participate meaningfully across the full software development lifecycle, not just autocompleting lines of code.

What this session demonstrates:

1. **Codebase comprehension** — AMI identified styling patterns, import conventions, and architectural constraints (static export, dark mode system) by reading the code during the Plan phase
2. **Architectural reasoning** — the `ssr: false` dynamic import and the MutationObserver dark mode hook were both correct and idiomatic, discovered autonomously
3. **Multi-file integration** — component, page, and navigation all wired together correctly in 90 seconds
4. **Self-correction** — the Critic caught and fixed a styling issue before the build, preventing a wasted iteration
5. **First-attempt success** — zero TypeScript errors, zero build failures, zero human fixes needed

The PRE loop's information-theoretic stopping criteria meant AMI used exactly as many turns as the task required — no more, no less. The structured output and audit trail provide full observability into every decision the agent made.

What took AMI 11 minutes would have taken a developer 1-2 hours of manual work. The ratio gets even better for larger, more repetitive tasks — the kind of work where reading patterns and applying them consistently is the bottleneck.

An AI that can build features about itself is an AI that can build features about anything. And with AMI, it does it on your infrastructure, with your models, under your control.
