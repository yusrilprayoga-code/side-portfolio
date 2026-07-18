import { Metadata } from "next";
import { site } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Yusril Prayoga",
  description:
    "How this portfolio handles cookies, analytics, and the data you submit through the contact form.",
};

const sections = [
  {
    title: "What this site collects",
    body: "This is a personal portfolio. It does not require accounts and does not sell data. The contact form sends your name, email address, and message to me via EmailJS so I can reply — nothing else is done with it. The AI chatbot forwards your messages to a model provider to generate a response; don't paste sensitive information into it.",
  },
  {
    title: "Cookies & local storage",
    body: "The site stores small preferences in your browser: your theme choice (light or dark), your cookie-consent decision, and chatbot session history. These stay on your device. A lightweight, anonymous visitor counter keeps a temporary session id in memory to show how many people are online — it is not tied to your identity.",
  },
  {
    title: "Third-party services",
    body: "EmailJS delivers contact-form messages. AI responses are generated through OpenRouter/NVIDIA model APIs. Some blog cover images are loaded from Unsplash. Each of these services only receives what is needed to perform its function.",
  },
  {
    title: "Your choices",
    body: "You can decline non-essential cookies in the consent banner, clear your browser storage at any time, and use the site fully without the chatbot. Questions or removal requests — email me and I'll sort it out.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <header className="mb-12">
        <p className="label-mono">Legal — plain language</p>
        <h1 className="headline mt-4 text-4xl md:text-6xl">
          Privacy policy<span className="text-accent">.</span>
        </h1>
      </header>

      <div className="border-b-2 border-line">
        {sections.map((section, i) => (
          <section key={section.title} className="border-t-2 border-line py-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight md:text-xl">
              <span className="label-mono mr-3" aria-hidden="true">
                0{i + 1}
              </span>
              {section.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <p className="label-mono mt-10">
        Contact —{" "}
        <a
          href={`mailto:${site.email}`}
          className="underline decoration-accent decoration-2 underline-offset-4"
        >
          {site.email}
        </a>
      </p>
    </div>
  );
}
