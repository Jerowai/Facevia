'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Wand2, ImageIcon, Coins } from 'lucide-react'
import { PHOTO_PRESETS } from '@/lib/constants/presets'
import { motion } from 'framer-motion'

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
    if (!modelId) { toast.error('No trained model found. Please upload photos first.'); return }
    if (!selectedPreset && !customPrompt.trim()) { toast.error('Please select a style preset or enter a custom prompt.'); return }
    if (credits !== null && credits < 1) { toast.error('No credits remaining. Please purchase a plan.'); return }

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
      toast.success('Photo generated!')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8">
      {/* Left: Controls */}
      <div className="space-y-6">

        {/* Credits Badge */}
        <div className="flex items-center gap-2 text-sm">
          <Coins className="h-4 w-4 text-[#F72585]" />
          {credits === null
            ? <span className="text-gray-400">Loading credits...</span>
            : <span className="text-white font-medium">{credits} credits remaining</span>
          }
          {credits !== null && credits < 5 && (
            <a href="/pricing" className="ml-2 px-3 py-1 text-xs rounded-full bg-[#F72585]/10 text-[#F72585] border border-[#F72585]/20 hover:bg-[#F72585]/20 transition-colors font-medium">
              Buy More →
            </a>
          )}
        </div>

        {/* Model Selector */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white">AI Model</CardTitle>
            <CardDescription className="text-gray-400 text-xs">Select your trained face model</CardDescription>
          </CardHeader>
          <CardContent>
            {models.length === 0 ? (
              <div className="text-sm text-[#F72585] bg-[#F72585]/10 p-4 rounded-xl border border-[#F72585]/20">
                No trained model yet. <a href="/dashboard/train" className="underline font-medium">Upload selfies to get started →</a>
              </div>
            ) : (
              <select
                value={modelId}
                onChange={e => setModelId(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white focus:ring-2 focus:ring-[#00E5FF] outline-none transition-all"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id} className="bg-[#0F172A]">
                    Model {m.id.substring(0, 8).toUpperCase()} — Ready ✓
                  </option>
                ))}
              </select>
            )}
          </CardContent>
        </Card>

        {/* Style Presets */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white">Choose a Style</CardTitle>
            <CardDescription className="text-gray-400 text-xs">Pick a preset or write a custom prompt below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PHOTO_PRESETS.map((preset) => (
                <motion.button
                  key={preset.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setSelectedPreset(preset.id); setCustomPrompt('') }}
                  className={`relative group rounded-xl overflow-hidden border-2 transition-all ${selectedPreset === preset.id
                      ? 'border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <div className="aspect-square relative">
                    <img src={preset.image} alt={preset.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors ${selectedPreset === preset.id ? 'bg-[#00E5FF]/20' : 'bg-black/30 group-hover:bg-black/10'}`} />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="text-xs font-medium text-white">{preset.icon} {preset.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Prompt */}
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white">Custom Prompt (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => { setCustomPrompt(e.target.value); setSelectedPreset(null) }}
              className="flex w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-gray-500 resize-none"
              placeholder="Describe your ideal photo scenario..."
            />
          </CardContent>
        </Card>

        <Button
          onClick={handleGenerate}
          className="w-full h-14 text-lg bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] border-0 text-white rounded-xl hover:opacity-90 font-semibold"
          disabled={generating || models.length === 0}
        >
          {generating ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Magic...</>
          ) : (
            <><Wand2 className="mr-2 h-5 w-5" /> Generate Photo</>
          )}
        </Button>
      </div>

      {/* Right: Result */}
      <Card className="min-h-[500px] flex flex-col glass-card border-white/10 overflow-hidden sticky top-8 self-start">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white">Generated Photo</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-4">
          {generating ? (
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] rounded-2xl bg-white/5 border border-white/10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-[#00E5FF] blur-xl opacity-20 rounded-full" />
                <Wand2 className="h-12 w-12 text-[#00E5FF] relative z-10 animate-bounce" />
              </div>
              <p className="text-[#00E5FF] font-medium">AI is working its magic...</p>
              <p className="text-gray-500 text-xs mt-1">This takes 30-60 seconds</p>
            </div>
          ) : resultImage ? (
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(108,99,255,0.3)]">
              <img src={resultImage} alt="Generated Photo" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3">
                <a
                  href={resultImage}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm text-white text-xs rounded-xl hover:bg-black/80 transition-colors border border-white/20"
                >
                  ↓ Download
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 text-center px-4">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <ImageIcon className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-400 font-medium">Your photo will appear here</p>
              <p className="text-gray-500 text-sm mt-1">Select a style and click Generate</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <div className="flex-1 p-6 md:p-8 w-full max-w-6xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Photos</h1>
        <p className="text-gray-400">Choose a dating style and generate stunning AI photos.</p>
      </div>
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-[#00E5FF]" /></div>}>
        <GenerateInterface />
      </Suspense>
    </div>
  )
}
