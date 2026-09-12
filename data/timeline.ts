export interface Milestone {
  year: string;
  month?: string;
  title: string;
  description: string;
  type: "work" | "life" | "project" | "education";
}

export const milestones: Milestone[] = [
  {
    year: "2019",
    title: "BSc Mathematics Honours — Delhi University, North Campus (CGPA 9.09)",
    description: "Fell in love with numbers. Graduated with perfect 10 in 12 subjects across 3 years. Won a mathematical relay at Miranda House.",
    type: "education",
  },
  {
    year: "2021",
    month: "January",
    title: "Started IIT Madras Diploma — Data Science & Business Analytics",
    description: "Enrolled while in college. Machine learning, statistics, Python, business analytics. The bridge between pure math and real-world problems.",
    type: "education",
  },
  {
    year: "2022",
    month: "July",
    title: "Analyst — TresVista, Pune",
    description: "First full-time role. Cross-functional data analysis, BI dashboards, automated data pipelines. 1.5 years of learning what analytics looks like at speed.",
    type: "work",
  },
  {
    year: "2023",
    month: "November",
    title: "Senior Business Analyst — Treebo Hospitality Ventures, Bengaluru",
    description: "Worked directly with senior leadership on revenue strategy — data collection, cleaning, dashboards, and finding the signal in the noise.",
    type: "work",
  },
  {
    year: "2024",
    month: "April",
    title: "Diploma completed — IIT Madras (CGPA 8.64)",
    description: "3 years, 2 levels, 18+ courses. Glad I did it.",
    type: "education",
  },
  {
    year: "2024",
    month: "July",
    title: "Senior Business Analyst — MiQ, Bengaluru",
    description: "Joined MiQ. Deeper into data — Azure Databricks, PySpark, and the full analytics stack at scale.",
    type: "work",
  },
  {
    year: "2025",
    month: "October",
    title: "AWS Certified — Cloud Practitioner + AI Practitioner",
    description: "Got both in back-to-back months. Cloud infrastructure and AI fundamentals, certified.",
    type: "education",
  },
  {
    year: "2026",
    month: "March",
    title: "Data Scientist II — MiQ, Bengaluru",
    description: "Promoted. Same curiosity, bigger problems, now with the title to match the work I was already doing.",
    type: "work",
  },
  {
    year: "2026",
    month: "April",
    title: "Started taking running seriously",
    description: "Decided to stop dabbling and actually commit. Lacing up every morning and not stopping.",
    type: "life",
  },
  {
    year: "2026",
    month: "May",
    title: "First official 10K — 24th May",
    description: "Crossed the finish line. Proof that consistency beats motivation every time.",
    type: "life",
  },
  {
    year: "2026",
    month: "June",
    title: "Finally put a corner of the internet together.",
    description: "Somewhere to think, write, and keep track.",
    type: "project",
  },
];
