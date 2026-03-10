"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0F172A] pointer-events-none">
      <motion.div
        animate={isMobile ? { scale: 1, x: 0, y: 0 } : {
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#6C63FF]/20 blur-[80px] md:blur-[120px] rounded-full"
      />
      <motion.div
        animate={isMobile ? { scale: 1, x: 0, y: 0 } : {
          scale: [1, 1.1, 1],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-[#9D4EDD]/10 blur-[60px] md:blur-[100px] rounded-full"
      />
      <motion.div
        animate={isMobile ? { scale: 1, x: 0, y: 0 } : {
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-[#00E5FF]/10 blur-[80px] md:blur-[150px] rounded-full"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
