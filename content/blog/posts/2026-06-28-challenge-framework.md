---
title: "87 Challenges: How We Evaluate AMI"
subtitle: "A structured evaluation suite spanning the full SDLC"
abstract: "The AMI challenge framework includes 87 tasks across five categories — single-file bugs, multi-file refactors, code generation, performance optimization, and API migration. Here is how we built it and what it tells us about agent capabilities."
date: "2026-06-28"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering", "Benchmarks"]
heroImage: "/blog/images/challenge-framework.jpg"
---

## Beyond benchmarks

Public benchmarks like SWE-bench are essential for comparing agents, but they do not tell you everything. They test on a specific distribution of issues from specific repositories. Your codebase has different patterns, different languages, different complexity profiles.

The AMI challenge framework complements public benchmarks with a structured, controlled evaluation suite.

## Five task categories

### Single-file bug fixes

The simplest category: a single file has a bug, the test suite catches it, fix the file. These test basic code understanding and the edit-test cycle. Most agents handle these well. AMI solves them in 1-2 PRE loop iterations.

### Multi-file refactors

A change that spans multiple files — renaming a function and updating all call sites, extracting a shared utility, or migrating an import path. These test the agent's ability to understand code relationships and make coordinated changes.

### Code generation from specification

Given a natural language specification (or a failing test), generate the implementation from scratch. These test the agent's planning and code generation capabilities without the scaffolding of existing code to modify.

### Performance optimization

A correct implementation that is too slow. The agent must profile, identify the bottleneck, and optimize without breaking functionality. These test the agent's ability to reason about algorithmic complexity and system performance.

### API migration

Migrate from v2 to v3 of a library, update deprecated function calls, or adapt to a breaking change in a dependency. These test the agent's ability to read documentation, understand API differences, and apply systematic transformations.

## Container-based evaluation

Challenges run inside OpenShell containers for isolation and reproducibility. Each challenge has:

- A repository with the issue pre-staged
- A test suite that fails on the broken code and passes on the fix
- A time limit appropriate to the task complexity
- Semantic exit code evaluation (0=pass, 1=partial, 2=fail)

## What we have learned

The challenge framework has revealed several patterns:

1. **Iteration depth correlates with task category**: Single-file bugs converge in 1-2 rounds. Multi-file refactors take 3-5. API migrations can take 6-8 as the agent discovers transitive dependencies.

2. **Critic rejection prevents regression**: On multi-file refactors, the critic frequently rejects intermediate states where one file is updated but its dependents are not. This prevents the common failure mode of partial refactors.

3. **Model choice matters less than framework**: Across the challenge suite, the performance gap between models is smaller than the gap between iterative and single-shot approaches. The framework amplifies the base model's capabilities more than switching to a more capable model does.

## Evaluating with FRITO

The challenge framework runs across multiple models using FRITO's multi-provider routing. This allows cost-efficient evaluation across model families, comparing performance at each quality tier.
