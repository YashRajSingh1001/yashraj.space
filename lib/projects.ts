import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "projects");

export interface Project {
  slug: string;
  name: string;
  description: string;
  status: "Building" | "Shipped";
  stack: string[];
  url?: string;
  github?: string;
  image?: string; // path under /public, e.g. /projects/foo.png
  order: number;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(projectsDir, file), "utf-8"));
      return {
        slug,
        name: data.name ?? data.title ?? slug,
        description: data.description ?? "",
        status: data.status === "Shipped" ? "Shipped" : "Building",
        stack: data.stack ?? [],
        url: data.url,
        github: data.github,
        image: data.image,
        order: data.order ?? 99,
      } as Project;
    })
    .sort((a, b) => a.order - b.order);
}
