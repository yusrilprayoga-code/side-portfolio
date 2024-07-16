import { AccomplishmentsLayout } from "@/components/AccomplismentsLayout";
import { CertificateLayout } from "@/components/CertificateLayout";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Accomplishments | Yusril Prayoga",
  description:
    "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
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
        <Heading className="font-black dark:text-gray-300">Dicoding Certification</Heading>
    </Container>
  );
}
