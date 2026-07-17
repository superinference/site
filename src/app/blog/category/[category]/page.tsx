import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllCategories, getPostsByCategory, slugifyCategory, buildCategoryNavToc } from "@/lib/blog";
import type { BlogPostLite } from "@/lib/blog";
import PageLayout from "@/components/PageLayout";
import CategoryGrid from "@/components/blog/CategoryGrid";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  const posts = getAllPosts();
  return getAllCategories(posts).map((cat) => ({ category: slugifyCategory(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const posts = getAllPosts();
  const categories = getAllCategories(posts);
  const cat = categories.find((c) => slugifyCategory(c) === slug);
  if (!cat) return {};
  const title = `${cat} - SuperInference Blog`;
  const description = `All ${cat} posts from the SuperInference blog.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.superinference.org/blog/category/${slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const allPosts = getAllPosts();
  const categories = getAllCategories(allPosts);
  const category = categories.find((c) => slugifyCategory(c) === slug);
  if (!category) notFound();

  const catPosts = getPostsByCategory(allPosts, category);
  const toc = buildCategoryNavToc(allPosts);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lite: BlogPostLite[] = catPosts.map(({ content: _content, ...rest }) => rest);

  return (
    <PageLayout
      title={category}
      subtitle={`${lite.length} ${lite.length === 1 ? "post" : "posts"}`}
      toc={toc}
      tocTitle="Categories"
    >
      <CategoryGrid posts={lite} />
    </PageLayout>
  );
}
