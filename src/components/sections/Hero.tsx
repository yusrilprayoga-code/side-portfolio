import Image from "next/image";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/constants/site";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[calc(100svh-4rem)] flex-col"
    >
      <div className="container-x flex flex-1 flex-col justify-center py-16 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="label-mono">
              {site.role} — {site.location}
            </p>
            <p className="label-mono flex items-center gap-2 text-fg">
              <span
                className="inline-block h-2 w-2 bg-accent"
                aria-hidden="true"
              />
              {site.availability}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal delay={0.05}>
            <h1 className="headline text-[clamp(3.25rem,11vw,9.5rem)]">
              Yusril
              <br />
              Prayoga
              <span className="text-accent" aria-hidden="true">
                .
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="hidden lg:block">
            <div className="border-2 border-line shadow-brutal">
              <Image
                src="/images/profil.JPG"
                alt="Portrait of Yusril Prayoga"
                width={240}
                height={288}
                priority
                className="h-72 w-60 object-cover grayscale transition duration-300 hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              I design and build data-heavy web products end-to-end — from the
              database schema to the last pixel of the dashboard. Currently
              shipping <span className="font-semibold text-fg">AURORA</span>,
              an enterprise monitoring &amp; governance platform for Pertamina.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/#work">
                View work <span aria-hidden="true">↓</span>
              </Button>
              <Button href="/#contact" variant="outline">
                Get in touch
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-t-2 border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4">
          <p className="label-mono">
            Scroll <span aria-hidden="true">↓</span>
          </p>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono transition-colors duration-150 hover:text-accent"
          >
            GitHub — yusrilprayoga-code <span aria-hidden="true">↗</span>
          </a>
          <p className="label-mono hidden sm:block">WIB / UTC+7</p>
        </div>
      </div>
    </section>
  );
}
