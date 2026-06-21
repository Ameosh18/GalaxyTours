import { PHONE_NUMBER, PHONE_RAW, WHATSAPP_NUMBER } from '@/lib/data'

export default function Footer() {
  const waMsg = encodeURIComponent('Hi Asif, I want to book a cab.')

  return (
    <footer className="bg-surface-off border-t border-surface-border py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-ink-muted">
        <span className="font-display font-bold text-ink-dark">Galaxy Travels</span>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={`tel:${PHONE_RAW}`} className="hover:text-ink-dark transition-colors">{PHONE_NUMBER}</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            className="text-[#25D366] hover:text-[#1DA851] transition-colors font-semibold">WhatsApp</a>
          <span>Dehradun, Uttarakhand</span>
        </div>

        <span>© Galaxy Travels 2026</span>
      </div>
    </footer>
  )
}
