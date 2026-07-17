---
title: "FRITO Yolo Mode: Zero-Cost Autonomous Agent Runs"
subtitle: "Combining free-tier routing with fully autonomous execution"
abstract: "FRITO Yolo mode is AMI's most aggressive configuration: fully autonomous execution routed through free-tier LLM providers at zero cost. This post explains how the two features compose, when to use them together, and the engineering behind reliable zero-cost inference at scale."
date: "2026-06-08"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/frito-yolo-mode.jpg"
---

## Two features, one workflow

FRITO and YOLO solve different problems that combine naturally for benchmark evaluation.

**FRITO** (Free-Tier Retrieval & Inference Token Ops) handles cost. It maintains a roster of LLM providers with permanent free tiers — Google's Gemini API, Mistral's La Plateforme, and others. When AMI needs to make an inference call, FRITO selects the best available provider, sends the request, and automatically rotates to the next provider on rate-limit errors.

**YOLO mode** handles permissions. In normal operation, AMI asks for approval before running bash commands, editing files, or making web requests. YOLO mode grants blanket permission for all actions — the agent runs start to finish without human intervention.

Together, they enable: "Run AMI on 500 coding tasks, fully autonomously, at zero marginal cost."

## How FRITO selects providers

The provider roster lives in `~/.ami/frito.json`:

```json
{
  "providers": [
    {
      "name": "google",
      "model": "gemini-2.5-pro",
      "apiKeyEnv": "GOOGLE_API_KEY",
      "rateLimit": { "rpm": 10, "tpd": 1500000 }
    },
    {
      "name": "mistral",
      "model": "mistral-large-latest",
      "apiKeyEnv": "MISTRAL_API_KEY",
      "rateLimit": { "rpm": 30, "tpd": 1000000 }
    }
  ]
}
```

FRITO's selection algorithm is straightforward:

1. Sort providers by remaining daily token quota (descending)
2. Pick the first provider not currently rate-limited
3. On a 429 response, mark the provider as limited and retry with the next
4. Track cumulative token usage per provider per day

This is not a load balancer — it is a cost optimizer. The goal is to spread usage across free tiers so no single provider hits its daily limit before the sweep completes.

## The YOLO permission model

YOLO mode does not mean "no safety." AMI's security layer operates at two levels:

1. **Permission system** — what AMI is allowed to do (file edits, bash commands, web searches)
2. **Safety validators** — what AMI is never allowed to do regardless of permissions

YOLO mode disables level 1 (no approval prompts) but level 2 remains active. The 25 bash validators still block fork bombs, recursive deletes of system paths, and other destructive commands. Even in YOLO mode, `rm -rf /` is unconditionally rejected.

This distinction matters for benchmark evaluation: you want the agent to freely explore and modify the test repository, but you never want it to damage the host system.

## Running a FRITO+YOLO sweep

The benchmark runner scripts handle both modes through environment variables:

```bash
# Run all SWE-bench Verified instances, 5 at a time, zero cost
FRITO=1 PARALLEL=5 SKIP_EXISTING=1 \
  ./run-all-parallel.sh
```

Each worker process:

1. Reads the next instance from the queue
2. Checks for existing results (skips if `SKIP_EXISTING=1`)
3. Clones the repository from a local bare mirror (no network needed for git)
4. Launches AMI with FRITO routing and YOLO permissions
5. Captures the structured output (turns, tokens, tool calls, diff)
6. Writes the result JSON to `results/<instance-id>/`

The worker isolation is important: each instance runs in its own temporary directory with its own git checkout. There is no shared state between workers beyond the results directory.

## Handling rate limits gracefully

The main engineering challenge with FRITO mode is rate limit management across parallel workers. Five concurrent workers hitting the same provider can exhaust a free tier's RPM limit in seconds.

AMI handles this with exponential backoff and provider rotation:

```
Worker 1 → google (ok)
Worker 2 → google (ok)
Worker 3 → google (429 rate limited)
  → rotates to mistral (ok)
Worker 4 → google (429, still limited)
  → rotates to mistral (ok)
Worker 5 → mistral (429, now limited too)
  → backs off 30s, retries google (ok, limit reset)
```

The backoff is per-provider, not global. Worker 5 backs off on mistral while other workers continue using google. This keeps total throughput high even when individual providers are temporarily exhausted.

## Token tracking and cost savings

FRITO tracks every token sent through every provider. The behavioral metrics in each result file include:

```json
{
  "tokens": { "prompt": 18420, "completion": 3891, "total": 22311 },
  "estimatedCost": 0.00,
  "behavior": {
    "providerRotations": 2
  }
}
```

Across a full SWE-bench Verified sweep (500 instances), total token usage typically runs 10-15 million tokens. At standard Gemini 2.5 Pro pricing, that would cost roughly $30-50. With FRITO, the cost is $0.

## When FRITO+YOLO is the wrong choice

This configuration optimizes for throughput and cost at the expense of model quality and control. It is ideal for:

- Benchmark evaluation where you are measuring capability
- Regression testing across a large challenge suite
- Exploratory runs to identify which instances AMI can solve

It is not ideal for:

- Production code changes where you want the best model available
- Tasks requiring models not available on free tiers (Claude, GPT-4o)
- Anything where you want to review the agent's approach before it executes

For production use, the recommended configuration is a paid API key with the best available model, interactive or plan mode for oversight, and FRITO disabled. Save FRITO+YOLO for evaluation and experimentation.

## The operational loop

In practice, the team runs FRITO+YOLO sweeps as part of a continuous evaluation loop:

1. Make a change to AMI's reasoning engine or tool suite
2. Run a FRITO+YOLO sweep across the challenge suite
3. Compare pass rates against the baseline
4. Investigate regressions (instances that previously passed but now fail)
5. Iterate on the change
6. Run a final sweep with the production model (paid API) for official numbers

Steps 2-5 are zero-cost and can run overnight. Step 6 is the only one that costs money, and it only runs once per release cycle. This keeps the development feedback loop fast and cheap.
