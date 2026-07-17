import Link from "next/link";
import type { BlogPostLite } from "@/lib/blog";

export default function PostListItem({ post }: { post: BlogPostLite }) {
  const formattedDate = new Date(post.frontmatter.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}/`} className="block group">
      <article className="flex items-start gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-b-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <time>{formattedDate}</time>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h3 className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {post.frontmatter.title}
          </h3>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
            {post.frontmatter.abstract}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 shrink-0 pt-1">
          {post.frontmatter.categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
            >
              {cat}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
