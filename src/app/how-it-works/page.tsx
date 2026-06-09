import type { Metadata } from "next";
import Section from "@/components/Section";
import MotionCard from "@/components/MotionCard";

export const metadata: Metadata = {
  title: "How It Works - SuperInference",
  description: "Plan, act, observe, and loop with feedback — SuperInference's core workflow.",
};

export default function HowItWorksPage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section id="copy" title="How It Works" subtitle="Plan, act, observe, and loop with feedback.">
        <div className="mt-4 w-full space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">
          <p><strong>From Theory to Practice.</strong> SuperInference provides a principled and empirically validated approach to improve LLM reasoning under partial observability. Combining a planner, embedding-augmented memory, and critic-based verification, SuperInference formalizes multi-step reasoning as a noisy decision process where retrieval, critic assessments, and model sampling jointly induce stochastic transitions over latent beliefs. Theoretical results connect iteration budgets, critic characteristics, and expected information gain. The framework is model-agnostic and requires no architectural changes.</p>
          <p>A typical session starts with exploration: ask for an explanation of a file, jump to a symbol, or request a map of call sites. Once the task is clear, the agent drafts a plan that names the files it intends to change and the checks it will run. You can edit that plan like a checklist. When approved, the agent performs the smallest safe step, runs inexpensive validators, and reports back with logs and a preview diff. If results are good, it proceeds; if not, it explains what failed and proposes alternatives.</p>
          <p>The key benefit is momentum without loss of control. You always see context, plan, and evidence, and you can pause or redirect the flow at any time. Because the loop prefers objective signals—compilers, tests, type systems—the agent&apos;s suggestions converge toward correctness rather than style alone. Across the DABStep Hard Tasks benchmark, this translates into a performance increase from 12.7% to 41.3% when applied to Gemini 2.5 Pro, with most gains achieved within the first three refinement rounds. Over time, the system builds a memory of accepted patterns and project conventions, reducing friction and helping new engineers onboard faster.</p>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { title: "Plan", copy: "Assemble context and create a task list." },
            { title: "Act", copy: "Apply edits and run tools." },
            { title: "Observe", copy: "Capture results and feedback for the next loop." },
          ].map((card, i) => (
            <MotionCard key={card.title} title={card.title} delay={0.1 * i}>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm/6">{card.copy}</p>
            </MotionCard>
          ))}
        </div>
      </Section>
    </main>
  );
}
