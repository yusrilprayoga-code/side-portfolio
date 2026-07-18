import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../lib/formatDate";
import { Prose } from "@/components/Prose";

export function BlogLayout({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: {
    title: string;
    date: string;
    description?: string;
    image: string;
    tags?: string[];
  };
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <article>
        <header>
          <Link
            href="/blog"
            className="label-mono inline-flex items-center gap-2 transition-colors duration-150 hover:text-accent"
          >
            <span aria-hidden="true">←</span> All articles
          </Link>

          <h1 className="headline mt-8 text-3xl md:text-5xl">{meta.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y-2 border-line py-3">
            <time dateTime={meta.date} className="label-mono">
              {formatDate(meta.date)}
            </time>
            {meta.tags?.length ? (
              <ul className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-8 border-2 border-line">
            <Image
              src={meta.image}
              alt={`${meta.title} — cover image`}
              height={800}
              width={1200}
              className="max-h-96 w-full object-cover object-left-top"
            />
          </div>
        </header>
        <Prose className="mt-10">{children}</Prose>
      </article>
    </div>
  );
}
