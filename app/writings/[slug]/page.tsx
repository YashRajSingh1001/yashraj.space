import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { getLocalWritings, getWritingBySlug } from "@/lib/writings";

// Full essay page, for posts that don't live on Substack.

export async function generateStaticParams() {
  return getLocalWritings().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;
  const writing = getWritingBySlug(slug);
  if (!writing) return {};
  return { title: `${writing.title} — Yash Raj Singh`, description: writing.sub || writing.lede };
}

export default async function WritingPage(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;
  const writing = getWritingBySlug(slug);
  if (!writing) notFound();
  if (writing.external) redirect(writing.url);

  const html = (await remark().use(remarkGfm).use(remarkHtml).process(writing.content)).toString();
  const date = writing.date
    ? new Date(writing.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <article className="page page-narrow essay">
      <Link href="/writings" className="back-link">
        ← all writings
      </Link>
      <h1 className="h1">{writing.title}</h1>
      <div className="essay-meta">{date}</div>
      <div className="essay-body" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
