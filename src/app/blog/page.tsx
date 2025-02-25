import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";
import { CarouselArticlesPage } from "@/components/CarouselArticlesPage";

export const metadata: Metadata = {
  title: "Blogs | Yusril Prayoga",
  description:
    "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <Container>
      <span className="text-4xl">📝</span>
      <Heading className="font-black pb-4 dark:text-gray-300">I write about technology</Heading>
      <Paragraph className="pb-10 dark:text-gray-300">
        Ever since <Highlight className="dark:text-gray-800">
          I got my first computer
        </Highlight>, I&apos;ve been
        fascinated by technology.
      </Paragraph>
      <Blogs blogs={data} />
    </Container>
  );
}
