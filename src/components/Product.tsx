"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { stackLabel } from "@/lib/stackLabel";

export const SingleProduct = ({ product }: { product: Product }) => {
  const gallery = Array.from(new Set([product.thumbnail, ...product.images]));
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <div>
      <Link
        href="/projects"
        className="label-mono inline-flex items-center gap-2 transition-colors duration-150 hover:text-accent"
      >
        <span aria-hidden="true">←</span> All projects
      </Link>

      <header className="mt-8">
        <h1 className="headline text-3xl md:text-5xl">{product.title}</h1>
        <ul className="mt-5 flex flex-wrap gap-2">
          {product.stack?.map((stack: string) => (
            <li
              key={stack}
              className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
            >
              {stackLabel(stack)}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {product.description}
        </p>
      </header>

      <div className="mt-10 border-2 border-line" key={activeImage}>
        <Image
          src={activeImage}
          alt={`${product.title} — screenshot`}
          height={1000}
          width={1000}
          className="animate-fade-in h-auto w-full object-contain"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {gallery.map((image, idx) => (
            <button
              type="button"
              onClick={() => setActiveImage(image)}
              key={`image-thumbnail-${idx}`}
              aria-label={`Show screenshot ${idx + 1}`}
              aria-pressed={activeImage === image}
              className={
                "border-2 transition-colors duration-150 " +
                (activeImage === image
                  ? "border-accent"
                  : "border-line hover:border-accent")
              }
            >
              <Image
                src={image}
                alt=""
                height={200}
                width={300}
                className="h-16 w-24 object-cover object-top md:h-20 md:w-32"
              />
            </button>
          ))}
        </div>
      )}

      <div className="prose prose-neutral mt-10 max-w-none leading-relaxed dark:prose-invert prose-headings:font-display prose-headings:uppercase">
        {product?.content}
      </div>

      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center justify-center gap-2 border-2 border-line bg-fg px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bg transition-colors duration-150 hover:bg-accent hover:text-accent-ink hover:border-accent"
      >
        Visit project <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
};
