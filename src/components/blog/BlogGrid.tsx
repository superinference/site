"use client";

import { useState, useMemo } from "react";
import type { BlogPostLite } from "@/lib/blog";
import PostCard from "./PostCard";
import PostListItem from "./PostListItem";

const POSTS_PER_PAGE = 3;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

type Props = {
  grouped: Record<string, BlogPostLite[]>;
};

function SlideArrow({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-full border transition-colors ${
        disabled
          ? "border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 cursor-default"
          : "border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
      }`}
      aria-label={direction === "left" ? "Previous posts" : "Next posts"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}

export default function BlogGrid({ grouped }: Props) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const categories = useMemo(() => Object.keys(grouped).sort(), [grouped]);
  const [pages, setPages] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const cat of categories) init[cat] = 0;
    return init;
  });

  const query = search.toLowerCase().trim();

  const filtered = useMemo(() => {
    if (!query) return grouped;
    const result: Record<string, BlogPostLite[]> = {};
    for (const cat of categories) {
      const matches = grouped[cat].filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(query) ||
          p.frontmatter.abstract.toLowerCase().includes(query) ||
          p.frontmatter.categories.some((c) => c.toLowerCase().includes(query)) ||
          p.frontmatter.author.toLowerCase().includes(query)
      );
      if (matches.length > 0) result[cat] = matches;
    }
    return result;
  }, [grouped, categories, query]);

  const filteredCategories = Object.keys(filtered).sort();

  return (
    <>
      {/* Toolbar: search + view toggle */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden shrink-0">
          <button
            onClick={() => setView("grid")}
            className={`p-2 transition-colors ${view === "grid" ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
            aria-label="Grid view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 transition-colors ${view === "list" ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
            aria-label="List view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredCategories.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 py-8 text-center text-sm">
          No posts matching &ldquo;{search}&rdquo;
        </p>
      ) : (
        filteredCategories.map((cat) => {
          const posts = filtered[cat];
          const page = pages[cat] || 0;
          const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
          const start = page * POSTS_PER_PAGE;
          const visible = posts.slice(start, start + POSTS_PER_PAGE);
          const hasPrev = page > 0;
          const hasNext = page < totalPages - 1;

          return (
            <div key={cat} id={slugify(cat)} className="scroll-mt-20">
              <div className="pt-6 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{cat}</h2>
                  <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                    {posts.length} {posts.length === 1 ? "post" : "posts"}
                  </p>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <SlideArrow direction="left" onClick={() => setPages((p) => ({ ...p, [cat]: (p[cat] || 0) - 1 }))} disabled={!hasPrev} />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums min-w-[3ch] text-center">
                      {page + 1}/{totalPages}
                    </span>
                    <SlideArrow direction="right" onClick={() => setPages((p) => ({ ...p, [cat]: (p[cat] || 0) + 1 }))} disabled={!hasNext} />
                  </div>
                )}
              </div>

              {view === "grid" ? (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visible.map((post) => (
                    <div key={post.slug} id={`post-${post.slug}`} className="scroll-mt-20">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/60 divide-y divide-neutral-100 dark:divide-neutral-800 px-4">
                  {visible.map((post) => (
                    <div key={post.slug} id={`post-${post.slug}`} className="scroll-mt-20">
                      <PostListItem post={post} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </>
  );
}
