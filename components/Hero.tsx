'use client'

import { motion } from 'framer-motion'
import { PHONE_NUMBER, PHONE_RAW, WHATSAPP_NUMBER } from '@/lib/data'

export default function Hero() {
  const basePath = process.env.NODE_ENV === 'production' ? '/GalaxyTours' : ''
  const waMsg = encodeURIComponent('Hi Asif, I want to book a cab.')

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row">

      {/* Left — photo (60%) */}
      <div className="relative w-full md:w-[60%] h-[50vh] md:h-auto">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${basePath}/images/galaxy_hero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        />
        {/* subtle bottom fade on mobile so text panel connects */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1B4332] to-transparent md:hidden" />
      </div>

      {/* Right — dark panel (40%) */}
      <div className="w-full md:w-[40%] bg-[#1B4332] flex items-center">
        <div className="px-8 py-16 md:py-0 md:px-12 max-w-md">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#74C69D] mb-4"
          >
            Galaxy Travels
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display font-bold text-white text-[2.4rem] md:text-[2.8rem] leading-[1.1] mb-4"
          >
            Dehradun&apos;s Himalayan Cab Expert
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-white/70 text-[15px] leading-relaxed mb-10"
          >
            500+ Himalayan trips. Every road, every season.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Call Asif */}
            <div>
              <a
                href={`tel:${PHONE_RAW}`}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1B4332] px-8 py-3.5 text-[15px] font-bold shadow-lg hover:bg-white/90 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.61 19.79 19.79 0 01.92 2 2 2 0 012.92 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                Call Asif
              </a>
              <p className="text-white/50 text-[11px] mt-1.5 ml-1">{PHONE_NUMBER}</p>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white px-8 py-3.5 text-[15px] font-semibold hover:border-white/70 hover:bg-white/5 transition-all w-fit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
