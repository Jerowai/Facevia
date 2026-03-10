'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff } from 'lucide-react'

// Animated panda SVG — eyes open or closed based on `typing` prop
function PandaSVG({ typing }: { typing: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      {/* Ear left */}
      <circle cx="22" cy="30" r="18" fill="#1a1a1a" />
      <circle cx="22" cy="30" r="10" fill="#333" />
      {/* Ear right */}
      <circle cx="98" cy="30" r="18" fill="#1a1a1a" />
      <circle cx="98" cy="30" r="10" fill="#333" />
      {/* Head */}
      <circle cx="60" cy="65" r="48" fill="white" />
      {/* Eye patches */}
      <ellipse cx="40" cy="55" rx="16" ry="14" fill="#1a1a1a" />
      <ellipse cx="80" cy="55" rx="16" ry="14" fill="#1a1a1a" />
      {/* Eyes — open vs closed */}
      {typing ? (
        <>
          {/* Eyes closed: curved lines */}
          <path d="M32 55 Q40 48 48 55" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M72 55 Q80 48 88 55" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Eyes open: circles */}
          <circle cx="40" cy="55" r="7" fill="white" />
          <circle cx="80" cy="55" r="7" fill="white" />
          <circle cx="42" cy="54" r="3.5" fill="#1a1a1a" />
          <circle cx="82" cy="54" r="3.5" fill="#1a1a1a" />
          {/* Shine */}
          <circle cx="44" cy="52" r="1.5" fill="white" />
          <circle cx="84" cy="52" r="1.5" fill="white" />
        </>
      )}
      {/* Nose */}
      <ellipse cx="60" cy="75" rx="9" ry="7" fill="#f0a8b0" />
      <ellipse cx="60" cy="75" rx="5" ry="3.5" fill="#e87d8f" />
      {/* Mouth */}
      <path d="M52 84 Q60 92 68 84" stroke="#e87d8f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [typing, setTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
    setTyping(true)
    if (typingTimer.current) clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => setTyping(false), 1200)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Welcome back!')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Panda */}
      <PandaSVG typing={typing} />
      <p className="text-gray-400 text-xs -mt-2">
        {typing ? '🙈 Not peeking...' : '👀 Watching you type...'}
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full h-12 bg-white/5 border border-white/15 rounded-xl px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ec4899]/60 focus:border-[#ec4899]/60 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300" htmlFor="login-password">Password</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full h-12 bg-white/5 border border-white/15 rounded-xl px-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ec4899]/60 focus:border-[#ec4899]/60 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#ec4899] to-[#be185d] text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)] disabled:opacity-60"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : 'Log In'}
        </button>
      </form>
    </div>
  )
}
