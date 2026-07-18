import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Yusril Prayoga",
  description:
    "Notes on web development, clean code, and the tools I use — written while building real products.",
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <div className="container-x py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <p className="label-mono">Journal — {data.length} articles</p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          Writing<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Notes on web development, clean code, and the tools I use — written
          while building real products.
        </p>
      </header>
      <Blogs blogs={data} />
    </div>
  );
}
