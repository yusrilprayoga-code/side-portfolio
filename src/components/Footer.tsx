"use client";
import React from "react";

export const Footer = () => {
  return (
    <div className="p-4 text-center justify-center text-xs text-neutral-500 border-t border-neutral-100 dark:text-gray-300">
      <span className="font-semibold dark:text-gray-300">{new Date().getFullYear()} </span>
      &#8212; Built by Yusril Prayoga
    </div>
  );
};
