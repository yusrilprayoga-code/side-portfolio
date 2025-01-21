import Content from "./content.mdx";
import { BlogLayout } from "@/components/BlogLayout";

export const meta = {
  date: "2024-07-17",
  title: "Writing Clean Code With React",
  description:
    "Effective and efficient ways to write clean code with React while keeping in mind the performance and maintainability of the codebase.",
  image:
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  tags: ["Clean Code"],
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  );

}
