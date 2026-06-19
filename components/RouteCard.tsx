'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import type { Route } from '@/lib/data'

interface RouteCardProps {
  route: Route
  onBook: (route: Route) => void
}

const BG: Record<string, string> = {
  mussoorie: 'from-emerald-800 via-green-700   to-teal-800',
  rishikesh:  'from-blue-800   via-cyan-700     to-teal-700',
  haridwar:   'from-orange-800 via-amber-700    to-yellow-800',
  chopta:     'from-violet-800 via-indigo-700   to-blue-800',
}

export default function RouteCard({ route, onBook }: RouteCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={() => onBook(route)}
      className="relative overflow-hidden rounded-2xl h-72 cursor-pointer group shadow-card hover:shadow-card-hover transition-shadow"
    >
      {/* Gradient placeholder (swap for next/image once photos available) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${BG[route.id] ?? 'from-green-800 to-teal-800'}`} />

      {/* Initial watermark letter */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none">
        <span className="font-display font-black text-[8rem] text-white">{route.name[0]}</span>
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Highlight pill */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-sm border border-white/30 text-white px-2.5 py-0.5 rounded-full">
          {route.highlight}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display font-bold text-xl text-white mb-1.5">{route.name}</h3>
        <div className="flex items-center gap-3 text-[11px] text-white/70 mb-3">
          <span className="flex items-center gap-1"><Clock size={11} /> {route.travelTime}</span>
          <span className="flex items-center gap-1"><MapPin size={11} /> {route.distance}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/60 text-[10px]">Starting from</span>
            <p className="text-white font-bold text-base">₹{route.startingPrice.toLocaleString('en-IN')}</p>
          </div>
          <motion.div
            whileHover={{ x: 4 }}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowRight size={14} className="text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
