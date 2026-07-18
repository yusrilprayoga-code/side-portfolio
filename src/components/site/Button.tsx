import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "solid" | "outline" | "accent";

const base =
  "inline-flex items-center justify-center gap-2 border-2 border-line px-6 py-3 font-display text-sm font-bold uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  solid: "bg-fg text-bg hover:bg-accent hover:text-accent-ink hover:border-accent",
  outline: "bg-transparent text-fg hover:bg-fg hover:text-bg",
  accent: "bg-accent text-accent-ink border-accent hover:bg-fg hover:text-bg hover:border-line",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  external?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "solid", className, children } = props;
  const cls = twMerge(base, variants[variant], className);

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={cls}>
      {children}
    </button>
  );
}
