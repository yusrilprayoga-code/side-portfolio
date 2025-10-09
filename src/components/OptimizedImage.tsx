"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * Optimized Image Component with:
 * - Lazy loading by default
 * - Lower quality for 3G networks
 * - Loading state
 * - Error fallback
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  quality = 75,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [clientQuality, setClientQuality] = useState(quality);

  // Detect connection speed on client-side only (after mount)
  useEffect(() => {
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;

      // Adjust quality based on network speed
      let optimalQuality = quality;
      if (effectiveType === "slow-2g" || effectiveType === "2g") {
        optimalQuality = 50;
      } else if (effectiveType === "3g") {
        optimalQuality = 60;
      } else if (effectiveType === "4g") {
        optimalQuality = 75;
      }
      
      if (optimalQuality !== quality) {
        setClientQuality(optimalQuality);
      }
    }
  }, [quality]);

  if (hasError) {
    return (
      <div
        className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Failed to load</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg`}
          style={{ width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={clientQuality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
