---
title: "AMI Reaches #1 on All Four SWE-bench Live Leaderboards"
subtitle: "First agent to hold the top position across Lite, Rust, TS/JS, and Go simultaneously"
abstract: "AMI Agent powered by Claude-4.6-Opus now leads every SWE-bench Live leaderboard — resolving 63% of Lite, 48.9% of Rust, 54.9% of TS/JS, and 74.6% of Go issues. No other agent has held all four positions at once."
date: "2026-07-10"
author: "Carlos Camacho-Gonzalez"
categories: ["Benchmarks"]
heroImage: "/blog/images/swebench-live-number-one.jpg"
---

## The results

As of July 2026, AMI holds the #1 position on all four SWE-bench Live leaderboards:

| Leaderboard | Resolved | Problems Solved | vs 2nd Place |
|-------------|----------|-----------------|--------------|
| **Lite** | 63.0% | 189 / 300 | 1.75x |
| **Rust** | 48.9% | 46 / 94 | 2.7x |
| **TS/JS** | 54.9% | 112 / 204 | 1.15x |
| **Go** | 74.6% | 103 / 138 | 3.4x |

SWE-bench Live is a continuously updated benchmark of real-world GitHub issues. Unlike static benchmarks, it uses recent issues to prevent data contamination — agents must genuinely reason about unfamiliar code rather than pattern-match against training data.

## Why this matters

Most agents specialize. They perform well on Python-centric benchmarks but struggle with systems languages or the JavaScript ecosystem. AMI's cross-language dominance demonstrates that the SuperInference framework's iterative reasoning approach generalizes across programming paradigms.

### The Go result

The Go leaderboard stands out: 74.6% resolution rate, +30.5 points ahead of the second-place agent, on more than double the instances (138 vs 68). Go's emphasis on explicit error handling, strict typing, and idiomatic patterns makes it a challenging target for automated agents — yet AMI's PRE loop handles these constraints naturally through its critic-gated feedback cycle.

### Rust: hardest language, strong result

Rust's ownership model, borrow checker, and lifetime annotations make it arguably the hardest language for AI agents. AMI solved 46 out of 94 Rust issues (48.9%) — nearly 2.7x more than the runner-up in absolute terms — while also evaluating on a test set more than twice as large.

## How AMI does it

The key is SuperInference's PRE (Plan-Retrieve-Execute) loop combined with critic-gated memory:

1. **Plan**: Decompose the issue into subgoals
2. **Retrieve**: Pull relevant code context from the repository
3. **Execute**: Apply changes and run tests
4. **Critic gate**: Only verified results enter memory — rejected candidates leave no trace

The information-theoretic stopping criterion ensures AMI keeps iterating when there is expected information gain, and stops when further reasoning would not help. This avoids both premature termination on hard problems and wasted compute on easy ones.

## Configuration

All results use the same configuration:

- **Agent**: AMI v0.6.2
- **Model**: Claude-4.6-Opus (via Anthropic API)
- **Execution**: OpenShell container (`ghcr.io/superinference/openshell-ami:latest`)
- **Permission mode**: `--yolo` (auto-approve for benchmark runs)

No per-language tuning, no benchmark-specific prompts. The same agent, same model, same configuration across all four leaderboards.
