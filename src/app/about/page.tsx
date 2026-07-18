import Image from "next/image";
import { Metadata } from "next";
import { WorkHistory } from "@/components/WorkHistory";
import { Button } from "@/components/site/Button";
import { site } from "@/constants/site";

export const metadata: Metadata = {
  title: "About — Yusril Prayoga",
  description:
    "Full-stack software engineer from Yogyakarta, Indonesia — building data-heavy products end-to-end with Next.js, TypeScript, and PostgreSQL.",
};

export default function AboutPage() {
  return (
    <div className="container-x py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <p className="label-mono">About — the longer version</p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          About me<span className="text-accent">.</span>
        </h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
          <p className="text-fg">
            Hey — I&apos;m {site.name}, a full-stack engineer from{" "}
            {site.location}. I take products from business requirement to
            deployed system, and I&apos;m happiest when the problem involves a
            lot of data and a UI that has to make it legible.
          </p>
          <p>
            Right now I&apos;m building <strong className="text-fg">AURORA</strong>,
            an enterprise monitoring and governance platform for Pertamina
            Regional 1&apos;s Subsurface Performance &amp; Engineering team —
            designing the architecture, PostgreSQL schema, dashboards, and
            approval workflows end-to-end with Next.js, TypeScript, and Prisma.
          </p>
          <p>
            Before that, I shipped production work across very different
            domains: backend for the Cleanique Academy e-learning platform,
            frontend at PT Solutionlabs, the B-Otomotif automotive site, and
            Google Cloud infrastructure as a Bangkit Academy 2024 Cloud
            Computing graduate. That mix taught me to move comfortably between
            frontend, backend, databases, and deployment — and to care about
            the business problem behind every feature.
          </p>
          <p>
            I believe aesthetics and usability go hand in hand: a dashboard
            nobody can read is a bug, no matter how clean the code is. When
            I&apos;m not coding, I write about what I learn and edit videos.
          </p>
        </div>

        <div>
          <div className="border-2 border-line shadow-brutal">
            <Image
              src="/images/profil.JPG"
              alt="Portrait of Yusril Prayoga"
              width={320}
              height={400}
              className="h-auto w-full object-cover grayscale transition duration-300 hover:grayscale-0"
            />
          </div>
          <p className="label-mono mt-3">
            {site.role} — {site.location}
          </p>
        </div>
      </div>

      <div className="mt-16 border-t-2 border-line pt-12 md:mt-24 md:pt-16">
        <p className="label-mono">Experience — full record</p>
        <h2 className="headline mt-4 text-3xl md:text-5xl">Where I&apos;ve worked</h2>
        <WorkHistory />
      </div>

      <div className="mt-12 flex flex-wrap gap-3 border-t-2 border-line pt-12">
        <Button href="/#contact">Let&apos;s talk</Button>
        <Button href="/resume" variant="outline">
          View resume
        </Button>
      </div>
    </div>
  );
}
