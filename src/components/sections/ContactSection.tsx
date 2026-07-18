import { Section } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/constants/site";

const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
];

/**
 * 05 — CONTACT. The site's mega CTA: a huge mailto headline, a secondary
 * row with the contact-form button and social links, and an availability
 * strip. The footer below stays slim, so this section carries the weight.
 */
export function ContactSection() {
  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      title="Let's work together"
    >
      <div className="space-y-12 md:space-y-16">
        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Open to full-time roles, freelance projects, and collaboration. If
            you have something worth building, my inbox is the fastest way to
            reach me.
          </p>
        </Reveal>

        {/* The centerpiece: email as a huge display link */}
        <Reveal delay={0.05}>
          <a
            href={`mailto:${site.email}`}
            className="headline block break-words text-[clamp(1.5rem,5vw,4.5rem)] transition-colors duration-150 hover:text-accent"
          >
            {site.email}
          </a>
        </Reveal>

        {/* Secondary row: contact form + social links */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-8 border-2 border-line p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <Button variant="outline" href="/contact">
              Use the contact form
            </Button>
            <ul className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0 sm:divide-x-2 sm:divide-line">
              {socials.map((social) => (
                <li
                  key={social.label}
                  className="sm:px-6 sm:first:pl-0 sm:last:pr-0"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-brutal font-mono text-sm uppercase tracking-wider hover:text-accent"
                  >
                    {social.label} <span aria-hidden="true">&#8599;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Availability strip */}
        <Reveal delay={0.15}>
          <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-2">
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent" />
            <span>{site.availability}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{site.location}</span>
            <span aria-hidden="true">&middot;</span>
            <span>WIB (UTC+7)</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
