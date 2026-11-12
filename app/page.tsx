import Link from "next/link";
import { gmailCompose, work, skills, moments, findImage } from "@/data/site";
import { goalCounts, TARGET } from "@/data/goals";
import { milestones } from "@/data/timeline";
import { getWritings } from "@/lib/writings";
import { getAllProjects } from "@/lib/projects";
import { getLibrary } from "@/lib/goodreads";
import { getInstagramPosts, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/instagram";

export const revalidate = 3600;

export default async function Home() {
  const [writings, library, insta] = await Promise.all([getWritings(), getLibrary(), getInstagramPosts()]);
  const projects = getAllProjects();
  const photo = findImage("me", "portrait");

  const sections = [
    { n: "01", t: "Writings", d: "Essays on Substack", c: writings.length, href: "/writings" },
    { n: "02", t: "Projects", d: "Builds, with code", c: projects.length, href: "/projects" },
    { n: "03", t: "Timeline", d: "Since 2022", c: milestones.length, href: "/timeline" },
    { n: "04", t: "Library", d: "Goodreads shelves", c: library.read.length + library.want.length + (library.current ? 1 : 0), href: "/library" },
    { n: "05", t: "100 before 30", d: "Goals before I turn 30", c: `${goalCounts.done}/${TARGET}`, href: "/100-before-30" },
    { n: "06", t: "Activity", d: "Spotify · Fitbit · F1", c: "live", href: "/activity" },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <div className="label hero-eyebrow">Yash Raj Singh — Data Scientist II at MiQ · Bengaluru</div>
          <h1>
            I build AI systems end to end, <em>from raw data to agents in production.</em>
          </h1>
          <div className="about">
            <p>
              I&apos;m a data scientist at MiQ, building machine learning models and AI tooling for programmatic
              advertising on PySpark and Azure Databricks.
            </p>
            <p>
              Outside work I build GenAI and agentic apps — LLM agents, RAG pipelines and MCP tools — and ship them
              myself, from the model to the frontend.
            </p>
            <p>
              Maths at Delhi University (9.09 CGPA) and data science at IIT Madras. Before MiQ, analytics at Treebo
              and TresVista.
            </p>
          </div>
          <div className="btn-row">
            <a href={gmailCompose} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Get in touch
            </a>
            <Link href="/projects" className="btn">
              See my work →
            </Link>
          </div>
        </div>
        <div className="portrait">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Yash Raj Singh" />
          ) : (
            <span>photo</span>
          )}
        </div>
      </section>

      <section className="fig fig-bordered fig-top">
        <div>
          <div className="label">FIG. 01</div>
          <div className="fig-title">Where I&apos;ve worked</div>
        </div>
        <div>
          {work.map((w) => {
            const logo = findImage("logos", w.slug);
            return (
              <div key={w.co} className="work-row">
                <div className="logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {logo ? <img src={logo} alt={`${w.co} logo`} /> : <span>{w.co[0]}</span>}
                </div>
                <div>
                  <div className="work-co">
                    {w.co} <span>· {w.role}</span>
                  </div>
                  <div className="work-d">{w.d}</div>
                </div>
                <span className="work-yrs">{w.yrs}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="fig fig-bordered">
        <div>
          <div className="label">FIG. 02</div>
          <div className="fig-title">What I work with</div>
        </div>
        <div>
          {skills.map((s) => (
            <div key={s.area} className="skill-row">
              <span className="skill-area">{s.area}</span>
              <div className="skill-items">
                {s.items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fig fig-bordered">
        <div>
          <div className="label">FIG. 03</div>
          <div className="fig-title">Off the clock</div>
          <p className="fig-note">Mostly mountains. Usually on foot.</p>
        </div>
        <div className="strip">
          {moments.map((m) => (
            <figure key={m.src} className="moment">
              {m.video ? (
                <video src={m.src} autoPlay muted loop playsInline aria-label={m.caption} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.src} alt={m.caption} loading="lazy" />
              )}
              <figcaption>
                <span>{m.caption}</span>
                <span className="mono">{m.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="fig fig-bordered">
        <div>
          <div className="label">FIG. 04</div>
          <div className="fig-title">On Instagram</div>
          <p className="fig-note">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              @{INSTAGRAM_HANDLE} ↗
            </a>
          </p>
        </div>
        {insta && insta.length > 0 ? (
          <div className="insta-grid">
            {insta.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="insta-post" title={p.caption}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.caption} loading="lazy" />
                {p.isVideo && <span className="insta-badge">▶</span>}
              </a>
            ))}
          </div>
        ) : (
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="insta-card">
            <div>
              <div className="insta-handle">@{INSTAGRAM_HANDLE}</div>
              <div className="insta-desc">Short videos on data, AI and the stories behind the numbers.</div>
            </div>
            <span className="btn btn-primary">Follow on Instagram ↗</span>
          </a>
        )}
      </section>

      <section className="fig fig-last">
        <div>
          <div className="label">FIG. 05</div>
          <div className="fig-title">On this site</div>
        </div>
        <div className="tiles">
          {sections.map((x) => (
            <Link key={x.n} href={x.href} className="tile">
              <div className="tile-top">
                <span>{x.n}</span>
                <span>{x.c}</span>
              </div>
              <div>
                <div className="tile-t">{x.t} →</div>
                <div className="tile-d">{x.d}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
