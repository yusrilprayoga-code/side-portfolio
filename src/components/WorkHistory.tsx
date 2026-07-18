import { timeline } from "@/constants/timeline";
import React from "react";

export const WorkHistory = () => {
  return (
    <div className="mt-10 border-b-2 border-line">
      {timeline.map((item, index) => (
        <article
          className="grid gap-3 border-t-2 border-line py-8 md:grid-cols-[180px_1fr] md:gap-8 md:py-10"
          key={`timeline-${index}`}
        >
          <p className="label-mono md:pt-1.5">{item.date}</p>
          <div>
            <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted md:text-base">
              {item.company}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed">
              {item.description}
            </p>
            <ul className="mt-4 max-w-2xl space-y-2">
              {item.responsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 flex-none bg-accent"
                  />
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
};
