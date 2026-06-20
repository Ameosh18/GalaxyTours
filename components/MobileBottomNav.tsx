'use client'

import { useEffect, useState } from 'react'
import { Home, IndianRupee, Car, Phone } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/data'

interface MobileBottomNavProps {
  onBook: () => void
}

const TABS = [
  { id: 'home',    label: 'Home',    icon: Home,          href: '#home' },
  { id: 'pricing', label: 'Pricing', icon: IndianRupee,   href: '#pricing' },
  { id: 'contact', label: 'Contact', icon: Phone,          href: '#contact' },
]

export default function MobileBottomNav({ onBook }: MobileBottomNavProps) {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (href: string, id: string) => {
    setActive(id)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="flex items-end gap-1 bg-white rounded-full border border-surface-border px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)]">

        {/* Home */}
        <TabButton
          tab={TABS[0]}
          active={active === 'home'}
          onClick={() => scrollTo('#home', 'home')}
        />

        {/* Pricing */}
        <TabButton
          tab={TABS[1]}
          active={active === 'pricing'}
          onClick={() => scrollTo('#pricing', 'pricing')}
        />

        {/* Book — elevated center CTA */}
        <button
          onClick={onBook}
          className="relative -mt-6 mx-2 flex flex-col items-center"
          aria-label="Book a cab"
        >
          <span className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center ring-4 ring-white shadow-btn">
            <Car size={22} className="text-white" />
          </span>
          <span className="text-[9px] font-semibold text-brand-dark mt-1 tracking-wide">Book</span>
        </button>

        {/* Contact — WhatsApp */}
        <TabButton
          tab={TABS[2]}
          active={active === 'contact'}
          onClick={() => scrollTo('#contact', 'contact')}
        />

        {/* WhatsApp quick-dial */}
        <button
          onClick={() => {
            const msg = encodeURIComponent('Hi Galaxy Travels, I want to book a cab.')
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
          }}
          className="flex flex-col items-center gap-1 px-3 py-1 min-w-[52px]"
          aria-label="WhatsApp"
        >
          {/* WhatsApp icon SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-[9px] font-semibold text-[#25D366] tracking-wide">WhatsApp</span>
        </button>
      </nav>
    </div>
  )
}

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: typeof TABS[0]
  active: boolean
  onClick: () => void
}) {
  const Icon = tab.icon
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-3 py-1 min-w-[52px] transition-colors"
    >
      <Icon
        size={20}
        className={active ? 'text-brand-dark' : 'text-ink-muted'}
        strokeWidth={active ? 2.2 : 1.8}
      />
      <span className={`text-[9px] font-semibold tracking-wide ${active ? 'text-brand-dark' : 'text-ink-muted'}`}>
        {tab.label}
      </span>
    </button>
  )
}
