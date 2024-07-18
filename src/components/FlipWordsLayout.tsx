import React from "react";
import { FlipWords } from "./FlipWordsPage";

export function FlipWordsDemo() {
  const words = [
    "Beautiful",
    "Fast",
    "Responsive",
    "Accessible",
    "modern",
    "Scalable",
    "Secure",
  ];

  return (
    <div className="flex justify-end items-center px-4 mb-10">
      <div className="text-4xl mx-auto font-bold text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        Websites with Next.js and Tailwind CSS 🚀
      </div>
    </div>
  );
}
