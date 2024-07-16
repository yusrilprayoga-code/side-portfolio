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
        "prose prose-sm prose-blue max-w-none prose-p:text-secondary prose-headings:text-primary prose-headings:dark:text-gray-300 prose-p:dark:text-gray-300"
      )}
    >
      {children}
    </div>
  );
}
