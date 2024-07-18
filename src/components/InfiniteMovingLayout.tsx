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
    image: "/certificate/certificate-kubernetes.png",
    name: "Deploy Kubernetes Applications on Google Cloud",
    title: "May 13, 2024",
  },
  {
    image: "/certificate/certificate-cloud-network.png",
    name: "Develop your Google Cloud Network",
    title: "Mar 30, 2024",
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
    image: "/certificate/certificate-ai.png",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
