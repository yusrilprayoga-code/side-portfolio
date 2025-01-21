import Content from "./content.mdx";
import { BlogLayout } from "@/components/BlogLayout";


export const meta = {
  date: "2024-07-17",
  title: "How to win clients",
  description:
    "6 Ways to Win New Clients",
  image:
    "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80",
  tags: ["tailwindcss", "css", "frontend"],
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  );
}
