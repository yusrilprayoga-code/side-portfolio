"use client";

import Link from "next/link";

// Client component: the retry button needs an onClick handler.
export default function OfflinePage() {
  return (
    <div className="container-x flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16">
      <p className="label-mono flex items-center gap-2">
        <span className="inline-block h-2 w-2 animate-pulse bg-accent" aria-hidden="true" />
        No internet connection
      </p>
      <h1 className="headline mt-4 text-5xl md:text-8xl">
        You&apos;re offline<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
        Some features won&apos;t work until the connection is back. Previously
        visited pages may still load from cache.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 border-2 border-line bg-fg px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bg transition-colors duration-150 hover:bg-accent hover:text-accent-ink hover:border-accent"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 border-2 border-line bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-fg transition-colors duration-150 hover:bg-fg hover:text-bg"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
