import Content, { meta } from "./content.mdx";
import { Metadata } from "next";

// content.mdx already wraps itself in BlogLayout — render it directly.
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Page() {
  return <Content />;
}
