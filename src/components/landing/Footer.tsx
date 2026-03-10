"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-20 px-6 bg-[#0F172A] border-t border-white/5">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-black text-2xl tracking-tighter text-gradient mb-6 inline-block">
              Facevia
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.product')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">{t('footer.links.howItWorks')}</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">{t('footer.links.pricing')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('footer.links.styles')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">{t('footer.links.privacy')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('footer.links.terms')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('footer.links.cookies')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.social')}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Twitter (X)</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">TikTok</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] md:text-xs text-center md:text-left">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <div className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse"></div>
            <p className="text-gray-500 text-[10px] md:text-xs">{t('footer.operational')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
