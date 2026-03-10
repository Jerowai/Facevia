'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, UploadCloud, X, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreviewFile {
  file: File
  preview: string
  id: string
}

const STEPS = [
  { n: 1, label: 'Upload Photos' },
  { n: 2, label: 'AI Training' },
  { n: 3, label: 'Generate Photos' },
]

const GOOD_TIPS = [
  'Clear face, well lit',
  'Multiple angles',
  'Natural expressions',
  'Different outfits / backgrounds',
]
const BAD_TIPS = [
  'Sunglasses or hats',
  'Dark or blurry shots',
  'Group photos',
  'Heavy filters',
]

export default function TrainPage() {
  const [previews, setPreviews] = useState<PreviewFile[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter(
      f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type) && f.size <= 10 * 1024 * 1024
    )
    if (Array.from(incoming).length !== valid.length) {
      toast.error('Some files were skipped — only JPG/PNG/WebP under 10 MB accepted.')
    }
    const newPreviews: PreviewFile[] = valid.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).slice(2),
    }))
    setPreviews(prev => {
      const combined = [...prev, ...newPreviews]
      if (combined.length > 20) {
        toast.error('Maximum 20 photos allowed. Extra files were removed.')
        return combined.slice(0, 20)
      }
      return combined
    })
  }, [])

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
    if (previews.length < 10) { toast.error('Please select at least 10 photos.'); return }
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error('Please log in first.'); router.push('/login'); return }

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

      toast.success('Training started!')
      router.push(data.model?.id ? `/dashboard/training/${data.model.id}` : '/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'An error occurred.')
      setLoading(false)
    }
  }

  const count = previews.length
  const ready = count >= 10

  return (
    <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Upload Your Photos</h1>
        <p className="text-gray-400">Upload 10–20 clear selfies so the AI can learn your unique facial features.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${s.n === 1 ? 'bg-[#ec4899] text-white' : 'bg-white/5 text-gray-500'}`}>
              {s.n === 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[10px]">{s.n}</span>}
              {s.label}
            </div>
            {i < 2 && <div className="w-6 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      {/* Upload Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="relative border-2 border-dashed border-white/20 rounded-3xl p-10 text-center hover:border-[#ec4899]/60 hover:bg-[#ec4899]/5 transition-all group cursor-pointer"
        onClick={() => document.getElementById('file-input')?.click()}
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
        <UploadCloud className="mx-auto mb-4 h-12 w-12 text-gray-500 group-hover:text-[#ec4899] transition-colors" />
        <p className="font-semibold text-white text-lg mb-1">Drag & drop photos here</p>
        <p className="text-gray-400 text-sm mb-4">or click to browse files</p>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${ready ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
          {count > 0 ? `${count} / 20 photos selected` : '0 / 20 photos selected'} {ready && '✓ Ready'}
        </div>
      </div>

      {/* Thumbnail Grid */}
      {previews.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-3 font-medium">Selected Photos</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            <AnimatePresence>
              {previews.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-square rounded-xl overflow-hidden group border border-white/10"
                >
                  <img src={p.preview} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={e => { e.stopPropagation(); removePreview(p.id) }}
                    disabled={loading}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <p className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Good Photos
          </p>
          <ul className="space-y-1.5">
            {GOOD_TIPS.map(t => <li key={t} className="text-sm text-gray-300 flex items-center gap-2"><span className="text-emerald-400">✓</span>{t}</li>)}
          </ul>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <p className="text-red-400 font-semibold text-sm mb-3 flex items-center gap-2">
            <X className="w-4 h-4" /> Avoid These
          </p>
          <ul className="space-y-1.5">
            {BAD_TIPS.map(t => <li key={t} className="text-sm text-gray-300 flex items-center gap-2"><span className="text-red-400">✕</span>{t}</li>)}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={!ready || loading}
        className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#ec4899] to-[#be185d] text-white font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(236,72,153,0.3)]"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Uploading &amp; Starting Training...</>
        ) : (
          <>Upload &amp; Start Training {!ready && `(need ${10 - count} more)`}</>
        )}
      </button>
    </div>
  )
}
