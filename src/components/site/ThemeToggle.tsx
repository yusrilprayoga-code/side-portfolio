"use client";

import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is unknown until hydration — render a stable placeholder to
  // avoid a light/dark icon mismatch.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "inline-flex h-10 w-10 items-center justify-center border-2 border-line text-fg transition-colors duration-150 hover:bg-accent hover:text-accent-ink hover:border-accent " +
        (className ?? "")
      }
    >
      {mounted ? (
        isDark ? (
          <IconSun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <IconMoon className="h-4 w-4" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
