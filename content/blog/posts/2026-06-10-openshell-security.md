---
title: "Two-Layer Security: How OpenShell Protects Your Code"
subtitle: "Container isolation meets intelligent command classification"
abstract: "OpenShell enforces security at two layers: container-level isolation (non-root, read-only rootfs, network policy) and AMI's permission system (25 bash validators, 4-tier command classification, hardline blocks). Even with --yolo enabled, fork bombs and rm -rf / are unconditionally blocked."
date: "2026-06-10"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/openshell-security.jpg"
---

## Why two layers

A single security boundary is a single point of failure. If an AI agent finds a way around container isolation, your code is exposed. If the agent's permission system has a gap, the container is all that stands between the agent and your host system.

OpenShell enforces both — defense in depth.

## Outer layer: container isolation

The `openshell-ami` container image enforces:

- **Non-root execution**: The agent runs as an unprivileged user
- **Read-only root filesystem**: System files cannot be modified
- **Restricted mounts**: Only `/sandbox` is writable
- **Network policy**: Outbound traffic is filtered, inbound traffic is blocked
- **Resource limits**: CPU, memory, and disk are constrained via cgroups
- **SPIFFE/mTLS identity**: Sidecar-injected certificates for service-to-service authentication

## Inner layer: AMI permission system

AMI's 25 bash security validators use a recursive descent AST parser to analyze the full structure of every shell command before execution. Commands are classified into four tiers:

1. **Safe**: Read-only operations (ls, cat, grep, find). Auto-approved.
2. **Unsafe**: Write operations (git commit, npm install). Require approval unless `--yolo` is active.
3. **Destructive**: Operations that could cause data loss (rm -rf, git reset --hard). Require explicit confirmation even with `--yolo`.
4. **Hardline-blocked**: Unconditionally blocked regardless of any setting.

### Hardline blocks

Even with `--yolo` (auto-approve all), the following patterns are unconditionally blocked:

- Fork bombs (`:(){ :|:& };:`)
- `rm -rf /` and variants
- 19 additional destructive patterns covering disk wipe, process table exhaustion, and privilege escalation

These are not configurable. They cannot be overridden.

## Environment scrubbing

AMI applies 30+ regex patterns to strip API keys, tokens, and secrets from command output before it enters the agent's context. This prevents the common attack vector where an agent inadvertently leaks credentials in a subsequent LLM call.

Patterns cover AWS keys, GitHub tokens, Anthropic/OpenAI API keys, database connection strings, and common secret formats.

## Kubernetes integration

For orchestrated deployments, OpenShell containers expose a startup probe at `/tmp/agent-ready` and produce structured JSONL output with semantic exit codes. The kagenti operator manages lifecycle, resource limits, and audit logging at the cluster level.
