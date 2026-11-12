import PageHead from "@/components/PageHead";
import WritingsAccordion from "@/components/WritingsAccordion";
import { getWritings } from "@/lib/writings";

export const metadata = {
  title: "Writings — Yash Raj Singh",
  description: "Essays and things I couldn't stop thinking about.",
};

export const revalidate = 3600;

export default async function WritingsPage() {
  const writings = await getWritings();
  const posts = writings.map((w) => ({
    slug: w.slug,
    title: w.title,
    sub: w.sub,
    date: w.date ? new Date(w.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "",
    lede: w.lede,
    para: w.para,
    url: w.url,
    external: w.external,
  }));

  return (
    <div className="page page-narrow">
      <PageHead
        label="§ 01 — Writings"
        title="Writings"
        count={posts.length}
        sub="Essays and things I couldn't stop thinking about. Click one to preview — the rest lives on Substack."
      />
      {posts.length === 0 ? <p className="subline">Nothing published yet.</p> : <WritingsAccordion posts={posts} />}
    </div>
  );
}
