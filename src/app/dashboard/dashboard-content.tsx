"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Upload, ImageIcon, ImagePlus, Loader2 } from 'lucide-react'
import { AutoRefresh } from '@/components/dashboard/auto-refresh'
import { motion } from "framer-motion";
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface Model {
  id: string;
  status: string;
  error_message?: string | null;
  created_at: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

export function DashboardContent({
  models,
  user
}: {
  models: Model[] | null,
  user: any
}) {
  const hasTrainingModels = models?.some(model => model.status === 'training')
  const trainingModelIds = models?.filter(m => m.status === 'training').map(m => m.id) || []

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 p-8 w-full max-w-6xl mx-auto space-y-8"
    >
      {hasTrainingModels && <AutoRefresh intervalMs={15000} trainingModelIds={trainingModelIds} />}

      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400">Manage your AI models and generate professional dating photos.</p>
      </motion.div>

      {/* ── Onboarding Stepper ──────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-5">Your Progress</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
            {[
              { step: 1, label: 'Upload Photos', sub: 'Train your AI model', done: models && models.length > 0, href: '/dashboard/train', icon: '📸' },
              { step: 2, label: 'AI Training', sub: 'Model learns your face', done: models?.some(m => m.status === 'ready'), href: '/dashboard', icon: '🤖' },
              { step: 3, label: 'Generate Photos', sub: 'Create dating photos', done: false, href: '/dashboard/generate', icon: '✨' },
            ].map((item, idx) => {
              const isActive = !item.done && (idx === 0 || (idx === 1 && models && models.length > 0) || (idx === 2 && models?.some(m => m.status === 'ready')));
              return (
                <div key={item.step} className="flex items-center flex-1 w-full sm:w-auto">
                  <a href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full sm:w-auto ${isActive ? 'bg-[#ec4899]/10 border border-[#ec4899]/30' : item.done ? 'opacity-60' : 'opacity-40'}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${item.done ? 'bg-emerald-500 text-white' : isActive ? 'bg-[#ec4899] text-white' : 'bg-white/10 text-gray-400'}`}>
                      {item.done ? '✓' : item.step}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${item.done ? 'text-emerald-400' : isActive ? 'text-white' : 'text-gray-500'}`}>{item.label}</p>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                  </a>
                  {idx < 2 && <div className="hidden sm:block w-8 h-px bg-white/10 mx-1 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {hasTrainingModels && (

        <motion.div variants={itemVariants}>
          <Card className="glass-card border-[#00E5FF]/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-[#6C63FF]/10 opacity-50"></div>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2 relative z-10">
              <Loader2 className="h-8 w-8 text-[#00E5FF] animate-spin" />
              <div>
                <CardTitle className="text-2xl text-white">Your AI model is training</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="ml-12 relative z-10">
              <p className="text-gray-300">
                This usually takes a few minutes for our AI to learn your features.<br />
                <span className="text-[#00E5FF] font-medium">You can close this page and come back later.</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl h-full">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <Card className="relative glass-card h-full flex flex-col justify-between group transition-all duration-300">
              <div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-200">Train AI Model</CardTitle>
                  <div className="p-2 bg-white/5 rounded-full"><Upload className="h-5 w-5 text-[#6C63FF]" /></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mt-2">
                    Upload 10-20 everyday selfies so the AI can learn your exact facial structure and angles.
                  </p>
                </CardContent>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Button asChild className="w-full bg-primary-gradient glow-effect border-0 text-white hover:opacity-90" size="lg">
                  <Link href="/dashboard/train">Create New Model</Link>
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl h-full">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <Card className="relative glass-card h-full flex flex-col justify-between group transition-all duration-300">
              <div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-200">Generate Photos</CardTitle>
                  <div className="p-2 bg-white/5 rounded-full"><ImagePlus className="h-5 w-5 text-[#00E5FF]" /></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mt-2">
                    Use your custom AI model to generate irresistible dating photos in any setting or style.
                  </p>
                </CardContent>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Button asChild className="w-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10" size="lg" disabled={!models || models.length === 0}>
                  <Link href="/dashboard/generate">Generate Now</Link>
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative rounded-2xl h-full">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <Card className="relative glass-card h-full flex flex-col justify-between group transition-all duration-300">
              <div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-200">My Gallery</CardTitle>
                  <div className="p-2 bg-white/5 rounded-full"><ImageIcon className="h-5 w-5 text-[#F72585]" /></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mt-2">
                    View, download, and manage your previously generated professional dating lifestyle shots.
                  </p>
                </CardContent>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Button asChild variant="outline" className="w-full bg-transparent border-white/10 text-white hover:bg-white/5" size="lg">
                  <Link href="/dashboard/gallery">View Gallery</Link>
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold text-white">Your Models</h2>
        {(!models || models.length === 0) ? (
          <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 backdrop-blur-sm p-12 text-center text-gray-400 flex flex-col justify-center items-center">
            <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-gray-500" />
            </div>
            <p className="text-lg">You don't have any trained models yet.</p>
            <p className="text-sm mb-6">Click "Create New Model" above to start your journey.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {models.map((model) => (
              <Card key={model.id} className="p-6 glass-card flex items-center justify-between hover:border-white/20 transition-colors">
                <div className="flex-1">
                  <p className="font-bold text-lg text-white mb-1">Model {model.id.slice(0, 8).toUpperCase()}</p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      {model.status === 'training' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${model.status === 'ready' ? 'bg-[#00E5FF]' : model.status === 'failed' ? 'bg-[#F72585]' : 'bg-[#6C63FF]'}`}></span>
                    </span>
                    <p className="text-sm text-gray-400 capitalize">{model.status}</p>
                  </div>
                  {model.status === 'failed' && model.error_message && (
                    <p className="text-xs text-[#F72585] mt-2 bg-[#F72585]/10 p-2 rounded-md truncate" title={model.error_message}>
                      {model.error_message}
                    </p>
                  )}
                </div>
                {model.status === 'ready' && (
                  <Button size="sm" className="bg-primary-gradient glow-effect border-0 text-white rounded-full px-6" asChild>
                    <Link href={`/dashboard/generate?modelId=${model.id}`}>Generate Images</Link>
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
