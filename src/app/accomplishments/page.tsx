import { AccomplishmentsLayout } from "@/components/AccomplismentsLayout";
import { CertificateLayout } from "@/components/CertificateLayout";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingLayout";
import { Paragraph } from "@/components/Paragraph";
import { ThreeDCardDemo } from "@/components/ThreeDCardPage";
import { ParallaxScrollDemo } from "@/constants/certificate";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Accomplishments | Yusril Prayoga",
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

export default function AccomplishmentsPage() {
  return (
    <Container>
      <span className="text-4xl">
        🏆
      </span>
      <Heading className="font-black dark:text-gray-300">My Sertification</Heading>
        <Paragraph className="dark:text-gray-300">
            I have some certification in <Highlight className="dark:text-neutral-800">the field of technology</Highlight>.
        </Paragraph>
        <AccomplishmentsLayout />
        <CertificateLayout />
        <ParallaxScrollDemo />
        <ThreeDCardDemo />
        <InfiniteMovingCardsDemo />
    </Container>
  );
}
