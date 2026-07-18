import Link from "next/link";
import { site } from "@/constants/site";
import LiveVisitorCounterWithAPI from "@/components/LiveVisitorCounterWithAPI";

const footerLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
];

const siteLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Accomplishments", href: "/accomplishments" },
  { label: "Resume", href: "/resume" },
  { label: "AI Chatbot", href: "/chatbot" },
];

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-line">
      <div className="container-x py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="label-mono mb-4">Socials</p>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-brutal font-display font-bold uppercase"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono mb-4">Pages</p>
            <ul className="space-y-2">
              {siteLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="link-brutal font-display font-bold uppercase"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono mb-4">Info</p>
            <p className="font-display font-bold uppercase">{site.location}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <span
                className="inline-block h-2 w-2 bg-accent"
                aria-hidden="true"
              />
              {site.availability}
            </p>
            <LiveVisitorCounterWithAPI />
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t-2 border-line pt-6 sm:flex-row">
          <p className="label-mono">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="label-mono">Built with Next.js — no template</p>
        </div>
      </div>
    </footer>
  );
}
