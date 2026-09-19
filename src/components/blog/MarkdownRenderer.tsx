"use client";

import { useEffect, useRef } from "react";

export default function MarkdownRenderer({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const placeholders = el.querySelectorAll<HTMLElement>("[data-asciinema-id]");
    placeholders.forEach((ph) => {
      const id = ph.getAttribute("data-asciinema-id");
      if (!id || ph.querySelector("script")) return;
      const script = document.createElement("script");
      script.src = `https://asciinema.org/a/${id}.js`;
      script.id = `asciicast-${id}`;
      script.async = true;
      ph.appendChild(script);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="blog-prose text-neutral-700 dark:text-neutral-300 text-base/7"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
