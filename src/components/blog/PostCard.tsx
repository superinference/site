import Link from "next/link";
import type { BlogPostLite } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  Benchmarks: "from-emerald-500/20 to-emerald-600/10 dark:from-emerald-500/10 dark:to-emerald-600/5",
  Research: "from-purple-500/20 to-purple-600/10 dark:from-purple-500/10 dark:to-purple-600/5",
  Engineering: "from-amber-500/20 to-amber-600/10 dark:from-amber-500/10 dark:to-amber-600/5",
};

function getCategoryGradient(categories: string[]): string {
  for (const cat of categories) {
    if (CATEGORY_COLORS[cat]) return CATEGORY_COLORS[cat];
  }
  return "from-neutral-500/20 to-neutral-600/10 dark:from-neutral-500/10 dark:to-neutral-600/5";
}

export default function PostCard({ post }: { post: BlogPostLite }) {
  const formattedDate = new Date(post.frontmatter.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}/`} className="block group">
      <article className="rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-colors h-full flex flex-col">
        {post.frontmatter.heroImage ? (
          <div className="aspect-[2/1] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.frontmatter.heroImage}
              alt={post.frontmatter.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        ) : (
          <div className={`aspect-[2/1] bg-gradient-to-br ${getCategoryGradient(post.frontmatter.categories)} flex items-center justify-center`}>
            <span className="text-4xl font-bold text-neutral-300 dark:text-neutral-700 select-none">
              {post.frontmatter.title.charAt(0)}
            </span>
          </div>
        )}

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <time>{formattedDate}</time>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3rem]">
            {post.frontmatter.title}
          </h3>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 flex-1 min-h-[3.75rem]">
            {post.frontmatter.abstract}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.frontmatter.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
