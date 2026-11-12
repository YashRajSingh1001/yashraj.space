export type Kind = "work" | "learning" | "life" | "project";

export interface Milestone {
  year: number;
  month: string; // short month, e.g. "Jun"
  kind: Kind;
  title: string;
  body: string;
}

// Newest first.
export const milestones: Milestone[] = [
  { year: 2026, month: "Jun", kind: "project", title: "Launched yashraj.space", body: "My own corner of the internet — writing, projects and goals." },
  { year: 2026, month: "May", kind: "life", title: "First official 10K", body: "Bengaluru, 24th May. Proof that consistency beats motivation." },
  { year: 2026, month: "Apr", kind: "life", title: "Started taking running seriously", body: "Stopped dabbling. Laced up every morning and didn't stop." },
  { year: 2026, month: "Mar", kind: "work", title: "Promoted to Data Scientist II", body: "MiQ — same curiosity, bigger problems." },
  { year: 2025, month: "Oct", kind: "learning", title: "AWS Cloud + AI Practitioner", body: "Both certifications in back-to-back months." },
  { year: 2024, month: "Jul", kind: "work", title: "Joined MiQ as Senior Business Analyst", body: "Azure Databricks, PySpark and the analytics stack at scale." },
  { year: 2024, month: "Apr", kind: "learning", title: "Finished IIT Madras diploma", body: "CGPA 8.64 · 3 years, 18+ courses." },
  { year: 2023, month: "Nov", kind: "work", title: "Senior Business Analyst at Treebo", body: "Moved to Bengaluru. Revenue strategy with the exec team." },
  { year: 2022, month: "Jul", kind: "work", title: "Analyst at TresVista", body: "Pune · first full-time role. BI dashboards, automated pipelines." },
  { year: 2022, month: "Jun", kind: "learning", title: "Graduated — BSc Maths, Delhi University", body: "9.09 GPA, perfect 10 in 12 subjects." },
];

export const kindColor: Record<Kind, string> = {
  work: "var(--c-purple)",
  learning: "var(--c-blue)",
  life: "var(--c-green)",
  project: "var(--c-orange)",
};
