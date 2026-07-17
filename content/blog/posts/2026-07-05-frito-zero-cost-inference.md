---
title: "Zero-Cost AI Coding with FRITO"
subtitle: "How AMI routes through 7 free-tier providers for $0 inference"
abstract: "FRITO (Free-Tier Retrieval & Inference Token Ops) is AMI's cost-optimization layer. It automatically routes prompts through permanent free-tier LLM providers, rotates on rate limits, and tracks savings — enabling fully autonomous coding at zero marginal cost."
date: "2026-07-05"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/frito-zero-cost-inference.jpg"
---

## The cost problem

Running an autonomous coding agent on a commercial API gets expensive fast. A single SWE-bench task might require 10-50 LLM calls across planning, code generation, and verification. Multiply that by hundreds of issues, and the bill adds up quickly.

FRITO solves this by routing AMI through providers that offer permanent free tiers.

## How FRITO works

FRITO sits between AMI's reasoning engine and the LLM provider. When AMI needs a completion:

1. FRITO selects the next available free-tier provider
2. If the provider returns HTTP 429 (rate limited), FRITO automatically rotates to the next one
3. The response flows back to AMI transparently — the reasoning engine does not know or care which provider served it
4. FRITO logs the estimated cost savings compared to a reference provider

## Seven permanent free-tier providers

These providers offer genuinely free API access with no trial expiration:

| Provider | Models | Notes |
|----------|--------|-------|
| Google AI Studio | gemini-2.5-flash, gemini-2.5-pro | Most generous free tier |
| Groq | llama-3.3-70b, llama-3.1-8b | Extremely fast inference |
| OpenRouter | Auto-routed free models | Aggregates multiple providers |
| Mistral | mistral-small, codestral | Strong coding performance |
| Cerebras | zai-glm-4.7 | Wafer-scale inference |
| GitHub Models | deepseek-r1 | Via Azure backend |
| Hugging Face | Auto-selected | Broad model selection |

Three additional credit-based providers (DeepSeek, xAI Grok, Together AI) are also supported for teams with existing credits.

## Quality tiers

FRITO supports three quality modes, selectable via `/frito quality`:

- **Speed**: Prioritizes the fastest available provider. Best for simple tasks where latency matters more than reasoning depth.
- **Balanced** (default): Routes to the provider offering the best quality-to-latency ratio for the current request type.
- **Quality**: Selects the most capable available model. Use for complex multi-step reasoning.

## Getting started

Setup takes about two minutes:

```bash
ami
> /frito setup
```

The setup wizard walks through provider authentication. Configuration is stored at `~/.ami/frito.json` with 0600 permissions — it is never committed to version control.

Once configured, enable FRITO with:

```bash
> /frito on
```

## Tracking savings

FRITO continuously tracks what your usage would have cost on a reference provider (default: `openai/gpt-4o`). Check your running total:

```bash
> /frito savings
```

Teams running ASDLC pipelines with FRITO report 60-90% cost reductions while maintaining equivalent output quality for most SDLC tasks. The cost savings compound dramatically for batch workloads like benchmark runs or large-scale code migrations.

## When to use paid providers instead

FRITO is not a silver bullet. For maximum quality on critical tasks — production deployments, security-sensitive code, complex architectural decisions — a frontier model through a paid API will outperform free-tier alternatives. FRITO excels at the long tail: routine bug fixes, test generation, documentation, and exploratory coding where cost-per-query is the dominant concern.

The key insight is that most coding tasks do not require the most powerful model available. FRITO lets you reserve your budget for the tasks that genuinely need it.
