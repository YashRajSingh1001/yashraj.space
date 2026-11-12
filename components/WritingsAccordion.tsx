"use client";

import { useState } from "react";
import Link from "next/link";

export interface Post {
  slug: string;
  title: string;
  sub: string;
  date: string;
  lede: string;
  para: string;
  url: string;
  external: boolean;
}

export default function WritingsAccordion({ posts }: { posts: Post[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {posts.map((p, i) => (
        <div key={p.slug} className="acc">
          <button type="button" className="acc-head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <div style={{ flex: 1 }}>
              <div className="acc-title">{p.title}</div>
              {p.sub && <div className="acc-sub">{p.sub}</div>}
            </div>
            <span className="acc-date">{p.date}</span>
          </button>
          {open === i && (
            <div className="acc-body">
              <p className="acc-lede">{p.lede}</p>
              {p.para && <p className="acc-para">{p.para}</p>}
              {p.external ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Continue reading on {p.url.includes("medium.com") ? "Medium" : "Substack"} ↗
                </a>
              ) : (
                <Link href={p.url} className="btn btn-primary">
                  Continue reading →
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
