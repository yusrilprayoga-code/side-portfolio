import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Full-width section separated by a structural rule, with the editorial
 * header pattern: mono index label on the left, display title below.
 *
 *   01 — SELECTED WORK
 *   PROJECTS
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={twMerge("border-t-2 border-line", className)}
    >
      <div className="container-x py-20 md:py-28">
        <header className="mb-12 md:mb-16">
          <p className="label-mono">
            <span aria-hidden="true">{index}</span>
            <span aria-hidden="true"> — </span>
            {label}
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              id={headingId}
              className="headline text-4xl md:text-6xl lg:text-7xl"
            >
              {title}
            </h2>
            {intro ? (
              <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
                {intro}
              </p>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
