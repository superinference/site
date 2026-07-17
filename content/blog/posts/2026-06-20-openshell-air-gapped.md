---
title: "Running AMI in Air-Gapped Environments with OpenShell"
subtitle: "Sovereign AI deployment for regulated industries"
abstract: "OpenShell containers enable AMI deployment in fully disconnected networks — no CDN dependencies, no telemetry, no external calls. Here is how banks, government agencies, and defense contractors can run autonomous coding agents on-premise."
date: "2026-06-20"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/openshell-air-gapped.jpg"
---

## The problem

Regulated industries — banking, government, defense — cannot send code to external APIs. Their networks are air-gapped by design. Most AI coding agents assume internet connectivity: they download binaries from CDNs at boot, phone home for telemetry, and require cloud-hosted model APIs.

AMI was designed from the start to work without any of that.

## OpenShell architecture

The `openshell-ami` container image packages everything needed to run AMI autonomously:

- **Base**: Ubuntu Noble with Node.js 26, Python 3.14, build-essential, git
- **AMI binary**: Baked into the image at build time (~30 MB, Apache 2.0)
- **No runtime downloads**: Unlike agents that fetch binaries from CDNs at every boot, AMI is ready immediately

The image is available at `ghcr.io/superinference/openshell-ami` and weighs approximately 200-250 MB compressed.

## Air-gapped deployment steps

### 1. Mirror the image

Pull the image once from a connected network and push it to your internal registry:

```bash
podman pull ghcr.io/superinference/openshell-ami:latest
podman tag ghcr.io/superinference/openshell-ami:latest registry.internal/openshell-ami:latest
podman push registry.internal/openshell-ami:latest
```

### 2. Set up a local model

Use Ollama or vLLM on your internal network. AMI works with any OpenAI-compatible API:

```bash
ami --base-url http://ollama.internal:11434/v1 \
    --model llama-3.3-70b \
    --prompt "Fix the authentication bug in issue #42"
```

### 3. Pre-populate dependencies

For on-demand package installation without internet, create a PVC with Python wheels and npm tarballs:

```bash
pip download -d /pvc/python-cache -r requirements.txt
npm pack --pack-destination /pvc/npm-cache <package-name>
```

Mount the PVC into the container and configure pip/npm to use local sources.

## Security model

OpenShell enforces two security layers:

**Outer layer** — container-level isolation:
- Non-root user execution
- Read-only root filesystem
- Restricted volume mounts (`/sandbox` is the only writable path)
- Network policy: outbound filtered, inbound blocked
- Resource limits via cgroups (CPU, memory, disk)

**Inner layer** — AMI's permission system:
- 25 bash security validators with recursive descent AST parsing
- 4-tier command classification: safe, unsafe, destructive, hardline-blocked
- Environment scrubbing: 30+ patterns strip API keys from output
- Even with `--yolo`, fork bombs and `rm -rf /` are unconditionally blocked

## Kubernetes integration

For orchestrated deployments, OpenShell works with the kagenti operator:

```yaml
apiVersion: kagenti.dev/v1alpha1
kind: AgentRuntime
metadata:
  name: ami-worker
spec:
  image: registry.internal/openshell-ami:latest
  env:
    - name: AI_BASE_URL
      value: "http://ollama.internal:11434/v1"
```

The container exposes a startup probe at `/tmp/agent-ready` and produces structured JSONL output with semantic exit codes (0=success, 1=partial, 2=failed, 3=internal error, 4=timeout).

## Why sovereignty matters

The EU sovereign cloud strategy requires that AI systems processing European data remain under European jurisdiction. AMI's architecture — open source core, no telemetry, any-model support, air-gapped deployment — aligns directly with this mandate. Data never leaves your infrastructure.
