import clsx from "clsx";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-neutral max-w-none dark:prose-invert",
        "prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight",
        "prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-accent",
        "prose-code:font-mono prose-img:border-2 prose-img:border-line"
      )}
    >
      {children}
    </div>
  );
}
