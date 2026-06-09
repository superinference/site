"use client";

import CopyButton from "./CopyButton";

export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <CopyButton text={code} label="Copy" />
      </div>
      {lang && (
        <div className="px-4 py-1.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-200/50 dark:bg-neutral-800/50">{lang}</div>
      )}
      <pre className="p-4 pr-12 text-sm text-neutral-800 dark:text-neutral-200 overflow-x-auto font-mono leading-relaxed"><code>{code}</code></pre>
    </div>
  );
}
