import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, renderMarkdown, buildCategoryNavToc } from "@/lib/blog";
import PageLayout from "@/components/PageLayout";
import PostHeader from "@/components/blog/PostHeader";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} - SuperInference Blog`,
    description: post.frontmatter.abstract,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const allPosts = getAllPosts();
  const categoryToc = buildCategoryNavToc(allPosts);

  return (
    <PageLayout title="" toc={categoryToc} tocTitle="Categories">
      <PostHeader frontmatter={post.frontmatter} readingTime={post.readingTime} />
      <MarkdownRenderer html={html} />
    </PageLayout>
  );
}
