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
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function PopularRoutes({ onBook }: PopularRoutesProps) {
  return (
    <section id="services" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={16} className="text-galaxy-green" />
            <span className="text-galaxy-green text-xs font-semibold tracking-[0.25em] uppercase">
              Popular Routes
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-galaxy-text mb-3">
            Top Himalayan Destinations
          </h2>
          <p className="text-galaxy-muted text-base max-w-lg mx-auto">
            Hand-picked routes through Uttarakhand with experienced hill drivers
          </p>
        </motion.div>

        {/* Route Cards Grid */}
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
