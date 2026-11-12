import fs from "fs";
import path from "path";

export const site = {
  name: "Yash Raj Singh",
  email: "yashrajsingh1001@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/YashRajSingh1001" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yash-raj-singh-1001/" },
    { label: "Instagram", href: "https://www.instagram.com/yashraj.decodes/" },
    { label: "Substack", href: "https://substack.com/@yashraj" },
    { label: "Strava", href: "https://www.strava.com/athletes/112189344" },
  ],
};

// Opens a Gmail compose window addressed to me. Plain mailto: links do nothing
// on machines without a desktop mail app.
export const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}`;

// Logos: drop a file named after the slug into /public/logos (svg, png, jpg or webp).
export const work = [
  { slug: "miq", co: "MiQ", role: "Data Scientist II", d: "Programmatic ad-tech. ML models and AI tooling on PySpark and Azure Databricks.", yrs: "2024 — now" },
  { slug: "treebo", co: "Treebo Hospitality", role: "Senior Business Analyst", d: "Revenue strategy with the exec team — pricing signal and decision dashboards.", yrs: "2023 — 24" },
  { slug: "tresvista", co: "TresVista", role: "Analyst", d: "BI dashboards and automated data pipelines. First full-time role.", yrs: "2022 — 23" },
];

export const skills = [
  { area: "AI & GenAI", items: ["LLMs", "RAG", "AI agents", "MCP", "LLM evals", "Prompt engineering"] },
  { area: "Machine learning", items: ["Python", "scikit-learn", "Statistics", "Forecasting", "Experimentation"] },
  { area: "Data engineering", items: ["PySpark", "Azure Databricks", "SQL", "Pipelines"] },
  { area: "Full stack & cloud", items: ["Next.js", "TypeScript", "FastAPI", "AWS"] },
];

// "Off the clock" strip on the home page. Files live in /public/me.
export const moments: { src: string; date: string; caption: string; video?: boolean }[] = [
  { src: "/me/storm.jpg", date: "Jun '26", caption: "Waiting out the weather" },
  { src: "/me/walk.mp4", date: "Jun '26", caption: "The long way up", video: true },
  { src: "/me/trail.jpg", date: "Jun '26", caption: "One step, then the next" },
  { src: "/me/river.jpg", date: "Jun '26", caption: "Slowing down" },
  { src: "/me/rope.jpg", date: "Dec '25", caption: "Hold the line" },
  { src: "/me/waterfall.jpg", date: "Jun '25", caption: "Monsoon trek" },
];

export function findImage(dir: string, name: string): string | undefined {
  for (const ext of ["svg", "png", "jpg", "jpeg", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", dir, `${name}.${ext}`))) return `/${dir}/${name}.${ext}`;
  }
  return undefined;
}

export const BIRTHDAY = new Date(2002, 5, 23);
export const TURNS_30 = new Date(2032, 5, 23);

export function age(): number {
  const now = new Date();
  const hadBirthday =
    now.getMonth() > BIRTHDAY.getMonth() ||
    (now.getMonth() === BIRTHDAY.getMonth() && now.getDate() >= BIRTHDAY.getDate());
  return now.getFullYear() - BIRTHDAY.getFullYear() - (hadBirthday ? 0 : 1);
}

export function daysLeft(): number {
  return Math.max(0, Math.ceil((TURNS_30.getTime() - Date.now()) / 864e5));
}
