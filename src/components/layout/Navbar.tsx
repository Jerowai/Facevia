'use client';

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const supabase = createClient()
  const { t } = useLanguage()

  const NAV_LINKS = [
    { href: '/', label: 'Logo', isLogo: true },
    { href: '/#photos', label: t('nav.photos') },
    { href: '/#features', label: t('nav.features') },
    { href: '/#pricing', label: t('nav.pricing') },
    { href: '/#testimonials', label: t('nav.reviews') },
  ]

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0f1e]/95 backdrop-blur-xl h-[72px] flex items-center px-6 md:px-12">
      {/* Logo */}
      <Link href="/" className="font-black text-2xl tracking-tighter flex-shrink-0">
        <span className="bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] bg-clip-text text-transparent">FACEVIA</span>
      </Link>

      {/* Center Nav Links */}
      <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.filter(link => !link.isLogo).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[15px] font-semibold text-white/70 hover:text-white transition-colors duration-200 relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ec4899] group-hover:w-full transition-all duration-300 rounded-full" />
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-4 md:gap-5">
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="hidden sm:block text-[15px] font-semibold text-white/80 hover:text-white transition-colors"
            >
              {t('nav.dashboard')}
            </Link>
            <form action="/auth/signout" method="post" className="hidden sm:block">
              <button
                type="submit"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {t('nav.signOut')}
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden md:block text-[15px] font-semibold text-white/70 hover:text-white transition-colors"
            >
              {t('nav.login')}
            </Link>
            <Link
              href="/login?tab=signup"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-[#ec4899] to-[#be185d] hover:from-[#db2777] hover:to-[#9d1c5f] text-white px-5 py-2.5 md:px-7 md:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.35)] border border-[#ec4899]/30"
            >
              ✨ {t('nav.cta')}
            </Link>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-white/80 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[#0a0f1e] border-b border-white/5 py-4 px-6 flex flex-col gap-4 lg:hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50">
          <div className="pb-4 border-b border-white/5 flex justify-between items-center">
            <span className="text-white/60 text-sm font-medium">{t('dashboard.settings.language')}</span>
            <LanguageSwitcher />
          </div>

          <div className="flex flex-col gap-4 py-2">
            {NAV_LINKS.filter(link => !link.isLogo).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-semibold text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-lg font-semibold text-white/90" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.dashboard')}
                </Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-lg font-semibold text-[#ec4899]">{t('nav.signOut')}</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-lg font-semibold text-white/90" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.login')}
                </Link>
                <Link
                  href="/login?tab=signup"
                  className="inline-flex justify-center items-center gap-2 text-base font-bold bg-gradient-to-r from-[#ec4899] to-[#be185d] text-white px-7 py-3.5 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ✨ {t('nav.cta')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
