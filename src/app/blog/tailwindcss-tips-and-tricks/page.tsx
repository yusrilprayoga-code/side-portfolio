import Content from "./content.mdx";
import { BlogLayout } from "@/components/BlogLayout";

export const meta = {
  date: "2024-07-17",
  title: "Tailwindcss tips and tricks to conquer the world",
  description:
    "Tips and Tricks Tailwdind Css",
  image:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
  tags: ["tailwindcss", "css", "frontend"],
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  );
}
