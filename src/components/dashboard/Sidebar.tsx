'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Upload, 
  ImagePlus, 
  ImageIcon, 
  Settings, 
  LogOut, 
  Coins,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

interface SidebarProps {
  credits: number
}

export function Sidebar({ credits }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const supabase = createClient()

  const navItems = [
    { href: '/dashboard', label: t('dashboard.nav.home'), icon: LayoutDashboard },
    { href: '/dashboard/train', label: t('dashboard.nav.train'), icon: Upload },
    { href: '/dashboard/generate', label: t('dashboard.nav.generate'), icon: ImagePlus },
    { href: '/dashboard/gallery', label: t('dashboard.nav.gallery'), icon: ImageIcon },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#090b14]/80 backdrop-blur-xl border-r border-white/5 flex flex-col z-50">
      {/* Logo */}
      <div className="p-8 pb-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] bg-clip-text text-transparent tracking-tighter">
            FACEVIA
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1.5">
        <div className="px-4 mb-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{t('nav.dashboard')}</p>
        </div>
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                active 
                  ? 'bg-white/5 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {active && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-[#ec4899] rounded-r-full"
                />
              )}
              <item.icon className={`w-5 h-5 transition-colors ${active ? 'text-[#ec4899]' : 'group-hover:text-[#ec4899]'}`} />
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
              {active && <ChevronRight className="ml-auto w-4 h-4 text-gray-600" />}
            </Link>
          )
        })}
      </nav>

      {/* Credits Card */}
      <div className="px-6 py-8 border-t border-white/5">
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#ec4899]/10 to-[#9D4EDD]/10 border border-[#ec4899]/20 overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Coins className="w-12 h-12 text-[#ec4899]" />
          </div>
          <p className="text-[10px] font-bold text-[#ec4899] tracking-widest uppercase mb-1">{t('dashboard.credits')}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{credits}</span>
            <span className="text-[10px] text-gray-500 font-medium">credits</span>
          </div>
          <Link 
            href="/pricing"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-[#ec4899] hover:bg-[#be185d] text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-[#ec4899]/20"
          >
            <Plus className="w-3.5 h-3.5" /> {t('dashboard.buyCredits')}
          </Link>
        </div>
      </div>

      {/* Footer / SignOut */}
      <div className="p-4 space-y-1">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-red-400 transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-semibold">{t('nav.signOut')}</span>
        </button>
      </div>
    </aside>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
