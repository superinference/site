import type { Metadata } from "next";
import Section from "@/components/Section";
import CopyButton from "@/components/CopyButton";
import { papers } from "@/data/papers";

export const metadata: Metadata = {
  title: "Cite - SuperInference",
  description: "Published papers and BibTeX entries for SuperInference.",
};

export default function CitePage() {
  return (
    <main className="space-y-24 sm:space-y-32 py-10 sm:py-16">
      <Section id="research" title="Cite" subtitle="Published papers and BibTeX entries.">
        <div className="w-full space-y-6">
          {papers.map((p) => (
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
              <div className="mt-3 relative">
                <div className="absolute right-2 top-2 z-10">
                  <CopyButton text={p.bibtex} label="Copy BibTeX" />
                </div>
                <pre className="rounded bg-neutral-100 dark:bg-neutral-950/80 border border-neutral-200 dark:border-white/10 p-3 pr-10 text-[11px] text-neutral-800 dark:text-neutral-200 overflow-x-auto"><code>{p.bibtex}</code></pre>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
