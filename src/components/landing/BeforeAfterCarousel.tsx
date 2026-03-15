"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const EXAMPLES = [
  {
    id: 1,
    name: "Rooftop Sunset",
    before: "/images/comparisons/before-rooftop.png",
    after: "/images/comparisons/after-rooftop.png",
  },
  {
    id: 2,
    name: "Coffee Shop",
    before: "/images/comparisons/before-coffee.png",
    after: "/images/comparisons/after-coffee.png",
  },
  {
    id: 3,
    name: "Beach Portrait",
    before: "/images/comparisons/before-beach.png",
    after: "/images/comparisons/after-beach.png",
  },
  {
    id: 4,
    name: "Night City",
    before: "/images/comparisons/before-night.png",
    after: "/images/comparisons/after-night.png",
  },
];

export function BeforeAfterCarousel() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="comparison" className="py-24 sm:py-32 px-6 bg-[#090b14] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#ec4899] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/20 text-[#ec4899] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3 h-3" />
            Comparison
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t('beforeAfter.title')}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('beforeAfter.subtitle')}
          </p>
        </motion.div>

        {/* Example Selector (Thumbnails-like) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {EXAMPLES.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 border ${
                activeIndex === idx
                  ? "bg-[#ec4899] border-[#ec4899] text-white shadow-lg shadow-[#ec4899]/20 scale-105"
                  : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              Ex {idx + 1}
            </button>
          ))}
        </div>

        {/* Comparison Slider */}
        <div className="w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={EXAMPLES[activeIndex].id}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <BeforeAfterSlider
                beforeSrc={EXAMPLES[activeIndex].before}
                afterSrc={EXAMPLES[activeIndex].after}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="mt-16"
        >
          <Button 
            asChild
            className="h-16 px-10 rounded-2xl bg-[#ec4899] hover:bg-[#be185d] text-white font-black text-sm tracking-widest uppercase shadow-2xl shadow-[#ec4899]/30 border-t border-white/20 transition-all hover:scale-105 group"
          >
            <Link href="/login">
              {t('beforeAfter.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-gray-500 text-[10px] text-center mt-6 font-bold tracking-widest uppercase opacity-40">
            No subscription required • Pay per generation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
