'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ROUTES, WHATSAPP_NUMBER } from '@/lib/data'
import RouteCard from './RouteCard'

export default function PopularRoutes() {
  const reduced = useReducedMotion()
  const handleCustom = () => {
    const msg = encodeURIComponent('Hi Asif, I need a custom trip. My destination: ')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="routes" className="py-16 md:py-20 bg-surface-off">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-brand-light mb-3">Where Asif Takes You</p>
          <h2 className="font-display font-bold text-ink-dark text-[1.9rem] md:text-[2.4rem]">Popular Routes</h2>
          <p className="text-ink-muted text-[15px] mt-2 max-w-md mx-auto">Every route hand-driven by Asif — with real local knowledge, not just GPS.</p>
        </motion.div>

        {/* 3-col desktop grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {ROUTES.map((route, i) => (
            <motion.div key={route.id}
              initial={{ opacity: 0, y: reduced ? 0 : 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <RouteCard route={route} />
            </motion.div>
          ))}

          {/* Custom trip card — on mobile appears inline, desktop inline too */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }}
            onClick={handleCustom}
            className="relative rounded-2xl border-2 border-dashed border-brand-light/40 h-72 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-brand-light hover:bg-brand-dark/5 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-brand-dark/10 flex items-center justify-center group-hover:bg-brand-dark/20 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div className="text-center px-6">
              <p className="font-display font-bold text-ink-dark text-[1.2rem]">Going somewhere else?</p>
              <p className="text-ink-muted text-[13px] mt-1">Kedarnath, Auli, Lansdowne, Nainital — Asif goes everywhere.</p>
            </div>
            <span className="text-[13px] font-semibold text-brand-dark border border-brand-dark/30 px-5 py-2 rounded-full group-hover:bg-brand-dark group-hover:text-white transition-all">
              Tell Asif →
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
