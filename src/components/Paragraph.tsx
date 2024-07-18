import React from "react";

import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        "text-sm lg:text-base font-normal text-secondary dark:text-gray-200",
        className
      )}
    >
      {children}
    </p>
  );
};
