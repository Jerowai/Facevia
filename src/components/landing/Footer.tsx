"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-20 px-6 bg-[#090b14] border-t border-white/10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#ec4899]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#ec4899] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="font-black text-2xl tracking-tighter text-gradient mb-6 inline-block">
              Facevia
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-2">
              AI-powered dating photos that help you look your best online.
            </p>
            <p className="text-[#ec4899] font-medium text-sm">
              Built for modern dating profiles.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link href="/how-it-works" className="hover:text-[#ec4899] transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-[#ec4899] transition-colors">Pricing</Link></li>
              <li><Link href="/styles" className="hover:text-[#ec4899] transition-colors">Style Presets</Link></li>
              <li><Link href="/faq" className="hover:text-[#ec4899] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link href="/privacy-policy" className="hover:text-[#ec4899] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#ec4899] transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-[#ec4899] transition-colors">Cookie Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[#ec4899] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Social</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link href="#" className="hover:text-[#ec4899] transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-[#ec4899] transition-colors">TikTok</Link></li>
              <li><Link href="#" className="hover:text-[#ec4899] transition-colors">X / Twitter</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left font-medium">
            © 2026 Facevia. All rights reserved. <br className="md:hidden" />
            <span className="hidden md:inline"> | </span>
            Operated by UMUT KAYDIM ENTERPRISE LTD.
          </p>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="h-2.5 w-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]"></div>
            <p className="text-gray-300 text-xs font-semibold tracking-wide uppercase">AI Systems Operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
