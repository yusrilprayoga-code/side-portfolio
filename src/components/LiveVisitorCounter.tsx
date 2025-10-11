'use client';

import { useEffect, useState } from 'react';
import { Eye, Users } from 'lucide-react';

export default function LiveVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Fixed count - always shows same number
    // Change the number below to whatever you want (e.g., 1, 3, 5, 10)
    const fixedCount = 1; // ← CHANGE THIS NUMBER
    
    setVisitorCount(fixedCount);

    // Optional: Small animation every 30 seconds to show it's "live"
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 30000); // Pulse animation every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9998] group">
      {/* Main Badge */}
      <div
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          bg-gradient-to-r from-green-500 to-emerald-500
          text-white shadow-lg backdrop-blur-sm
          border border-green-400/30
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-xl
          cursor-pointer
          ${isAnimating ? 'scale-105 shadow-xl' : ''}
        `}
      >
        {/* Animated Pulse Dot */}
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
          <div className="relative w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Count */}
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span className="font-bold text-sm">
            {visitorCount}
          </span>
          <span className="text-xs font-medium opacity-90">
            online
          </span>
        </div>
      </div>

      {/* Hover Tooltip */}
      <div
        className="
          absolute top-full right-0 mt-2
          px-3 py-2 rounded-lg
          bg-gray-900 text-white text-xs
          whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
        "
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Eye className="w-3 h-3" />
            <span>Live visitors on site</span>
          </div>
          <div className="text-gray-400 text-[10px]">
            Updates in realtime
          </div>
        </div>
        {/* Arrow */}
        <div className="absolute bottom-full right-4 -mb-1">
          <div className="w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  );
}
