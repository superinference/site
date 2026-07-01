"use client";

import { useEffect, useRef } from "react";

export default function Asciinema({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const script = document.createElement("script");
    script.src = `https://asciinema.org/a/${id}.js`;
    script.id = `asciicast-${id}`;
    script.async = true;
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, [id]);

  return <div ref={containerRef} className="max-w-full overflow-hidden" />;
}
