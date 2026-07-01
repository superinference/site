"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { TocItem } from "@/data/nav";

type Props = {
  title: string;
  subtitle?: string;
  toc: TocItem[];
  tocTitle?: string;
  titleClassName?: string;
  children: React.ReactNode;
};

function TocLink({ item, activeAnchor, pathname }: { item: TocItem; activeAnchor: string; pathname: string }) {
  const isPageLink = item.href.startsWith("/");
  const active = isPageLink
    ? pathname === item.href || pathname === item.href.replace(/\/$/, "")
    : item.href === "#" + activeAnchor;
  const hasActiveChild = item.children?.some((c) => c.href === "#" + activeAnchor);
  const expanded = active || hasActiveChild;

  return (
    <div>
      {isPageLink ? (
        <Link
          href={item.href}
          className={`block text-sm py-1 transition-colors ${expanded ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
        >
          {item.label}
        </Link>
      ) : (
        <a
          href={item.href}
          className={`block text-sm py-1 transition-colors ${expanded ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
        >
          {item.label}
        </a>
      )}
      {item.children && expanded && (
        <div className="ml-3 border-l border-neutral-200 dark:border-neutral-700 pl-2">
          {item.children.map((child) => {
            const childActive = child.href === "#" + activeAnchor;
            return (
              <a
                key={child.href}
                href={child.href}
                className={`block text-xs py-0.5 transition-colors ${childActive ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              >
                {child.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function PageLayout({ title, subtitle, toc, tocTitle = "On this page", titleClassName, children }: Props) {
  const pathname = usePathname();
  const [activeAnchor, setActiveAnchor] = useState("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const anchorIds = useMemo(() => {
    const ids: string[] = [];
    for (const t of toc) {
      if (t.href.startsWith("#")) ids.push(t.href.slice(1));
      if (t.children) {
        for (const c of t.children) {
          if (c.href.startsWith("#")) ids.push(c.href.slice(1));
        }
      }
    }
    return ids;
  }, [toc]);

  useEffect(() => {
    if (anchorIds.length === 0) return;

    const handleScroll = () => {
      let current = "";
      for (const id of anchorIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          current = id;
        }
      }
      setActiveAnchor(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [anchorIds]);

  const activeLabel = toc.find((t) => {
    if (t.href === "#" + activeAnchor) return true;
    return t.children?.some((c) => c.href === "#" + activeAnchor);
  })?.label;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="lg:grid lg:grid-cols-[176px_1fr] lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">{tocTitle}</div>
            {toc.map((item) => (
              <TocLink key={item.href} item={item} activeAnchor={activeAnchor} pathname={pathname} />
            ))}
          </nav>
        </aside>
        <main className="space-y-12 min-w-0">
          <div>
            <h1 className={titleClassName ?? "text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"}>{title}</h1>
            {subtitle && <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
          </div>
          {/* Mobile TOC */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <span>{activeLabel || tocTitle}</span>
              <svg className={`w-4 h-4 transition-transform ${mobileTocOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </button>
            {mobileTocOpen && (
              <nav className="mt-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 space-y-1" onClick={() => setMobileTocOpen(false)}>
                {toc.map((item) => (
                  <TocLink key={item.href} item={item} activeAnchor={activeAnchor} pathname={pathname} />
                ))}
              </nav>
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
