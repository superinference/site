export const timelineEvolution = `flowchart TD
  Bench["Static Benchmarks<br/>(MMLU, SuperGLUE)"]
  Human["Human-Centric<br/>Evaluation"]
  Dynamic["Dynamic &amp; Adversarial<br/>Evaluation<br/>(HELM, PromptBench)"]
  Comp["Comparative &amp;<br/>Pairwise Evaluation"]
  Noise["Uncertainty, Calibration<br/>&amp; Information-Theoretic<br/>Metrics"]
  Agent["Agentic LLM<br/>Architectures<br/>(CoT, ReAct, RAG)"]
  Super["SuperInference<br/>Feedback-Augmented<br/>Reasoning Framework"]

  Bench -->|limitations| Human
  Human -->|scalability gap| Dynamic
  Dynamic -->|complementary| Comp
  Comp -->|parallel strand| Noise
  Noise -->|convergence| Agent
  Agent -->|formalization| Super

  style Bench fill:#1e3a5f,color:#ffffff
  style Human fill:#2d5a3d,color:#ffffff
  style Dynamic fill:#5a4a1e,color:#ffffff
  style Comp fill:#8b5a2b,color:#ffffff
  style Noise fill:#5a3d7a,color:#ffffff
  style Agent fill:#2d5a5a,color:#ffffff
  style Super fill:#8b2d2d,color:#ffffff
`;

export const preArchitecture = `flowchart TD
  Event["Event e_t<br/>(spike)"]
  Planner["Planner<br/>(policy π, belief b_t)"]
  Retriever["Retriever<br/>(action space 𝒜)"]
  Memory["External Memory<br/>M_t"]
  Executor["Executor<br/>(action space 𝒜)"]
  Critic["Critic<br/>(𝒵, α, β)"]

  Event -->|triggers| Planner
  Planner -->|query q_t| Retriever
  Retriever <-->|read/write| Memory
  Retriever -->|context m̃_t| Executor
  Executor -->|candidate a_t| Critic
  Critic -->|"c_t: approve/reject"| Memory
  Critic -.->|"feedback o_{t+1}"| Planner

  style Event fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style Planner fill:#1e3a5f,color:#ffffff
  style Retriever fill:#8b5a2b,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
  style Executor fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
`;

export const eventDrivenStages = `flowchart TD
  E0["Event e₀"]
  Obs["Observation:<br/>Receive task x"]
  Task["Task x: 50 students,<br/>40% are men. If 10 men leave,<br/>how many remain?"]

  E1["Event e₁"]
  Plan["Planner decomposes<br/>task into queries"]
  SQ1["q₀: How many men<br/>originally? (50 × 0.4)"]
  SQ2["q₁: After 10 leave,<br/>how many remain?"]

  E2["Event e₂"]
  Ret1["Retriever<br/>m̃₀ ~ C_η"]
  Exec1["Executor → a₀"]
  SA1["a₀ = 20 men"]
  Crit1["Critic → c₀"]

  Ret2["Retriever<br/>m̃₁ from M₁"]
  Exec2["Executor → a₁"]
  SA2["a₁ = 10 men<br/>(20 − 10)"]
  Crit2["Critic → c₁"]

  Mem["Memory M_{t+1}<br/>= M_t ∪ {(q_t, a_t)}"]

  E0 -->|triggers| Obs
  Obs --> Task
  E1 -->|triggers| Plan
  Plan --> SQ1
  Plan --> SQ2
  E2 -->|triggers| SQ2
  SQ1 --> Ret1
  Ret1 --> Exec1
  Exec1 --> SA1
  SA1 --> Crit1
  SQ2 --> Ret2
  Ret2 --> Exec2
  Exec2 --> SA2
  SA2 --> Crit2
  Crit1 -->|"c₀ = approve"| Mem
  Crit2 -->|"c₁ = approve"| Mem
  Crit1 -.->|"if rejected: retry"| Plan

  style E0 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style E1 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style E2 fill:#cc0000,stroke:#ff6666,stroke-width:3px,color:#ffffff
  style Plan fill:#1e3a5f,color:#ffffff
  style Mem fill:#5a5a1e,color:#ffffff
  style Ret1 fill:#8b5a2b,color:#ffffff
  style Ret2 fill:#8b5a2b,color:#ffffff
  style Exec1 fill:#2d5a3d,color:#ffffff
  style Exec2 fill:#2d5a3d,color:#ffffff
  style Crit1 fill:#5a3d7a,color:#ffffff
  style Crit2 fill:#5a3d7a,color:#ffffff
`;

