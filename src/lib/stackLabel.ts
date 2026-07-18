// Normalizes the messy stack casing stored in constants/products.tsx
// ("Nextjs" → "Next.js") for display. Data stays untouched.
const STACK_LABELS: Record<string, string> = {
  nextjs: "Next.js",
  reactjs: "React",
  tailwindcss: "Tailwind CSS",
  mysql: "MySQL",
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  "t3 web": "T3 Stack",
  "neon tech": "Neon",
  "php native": "PHP",
  "vue js": "Vue.js",
  html: "HTML",
  css: "CSS",
};

export function stackLabel(raw: string): string {
  return STACK_LABELS[raw.toLowerCase()] ?? raw;
}
