import { Container } from "@/components/Container";
import { FlipWordsDemo } from "@/components/FlipWordsLayout";
import { Heading } from "@/components/Heading";
import { Products } from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Yusril Prayoga",
  description:
    "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function Projects() {
  return (
    <Container>
      <span className="text-4xl">⚡</span>
      <Heading className="font-black mb-10 dark:text-gray-300">
        {" "}
        What I&apos;ve been working on
      </Heading>
      <FlipWordsDemo />
      <Products />
    </Container>
  );
}
