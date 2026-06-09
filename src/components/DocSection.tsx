export default function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">{title}</h2>
      <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">{children}</div>
    </section>
  );
}