export const preLoop = `flowchart TD
  Planner["Planner<br/>(policy π)"]
  Retriever["Retriever"]
  Executor["Executor"]
  Critic["Critic<br/>(α, β)"]
  Memory["Memory M_t"]

  Planner -->|"query q_t"| Retriever
  Retriever -->|"context m̃_t"| Executor
  Executor -->|"candidate a_t"| Critic
  Critic -->|"c_t → update M_{t+1}"| Memory
  Memory -.->|"observation o_{t+1}"| Planner

  style Planner fill:#1e3a5f,color:#ffffff
  style Retriever fill:#8b5a2b,color:#ffffff
  style Executor fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
`;

export const noisyRetrieval = `flowchart TD
  Query["Planner query<br/>q_t"]
  Channel["Retrieval channel<br/>C_η"]
  Context["Context<br/>m̃_t ~ C_η(m_t)"]
  Exec["Executor<br/>→ a_t"]
  Critic["Critic<br/>(α, β)"]
  PPV["PPV:<br/>P(correct|approve)"]
  Memory["Memory<br/>M_{t+1}"]

  Query --> Channel
  Channel -->|"noise η, p(η)"| Context
  Context --> Exec
  Exec -->|"candidate a_t"| Critic
  Critic --> PPV
  PPV -->|"approve"| Memory
  Critic -.->|"reject"| Query

  style Query fill:#1e3a5f,color:#ffffff
  style Channel fill:#8b5a2b,color:#ffffff
  style Context fill:#2d5a5a,color:#ffffff
  style Exec fill:#2d5a3d,color:#ffffff
  style Critic fill:#5a3d7a,color:#ffffff
  style PPV fill:#5a3d7a,color:#ffffff
  style Memory fill:#5a5a1e,color:#ffffff
`;

export const vscodeChart = `flowchart TD
  UI["UI<br/>(Developer Interface)"]
  VSCode["VS Code<br/>Extension"]
  CLI["CLI<br/>(Terminal REPL)"]
  OpenClaw["OpenClaw<br/>Plugin"]
  Engine["Core Engine<br/>(TypeScript, PRE loop,<br/>belief updates, memory)"]
  Tools["15 Built-in Tools<br/>(file ops, search,<br/>execution, web)"]
  Codebase["Codebase<br/>(Files)"]
  DABStep["DABStep<br/>(Benchmark)"]

  UI --> VSCode
  UI --> CLI
  UI --> OpenClaw
  VSCode --> Engine
  CLI --> Engine
  OpenClaw --> Engine
  Engine --> Tools
  Engine --> Codebase
  Engine --> DABStep
  Codebase -.->|"context"| Engine
  DABStep -.->|"ground-truth<br/>verifiers"| Engine

  style UI fill:#1e3a5f,color:#ffffff
  style VSCode fill:#8b5a2b,color:#ffffff
  style CLI fill:#8b5a2b,color:#ffffff
  style OpenClaw fill:#8b5a2b,color:#ffffff
  style Engine fill:#2d5a3d,color:#ffffff
  style Tools fill:#5a3d7a,color:#ffffff
  style Codebase fill:#5a5a1e,color:#ffffff
  style DABStep fill:#7a3d5a,color:#ffffff
`;

export const asdlcOverview = `flowchart TD
  Plan["Plan<br/>(Spec & Design)"]
  Code["Code<br/>(Implementation)"]
  Review["Review<br/>(Agent + Human)"]
  Test["Test<br/>(Verification)"]
  Deploy["Deploy<br/>(CI/CD)"]
  Monitor["Monitor<br/>(Feedback)"]

  Plan -->|"decompose"| Code
  Code -->|"submit"| Review
  Review -->|"validate"| Test
  Test -->|"release"| Deploy
  Deploy -->|"observe"| Monitor
  Monitor -->|"iterate"| Plan

  style Plan fill:#1e3a5f,color:#ffffff
  style Code fill:#2d5a3d,color:#ffffff
  style Review fill:#5a3d7a,color:#ffffff
  style Test fill:#8b5a2b,color:#ffffff
  style Deploy fill:#2d5a5a,color:#ffffff
  style Monitor fill:#8b2d2d,color:#ffffff
`;

export const asdlcBeliefFlow = `flowchart LR
  Start["Task Received<br/>b₀ = 0.25"]
  Explore["Explore Codebase<br/>b₁ = 0.35"]
  Plan["Plan Approach<br/>b₂ = 0.45"]
  Impl["Implement<br/>b₃ = 0.55"]
  TestFail["Tests Fail<br/>b₄ = 0.40"]
  Fix["Fix &amp; Retry<br/>b₅ = 0.60"]
  TestPass["Tests Pass<br/>b₆ = 0.85"]
  Done["EIG &lt; 0.01<br/>b₇ = 0.92 STOP"]

  Start --> Explore
  Explore --> Plan
  Plan --> Impl
  Impl --> TestFail
  TestFail -->|"critic rejects"| Fix
  Fix --> TestPass
  TestPass --> Done

  style Start fill:#8b2d2d,color:#ffffff
  style Explore fill:#8b5a2b,color:#ffffff
  style Plan fill:#5a5a1e,color:#ffffff
  style Impl fill:#2d5a3d,color:#ffffff
  style TestFail fill:#8b2d2d,color:#ffffff
  style Fix fill:#8b5a2b,color:#ffffff
  style TestPass fill:#2d5a5a,color:#ffffff
  style Done fill:#1e3a5f,color:#ffffff
`;

