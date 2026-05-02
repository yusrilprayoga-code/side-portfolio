/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";

const nextConfig = {
  // output: "standalone", // Disabled for development - enable only for Docker/container deployment
  // outputFileTracingRoot: process.cwd(), // Only needed with standalone
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 60, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [["@mapbox/rehype-prism"]],
  },
});

export default withMDX(nextConfig);
