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
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-galaxy-card/95 backdrop-blur-md border-t border-galaxy-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`tel:${PHONE_RAW}`}
        className="flex-1 flex items-center justify-center gap-2 h-14 text-galaxy-text font-semibold text-sm border-r border-galaxy-border hover:bg-galaxy-green/10 transition-colors active:bg-galaxy-green/20"
      >
        <Phone size={18} className="text-galaxy-green" />
        Call Now
      </a>

      <button
        onClick={handleWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 h-14 text-galaxy-text font-semibold text-sm hover:bg-galaxy-green/10 transition-colors active:bg-galaxy-green/20"
      >
        <MessageCircle size={18} className="text-[#25D366]" />
        WhatsApp Us
      </button>
    </footer>
  )
}
