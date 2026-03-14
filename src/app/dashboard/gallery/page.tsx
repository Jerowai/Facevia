'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Download, X, ZoomIn, Loader2, ImageOff, ImagePlus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface GalleryImage {
  id: string
  image_url: string
  prompt: string
  created_at: string
  is_favorite?: boolean
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const supabase = createClient()
  const { t } = useLanguage()

  const fetchImages = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data, error } = await supabase
      .from('images')
      .select('id, image_url, prompt, created_at, is_favorite')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      toast.error(t('gallery.errors.load'))
    } else {
      setImages(data || [])
    }
    setLoading(false)
  }, [supabase, t])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  async function toggleFavorite(img: GalleryImage) {
    const newVal = !img.is_favorite
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, is_favorite: newVal } : i))
    if (selectedImage?.id === img.id) setSelectedImage(prev => prev ? { ...prev, is_favorite: newVal } : null)
    const { error } = await supabase.from('images').update({ is_favorite: newVal }).eq('id', img.id)
    if (error) {
      toast.error(t('gallery.errors.favorite'))
      setImages(prev => prev.map(i => i.id === img.id ? { ...i, is_favorite: img.is_favorite } : i))
    }
  }

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
      toast.success(t('gallery.download.success'))
    } catch {
      toast.error(t('gallery.download.error'))
    }
  }

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-[1440px] mx-auto space-y-12">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00E5FF]/10 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-white mb-2 relative z-10">
          {t('gallery.title')}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">{t('gallery.subtitle')}</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-[#ec4899] animate-spin" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Developing your photos...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.02] text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8">
            <ImageOff className="h-10 w-10 text-gray-700" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{t('gallery.empty.title')}</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-10">{t('gallery.empty.desc')}</p>
          <Link 
            href="/dashboard/generate" 
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] text-white font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(236,72,153,0.3)]"
          >
            {t('gallery.empty.btn')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.image_url}
                alt="AI Masterpiece"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                 {/* Quick Actions overlay */}
                 <div className="flex items-center gap-3">
                    <button
                      className="flex-1 py-3 px-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#ec4899] hover:text-white transition-all"
                      onClick={(e) => { e.stopPropagation(); setSelectedImage(img) }}
                    >
                      View
                    </button>
                    <button
                      className={`p-3 rounded-xl backdrop-blur-md border border-white/10 transition-all ${img.is_favorite ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-red-500 text-white'}`}
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(img) }}
                    >
                      <Heart className={`w-4 h-4 ${img.is_favorite ? 'fill-white' : ''}`} />
                    </button>
                 </div>
              </div>
              
              {img.is_favorite && (
                <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#ec4899] shadow-lg">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              )}
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full grid md:grid-cols-[1fr_350px] rounded-[3rem] overflow-hidden bg-[#090b14] border border-white/10 shadow-[0_0_100px_rgba(236,72,153,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] bg-black">
                <img
                  src={selectedImage.image_url}
                  alt="AI Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-10 flex flex-col justify-between space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="px-3 py-1 rounded-lg bg-[#ec4899]/10 text-[#ec4899] text-[10px] font-black uppercase tracking-widest">Masterpiece</span>
                     <button 
                        onClick={() => setSelectedImage(null)}
                        className="p-2 rounded-full hover:bg-white/5 transition-colors"
                     >
                        <X className="w-5 h-5 text-gray-500" />
                     </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">Dating Persona</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium italic">
                      "{selectedImage.prompt}"
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => handleDownload(selectedImage)}
                    className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-[#00E5FF] hover:text-black transition-all group"
                  >
                    <Download className="w-5 h-5 mr-3 group-hover:translate-y-0.5 transition-transform" />
                    Download HD Image
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => toggleFavorite(selectedImage)}
                        className={`h-14 rounded-2xl border transition-all flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest ${
                          selectedImage.is_favorite 
                            ? 'bg-red-500/10 border-red-500 text-red-500' 
                            : 'bg-white/5 border-white/10 text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${selectedImage.is_favorite ? 'fill-red-500' : ''}`} />
                        {selectedImage.is_favorite ? 'Favorited' : 'Favorite'}
                      </button>
                      <Link
                        href="/dashboard/generate"
                        className="h-14 rounded-2xl bg-[#ec4899]/10 border border-[#ec4899]/20 text-[#ec4899] flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-[#ec4899]/20 transition-all"
                      >
                        <ImagePlus className="w-4 h-4" />
                        Generate
                      </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
