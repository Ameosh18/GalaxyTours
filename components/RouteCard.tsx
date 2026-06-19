'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import type { Route } from '@/lib/data'

interface RouteCardProps {
  route: Route
  onBook: (route: Route) => void
}

const GRADIENT_PLACEHOLDERS: Record<string, string> = {
  mussoorie: 'from-green-900/80 via-emerald-800/60 to-teal-900/80',
  rishikesh:  'from-blue-900/80 via-cyan-800/60 to-teal-900/80',
  haridwar:   'from-orange-900/80 via-amber-800/60 to-yellow-900/80',
  chopta:     'from-purple-900/80 via-indigo-800/60 to-blue-900/80',
}

export default function RouteCard({ route, onBook }: RouteCardProps) {
  const gradient = GRADIENT_PLACEHOLDERS[route.id] || 'from-galaxy-card/80 to-galaxy-bg/80'

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={() => onBook(route)}
      className="relative overflow-hidden rounded-2xl h-72 cursor-pointer group border border-galaxy-border hover:border-galaxy-green/40 hover:shadow-green-glow transition-all duration-300"
    >
      {/* Placeholder gradient background (replace with next/image when real photos available) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      {/* Destination name as large watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none">
        <span className="font-display font-bold text-6xl text-white">{route.name[0]}</span>
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Highlight badge */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-semibold bg-galaxy-green/20 border border-galaxy-green/30 text-galaxy-green px-2 py-0.5 rounded-full backdrop-blur-sm">
          {route.highlight}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display font-bold text-xl text-white mb-2">{route.name}</h3>

        <div className="flex items-center gap-3 text-xs text-white/70 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {route.travelTime}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {route.distance}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/60 text-xs">Starting from</span>
            <p className="text-galaxy-green font-bold text-base">
              ₹{route.startingPrice.toLocaleString('en-IN')}
            </p>
          </div>

          <motion.div
            whileHover={{ x: 4 }}
            className="rounded-full bg-galaxy-forest/80 border border-galaxy-green/30 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowRight size={14} className="text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
