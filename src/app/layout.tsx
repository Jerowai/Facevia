import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'AI Headshots',
  description: 'Generate professional AI headshots',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
