---
title: "Inside the Challenge Runner: How AMI Solves 2,940 Coding Bugs"
subtitle: "The test harness behind SuperInference's core evaluation suite"
abstract: "The SuperInference challenge suite contains 2,940 challenges across 15 categories — from algorithms and cryptography to supply chain security and vulnerability remediation. This post covers the runner architecture, how challenges are structured, and how results are collected for analysis."
date: "2026-06-12"
author: "Carlos Camacho-Gonzalez"
categories: ["Engineering"]
heroImage: "/blog/images/challenge-runner-internals.jpg"
---

## Why 2,940 challenges

SWE-bench measures an agent's ability to fix real bugs in real repositories. But SWE-bench only covers Python, and its instances come from a narrow slice of software engineering: bug reports on popular open-source projects.

The core challenge suite fills the gaps. It covers 15 categories of software engineering work:

- **Algorithms** — sorting, graph traversal, dynamic programming
- **Code analysis** — static analysis, AST manipulation, linting
- **Cryptography and signing** — hash verification, certificate chains, key management
- **Database** — query optimization, schema migrations, connection pooling
- **Data science** — data cleaning, statistical analysis, visualization
- **DevOps** — CI/CD pipelines, container orchestration, monitoring
- **Functional programming** — immutability, higher-order functions, monads
- **Secure development** — input validation, authentication, authorization
- **Security** — penetration testing patterns, security auditing
- **Software development** — refactoring, API design, error handling
- **Supply chain security** — license compliance, patch engineering, dependency auditing
- **System design** — distributed systems, caching strategies, message queues
- **Testing** — unit tests, integration tests, property-based testing
- **Vulnerability remediation** — CVE fixes, security patches
- **Web development** — frontend, backend, full-stack tasks

Each category tests a different facet of software engineering capability. An agent that excels at algorithms might struggle with DevOps; one that handles database migrations well might fail at cryptography. The breadth of the suite reveals these capability profiles.

## Challenge structure

Every challenge lives in its own directory with a standardized layout:

```
challenges/algorithms/sorting/0042-merge-intervals/
├── challenge.json      # metadata: description, test count, difficulty
├── solution.ts         # the code AMI must fix or implement
├── solution.test.ts    # test file that validates the solution
└── results/            # populated after AMI runs
    └── ami-gemini-2.5-pro.json
```

The `challenge.json` file defines the task:

```json
{
  "id": 42,
  "category": "algorithms",
  "subcategory": "sorting",
  "title": "Merge Overlapping Intervals",
  "description": "Given a list of intervals, merge all overlapping intervals...",
  "difficulty": "medium",
  "testsTotal": 12
}
```

The `testsTotal` field is the ground truth. After AMI runs, the runner executes the test suite and compares the number of passing tests against this value. A challenge is "passed" if and only if all expected tests pass.

## The runner pipeline

The `run-challenge.sh` script orchestrates the evaluation:

```
1. Parse arguments and environment
2. Copy challenge workspace to temp directory
3. Launch AMI with the challenge description as prompt
4. Capture AMI's structured JSON output (turns, tokens, tool calls)
5. Run test suite: node --import tsx --test solution.test.ts
6. Parse test results (node:test spec reporter format)
7. Compare against testsTotal from challenge.json
8. Write result JSON
```

Step 5 uses Node.js's built-in test runner with tsx for TypeScript support. The runner parses the spec reporter output to extract pass/fail counts:

```bash
PASS_LINE=$(echo "$TEST_OUTPUT" | grep -oP "^ℹ pass \K\d+" || echo "")
FAIL_LINE=$(echo "$TEST_OUTPUT" | grep -oP "^ℹ fail \K\d+" || echo "")
```

This is deliberately simple. The test runner is not part of what we are evaluating — it is a harness that must be reliable and transparent.

## Result schema

Every completed challenge produces a JSON file with comprehensive metrics:

```json
{
  "runner": "ami",
  "model": "gemini-2.5-pro",
  "provider": "google",
  "frito": true,
  "timestamp": "2026-06-12T14:23:01.000Z",
  "testsPass": 12,
  "testsTotal": 12,
  "turns": 8,
  "toolCalls": 23,
  "filesModified": 1,
  "elapsedMs": 45200,
  "tokens": {
    "prompt": 18420,
    "completion": 3891,
    "total": 22311
  },
  "estimatedCost": 0.00,
  "behavior": {
    "fileReads": 4,
    "fileEdits": 3,
    "fileEditErrors": 0,
    "bashCalls": 6,
    "bashErrors": 1,
    "webSearches": 0,
    "providerRotations": 2
  },
  "passed": true
}
```

The `behavior` block is unique to our evaluation framework. It captures not just whether AMI solved the task, but how it solved it. An agent that reads 4 files, makes 3 edits with no errors, and runs 6 bash commands (1 error) tells a different story than one that reads 20 files, makes 15 edits with 8 errors, and runs 40 bash commands.

## Running the full suite

The parallel runner dispatches challenges across workers:

```bash
FRITO=1 PARALLEL=5 SKIP_EXISTING=1 \
  ./run-all.sh
```

With 2,940 challenges and an average solve time of 45 seconds, a 5-worker sweep takes roughly 7.5 hours. The `SKIP_EXISTING` flag makes it resumable — if the process is interrupted, rerunning picks up where it left off.

## Analyzing results

After a sweep, the results directory contains one JSON file per challenge per model configuration. A simple analysis script aggregates pass rates by category:

```bash
for cat in algorithms database security testing; do
  total=$(find challenges/$cat -name "ami-*.json" | wc -l)
  passed=$(find challenges/$cat -name "ami-*.json" \
    -exec jq -r 'select(.passed) | .passed' {} \; | wc -l)
  echo "$cat: $passed/$total ($(( passed * 100 / total ))%)"
done
```

Typical capability profiles show clear patterns:

| Category | Pass rate | Notes |
|----------|-----------|-------|
| Algorithms | 78% | Strong on standard problems, weaker on graph theory |
| Database | 72% | Good at queries, struggles with migration edge cases |
| Security | 65% | Solid on common patterns, misses subtle vulnerabilities |
| Supply chain | 58% | License parsing is hard for LLMs |
| DevOps | 61% | Docker/CI config is model-dependent |

These profiles drive development priorities. A low score in a category means either AMI's tools are insufficient for that domain, or the prompting strategy needs refinement.

## Behavioral analysis

Beyond pass/fail, the behavioral metrics reveal efficiency patterns:

- **Turns per solve** — how many reasoning cycles AMI needs. Lower is better for cost and latency.
- **Edit error rate** — `fileEditErrors / fileEdits`. High ratios suggest the model is guessing rather than understanding.
- **Bash error rate** — `bashErrors / bashCalls`. High ratios indicate unfamiliarity with the toolchain.
- **Provider rotations** — in FRITO mode, frequent rotations suggest the primary provider's context window or output quality is insufficient.

We track these metrics across releases to ensure that improvements in pass rate do not come at the cost of efficiency. An agent that solves 5% more challenges but takes 3x more turns is not necessarily an improvement.

## Adding new challenges

The challenge format is designed for easy extension. To add a new challenge:

1. Create a directory under the appropriate category
2. Write `challenge.json` with the task description and expected test count
3. Write `solution.ts` with the initial (broken or incomplete) code
4. Write `solution.test.ts` with comprehensive tests
5. Verify that the tests fail on the initial code and pass on a correct solution

The test-first approach ensures that challenges are unambiguous: the tests define the specification, and AMI's job is to make them pass.
