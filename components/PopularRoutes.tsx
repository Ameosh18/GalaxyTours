'use client'

import { motion } from 'framer-motion'
import RouteCard from './RouteCard'
import { ROUTES, type Route } from '@/lib/data'
import { MapPin } from 'lucide-react'

interface PopularRoutesProps {
  onBook: (route: Route) => void
}

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' } },
}

export default function PopularRoutes({ onBook }: PopularRoutesProps) {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-off">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-mid px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <MapPin size={12} /> Popular Routes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-dark mb-3">
            Top Himalayan Destinations
          </h2>
          <p className="text-ink-muted text-base max-w-md mx-auto">
            Hand-picked routes with experienced hill drivers
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {ROUTES.map((route) => (
            <motion.div key={route.id} variants={item}>
              <RouteCard route={route} onBook={onBook} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
