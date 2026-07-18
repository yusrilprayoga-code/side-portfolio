import React from "react";
import { twMerge } from "tailwind-merge";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={twMerge(
        "mx-auto w-full max-w-4xl px-5 py-16 md:px-8 md:py-20",
        className
      )}
    >
      {children}
    </main>
  );
};
