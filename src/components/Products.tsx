import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/products";
import { products } from "@/constants/products";
import { Reveal } from "@/components/site/Reveal";
import { stackLabel } from "@/lib/stackLabel";

export const Products = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {products.map((product: Product, idx: number) => (
        <Reveal key={product.slug ?? product.href} delay={(idx % 2) * 0.05}>
          <article className="group relative flex h-full flex-col border-2 border-line bg-bg transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal">
            <div className="relative aspect-[16/10] border-b-2 border-line">
              <Image
                src={product.thumbnail}
                alt={`${product.title} — preview`}
                fill
                sizes="(min-width: 1280px) 610px, (min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
              />
            </div>

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <p className="label-mono">{String(idx + 1).padStart(2, "0")}</p>

              <h2 className="headline mt-3 text-xl md:text-2xl">
                <Link
                  href={product.slug ? `/projects/${product.slug}` : product.href}
                  className="after:absolute after:inset-0"
                >
                  {product.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {product.description}
              </p>

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

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-2 border-line pt-4 md:mt-auto">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-brutal relative z-10 font-mono text-xs uppercase tracking-wider"
                >
                  Visit <span aria-hidden="true">↗</span>
                </a>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs uppercase tracking-wider transition-colors duration-150 group-hover:text-accent"
                >
                  Details →
                </span>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
};
