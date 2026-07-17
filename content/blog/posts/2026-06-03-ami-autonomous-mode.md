---
title: "Running AMI in Autonomous Mode: From Single Fixes to Full Benchmark Sweeps"
subtitle: "How to let AMI solve 2,940 coding challenges without human intervention"
abstract: "AMI supports multiple autonomy levels — from interactive plan mode to fully autonomous FRITO+YOLO runs. This post walks through the configuration options, environment variables, and operational patterns for running AMI on everything from a single bug fix to 500-instance parallel SWE-bench sweeps."
date: "2026-06-03"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/ami-autonomous-mode.jpg"
---

## The autonomy spectrum

Not every task needs the same level of human oversight. Fixing a typo in a README should not require the same approval workflow as refactoring authentication middleware. AMI exposes three autonomy levels that map to this reality:

**Interactive mode** (default) — AMI proposes changes and waits for approval before executing file edits, bash commands, or web searches. This is the safest option for unfamiliar codebases.

**Plan mode** (`PLAN_MODE=1`) — AMI reads the codebase, builds a plan, and presents it for approval before executing. Once approved, it runs autonomously through the plan steps. Good for tasks where you want to validate the approach but not babysit execution.

**YOLO mode** (`--yolo`) — AMI executes without asking for permission on any action. Combined with FRITO for zero-cost inference, this is the configuration used for benchmark sweeps.

## Running a single instance

The simplest autonomous run targets one SWE-bench instance:

```bash
AI_API_KEY="sk-..." AI_MODEL="gemini-2.5-pro" \
  ./run-instance.sh django__django-16041
```

The runner script handles everything: cloning the repo from a bare mirror cache, checking out the correct commit, installing dependencies, launching AMI with the instance description as its prompt, and extracting the resulting patch.

Key environment variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `AI_MODEL` | `gemini-2.5-pro` | Model to use |
| `AI_PROVIDER` | `google` | Provider backend |
| `MAX_TURNS` | `140` | Maximum agent turns before forced stop |
| `FRITO` | `0` | Enable FRITO mode for free-tier routing |
| `SKIP_EXISTING` | `0` | Skip instances with existing results |

## Parallel sweeps

For benchmark evaluation, running one instance at a time is impractical. The parallel runner distributes instances across workers:

```bash
FRITO=1 PARALLEL=5 SKIP_EXISTING=1 \
  ./run-all-parallel.sh
```

This reads every instance from the dataset JSONL, filters out instances with existing results, and dispatches them to a pool of concurrent workers. Each worker runs in its own process with isolated working directories.

The `PARALLEL` setting needs tuning based on your hardware and the model provider's rate limits. With FRITO mode (which rotates across multiple free-tier providers), `PARALLEL=5` is sustainable. With a single paid API key, `PARALLEL=3` avoids hitting rate limits.

## FRITO + YOLO: the zero-cost sweep

The most common autonomous configuration combines two features:

```bash
FRITO=1 ./run-instance.sh astropy__astropy-14182
```

**FRITO mode** routes prompts through free-tier LLM providers listed in `~/.ami/frito.json`. When one provider hits a rate limit, AMI automatically rotates to the next. No API key needed.

**YOLO mode** is implicit in the benchmark runner — AMI runs non-interactively with all permissions granted. The runner captures AMI's structured JSON output including token counts, tool calls, and the final diff.

This combination lets you evaluate AMI across hundreds of instances at zero inference cost, limited only by free-tier rate limits and wall-clock time.

## Challenge runner for the core suite

The core challenge suite (2,940 challenges across 15 categories) uses a similar but distinct runner:

```bash
AI_API_KEY="sk-..." \
  ./run-challenge.sh challenges/algorithms/sorting/0042-merge-intervals/
```

Each challenge directory contains a `challenge.json` with the task description, test file, and expected test count. The runner:

1. Copies the challenge workspace to a temporary directory
2. Launches AMI with the challenge prompt
3. Runs the test suite using `node --import tsx --test`
4. Compares passing tests against `testsTotal` from `challenge.json`
5. Saves a structured result JSON with pass/fail, timing, token usage, and behavioral metrics

The result file captures everything needed for analysis:

```json
{
  "runner": "ami",
  "model": "gemini-2.5-pro",
  "testsPass": 12,
  "testsTotal": 12,
  "turns": 8,
  "toolCalls": 23,
  "elapsedMs": 45200,
  "tokens": { "prompt": 18420, "completion": 3891, "total": 22311 },
  "estimatedCost": 0.00,
  "passed": true
}
```

## Monitoring long runs

For sweeps that run overnight, the monitor script provides a live dashboard:

```bash
./monitor.sh  # in a separate terminal
```

This watches the results directory, reports completion percentages, and flags instances that errored or timed out. You can also grep the results for quick stats:

```bash
# Pass rate across all completed instances
find results/ -name "ami-*.json" -exec jq -r '.passed' {} \; \
  | sort | uniq -c

# Average turns for passing instances
find results/ -name "ami-*.json" -exec jq -r 'select(.passed) | .turns' {} \; \
  | awk '{s+=$1; n++} END {print s/n}'
```

## Vertex AI for scale

For maximum throughput without rate limits, AMI supports Anthropic via Vertex AI:

```bash
AI_PROVIDER=anthropic-vertex \
  ANTHROPIC_VERTEX_PROJECT_ID=my-project \
  AI_MODEL=claude-opus-4-6 \
  PARALLEL=8 \
  ./run-all-parallel.sh
```

Vertex mode automatically clears all other API keys so AMI detects the Vertex configuration from environment variables. This path uses Google Cloud IAM for authentication instead of API keys, which means no rate limits beyond your project's quota.

## When to use which mode

| Scenario | Configuration |
|----------|--------------|
| Exploring a new codebase | Default interactive mode |
| Known refactor with clear scope | `PLAN_MODE=1` |
| Single bug fix, trusted codebase | `--yolo` |
| Benchmark evaluation | `FRITO=1 SKIP_EXISTING=1 ./run-all-parallel.sh` |
| Production-scale evaluation | Vertex AI + `PARALLEL=8` |

The key insight is that autonomy level should match confidence level. Interactive mode when you are learning, plan mode when you know what you want but want to verify the approach, and full autonomy when the task is mechanical or you are measuring capability rather than producing production code.
