'use client'

import { motion } from 'framer-motion'
import { Car, CalendarDays } from 'lucide-react'
import BookingBar from './BookingBar'

interface HeroProps {
  onSearch: (details: { pickup: string; dropoff: string; date: string; cabType: string }) => void
}

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function Hero({ onSearch }: HeroProps) {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const basePath = process.env.NODE_ENV === 'production' ? '/GalaxyTours' : ''

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url('${basePath}/images/galaxy_hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Text content — upper portion */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32">
        <div className="max-w-[580px]">
          <motion.p
            {...fadeUp(0)}
            className="text-brand-dark text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase mb-4"
          >
            Dehradun to Every Destination
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display font-bold text-ink-dark text-[3rem] sm:text-[4rem] lg:text-[4.75rem] leading-[1.08] mb-5"
          >
            Your Journey,<br />Our Galaxy
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-ink-body text-[15px] sm:text-[16px] leading-relaxed mb-9 max-w-[420px]"
          >
            Reliable cab service in Dehradun for outstation trips,
            local travel, and unforgettable experiences.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-2 rounded-full bg-brand-dark text-white px-7 py-3.5 text-[14px] font-semibold shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all"
            >
              <Car size={16} /> Book a Ride
            </button>
            <button
              onClick={() => scrollTo('#pricing')}
              className="flex items-center gap-2 rounded-full border-2 border-brand-dark text-brand-dark bg-white/60 backdrop-blur-sm px-7 py-3.5 text-[14px] font-semibold hover:bg-white/80 transition-all"
            >
              <CalendarDays size={15} /> Request Pricing
            </button>
          </motion.div>
        </div>
      </div>

      {/* Booking bar — pinned to bottom of hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.45 }}
        className="w-full pb-8 pt-4"
      >
        <BookingBar onSearch={onSearch} />
      </motion.div>
    </section>
  )
}
