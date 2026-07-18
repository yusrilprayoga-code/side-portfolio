import { Blog } from "@/types/blog";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { formatDate } from "../../lib/formatDate";
import { Reveal } from "@/components/site/Reveal";

export const Blogs = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="border-b-2 border-line">
      {blogs.map((blog, index) => (
        <Reveal key={blog.slug} delay={Math.min(index * 0.05, 0.15)}>
          <Link
            href={`/blog/${blog.slug}`}
            className="group grid grid-cols-1 gap-6 border-t-2 border-line py-8 transition-colors duration-150 hover:bg-soft sm:grid-cols-[220px_1fr] md:py-10"
          >
            <div className="relative aspect-[16/10] w-full max-w-[220px] border-2 border-line">
              <Image
                src={blog.image}
                alt={`${blog.title} — cover`}
                fill
                sizes="220px"
                className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col">
              <p className="label-mono">
                {blog.date ? formatDate(blog.date) : ""}
              </p>
              <h2 className="headline mt-2 text-xl transition-colors duration-150 group-hover:text-accent md:text-2xl">
                {blog.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {blog.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {blog.tags?.map((tag, i) => (
                  <li
                    key={`tag-${blog.slug}-${i}`}
                    className="border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
};
