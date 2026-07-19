"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { IconArrowUp } from "@tabler/icons-react";

/**
 * Brutalist scroll-to-top button, bottom-right. Appears after scrolling
 * past the first viewport; scrolls back up through Lenis when available
 * so the motion matches the rest of the site.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      raf.current = 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={
        "fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center border-2 border-line bg-bg text-fg shadow-brutal transition-all duration-200 hover:bg-accent hover:text-accent-ink hover:border-accent md:bottom-6 md:right-6 " +
        (visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0")
      }
    >
      <IconArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
