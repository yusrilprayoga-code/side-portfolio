"use client";

import { useEffect, useState } from "react";

// Minimal live-visitor line for the footer. Heartbeats /api/visitors every
// 30s with an anonymous per-tab session id; renders nothing until the first
// successful response.
export default function LiveVisitorCounterWithAPI() {
  const [count, setCount] = useState<number | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch {
        // Offline or API unavailable — keep the footer quiet.
      }
    };

    updateVisitorCount();
    const intervalId = setInterval(updateVisitorCount, 30000);

    return () => {
      clearInterval(intervalId);
      fetch("/api/visitors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    };
  }, [sessionId]);

  if (count === null) return null;

  return (
    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
      <span
        className="inline-block h-2 w-2 animate-pulse bg-accent"
        aria-hidden="true"
      />
      {count} {count === 1 ? "visitor" : "visitors"} online
    </p>
  );
}
