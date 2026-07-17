---
title: "Inside AMI v0.6: Architecture of an Autonomous Coding Agent"
subtitle: "45+ built-in tools, multi-provider routing, and the engineering behind the PRE loop"
abstract: "AMI v0.6 is the first full implementation of the SuperInference framework for autonomous software engineering. This post covers the architecture decisions behind its 45+ tool suite, multi-provider LLM support, and the engineering that connects the PRE loop to real-world repositories."
date: "2026-05-25"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/ami-v06-release.jpg"
---

## Architecture overview

AMI is a TypeScript engine that implements the complete PRE loop: planning, retrieval, execution, belief updates, and critic-gated memory. It surfaces through three interfaces — CLI (terminal REPL), VS Code extension, and OpenClaw plugin (in development) — all sharing the same core engine.

The key architectural decision was to make the engine model-agnostic from day one. AMI does not depend on any specific LLM provider's API shape. It speaks a normalized completion interface that adapts to OpenAI, Anthropic, Google, Groq, Mistral, Cerebras, DeepSeek, Ollama, OpenRouter, vLLM, LM Studio, and any OpenAI-compatible endpoint.

## The tool suite

v0.6 ships with 45+ built-in tools spanning the full development lifecycle:

- **File operations**: read, write, edit (exact-match string replacement), multi-edit (atomic multi-file changes)
- **Code search**: grep, glob, symbol search, workspace indexing (TypeScript, Python, Go, Rust, Java)
- **Execution**: bash with recursive descent AST parsing for security classification
- **Web access**: search and fetch for documentation lookup
- **Notebook editing**: Jupyter cell manipulation
- **Workflow orchestration**: multi-agent coordination, task management
- **Git integration**: structured commits, PR creation, branch management

The exact-match string replacement approach for file editing — rather than line-number-based patching — was a deliberate choice. Line numbers shift as edits accumulate during a session. String matching is stable across concurrent edits and makes the agent's intent explicit in the diff.

## Provider auto-detection

AMI detects your LLM provider from environment variables:

| Env var pattern | Provider |
|----------------|----------|
| `GOOGLE_API_KEY` (AIza...) | Google |
| `ANTHROPIC_API_KEY` (sk-ant-...) | Anthropic |
| `OPENAI_API_KEY` (sk-...) | OpenAI |
| `GROQ_API_KEY` (gsk_...) | Groq |
| `CEREBRAS_API_KEY` (csk-...) | Cerebras |

No configuration file needed. Set the env var, run `ami`, and the correct provider adapter loads automatically.

## FRITO integration

The cost-optimization layer routes through 7 permanent free-tier providers. In v0.6, FRITO is built into the engine rather than running as a separate proxy — it intercepts completion requests, selects the optimal provider based on the current quality tier, and handles rate-limit rotation transparently.

Teams running ASDLC pipelines with FRITO report 60-90% cost reductions while maintaining equivalent output quality for routine tasks.

## VS Code extension

The `superinference.ami-vscode` extension provides a monitoring surface for agent sessions. You can watch the PRE loop iterate in real-time, inspect tool calls, review proposed file changes before they are applied, and pause or redirect the agent at any point. The extension communicates with the CLI process over a local socket — no cloud service involved.

## What is next

v0.7 will focus on OpenClaw plugin support, expanded worktree isolation for parallel development, and deeper Kubernetes integration with the kagenti operator.
