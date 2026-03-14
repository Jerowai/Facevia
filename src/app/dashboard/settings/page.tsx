'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  User, 
  Globe, 
  CreditCard, 
  Shield, 
  Check, 
  ChevronRight,
  LogOut,
  Bell,
  Sparkles
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const supabase = createClient()
  const [activeTab, setActiveTab ] = useState('profile')

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-[1440px] mx-auto space-y-12">
      {/* ── Header ── */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ec4899]/10 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-white mb-2 relative z-10">
          {t('dashboard.nav.settings')}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">{t('dashboard.settings.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
        {/* ── Tabs Sidebar ── */}
        <div className="space-y-2 p-2 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
           {[
             { id: 'profile', label: t('dashboard.settings.profile'), icon: User },
             { id: 'language', label: t('dashboard.settings.language'), icon: Globe },
             { id: 'billing', label: t('dashboard.settings.billing'), icon: CreditCard },
             { id: 'security', label: t('dashboard.settings.security'), icon: Shield },
           ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                  activeTab === tab.id 
                    ? 'bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'group-hover:text-[#ec4899]'}`} />
                <span className="font-black text-sm uppercase tracking-widest">{tab.label}</span>
                {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4" />}
              </button>
           ))}
           <div className="h-px bg-white/5 my-4" />
           <button
             onClick={handleSignOut}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all group"
           >
              <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-black text-sm uppercase tracking-widest">{t('nav.signOut')}</span>
           </button>
        </div>

        {/* ── Content Area ── */}
        <div className="space-y-10">
           {activeTab === 'profile' && (
             <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8"
             >
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] flex items-center justify-center shadow-2xl">
                      <User className="w-12 h-12 text-white" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{t('dashboard.settings.profile')}</h3>
                      <p className="text-gray-500 text-sm">{t('dashboard.settings.updateProfile')}</p>
                   </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">{t('dashboard.settings.emailLabel')}</label>
                      <input 
                        type="text" 
                        disabled 
                        placeholder="user@example.com"
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-sm focus:border-[#ec4899] transition-all outline-none opacity-50 cursor-not-allowed"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#ec4899] ml-1">{t('dashboard.settings.displayName')}</label>
                      <input 
                        type="text" 
                        placeholder={t('dashboard.settings.displayName')}
                        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-sm focus:border-[#ec4899] transition-all outline-none"
                      />
                   </div>
                </div>

                <div className="flex justify-end pt-4">
                   <button className="px-8 py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-[#ec4899] hover:text-white transition-all shadow-xl">
                      {t('dashboard.settings.save')}
                   </button>
                </div>
             </motion.div>
           )}

           {activeTab === 'language' && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }} 
               animate={{ opacity: 1, x: 0 }}
               className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8"
             >
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <Globe className="w-12 h-12 text-emerald-400" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{t('dashboard.settings.langTitle')}</h3>
                      <p className="text-gray-500 text-sm">{t('dashboard.settings.langSubtitle')}</p>
                   </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                   {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={`p-6 rounded-3xl border transition-all text-center space-y-3 group ${
                          language === lang.code 
                            ? 'bg-gradient-to-br from-[#00E5FF]/10 to-[#00B4D8]/10 border-[#00E5FF]/40 text-white' 
                            : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20 hover:text-white'
                        }`}
                      >
                         <span className="text-4xl block group-hover:scale-110 transition-transform">{lang.flag}</span>
                         <span className="font-black text-xs uppercase tracking-widest block">{lang.label}</span>
                         {language === lang.code && (
                           <div className="inline-flex items-center gap-2 text-[10px] text-[#00E5FF] font-black uppercase tracking-widest">
                             <Check className="w-3 h-3" /> {t('dashboard.settings.selected')}
                           </div>
                         )}
                      </button>
                   ))}
                </div>
             </motion.div>
           )}

           {activeTab === 'billing' && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }} 
               animate={{ opacity: 1, x: 0 }}
               className="space-y-10"
             >
                <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-[2rem] bg-[#ec4899]/10 flex items-center justify-center border border-[#ec4899]/20">
                          <CreditCard className="w-12 h-12 text-[#ec4899]" />
                      </div>
                      <div>
                          <h3 className="text-2xl font-black text-white tracking-tight">{t('dashboard.settings.billingTitle')}</h3>
                          <p className="text-gray-500 text-sm">{t('dashboard.settings.billingSubtitle')}</p>
                      </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#ec4899]/20 to-[#9D4EDD]/20 border border-[#ec4899]/20 flex justify-between items-center group relative overflow-hidden">
                       <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 blur-3xl rounded-full group-hover:bg-[#ec4899]/10 transition-all" />
                       <div className="space-y-2 relative z-10">
                          <p className="text-[10px] font-black text-[#ec4899] uppercase tracking-widest italic">{t('dashboard.settings.activePlan')}</p>
                          <h4 className="text-3xl font-[1000] text-white tracking-tighter uppercase italic">Free Explorer</h4>
                          <Link href="/pricing" className="text-xs font-bold text-white/50 hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                             {t('dashboard.settings.upgradeText')} <ChevronRight className="w-3 h-3" />
                          </Link>
                       </div>
                       <Link 
                        href="/pricing"
                        className="px-8 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all relative z-10"
                       >
                         Upgrade Plan
                       </Link>
                    </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'security' && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }} 
               animate={{ opacity: 1, x: 0 }}
               className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8"
             >
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-[2rem] bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/20">
                      <Shield className="w-12 h-12 text-[#00E5FF]" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{t('dashboard.settings.securityTitle')}</h3>
                      <p className="text-gray-500 text-sm">{t('dashboard.settings.securitySubtitle')}</p>
                   </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                   <div className="space-y-1">
                      <h4 className="font-black text-white uppercase tracking-tight">{t('dashboard.settings.emailLoginOnly')}</h4>
                      <p className="text-xs text-gray-500">{t('dashboard.settings.emailLoginDesc')}</p>
                   </div>
                   <button className="text-[10px] font-black uppercase tracking-widest text-[#ec4899] hover:underline transition-all">
                      {t('dashboard.settings.changePassword')}
                   </button>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between opacity-50">
                   <div className="space-y-1">
                      <h4 className="font-black text-white uppercase tracking-tight flex items-center gap-2">
                        {t('dashboard.settings.twoFactor')} <span className="text-[8px] bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded-full uppercase tracking-widest">{t('dashboard.settings.comingSoon')}</span>
                      </h4>
                      <p className="text-xs text-gray-500">{t('dashboard.settings.twoFactorDesc')}</p>
                   </div>
                   <input type="checkbox" disabled className="w-6 h-6 rounded-lg bg-white/10 border-white/10" />
                </div>
             </motion.div>
           )}
        </div>
      </div>
    </div>
  )
}

function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
