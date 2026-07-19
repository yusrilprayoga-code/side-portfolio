import React from "react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Highlighter } from "@/components/ui/highlighter";

/**
 * 01 — ABOUT. Editorial two-column spread: narrative on the left,
 * a bordered stats stack on the right. Stacks to one column on mobile.
 */

const stats: { value: string; label: string }[] = [
  { value: "2+", label: "Years building" },
  { value: "18+", label: "Projects shipped" },
  { value: "30+", label: "Certifications" },
  { value: "7", label: "Roles & programs" },
];

export function AboutSection() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title="Engineer, end to end"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Narrative */}
        <Reveal className="lg:col-span-7">
          <div className="max-w-2xl space-y-6">
            <p className="text-lg leading-relaxed text-fg md:text-xl">
              I&apos;m a{" "}
              <Highlighter action="highlight" color="#ff3d00" isView>
                <span className="text-accent-ink">
                  full-stack engineer from Yogyakarta, Indonesia
                </span>
              </Highlighter>
              , and I take products from{" "}
              <Highlighter
                action="underline"
                color="#ff3d00"
                strokeWidth={2}
                isView
              >
                business requirement to deployed system
              </Highlighter>
              . Right now that means AURORA — an enterprise SSPE monitoring
              and FID governance platform for
              Pertamina Regional 1 — which I&apos;m building end-to-end:
              architecture, PostgreSQL schema, dashboards, and approval
              workflows in Next.js 16, React 19, TypeScript, and Prisma.
            </p>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              I got here by shipping in very different rooms. A backend
              internship at{" "}
              <strong className="font-semibold text-fg">
                PT. Indotech Berkah Abadi
              </strong>{" "}
              building Cleanique Academy&apos;s e-learning platform on Laravel
              and MySQL. Frontend work at{" "}
              <strong className="font-semibold text-fg">
                PT Solutionlabs
              </strong>
              . The Cloud Computing path at{" "}
              <strong className="font-semibold text-fg">
                Bangkit Academy 2024
              </strong>
              , run by Google, GoTo, and Traveloka. Each one moved me across
              the stack until the boundaries stopped mattering.
            </p>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              I hold both sides of a product to the same standard: a dashboard
              nobody can read is a bug, no matter how clean the code behind it
              is. So I sweat the schema design and the type-safe APIs — and
              then I sweat the interface that has to explain them.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <dl className="grid grid-cols-2 border-2 border-line">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "flex flex-col-reverse gap-3 p-6 md:p-8",
                  i % 2 === 1 ? "border-l-2 border-line" : "",
                  i > 1 ? "border-t-2 border-line" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <dt className="label-mono">{stat.label}</dt>
                <dd className="font-display text-5xl font-bold leading-none tracking-tight md:text-6xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
