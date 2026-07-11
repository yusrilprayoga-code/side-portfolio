"use client";
import { useState } from "react";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";
import { IconDownload, IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);

  const handleResumeDownload = () => {
    window.open("/mycv.pdf", "_blank");
  };

  const handleLivePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black dark:text-gray-300">Work History</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a Full Stack developer that loves{" "}
        <Highlight className="dark:bg-gray-800">building products</Highlight>{" "}
        and web apps that can impact millions of lives
      </Paragraph>
      <div className="flex gap-2">
        <button
          onClick={handleResumeDownload}
          className="flex items-center mt-4 bg-neutral-100 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md font-bold text-neutral-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IconDownload size={20} />
          <span className="ml-2">Download Resume</span>
        </button>
        <button
          onClick={handleLivePreview}
          className="flex items-center mt-4 bg-neutral-100 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md font-bold text-neutral-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {showPreview ? <IconEye size={20} /> : <IconEyeOff size={20} />}
          <span className="ml-2">
            {showPreview ? "Hide Preview" : "Live Preview"}
          </span>
        </button>
      </div>
      {showPreview && (
        <div className="mt-4">
          <iframe
            src="/mycv.pdf"
            className="w-full h-96 border border-neutral-200 dark:border-gray-600"
            title="Resume Preview"
          ></iframe>
        </div>
      )}
      <WorkHistory />
    </Container>
  );
}
