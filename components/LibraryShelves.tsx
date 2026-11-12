"use client";

import { useState } from "react";
import type { Book } from "@/data/library";

const stars = (r?: number) => (r ? "★".repeat(r) + "☆".repeat(5 - r) : "");

export default function LibraryShelves({ read, want }: { read: Book[]; want: Book[] }) {
  const [tab, setTab] = useState<"read" | "want">("read");
  const shelves = { read, want };
  const books = shelves[tab];

  return (
    <>
      <div className="tabs" role="tablist">
        {(
          [
            ["read", "Read"],
            ["want", "Want to read"],
          ] as const
        ).map(([k, label]) => (
          <button key={k} type="button" role="tab" className="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
            {label} <span className="n">{shelves[k].length}</span>
          </button>
        ))}
      </div>
      <div className="books">
        {books.map((b) => (
          <a key={b.url + b.title} href={b.url} target="_blank" rel="noopener noreferrer" className="book">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.cover} alt="" loading="lazy" />
            <div className="book-t">{b.title}</div>
            <div className="book-a">{b.author}</div>
            {b.rating && <div className="book-stars">{stars(b.rating)}</div>}
            {b.note && <div className="book-note">{b.note}</div>}
          </a>
        ))}
      </div>
    </>
  );
}
