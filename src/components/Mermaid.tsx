"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import { motion } from "framer-motion";
import tippy, { Instance as TippyInstance } from "tippy.js";
import "tippy.js/dist/tippy.css";

export type MermaidProps = {
  chart: string;
  className?: string;
  animate?: boolean;
  highlights?: Record<string, string>;
  descriptions?: Record<string, string>;
};

export default function Mermaid({ chart, className, animate = true, highlights = {}, descriptions = {} }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const id = useId().replace(/:/g, "");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; description: string } | null>(null);
  const tippiesRef = useRef<TippyInstance[]>([]);

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
      gantt: {
        barHeight: 72,
        barGap: 16,
        topPadding: 100,
        titleTopMargin: 40,
        leftPadding: 120,
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

  // Style, tooltips, and markers
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

    // Destroy previous tooltips before re-creating
    tippiesRef.current.forEach((inst) => {
      try { inst.destroy(); } catch {}
    });
    tippiesRef.current = [];

    // Helper to create a tooltip and track it
    function addTip(targetEl: Element, content: string) {
      if (!content) return;
      const inst = tippy(targetEl as Element, {
        content,
        theme: "light",
        delay: [150, 0],
        appendTo: () => document.body,
        hideOnClick: false,
      });
      tippiesRef.current.push(inst);
    }

    function resolveFallback(label: string | undefined) {
      if (label === "Start") return "Entry point of the state machine.";
      if (label === "End") return "Terminal state of the state machine.";
      if (label === "Decision") return "Branch point that routes to different states based on conditions.";
      if (label && ["Yes", "True"].includes(label)) return "Condition evaluated to true; taking the positive branch.";
      if (label && ["No", "False"].includes(label)) return "Condition evaluated to false; taking the alternative branch.";
      return undefined;
    }

    function ensureNativeTitle(el: Element, text: string) {
      try {
        const existing = el.querySelector("title");
        if (existing) {
          (existing as Element).textContent = text;
        } else {
          const titleNode = document.createElementNS("http://www.w3.org/2000/svg", "title");
          titleNode.textContent = text;
          el.insertBefore(titleNode, el.firstChild);
        }
      } catch {}
    }

    function markClickable(target: Element, label: string) {
      const tip = highlights[label] || label;
      addTip(target, tip);
      const descCandidate = (descriptions && descriptions[label]) || highlights[label];
      const desc = descCandidate || resolveFallback(label);
      if (desc) {
        (target as HTMLElement).setAttribute("data-clickable", "true");
        (target as HTMLElement).setAttribute("data-label", label);
        (target as HTMLElement).setAttribute("role", "button");
        (target as HTMLElement).setAttribute("tabindex", "0");
        (target as HTMLElement).setAttribute("aria-label", `Show info for ${label}`);
        (target as HTMLElement).setAttribute("data-debug", "clickable");
        (target as HTMLElement).setAttribute("style", ((target as HTMLElement).getAttribute("style") || "") + ";pointer-events:auto");
        ensureNativeTitle(target, tip);
      } else {
        (target as HTMLElement).removeAttribute("data-clickable");
        (target as HTMLElement).removeAttribute("data-label");
        (target as HTMLElement).removeAttribute("role");
        (target as HTMLElement).removeAttribute("tabindex");
        (target as HTMLElement).removeAttribute("aria-label");
      }
    }

    function getPseudoStateLabel(groupEl: Element): "Start" | "End" | "Decision" | null {
      const circles = groupEl.querySelectorAll("circle, ellipse").length;
      if (circles >= 2) return "End";
      if (circles >= 1) return "Start";
      if (groupEl.querySelector("polygon")) return "Decision";
      return null;
    }

    const clickableCountBefore = root.querySelectorAll("[data-clickable='true']").length;

    const nodeEls = Array.from(
      root.querySelectorAll(
        "g.node, g.state, g.stateGroup, g[class*='state'], g[class*='start'], g[class*='end'], g[class*='choice'], .state, .stateGroup"
      )
    );
    nodeEls.forEach((node) => {
      if ((node as Element).closest("g.edgeLabel")) return;
      const labelEl = node.querySelector(".nodeLabel, .label, text");
      let label = (labelEl?.textContent || "").trim();
      if (!label) label = getPseudoStateLabel(node) || "";
      if (!label) return;
      markClickable(node as Element, label);
    });

    const shapeEls = Array.from(root.querySelectorAll("circle, ellipse, polygon"));
    shapeEls.forEach((shape) => {
      if ((shape as Element).closest("g.edgeLabel")) return;
      if ((shape as Element).closest("[data-clickable='true']")) return;
      const parentGroup = shape.closest("g");
      const attachTarget = (parentGroup as Element) || (shape as Element);
      const labelEl = parentGroup?.querySelector?.(".nodeLabel, .label, text");
      const hasLabelText = !!(labelEl && (labelEl.textContent || "").trim());
      if (hasLabelText) return;
      const pseudo = getPseudoStateLabel(parentGroup || shape);
      if (!pseudo) return;
      markClickable(attachTarget, pseudo);
    });

    const edgeLabelEls = Array.from(root.querySelectorAll("g.edgeLabel"));
    edgeLabelEls.forEach((edgeLabel) => {
      const textEl = edgeLabel.querySelector("text");
      const edgeText = (textEl?.textContent || (edgeLabel.textContent || "")).trim();
      if (!edgeText) return;
      markClickable(edgeLabel as Element, edgeText);
    });

    const clickableCountAfter = root.querySelectorAll("[data-clickable='true']").length;
  }, [svg, highlights, descriptions, modalOpen]);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    function openModalFor(label: string) {
      const descCandidate = (descriptions && descriptions[label]) || highlights[label];
      const desc = descCandidate || (label ? (label === "Start" ? "Entry point of the state machine." : label === "End" ? "Terminal state of the state machine." : label === "Decision" ? "Branch point that routes to different states based on conditions." : ["Yes", "True"].includes(label) ? "Condition evaluated to true; taking the positive branch." : ["No", "False"].includes(label) ? "Condition evaluated to false; taking the alternative branch." : undefined) : undefined);
      if (!desc) {
        return false;
      }
      setModalContent({ title: label, description: desc });
      setModalOpen(true);
      return true;
    }

    function onRootClick(event: MouseEvent) {
      const target = event.target as Element | null;
      if (!target) return;
      const clickable = target.closest("[data-clickable='true']");
      if (!clickable) return;
      const label = (clickable as HTMLElement).getAttribute("data-label") || "";
      if (label) openModalFor(label);
    }

    function onRootKey(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target as Element | null;
      if (!target) return;
      const clickable = (target as Element).closest?.("[data-clickable='true']");
      if (!clickable) return;
      const label = (clickable as HTMLElement).getAttribute("data-label") || "";
      if (label) openModalFor(label);
    }

    root.addEventListener("click", onRootClick);
    root.addEventListener("keydown", onRootKey);
    return () => {
      root.removeEventListener("click", onRootClick);
      root.removeEventListener("keydown", onRootKey);
    };
  }, [svg, highlights, descriptions]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    if (modalOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [modalOpen]);

  return (
    <motion.div
      ref={wrapperRef}
      className={className}
      initial={animate ? { opacity: 0, scale: 0.98 } : false}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div ref={containerRef} className="mermaid" dangerouslySetInnerHTML={{ __html: svg }} suppressHydrationWarning />

      {modalOpen && modalContent ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-w-lg w-[90%] rounded-lg border border-white/10 bg-neutral-900/95 p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{modalContent.title}</h3>
                <p className="mt-2 text-sm text-neutral-300 whitespace-pre-wrap">{modalContent.description}</p>
              </div>
              <button
                aria-label="Close"
                className="shrink-0 rounded-md px-2 py-1 text-sm text-neutral-300 hover:text-white hover:bg-white/10"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
} 