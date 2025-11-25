"use client";

import { useState } from "react";

export type CopyButtonProps = {
  text: string;
  className?: string;
  label?: string;
};

export default function CopyButton({ text, className, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // noop
    }
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={copied ? "Copied" : label}
      onClick={handleCopy}
      className={
        "inline-flex items-center justify-center rounded-md border border-white/10 bg-black/30 hover:bg-black/50 text-neutral-200 hover:text-white transition-colors px-2 py-1 text-xs " +
        (className ?? "")
      }
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-8.486 8.5-4.257-4.257a1 1 0 1 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l9.157-9.239z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16 1H4c-1.103 0-2 .897-2 2v12h2V3h12V1z"/>
          <path d="M20 5H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm0 16H8V7h12v14z"/>
        </svg>
      )}
    </button>
  );
} 