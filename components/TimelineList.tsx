"use client";

import { useState } from "react";
import { milestones, kindColor, type Kind } from "@/data/timeline";

const years = [...new Set(milestones.map((m) => m.year))].sort((a, b) => b - a);
const kinds = Object.keys(kindColor) as Kind[];
const tint = (c: string) => `color-mix(in srgb, ${c} 13%, transparent)`;

export default function TimelineList() {
  const [year, setYear] = useState<number | "all">("all");
  const [kind, setKind] = useState<Kind | "all">("all");

  const shown = milestones.filter((m) => (year === "all" || m.year === year) && (kind === "all" || m.kind === kind));

  return (
    <>
      <div className="year-tabs">
        {(["all", ...years] as const).map((y) => (
          <button key={y} type="button" className="year-tab" aria-pressed={year === y} onClick={() => setYear(y)}>
            {y === "all" ? "All" : y}{" "}
            <span className="n">({y === "all" ? milestones.length : milestones.filter((m) => m.year === y).length})</span>
          </button>
        ))}
      </div>

      <div className="kinds">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            className="kind"
            aria-pressed={kind === k}
            style={{ opacity: kind === "all" || kind === k ? 1 : 0.35 }}
            onClick={() => setKind(kind === k ? "all" : k)}
          >
            <span className="dot" style={{ background: kindColor[k] }} />
            {k}
          </button>
        ))}
      </div>

      {shown.map((m) => (
        <div key={`${m.year}-${m.month}-${m.title}`} className="tl-row">
          <span className="tl-date">
            {m.month} &apos;{String(m.year).slice(2)}
          </span>
          <div>
            <div className="tl-title">
              <span className="dot" style={{ background: kindColor[m.kind] }} />
              {m.title}
            </div>
            <div className="tl-body">
              <span className="tag" style={{ color: kindColor[m.kind], background: tint(kindColor[m.kind]) }}>
                {m.kind}
              </span>
              {m.body}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
