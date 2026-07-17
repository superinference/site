import { Metadata } from "next";
import { getAllPosts, buildCategoryToc } from "@/lib/blog";
import type { BlogPostLite } from "@/lib/blog";
import PageLayout from "@/components/PageLayout";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog - SuperInference",
  description: "Latest posts from the SuperInference project.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const { toc, grouped } = buildCategoryToc(posts);

  const lite: Record<string, BlogPostLite[]> = {};
  for (const [cat, catPosts] of Object.entries(grouped)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lite[cat] = catPosts.map(({ content: _content, ...rest }) => rest);
  }

  return (
    <PageLayout
      title="Blog"
      subtitle="Project updates, technical deep-dives, and benchmark results."
      toc={toc}
      tocTitle="Categories"
    >
      <BlogGrid grouped={lite} />
    </PageLayout>
  );
}
