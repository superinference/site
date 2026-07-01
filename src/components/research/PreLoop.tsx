import Mermaid from "@/components/Mermaid";
import { preLoop } from "@/data/charts";

export default function PreLoop() {
  return (
    <section id="pre-loop" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">How It Works</h2>
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
          <p><strong>Plan, Retrieve, Execute, Verify.</strong> The agent decomposes a task into subgoals, retrieves relevant context from an embedding-augmented memory, executes a candidate solution, and passes it through a critic before anything enters memory. Rejected candidates leave no trace — only verified results persist, preventing errors from compounding across reasoning steps.</p>
          <p><strong>Event-Driven, Not Step-Driven.</strong> Unlike systems that compute at every turn, SuperInference fires reasoning &quot;events&quot; only when the expected information gain exceeds a threshold — inspired by how spiking neural networks activate only when signals are strong enough. The agent stays idle when there&apos;s nothing useful to compute, concentrating effort where it matters most.</p>
          <p><strong>Principled Stopping.</strong> The agent stops reasoning when it has high confidence in its answer, when further iterations are unlikely to reduce uncertainty, or when the compute budget is exhausted. These criteria replace heuristic retry limits with a formal trade-off between efficiency and solution quality — detailed in the paper.</p>
        </div>
      </div>
    </section>
  );
}
