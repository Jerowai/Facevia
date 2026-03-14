"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Check, Flame, Ghost, Heart } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#090b14]">
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-[#090b14]/80 md:bg-[#090b14]/70 md:backdrop-blur-[2px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#ec4899] rounded-full blur-[80px] md:blur-[150px] opacity-10 pointer-events-none" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10 w-full pl-4 md:pl-8 lg:pl-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* LEFT COLUMN */}
          <div className="flex-1 w-full max-w-2xl text-left z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center"
            >
              <h2 className="text-gray-400 font-bold tracking-widest text-[10px] sm:text-xs md:text-sm uppercase">
                {t('hero.badge')}
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] text-center lg:text-left"
            >
              <span className="text-[#ec4899]">{t('hero.title1')}</span> <br className="hidden sm:block" />
              {t('hero.title2')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/70 text-base sm:text-lg mb-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-8 md:mb-10 text-base md:text-lg lg:text-xl text-gray-200"
            >
              <li className="flex items-center">
                <Check className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7 mr-3 shrink-0" strokeWidth={3} />
                <span className="font-semibold">{t('hero.bullets.b1')}</span>
              </li>
              <li className="flex items-center">
                <Check className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7 mr-3 shrink-0" strokeWidth={3} />
                <span className="font-semibold">{t('hero.bullets.b2')}</span>
              </li>
              <li className="flex items-center">
                <Check className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7 mr-3 shrink-0" strokeWidth={3} />
                <span className="font-semibold">{t('hero.bullets.b3')}</span>
              </li>
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Button asChild size="lg" className="h-14 sm:h-16 px-6 sm:px-10 rounded-md font-bold text-lg sm:text-xl bg-[#ec4899] text-white hover:bg-[#db2777] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.4)] border-0 w-full sm:w-auto">
                <Link href="/login?tab=signup">{t('hero.cta')}</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-gray-400 text-sm mt-4 text-center sm:text-left font-medium"
            >
              {t('hero.meta')}
            </motion.p>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&q=80",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-[#090b14] object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-[#ec4899] text-xs">★★★★★</div>
                <p className="text-gray-400 text-xs font-medium">{t('hero.trust')}</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - PHONE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full flex justify-center lg:justify-end relative pb-10 sm:pb-0 z-10 scale-95 md:scale-100 pointer-events-none select-none"
          >
            {/* Premium Pink iPhone Frame */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/19] rounded-[3rem] p-1.5 bg-gradient-to-tr from-[#be185d] via-[#ec4899] to-[#fbcfe8] shadow-[0_10px_40px_rgba(236,72,153,0.3)] md:shadow-[0_20px_60px_rgba(236,72,153,0.3)] mt-12 lg:mt-0 z-10 border border-[#db2777]/80 pointer-events-none select-none">
              {/* Inner bezel */}
              <div className="relative w-full h-full rounded-[2.7rem] bg-black overflow-hidden border-[2px] border-black pointer-events-none select-none">
                {/* Dynamic Island */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20 flex items-center justify-between px-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#050505]" />
                </div>

                {/* Dating profile photo inside the phone */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="AI Generated Dating Profile Photo"
                  className="w-full h-full object-cover rounded-[2.6rem] scale-[1.02] pointer-events-none select-none"
                  draggable={false}
                />

                {/* Top gradient overlay */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
              </div>

              {/* Floating Notification: Tinder */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute top-20 right-[-1.5rem] sm:-right-8 bg-white/95 rounded-2xl p-3 pr-5 pl-3 shadow-lg flex items-center gap-3 z-30 pointer-events-none will-change-transform"
              >
                <div className="w-9 h-9 bg-gradient-to-tr from-[#fd297b] to-[#ff655b] rounded-full flex items-center justify-center shrink-0">
                  <Flame className="text-white w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Tinder <span className="text-[10px] text-gray-400 font-normal">now</span></div>
                  <div className="text-gray-600 text-[11px]">{t('hero.notifications.tinder')}</div>
                </div>
              </motion.div>

              {/* Floating Notification: Snapchat */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="absolute top-1/2 -translate-y-8 left-[-1.5rem] sm:-left-6 bg-white/95 rounded-2xl p-3 pl-3 pr-5 shadow-lg flex items-center gap-3 z-30 pointer-events-none will-change-transform"
              >
                <div className="w-9 h-9 bg-[#FFFC00] rounded-full flex items-center justify-center shrink-0">
                  <Ghost className="text-black w-5 h-5 fill-black" />
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Snapchat <span className="text-[10px] text-gray-400 font-normal">2m ago</span></div>
                  <div className="text-gray-600 text-[11px]">{t('hero.notifications.snapchat')}</div>
                </div>
              </motion.div>

              {/* Floating Notification: Instagram */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="absolute bottom-36 right-[-1rem] sm:-right-5 bg-white/95 rounded-2xl p-3 pl-3 pr-4 shadow-lg flex items-center gap-3 z-30 pointer-events-none will-change-transform"
              >
                <div className="w-9 h-9 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center shrink-0">
                  <Heart className="text-white w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Instagram <span className="text-[10px] text-gray-400 font-normal">5m ago</span></div>
                  <div className="text-gray-600 text-[11px]">{t('hero.notifications.instagram')}</div>
                </div>
              </motion.div>

              {/* Floating Notification: Hinge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.4 }}
                className="absolute bottom-16 left-[-1.5rem] sm:-left-8 bg-white/95 rounded-2xl p-3 pl-3 pr-5 shadow-lg flex items-center gap-3 z-30 pointer-events-none will-change-transform"
              >
                <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg font-serif italic">H</span>
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Hinge <span className="text-[10px] text-gray-400 font-normal">12m ago</span></div>
                  <div className="text-gray-600 text-[11px]">{t('hero.notifications.hinge')}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
