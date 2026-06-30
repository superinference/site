import CodeBlock from "@/components/CodeBlock";
import { papers } from "@/data/papers";

export default function Cite() {
  return (
    <section id="cite" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">Cite</h2>
      <div className="w-full space-y-6">
        {papers.filter((p) => p.id === 1).map((p) => (
          <div key={p.id} className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 p-4 shadow-sm dark:shadow-none">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex-1">
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {p.title} <a href={p.doi} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">(doi)</a>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {p.venue} · <a href={p.doi} target="_blank" rel="noreferrer" className="underline hover:no-underline">{p.doi}</a>
                </div>
              </div>
            </div>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300 text-base/7">{p.summary}</p>
            <div className="mt-3">
              <CodeBlock lang="bibtex" code={p.bibtex} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
