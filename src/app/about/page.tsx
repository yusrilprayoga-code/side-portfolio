import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

import { motion } from "framer-motion";
import About from "@/components/About";
import ScrollVelocity from "@/blocks/TextAnimations/ScrollVelocity/ScrollVelocity";

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
    images: [
      {
        url: "https://yusrilprayoga.tech",
        width: 1200,
        height: 630,
        alt: "Yusril Prayoga - About Page",
      },
    ],
  },
};

export default function AboutPage() {
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black dark:text-gray-300 mb-3">About Me</Heading>
      <ScrollVelocity
        texts={[
          "Developer",
          "Content Creator",
        ]}
        className="custom-scroll-text"
      />
      <About />
    </Container>
  );
}
