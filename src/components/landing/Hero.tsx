"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Check, Flame, Ghost, Instagram, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#090b14]">
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
        
        {/* Adds a slight dark overlay to ensure sexy/moody colors pop */}
        <div className="absolute inset-0 bg-[#090b14]/70 backdrop-blur-[2px]"></div>
        
        {/* Accent glow behind text */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ec4899] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10 w-full pl-4 md:pl-8 lg:pl-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* LEFT COLUMN - TEXT & CTA */}
          <div className="flex-1 w-full max-w-2xl text-left z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center"
            >
              <h2 className="text-gray-400 font-bold tracking-widest text-sm uppercase">
                The best <span className="text-white border-b-2 border-white/60 pb-0.5">AI Photo Generator</span> for dating & social
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[4.5rem] font-bold tracking-tighter text-white mb-8 leading-[1.05]"
            >
              Get <span className="text-[#ec4899]">insane results</span> <br className="hidden md:block" />
              with undeniable <br className="hidden md:block" />
              dating photos
            </motion.h1>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-10 text-lg md:text-xl text-gray-200"
            >
              <li className="flex items-center">
                <Check className="text-pink-500 w-7 h-7 mr-3 shrink-0" strokeWidth={3} />
                <span className="font-semibold">Dominate the apps</span><span className="text-gray-400 ml-2 font-normal hidden sm:inline">- get matches effortlessly</span>
              </li>
              <li className="flex items-center">
                <Check className="text-pink-500 w-7 h-7 mr-3 shrink-0" strokeWidth={3} />
                <span className="font-semibold">Hyper-realistic AI</span><span className="text-gray-400 ml-2 font-normal hidden sm:inline">- they won't even know</span>
              </li>
              <li className="flex items-center">
                <Check className="text-pink-500 w-7 h-7 mr-3 shrink-0" strokeWidth={3} />
                <span className="font-semibold">Irresistible charm</span><span className="text-gray-400 ml-2 font-normal hidden sm:inline">- unlock your best angles</span>
              </li>
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Button asChild size="lg" className="h-16 px-10 rounded-md font-bold text-xl bg-[#ec4899] text-white hover:bg-[#db2777] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.4)] border-0 w-full sm:w-auto">
                <Link href="/login?tab=signup">GET MY AI PHOTOS</Link>
              </Button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - PHONE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full flex justify-center lg:justify-end relative pb-10 sm:pb-0 z-10 scale-95 md:scale-100"
          >
            {/* Realistic iPhone 17 Case / Frame (Premium Pink) */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/19] rounded-[3rem] p-1.5 bg-gradient-to-tr from-[#be185d] via-[#ec4899] to-[#fbcfe8] shadow-2xl mt-12 lg:mt-0 z-10 border border-[#db2777]/80 shadow-[#ec4899]/30">
              {/* Inner bezel */}
              <div className="relative w-full h-full rounded-[2.7rem] bg-black overflow-hidden border-[2px] border-black">
                {/* Dynamic Island Notch (Slimmer for iPhone 17) */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20 flex items-center justify-between px-2.5">
                   {/* Fake camera lens inside the notch */}
                   <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-[#050505]"></div>
                </div>

                {/* Photo */}
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  alt="Attractive Dating Profile AI" 
                  className="w-full h-full object-cover rounded-[2.6rem] scale-[1.02]"
                />

                {/* Top Gradient Overlay to ensure notch is readable/blends well */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Notifications */}
              {/* 1. Tinder */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute top-20 right-[-1.5rem] sm:-right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-3 pr-5 pl-3 shadow-xl flex items-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-9 h-9 bg-gradient-to-tr from-[#fd297b] to-[#ff655b] rounded-full flex items-center justify-center shrink-0">
                  <Flame className="text-white w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Tinder <span className="text-[10px] text-gray-400 font-normal">now</span></div>
                  <div className="text-gray-600 text-[11px]">You have a new match!</div>
                </div>
              </motion.div>

              {/* 2. Snapchat */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="absolute top-1/2 -translate-y-8 left-[-1.5rem] sm:-left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 pl-3 pr-5 shadow-xl flex items-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-9 h-9 bg-[#FFFC00] rounded-full flex items-center justify-center shrink-0">
                  <Ghost className="text-black w-5 h-5 fill-black" />
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Snapchat <span className="text-[10px] text-gray-400 font-normal">2m ago</span></div>
                  <div className="text-gray-600 text-[11px]">Chloe is typing...</div>
                </div>
              </motion.div>

              {/* 3. Instagram */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="absolute bottom-36 right-[-1rem] sm:-right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-3 pl-3 pr-4 shadow-xl flex items-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-9 h-9 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center shrink-0">
                  <Heart className="text-white w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Instagram <span className="text-[10px] text-gray-400 font-normal">5m ago</span></div>
                  <div className="text-gray-600 text-[11px]">84 people liked your photo</div>
                </div>
              </motion.div>

              {/* 4. Hinge */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.4 }}
                className="absolute bottom-16 left-[-1.5rem] sm:-left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-3 pl-3 pr-5 shadow-xl flex items-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg font-serif italic">H</span>
                </div>
                <div>
                  <div className="text-black font-bold text-[13px] leading-tight flex items-center gap-1">Hinge <span className="text-[10px] text-gray-400 font-normal">12m ago</span></div>
                  <div className="text-gray-600 text-[11px]">Jessica sent a rose 🌹</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

