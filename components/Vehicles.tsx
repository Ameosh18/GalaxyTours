'use client'

import { motion } from 'framer-motion'
import { VEHICLES } from '@/lib/data'
import VehicleCard from './VehicleCard'
import PricingCalculator from './PricingCalculator'

export default function Vehicles() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-brand-light mb-3">Fleet & Pricing</p>
          <h2 className="font-display font-bold text-ink-dark text-[1.9rem] md:text-[2.4rem]">Choose Your Ride</h2>
          <p className="text-ink-muted text-[15px] mt-2 max-w-md mx-auto">All cabs sanitised and well-maintained. Hill-ready vehicles for mountain routes.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VEHICLES.map((vehicle, i) => (
            <motion.div key={vehicle.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>

        <PricingCalculator />

      </div>
    </section>
  )
}
