import LibraryShelves from "@/components/LibraryShelves";
import { getLibrary } from "@/lib/goodreads";
import { READING_GOAL } from "@/data/library";

export const metadata = { title: "Library — Yash Raj Singh" };
export const revalidate = 21600;

export default async function LibraryPage() {
  const lib = await getLibrary();
  const year = new Date().getFullYear();
  const pct = Math.min(100, (lib.readThisYear / READING_GOAL) * 100);
  const cur = lib.current;

  return (
    <div className="page">
      <div className="lib-head">
        <div>
          <h1 className="h1">Library</h1>
          <p className="subline" style={{ margin: 0 }}>
            {lib.synced ? "Synced from Goodreads" : "From my Goodreads shelves"} · {lib.readThisYear} of {READING_GOAL} for {year}
          </p>
          <div className="bar">
            <div style={{ width: `${pct}%` }} />
          </div>
        </div>
        {cur && (
          <a href={cur.url} target="_blank" rel="noopener noreferrer" className="reading">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cur.cover} alt="" />
            <div style={{ flex: 1 }}>
              <div className="reading-label">Currently reading{cur.progress !== undefined && ` · ${cur.progress}%`}</div>
              <div className="reading-t">{cur.title}</div>
              <div className="reading-a">{cur.author}</div>
              {cur.progress !== undefined && (
                <div className="reading-bar">
                  <div style={{ width: `${cur.progress}%` }} />
                </div>
              )}
            </div>
          </a>
        )}
      </div>
      <LibraryShelves read={lib.read} want={lib.want} />
    </div>
  );
}
