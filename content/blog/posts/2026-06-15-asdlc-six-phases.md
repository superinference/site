---
title: "ASDLC: Rethinking the Software Development Lifecycle with AI Agents"
subtitle: "From AI-assisted development to AI-led development"
abstract: "The Agentic Software Development Lifecycle (ASDLC) is a practice where AI agents participate meaningfully across all six SDLC phases — planning, coding, reviewing, testing, deploying, and monitoring. The developer sets intent; the agent handles the workflow."
date: "2026-06-15"
author: "Carlos Camacho-Gonzalez"
categories: ["Research"]
heroImage: "/blog/images/asdlc-six-phases.jpg"
---

## Beyond code completion

Most AI coding tools operate at the keystroke level: you type a few characters, the tool suggests a completion. This is useful, but it is fundamentally a productivity aid — the developer still drives every decision.

ASDLC shifts the operating unit from a keystroke to a repository, a feature, or an entire workflow. The developer sets the intent ("fix issue #42", "add OAuth support", "migrate from v2 to v3 of this API") and the agent handles the multi-step workflow required to deliver it.

## The six phases

### 1. Plan

AMI enters read-only plan mode: it explores the codebase, decomposes the task into subgoals, and presents a structured plan for approval. Tools used include workspace indexing across TypeScript, Python, Go, Rust, and Java, plus grep, glob, and symbol search.

The developer reviews the plan and redirects if needed. This is where intent alignment happens — before any code is written.

### 2. Code

Repository-level implementation using exact-match string replacement (not line-number-based patching, which breaks on concurrent edits). AMI supports atomic multi-file edits and a checkpoint system for undo. For parallel development across features, worktree isolation ensures changes do not conflict.

### 3. Review

Two review layers run in sequence:

- **PRE loop Critic**: The same critic-gated feedback mechanism used during reasoning. Positive predictive value of approximately 0.977.
- **Structured review skills**: Code review (correctness bugs), security review (OWASP top 10), and simplification (reuse, efficiency, dead code). Reviews can post inline PR comments or apply fixes directly.

### 4. Test

AMI runs the project's test suite, interprets failures, fixes the code, and re-runs until tests pass. It parses output from Node.js test runners, TAP format, and pytest. LSP integration provides real-time type checking feedback during the edit cycle.

### 5. Deploy

Detached mode (`--prompt`) runs AMI headlessly with structured JSONL output and semantic exit codes:

- `0` — success
- `1` — partial completion
- `2` — task failed
- `3` — internal error
- `4` — timeout

This integrates directly with CI/CD pipelines: the exit code drives the pipeline's next step.

### 6. Monitor

FRITO tracks cost and usage across providers. Session persistence supports multi-day workflows. Cron-based scheduling enables recurring tasks like nightly code review or dependency update checks.

## The decision engine

Each phase is backed by the same SuperInference POMDP (Partially Observable Markov Decision Process):

- **Hidden state**: "Is the code correct?" — unknown until tests run
- **Observations**: Test results, compiler output, linter warnings
- **Belief tracking**: Scalar confidence that the task is complete, updated after every observation
- **Stopping signal**: Expected Information Gain drops below threshold

This means AMI applies the same principled reasoning — when to continue, when to stop — whether it is planning, coding, reviewing, or testing. The framework does not special-case any phase.

## 45+ built-in tools

AMI ships with tools spanning all six phases: file operations, code search, execution, web access, notebook editing, workflow orchestration, task management, git integration, and more. No plugins to install, no tool configuration. The agent selects the appropriate tool for each step of the workflow.

## Evaluation

The challenge framework includes 87 tasks spanning SDLC categories: single-file bug fixes, multi-file refactors, code generation from specification, performance optimization, and API migration. These challenges evaluate not just whether the agent can write code, but whether it can participate in the full lifecycle — from understanding the task to validating the solution.
