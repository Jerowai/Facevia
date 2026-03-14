import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Menu } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: creditsData } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', user.id)
    .single()

  const credits = creditsData?.credits ?? 0

  return (
    <div className="min-h-screen bg-[#090b14] text-white">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block">
        <Sidebar credits={credits} />
      </div>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#090b14]/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
        <span className="font-black text-xl bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] bg-clip-text text-transparent tracking-tighter">
          FACEVIA
        </span>
        <button className="p-2 rounded-lg bg-white/5 text-gray-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="lg:pl-72 pt-16 lg:pt-0">
        <div className="min-h-screen">
          {children}
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ec4899]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#9D4EDD]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  )
}
