import { site } from "@/constants/site";
import { PortalFigure } from "./PortalFigure";

/**
 * A visual sign-off placed directly above the site footer. Deliberately
 * always dark (ink black + warm white) in both themes — it frames the
 * engraved PortalFigure illustration, whose only color is the accent orb.
 */
export function PortalCta() {
  return (
    <section
      aria-labelledby="portal-heading"
      className="relative isolate overflow-hidden border-t-2 border-line bg-[#0c0b09] text-[#f4efe6]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[4%] text-center font-display text-[clamp(5.5rem,20vw,20rem)] font-bold leading-[0.72] tracking-[-0.08em] text-[#f4efe6]/[0.06]"
      >
        PORTAL
      </div>

      <IdentityMasthead />

      <div className="container-x relative flex min-h-[46rem] flex-col items-center py-16 text-center md:min-h-[52rem] md:py-20">

        <div className="relative z-10 mt-8 text-center md:mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#f4efe6]/70 md:text-sm">
            Build · Ship · Improve · Repeat
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex border-2 border-[#f4efe6] bg-[#f4efe6] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0c0b09] transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4efe6] md:px-8 md:py-4 md:text-sm"
          >
            Start a project <span aria-hidden="true">↗</span>
          </a>
        </div>

        <PortalFigure />

        <div className="absolute inset-x-5 bottom-7 z-10 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#f4efe6]/70 sm:inset-x-8 md:bottom-10 md:text-xs">
          <p>{site.role}</p>
          <p className="hidden sm:block">Yogyakarta · Indonesia</p>
          <p className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 bg-accent"
              aria-hidden="true"
            />
            Open to work
          </p>
        </div>
      </div>
    </section>
  );
}

function IdentityMasthead() {
  return (
    <div className="relative z-10 w-full overflow-hidden bg-[#f4efe6] px-5 pb-[12%] pt-5 text-[#0c0b09] sm:px-7 md:h-[30rem] md:px-10 md:pb-6 md:pt-7">
      <div className="grid gap-6 sm:grid-cols-[4rem_1fr] md:grid-cols-[5.5rem_1fr_1fr_1fr] md:gap-10">
        <div className="flex h-14 w-14 items-center justify-center bg-[#0c0b09] font-editorial text-3xl leading-none text-[#f4efe6] md:h-20 md:w-20 md:text-5xl">
          {site.initials}
        </div>
        <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.16em] md:text-sm">
          Full-stack engineer building reliable digital products from first
          idea to production.
        </p>
        <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.16em] md:text-sm">
          Web applications, data systems, thoughtful interfaces, and practical
          problem solving.
        </p>
        <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.16em] md:text-sm">
          Available for collaboration, freelance work, and ambitious teams that
          care about craft.
        </p>
      </div>

      <h2 id="portal-heading" className="sr-only">
        {site.name}
      </h2>

      {/* Hermès-style wordmark: SVG textLength stretches the name to the
          exact full card width at every viewport; the baseline is sunk past
          the card's bottom edge so the letter bottoms clip against it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[14%]"
      >
        <svg
          viewBox="0 0 1200 125"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          <text
            x="600"
            y="117"
            textAnchor="middle"
            textLength="1196"
            lengthAdjust="spacingAndGlyphs"
            fontSize="142"
            fontWeight="560"
            fill="#0c0b09"
            className="font-editorial uppercase"
          >
            {site.name}
          </text>
        </svg>
      </div>
    </div>
  );
}
