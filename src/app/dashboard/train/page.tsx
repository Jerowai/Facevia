'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, UploadCloud, X, CheckCircle2, Upload, Info, ShieldCheck, Sparkles, ImagePlus, ChevronRight, Wand2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Link from 'next/link'

interface PreviewFile {
  file: File
  preview: string
  id: string
}

export default function TrainPage() {
  const [previews, setPreviews] = useState<PreviewFile[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { t } = useLanguage()

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter(
      f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type) && f.size <= 10 * 1024 * 1024
    )
    if (Array.from(incoming).length !== valid.length) {
      toast.error(t('train.errors.format'))
    }
    const newPreviews: PreviewFile[] = valid.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }))
    setPreviews(prev => {
      const combined = [...prev, ...newPreviews]
      if (combined.length > 20) {
        toast.error(t('train.errors.max'))
        return combined.slice(0, 20)
      }
      return combined
    })
  }, [t])

  function removePreview(id: string) {
    setPreviews(prev => {
      const item = prev.find(p => p.id === id)
      if (item) URL.revokeObjectURL(item.preview)
      return prev.filter(p => p.id !== id)
    })
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }

  async function handleSubmit() {
    if (previews.length < 10) { toast.error(t('train.errors.min')); return }
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error(t('train.errors.login')); router.push('/login'); return }

    try {
      const uploadedPaths: string[] = []
      for (const p of previews) {
        const ext = p.file.name.split('.').pop()
        const path = `${user.id}/${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('user-training-images').upload(path, p.file)
        if (error) throw new Error(`Upload failed: ${error.message}`)
        uploadedPaths.push(path)
      }

      const res = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePaths: uploadedPaths }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to start training.')

      toast.success(t('trainingStatus.ready.title'))
      router.push(data.model?.id ? `/dashboard/training/${data.model.id}` : '/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'An error occurred.')
      setLoading(false)
    }
  }

  const count = previews.length
  const ready = count >= 10
  const progress = Math.min((count / 10) * 100, 100)

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-[1440px] mx-auto space-y-12">
      {/* ── Header ── */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ec4899]/10 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-white mb-2 relative z-10">
          {t('train.title')}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">{t('train.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        <div className="space-y-10">
          {/* ── Progress & Upload Zones ── */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden">
             
             {/* Progress Bar (Integrated) */}
             <div className="mb-8 space-y-3 px-2">
                <div className="flex justify-between items-end">
                   <p className="text-xs font-black uppercase tracking-widest text-[#ec4899]">Upload Progress</p>
                   <p className="text-2xl font-black text-white">{count}<span className="text-gray-600">/10+</span></p>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full bg-gradient-to-r ${ready ? 'from-[#00E5FF] to-emerald-500 shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'from-[#ec4899] to-[#9D4EDD] shadow-[0_0_20px_rgba(236,72,153,0.4)]'}`}
                   />
                </div>
                {!ready && (
                   <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tight italic">
                      <ChevronRight className="w-3 h-3 text-[#ec4899]" /> 
                      Need {10 - count} more photos for best results
                   </div>
                )}
             </div>

             {/* Dropzone (Premium) */}
             <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => document.getElementById('file-input')?.click()}
                className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all group cursor-pointer ${
                  ready ? 'border-[#00E5FF]/20 bg-[#00E5FF]/5' : 'border-white/10 hover:border-[#ec4899]/40 hover:bg-[#ec4899]/3'
                }`}
              >
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={e => addFiles(e.target.files)}
                  disabled={loading}
                />
                
                <div className="w-20 h-20 rounded-3xl bg-white/5 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <UploadCloud className={`w-10 h-10 ${ready ? 'text-[#00E5FF]' : 'text-gray-600 group-hover:text-[#ec4899]'}`} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">{t('train.dropzone.title')}</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">{t('train.dropzone.subtitle')}</p>
                
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest border border-white/5">
                   Drag & Drop or Multi-Select
                </div>
             </div>
          </div>

          {/* ── Guidelines (Cinematic Grid) ── */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00E5FF]" />
              {t('train.guidelines.good')} & {t('train.guidelines.bad')}
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="p-8 rounded-[2.5rem] bg-emerald-500/[0.03] border border-emerald-500/10 space-y-6">
                  <div className="flex items-center gap-3 text-emerald-400">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                     </div>
                     <span className="text-sm font-black uppercase tracking-widest">Recommended</span>
                  </div>
                  <ul className="space-y-4">
                    {[1, 2, 3, 4].map(idx => (
                      <li key={`g${idx}`} className="text-sm text-gray-400 flex items-center gap-3 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {t(`train.guidelines.tips.g${idx}`)}
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="p-8 rounded-[2.5rem] bg-red-500/[0.03] border border-red-500/10 space-y-6">
                  <div className="flex items-center gap-3 text-red-500">
                     <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <X className="w-6 h-6" />
                     </div>
                     <span className="text-sm font-black uppercase tracking-widest">Avoid These</span>
                  </div>
                  <ul className="space-y-4">
                    {[1, 2, 3, 4].map(idx => (
                      <li key={`b${idx}`} className="text-sm text-gray-400 flex items-center gap-3 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        {t(`train.guidelines.tips.b${idx}`)}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>

          {/* ── Preview Grid Overlay ── */}
          {previews.length > 0 && (
             <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex justify-between items-center px-2">
                   <h2 className="text-2xl font-black text-white tracking-tight">Image Selection</h2>
                   <button 
                    onClick={() => setPreviews([])}
                    className="text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors"
                   >
                    Clear All
                   </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-3">
                  <AnimatePresence>
                    {previews.map(p => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10"
                      >
                        <img src={p.preview} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => { e.stopPropagation(); removePreview(p.id) }}
                          className="absolute inset-0 bg-red-500/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X className="w-6 h-6 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
             </div>
          )}
        </div>

        {/* ── Action Panel (Right Side) ── */}
        <div className="space-y-8 lg:sticky lg:top-10">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8 shadow-2xl">
              <div className="space-y-4">
                 <h3 className="text-lg font-black text-white flex items-center gap-3">
                    <Wand2 className="w-6 h-6 text-[#ec4899]" />
                    AI Training Initiation
                 </h3>
                 <p className="text-xs text-gray-500 leading-relaxed italic">
                    Training takes approx. <span className="text-[#00E5FF]">20-30 minutes</span>. We'll secure your persona data in our private vault.
                 </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>Dataset Size</span>
                    <span className={ready ? 'text-emerald-400' : 'text-orange-500'}>{count} images</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>Privacy Shield</span>
                    <span className="text-emerald-400">Active</span>
                 </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!ready || loading}
                className="w-full h-20 rounded-[2rem] bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] text-white font-black text-xl tracking-tighter hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(236,72,153,0.3)] disabled:opacity-40 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <><Loader2 className="w-8 h-8 animate-spin" /> Training...</>
                ) : (
                  <><Sparkles className="w-8 h-8" /> Start Training</>
                )}
              </button>
              
              {!ready && (
                 <p className="text-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    Select {10 - count} more to unlock
                 </p>
              )}
           </div>

           {/* Security / Quality Card */}
           <div className="p-8 rounded-[2.5rem] bg-[#00E5FF]/5 border border-[#00E5FF]/10">
              <div className="flex items-center gap-3 text-[#00E5FF] mb-4">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="text-xs font-black uppercase tracking-widest">Secure Training</span>
              </div>
              <p className="text-xs text-[#00E5FF]/70 leading-relaxed font-medium">
                Your photos are used exclusively for training your personal AI Persona. They are never shared or used for other purposes.
              </p>
           </div>
        </div>

      </div>
    </div>
  )
}
