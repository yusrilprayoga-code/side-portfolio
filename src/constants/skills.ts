// Skills dataset — derived from real project stacks (constants/products.tsx),
// work history (constants/timeline.tsx), and the tech stack list
// (components/TechStack.tsx). Names are normalized ("Nextjs" → "Next.js").
// Each category is capped at 4–8 items, strongest first.

export type SkillCategory = {
  /** Category name shown in the mono label column. */
  name: string;
  /** Normalized skill names, strongest first. */
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Vue.js",
      "Flutter",
    ],
  },
  {
    name: "Backend",
    skills: ["Laravel", "PHP", "Node.js", "REST APIs", "Prisma", "Zod"],
  },
  {
    name: "AI & Data",
    skills: [
      "OpenAI API",
      "Vercel AI SDK",
      "Streaming LLM UIs",
      "ETL Pipelines",
      "KPI Dashboards",
    ],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "Neon", "Hive"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["Google Cloud", "AWS", "Docker", "Vercel", "CI/CD"],
  },
  {
    name: "Tools",
    skills: ["Git & GitHub", "Figma", "Jest", "Adobe XD"],
  },
];
