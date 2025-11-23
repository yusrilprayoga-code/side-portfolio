"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import TargetCursor from "./CursorTarget";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState<
    "welcome" | "clicked" | "loading" | "exit"
  >("welcome");
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  // ⚡ Dynamic loading text based on progress
  const getLoadingText = () => {
    if (progress < 30) return "Loading";
    if (progress < 60) return "Synchronizing Data";
    if (progress < 90) return "Entering Dimension";
    return "Almost There";
  };

  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples([...ripples, { id: Date.now(), x, y }]);

    // Transition to clicked stage with particles explosion
    setStage("clicked");

    // Then to loading stage
    setTimeout(() => {
      setStage("loading");
    }, 1200);
  };

  useEffect(() => {
    if (stage === "loading") {
      // Progress bar animation - slower with max 100%
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("exit");
            setTimeout(() => {
              onComplete();
            }, 800);
            return 100;
          }
          return prev + 1; // Slower increment: 1% per interval
        });
      }, 50); // Slower interval: 50ms instead of 30ms

      return () => clearInterval(interval);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Target Cursor for Splash Screen */}
          <TargetCursor
            targetSelector=".splash-cursor-target"
            hideDefaultCursor={true}
          />

          {/* 🌈 Chromatic Aberration Layer - RGB Split Effect */}
          {stage === "loading" && (
            <>
              {/* Red channel - offset left */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255, 0, 0, ${
                    progress / 300
                  }), transparent 60%)`,
                }}
                animate={{
                  x: [-2, -3, -2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Green channel - center */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(0, 255, 0, ${
                    progress / 400
                  }), transparent 60%)`,
                }}
              />

              {/* Blue channel - offset right */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(0, 0, 255, ${
                    progress / 300
                  }), transparent 60%)`,
                }}
                animate={{
                  x: [2, 3, 2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Glitch distortion bars */}
              {progress > 30 && (
                <>
                  <motion.div
                    className="absolute h-1 bg-red-500/30 blur-sm"
                    style={{
                      top: "30%",
                      left: 0,
                      right: 0,
                    }}
                    animate={{
                      scaleX: [0, 1, 0],
                      x: [-100, 0, 100],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <motion.div
                    className="absolute h-1 bg-cyan-500/30 blur-sm"
                    style={{
                      top: "70%",
                      left: 0,
                      right: 0,
                    }}
                    animate={{
                      scaleX: [0, 1, 0],
                      x: [100, 0, -100],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      delay: 0.2,
                    }}
                  />
                </>
              )}
            </>
          )}

          {/* Animated grid background */}
          <motion.div
            className="absolute inset-0 overflow-hidden opacity-20"
            animate={{
              opacity: stage === "clicked" ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>

          {/* Dimension Split Animation - follows progress bar */}
          {stage === "loading" && (
            <>
              {/* Top half - slides up */}
              <motion.div
                className="absolute inset-0 bg-white origin-top"
                initial={{ scaleY: 1, y: 0 }}
                animate={{
                  scaleY: 1 - progress / 200,
                  y: -(progress * 3),
                }}
                transition={{ duration: 0.1 }}
                style={{
                  transformOrigin: "top",
                  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                  `,
                    backgroundSize: "50px 50px",
                  }}
                />
              </motion.div>

              {/* Bottom half - slides down */}
              <motion.div
                className="absolute inset-0 bg-white origin-bottom"
                initial={{ scaleY: 1, y: 0 }}
                animate={{
                  scaleY: 1 - progress / 200,
                  y: progress * 3,
                }}
                transition={{ duration: 0.1 }}
                style={{
                  transformOrigin: "bottom",
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                  `,
                    backgroundSize: "50px 50px",
                  }}
                />
              </motion.div>

              {/* Glowing center line that follows progress */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent"
                style={{ top: "50%" }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 🌌 Rift Glow - Cahaya Biru/Ungu dari Retakan */}
              <motion.div
                className="absolute left-0 right-0 h-32 blur-2xl"
                style={{
                  top: "50%",
                  marginTop: "-64px",
                  background:
                    "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.6), transparent 70%)",
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: progress / 100,
                  scaleX: progress / 50,
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  scaleY: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />

              {/* Light Beams - Cahaya Horizontal Keluar dari Tengah */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`beam-${i}`}
                  className="absolute h-0.5 bg-gradient-to-r from-purple-400 via-blue-400 to-transparent"
                  style={{
                    top: `calc(50% + ${(i - 3) * 8}px)`,
                    left: "50%",
                    transformOrigin: "left center",
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: `${progress * 5}px`,
                    opacity: [0, 0.8, 0.4],
                    x: progress * 2,
                  }}
                  transition={{
                    width: { duration: 0.1 },
                    opacity: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    },
                  }}
                />
              ))}

              {/* Light Beams - Cahaya Horizontal ke Kiri */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`beam-left-${i}`}
                  className="absolute h-0.5 bg-gradient-to-l from-purple-400 via-blue-400 to-transparent"
                  style={{
                    top: `calc(50% + ${(i - 3) * 8}px)`,
                    right: "50%",
                    transformOrigin: "right center",
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: `${progress * 5}px`,
                    opacity: [0, 0.8, 0.4],
                    x: -progress * 2,
                  }}
                  transition={{
                    width: { duration: 0.1 },
                    opacity: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    },
                  }}
                />
              ))}

              {/* Flare Animations - Cahaya Memanjang yang Bergerak */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`flare-${i}`}
                  className="absolute h-1 bg-black blur-sm"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-2px",
                  }}
                  initial={{ width: 0, x: 0 }}
                  animate={{
                    width: [0, 200, 400, 0],
                    x: [-200, -100, 100, 300],
                    opacity: [0, 1, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.7,
                  }}
                />
              ))}

              {/* Edge Glow - Cahaya di Tepi Retakan */}
              <motion.div
                className="absolute left-0 right-0 h-2"
                style={{
                  top: "calc(50% - 1px)",
                  background:
                    "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8), transparent)",
                  boxShadow:
                    "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)",
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scaleY: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Particle burst from center */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-1 h-1 bg-black rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: "-2px",
                      marginTop: "-2px",
                    }}
                    animate={{
                      x: Math.cos((angle * Math.PI) / 180) * (progress * 2),
                      y: Math.sin((angle * Math.PI) / 180) * (progress * 2),
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </>
          )}

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-black/30"
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1920),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 1080),
                  opacity: Math.random() * 0.5,
                }}
                animate={{
                  y: [
                    null,
                    Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 1080),
                  ],
                  opacity: [null, Math.random() * 0.5, 0],
                  scale: stage === "clicked" ? [1, 2, 0] : 1,
                }}
                transition={{
                  duration: stage === "clicked" ? 1 : 3 + Math.random() * 3,
                  repeat: stage === "clicked" ? 0 : Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Welcome Stage - Interactive */}
            {stage === "welcome" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(255, 255, 255, 0.3)",
                        "0 0 60px rgba(255, 255, 255, 0.5)",
                        "0 0 30px rgba(255, 255, 255, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white overflow-hidden"
                  >
                    <Image
                      src="/images-optimized/logos/logo.png.webp"
                      alt="Yusril Prayoga Logo"
                      width={120}
                      height={120}
                      className="object-contain"
                      priority
                    />
                  </motion.div>{" "}
                  {/* Orbital ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-3xl border-2 border-white/30"
                    style={{ padding: "10px" }}
                  />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h1 className="mb-2 text-4xl font-bold text-black md:text-5xl">
                    Welcome
                  </h1>
                  <p className="text-lg text-gray-600 md:text-xl">
                    Yusril Prayoga Portfolio
                  </p>
                </motion.div>

                {/* Interactive Enter Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleEnter}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="splash-cursor-target group relative overflow-hidden rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95"
                >
                  {/* Ripple effects */}
                  {ripples.map((ripple) => (
                    <motion.span
                      key={ripple.id}
                      className="absolute rounded-full bg-white/50"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                      }}
                      initial={{ width: 0, height: 0, x: "-50%", y: "-50%" }}
                      animate={{ width: 500, height: 500, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      onAnimationComplete={() => {
                        setRipples((prev) =>
                          prev.filter((r) => r.id !== ripple.id)
                        );
                      }}
                    />
                  ))}

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovering ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center gap-2">
                    Enter Portfolio
                    <motion.div
                      animate={{ x: isHovering ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                </motion.button>

                {/* Hint text with animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <Sparkles className="h-4 w-4" />
                  Click to explore
                </motion.div>
              </motion.div>
            )}

            {/* Clicked Stage - Particle Explosion */}
            {stage === "clicked" && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex flex-col items-center relative"
              >
                {/* 🌈 Chromatic Aberration on Click - RGB Split Glitch */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                  transition={{ duration: 0.8 }}
                >
                  {/* RGB Split layers */}
                  <div
                    className="absolute inset-0"
                    style={{
                      filter:
                        "drop-shadow(-4px 0 2px rgba(255, 0, 0, 0.8)) drop-shadow(4px 0 2px rgba(0, 255, 255, 0.8))",
                    }}
                  />
                </motion.div>

                {/* Explosion particles */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 360) / 24;
                  const distance = 200;
                  return (
                    <motion.div
                      key={i}
                      className="absolute h-3 w-3 rounded-full bg-black"
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos((angle * Math.PI) / 180) * distance,
                        y: Math.sin((angle * Math.PI) / 180) * distance,
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}

                {/* Center flash */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="h-32 w-32 rounded-full bg-black"
                />

                {/* Zap icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1.5, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute"
                >
                  <Zap className="h-16 w-16 text-black" fill="black" />
                </motion.div>
              </motion.div>
            )}

            {/* Loading Stage */}
            {stage === "loading" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Loading spinner */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-20 w-20 rounded-full border-4 border-black/10 border-t-black"
                />

                {/* Progress bar */}
                <div className="w-80 max-w-full">
                  <div className="relative h-2 overflow-hidden rounded-full bg-black/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-black to-gray-700"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent"
                        animate={{ x: [-100, 320] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-center"
                  >
                    <span className="text-3xl font-bold text-black">
                      {progress}%
                    </span>

                    {/* ⚡ Animated Loading Text with Reveal Effect */}
                    <motion.div
                      className="mt-3 overflow-hidden"
                      style={{ height: "28px" }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={getLoadingText()}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                        >
                          {getLoadingText()}
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ...
                          </motion.span>
                        </motion.p>
                      </AnimatePresence>
                    </motion.div>

                    {/* Subtle subtitle */}
                    <motion.p
                      className="mt-2 text-xs text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Please wait while we prepare your experience
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 text-sm text-gray-400"
          >
            © 2025 Yusril Prayoga
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
