import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardContent } from './dashboard-content'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: models }, { data: creditsData }] = await Promise.all([
    supabase.from('models').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('user_credits').select('credits').eq('user_id', user.id).single(),
  ])

  return <DashboardContent models={models} user={user} credits={creditsData?.credits ?? 0} />
}
