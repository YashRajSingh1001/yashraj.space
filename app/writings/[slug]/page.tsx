import { notFound } from "next/navigation";
import { getAllWritings, getWritingBySlug } from "@/lib/writings";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllWritings().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;
  const writing = getWritingBySlug(slug);
  if (!writing) return {};
  return { title: `${writing.title} — Yash Raj Singh`, description: writing.excerpt };
}

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return result.toString();
}

function getPreviewParagraphs(content: string, count = 3): string {
  // Split by double newline to get paragraphs, take first `count`
  const paragraphs = content
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0);
  return paragraphs.slice(0, count).join("\n\n");
}

export default async function WritingPage(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;
  const writing = getWritingBySlug(slug);
  if (!writing) notFound();

  const isSubstack = !!writing.substackUrl;
  const displayContent = isSubstack
    ? getPreviewParagraphs(writing.content, 3)
    : writing.content;
  const html = await markdownToHtml(displayContent);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 animate-[fade-in_0.4s_ease-out_both]">
      <div className="mb-10">
        <Link
          href="/writings"
          className="text-xs text-[#6b7fa3] hover:text-[#7babf8] transition-colors mb-6 inline-block"
        >
          ← all writings
        </Link>
        <h1 className="font-display text-4xl font-bold text-[#e2e8f8] mb-4 leading-tight">
          {writing.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-[#6b7fa3]">
          {writing.date && (
            <span>
              {new Date(writing.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
          <span>{writing.readTime} min read</span>
          {writing.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-[#1a3060] text-[#6b7fa3]"
            >
              {tag}
            </span>
          ))}
          {isSubstack && (
            <span className="px-2 py-0.5 rounded bg-[#3b6ef7]/10 text-[#7babf8]">
              on Substack
            </span>
          )}
        </div>
      </div>

      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {isSubstack && (
        <div className="mt-10 pt-8 border-t border-[#1a3060]">
          <p className="text-[#6b7fa3] text-sm mb-4">
            This is a preview. Read the full article on Substack.
          </p>
          <a
            href={writing.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#3b6ef7] hover:bg-[#2d5fe0] px-5 py-2.5 rounded-full transition-colors shadow-[0_0_24px_#3b6ef733]"
          >
            Continue reading on Substack →
          </a>
        </div>
      )}
    </div>
  );
}
