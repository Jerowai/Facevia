'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Download, X, ZoomIn, Loader2, ImageOff, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface GalleryImage {
  id: string
  image_url: string
  prompt: string
  created_at: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const supabase = createClient()

  const fetchImages = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data, error } = await supabase
      .from('images')
      .select('id, image_url, prompt, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load gallery.')
    } else {
      setImages(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  async function handleDownload(img: GalleryImage) {
    try {
      const response = await fetch(img.image_url)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `facevia-photo-${img.id.substring(0, 8)}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Photo downloaded!')
    } catch {
      toast.error('Failed to download. Try right-clicking and saving the image.')
    }
  }

  return (
    <div className="flex-1 p-6 md:p-8 w-full max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Photos</h1>
        <p className="text-gray-400">All your AI-generated dating photos in one place.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-10 w-10 text-[#00E5FF] animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 text-center p-8">
          <ImageOff className="h-12 w-12 text-gray-500 mb-4" />
          <p className="text-white font-medium text-lg">No photos generated yet</p>
          <p className="text-gray-400 text-sm mt-1">Head to the Generate page, pick a style, and create your first AI photo!</p>
          <a href="/dashboard/generate" className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Generate Photos
          </a>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-lg"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.image_url}
                alt="AI Generated Photo"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors"
                  title="Preview"
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(img) }}
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors"
                  title="Download"
                  onClick={(e) => { e.stopPropagation(); handleDownload(img) }}
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0D1117]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image_url}
                alt="AI Generated Photo"
                className="w-full object-cover max-h-[70vh]"
              />
              <div className="p-4 flex items-center justify-between gap-4">
                <p className="text-xs text-gray-400 truncate flex-1">{selectedImage.prompt}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/dashboard/generate"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10"
                  >
                    <ImagePlus className="h-4 w-4" /> Generate More
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(selectedImage)}
                    className="bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white border-0 rounded-xl hover:opacity-90"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
