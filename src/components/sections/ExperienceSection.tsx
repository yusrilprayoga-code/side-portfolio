import React from "react";
import { timeline } from "@/constants/timeline";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";

/**
 * 03 — EXPERIENCE
 * Editorial timeline: rows divided by structural rules, mono date column
 * on the left, role/company/highlights on the right.
 */

const MONTHS: Record<string, string> = {
  jan: "JAN",
  feb: "FEB",
  mar: "MAR",
  apr: "APR",
  may: "MAY",
  jun: "JUN",
  june: "JUN",
  jul: "JUL",
  aug: "AUG",
  sep: "SEP",
  oct: "OCT",
  nov: "NOV",
  des: "DEC", // Indonesian "Desember" in source data
  dec: "DEC",
};

/** "Aug 25 - Present" → "AUG 2025 — PRESENT", "Des 2023 - Feb 2024" → "DEC 2023 — FEB 2024" */
function formatDateRange(raw: string): string {
  return raw
    .split(/\s*-\s*/)
    .map((part) =>
      part
        .trim()
        .split(/\s+/)
        .map((token) => {
          const month = MONTHS[token.toLowerCase()];
          if (month) return month;
          if (/^\d{2}$/.test(token)) return `20${token}`;
          return token.toUpperCase();
        })
        .join(" ")
    )
    .join(" — ");
}

const MAX_BULLETS = 3;

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      title="Where I've worked"
      intro="Seven roles across enterprise platforms, startups, and media — from database schemas to cloud deployments."
    >
      <ol className="list-none">
        {timeline.map((item, i) => {
          const isCurrent = i === 0;
          return (
            <li key={`${item.company}-${item.date}`} className="border-t-2 border-line">
              <Reveal delay={Math.min(i * 0.05, 0.15)}>
                <article className="grid gap-3 py-8 transition-colors duration-150 hover:bg-soft md:grid-cols-[180px_1fr] md:gap-8 md:py-10">
                  <p className="label-mono md:pt-1.5">
                    {formatDateRange(item.date)}
                  </p>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight md:text-2xl">
                        {item.title}
                      </h3>
                      {isCurrent ? (
                        <span className="border border-accent px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-accent">
                          Current
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 text-sm text-muted md:text-base">
                      {item.company}
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="mt-4 max-w-2xl space-y-2">
                      {item.responsibilities
                        .slice(0, MAX_BULLETS)
                        .map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 flex-none bg-accent"
                            />
                            {point}
                          </li>
                        ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 border-t-2 border-line pt-12 md:mt-16">
        <Button href="/resume" variant="outline">
          Full resume
          <span aria-hidden="true">&rarr;</span>
        </Button>
      </div>
    </Section>
  );
}
