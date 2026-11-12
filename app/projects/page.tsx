import PageHead from "@/components/PageHead";
import { getAllProjects } from "@/lib/projects";

export const metadata = { title: "Projects — Yash Raj Singh" };

const statusStyle = {
  Building: { color: "var(--c-green)", background: "color-mix(in srgb, var(--c-green) 13%, transparent)" },
  Shipped: { color: "var(--muted)", background: "var(--chip)" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="page">
      <PageHead title="Projects" sub="Builds and experiments, with code on GitHub." />
      <div className="proj-grid">
        {projects.map((p) => (
          <div key={p.slug} className="card">
            <div className="shot">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={`${p.name} screenshot`} />
              ) : (
                <>screenshot · {p.name}</>
              )}
            </div>
            <div className="card-body">
              <div className="card-head">
                <span className="card-name">{p.name}</span>
                <span className="pill" style={statusStyle[p.status]}>
                  {p.status}
                </span>
              </div>
              <div className="card-desc">{p.description}</div>
              <div className="card-foot">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
                <span className="card-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      Code ↗
                    </a>
                  )}
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      Visit ↗
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
