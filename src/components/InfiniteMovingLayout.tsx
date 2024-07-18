"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./InfiniteMovingPage";
import { Heading } from "./Heading";
import { Badge } from "./Badge";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40] rounded-md flex flex-col antialiased bg-white dark:bg-neutral-900 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <Heading className="font-black mb-2 dark:text-gray-300">
        Google Cloud Skill Boost
        </Heading>
        <Badge href="https://www.cloudskillsboost.google/public_profiles/3985e6aa-47ee-4d99-a370-fffcfdb5a690" text="View Public Profile" />
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
    image: "/certificate/certificate-secure-networks.png",
    name: "Build and Secure Networks in Google Cloud",
    title: "Mar 6, 2024",
  },
  {
    image: "/certificate/certificate-data-ml.png",
    name: "Perform Foundational Data, ML, and AI Tasks in Google Cloud",
    title: "Mar 5, 2024",
  },
  {
    image: "/certificate/certificate-environment.png",
    name: "Perform Foundational Infrastructure Tasks in Google Cloud",
    title: "Mar 5, 2024",
  },
  {
    image: "/certificate/certificate-load-balancing.png",
    name: "Create and Manage Cloud Resources",
    title: "Mar 5, 2024",
  },
];
