import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { products } from "@/constants/products";

/* ------------------------------------------------------------------------- */
/* Data selection — curated homepage cut, everything else lives in /projects */
/* ------------------------------------------------------------------------- */

// "tailwindmasterkit" is a template leftover, never shown anywhere.
const catalogue = products.filter((p) => p.slug !== "tailwindmasterkit");

function bySlug(slug: string) {
  const project = catalogue.find((p) => p.slug === slug);
  if (!project) throw new Error(`ProjectsSection: unknown slug "${slug}"`);
  return project;
}

const aurora = bySlug("aurora");
const featuredPair = [bySlug("ai-gmail"), bySlug("picstash")];
const indexRows = [
  bySlug("B-Otomotif"),
  bySlug("cleanique-academy"),
  bySlug("orchidbrand-e-commerce"),
];

// AURORA's title is "AURORA — SSPE Monitoring & Governance Platform".
const [auroraName, auroraSubtitle] = aurora.title.split(" — ");

/* ------------------------------------------------------------------------- */
/* Display helpers                                                           */
/* ------------------------------------------------------------------------- */

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

function stackLabel(raw: string) {
  return STACK_LABELS[raw.toLowerCase()] ?? raw;
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li
          key={item}
          className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
        >
          {stackLabel(item)}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------------- */
/* Section                                                                   */
/* ------------------------------------------------------------------------- */

export function ProjectsSection() {
  return (
    <Section
      id="work"
      index="04"
      label="Selected work"
      title="Projects"
      intro="A curated cut of shipped work — an enterprise data platform, AI products, and full-stack builds. The rest live in the archive."
    >
      {/* ------------------------------------------------ Featured 01: AURORA */}
      <Reveal>
        <article className="group relative border-2 border-line bg-bg transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[16/10] border-b-2 border-line md:aspect-auto md:border-b-0 md:border-r-2">
              <Image
                src={aurora.thumbnail}
                alt="AURORA platform cover — abstract dashboard artwork standing in for proprietary screenshots"
                fill
                sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
            </div>

            <div className="flex flex-col p-6 md:p-10">
              <p className="label-mono">Featured — 01</p>

              <h3 className="headline mt-4 text-3xl md:text-4xl lg:text-5xl">
                <Link
                  href={`/projects/${aurora.slug}`}
                  className="after:absolute after:inset-0"
                >
                  {auroraName}
                  <span className="text-accent">.</span>
                </Link>
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {auroraSubtitle}
              </p>

              <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted md:text-base">
                {aurora.description}
              </p>

              <div className="mt-6">
                <StackChips stack={aurora.stack} />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-line pt-5 md:mt-auto">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Private / proprietary build
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs uppercase tracking-wider transition-colors duration-150 group-hover:text-accent"
                >
                  Case study &rarr;
                </span>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {/* --------------------------------------------- Featured 02 + 03 pair */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {featuredPair.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <article className="group relative flex h-full flex-col border-2 border-line bg-bg transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal">
              <div className="relative aspect-[16/10] border-b-2 border-line">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} — interface screenshot`}
                  fill
                  sizes="(min-width: 1280px) 610px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="label-mono">Featured — {`0${i + 2}`}</p>

                <h3 className="headline mt-3 text-xl md:text-2xl">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-5">
                  <StackChips stack={project.stack} />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-2 border-line pt-4 md:mt-auto">
                  {/* Sits above the stretched card link — never a nested <a>. */}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-brutal relative z-10 font-mono text-xs uppercase tracking-wider"
                  >
                    Live site &#8599;
                  </a>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs uppercase tracking-wider transition-colors duration-150 group-hover:text-accent"
                  >
                    Details &rarr;
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* ------------------------------------------------------- Index list */}
      <Reveal className="mt-16 md:mt-20">
        <p className="label-mono mb-4">More builds</p>
        <div className="border-b-2 border-line">
          {indexRows.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t-2 border-line py-5 transition-colors duration-150 hover:bg-soft md:grid-cols-[3.5rem_1fr_auto_auto] md:gap-6 md:py-6"
            >
              <span className="font-mono text-xs text-muted" aria-hidden="true">
                {String(i + 4).padStart(2, "0")}
              </span>
              <span className="headline text-lg md:text-2xl">
                {project.title}
              </span>
              <span className="hidden font-mono text-xs uppercase tracking-wider text-muted md:block">
                {project.stack.map(stackLabel).join(" / ")}
              </span>
              <span
                aria-hidden="true"
                className="justify-self-end font-mono text-sm transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* ------------------------------------------------------------- CTA */}
      <Reveal className="mt-12 md:mt-16">
        <Button href="/projects" variant="solid">
          All projects ({catalogue.length}) &rarr;
        </Button>
      </Reveal>
    </Section>
  );
}
