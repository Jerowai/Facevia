'use client'

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { useSearchParams } from "next/navigation"

function LoginPageContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const defaultTab = tab === 'signup' ? 'signup' : 'login'
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090b14]">
      {/* Full-page background: couple on a date */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px) brightness(0.25)',
          transform: 'scale(1.05)', // prevent blur edge bleed
        }}
      />
      {/* Soft gradient overlay to draw attention to center */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#090b14]/60 via-transparent to-[#090b14]/80" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-black text-3xl bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] bg-clip-text text-transparent tracking-tighter transition-opacity hover:opacity-80">
              FACEVIA
            </span>
          </Link>
          <p className="text-gray-400 text-sm mt-1">{t('footer.desc')}</p>
        </div>

        {/* Glassmorphism card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 rounded-2xl p-1 border border-white/10">
              <TabsTrigger
                value="login"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ec4899] data-[state=active]:to-[#be185d] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-semibold text-gray-400"
              >
                {t('auth.tabLogin')}
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ec4899] data-[state=active]:to-[#be185d] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-semibold text-gray-400"
              >
                {t('auth.tabSignup')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Suspense fallback={null}>
                <LoginForm />
              </Suspense>
            </TabsContent>

            <TabsContent value="signup">
              <Suspense fallback={null}>
                <SignupForm />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trust line */}
        <p className="text-center text-xs text-gray-500 mt-6">
          🔒 Secure authentication powered by Supabase
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090b14]" />}>
      <LoginPageContent />
    </Suspense>
  )
}
