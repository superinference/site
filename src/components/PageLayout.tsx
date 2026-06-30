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

export default function PageLayout({ title, subtitle, toc, tocTitle = "On this page", titleClassName, children }: Props) {
  const pathname = usePathname();
  const [activeAnchor, setActiveAnchor] = useState("");

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="lg:grid lg:grid-cols-[176px_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">{tocTitle}</div>
            {toc.map((item) => {
              const isPageLink = item.href.startsWith("/");
              const active = isPageLink
                ? pathname === item.href || pathname === item.href.replace(/\/$/, "")
                : item.href === "#" + activeAnchor;
              const hasActiveChild = item.children?.some((c) => c.href === "#" + activeAnchor);

              const expanded = active || hasActiveChild;

              return (
                <div key={item.href}>
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
            })}
          </nav>
        </aside>
        <main className="space-y-12 min-w-0">
          <div>
            <h1 className={titleClassName ?? "text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"}>{title}</h1>
            {subtitle && <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
