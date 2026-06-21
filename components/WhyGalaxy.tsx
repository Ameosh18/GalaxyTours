'use client'

import { motion } from 'framer-motion'
import { UserCheck, Mountain, BadgeCheck, Sparkles } from 'lucide-react'

const POINTS = [
  {
    icon: UserCheck,
    title: 'You talk directly to Asif',
    desc: 'No call centre, no middleman. The owner picks up.',
  },
  {
    icon: Mountain,
    title: 'Hill-expert drivers',
    desc: 'Years of experience on Himalayan roads, every season.',
  },
  {
    icon: BadgeCheck,
    title: 'Transparent pricing',
    desc: 'What we quote is what you pay. No surprises.',
  },
  {
    icon: Sparkles,
    title: 'Sanitised, well-maintained cabs',
    desc: 'Deep cleaned before every trip.',
  },
]

export default function WhyGalaxy() {
  return (
    <section id="why" className="py-16 md:py-20 bg-surface-off">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-brand-light mb-3">Why Choose Us</p>
          <h2 className="font-display font-bold text-ink-dark text-[1.9rem] md:text-[2.4rem]">Why Galaxy Travels</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {POINTS.map((point, i) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-dark/10 flex items-center justify-center">
                  <Icon size={28} className="text-brand-light" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-bold text-ink-dark text-[15px] leading-snug">{point.title}</h3>
                <p className="text-ink-muted text-[13px] leading-relaxed">{point.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
