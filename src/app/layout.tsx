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
  title: 'AI Learnings — atsell.io',
  description: 'How atsell.io is building with AI — experiments, agents, and lessons from the field.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-white min-h-screen flex flex-col">
        <nav className="sticky top-0 z-30 bg-navy-dark border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif text-xl text-white tracking-tight">atsell</span>
              <span className="text-xs font-medium uppercase tracking-widest text-gold border border-gold/40 px-2 py-0.5 rounded-full">
                AI
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                All learnings
              </Link>
              <a
                href="https://atsell.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-navy-dark bg-gold hover:bg-gold-light transition-colors px-4 py-1.5 rounded-full"
              >
                atsell.io →
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-navy-dark border-t border-white/10 py-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-serif text-lg text-white">atsell AI Learnings</span>
            <p className="text-sm text-white/40">
              Building with AI in Singapore's ecommerce ecosystem.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
