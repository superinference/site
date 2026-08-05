---
title: "Five Models, One Framework: What the Go Sweep Proves About Architecture"
subtitle: "AMI holds the top 5 positions on SWE-bench Live Go with 5 different models from 2 providers"
abstract: "AMI swept the top 5 on SWE-bench Live Go using five different models spanning two providers and the full capability spectrum. The result demonstrates that the PRE loop is model-agnostic by design: the framework is the differentiator, not the underlying LLM."
date: "2026-08-04"
author: "Carlos Camacho-Gonzalez"
categories: ["Research"]
heroImage: "/blog/images/go-model-agnostic-framework.jpg"
---

## The experiment no one else can run

AMI holds positions 1 through 5 on the SWE-bench Live Go leaderboard. Each position uses a different model. Two are from Anthropic (Claude), two are from Google (Gemini), and one is the cost-optimized Claude-4.5-Haiku. The models span the full capability spectrum from frontier to mid-tier.

| AMI Configuration | Rate | vs Best Non-AMI |
|---|---|---|
| Claude-4.6-Opus | 74.6% | +30.5pp |
| Claude-4.6-Sonnet | 71.7% | +27.6pp |
| Claude-4.5-Haiku | 65.2% | +21.1pp |
| Gemini-3.6-Flash | 56.5% | +12.4pp |
| Gemini-3.1-Pro | 52.2% | +8.1pp |

Every single AMI configuration outperforms every non-AMI agent on the leaderboard. The weakest AMI variant beats the strongest non-AMI competitor by 8.1 percentage points.

## If the model mattered most, this would not work

The standard assumption in AI engineering is that benchmark performance is primarily a function of the underlying model. A better model produces better results; swap to a weaker model and performance collapses.

AMI's Go sweep contradicts this assumption directly. If AMI's success were model-dependent, switching from Claude-4.6-Opus to Gemini-3.1-Pro — a model from a different provider, a different architecture family, trained on different data — would crash performance. Instead, Gemini-3.1-Pro still places top 5 and beats every non-AMI agent.

The spread within AMI variants is 22.4 percentage points (74.6% down to 52.2%). The gap between AMI's worst configuration and the best non-AMI agent is 8.1 percentage points. **Framework choice has a larger effect on performance than model choice.**

## Why the PRE loop is model-agnostic

The PRE loop's three core mechanisms operate on observations, not on model internals.

### Critic-gated memory

The Critic evaluates candidate results by checking them against concrete observations: test outputs, compiler errors, type-check results. It does not inspect the model's hidden states or attention patterns. A passing test is a passing test regardless of which model generated the code that passes it.

### Information-theoretic stopping

The stopping criterion measures whether additional iterations are likely to yield new information, based on the trajectory of observations so far. This calculation depends on what the agent has observed, not on which model is doing the observing. The entropy of the observation sequence is model-independent.

### Structured planning

The planning phase decomposes tasks into subgoals based on the current belief state and available observations. Different models may decompose differently, but the planning structure itself constrains the search space in ways that benefit all models equally.

## The cost-efficiency argument

Claude-4.5-Haiku is a cost-optimized model designed for high throughput at low cost. At 65.2% on SWE-bench Live Go, it outperforms every non-AMI agent on the leaderboard. This includes agents running frontier models.

The implication is direct: **AMI extracts more from a cheap model than other frameworks extract from an expensive one.** For production deployments where cost matters, this means the framework amortizes the performance gap between model tiers.

## Contrast with other agents

Claude Code, SWE-agent, and OpenHands all appear on the SWE-bench Live Go leaderboard with various model configurations. None of them holds more than one top-10 position by resolution rate. Switching their underlying model does not reliably improve their ranking because the framework itself is the bottleneck.

This is the key distinction. When the framework is the limiting factor, upgrading the model yields diminishing returns. When the framework is not the limiting factor — as with AMI — upgrading the model yields consistent, predictable gains across the full capability spectrum.

## Two numbers that summarize the finding

- **22.4pp**: the spread across AMI's five model configurations (within-framework variance)
- **8.1pp**: the gap between AMI's weakest and the best non-AMI (between-framework gap)

The between-framework gap exceeds what model selection alone can explain. The architecture is doing the work.
