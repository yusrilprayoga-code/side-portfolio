/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "@mapbox/rehype-prism";

const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {}, // Jika Anda tidak menggunakan fitur ini, biarkan kosong
  },
  outputFileTracingRoot: process.cwd(),
  images: {
    // Perbaikan: Ejaan kunci yang benar
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // Ganti 'unoptimazed' dengan 'unoptimized'
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});


export default withMDX(nextConfig);
