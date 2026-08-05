---
title: "From Opus to Gemini Flash: Scaling AMI Across Model Tiers on SWE-bench Go"
subtitle: "Same binary, same prompts, five models — what the cost-quality curve actually looks like"
abstract: "We ran AMI v0.6.2 against SWE-bench Live Go with five different models spanning two providers. The only variable was the model endpoint. The results reveal a practical cost-quality tradeoff curve that every team running AI-assisted development should understand."
date: "2026-08-05"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/go-multi-model-cost-quality.jpg"
---

## One binary, five models

Every benchmark result on our leaderboard was produced by the same artifact: AMI v0.6.2, running inside the same OpenShell container, with the same system prompts and the same `MAX_TURNS=140` limit. The only variable across runs was the `AI_MODEL` environment variable. This matters because it isolates model capability from agent engineering — the scaffolding is identical, so the numbers reflect pure model performance under AMI's orchestration.

Here are the SWE-bench Live Go resolution rates:

| Model | Resolution Rate | Delta vs. Opus | Provider |
|---|---|---|---|
| Claude-4.6-Opus | 74.6% | baseline | Anthropic |
| Claude-4.6-Sonnet | 71.7% | -2.9pp | Anthropic |
| Claude-4.5-Haiku | 65.2% | -9.4pp | Anthropic |
| Gemini-3.6-Flash | 56.5% | -18.1pp | Google |
| Gemini-3.1-Pro | 52.2% | -22.4pp | Google |

## The diminishing returns curve

The step-down cost between adjacent tiers is not linear. Moving from Opus to Sonnet costs 2.9 percentage points. Sonnet to Haiku costs 6.5pp. Haiku to Flash costs 8.7pp. The first step down is nearly free in terms of capability — you retain 96% of Opus's resolution rate with Sonnet at a fraction of the per-token cost.

This has a direct practical consequence: **most production workloads should default to Sonnet**, not Opus. The 2.9pp gap is within noise for many real-world distributions, and the cost savings compound fast when you are processing hundreds or thousands of issues.

## Haiku outperforms every non-AMI agent

The 65.2% result from Claude-4.5-Haiku deserves its own callout. This is the cheapest model in the Anthropic lineup, and it still outperforms every non-AMI agent on the SWE-bench Live Go leaderboard — including agents running far more expensive models. The implication is that agent architecture matters more than raw model size once you cross a capability threshold. AMI's structured planning, OpenShell execution environment, and critic-gated memory give smaller models the scaffolding they need to punch above their weight.

For high-volume, cost-sensitive workloads — think CI pipelines that auto-triage and fix flaky tests, or batch processing of low-severity bug reports — Haiku on AMI gives you top-of-leaderboard performance at the lowest Anthropic price tier.

## Cross-provider compatibility

The Gemini results prove something we consider essential for production readiness: **AMI's model abstraction layer works across providers**. Switching from Anthropic to Google requires changing two environment variables, not rewriting your pipeline.

This matters for teams that need provider diversity for compliance, want to consolidate billing under Google Cloud, or simply want a fallback when one provider has capacity constraints. Gemini-3.6-Flash at 56.5% is competitive with many dedicated agents, and it runs on entirely separate infrastructure from the Anthropic models.

## How to switch models

Changing the model is a single configuration change. In your run configuration:

```bash
# Opus — maximum accuracy
AI_MODEL="claude-4.6-opus" AI_PROVIDER="anthropic" ./run-instance.sh

# Sonnet — best cost/quality tradeoff
AI_MODEL="claude-4.6-sonnet" AI_PROVIDER="anthropic" ./run-instance.sh

# Haiku — high volume, low cost
AI_MODEL="claude-4.5-haiku" AI_PROVIDER="anthropic" ./run-instance.sh

# Gemini Flash — Google Cloud billing, provider diversity
AI_MODEL="gemini-3.6-flash" AI_PROVIDER="google" ./run-instance.sh
```

Everything else — the container image, the prompt templates, the turn limits, the patch extraction — stays the same. No code changes, no redeployment.

## Choosing the right tier

The decision framework is straightforward:

| Priority | Recommended Model | Rationale |
|---|---|---|
| Maximum accuracy | Claude-4.6-Opus | 74.6% — highest resolution rate, justified for critical codebases |
| Cost efficiency | Claude-4.6-Sonnet | 71.7% — retains 96% of Opus at significantly lower cost |
| High volume / budget | Claude-4.5-Haiku | 65.2% — still beats every non-AMI agent, lowest Anthropic tier |
| Provider diversity | Gemini-3.6-Flash | 56.5% — separate provider, Google Cloud billing |
| Google-native stack | Gemini-3.1-Pro | 52.2% — native Google integration, Vertex AI compatible |

For most teams, we recommend starting with Sonnet and only upgrading to Opus for repositories where the marginal 2.9pp matters — typically large, complex codebases with deep dependency chains. Run Haiku for anything high-volume where you need good-enough results at scale. Use the Gemini variants when your infrastructure or compliance requirements dictate provider choice.

The underlying point is that AMI's value is not tied to any single model. The agent architecture is the multiplier. Pick the model that fits your budget and constraints, and let AMI handle the rest.
