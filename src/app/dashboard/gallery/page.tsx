import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { redirect } from 'next/navigation'

export default async function GalleryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all generated images for the user
  const { data: images } = await supabase
    .from('images')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex-1 p-8 w-full max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Gallery</h1>
        <p className="text-gray-400">Your AI-generated dating photos, ready to download and use.</p>
      </div>

      {(!images || images.length === 0) ? (
        <div className="rounded-3xl border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-sm py-24 text-center text-gray-400 flex flex-col justify-center items-center">
          <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-300 mb-2">No photos yet</p>
          <p className="text-sm">Generate your first AI dating photo to see it appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden group glass-card border-white/10 rounded-2xl relative">
              <div className="relative aspect-[3/4]">
                <img
                  src={image.image_url}
                  alt={image.prompt || "Generated Dating Photo"}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-xs line-clamp-2 mb-4 font-medium">
                    {image.prompt}
                  </p>
                  <a
                    href={image.image_url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-primary-gradient glow-effect border-0 text-center text-sm font-semibold py-2.5 rounded-xl text-white"
                  >
                    ↓ Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
