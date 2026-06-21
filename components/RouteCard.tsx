'use client'

import { motion } from 'framer-motion'
import { Clock, Route } from 'lucide-react'
import { type Route as RouteType } from '@/lib/data'
import { WHATSAPP_NUMBER } from '@/lib/data'

const GRADIENTS: Record<string, string> = {
  mussoorie: 'from-emerald-700 via-teal-800 to-slate-900',
  rishikesh: 'from-cyan-700 via-blue-800 to-slate-900',
  haridwar:  'from-orange-700 via-red-800 to-slate-900',
  chopta:    'from-violet-700 via-indigo-800 to-slate-900',
}

export default function RouteCard({ route }: { route: RouteType }) {
  const handleBook = () => {
    const msg = encodeURIComponent(`Hi Asif, I want to book a cab to ${route.name}.\nPickup: Dehradun\nDrop: ${route.name}\nStarting price: ₹${route.startingPrice.toLocaleString('en-IN')}`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const gradient = GRADIENTS[route.id] ?? 'from-gray-700 to-slate-900'

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl overflow-hidden h-72 flex flex-col justify-between cursor-pointer`}
      onClick={handleBook}
    >
      {/* Background image with gradient fallback */}
      {route.image ? (
        <img
          src={route.image}
          alt={route.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}
      {/* Darkening overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />

      {/* Highlight pill */}
      <div className="relative m-4">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {route.highlight}
        </span>
      </div>

      {/* Bottom content */}
      <div className="relative bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
        <h3 className="font-display font-bold text-white text-[1.5rem] leading-tight">{route.name}</h3>

        <div className="flex items-center gap-4 mt-1.5 mb-3">
          <span className="flex items-center gap-1 text-white/60 text-[11px]">
            <Clock size={11} /> {route.travelTime}
          </span>
          <span className="flex items-center gap-1 text-white/60 text-[11px]">
            <Route size={11} /> {route.distance}
          </span>
        </div>

        {/* Asif's tip */}
        <p className="text-white/50 text-[11px] italic mb-3">&ldquo;{route.asifTip}&rdquo; — Asif</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">From</p>
            <p className="text-white font-bold text-[1.1rem]">₹{route.startingPrice.toLocaleString('en-IN')}</p>
          </div>
          <span className="text-[12px] font-semibold text-white bg-white/15 hover:bg-white/25 transition-all px-4 py-1.5 rounded-full">
            Book this route →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
