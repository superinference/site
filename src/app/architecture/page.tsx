"use client";

import Section from "@/components/Section";
import Mermaid from "@/components/Mermaid";
import { preArchitecture } from "@/data/charts";

export default function ArchitecturePage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section id="architecture" title="Event-Driven PRE Architecture" subtitle="Complete architecture with event triggering and noisy retrieval mechanism (paper Section 3, Fig. 2).">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="lg:order-2">
            <Mermaid chart={preArchitecture} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
              "Event e_t (spike)": "Discrete reasoning events that trigger computation only when expected information gain exceeds threshold τ. When e_t=0, the system remains idle, reducing unnecessary computation. Inspired by spiking neural networks.",
              "Planner (policy π, belief b_t)": "Implements policy π. Maintains belief state b_t about the hidden reasoning state s_t. Proposes query q_t only when EIG ≥ τ. Discrete activation visualized as event e_t.",
              "Retriever (action space 𝒜)": "Part of action space 𝒜. Receives q_t and accesses External Memory M_t to obtain context m̃_t. Read/write interface through noisy channel C_η with retrieval probability p(η).",
              "External Memory M_t": "Critic-gated memory storing verified intermediate results with provenance metadata. Only high-PPV items are stored. Memory grows only when Critic approves: M_{t+1} = M_t ∪ {(q_t, a_t, metadata)}.",
              "Executor (action space 𝒜)": "Part of action space 𝒜. Uses query q_t together with retrieved context m̃_t to produce candidate action or subgoal a_t.",
              "Critic (𝒵, α, β)": "Implements observation function 𝒵 and reward R. Evaluates a_t, produces decision c_t ∈ {approve, reject} with error rates α (false approval) and β (false rejection). Output forms observation o_{t+1} and contributes to reward r_t.",
            }} />
            <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 3.</strong> Event-driven PRE architecture showing Planner → Retriever → Executor → Critic with Memory and feedback loops (from paper Fig. 2a).</div>
          </div>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7 lg:order-1">
            <p><strong>Event-Driven Efficiency.</strong> A key design feature is that the combination of sparse Planner activation (event e_t), noisy retrieval, and Critic gating ensures that computation is concentrated on informative events. This design achieves: (1) reduction of unnecessary queries (sparse computation), (2) memory efficiency, as only verified candidates are stored, (3) multi-step reasoning where the system chains events to solve complex tasks, updating beliefs and memory iteratively, and (4) predictable performance, as thresholds (τ, κ, ε) and critic error parameters (α, β) allow controlling the trade-off between speed, accuracy, and memory usage.</p>
            <p><strong>Belief State Updates.</strong> The Planner maintains a belief state b_t, a probability distribution over hidden reasoning states. When the agent takes an action a_t and receives observation o_{'{'}t+1{'}'}, the belief updates via: b_{'{'}t+1{'}'}(s&apos;) ∝ Z(o_{'{'}t+1{'}'}|s&apos;,a_t) Σ_s T(s&apos;|s,a_t) b_t(s), combining a prediction step (based on previous belief and transition model) with a correction step (using the observation model). This Bayesian update allows the agent to track uncertainty and make informed decisions about when to fire events.</p>
            <p><strong>Expected Information Gain (EIG).</strong> Events fire only when Expected Information Gain exceeds threshold τ. EIG measures the expected reduction in uncertainty: EIG_t = E[H(b_t) - H(b_{'{'}t+1{'}'})] over observations o_{'{'}t+1{'}'}, where H(·) denotes Shannon entropy. This information-theoretic approach ensures computation occurs only when new information is expected to reduce uncertainty, making the reasoning process both efficient and principled.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
