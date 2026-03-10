"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function BeforeAfterSlider() {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion value for the slider position (0 to 100)
  const sliderPos = useMotionValue(50);
  const smoothSliderPos = useSpring(sliderPos, { stiffness: 300, damping: 30 });
  
  const clipPath = useTransform(smoothSliderPos, (value) => `inset(0 ${100 - value}% 0 0)`);
  const leftPos = useTransform(smoothSliderPos, (value) => `${value}%`);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    sliderPos.set(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section id="comparison" className="py-24 px-6 bg-[#0F172A] relative overflow-hidden">
      <div className="container max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">From ordinary to irresistible</h2>
          <p className="text-gray-400 text-lg">Drag the slider to see how Facevia creates the ultimate dating profile.</p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* After View (Bottom Layer) */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2574" 
              alt="Average Selfie" 
              className="w-full h-full object-cover blur-[2px] brightness-75 contrast-75 sepia-[0.2]"
            />
            <div className="absolute bottom-6 right-6 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 font-bold text-xs tracking-wider uppercase">
              Average Selfie
            </div>
          </div>

          {/* Before View (Top Layer - Clipped) */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ clipPath }}
          >
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2574" 
              alt="Premium AI Dating Photo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ec4899] to-[#be185d] border border-white/20 text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(236,72,153,0.5)]">
              Facevia AI Match
            </div>
          </motion.div>

          {/* Slider Line & Handle */}
          <motion.div 
            className="absolute top-0 bottom-0 w-1.5 bg-white z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
            style={{ left: leftPos }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-[0_0_30px_rgba(236,72,153,0.6)] border-[3px] border-[#ec4899] flex items-center justify-center group active:cursor-grabbing hover:scale-105 transition-all">
              <div className="flex gap-1 group-active:scale-90 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#ec4899]">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#ec4899]">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
