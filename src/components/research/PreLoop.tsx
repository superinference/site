import Mermaid from "@/components/Mermaid";
import { preLoop } from "@/data/charts";

export default function PreLoop() {
  return (
    <section id="pre-loop" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">PRE Loop Architecture</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <Mermaid chart={preLoop} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
            "Planner (policy π)": "Implements the policy π. Maintains belief state b_t and proposes query q_t only when expected information gain exceeds threshold τ. When e_t=0, the system remains idle, reducing unnecessary computation.",
            Retriever: "Part of action space 𝒜. Receives q_t and accesses External Memory M_t to obtain context m̃_t through noisy channel C_η. Read/write interface stores verified intermediate results for future use.",
            Executor: "Part of action space 𝒜. Uses query q_t together with retrieved context m̃_t to produce a candidate action or subgoal a_t.",
            "Critic (α, β)": "Implements observation function 𝒵 and reward R. Evaluates a_t and produces decision c_t ∈ {approve, reject} based on error probabilities (α,β). Critic's output forms observation o_{t+1} and contributes to reward r_t.",
            "Memory M_t": "Stores critic-approved artifacts with provenance metadata. Updates: M_{t+1} = M_t ∪ {(q_t, a_t, metadata)} if approved, unchanged if rejected. Provides observation o_{t+1} to Planner for iterative refinement.",
          }} />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 2.</strong> Event-driven PRE loop showing Planner → Retriever → Executor → Critic → Memory with feedback.</div>
        </div>
        <div className="space-y-5 text-base/7 text-neutral-700 dark:text-neutral-300">
          <p><strong>POMDP Formulation.</strong> SuperInference formalizes the multi-step reasoning task as a Partially Observable Markov Decision Process (POMDP) with noisy retrieval and verification channels, defined belief updates, learning objectives, and information-theoretic quantities. The hidden state space \(\mathcal{'{'}S{'}'}\) represents task progress, ground-truth variables, available tools, and unresolved subgoals that the agent cannot directly access. The action space \(\mathcal{'{'}A{'}'}\) encompasses planning queries, retrieval operations, and execution steps realized through the Planner, Retriever, and Executor modules. The observation space \(\mathcal{'{'}O{'}'}\) contains agent-visible feedback such as critic decisions, execution results, and retrieved context.</p>
          <p><strong>Event-Driven Architecture.</strong> Traditional reasoning systems operate step-by-step, executing computation at every time step. In contrast, SuperInference draws inspiration from spiking neural networks (SNNs), where discrete &quot;reasoning events&quot; play the role of spikes. The Planner remains silent most of the time and only &quot;fires&quot; when the system determines a reasoning step is necessary—when new information arrives or uncertainty exceeds a threshold. When e_t=0, the system remains idle, reducing unnecessary computation. This event-driven approach achieves sparsity (computation only when needed) and adaptivity (events depend on uncertainty and information gain).</p>
          <p><strong>PRE Loop Components.</strong> The architecture realizes an abstract POMDP whose components are mapped through the Planner-Retriever-Executor (PRE) loop with critic-gated memory. The Planner implements the policy π, maintaining belief state b_t and firing events e_t when Expected Information Gain (EIG) exceeds threshold τ. The Retriever and Executor realize the action space, accessing external memory M_t through a noisy channel C_η and generating candidate actions a_t. The Critic implements the observation function with error rates (α, β) and gates memory updates—approved items update memory while rejected items trigger feedback to the Planner for correction. The critic&apos;s output forms the observation o_&#123;t+1&#125; and contributes to reward r_t.</p>
          <p><strong>Information-Theoretic Stopping.</strong> The agent should reason only when worthwhile—when new information would significantly reduce uncertainty. Reasoning halts when belief is sufficiently concentrated (max_s b_t(s) ≥ κ), when expected information gain falls below threshold (EIG_t ≤ ε, meaning further reasoning won&apos;t help), or when the step budget is exhausted. These criteria ensure a predictable trade-off between efficiency (few events) and solution quality.</p>
        </div>
      </div>
    </section>
  );
}
