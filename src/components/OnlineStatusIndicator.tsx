'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function OnlineStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
      
      // Keep showing offline notification until back online
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div
      role="status"
      className={`fixed right-4 top-20 z-[10000] transition-all duration-300 ${
        showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 border-2 border-line bg-bg px-4 py-3 shadow-brutal">
        {isOnline ? (
          <>
            <Wifi className="h-5 w-5 text-fg" aria-hidden="true" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider">Back online</p>
              <p className="font-mono text-xs text-muted">Connection restored</p>
            </div>
          </>
        ) : (
          <>
            <WifiOff className="h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-accent">You&apos;re offline</p>
              <p className="font-mono text-xs text-muted">Check your connection</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
