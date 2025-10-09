/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "@mapbox/rehype-prism";

const nextConfig = {
  // output: "standalone", // Disabled for development - enable only for Docker/container deployment
  experimental: {
    serverActions: {}, // Jika Anda tidak menggunakan fitur ini, biarkan kosong
  },
  // outputFileTracingRoot: process.cwd(), // Only needed with standalone
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // IMPORTANT: Enable optimization for better performance
    unoptimized: false, // Changed to false to enable Next.js image optimization
    formats: ["image/webp", "image/avif"], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configure allowed quality values (required in Next.js 16+)
    qualities: [50, 60, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 60, // Cache images for 60 seconds minimum
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
