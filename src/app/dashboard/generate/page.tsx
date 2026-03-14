'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Wand2, ImageIcon, Coins, Sparkles, Check } from 'lucide-react'
import { PHOTO_PRESETS } from '@/lib/constants/presets'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function GenerateInterface() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [modelId, setModelId] = useState<string>('')
  const [models, setModels] = useState<any[]>([])
  const [credits, setCredits] = useState<number | null>(null)
  const [generating, setGenerating] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const supabase = createClient()
  const { t } = useLanguage()

  useEffect(() => {
    if (success) toast.success('Payment successful! Credits have been added.')

    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: modelsData }, { data: creditsData }] = await Promise.all([
        supabase.from('models').select('id, status, created_at').eq('user_id', user.id).eq('status', 'ready').order('created_at', { ascending: false }),
        supabase.from('user_credits').select('credits').eq('user_id', user.id).single(),
      ])

      if (modelsData && modelsData.length > 0) {
        setModels(modelsData)
        const urlModelId = searchParams.get('modelId')
        setModelId(urlModelId || modelsData[0].id)
      }

      if (creditsData) setCredits(creditsData.credits)
    }
    fetchData()
  }, [success, searchParams, supabase])

  async function handleGenerate() {
    if (!modelId) { toast.error(t('generate.model.error')); return }
    if (!selectedPreset && !customPrompt.trim()) { toast.error(t('generate.cta.error')); return }
    if (credits !== null && credits < 1) { toast.error(t('generate.credits.error')); return }

    setGenerating(true)
    setResultImage(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId,
          presetId: selectedPreset,
          prompt: customPrompt || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate image')

      setResultImage(data.url)
      if (credits !== null) setCredits(credits - 1)
      toast.success(t('generate.result.success'))
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* ── Model & Style Selection ── */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        <div className="space-y-10">
          {/* Model Selector (Subtle) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">{t('generate.model.title')}</h2>
              <p className="text-xs text-gray-500">{t('generate.model.desc')}</p>
            </div>
            {models.length > 0 ? (
              <select
                value={modelId}
                onChange={e => setModelId(e.target.value)}
                className="h-12 px-5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#ec4899] transition-all min-w-[240px]"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id} className="bg-[#090b14]">
                    AI Persona {m.id.substring(0, 6).toUpperCase()}
                  </option>
                ))}
              </select>
            ) : (
              <Link href="/dashboard/train" className="px-5 py-2.5 rounded-xl bg-[#ec4899]/10 text-[#ec4899] text-xs font-bold border border-[#ec4899]/20 hover:bg-[#ec4899]/20 transition-all">
                {t('dashboard.cards.train.btn')} →
              </Link>
            )}
          </div>

          {/* Premium Style Grid */}
          <div className="space-y-4">
            <div className="flex items-end justify-between px-2">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">{t('styles.title')}</h2>
                <p className="text-sm text-gray-500">{t('styles.subtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {PHOTO_PRESETS.map((preset) => (
                <motion.div
                  key={preset.id}
                  whileHover={{ y: -4 }}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] border-2 transition-all duration-300 ${
                    selectedPreset === preset.id 
                      ? 'border-[#ec4899] shadow-[0_0_30px_rgba(236,72,153,0.3)] scale-[1.02]' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                  onClick={() => { setSelectedPreset(preset.id); setCustomPrompt('') }}
                >
                  <img 
                    src={preset.image} 
                    alt={preset.name} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${selectedPreset === preset.id ? 'scale-110' : 'group-hover:scale-105'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {preset.isTrending && (
                      <span className="px-2 py-1 rounded-md bg-orange-500 text-[9px] font-black text-white uppercase tracking-tighter shadow-lg">
                        🔥 Trending
                      </span>
                    )}
                    {preset.isRecommended && (
                      <span className="px-2 py-1 rounded-md bg-[#00E5FF] text-[9px] font-black text-black uppercase tracking-tighter shadow-lg">
                        ✨ Best for Dating
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                    <p className="text-xs font-black text-white uppercase tracking-widest drop-shadow-lg">
                      {preset.icon} {t(`styles.${preset.id}.name`) || preset.name}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">{preset.label}</p>
                  </div>

                  {selectedPreset === preset.id && (
                    <motion.div 
                      layoutId="preset-check"
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#ec4899] flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Action Panel ── */}
        <div className="space-y-6 lg:sticky lg:top-8">
          <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-[#ec4899]" />
                {t('generate.prompt.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
               <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Advanced Settings</p>
                  <textarea
                    rows={4}
                    value={customPrompt}
                    onChange={(e) => { setCustomPrompt(e.target.value); setSelectedPreset(null) }}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ec4899] transition-all placeholder:text-gray-600 resize-none"
                    placeholder={t('generate.prompt.placeholder')}
                  />
               </div>

               <Button
                onClick={handleGenerate}
                disabled={generating || models.length === 0}
                className="w-full h-16 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#9D4EDD] text-white font-black text-lg tracking-tight hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(236,72,153,0.3)] disabled:opacity-40"
              >
                {generating ? (
                  <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> {t('generate.cta.generating')}...</>
                ) : (
                  <><Sparkles className="mr-2 h-6 w-6" /> {t('generate.cta.generate')}</>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Coins className="w-3.5 h-3.5" />
                <span>1 generation = 1 credit</span>
              </div>
            </CardContent>
          </Card>

          {/* Tips / Advice Card */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center text-[10px]">💡</span>
                  Expert Tip
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "For dating profiles, the <span className="text-white font-semibold">Tinder Rooftop</span> and <span className="text-white font-semibold">Beach Sunset</span> styles have the highest swiping conversion rates."
                </p>
          </div>
        </div>
      </div>

      {/* ── Results Area ── */}
      <div id="results" className="mt-10 border-t border-white/5 pt-10">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">Your Masterpiece</h2>
            <p className="text-sm text-gray-500">Generated using your unique AI persona.</p>
          </div>

          <div className="relative min-h-[500px] rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/10 group flex items-center justify-center p-8">
              {generating ? (
                <div className="flex flex-col items-center gap-6 animate-pulse">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#ec4899] blur-3xl opacity-20 rounded-full animate-bounce" />
                    <Wand2 className="h-20 w-20 text-[#ec4899] relative z-10" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl font-bold text-white tracking-tight">{t('generate.result.generating')}...</p>
                    <p className="text-sm text-gray-500 max-w-xs">{t('generate.result.wait')}</p>
                  </div>
                </div>
              ) : resultImage ? (
                <div className="relative group/result max-w-2xl w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.15)] ring-1 ring-white/20">
                    <img src={resultImage} alt="Generated UI" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/result:opacity-100 transition-opacity duration-500 flex items-end justify-center p-10">
                        <a 
                          href={resultImage} 
                          download 
                          className="px-8 py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                          Download HD Photo
                        </a>
                    </div>
                </div>
              ) : (
                <div className="text-center space-y-4 opacity-40 group-hover:opacity-60 transition-opacity">
                   <div className="w-24 h-24 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center mx-auto mb-6">
                      <ImageIcon className="w-10 h-10 text-white/20" />
                   </div>
                   <p className="text-lg font-medium text-gray-400">{t('generate.result.empty')}</p>
                   <p className="text-sm text-gray-500">{t('generate.cta.error')}</p>
                </div>
              )}

              {/* Decorative backgrounds for empty state */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ec4899]/5 blur-[120px] -mr-64 -mt-64 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[120px] -ml-64 -mb-64 pointer-events-none" />
          </div>
      </div>
    </div>
  )
}



export default function GeneratePage() {
  const { t } = useLanguage()
  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-[1440px] mx-auto space-y-12">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ec4899]/10 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-white mb-2 relative z-10">
          {t('generate.title')}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">{t('generate.subtitle')}</p>
      </div>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-[#ec4899]" /></div>}>
        <GenerateInterface />
      </Suspense>
    </div>
  )
}
