'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, AlertCircle, Loader2, Zap, Timer, LayoutDashboard, Sparkles, Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type TrainingStatus = 'training' | 'ready' | 'failed' | 'unknown' | 'starting' | 'uploading' | 'preparing' | 'canceled'

const STAGES = [
    { id: 'uploading', title: 'Uploading photos', desc: 'Your photos are being securely uploaded.' },
    { id: 'preparing', title: 'Preparing training data', desc: 'We are processing and packaging your selfies.' },
    { id: 'training', title: 'AI model training', desc: 'The LoRA model is learning your facial features.' },
    { id: 'ready', title: 'Training complete!', desc: 'Your personal AI is ready to generate photos.' },
]

function stageIndex(status: TrainingStatus): number {
    if (status === 'ready') return 3
    if (status === 'training') return 2
    if (status === 'preparing') return 1
    if (status === 'uploading') return 0
    return -1 // For 'starting', 'failed', 'unknown', 'canceled'
}

export default function TrainingStatusPage() {
    const params = useParams()
    const modelId = params.modelId as string
    const router = useRouter()
    const supabase = createClient()
    const { t } = useLanguage()

    const [status, setStatus] = useState<TrainingStatus>('starting')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [elapsedTime, setElapsedTime] = useState(0)

    const poll = useCallback(async () => {
        if (!modelId) return
        const { data } = await supabase
            .from('models')
            .select('status, error_message')
            .eq('id', modelId)
            .single()

        if (data) {
            setStatus(data.status as TrainingStatus)
            setErrorMsg(data.error_message ?? null)
        }
    }, [modelId, supabase])

    useEffect(() => {
        poll()
        const interval = setInterval(poll, 12000)
        return () => clearInterval(interval)
    }, [poll])

    useEffect(() => {
        const t = setInterval(() => setElapsedTime(s => s + 1), 1000)
        return () => clearInterval(t)
    }, [])

    const activeIdx = stageIndex(status)
    const failed = status === 'failed' || status === 'canceled'
    const ready = status === 'ready'
    const activeStageId = STAGES[activeIdx]?.id || 'unknown'

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[85vh] relative overflow-hidden">
            {/* ── Background Aesthetics ── */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ec4899]/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* ── Status Header ── */}
                <div className="text-center mb-16 space-y-6">
                    {ready ? (
                        <div className="space-y-6">
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.4)]"
                            >
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-white">
                                {t('trainingStatus.ready.title')}
                            </h2>
                            <p className="text-gray-400 text-lg max-w-md mx-auto">{t('trainingStatus.ready.desc')}</p>
                        </div>
                    ) : failed ? (
                        <div className="space-y-6">
                            <div className="w-24 h-24 bg-red-500/20 rounded-[2rem] flex items-center justify-center mx-auto border border-red-500/20">
                                <AlertCircle className="w-12 h-12 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-[1000] tracking-tighter text-white">{t('trainingStatus.failed.title')}</h2>
                            <p className="text-gray-400 max-w-md mx-auto bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                                {errorMsg || t('trainingStatus.failed.desc')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="relative w-32 h-32 mx-auto">
                                {/* Outer Glow */}
                                <div className="absolute inset-0 bg-[#ec4899]/20 blur-2xl rounded-full animate-pulse" />
                                
                                {/* Orbiting rings */}
                                <svg className="w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="10 20" className="opacity-20" />
                                </svg>
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.4)] animate-bounce [animation-duration:3s]">
                                        <Zap className="w-10 h-10 text-white fill-white" />
                                    </div>
                                </div>
                                
                                {/* Mini loader */}
                                <div className="absolute -bottom-2 -right-2">
                                    <div className="w-10 h-10 bg-[#090b14] rounded-full border border-white/10 flex items-center justify-center">
                                        <Loader2 className="w-5 h-5 text-[#00E5FF] animate-spin" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <h2 className="text-4xl font-[1000] tracking-tighter text-white">{t('trainingStatus.training.title')}</h2>
                                <div className="flex items-center justify-center gap-2 text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.2em]">
                                   <Sparkles className="w-3 h-3" />
                                   Igniting Neural Pathways
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Enhanced Stage Tracker ── */}
                {!failed && (
                    <div className="relative p-1 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl overflow-hidden mb-10 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                        <div className="relative p-8 space-y-8">
                           {STAGES.map((stage, index) => {
                                const isActive = STAGES.findIndex(s => s.id === activeStageId) >= index
                                const isCurrent = activeStageId === stage.id
                                return (
                                    <div key={stage.id} className="flex gap-6 items-start">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                                                isCurrent ? 'bg-[#ec4899] border-[#ec4899] text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-110' :
                                                isActive ? 'bg-emerald-500 border-emerald-500 text-white' :
                                                'bg-white/5 border-white/10 text-gray-500'
                                            }`}>
                                                {isActive && stage.id !== 'ready' && !ready ? (
                                                    <Loader2 className={`w-6 h-6 ${isCurrent ? 'animate-spin' : ''}`} />
                                                ) : isActive ? (
                                                    <CheckCircle2 className="w-6 h-6" />
                                                ) : (
                                                    <span className="text-xs font-black">{index + 1}</span>
                                                )}
                                            </div>
                                            {index < STAGES.length - 1 && (
                                                <div className={`w-0.5 h-full min-h-[30px] rounded-full transition-colors duration-500 ${isActive && STAGES.findIndex(s => s.id === activeStageId) > index ? 'bg-emerald-500' : 'bg-white/10'}`} />
                                            )}
                                        </div>
                                        
                                        <div className="pt-2">
                                            <h4 className={`text-base font-black tracking-tight ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                {t(`trainingStatus.stages.${stage.id}.title`) || stage.title}
                                            </h4>
                                            <p className={`text-sm max-w-sm ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {t(`trainingStatus.stages.${stage.id}.desc`) || stage.desc}
                                            </p>
                                        </div>
                                    </div>
                                )
                           })}
                        </div>
                    </div>
                )}

                {/* ── Footer Actions ── */}
                <div className="space-y-6">
                    {!ready && !failed && (
                        <div className="flex flex-col items-center gap-3">
                           <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
                               <Timer className="w-4 h-4 text-[#ec4899]" />
                               <span className="text-xs font-black uppercase tracking-widest text-white font-mono">
                                   {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                               </span>
                           </div>
                           <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic">
                              Live Neural Dashboard Interface
                           </p>
                        </div>
                    )}

                    <div className="grid gap-4">
                        {ready && (
                            <button
                                onClick={() => router.push(`/dashboard/generate?modelId=${modelId}`)}
                                className="w-full h-20 rounded-[2rem] bg-gradient-to-br from-[#00E5FF] to-[#00B4D8] text-black font-black text-xl tracking-tighter hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(0,229,255,0.3)] flex items-center justify-center gap-3"
                            >
                                <Sparkles className="w-7 h-7" /> {t('trainingStatus.ready.btn')}
                            </button>
                        )}
                        {failed && (
                            <button
                                onClick={() => router.push('/dashboard/train')}
                                className="w-full h-20 rounded-[2rem] bg-white text-black font-black text-xl tracking-tighter hover:bg-[#ec4899] hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                <Wand2 className="w-7 h-7" /> {t('trainingStatus.failed.btn')}
                            </button>
                        )}
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                            <LayoutDashboard className="w-4 h-4" /> {t('trainingStatus.back')}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
