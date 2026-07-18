"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { navItems, site } from "@/constants/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-bg">
      <nav
        aria-label="Main navigation"
        className="container-x flex h-16 items-center justify-between"
      >
        <Link
          href="/"
          className="font-display text-lg font-bold uppercase tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-mono text-fg transition-colors duration-150 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="border-2 border-accent bg-accent px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-accent-ink transition-colors duration-150 hover:bg-fg hover:text-bg hover:border-line"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-line text-fg"
          >
            {open ? (
              <IconX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <IconMenu2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t-2 border-line bg-bg md:hidden"
          data-lenis-prevent
        >
          <ul className="flex flex-col divide-y-2 divide-line border-b-2 border-line">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 px-5 py-6 transition-colors duration-150 hover:bg-soft"
                >
                  <span className="label-mono" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="headline text-3xl">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 px-5 py-8">
            <p className="label-mono">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="font-display text-lg font-bold underline decoration-accent decoration-2 underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
