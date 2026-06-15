import Mermaid from "@/components/Mermaid";
import { eventDrivenStages } from "@/data/charts";

export default function WorkedExample() {
  return (
    <section id="worked-example" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Worked Example</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <Mermaid chart={eventDrivenStages} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/60 p-4 overflow-x-auto" highlights={{}} descriptions={{
            "Event e₀": "Initial event. Agent receives task x. Initial belief b₀ = 0.3 (low confidence). EIG₀ = 0.8 is high, so reasoning is worthwhile.",
            "Observation: Receive task x": "Environment provides task x: '50 students, 40% are men. If 10 men leave, how many remain?'",
            "Event e₁": "Triggers Planner to decompose task into queries q₀ and q₁.",
            "Planner decomposes task into queries": "Planner (policy π) generates planning queries: q₀ (how many men originally? — requires 50 × 0.4) and q₁ (after 10 leave, how many remain? — depends on q₀).",
            "q₀: How many men originally? (50 × 0.4)": "First query requiring intermediate computation. Retriever checks memory M₀ (empty initially).",
            "q₁: After 10 leave, how many remain?": "Second query dependent on q₀ result. Retriever fetches m̃₁ = 20 from M₁ via noisy channel C_η.",
            "Event e₂": "Triggers execution of q₁ after q₀ is resolved and approved.",
            "Retriever m̃₀ ~ C_η": "Retriever accesses memory through noisy channel. For q₀, memory is empty; for q₁, retrieves previously stored result.",
            "Executor → a₀": "Executor computes candidate a₀ = 50 · 0.4 = 20 men.",
            "a₀ = 20 men": "Candidate answer: 20 men originally. Evaluated by Critic with PPV ≈ 0.98.",
            "Critic → c₀": "Critic evaluates a₀. c₀ = approve. Belief updates: b₁ = 0.6. EIG₁ = 0.4 > τ, so reasoning continues.",
            "Retriever m̃₁ from M₁": "Retriever fetches verified result (20 men) from memory M₁ stored after first cycle.",
            "Executor → a₁": "Executor computes candidate a₁ = 20 − 10 = 10 men using retrieved context.",
            "a₁ = 10 men (20 − 10)": "Final answer: 10 men remain. Belief reaches b₂ = 0.95 ≥ κ (high confidence).",
            "Critic → c₁": "Critic evaluates a₁. c₁ = approve. EIG₂ ≈ 0 < τ (nothing left to learn). Two stopping conditions met.",
            "Memory M_{t+1} = M_t ∪ {(q_t, a_t)}": "Critic-gated memory. Stores approved (q₀, 20) and (q₁, 10). Rejected candidates would leave no trace. Agent returns: 10 men.",
          }} />
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400"><strong>Figure 8.</strong> Event-driven PRE stages showing complete flow: task decomposition into queries q₀ and q₁, Retriever → Executor → Critic chains with belief updates (b₀=0.3 → b₁=0.6 → b₂=0.95), and critic-gated memory updates (from paper Fig. 3a).</div>
        </div>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
          <p><strong>Worked Example: Multi-Step Math.</strong> The task is: &quot;50 students, 40% are men. If 10 men leave, how many remain?&quot; The agent receives the task with initial belief b₀ = 0.3 (low confidence). Expected information gain EIG₀ = 0.8 is high, so reasoning is worthwhile. The Planner decomposes the task into subquestions: q₀ (how many men originally? — requires computing 50 × 0.4) and q₁ (after 10 leave, how many remain? — requires q₀&apos;s answer).</p>
          <p><strong>First PRE Cycle (t=0).</strong> The Retriever checks memory M₀ (empty initially). The Executor computes a₀ = 50 · 0.4 = 20 men. The Critic evaluates: c₀ = approve (with PPV ≈ 0.98). Memory updates: M₁ = M₀ ∪ &#123;(q₀, 20)&#125;. Belief rises to b₁ = 0.6, still below threshold κ = 0.9. Since EIG₁ = 0.4 &gt; τ, reasoning continues.</p>
          <p><strong>Second PRE Cycle (t=1).</strong> The Retriever fetches m̃₁ = 20 from M₁ via the noisy channel C_η. The Executor computes a₁ = 20 − 10 = 10 men. The Critic evaluates: c₁ = approve. Memory updates: M₂ = M₁ ∪ &#123;(q₁, 10)&#125;. Belief reaches b₂ = 0.95 ≥ κ (high confidence), and EIG₂ ≈ 0 &lt; τ (nothing left to learn). Two stopping conditions are met—the agent returns: <strong>10 men</strong>.</p>
          <p><strong>Key Observations.</strong> Belief b_t rises monotonically as evidence accumulates (30% → 60% → 95%). EIG_t falls as uncertainty is reduced (0.8 → 0.4 → 0). Memory stores only Critic-approved results, ensuring high precision. The agent stops after 2 cycles—efficient, not exhaustive. If c₀ had been &quot;reject&quot; (e.g., the Executor produced 25 instead of 20), the rejected candidate would <em>not</em> be stored in memory; the Planner would receive feedback, retry the query, and the Executor would attempt again.</p>
        </div>
      </div>
    </section>
  );
}
