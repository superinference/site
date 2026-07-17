import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import type { TocItem } from "@/data/nav";

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts");

export type BlogFrontmatter = {
  title: string;
  subtitle: string;
  abstract: string;
  date: string;
  author: string;
  categories: string[];
  heroImage?: string;
  draft?: boolean;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: number;
};

export type BlogPostLite = Omit<BlogPost, "content">;

export function slugifyCategory(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const slugifyHeading = slugifyCategory;

export function getAllCategories(posts: BlogPost[]): string[] {
  const cats = new Set<string>();
  for (const post of posts) {
    for (const cat of post.frontmatter.categories) {
      cats.add(cat);
    }
  }
  return Array.from(cats).sort();
}

export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter((p) => p.frontmatter.categories.includes(category));
}

function extractSlug(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(POSTS_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as BlogFrontmatter;

      if (frontmatter.draft) return null;

      return {
        slug: extractSlug(filename),
        frontmatter,
        content,
        readingTime: calculateReadingTime(content),
      } satisfies BlogPost;
    })
    .filter((p): p is BlogPost => p !== null);

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!fs.existsSync(POSTS_DIR)) return undefined;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const match = files.find((f) => extractSlug(f) === slug);
  if (!match) return undefined;

  const raw = fs.readFileSync(path.join(POSTS_DIR, match), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

interface MdastNode {
  type: string;
  depth?: number;
  children?: MdastNode[];
  value?: string;
}

function extractText(node: MdastNode): string {
  if (node.value) return node.value;
  if (node.children) return node.children.map(extractText).join("");
  return "";
}

export function buildCategoryNavToc(posts: BlogPost[]): TocItem[] {
  const cats = new Map<string, BlogPost[]>();
  for (const post of posts) {
    for (const cat of post.frontmatter.categories) {
      if (!cats.has(cat)) cats.set(cat, []);
      cats.get(cat)!.push(post);
    }
  }

  return Array.from(cats.keys())
    .sort()
    .map((cat) => ({
      href: `/blog/category/${slugifyHeading(cat)}/`,
      label: cat,
    }));
}

export function buildCategoryToc(posts: BlogPost[]): { toc: TocItem[]; grouped: Record<string, BlogPost[]> } {
  const grouped: Record<string, BlogPost[]> = {};
  for (const post of posts) {
    for (const cat of post.frontmatter.categories) {
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(post);
    }
  }

  const categories = Object.keys(grouped).sort();
  const toc: TocItem[] = categories.map((cat) => ({
    href: `/blog/category/${slugifyHeading(cat)}/`,
    label: cat,
  }));

  return { toc, grouped };
}

export function extractTocFromMarkdown(content: string): TocItem[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content);
  const toc: TocItem[] = [];
  let currentH2: TocItem | null = null;

  for (const node of (tree as MdastNode).children ?? []) {
    if (node.type !== "heading") continue;

    const text = extractText(node);
    const slug = slugifyHeading(text);

    if (node.depth === 2) {
      currentH2 = { href: `#${slug}`, label: text, children: [] };
      toc.push(currentH2);
    } else if (node.depth === 3 && currentH2) {
      currentH2.children!.push({ href: `#${slug}`, label: text });
    }
  }

  return toc;
}
