'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type TrainingStatus = 'training' | 'ready' | 'failed' | 'unknown'

const STAGES = [
    { key: 'uploading', label: 'Uploading photos', desc: 'Your photos are being securely uploaded.' },
    { key: 'preparing', label: 'Preparing training data', desc: 'We are processing and packaging your selfies.' },
    { key: 'training', label: 'AI model training', desc: 'The LoRA model is learning your facial features.' },
    { key: 'ready', label: 'Training complete!', desc: 'Your personal AI is ready to generate photos.' },
]

function stageIndex(status: TrainingStatus): number {
    if (status === 'ready') return 3
    if (status === 'training') return 2
    return 1
}

export default function TrainingPage() {
    const params = useParams()
    const modelId = params.modelId as string
    const router = useRouter()
    const supabase = createClient()

    const [status, setStatus] = useState<TrainingStatus>('training')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [elapsed, setElapsed] = useState(0)

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

    // Elapsed timer
    useEffect(() => {
        const t = setInterval(() => setElapsed(s => s + 1), 1000)
        return () => clearInterval(t)
    }, [])

    const mins = Math.floor(elapsed / 60)
    const secs = elapsed % 60

    const activeIdx = stageIndex(status)
    const failed = status === 'failed'
    const ready = status === 'ready'

    return (
        <div className="flex-1 flex items-center justify-center p-6 min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    {ready ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Your AI model is ready!</h1>
                            <p className="text-gray-400">Time to generate your dating photos.</p>
                        </div>
                    ) : failed ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                <XCircle className="w-9 h-9 text-red-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Training failed</h1>
                            <p className="text-gray-400 text-sm">{errorMsg || 'Something went wrong. Please try again.'}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            {/* Animated rings */}
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 rounded-full border-4 border-[#ec4899]/20" />
                                <div className="absolute inset-0 rounded-full border-4 border-t-[#ec4899] animate-spin" />
                                <div className="absolute inset-2 rounded-full border-2 border-t-[#9D4EDD]/60 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Training your AI model</h1>
                            <p className="text-gray-400">This typically takes 15–25 minutes. You can close this page and come back later.</p>
                        </div>
                    )}
                </div>

                {/* Stage tracker */}
                {!failed && (
                    <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
                        {STAGES.map((stage, i) => {
                            const done = i < activeIdx
                            const active = i === activeIdx && !ready
                            const isLast = i === 3 && ready
                            return (
                                <div key={stage.key} className="flex items-start gap-4">
                                    <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${done || isLast ? 'bg-emerald-500 text-white' : active ? 'bg-[#ec4899] text-white' : 'bg-white/10 text-gray-500'}`}>
                                        {done || isLast ? <CheckCircle2 className="w-4 h-4" /> : active ? <Loader2 className="w-4 h-4 animate-spin" /> : i + 1}
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-sm ${done || isLast ? 'text-emerald-400' : active ? 'text-white' : 'text-gray-500'}`}>{stage.label}</p>
                                        {(active || isLast) && <p className="text-xs text-gray-400 mt-0.5">{stage.desc}</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Elapsed time */}
                {!ready && !failed && (
                    <p className="text-center text-gray-500 text-sm mb-6">
                        Time elapsed: {mins}:{secs.toString().padStart(2, '0')}
                    </p>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    {ready && (
                        <Link
                            href={`/dashboard/generate?modelId=${modelId}`}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#ec4899] to-[#be185d] text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(236,72,153,0.3)]"
                        >
                            Generate My Photos <ArrowRight className="w-5 h-5" />
                        </Link>
                    )}
                    {failed && (
                        <Link
                            href="/dashboard/train"
                            className="w-full h-14 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-lg flex items-center justify-center gap-2 transition-colors border border-white/10"
                        >
                            <RefreshCw className="w-5 h-5" /> Try Again
                        </Link>
                    )}
                    <Link
                        href="/dashboard"
                        className="text-center text-sm text-gray-500 hover:text-gray-300 transition-colors py-2"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
