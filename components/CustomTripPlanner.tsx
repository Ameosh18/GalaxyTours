'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Shield, Navigation, Sparkles } from 'lucide-react'
import { WHATSAPP_NUMBER, TRUST_SIGNALS } from '@/lib/data'

const STOPS = [
  { label: 'Your Location',      sub: 'Starting point',        active: true },
  { label: 'Haridwar',           sub: 'Ganga Aarti & temples', active: false },
  { label: 'Rishikesh',          sub: 'Adventure & yoga',      active: false },
  { label: 'Mussoorie',          sub: 'Scenic hill station',   active: false },
  { label: 'Custom Destination', sub: 'You decide!',           active: true },
]

export default function CustomTripPlanner() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hi Galaxy Travels, I want to plan a custom multi-stop trip through Uttarakhand. Can you help me with an itinerary and pricing?'
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="custom-trip" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-mid px-4 py-1.5 rounded-full text-xs font-semibold mb-5">
              <Navigation size={12} /> Custom Trips
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-dark mb-4">
              Design Your Own<br />
              <span className="text-gradient-green">Himalayan Journey</span>
            </h2>

            <p className="text-ink-muted text-[15px] leading-relaxed mb-7">
              Don&apos;t see your destination? Tell us where you want to go and
              we&apos;ll craft a custom multi-stop itinerary tailored just for
              you — with a dedicated hill-expert driver throughout.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {TRUST_SIGNALS.map((s) => (
                <div key={s.label} className="flex items-start gap-3 bg-surface-off border border-surface-border rounded-xl p-3.5">
                  <span className="text-xl mt-0.5">{s.icon}</span>
                  <div>
                    <p className="text-ink-dark text-[12px] font-semibold">{s.label}</p>
                    <p className="text-ink-muted text-[11px] mt-0.5 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold text-sm shadow-btn hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all"
            >
              <MessageCircle size={17} /> Plan My Custom Trip
            </button>
          </motion.div>

          {/* Right — roadmap */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-surface-off border border-surface-border rounded-3xl p-8 max-w-sm w-full shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={15} className="text-brand-mid" />
                <span className="text-ink-dark text-sm font-semibold">Sample Itinerary</span>
              </div>

              {STOPS.map((stop, i) => (
                <motion.div
                  key={stop.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {stop.active && (
                        <div className="absolute inset-0 rounded-full bg-brand-sage animate-pulse-ring" />
                      )}
                      <div
                        className={`w-4 h-4 rounded-full border-2 relative z-10 ${
                          stop.active
                            ? 'bg-brand-dark border-brand-dark'
                            : 'bg-white border-brand-sage'
                        }`}
                      />
                    </div>
                    {i < STOPS.length - 1 && (
                      <div className="w-px h-9 border-l-2 border-dashed border-brand-sage/40 my-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className={`text-[13px] font-semibold ${stop.active ? 'text-brand-dark' : 'text-ink-dark'}`}>
                      {stop.label}
                    </p>
                    <p className="text-ink-muted text-[11px] mt-0.5">{stop.sub}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-3 border-t border-surface-border">
                <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                  <Shield size={11} className="text-brand-mid shrink-0" />
                  Fully customizable · Any number of stops
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