export const asdlcPipeline = `flowchart TD
  Trigger["Git Push / PR"]
  GHA["CI Pipeline<br/>(GitHub Actions)"]
  Pull["Pull OpenShell<br/>Container Image"]
  PlanAgent["Plan Agent<br/>(analyze diff, scope)"]
  CodeAgents["Code Agents<br/>(parallel worktrees)"]
  ReviewAgent["Review Agent<br/>(code-review skill)"]
  TestAgent["Test Agent<br/>(run suite, verify)"]
  FRITO["FRITO Router<br/>(13 providers,<br/>cost-optimized)"]
  Output["Structured Output<br/>(JSONL, exit codes)"]
  Merge["Merge / Deploy"]

  Trigger --> GHA
  GHA --> Pull
  Pull --> PlanAgent
  PlanAgent --> CodeAgents
  CodeAgents --> ReviewAgent
  ReviewAgent --> TestAgent
  TestAgent --> Output
  Output -->|"exit 0"| Merge
  PlanAgent -.-> FRITO
  CodeAgents -.-> FRITO
  ReviewAgent -.-> FRITO
  TestAgent -.-> FRITO

  style Trigger fill:#1e3a5f,color:#ffffff
  style GHA fill:#2d5a5a,color:#ffffff
  style Pull fill:#5a5a1e,color:#ffffff
  style PlanAgent fill:#1e3a5f,color:#ffffff
  style CodeAgents fill:#2d5a3d,color:#ffffff
  style ReviewAgent fill:#5a3d7a,color:#ffffff
  style TestAgent fill:#8b5a2b,color:#ffffff
  style FRITO fill:#8b2d2d,color:#ffffff
  style Output fill:#2d5a5a,color:#ffffff
  style Merge fill:#2d5a3d,color:#ffffff
`;

export const openshellArchChart = `flowchart TD
  Base["OpenShell Community Base<br/>(Ubuntu Noble)<br/>Node.js 26, Python 3.14, uv, npm,<br/>build-essential, git, gh"]
  AMI["openshell-ami<br/>(+AMI binary)<br/>Apache 2.0, baked in"]
  Writable["/sandbox (writable volume)<br/>uv pip install · npm install · sandbox-install<br/>on-demand deps · arbitrary UID (OCP/K8s/Docker/Podman)"]

  Base --> AMI
  AMI --> Writable

  style Base fill:#1e3a5f,color:#ffffff
  style AMI fill:#8b2d2d,color:#ffffff
  style Writable fill:#2d5a3d,color:#ffffff
`;

export const openshellFlowChart = `flowchart TD
  User["Developer / Operator"]
  OpenShell["OpenShell CLI<br/>or Kubernetes"]
  Registry["ghcr.io/superinference<br/>/openshell-ami"]
  Container["Sandbox Container"]
  Entry["Entrypoint<br/>(entrypoint.sh)"]
  Probe["Startup Probe<br/>(/tmp/agent-ready)"]
  AMI["AMI Detached Mode<br/>(--prompt, --yolo,<br/>--output-format jsonl)"]
  FRITO["FRITO<br/>(13 LLM providers)"]
  Tools["37 Built-in Tools<br/>(file, shell, search,<br/>web, MCP, workflow)"]
  Output["Structured Output<br/>(JSONL stream,<br/>exit codes, audit log)"]

  User -->|"task prompt"| OpenShell
  OpenShell -->|"pull image"| Registry
  Registry --> Container
  Container --> Entry
  Entry --> Probe
  Entry --> AMI
  AMI --> FRITO
  AMI --> Tools
  AMI --> Output
  Output -.->|"results"| User

  style User fill:#1e3a5f,color:#ffffff
  style OpenShell fill:#2d5a5a,color:#ffffff
  style Registry fill:#5a5a1e,color:#ffffff
  style Container fill:#8b5a2b,color:#ffffff
  style Entry fill:#2d5a3d,color:#ffffff
  style Probe fill:#2d5a3d,color:#ffffff
  style AMI fill:#8b2d2d,color:#ffffff
  style FRITO fill:#5a3d7a,color:#ffffff
  style Tools fill:#5a3d7a,color:#ffffff
  style Output fill:#1e3a5f,color:#ffffff
`;
