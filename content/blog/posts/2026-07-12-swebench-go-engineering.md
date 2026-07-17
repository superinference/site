---
title: "Engineering the SWE-bench Go Pipeline: Docker, Evaluation, and Retry Strategies"
subtitle: "How we built the infrastructure to evaluate AMI on Go repositories"
abstract: "SWE-bench Live MultiLang Go brings real-world bug fixing to the Go ecosystem. This post covers the engineering behind our evaluation pipeline — Docker-based isolation, the official evaluation harness, retry strategies for flaky instances, and the operational patterns that took us to the top of the leaderboard."
date: "2026-07-12"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/swebench-go-engineering.jpg"
---

## Why Go needs its own pipeline

SWE-bench's original Python pipeline relies on conda environments, pip installs, and Python-specific test runners. None of that applies to Go. Go repositories use `go test`, have different dependency management (`go.mod`), and often require system-level dependencies (CGo libraries, protocol buffer compilers) that are not available in a standard Python evaluation environment.

We built a dedicated Go pipeline from scratch. The design goals were:

1. **Docker isolation** — every instance runs in its own container with a clean filesystem
2. **Official evaluation** — patches are evaluated using SWE-bench Live's `evaluation.py`, not custom test logic
3. **Resumability** — interrupted sweeps pick up where they left off
4. **Single-instance evaluation** — test a patch immediately without waiting for the full batch

## The Docker execution model

Each instance runs inside a Docker container with a controlled environment:

```bash
docker run --rm \
  --name "$CONTAINER_NAME" \
  --shm-size=5g \
  --tmpfs /dev/shm:rw,nosuid,nodev,exec,size=5g \
  -v "$AMI_BINARY:/usr/local/bin/ami:ro" \
  -v "$HOME/.config/gcloud:/root/.config/gcloud:ro" \
  -v "$STAGING_DIR:/staging:ro" \
  -v "$RESULTS_DIR:/results" \
  -w /testbed \
  "$DOCKER_IMAGE" \
  /bin/bash /staging/entrypoint.sh
```

Key design decisions:

- **`--shm-size=5g`** — Go's test runner uses shared memory for parallel test execution. The default 64MB causes crashes on large test suites.
- **`--tmpfs /dev/shm`** — writable, executable temp filesystem for Go's build cache and test binaries.
- **AMI binary mounted read-only** — the agent itself is a static binary, mounted into the container rather than installed. This keeps the container image stable across AMI releases.
- **gcloud credentials mounted** — for Vertex AI authentication when using Claude via Google Cloud.
- **Working directory `/testbed`** — the repository checkout where AMI operates.

The staging directory contains the entrypoint script, instance metadata, and any pre-computed environment setup. It is mounted read-only so AMI cannot accidentally modify the harness.

## Instance preparation

Before AMI touches the code, the pipeline prepares the environment:

1. **Clone from JSONL** — the instance dataset contains the repository URL, base commit, and problem statement
2. **Checkout base commit** — reset to the exact commit where the bug was reported
3. **Install dependencies** — `go mod download`, plus any system packages listed in the instance metadata
4. **Verify tests fail** — run the failing test to confirm the bug reproduces in this environment
5. **Launch AMI** — with the problem statement as prompt, MAX_TURNS=200, and full YOLO permissions

Step 4 is crucial. If the test does not fail before AMI runs, we cannot distinguish between "AMI fixed the bug" and "the bug was not reproducible." Instances where the base test passes are flagged for manual review.

## Patch extraction

AMI works by editing files in the working directory. After it finishes (or exhausts its turn budget), the pipeline extracts the diff:

```bash
cd /testbed
git diff HEAD > /results/ami-${MODEL_SLUG}-diff.patch
```

This raw diff is the submission artifact. It captures every change AMI made, regardless of whether those changes are correct. The evaluation step determines correctness separately.

## The evaluation harness

Evaluation uses the official SWE-bench Live evaluation script, which runs inside its own Docker container:

