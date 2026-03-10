'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, UploadCloud } from 'lucide-react'

export default function TrainPage() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      // Validate length and type
      if (selectedFiles.length < 10 || selectedFiles.length > 20) {
        toast.error('Please select between 10 and 20 photos.')
        return
      }
      
      const validTypes = ['image/jpeg', 'image/png']
      const invalidFiles = selectedFiles.filter(f => !validTypes.includes(f.type) || f.size > 10 * 1024 * 1024)
      if (invalidFiles.length > 0) {
        toast.error('Only JPG/PNG under 10MB are allowed.')
        return
      }

      setFiles(selectedFiles)
    }
  }

  async function handleUploadAndCheckout() {
    if (files.length === 0) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast.error('You must be logged in')
      router.push('/login')
      return;
    }

    // 1. Upload files to Supabase Storage
    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error } = await supabase.storage
        .from('user-training-images')
        .upload(filePath, file)

      if (error) {
        console.error('Error uploading:', error)
        throw new Error(`Upload Failed: ${error.message}`)
      }
      
      return filePath;
    })

    try {
      const uploadedPaths = await Promise.all(uploadPromises)
      
      // 2. Start Model Training via Backend API
      const res = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePaths: uploadedPaths })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start training model.')
      }

      toast.success('Photos uploaded successfully! Your model is now training.')
      router.push('/dashboard')

    } catch (err: any) {
      toast.error(err.message || 'An error occurred during upload.')
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Your AI</h1>
        <p className="text-gray-400">Teach the AI your facial features to generate stunning dating photos.</p>
      </div>

      <Card className="glass-card border-white/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C63FF] via-[#00E5FF] to-[#9D4EDD]"></div>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-white">Upload Selfies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:bg-[#6C63FF]/10 transition-colors relative group">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={loading}
            />
            <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
              <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                <UploadCloud className="h-12 w-12 text-[#00E5FF]" />
              </div>
              <div>
                <p className="font-semibold text-lg text-white">
                  {files.length > 0 ? `${files.length} photos ready` : 'Drag & drop your selfies here'}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Or click anywhere to browse your files
                </p>
              </div>
              <div className="text-xs font-medium text-[#F72585] bg-[#F72585]/10 px-3 py-1 rounded-full">
                Requires 10-20 photos • JPG/PNG • Max 10MB
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full h-14 text-lg bg-primary-gradient glow-effect border-0 text-white rounded-xl hover:opacity-90 font-semibold" 
            onClick={handleUploadAndCheckout} 
            disabled={files.length < 10 || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin text-white" />
                <span>Uploading & Training...</span>
              </>
            ) : (
              <span>Train My AI Model</span>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-sm text-gray-400 glass-card p-6 rounded-2xl">
        <h4 className="font-semibold text-white mb-3 text-base flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span> 
          Perfect Photo Guidelines
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="flex items-center gap-2"><span className="text-[#6C63FF]">✓</span> Different angles and lighting</li>
          <li className="flex items-center gap-2"><span className="text-[#6C63FF]">✓</span> Clear, unobstructed face</li>
          <li className="flex items-center gap-2"><span className="text-[#F72585]">✕</span> No sunglasses or heavy makeup</li>
          <li className="flex items-center gap-2"><span className="text-[#F72585]">✕</span> Only photos of yourself</li>
        </ul>
      </div>
    </div>
  )
}
