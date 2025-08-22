"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import { motion } from "framer-motion";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export type MermaidProps = {
  chart: string;
  className?: string;
  animate?: boolean;
  highlights?: Record<string, string>;
};

export default function Mermaid({ chart, className, animate = true, highlights = {} }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      themeVariables: {
        background: "transparent",
        primaryColor: "#111827",
        primaryBorderColor: "#94a3b8",
        primaryTextColor: "#e5e7eb",
        lineColor: "#cbd5e1",
        secondaryColor: "#0b1220",
        tertiaryColor: "#111827",
        clusterBkg: "#0f172a80",
        clusterBorderColor: "#64748b",
        edgeLabelBackground: "#111827",
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        padding: 16,
        nodeSpacing: 70,
        rankSpacing: 60,
        useMaxWidth: true,
      },
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setSvg(`<pre style='color:#f87171'>Mermaid error: ${String(e)}</pre>`);
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    // Responsive & centered
    const svgEl = root.querySelector("svg");
    if (svgEl) {
      (svgEl as SVGElement).style.width = "100%";
      (svgEl as SVGElement).style.height = "auto";
      (svgEl as SVGElement).setAttribute("preserveAspectRatio", "xMidYMid meet");
    }

    // Edge animation class
    root.classList.add("mermaid-animate-path");

    // Tooltips: iterate nodes and match by their visible label text
    const nodes = Array.from(root.querySelectorAll(".node"));
    nodes.forEach((node) => {
      const labelEl = node.querySelector(".nodeLabel, .label");
      const label = (labelEl?.textContent || "").trim();
      if (!label) return;
      const tip = highlights[label];
      if (!tip) return;
      tippy(node as Element, { content: tip, theme: "light", delay: [150, 0] });
      (node as HTMLElement).style.cursor = "help";
    });
  }, [svg, highlights]);

  return (
    <motion.div
      ref={wrapperRef}
      className={className}
      initial={animate ? { opacity: 0, scale: 0.98 } : false}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div ref={containerRef} className="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />
    </motion.div>
  );
} 