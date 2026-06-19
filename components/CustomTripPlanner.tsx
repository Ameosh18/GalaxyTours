'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Shield, Sparkles, Navigation } from 'lucide-react'
import { WHATSAPP_NUMBER, TRUST_SIGNALS } from '@/lib/data'

const ROADMAP_STOPS = [
  { label: 'Your Location', sublabel: 'Starting point', active: true },
  { label: 'Haridwar', sublabel: 'Ganga Aarti & temples', active: false },
  { label: 'Rishikesh', sublabel: 'Adventure & yoga', active: false },
  { label: 'Mussoorie', sublabel: 'Scenic hill station', active: false },
  { label: 'Custom Destination', sublabel: 'You decide!', active: true },
]

export default function CustomTripPlanner() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hi Galaxy Travels, I want to plan a custom multi-stop trip through Uttarakhand. Can you help me with an itinerary and pricing?'
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="custom-trip" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Navigation size={16} className="text-galaxy-green" />
              <span className="text-galaxy-green text-xs font-semibold tracking-[0.25em] uppercase">
                Custom Trips
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-galaxy-text mb-4">
              Design Your Own{' '}
              <span className="text-gradient-green">Himalayan Journey</span>
            </h2>

            <p className="text-galaxy-muted text-base leading-relaxed mb-6">
              Don&apos;t see your destination? Tell us where you want to go and we&apos;ll
              craft a custom multi-stop itinerary tailored just for you — with a
              dedicated hill-expert driver throughout.
            </p>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {TRUST_SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-start gap-3 bg-galaxy-card/50 border border-galaxy-border rounded-xl p-3"
                >
                  <span className="text-xl mt-0.5">{signal.icon}</span>
                  <div>
                    <p className="text-galaxy-text text-xs font-semibold">{signal.label}</p>
                    <p className="text-galaxy-muted text-[11px] mt-0.5">{signal.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold text-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all"
            >
              <MessageCircle size={18} /> Plan My Custom Trip
            </button>
          </motion.div>

          {/* Right: Roadmap visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="glass rounded-3xl p-8 max-w-sm w-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-galaxy-green" />
                <span className="text-galaxy-text text-sm font-semibold">Sample Itinerary</span>
              </div>

              <div className="relative">
                {ROADMAP_STOPS.map((stop, index) => (
                  <motion.div
                    key={stop.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    {/* Dot + line */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        {/* Pulse ring */}
                        {stop.active && (
                          <div className="absolute inset-0 rounded-full bg-galaxy-green animate-pulse-ring" />
                        )}
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 z-10 relative ${
                            stop.active
                              ? 'bg-galaxy-green border-galaxy-green'
                              : 'bg-galaxy-card border-galaxy-green/50'
                          }`}
                        />
                      </div>
                      {index < ROADMAP_STOPS.length - 1 && (
                        <div className="w-px h-10 border-l-2 border-dashed border-galaxy-green/30 mt-1 mb-1" />
                      )}
                    </div>

                    {/* Stop info */}
                    <div className="pb-6">
                      <p
                        className={`text-sm font-semibold ${
                          stop.active ? 'text-galaxy-green' : 'text-galaxy-text'
                        }`}
                      >
                        {stop.label}
                      </p>
                      <p className="text-galaxy-muted text-xs mt-0.5">{stop.sublabel}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-2 pt-4 border-t border-galaxy-border">
                <div className="flex items-center gap-2 text-xs text-galaxy-muted">
                  <Shield size={12} className="text-galaxy-green" />
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
