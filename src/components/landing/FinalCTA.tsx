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

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-8 leading-tight px-4">
            {t('cta.title')}
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 px-4">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="h-16 px-10 rounded-full font-bold text-lg sm:text-xl bg-primary-gradient glow-effect border-0 hover:scale-105 transition-transform">
              <Link href="/login?tab=signup">{t('cta.button')}</Link>
            </Button>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">{t('pricing.features.ready')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
