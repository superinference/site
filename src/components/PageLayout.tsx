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
  children: React.ReactNode;
};

export default function PageLayout({ title, subtitle, toc, tocTitle = "On this page", children }: Props) {
  const pathname = usePathname();
  const [activeAnchor, setActiveAnchor] = useState("");

  const anchorIds = useMemo(
    () => toc.filter((t) => t.href.startsWith("#")).map((t) => t.href.slice(1)),
    [toc],
  );

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">{tocTitle}</div>
            {toc.map((item) => {
              const isPageLink = item.href.startsWith("/");
              const active = isPageLink
                ? pathname === item.href || pathname === item.href.replace(/\/$/, "")
                : item.href === "#" + activeAnchor;

              return isPageLink ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-sm py-1 transition-colors ${active ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block text-sm py-1 transition-colors ${active ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>
        <main className="space-y-12 min-w-0">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h1>
            {subtitle && <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
