export default function DocSubSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-20">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mt-6 mb-3">{title}</h3>
      <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-base/7">{children}</div>
    </div>
  );
}
