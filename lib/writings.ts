import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fetchFeed, items, tag, paragraphs, stripTags } from "@/lib/rss";

const writingsDir = path.join(process.cwd(), "writings");

export interface Writing {
  slug: string;
  title: string;
  sub: string;
  date: string; // ISO
  lede: string;
  para: string;
  url: string; // Substack post, or the local /writings/<slug> page
  external: boolean;
  content: string;
}

function firstParagraphs(markdown: string): string[] {
  return markdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("#"))
    .map((p) => p.replace(/[*_`]/g, ""));
}

function readLocal(file: string): Writing {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(writingsDir, file), "utf-8"));
  const [lede = "", para = ""] = firstParagraphs(content);
  return {
    slug,
    title: data.title ?? slug,
    sub: data.sub ?? data.excerpt ?? "",
    date: data.date ?? "",
    lede: data.lede ?? lede,
    para: data.para ?? para,
    url: data.substackUrl ?? `/writings/${slug}`,
    external: !!data.substackUrl,
    content,
  };
}

export function getLocalWritings(): Writing[] {
  if (!fs.existsSync(writingsDir)) return [];
  return fs
    .readdirSync(writingsDir)
    .filter((f) => f.endsWith(".md"))
    .map(readLocal)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWritingBySlug(slug: string): Writing | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(writingsDir, file))) return null;
  return readLocal(file);
}

// Set SUBSTACK_URL (e.g. https://yashraj.substack.com) to pull posts from the feed.
// Falls back to the markdown files in /writings when unset or unreachable.
async function getSubstackWritings(): Promise<Writing[] | null> {
  const base = process.env.SUBSTACK_URL?.replace(/\/$/, "");
  if (!base) return null;
  const xml = await fetchFeed(`${base}/feed`);
  if (!xml) return null;

  const posts = items(xml).map((item) => {
    const link = tag(item, "link");
    const [lede = "", para = ""] = paragraphs(tag(item, "content:encoded"));
    return {
      slug: link.split("/p/")[1] ?? link,
      title: stripTags(tag(item, "title")),
      sub: stripTags(tag(item, "description")),
      date: new Date(tag(item, "pubDate")).toISOString(),
      lede,
      para,
      url: link,
      external: true,
      content: "",
    };
  });
  return posts.length ? posts : null;
}

export async function getWritings(): Promise<Writing[]> {
  return (await getSubstackWritings()) ?? getLocalWritings();
}
