"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Visually distinct before/after images:
// BEFORE: grainy, gloomy unfiltered bathroom selfie
// AFTER:  vibrant rooftop AI dating photo
const BEFORE_IMG = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=30&w=600&auto=format&fit=crop";
const AFTER_IMG = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop";

export function BeforeAfterSlider() {
  const { t } = useLanguage();
  const [val, setVal] = useState(45);

  const sliderPos = useMotionValue(45);
  const smoothSliderPos = useSpring(sliderPos, { stiffness: 400, damping: 35 });
  const clipPath = useTransform(smoothSliderPos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const leftPos = useTransform(smoothSliderPos, (v) => `${v}%`);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseFloat(e.target.value);
    setVal(n);
    sliderPos.set(n);
  }, [sliderPos]);

  return (
    <section id="comparison" className="py-24 px-6 bg-[#0F172A] relative overflow-hidden">
      <div className="container max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('beforeAfter.title')}
          </h2>
          <p className="text-gray-400 text-lg px-4">
            {t('beforeAfter.subtitle')}
          </p>
        </motion.div>

        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden select-none border border-white/10 shadow-2xl"
        >
          {/* Native range slider — touch-action: none so the drag doesn't scroll the page */}
          <input
            type="range"
            min="0"
            max="100"
            value={val}
            onChange={handleChange}
            style={{ touchAction: "none" }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-50"
            aria-label="Before and after comparison slider"
          />

          {/* BEFORE — grainy, washed-out selfie */}
          <div className="absolute inset-0">
            <img
              src={BEFORE_IMG}
              alt="Before — ordinary selfie"
              className="w-full h-full object-cover grayscale brightness-50 contrast-75 blur-[1.5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
            <div className="absolute bottom-6 right-6 px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white/50 font-bold text-[10px] sm:text-xs tracking-wider uppercase">
              {t('beforeAfter.before')}
            </div>
          </div>

          {/* AFTER — vibrant AI photo */}
          <motion.div className="absolute inset-0 z-10" style={{ clipPath }}>
            <img
              src={AFTER_IMG}
              alt="After — AI generated dating photo"
              className="w-full h-full object-cover brightness-110 contrast-110 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/10 to-transparent" />
            <div className="absolute bottom-6 left-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ec4899] to-[#be185d] border border-white/20 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(236,72,153,0.5)]">
              {t('beforeAfter.after')} ✨
            </div>
          </motion.div>

          {/* Slider handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-1.5 bg-white z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
            style={{ left: leftPos }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-[0_0_30px_rgba(236,72,153,0.6)] border-[3px] border-[#ec4899] flex items-center justify-center hover:scale-105 transition-transform">
              <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#ec4899]">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#ec4899]">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm mt-6 text-center"
        >
          {t('beforeAfter.caption')}
        </motion.p>
      </div>
    </section>
  );
}
