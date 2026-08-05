---
title: "AMI Sweeps All Five SWE-bench Live Go Positions"
subtitle: "One framework, three providers, five models -- every top-five slot on the Go leaderboard belongs to AMI"
abstract: "AMI holds positions 1 through 5 on the SWE-bench Live Go leaderboard as of August 2026, spanning models from Anthropic and Google. Even the lowest-ranked AMI variant outperforms the best non-AMI submission by 8.1 percentage points. This is the first time any agent framework has swept the top five on a SWE-bench leaderboard."
date: "2026-08-03"
author: "Carlos Camacho-Gonzalez"
categories: ["Benchmarks"]
heroImage: "/blog/images/go-sweep-top-five.jpg"
---

## The leaderboard as of August 2026

Out of 22 total Go submissions on the SWE-bench Live leaderboard, the top five are all AMI:

| Rank | Configuration | Resolved | Total | Rate |
|------|---------------|----------|-------|------|
| 1 | AMI Agent + Claude-4.6-Opus | 103 | 138 | 74.6% |
| 2 | AMI Agent + Claude-4.6-Sonnet | 99 | 138 | 71.7% |
| 3 | AMI Agent + Claude-4.5-Haiku | 90 | 138 | 65.2% |
| 4 | AMI Agent + Gemini-3.6-Flash | 78 | 138 | 56.5% |
| 5 | AMI Agent + Gemini-3.1-Pro | 72 | 138 | 52.2% |
| 6 | Claude Code + Claude-4.5-Sonnet | 30 | 68 | 44.1% |

The gap between our weakest variant (Gemini 3.1 Pro at 52.2%) and the best non-AMI submission (Claude Code at 44.1%) is **+8.1 percentage points**. At the top, AMI + Claude-4.6-Opus leads the next non-AMI entry by **+30.5 points** and solves **3.4x** more problems in absolute terms (103 vs 30).

## Why a sweep matters

No other agent framework holds even two consecutive positions on any SWE-bench leaderboard. Holding all five demonstrates something specific: **the framework contributes more to performance than the underlying model does.**

The spread between our best and worst variants is 22.4 points (74.6% minus 52.2%). That is significant. But the spread between our worst variant and the best non-AMI entry is still positive. The floor set by AMI's architecture -- the PRE loop, critic-gated memory, and OpenShell execution environment -- sits above the ceiling of other approaches regardless of which model they use.

## Three providers, one framework

The five configurations span models from two providers:

- **Anthropic**: Claude-4.6-Opus, Claude-4.6-Sonnet, Claude-4.5-Haiku
- **Google**: Gemini-3.6-Flash, Gemini-3.1-Pro

All five runs used the identical setup: **AMI v0.6.2** with the **OpenShell** container, evaluated against the full **138-instance** test set. No per-model tuning, no per-language configuration, no prompt adjustments between runs.

This is a direct consequence of the model-agnostic design we described in the [AMI v0.6 architecture post](/blog/posts/2026-05-25-ami-v06-release). The framework speaks a normalized completion interface. Swapping the underlying model is a single configuration change.

### Model tiers are visible but not decisive

The ranking within AMI's five entries follows a predictable pattern: larger, more capable models resolve more issues. Opus leads Sonnet by 2.9 points, Sonnet leads Haiku by 6.5 points, and the Anthropic models collectively outperform the Google models. But even the smallest model in the set -- Gemini 3.1 Pro -- still outperforms every non-AMI submission.

## What the numbers mean for Go specifically

Go remains our strongest language benchmark by a wide margin. The compiler's strict type checking and explicit error handling produce the kind of precise, actionable feedback that the PRE loop converts into belief updates and targeted retries. We covered the structural reasons in our [Go engineering deep dive](/blog/posts/2026-07-12-swebench-go-engineering).

The sweep adds a new data point to that analysis: the advantage is not model-contingent. Five different models, spanning two provider families and a wide capability range, all benefit from the same Go-specific feedback dynamics when run through the PRE loop.

## Raw comparison

| Metric | AMI best | AMI worst | Best non-AMI |
|--------|----------|-----------|--------------|
| Resolution rate | 74.6% | 52.2% | 44.1% |
| Problems solved | 103 | 72 | 30 |
| Test instances | 138 | 138 | 68 |
| Margin vs non-AMI | +30.5pp | +8.1pp | -- |

The non-AMI runner-up evaluated on 68 instances -- less than half our test set. Even on a smaller, potentially easier subset, it did not reach our lowest-performing configuration.
