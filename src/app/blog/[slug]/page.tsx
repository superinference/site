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
  const title = post.frontmatter.title;
  const description = post.frontmatter.abstract;
  const url = `https://www.superinference.org/blog/${slug}/`;
  const images = post.frontmatter.heroImage
    ? [{ url: post.frontmatter.heroImage, width: 1200, height: 600 }]
    : undefined;
  return {
    title: `${title} - SuperInference Blog`,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images,
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.frontmatter.heroImage ? [post.frontmatter.heroImage] : undefined,
    },
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
