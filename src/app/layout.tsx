import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI for Boomers',
  description: "Honest notes on building with AI — experiments, agents, and lessons that actually work.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-white min-h-screen flex flex-col">
        <nav className="sticky top-0 z-30 bg-navy-dark border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif text-base text-white tracking-tight">AI for Boomers</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xs text-white/60 hover:text-white transition-colors">
                All learnings
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-navy-dark border-t border-white/10 py-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-serif text-sm text-white">AI for Boomers</span>
            <p className="text-xs text-white/40">
              Figuring it out one prompt at a time.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
