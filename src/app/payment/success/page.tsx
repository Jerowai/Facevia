'use client'

import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#090b14] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* ── Background Aesthetics ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ec4899]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none animate-bounce [animation-duration:10s]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative z-10 text-center space-y-10"
      >
        <div className="relative inline-block">
          <motion.div 
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(236,72,153,0.4)]"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20"
          >
            <PartyPopper className="w-6 h-6 text-[#00E5FF]" />
          </motion.div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-[1000] tracking-tighter text-white">
            Success!
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
            Your account has been upgraded to <span className="text-white font-bold">Premium</span>. 
            Get ready for your best dating photos ever.
          </p>
        </div>

        <div className="py-8 px-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex items-center justify-between relative z-10">
              <div className="text-left">
                 <p className="text-[10px] font-black text-[#ec4899] uppercase tracking-widest mb-1">Status</p>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-white font-black uppercase tracking-tighter italic">Order Processed</span>
                 </div>
              </div>
              <Sparkles className="w-8 h-8 text-[#00E5FF] opacity-50" />
           </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4"
        >
          <Link
            href="/dashboard"
            className="group relative flex items-center justify-center gap-3 w-full h-20 rounded-[2rem] bg-white text-black font-[1000] text-xl tracking-tighter hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            ENTER DASHBOARD
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            Redirecting to your personal neural workspace
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
