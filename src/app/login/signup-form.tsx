'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

function getPasswordStrength(password: string): {
  score: number;    // 0-4
  label: string;
  color: string;
  tips: string[];
} {
  let score = 0
  const tips: string[] = []

  if (password.length === 0) return { score: 0, label: '', color: 'bg-transparent', tips: [] }

  if (password.length >= 8) score++; else tips.push('At least 8 characters')
  if (/[A-Z]/.test(password)) score++; else tips.push('Include an uppercase letter')
  if (/[0-9]/.test(password)) score++; else tips.push('Include a number')
  if (/[^A-Za-z0-9]/.test(password)) score++; else tips.push('Include a symbol (!, @, #…)')

  const levels = [
    { label: 'Too short', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-400' },
    { label: 'Good', color: 'bg-blue-400' },
    { label: 'Strong', color: 'bg-emerald-400' },
  ]

  return { score, ...levels[score], tips }
}

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const strength = getPasswordStrength(password)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (strength.score < 2) {
      toast.error('Please choose a stronger password.')
      return
    }
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Check your email for the confirmation link!')
    setEmail('')
    setPassword('')
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Google OAuth */}
      <button
        type="button"
        onClick={async () => {
          const supabase = createClient()
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${location.origin}/auth/callback` }
          })
        }}
        className="w-full h-12 flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors border border-white/10 shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-500 font-medium">or sign up with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300" htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full h-12 bg-white/5 border border-white/15 rounded-xl px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ec4899]/60 focus:border-[#ec4899]/60 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300" htmlFor="signup-password">Password</label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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

          {/* Password Strength Bar */}
          {password.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex gap-1.5 h-1.5">
                {[1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`flex-1 rounded-full transition-all duration-300 ${strength.score >= level ? strength.color : 'bg-white/10'
                      }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${strength.score <= 1 ? 'text-orange-400' :
                  strength.score === 2 ? 'text-yellow-400' :
                    strength.score === 3 ? 'text-blue-400' : 'text-emerald-400'
                  }`}>
                  {strength.label}
                </span>
                {strength.score === 4 && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Great password!
                  </span>
                )}
              </div>
              {/* Tips */}
              {strength.tips.length > 0 && (
                <ul className="space-y-1">
                  {strength.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#ec4899] to-[#be185d] text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)] disabled:opacity-60 mt-2"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</> : '✨ Create My Account'}
        </button>

        <p className="text-center text-xs text-gray-500">
          By signing up you agree to our{' '}
          <a href="/terms" className="text-[#ec4899] hover:underline">Terms</a> and{' '}
          <a href="/privacy-policy" className="text-[#ec4899] hover:underline">Privacy Policy</a>
        </p>
      </form>
    </div>
  )
}

