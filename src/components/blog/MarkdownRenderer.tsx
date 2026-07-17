"use client";

export default function MarkdownRenderer({ html }: { html: string }) {
  return (
    <div
      className="blog-prose text-neutral-700 dark:text-neutral-300 text-base/7"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
