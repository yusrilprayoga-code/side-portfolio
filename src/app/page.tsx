import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black dark:text-gray-300">Hello there! I&apos;m Yusril Prayoga</Heading>
      <Paragraph className="max-w-xl mt-4 dark:text-gray-300">
        I&apos;m a Front End developer that loves{" "}
        <Highlight className="dark:text-gray-800">building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <Paragraph className="max-w-xl mt-4 dark:text-gray-300">
        I&apos;m a Junior software engineer with{" "}
        <Highlight className="dark:text-gray-800">2 years of experience</Highlight> building scalable web apps
        that are performance optimized and good looking.
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4 dark:text-gray-300"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
