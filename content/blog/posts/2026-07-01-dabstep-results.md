---
title: "3.25x Over Baseline: SuperInference on DABStep Hard Tasks"
subtitle: "How iterative reasoning transforms base model performance"
abstract: "On DABStep Hard Tasks, SuperInference + Gemini 2.5 Pro achieved 41.3% accuracy — a 3.25x improvement over the base model's 12.7%. The gains are concentrated in the first 1-3 reasoning rounds, empirically validating the framework's information-theoretic predictions."
date: "2026-07-01"
author: "Carlos Camacho-Gonzalez"
categories: ["Benchmarks"]
heroImage: "/blog/images/dabstep-results.jpg"
---

## DABStep benchmark

DABStep (Data Agent Benchmark for Structured Tasks) evaluates AI agents on hard data analysis tasks requiring multi-step reasoning, code generation, and structured output. The Hard Tasks subset tests the most challenging problems where agents must navigate complex data transformations and produce precise numerical answers.

## Results

SuperInference + Gemini 2.5 Pro achieved:

- **41.3% hard accuracy** — ranking #3 overall
- **3.25x improvement** over the base model's 12.7%
- All gains from feedback-augmented reasoning, not model changes

This was the first benchmark evaluation of the SuperInference framework, completed in December 2025.

## Diminishing returns validate the theory

The most interesting result is not the absolute score — it is the shape of the performance curve. Gains are sharply concentrated in the first 1-3 reasoning rounds:

- **Round 1**: Largest single improvement
- **Rounds 2-3**: Meaningful additional gains
- **Rounds 4+**: Diminishing returns — additional iterations provide minimal benefit

This pattern is exactly what the information-theoretic framework predicts. Expected Information Gain (EIG) is highest in early iterations when the agent has the most to learn, and drops rapidly as the belief state converges. The stopping criterion correctly identifies the transition from productive to unproductive iteration.

## Framework vs model

A critical distinction: SuperInference achieved this 3.25x improvement without changing the underlying model. The same Gemini 2.5 Pro model that scored 12.7% in single-shot mode scored 41.3% when wrapped in the PRE loop with critic-gated memory.

This demonstrates that the bottleneck for many tasks is not model capability — it is the reasoning architecture. A framework that knows when to iterate, what to remember, and when to stop can extract dramatically more performance from the same model.

## From DABStep to SWE-bench

The DABStep results motivated the development of AMI, which applies the SuperInference framework to autonomous software engineering. The same iterative reasoning, critic-gated memory, and information-theoretic stopping that produced a 3.25x improvement on data analysis tasks now produces #1 rankings across all four SWE-bench Live leaderboards.

The framework generalizes.
