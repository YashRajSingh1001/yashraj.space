import { categories, goalCounts, TARGET, type Status } from "@/data/goals";
import { daysLeft, age } from "@/data/site";

export const metadata = { title: "100 before 30 — Yash Raj Singh" };
export const revalidate = 3600;

const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

function dotStyle(status: Status, col: string): React.CSSProperties {
  if (status === "done") return { background: col, boxShadow: `inset 0 0 0 1.5px ${col}` };
  if (status === "progress")
    return { background: `linear-gradient(90deg, ${col} 50%, transparent 50%)`, boxShadow: `inset 0 0 0 1.5px ${col}` };
  return { boxShadow: `inset 0 0 0 1.5px ${mix(col, 40)}` };
}

export default function Goals100Page() {
  const cols = categories.map((c) => {
    const done = c.goals.filter((g) => g.status === "done").length;
    return { ...c, done, total: c.goals.length, pct: (done / c.goals.length) * 100 };
  });
  const open = goalCounts.open;

  return (
    <div className="page">
      <div className="list-head">
        <div>
          <h1 className="h1">{TARGET} before 30</h1>
          <p className="subline" style={{ margin: 0 }}>
            Places to see, skills to learn and goals to hit before I turn 30.
          </p>
        </div>
        <div className="list-stats">
          <span>
            <b>{goalCounts.done}</b> /{TARGET} done
          </span>
          <span>
            <b>{goalCounts.progress}</b> in progress
          </span>
          <span>
            <b>{daysLeft().toLocaleString("en-US")}</b> days left
          </span>
        </div>
      </div>

      <div className="seg">
        {cols.map((c) => (
          <div key={c.name} style={{ flex: c.total, background: mix(c.color, 14) }}>
            <div style={{ width: `${c.pct}%`, background: c.color }} />
          </div>
        ))}
        {open > 0 && <div style={{ flex: open, background: "var(--line)" }} />}
      </div>

      <div className="cols">
        {cols.map((c) => (
          <div key={c.name}>
            <div className="col-head" style={{ borderBottomColor: c.color }}>
              <span className="col-name">
                <span className="swatch" style={{ background: c.color }} />
                {c.name}
              </span>
              <span className="col-count" style={{ color: c.color, background: mix(c.color, 14) }}>
                {c.done}/{c.total}
              </span>
            </div>
            {c.goals.map((g) => (
              <div
                key={g.title}
                className="goal"
                style={g.status === "done" ? { color: "var(--dim)", textDecoration: "line-through" } : undefined}
                title={g.note}
              >
                <span className="goal-dot" style={dotStyle(g.status, c.color)} />
                {g.title}
              </div>
            ))}
          </div>
        ))}

        {open > 0 && (
          <div className="open-col">
            <div className="col-head">
              <span className="col-name">
                <span className="swatch" style={{ boxShadow: "inset 0 0 0 1.5px var(--line2)" }} />
                Still figuring out
              </span>
              <span className="col-count" style={{ color: "var(--muted)", background: "var(--chip)" }}>
                {open}
              </span>
            </div>
            <p className="open-note">
              I&apos;m {age()} — I haven&apos;t figured out everything I want yet. These {open} spots fill up as I find
              them.
            </p>
            <div className="open-dots">
              {Array.from({ length: open }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="legend">
        <span>
          <i style={{ background: "var(--fg)" }} />
          done
        </span>
        <span>
          <i
            style={{
              background: "linear-gradient(90deg, var(--fg) 50%, transparent 50%)",
              boxShadow: "inset 0 0 0 1.5px var(--fg)",
            }}
          />
          in progress
        </span>
        <span>
          <i style={{ boxShadow: "inset 0 0 0 1.5px var(--dim)" }} />
          not yet
        </span>
      </div>
    </div>
  );
}
