---
title: "How the PRE Loop Works: Plan, Retrieve, Execute"
subtitle: "The iterative reasoning engine behind SuperInference"
abstract: "SuperInference replaces heuristic retry limits with an information-theoretic approach to iterative reasoning. The PRE loop — Plan, Retrieve, Execute — combines critic-gated memory with formal stopping criteria to determine exactly when additional thinking will help."
date: "2026-06-01"
author: "Carlos Camacho-Gonzalez"
categories: ["Research"]
heroImage: "/blog/images/superinference-pre-loop.jpg"
---

## The core question

When should an AI agent stop thinking?

Current systems either generate a single response and hope for the best, or iterate with ad-hoc retry limits — typically "try 3 times then give up." These heuristics waste compute on easy problems (where one attempt suffices) and quit too early on hard ones (where the fourth attempt might have succeeded).

SuperInference answers this question formally using information theory.

## The PRE loop

Each iteration of the PRE loop consists of three phases:

### Plan

The agent decomposes the current task into subgoals. This is not open-ended brainstorming — it is structured decomposition informed by the agent's current belief state. If the agent is 90% confident the task is solved, planning focuses on verification. If confidence is low, planning explores alternative approaches.

### Retrieve

Context is pulled from the agent's embedding-augmented memory. SuperInference models retrieval as a noisy channel: the retrieved context is probabilistically correlated with the true memory item, but not identical. This formalization of imperfect recall — borrowed from information theory — means the framework accounts for the fact that vector similarity search sometimes returns approximately-relevant rather than exactly-relevant results.

### Execute

The agent applies its plan using available tools (file edits, shell commands, web searches) and observes the results. A passing test suite is a strong positive observation. A compiler error is a strong negative one. A grep returning no matches is a weak negative observation — it might mean the pattern does not exist, or that the search query was wrong.

## The Critic gate

After execution, every candidate result passes through a two-error-rate Critic before entering memory:

- **Alpha (false approval rate)**: probability the Critic approves an incorrect result
- **Beta (false rejection rate)**: probability the Critic rejects a correct result

The empirical positive predictive value is approximately 0.977 — when the Critic approves a result, it is correct 97.7% of the time.

The memory update rule is simple:

- **Approved**: Memory grows — the verified result is stored with metadata
- **Rejected**: Memory unchanged — the failed attempt leaves no trace

This mirrors spike-timing dependent plasticity (STDP) in neuroscience: only successful signal patterns strengthen synaptic connections. Failed attempts do not pollute the agent's working memory.

## Information-theoretic stopping

The agent maintains a scalar belief `b_t` in [0.25, 0.95] representing confidence that the task is complete. This belief updates after every tool execution based on the Critic's evaluation.

The stopping decision uses Expected Information Gain (EIG). When EIG drops below 0.01 bits — meaning another iteration is unlikely to meaningfully change the agent's belief — the agent stops. Three conditions trigger termination:

1. High confidence the answer is correct
2. Further iterations unlikely to reduce uncertainty
3. Compute budget exhausted

This is the key innovation: the agent does not have a fixed retry limit. Easy problems converge in one or two iterations. Hard problems may take ten. The framework adapts automatically.

## Empirical validation

On DABStep Hard Tasks, SuperInference + Gemini 2.5 Pro achieved a 3.25x improvement over the base model (41.3% vs 12.7%). Critically, the performance gains are concentrated in the first 1-3 reasoning rounds, with diminishing returns thereafter — exactly what the information-theoretic framework predicts.

The diminishing returns pattern validates the stopping criterion: the framework correctly identifies when additional iterations are no longer productive.

## Model-agnostic by design

SuperInference requires no model retraining. The PRE loop, Critic, and stopping criteria operate at the framework level. Swap the underlying model — GPT-4, Claude, Gemini, Llama — and the framework adapts. This is why AMI can achieve #1 across four SWE-bench Live leaderboards with a single configuration: the reasoning architecture generalizes across both models and programming languages.
