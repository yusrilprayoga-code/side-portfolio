import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/site/Button";
import {
  featuredCredentials,
  skillBoostBadges,
  skillBoostProfileUrl,
  courseraCertificates,
  dicodingCertificates,
  Credential,
} from "@/constants/certificates";

export const metadata: Metadata = {
  title: "Accomplishments — Yusril Prayoga",
  description:
    "Certifications and badges — Google, Google Cloud, Bangkit Academy, Coursera, Dicoding, and Udemy.",
};

function CertGrid({
  items,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  items: Credential[];
  columns?: string;
}) {
  return (
    <ul className={`grid grid-cols-1 gap-6 ${columns}`}>
      {items.map((cert) => (
        <li key={cert.image + cert.title} className="flex flex-col">
          <div className="relative aspect-[4/3] border-2 border-line">
            <Image
              src={cert.image}
              alt={`Certificate — ${cert.title}`}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top grayscale transition-[filter] duration-300 hover:grayscale-0"
            />
          </div>
          <p className="label-mono mt-3">{cert.title}</p>
          {cert.date ? (
            <p className="mt-1 font-mono text-[11px] uppercase text-muted">
              {cert.date}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function GroupHeader({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <header className="mb-8 mt-16 border-t-2 border-line pt-10 md:mb-10 md:mt-20 md:pt-12">
      <p className="label-mono">
        {index} — {label}
      </p>
      <h2 className="headline mt-3 text-3xl md:text-4xl">{title}</h2>
    </header>
  );
}

const totalCount =
  featuredCredentials.length +
  skillBoostBadges.length +
  courseraCertificates.length +
  dicodingCertificates.length;

export default function AccomplishmentsPage() {
  return (
    <div className="container-x py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <p className="label-mono">Accomplishments — {totalCount} credentials</p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          Certifications<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Proof of work outside the repositories — cloud, security, and
          engineering credentials from Google, Bangkit, Coursera, Dicoding, and
          Udemy.
        </p>
      </header>

      <section aria-label="Featured credentials">
        <header className="mb-8 md:mb-10">
          <p className="label-mono">01 — Verified</p>
          <h2 className="headline mt-3 text-3xl md:text-4xl">
            Featured credentials
          </h2>
        </header>
        <ul className="border-b-2 border-line">
          {featuredCredentials.map((cert) => (
            <li
              key={cert.title}
              className="grid gap-6 border-t-2 border-line py-8 md:grid-cols-[220px_1fr] md:py-10"
            >
              <div className="relative aspect-[4/3] w-full max-w-[220px] border-2 border-line">
                <Image
                  src={cert.image}
                  alt={`Certificate — ${cert.title}`}
                  fill
                  sizes="220px"
                  className="object-cover object-top grayscale transition-[filter] duration-300 hover:grayscale-0"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight md:text-2xl">
                  {cert.title}
                </h3>
                {cert.issuer ? (
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                ) : null}
                {cert.description ? (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {cert.description}
                  </p>
                ) : null}
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-brutal mt-4 w-fit font-mono text-xs uppercase tracking-wider"
                  >
                    View credential <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Google Cloud Skills Boost badges">
        <GroupHeader index="02" label="Google Cloud" title="Skills Boost badges" />
        <CertGrid items={skillBoostBadges} />
        <div className="mt-8">
          <Button href={skillBoostProfileUrl} external variant="outline">
            Public profile <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </section>

      <section aria-label="Coursera certificates">
        <GroupHeader
          index="03"
          label="Coursera"
          title="Google career certificates"
        />
        <CertGrid items={courseraCertificates} />
      </section>

      <section aria-label="Dicoding certificates">
        <GroupHeader index="04" label="Dicoding" title="Dicoding courses" />
        <CertGrid items={dicodingCertificates} />
      </section>
    </div>
  );
}
