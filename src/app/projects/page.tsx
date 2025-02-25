import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText";
import { Container } from "@/components/Container";
import { FlipWordsDemo } from "@/components/FlipWordsLayout";
import { Heading } from "@/components/Heading";
import { Products } from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Yusril Prayoga",
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
      {/* <RotatingText
        texts={[
          "React",
          "Next.js",
          "TailwindCSS",
          "Framer Motion",
          "TypeScript",
          ]}
        mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      /> */}
      <Products />
    </Container>
  );
}
