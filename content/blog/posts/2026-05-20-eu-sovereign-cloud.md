---
title: "Building AI Agents for the EU Sovereign Cloud"
subtitle: "Why data sovereignty matters for autonomous coding tools"
abstract: "The EU sovereign cloud strategy requires that AI systems processing European data remain under European jurisdiction. AMI is designed from the ground up for this constraint: open source, no telemetry, any-model support, and air-gapped deployment."
date: "2026-05-20"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/eu-sovereign-cloud.jpg"
---

## The sovereignty requirement

When a developer in Frankfurt asks an AI agent to fix a bug in their banking application, the code — including proprietary business logic, security implementations, and customer data patterns — flows through the agent's context. Where does that context go?

With most commercial AI coding tools, the answer is: to a cloud API operated by a US company, processed on infrastructure outside European jurisdiction. For many regulated industries, this is a compliance violation.

## AMI's sovereignty architecture

AMI addresses this with four architectural decisions:

### Open source core

The AMI engine is released under Apache 2.0. Organizations can audit every line of code that touches their data. No proprietary binaries, no obfuscated logic, no trust-us-it-is-safe assurances.

### No telemetry

AMI sends zero telemetry. No usage analytics, no crash reports, no "anonymous" data collection. The agent communicates only with the LLM provider you configure — and if that provider runs on your own infrastructure, data never leaves your network.

### Any model, any provider

AMI works with Ollama, vLLM, LM Studio, or any OpenAI-compatible API endpoint. Run an open-weight model on your own GPUs and AMI connects to it the same way it connects to a cloud API. No vendor lock-in, no provider dependency.

### Air-gapped deployment

The OpenShell container image includes everything needed to run AMI. No runtime downloads, no CDN dependencies. Mirror the image to your internal registry, point AMI at your local model server, and the system operates in a fully disconnected network.

## EU funding

This work is partially supported by EU Horizon Europe grant agreement No 101093129, reflecting the European Union's investment in sovereign AI infrastructure. The Spanish Ministry of Science and the Region of Madrid provide additional funding.

## Practical deployment

A typical sovereign deployment looks like this:

1. Mirror `ghcr.io/superinference/openshell-ami:latest` to your internal registry
2. Deploy Ollama or vLLM with an open-weight model (Llama 3.3-70B, Qwen, Mistral)
3. Configure AMI: `--base-url http://model-server.internal:11434/v1`
4. Mount your repository at `/sandbox`
5. Run with `--prompt "Fix issue #42"` and `--yolo` for headless execution

Code stays on your infrastructure. Model inference stays on your infrastructure. Audit logs stay on your infrastructure. Full compliance with data residency requirements.
