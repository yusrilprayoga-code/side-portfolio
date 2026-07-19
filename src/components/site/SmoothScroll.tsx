"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Fixed navbar height — anchor targets stop just below it.
const ANCHOR_OFFSET = -80;

/**
 * Lerp-based smooth scrolling (Lenis). The slight catch-up delay is what
 * gives the scroll its "motion blur" feel. Renders nothing; disabled
 * entirely for users who prefer reduced motion. Nested scroll areas opt
 * out with `data-lenis-prevent`.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      // Lower = more float/delay. 0.07 leans into the dreamy, drawn-out
      // glide — noticeably softer than the 0.1 default feel.
      lerp: 0.07,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // Native touch scrolling on phones — synthetic touch smoothing
      // fights the platform's own inertia.
      syncTouch: false,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Expose the instance so other components (e.g. the scroll-to-top
    // button) can animate through Lenis instead of jumping.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // CSS smooth-scroll must not run underneath Lenis.
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    // Same-page hash links animate through Lenis instead of jumping.
    // Capture phase: runs before Next's <Link> handler, which then sees
    // defaultPrevented and skips its own (instant) hash navigation, while
    // other React onClick handlers (e.g. closing the mobile menu) still run.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const anchor = (event.target as HTMLElement).closest?.(
        'a[href^="#"], a[href^="/#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.hash;
      if (!hash) return;
      // "/#work" only counts as same-page from the homepage.
      if (anchor.pathname !== window.location.pathname) return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", hash);
      lenis.scrollTo(target, { offset: ANCHOR_OFFSET });
    };
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      cancelAnimationFrame(rafId);
      html.style.scrollBehavior = prevScrollBehavior;
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  // New page → start at the top instantly (Lenis keeps scroll position
  // otherwise, and Next's own scroll restoration is bypassed by Lenis).
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
