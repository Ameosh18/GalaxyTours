'use client'

import { motion } from 'framer-motion'
import { Car, IndianRupee } from 'lucide-react'
import BookingBar from './BookingBar'

interface HeroProps {
  onSearch: (details: { pickup: string; dropoff: string; date: string; cabType: string }) => void
}

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 32 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: 'easeOut', delay },
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
        backgroundImage: `
          linear-gradient(105deg, rgba(5,20,12,0.62) 0%, rgba(8,28,18,0.38) 45%, rgba(8,28,18,0.12) 100%),
          url('${basePath}/images/hero.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* CSS mountain scene fallback (behind bg image, visible when jpg absent) */}
      <div className="absolute inset-0 -z-10" style={{
        background: `
          radial-gradient(ellipse 55% 40% at 18% 30%, rgba(255,180,50,0.55) 0%, transparent 70%),
          radial-gradient(ellipse 70% 30% at 50% 65%, rgba(200,230,210,0.35) 0%, transparent 60%),
          linear-gradient(175deg, #fde9b0 0%, #a8d8ea 20%, #6ab4d4 45%, #4a9960 60%, #2d6e45 72%, #1b4a30 82%, #0f2e1d 92%, #0a1f13 100%)
        `
      }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-10">

        {/* Hero text — left-aligned, max half-width on desktop */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.p {...fadeUp(0)} className="text-[#74C69D] text-[11px] sm:text-xs font-bold tracking-[0.32em] uppercase mb-4">
            Dehradun to Every Destination
          </motion.p>

          <motion.h1
            {...fadeUp(0.12)}
            className="font-display font-bold text-white text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] leading-[1.1] mb-5"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
          >
            Your Journey,<br />Our Galaxy
          </motion.h1>

          <motion.p {...fadeUp(0.22)} className="text-white/80 text-[15px] sm:text-base leading-relaxed mb-8 max-w-md">
            Reliable cab service in Dehradun for outstation trips,
            local travel, and unforgettable experiences.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => scrollTo('#home')}
              className="flex items-center gap-2 rounded-full bg-brand-dark text-white px-6 py-3 text-sm font-semibold shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all"
            >
              <Car size={16} /> Book a Ride
            </button>
            <button
              onClick={() => scrollTo('#pricing')}
              className="flex items-center gap-2 rounded-full bg-white/15 border border-white/40 text-white px-6 py-3 text-sm font-semibold backdrop-blur-sm hover:bg-white/25 transition-all"
            >
              <IndianRupee size={15} /> Request Pricing
            </button>
          </motion.div>

          {/* Trust chips */}
          <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-2">
            {['Hill-Expert Drivers', 'Sanitized Cabs', 'GPS Tracked', '24/7 Support'].map((b) => (
              <span
                key={b}
                className="text-[11px] font-medium text-white/80 bg-white/10 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
              >
                ✓ {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Booking bar — pinned near bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 md:mt-16"
        >
          <BookingBar onSearch={onSearch} />
        </motion.div>
      </div>
    </section>
  )
}
