---
title: "Solving Rust Issues with AMI: A SWE-bench Deep Dive"
subtitle: "How an AI agent handles ownership, lifetimes, and the borrow checker"
abstract: "Rust's strict type system and ownership model make it arguably the hardest language for AI agents. Here is how AMI's iterative approach tackles borrow checker errors, lifetime annotations, and trait bound constraints to achieve #1 on SWE-bench Live Rust."
date: "2026-06-25"
author: "Carlos Camacho-Gonzalez"
categories: ["Benchmarks"]
heroImage: "/blog/images/swebench-rust-deep-dive.jpg"
---

## Why Rust is hard for AI agents

Most programming languages let you write incorrect code that compiles. Rust does not. The borrow checker, lifetime annotations, and trait system enforce correctness constraints at compile time that catch entire categories of bugs — but they also mean that "close enough" code fails to compile.

For AI agents, this is a challenge. Single-shot code generation rarely satisfies all of Rust's constraints simultaneously. A fix that resolves one borrow checker error often introduces another.

## AMI's approach

AMI does not try to get Rust code right on the first attempt. Instead, it iterates:

1. **Plan**: Analyze the issue and identify the affected code paths
2. **Retrieve**: Pull the relevant modules, trait definitions, and type signatures
3. **Execute**: Apply a candidate fix
4. **Observe**: Run `cargo check` and parse the compiler output
5. **Iterate**: Use the compiler errors as observations to update the belief state

The key insight is that Rust's compiler errors are extraordinarily informative observations. A borrow checker error tells the agent exactly which lifetime is wrong and why. A trait bound error tells the agent which impl is missing. These are strong signals that dramatically reduce uncertainty in the PRE loop.

## The numbers

AMI solved 46 out of 94 Rust issues (48.9%) on SWE-bench Live. The runner-up — SWE-agent + Gemini3-Flash — solved 17 out of 45 issues (37.8%).

Two things stand out:

- **2.7x more problems solved** in absolute terms
- **Larger test set**: AMI evaluated on 94 instances versus the runner-up's 45, yet maintained a higher resolution rate

## Iteration depth

Hard Rust issues typically require 3-5 PRE loop iterations. The first attempt generates a structurally correct fix that often fails on borrow checking. Iterations 2-3 resolve ownership and lifetime issues. Iterations 4-5 handle edge cases in trait bounds and generic constraints.

Easy Rust issues — typo fixes, simple logic errors, straightforward API migrations — converge in 1-2 iterations. The information-theoretic stopping criterion correctly identifies these and avoids unnecessary computation.

## Critic-gated memory in action

Failed Rust fixes are particularly dangerous for context pollution. A fix that introduces a new borrow checker error could mislead subsequent attempts into thinking the original code structure is wrong. The critic gate prevents this: failed fixes do not enter memory, so each iteration starts with a clean context of only verified results.

## What Rust teaches us about AI agents

Rust's strict compiler is, paradoxically, an advantage for iterative agents. Languages with weak type systems give ambiguous feedback — tests might pass even with subtle bugs. Rust's compiler provides immediate, precise, and actionable feedback on every attempt. This is exactly the kind of strong observation signal that the PRE loop is designed to exploit.
