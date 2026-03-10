'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Wand2 } from 'lucide-react'
import Image from 'next/image'

function GenerateInterface() {
  const [prompt, setPrompt] = useState('Candid lifestyle shot at a vibrant outdoor cafe, natural sunlight, highly detailed, 8k resolution, cinematic lighting')
  const [modelId, setModelId] = useState<string>('')
  const [models, setModels] = useState<any[]>([])
  const [generating, setGenerating] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const supabase = createClient()

  useEffect(() => {
    if (success) {
      toast.success('Payment successful! Your model is now training.')
    }

    async function fetchModels() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('models')
          .select('id, status')
          .eq('user_id', user.id)
          .eq('status', 'ready')
          .order('created_at', { ascending: false })
        
        if (data && data.length > 0) {
          setModels(data)
          const urlModelId = searchParams.get('modelId')
          setModelId(urlModelId || data[0].id)
        }
      }
    }
    fetchModels()
  }, [success, searchParams, supabase])

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!modelId) {
      toast.error('Please select a trained model first.')
      return
    }

    setGenerating(true)
    setResultImage(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, modelId })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to generate image')

      setResultImage(data.url)
      toast.success('Image generated successfully!')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const PRESETS = [
    { name: 'Tinder Rooftop', icon: '🌆', prompt: 'Confident portrait on a city rooftop at twilight, city lights in bokeh background, wearing leather jacket, sharp focus, 8k, photorealistic, cinematic lighting' },
    { name: 'Beach Sunset', icon: '🌅', prompt: 'Golden hour portrait at the beach, looking away from camera, soft warm sunset lighting, casual stylish summer clothes, cinematic, highly detailed' },
    { name: 'Coffee Shop Candid', icon: '☕', prompt: 'Candid lifestyle shot sitting at a vibrant modern coffee shop, holding a mug, natural sunlight hitting the face, highly detailed, 8k resolution, shallow depth of field' },
    { name: 'Gym Lifestyle', icon: '🏋️', prompt: 'Fitness lifestyle portrait in a modern gym, slight sweat, gym wear, dramatic athletic lighting, high contrast, highly detailed' },
    { name: 'Travel Street', icon: '✈️', prompt: 'Candid walking shot on a busy European street, historic architecture in background, casual stylish outfit, natural daylight, photorealistic, 8k' },
    { name: 'Luxury Restaurant', icon: '🥂', prompt: 'Sophisticated portrait at a luxury restaurant, dim warm lighting, wearing a suit/elegant dress, wine glass on table, high-end aesthetic, 8k' },
  ];

  return (
      <div className="grid md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px] gap-8">
        <Card className="h-fit glass-card border-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-[#6C63FF]"></div>
          <CardHeader>
            <CardTitle className="text-xl text-white">Design Your Photo</CardTitle>
            <CardDescription className="text-gray-400">
              Select a dating preset or write your own custom prompt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {models.length === 0 ? (
              <div className="text-sm text-[#F72585] bg-[#F72585]/10 p-4 rounded-xl border border-[#F72585]/20">
                You don't have any trained models yet. If you just uploaded photos, please wait a few moments for the AI to learn.
              </div>
            ) : (
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="model-select" className="text-gray-300">Select AI Model</Label>
                  <select 
                    id="model-select"
                    value={modelId} 
                    onChange={e => setModelId(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00E5FF] focus:border-[#00E5FF] outline-none transition-all"
                  >
                    {models.map(m => (
                      <option key={m.id} value={m.id} className="bg-[#0F172A] text-white">Model - {m.id.substring(0,8).toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-gray-300">Quick Presets</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(preset.prompt)}
                        className="text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-3 group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{preset.icon}</span>
                        <span className="text-sm text-gray-200 font-medium">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="prompt" className="text-gray-300">Custom Style Prompt</Label>
                  <textarea
                    id="prompt"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#6C63FF] focus:border-[#6C63FF] outline-none transition-all placeholder:text-gray-500"
                    placeholder="Describe your ideal dating scenario..."
                    required
                  />
                  <p className="text-xs text-gray-500">Tip: Mention lighting, expression, and environment for the best dating photos.</p>
                </div>

                <Button type="submit" className="w-full h-14 text-lg bg-primary-gradient glow-effect border-0 text-white rounded-xl hover:opacity-90 font-semibold mt-4" disabled={generating}>
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin text-white" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Generate Dating Photo
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card className="min-h-[500px] flex flex-col glass-card border-white/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 to-[#00E5FF]/5 opacity-50 z-0"></div>
          <CardHeader className="relative z-10 pb-4">
            <CardTitle className="text-xl text-white">Your Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6 relative z-10">
            {generating ? (
              <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] rounded-2xl bg-white/5 border border-white/10 animate-pulse">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00E5FF] blur-xl opacity-20 rounded-full animate-pulse"></div>
                  <Wand2 className="h-12 w-12 text-[#00E5FF] mb-4 relative z-10 animate-bounce" />
                </div>
                <p className="text-[#00E5FF] font-medium">AI is working its magic...</p>
              </div>
            ) : resultImage ? (
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(108,99,255,0.3)] group">
                <img 
                  src={resultImage} 
                  alt="Generated Dating Photo" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 text-center px-4">
                <div className="p-4 bg-white/5 rounded-full mb-4">
                  <ImageIcon className="h-8 w-8 text-gray-500" />
                </div>
                <p className="text-gray-400 font-medium text-lg">Your generated photo will appear here</p>
                <p className="text-gray-500 text-sm mt-1">Select a preset or type a prompt to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
  )
}

function ImageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

export default function GeneratePage() {
  return (
    <div className="flex-1 p-8 w-full max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Images</h1>
        <p className="text-gray-400">Transform your selfies into stunning dating photos that stand out.</p>
      </div>
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-[#00E5FF]" /></div>}>
        <GenerateInterface />
      </Suspense>
    </div>
  )
}
