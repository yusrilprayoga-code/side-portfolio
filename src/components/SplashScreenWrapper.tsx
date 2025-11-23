"use client";

import React, { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenWrapperProps {
  children: React.ReactNode;
}

export default function SplashScreenWrapper({
  children,
}: SplashScreenWrapperProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("splashShown");

    if (splashShown === "true") {
      // If already shown, skip splash and show content immediately
      setShowSplash(false);
      setShowContent(true);
      setIsLoading(false);
    } else {
      // First visit, show splash screen
      setShowSplash(true);
      setIsLoading(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
    // Delay showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // Show white screen while checking session storage to prevent flash
  if (isLoading) {
    return <div className="fixed inset-0 z-[9999] bg-white" />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="contents"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
