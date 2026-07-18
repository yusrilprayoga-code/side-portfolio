"use client";
import { useState } from "react";
import { WorkHistory } from "@/components/WorkHistory";
import { Button } from "@/components/site/Button";
import { site } from "@/constants/site";

export default function ResumePage() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="container-x py-16 md:py-24">
      <header className="mb-10 md:mb-12">
        <p className="label-mono">Resume</p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          Work history<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          The full record — every role, program, and responsibility. Also
          available as a PDF.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <Button href={site.resumeUrl} external>
          Download PDF <span aria-hidden="true">↓</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowPreview((v) => !v)}
        >
          {showPreview ? "Hide preview" : "Preview PDF"}
        </Button>
      </div>

      {showPreview && (
        <div className="mt-6 border-2 border-line">
          <iframe
            src={site.resumeUrl}
            className="h-[32rem] w-full"
            title="Resume preview"
          />
        </div>
      )}

      <WorkHistory />
    </div>
  );
}
