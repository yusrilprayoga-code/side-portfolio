"use client";

import { useEffect, useRef } from "react";

/**
 * Accent line that fills the navbar's bottom border as the page scrolls.
 * Driven by native scroll position (Lenis scrolls the window natively, so
 * this stays perfectly in sync with the lerped motion), rAF-throttled,
 * and animated via scaleX so it never triggers layout.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent"
    />
  );
}
