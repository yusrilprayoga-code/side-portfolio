import Content from "./content.mdx";
import { BlogLayout } from "@/components/BlogLayout";

export const meta = {
  date: "2023-04-19",
  title: "Creating a Dark Mode Toggle with Next.js and Tailwind CSS",
  description: `As a web developer, you may be wondering how to create a dark mode toggle for your web application. In this tutorial, we will explore how to implement a dark mode toggle with Next.js and Tailwind CSS.`,
  image:
    "https://images.unsplash.com/photo-1607799632518-da91dd151b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  tags: ["tailwindcss", "css", "frontend"],
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  );
}
