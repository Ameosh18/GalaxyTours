'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    city: 'Delhi',
    destination: 'Mussoorie',
    date: 'March 2026',
    message: 'Asif bhai was amazing! Picked us up on time, knew all the hill roads perfectly. Will book again for our Kedarnath trip. Highly recommended 🙏',
  },
  {
    name: 'Rahul M.',
    city: 'Noida',
    destination: 'Rishikesh',
    date: 'January 2026',
    message: 'Best cab experience in Dehradun. Comfortable Innova, very safe driver, and Asif was available on call throughout. Price was exactly as quoted.',
  },
  {
    name: 'Sneha K.',
    city: 'Gurugram',
    destination: 'Chopta',
    date: 'February 2026',
    message: 'We did a custom 3-day Himalayan trip with Galaxy Travels. Asif suggested the best route for the season. Absolutely fantastic service! 🏔️',
  },
]

export default function SocialProof() {
  const reduced = useReducedMotion()
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-brand-light mb-3">Traveller Reviews</p>
          <h2 className="font-display font-bold text-ink-dark text-[1.9rem] md:text-[2.4rem]">What Travellers Say</h2>
        </motion.div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[80vw] md:w-auto rounded-2xl overflow-hidden shadow-card border border-surface-border"
            >
              {/* WhatsApp-style header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold">{t.name} · {t.city}</p>
                  <p className="text-white/60 text-[10px]">Trip to {t.destination}</p>
                </div>
              </div>
              {/* Message bubble */}
              <div className="bg-[#ECE5DD] px-4 py-4">
                <div className="bg-white rounded-xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[95%]">
                  <p className="text-ink-body text-[13.5px] leading-relaxed">{t.message}</p>
                  <p className="text-ink-muted text-[10px] text-right mt-2">{t.date} ✓✓</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