```bash
python3 -m evaluation.evaluation \
  --dataset SWE-bench-Live/MultiLang \
  --split go \
  --platform linux \
  --patch_dir "$TEMP_PREDS" \
  --output_dir "$OUTPUT_DIR"
```

The evaluation script:

1. Starts a fresh Docker container with the repository at the base commit
2. Applies the submitted patch
3. Runs the test suite
4. Checks whether the previously failing tests now pass
5. Checks whether any previously passing tests now fail (regression check)

A patch is "resolved" only if it fixes the failing tests without breaking anything else. This is more strict than our core challenge suite, which only checks that all expected tests pass.

## Single-instance evaluation

Waiting for a full batch to evaluate is slow. The `evaluate-instance.sh` script lets you test one patch immediately:

```bash
./evaluate-instance.sh golang/go__12345 claude-opus-4-6
```

This builds a single-entry `preds.json`, runs the official evaluation, and reports the result. The feedback loop is critical during development — you can run AMI on an instance, evaluate the patch, and iterate on AMI's prompting or tooling within minutes.

## Retry strategies for hard instances

Some instances require multiple attempts. The retry script identifies failed instances and reruns them with different configurations:

```bash
./retry-iteration.sh
```

The retry strategy varies by failure mode:

**Turn budget exhaustion** — the instance was too complex for 200 turns. Retry with `MAX_TURNS=300` or a more capable model.

**Test timeout** — Go tests have their own timeouts. Some test suites need `go test -timeout 600s` instead of the default 30 seconds. The retry script detects timeout failures and adjusts.

**Flaky tests** — some repository tests are inherently flaky (race conditions, network dependencies). These are identified by running evaluation multiple times on the gold patch. If the gold patch itself fails intermittently, the instance is flagged as flaky and excluded from the leaderboard.

**Model-specific failures** — certain instances are solvable by one model but not another. The retry script can switch models:

```bash
AI_MODEL=claude-opus-4-6 AI_PROVIDER=anthropic \
  ./run-instance.sh golang/go__12345
```

## Monitoring a Go sweep

The Go pipeline includes a monitoring script that provides real-time progress:

```bash
./monitor.sh
```

Output shows completed/total instances, pass rate, average solve time, and any instances currently running. For large sweeps (100+ instances), this runs in a separate terminal alongside the main runner.

Key metrics we track during a sweep:

- **Completion rate** — what percentage of instances finished (vs timed out or errored)
- **Pass rate** — of completed instances, how many produced a valid patch
- **Resolution rate** — of valid patches, how many pass official evaluation
- **Average turns** — efficiency metric, lower is better
- **P95 solve time** — identifies instances that are disproportionately expensive

## Operational patterns

Running competitive on SWE-bench Go requires more than a good agent. The operational patterns matter:

**Bare repo mirrors** — cloning from GitHub for every instance is slow and fragile. We maintain local bare mirrors of all repositories in the dataset. Each instance clones from the mirror (local disk speed) and only fetches from GitHub if the required commit is missing.

**Results caching** — every result is keyed by `(instance_id, model_slug)`. Reruns with the same configuration skip existing results. Reruns with a different model produce a separate result file, enabling cross-model comparison.

**Batch submission** — the `generate-submission.sh` script collects all patches into the format required by the SWE-bench leaderboard:

```bash
./generate-submission.sh  # outputs submission/preds.json
```

This aggregates every `*-diff.patch` file across all instance result directories into a single JSON file ready for upload.

## What we learned

Building the Go pipeline taught us several lessons that apply beyond Go:

1. **Isolation is non-negotiable.** Early experiments without Docker had instances polluting each other's Go module caches, causing bizarre failures.

2. **Official evaluation is the only evaluation that matters.** Our internal test runner caught 90% of cases but missed regression checks. The leaderboard uses official evaluation, so we must too.

3. **Retry budgets pay for themselves.** Giving hard instances a second attempt with a higher turn budget added 3-4 percentage points to our resolution rate at modest cost.

4. **Monitor everything.** The first sweep had a silent failure mode where Docker containers ran out of disk space. Without monitoring, we would have waited 12 hours for results that never came.
