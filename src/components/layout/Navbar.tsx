import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const NAV_LINKS = [
  { href: '#comparison', label: 'Photos' },
  { href: '#how-it-works', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Reviews' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0f1e]/90 backdrop-blur-xl h-[72px] flex items-center px-6 md:px-12">
      {/* Logo */}
      <Link href="/" className="font-black text-2xl tracking-tighter text-white flex-shrink-0">
        <span className="text-gradient">FACEVIA</span>
      </Link>

      {/* Center Nav Links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-base font-semibold text-white/80 hover:text-white transition-colors duration-200 relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ec4899] group-hover:w-full transition-all duration-300 rounded-full" />
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-6">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-base font-semibold text-white/80 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden md:block text-base font-semibold text-white/80 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login?tab=signup"
              className="inline-flex items-center gap-2 text-sm font-bold bg-[#ec4899] hover:bg-[#db2777] text-white px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            >
              GET MY AI PHOTOS
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
