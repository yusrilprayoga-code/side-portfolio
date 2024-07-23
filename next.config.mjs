/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "@mapbox/rehype-prism";

const nextConfig = {
  images: {
    hostname: ["i.ytimg.com","pbs.twimg.com","udemy-certificate.s3.amazonaws.com","private-user-images.githubusercontent.com"],
    domains: ["images.unsplash.com", "res.cloudinary.com","i.ytimg.com","pbs.twimg.com","udemy-certificate.s3.amazonaws.com","private-user-images.githubusercontent.com"],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
