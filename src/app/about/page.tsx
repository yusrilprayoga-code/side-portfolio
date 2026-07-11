import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata } from "next";

import About from "@/components/About";
import ScrollVelocity from "@/blocks/TextAnimations/ScrollVelocity/ScrollVelocity";
import { TimelineDemo } from "@/components/TimelineAbout";

export const metadata: Metadata = {
  title: "About | Yusril Prayoga",
  description:
    "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
  keywords: [
    "developer",
    "writer",
    "speaker",
    "digital",
    "remote work",
    "yusrilprayoga",
    "yusrilprayoga-code",
    "portfolio",
    "yusril prayoga",
    "yusrilprayoga code",
    "yusrilprayoga portfolio",
    "yusril prayoga portfolio",
    "yusrilprayoga-code portfolio",
    "yusrilprayoga-code portfolio",
    "yusrilprayoga code portfolio",
    "yusril prayoga tech",
    "yusrilprayoga tech",
    "yusrilprayoga-code tech",
    "yusrilprayoga code tech",
    "yusrilprayoga tech portfolio",
    "yusrilprayoga-code tech portfolio",
    "yusrilprayoga-code tech portfolio",
  ],
  openGraph: {
    title: "About | Yusril Prayoga",
    description:
      "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
    // Images inherit from app/opengraph-image.tsx
  },
};

export default function AboutPage() {
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black dark:text-gray-300 mb-3">About Me</Heading>
      <ScrollVelocity
        texts={["Developer", "Content Creator"]}
        className="custom-scroll-text"
      />
      <About />
      <TimelineDemo />
    </Container>
  );
}
