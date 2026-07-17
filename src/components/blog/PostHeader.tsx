import type { BlogFrontmatter } from "@/lib/blog";
import ShareButton from "./ShareButton";

type Props = {
  frontmatter: BlogFrontmatter;
  readingTime: number;
};

export default function PostHeader({ frontmatter, readingTime }: Props) {
  const formattedDate = new Date(frontmatter.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-10">
      {frontmatter.heroImage && (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontmatter.heroImage}
            alt={frontmatter.title}
            className="w-full h-auto"
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {frontmatter.title}
      </h1>

      {frontmatter.subtitle && (
        <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
          {frontmatter.subtitle}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm border-y border-neutral-200 dark:border-neutral-800 py-4">
        <div>
          <span className="text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wider">Category</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {frontmatter.categories.map((cat) => (
              <span
                key={cat}
                className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wider">Date</span>
          <div className="mt-1 text-neutral-700 dark:text-neutral-300">{formattedDate}</div>
        </div>

        <div>
          <span className="text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wider">Reading time</span>
          <div className="mt-1 text-neutral-700 dark:text-neutral-300">{readingTime} min</div>
        </div>

        <div className="ml-auto">
          <span className="text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wider">Share</span>
          <div className="mt-1">
            <ShareButton />
          </div>
        </div>
      </div>

      {frontmatter.abstract && (
        <p className="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 border-l-2 border-blue-500 pl-4">
          {frontmatter.abstract}
        </p>
      )}
    </header>
  );
}
