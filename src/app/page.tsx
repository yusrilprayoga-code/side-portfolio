import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/profil.JPG"
          width={250}
          height={300}
          alt="Yusril Prayoga"
          className="rounded-3xl mt-4 object-cover 
            shadow-md hover:shadow-xl  hover:scale-105 transition duration-300 ease-in-out
          "
        />
        <Heading className="font-black dark:text-gray-300 mt-4">
          Hello there! I&apos;m Yusril Prayoga
        </Heading>
        <Paragraph className="max-w-xl mt-4 dark:text-gray-300">
          I&apos;m a Front End developer that loves{" "}
          <Highlight className="dark:text-gray-800">building products</Highlight> and web apps that can impact
          millions of lives.
        </Paragraph>
        <Paragraph className="max-w-xl mt-4 dark:text-gray-300">
          I&apos;m a Junior software engineer with{" "}
          <Highlight className="dark:text-gray-800">2 years of experience</Highlight> building scalable web apps
          that are performance optimized and good looking.
        </Paragraph>
      </div>
      <div className="mt-20">
        <Heading
          as="h2"
          className="font-black text-lg md:text-lg lg:text-lg mb-4 dark:text-gray-300"
        >
          What I&apos;ve been working on 🛸
        </Heading>
        <Products />
        <TechStack />
      </div>
    </Container>
  );
}
