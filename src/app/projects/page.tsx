import { Products } from "@/components/Products";
import { products } from "@/constants/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Yusril Prayoga",
  description:
    "All shipped projects by Yusril Prayoga — enterprise data platforms, AI products, and full-stack builds with Next.js, Laravel, and more.",
};

export default function Projects() {
  return (
    <div className="container-x py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <p className="label-mono">
          Archive — {products.length} projects
        </p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          All projects<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          From enterprise data platforms to weekend experiments — everything
          I&apos;ve shipped, in one index. Newest first.
        </p>
      </header>
      <Products />
    </div>
  );
}
