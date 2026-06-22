import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Galaxy Travels — Premium Cab Service for Uttarakhand',
  description:
    'Book reliable, comfortable cabs from Dehradun to Mussoorie, Rishikesh, Haridwar, Chopta and all Himalayan destinations. Hill-expert drivers. Sanitized cabs.',
  keywords: ['cab service Dehradun', 'taxi Mussoorie', 'cab Rishikesh', 'Uttarakhand cab'],
  authors: [{ name: 'Galaxy Travels' }],
  openGraph: {
    title: 'Galaxy Travels — Your Journey, Our Galaxy',
    description: 'Premium cab service for Himalayan destinations from Dehradun.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1B4332',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <body className="bg-surface-off text-ink-body font-sans min-h-screen antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
