import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { WorkHistory } from "@/components/WorkHistory";
import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black">Work History</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a Front-End developer that loves{" "}
        <Highlight className="dark:bg-gray-800">building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <button className="flex items-center mt-4 bg-neutral-100 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md font-bold text-neutral-500 hover:bg-gray-100">
        <IconDownload size={20} />
        <span className="ml-2">Download Resume</span>
      </button>
      <WorkHistory />
    </Container>
  );
}
