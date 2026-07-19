"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Engraved ink figure (artwork on white paper) blended into the black
 * section: CSS invert turns the paper black and the ink warm white, and
 * mix-blend screen melts the background away — the figure keeps its
 * solid white masses (hair, face) this way.
 * The sketched orb in the artwork is masked by a feathered cover, and a
 * rotating plasma orb (public/images/portal-globe.png — drop in any
 * square transparent PNG to swap it) spins in its place above the palm.
 *
 * Hermès-style motion: the image wipes in from the bottom, the orb
 * scales in, then idles (slow rotation, pulse, float). Everything is
 * disabled under prefers-reduced-motion.
 */
export function PortalFigure() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const draw = { pathLength: 1, "data-draw": true } as const;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={
        "pfig pointer-events-none absolute bottom-0 left-1/2 w-[min(94vw,44rem)] -translate-x-1/2 md:w-[56rem] " +
        (inView ? "pfig-inview" : "")
      }
    >
      <div className="pfig-float relative aspect-[1597/985]">
        {/* Orbit ring + engraved arcs behind the figure */}
        <svg
          viewBox="0 0 1597 985"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full text-[#f4efe6]"
        >
          <g
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.2"
          >
            <path d="M1030 60A560 560 0 0 1 1560 620" {...draw} className="pfd-1" />
            <path d="M1060 140A470 470 0 0 1 1500 610" {...draw} className="pfd-1" />
            <path d="M240 700A620 620 0 0 1 420 260" {...draw} className="pfd-2" />
          </g>
          <circle
            className="pfig-ring"
            cx="980"
            cy="430"
            r="390"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 18"
            opacity="0.4"
          />
        </svg>

        {/* The engraved figure — inverted so ink reads warm white on black */}
        <Image
          src="/images/portal-figure.png"
          alt=""
          width={1597}
          height={985}
          sizes="(min-width: 768px) 896px, 94vw"
          className="pfig-img relative h-auto w-full [mix-blend-mode:screen] [filter:invert(1)_sepia(0.14)_contrast(1.35)_brightness(1.05)]"
        />

        {/* Rotating plasma orb above the open palm */}
        <div className="pfig-orbwrap absolute left-[30.8%] top-[58.2%] w-[17%] -translate-x-1/2 -translate-y-1/2">
          {/* feathered cover hiding the sketched orb in the artwork */}
          <div
            className="absolute inset-[4%] rounded-full bg-[#0c0b09]"
            style={{ boxShadow: "0 0 26px 20px #0c0b09" }}
          />
          <div className="pfig-orb relative">
            <Image
              src="/images/portal-globes.png"
              alt=""
              width={728}
              height={728}
              sizes="(min-width: 768px) 152px, 16vw"
              className="pfig-globe-img h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
