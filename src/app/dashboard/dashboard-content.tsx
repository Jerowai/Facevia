"use client";

import { Upload, ImageIcon, ImagePlus, Loader2, Coins, Plus, Sparkles, CheckCircle2, ChevronRight, Activity } from 'lucide-react'
import { AutoRefresh } from '@/components/dashboard/auto-refresh'
import Link from 'next/link'
import { motion } from "framer-motion";
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Model {
  id: string;
  status: string;
  error_message?: string | null;
  created_at: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

export function DashboardContent({
  models,
  user,
  credits = 0,
}: {
  models: Model[] | null,
  user: any,
  credits?: number,
}) {
  const { t } = useLanguage();
  const hasTrainingModels = models?.some(model => model.status === 'training')
  const trainingModelIds = models?.filter(m => m.status === 'training').map(m => m.id) || []
  const readyModels = models?.filter(m => m.status === 'ready') || []

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 p-6 md:p-10 w-full max-w-[1440px] mx-auto space-y-12"
    >
      {hasTrainingModels && <AutoRefresh intervalMs={15000} trainingModelIds={trainingModelIds} />}

      {/* ── Welcome Header ── */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ec4899]/10 blur-[100px] rounded-full" />
        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-white mb-2 relative z-10">
          {t('dashboard.title')}, {user?.email?.split('@')[0]}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">{t('dashboard.subtitle')}</p>
      </motion.div>

      {/* ── Stats Grid ── */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('dashboard.credits'), value: credits, icon: Coins, color: '#ec4899', trend: credits < 5 ? t('dashboard.runningLow') : '' },
          { label: t('dashboard.stats.personas'), value: readyModels.length, icon: Sparkles, color: '#00E5FF' },
          { label: t('dashboard.stats.activeTraining'), value: trainingModelIds.length, icon: Loader2, color: '#9D4EDD', spin: trainingModelIds.length > 0 },
          { label: t('dashboard.stats.totalGenerations'), value: 'Coming Soon', icon: ImagePlus, color: '#F72585' },
        ].map((stat, i) => (
          <div key={i} className="relative group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md overflow-hidden hover:bg-white/[0.05] transition-all">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6`} style={{ backgroundColor: `${stat.color}10`, border: `1px solid ${stat.color}20` }}>
              <stat.icon className={`w-6 h-6 ${stat.spin ? 'animate-spin' : ''}`} style={{ color: stat.color }} />
            </div>
            <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{stat.value}</span>
              {stat.trend && <span className="text-[9px] font-bold text-orange-500 uppercase">{stat.trend}</span>}
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: stat.color }} />
          </div>
        ))}
      </motion.div>

      {/* ── Main Dashboard Sections ── */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        
        <div className="space-y-12">
          {/* Onboarding Stepper (Modernized) */}
          <motion.div variants={itemVariants}>
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <CheckCircle2 className="w-32 h-32 text-emerald-500" />
              </div>
              <h2 className="text-xs font-black tracking-[0.3em] text-[#00E5FF] uppercase mb-8">{t('dashboard.progress')}</h2>
              
              <div className="space-y-6">
                {[
                  { step: 1, label: t('dashboard.steps.upload.title'), sub: t('dashboard.steps.upload.desc'), done: models && models.length > 0, href: '/dashboard/train', icon: Upload },
                  { step: 2, label: t('dashboard.steps.training.title'), sub: t('dashboard.steps.training.desc'), done: models?.some(m => m.status === 'ready'), href: '/dashboard', icon: Sparkles },
                  { step: 3, label: t('dashboard.steps.generate.title'), sub: t('dashboard.steps.generate.desc'), done: false, href: '/dashboard/generate', icon: ImagePlus },
                ].map((item, idx) => {
                  const isActive = !item.done && (idx === 0 || (idx === 1 && models && models.length > 0) || (idx === 2 && models?.some(m => m.status === 'ready')));
                  return (
                    <div key={item.step} className="flex items-center gap-6 group">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all ${
                        item.done ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 
                        isActive ? 'bg-[#ec4899] border-[#ec4899] text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] scale-110' : 
                        'bg-white/5 border-white/10 text-gray-500'
                      }`}>
                        {item.done ? <CheckCircle2 className="w-7 h-7" /> : <item.icon className="w-7 h-7" />}
                      </div>
                      <div className="flex-1">
                          <Link href={item.href} className={`block group/link`}>
                            <h3 className={`font-black tracking-tight text-lg mb-0.5 flex items-center gap-2 ${item.done ? 'text-emerald-400' : isActive ? 'text-white' : 'text-gray-500'}`}>
                              {item.label}
                              {isActive && <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{item.sub}</p>
                          </Link>
                      </div>
                      {idx < 2 && idx === 0 && (
                        <div className="hidden sm:block flex-1 border-t border-dashed border-white/10 mx-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Training Alert */}
          {hasTrainingModels && (
            <motion.div variants={itemVariants}>
              <div className="p-8 rounded-[2.5rem] bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex items-center gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 flex items-center justify-center shrink-0">
                  <Loader2 className="h-8 w-8 text-[#00E5FF] animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-1">{t('trainingStatus.training.title')}</h3>
                  <p className="text-sm text-[#00E5FF]/70">{t('trainingStatus.training.desc')}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active Personas Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#ec4899]" />
              {t('dashboard.models.title')}
            </h2>
            {(!models || models.length === 0) ? (
              <div className="p-16 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] text-center">
                <Upload className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">{t('dashboard.models.subtitle')}</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {models.map((model) => (
                  <div key={model.id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group flex flex-col justify-between min-h-[160px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">AI PERSONA</p>
                        <h3 className="text-lg font-black text-white">#{model.id.slice(0, 8).toUpperCase()}</h3>
                      </div>
                      <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase ${
                        model.status === 'ready' ? 'bg-emerald-500/10 text-emerald-500' : 
                        model.status === 'failed' ? 'bg-red-500/10 text-red-500' : 
                        'bg-[#6C63FF]/10 text-[#6C63FF]'
                      }`}>
                        {model.status}
                      </div>
                    </div>
                    
                    {model.status === 'ready' ? (
                      <Link 
                        href={`/dashboard/generate?modelId=${model.id}`}
                        className="mt-6 w-full py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#ec4899] hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                       <ImagePlus className="w-3.5 h-3.5" /> {t('dashboard.cards.generate.btn')}
                      </Link>
                    ) : (
                      <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase italic">
                        <Activity className="w-3 h-3" /> {t('dashboard.models.processing')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Sidebar Actions ── */}
        <div className="space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] shadow-[0_20px_50px_rgba(236,72,153,0.2)]">
            <h3 className="text-2xl font-black text-white tracking-tighter mb-2">{t('dashboard.marketing.title')}</h3>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">{t('dashboard.marketing.subtitle')}</p>
            <div className="space-y-3">
               <Link href="/dashboard/train" className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform">
                  <Upload className="w-5 h-5 text-[#ec4899]" />
                  {t('dashboard.cards.train.btn')}
               </Link>
               <Link href="/dashboard/generate" className="flex items-center gap-3 w-full p-4 rounded-2xl bg-black/20 text-white font-black text-sm uppercase tracking-widest hover:bg-black/30 transition-all border border-white/10">
                  <Sparkles className="w-5 h-5 text-white" />
                  {t('dashboard.marketing.quickGen')}
               </Link>
            </div>
          </div>

          {/* Tips Card */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md">
             <h4 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ec4899]" /> {t('dashboard.marketing.tipTitle')}
             </h4>
             <p className="text-gray-400 text-sm italic leading-relaxed">
               {t('dashboard.marketing.tipText')}
             </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
