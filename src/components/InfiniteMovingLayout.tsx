"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./InfiniteMovingPage";
import { Heading } from "./Heading";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40] rounded-md flex flex-col antialiased bg-white dark:bg-neutral-900 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <Heading className="font-black mb-2 dark:text-gray-300">
        Google Cloud Skill Boost
        </Heading>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    image: "/certificate/certificate-ai.png",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    image: "/certificate/certificate-ai.png",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    image: "/certificate/certificate-ai.png",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    image: "/certificate/certificate-ai.png",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    image: "/certificate-ai.png",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
