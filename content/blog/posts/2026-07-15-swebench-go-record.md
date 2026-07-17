---
title: "74.6% on SWE-bench Live Go: Our Strongest Result Yet"
subtitle: "AMI resolves 103 out of 138 Go issues, 30.5 points ahead of #2"
abstract: "AMI's SWE-bench Live Go result is our most dominant benchmark performance: 74.6% resolution rate, 3.4x more problems solved than the runner-up, across a test set more than twice as large. Go's explicit error handling and strict typing play to the PRE loop's strengths."
date: "2026-07-15"
author: "Carlos Camacho-Gonzalez"
categories: ["Benchmarks"]
heroImage: "/blog/images/swebench-go-record.jpg"
---

## The headline numbers

| Metric | Value |
|--------|-------|
| Resolution rate | 74.6% |
| Problems solved | 103 / 138 |
| vs 2nd place rate | +30.5 points |
| vs 2nd place absolute | 3.4x more solved |
| Runner-up instances | 68 (vs our 138) |

The runner-up — Claude Code + Claude 4.5 Sonnet — solved 30 out of 68 instances (44.1%). AMI solved 3.4x more problems in absolute terms while evaluating on more than double the instances.

## Why Go works well for iterative agents

Go's design philosophy — explicit error handling, strong static typing, clear compiler errors — provides exactly the kind of feedback signal that the PRE loop thrives on.

### Compiler as oracle

Go's compiler catches type errors, unused variables, unhandled errors, and interface violations. Each compiler error is a precise observation that the PRE loop uses to update its belief state and refine the next attempt.

### Explicit error handling

Go requires explicit error checking — no hidden exceptions, no silent failures. This means the test suite and compiler provide comprehensive feedback on whether a fix actually works. For the PRE loop, comprehensive feedback means faster convergence.

### Idiomatic patterns

Go's strong conventions (error returns, interface composition, package structure) mean there are fewer "correct" ways to solve a problem. The search space is more constrained than in languages that support multiple paradigms, which helps the planning phase identify the right approach earlier.

## Comparison across leaderboards

| Leaderboard | Resolved | Margin vs #2 |
|-------------|----------|--------------|
| Go | 74.6% | +30.5 pts |
| Lite | 63.0% | +27.0 pts |
| TS/JS | 54.9% | +7.4 pts |
| Rust | 48.9% | +11.1 pts |

The Go result is our strongest both in absolute resolution rate and margin over the competition. The Lite (Python-centric) result is second with 63.0%. These results suggest that languages with strong static typing and explicit error handling are particularly well-suited to iterative agent approaches.

## Same configuration, different language

All four results use the identical configuration:

- AMI v0.6.2
- Claude-4.6-Opus
- OpenShell container
- No per-language tuning

The framework does not know it is solving Go problems versus Rust problems. It simply observes tool outputs, updates beliefs, and iterates until the stopping criterion is met. Cross-language generalization emerges from the architecture, not from language-specific engineering.
