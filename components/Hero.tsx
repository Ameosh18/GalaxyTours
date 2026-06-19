'use client'

import { motion } from 'framer-motion'
import { Car, IndianRupee } from 'lucide-react'
import BookingBar from './BookingBar'

interface HeroProps {
  onSearch: (details: { pickup: string; dropoff: string; date: string; cabType: string }) => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
}

export default function Hero({ onSearch }: HeroProps) {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background gradient (placeholder for real hero image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060c14] via-[#0d1826] to-[#0B101A] z-0" />

      {/* Radial glow accent */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 60% 40%, rgba(66,134,67,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* Hill silhouette SVG */}
      <div className="absolute bottom-0 left-0 w-full z-[2] pointer-events-none">
        <svg
          viewBox="0 0 1440 220"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
        >
          {/* Back ridge */}
          <path
            d="M0,220 L0,140 Q180,60 360,110 Q540,160 720,70 Q900,0 1080,90 Q1260,160 1440,100 L1440,220 Z"
            fill="#0d1520"
          />
          {/* Mid ridge */}
          <path
            d="M0,220 L0,175 Q120,130 280,160 Q440,190 600,145 Q760,100 920,155 Q1080,200 1200,160 Q1320,125 1440,155 L1440,220 Z"
            fill="#0f1a28"
          />
          {/* Front ridge (matches bg) */}
          <path
            d="M0,220 L0,195 Q150,170 300,185 Q450,200 580,178 Q710,156 860,185 Q1010,205 1140,185 Q1290,165 1440,190 L1440,220 Z"
            fill="#0B101A"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-8">
        {/* Hero text block */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-galaxy-green text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase mb-4"
          >
            Dehradun to Every Destination
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-galaxy-text leading-tight hero-text-glow mb-6"
          >
            Your Journey,{' '}
            <span className="text-gradient-green">Our Galaxy</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="text-galaxy-muted text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Reliable cab service in Dehradun for outstation trips, local travel,
            and unforgettable Himalayan experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.45}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => scrollToSection('#home')}
              className="flex items-center gap-2 rounded-full bg-galaxy-forest text-white px-6 py-3 font-semibold text-sm hover:shadow-green-glow hover:bg-galaxy-forest/90 transition-all"
            >
              <Car size={16} /> Book a Ride
            </button>
            <button
              onClick={() => scrollToSection('#pricing')}
              className="flex items-center gap-2 rounded-full border border-galaxy-green text-galaxy-green px-6 py-3 font-semibold text-sm hover:bg-galaxy-green/10 transition-all"
            >
              <IndianRupee size={16} /> Request Pricing
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="flex flex-wrap gap-4 mt-8"
          >
            {['Hill-Expert Drivers', 'Sanitized Cabs', 'GPS Tracked'].map((badge) => (
              <span
                key={badge}
                className="text-xs text-galaxy-muted bg-galaxy-card/60 border border-galaxy-border px-3 py-1 rounded-full"
              >
                ✓ {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Booking Bar pinned near bottom of hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.7}
          className="mt-12 pb-12"
        >
          <BookingBar onSearch={onSearch} />
        </motion.div>
      </div>
    </section>
  )
}
