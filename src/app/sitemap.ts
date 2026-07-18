import type { MetadataRoute } from "next";
import { products } from "@/constants/products";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://side-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
    "/resume",
    "/accomplishments",
    "/chatbot",
    "/privacy-policy",
    "/blog/clean-code",
    "/blog/dark-mode-with-nextjs",
    "/blog/how-to-win-clients",
    "/blog/tailwindcss-tips-and-tricks",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const projectRoutes = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes];
}
