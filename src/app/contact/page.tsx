import { Contact } from "@/components/Contact";
import { site } from "@/constants/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Yusril Prayoga",
  description:
    "Get in touch with Yusril Prayoga for full-time roles, freelance projects, and collaboration.",
};

export default function ContactPage() {
  return (
    <div className="container-x py-16 md:py-24">
      <header className="mb-10 md:mb-14">
        <p className="label-mono">Contact</p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          Say hello<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Fill in the form, or email me directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-fg underline decoration-2 underline-offset-4 hover:decoration-accent"
          >
            {site.email}
          </a>
          . I&apos;ll get back to you ASAP — I promise.
        </p>
      </header>
      <div className="max-w-3xl">
        <Contact />
      </div>
    </div>
  );
}
