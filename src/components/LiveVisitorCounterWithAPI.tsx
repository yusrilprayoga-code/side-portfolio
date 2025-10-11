'use client';

import { useEffect, useState } from 'react';
import { Eye, Users, TrendingUp } from 'lucide-react';

interface VisitorStats {
  current: number;
  peak: number;
}

export default function LiveVisitorCounterWithAPI() {
  const [stats, setStats] = useState<VisitorStats>({ current: 1, peak: 1 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateVisitorCount = async () => {
      try {
        // Send heartbeat to server
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          const data = await response.json();
          
          setIsAnimating(true);
          setStats(prev => ({
            current: data.count,
            peak: Math.max(prev.peak, data.count),
          }));
          
          setTimeout(() => setIsAnimating(false), 500);
        }
      } catch (error) {
        console.error('Failed to update visitor count:', error);
      }
    };

    // Initial update
    updateVisitorCount();

    // Update every 30 seconds
    intervalId = setInterval(updateVisitorCount, 30000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      
      // Notify server that visitor left
      fetch('/api/visitors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    };
  }, [sessionId]);

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
          <span className="font-bold text-sm tabular-nums">
            {stats.current}
          </span>
          <span className="text-xs font-medium opacity-90">
            online
          </span>
        </div>
      </div>

      {/* Hover Tooltip with Stats */}
      <div
        className="
          absolute top-full right-0 mt-2
          px-3 py-2 rounded-lg
          bg-gray-900 text-white text-xs
          whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          min-w-[160px]
        "
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Eye className="w-3 h-3" />
            <span className="font-medium">Live visitors</span>
          </div>
          
          <div className="h-px bg-gray-700 my-0.5" />
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[10px]">Current:</span>
            <span className="font-bold">{stats.current}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[10px] flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5" />
              Peak:
            </span>
            <span className="font-bold text-green-400">{stats.peak}</span>
          </div>
          
          <div className="text-gray-400 text-[10px] mt-1">
            Updates every 30s
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
