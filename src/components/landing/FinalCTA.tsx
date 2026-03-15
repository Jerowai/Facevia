"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-[#0F172A] relative overflow-hidden">
      {/* Background glow for emphasis */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/10 blur-[150px] rounded-full -z-10"></div>

      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[40px] bg-white/5 border border-white/10 text-center relative overflow-hidden glass-card"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="url(#paint0_linear_cta)" />
              <defs>
                <linearGradient id="paint0_linear_cta" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6C63FF" />
                  <stop offset="1" stopColor="#9D4EDD" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] px-4 tracking-tighter">
            {t('cta.title')}
          </h2>
          <p className="text-lg sm:text-2xl text-gray-400 max-w-2xl mx-auto mb-14 px-4 font-medium">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button asChild size="lg" className="h-18 px-12 rounded-2xl font-black text-xl bg-[#ec4899] text-white hover:bg-[#db2777] transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(236,72,153,0.3)] border-0 uppercase tracking-wider group">
              <Link href="/login?tab=signup" className="flex items-center gap-2">
                {t('cta.button')}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </Button>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">{t('pricing.features.ready')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
