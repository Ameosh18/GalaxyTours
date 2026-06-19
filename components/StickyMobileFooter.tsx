'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, PHONE_RAW } from '@/lib/data'

export default function StickyMobileFooter() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent('Hi Galaxy Travels, I want to book a cab. Can you help?')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white border-t border-surface-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`tel:${PHONE_RAW}`}
        className="flex-1 flex items-center justify-center gap-2 h-14 text-ink-body font-semibold text-sm border-r border-surface-border hover:bg-brand-50 active:bg-brand-100 transition-colors"
      >
        <Phone size={17} className="text-brand-mid" />
        Call Now
      </a>
      <button
        onClick={handleWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 h-14 text-ink-body font-semibold text-sm hover:bg-brand-50 active:bg-brand-100 transition-colors"
      >
        <MessageCircle size={17} className="text-[#25D366]" />
        WhatsApp Us
      </button>
    </footer>
  )
}
