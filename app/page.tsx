'use client'

import { useState } from 'react'
import StarBackground from '@/components/StarBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PopularRoutes from '@/components/PopularRoutes'
import CustomTripPlanner from '@/components/CustomTripPlanner'
import VehicleModal from '@/components/VehicleModal'
import { type Route } from '@/lib/data'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/lib/data'

interface BookingDetails {
  pickup: string
  dropoff: string
  date: string
  cabType: string
}

const PRICING_ROWS = [
  { route: 'Dehradun → Mussoorie', sedan: '₹2,800', suv: '₹3,800', distance: '290 km' },
  { route: 'Dehradun → Rishikesh', sedan: '₹3,200', suv: '₹4,200', distance: '240 km' },
  { route: 'Dehradun → Haridwar',  sedan: '₹2,600', suv: '₹3,500', distance: '210 km' },
  { route: 'Dehradun → Chopta',    sedan: '₹4,500', suv: '₹6,000', distance: '390 km' },
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    pickup: 'Dehradun',
    dropoff: '',
    date: '',
    cabType: 'Any Type',
  })

  const handleSearch = (details: BookingDetails) => {
    setBookingDetails(details)
    setIsModalOpen(true)
  }

  const handleRouteBook = (route: Route) => {
    setBookingDetails((prev) => ({ ...prev, dropoff: route.name }))
    setIsModalOpen(true)
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent('Hi Galaxy Travels, I want to get a pricing quote for my trip.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="relative">
      <StarBackground />
      <Navbar />

      <Hero onSearch={handleSearch} />

      <PopularRoutes onBook={handleRouteBook} />

      <CustomTripPlanner />

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-galaxy-green text-xs font-semibold tracking-[0.25em] uppercase">Transparent Pricing</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-galaxy-text mt-2 mb-3">
              No Hidden Charges
            </h2>
            <p className="text-galaxy-muted text-base">Fixed fares, GST included. What you see is what you pay.</p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-galaxy-border">
                    <th className="text-left px-5 py-4 text-galaxy-muted font-semibold text-xs uppercase tracking-wide">Route</th>
                    <th className="text-left px-5 py-4 text-galaxy-muted font-semibold text-xs uppercase tracking-wide">Distance</th>
                    <th className="text-left px-5 py-4 text-galaxy-muted font-semibold text-xs uppercase tracking-wide">Sedan</th>
                    <th className="text-left px-5 py-4 text-galaxy-muted font-semibold text-xs uppercase tracking-wide">SUV</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row, i) => (
                    <tr
                      key={row.route}
                      className={`border-b border-galaxy-border/50 hover:bg-galaxy-green/5 transition-colors ${
                        i === PRICING_ROWS.length - 1 ? 'border-0' : ''
                      }`}
                    >
                      <td className="px-5 py-4 font-medium text-galaxy-text">{row.route}</td>
                      <td className="px-5 py-4 text-galaxy-muted">{row.distance}</td>
                      <td className="px-5 py-4 text-galaxy-green font-semibold">{row.sedan}</td>
                      <td className="px-5 py-4 text-galaxy-green font-semibold">{row.suv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-galaxy-muted text-xs text-center mt-4">
            * Prices are one-way. Return trip discounts available. Toll & parking extra.
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold text-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all"
            >
              <MessageCircle size={16} /> Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-galaxy-green text-xs font-semibold tracking-[0.25em] uppercase">Get in Touch</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-galaxy-text mt-2 mb-3">
            We&apos;re Always Available
          </h2>
          <p className="text-galaxy-muted text-base mb-10">
            Available 24/7 for bookings, queries, and last-minute changes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-galaxy-green/40 hover:shadow-green-glow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-galaxy-green/10 flex items-center justify-center group-hover:bg-galaxy-green/20 transition-colors">
                <Phone size={22} className="text-galaxy-green" />
              </div>
              <div>
                <p className="text-galaxy-text font-semibold text-sm">Call Us</p>
                <p className="text-galaxy-muted text-xs mt-1">{PHONE_NUMBER}</p>
              </div>
            </a>

            <button
              onClick={handleWhatsApp}
              className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-galaxy-green/40 hover:shadow-green-glow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle size={22} className="text-[#25D366]" />
              </div>
              <div>
                <p className="text-galaxy-text font-semibold text-sm">WhatsApp</p>
                <p className="text-galaxy-muted text-xs mt-1">Chat instantly</p>
              </div>
            </button>

            <div className="glass rounded-2xl p-6 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-galaxy-green/10 flex items-center justify-center">
                <MapPin size={22} className="text-galaxy-green" />
              </div>
              <div>
                <p className="text-galaxy-text font-semibold text-sm">Based In</p>
                <p className="text-galaxy-muted text-xs mt-1">Dehradun, Uttarakhand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-galaxy-border py-8 px-4 sm:px-6 lg:px-8 mb-14 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-galaxy-muted text-xs">
          <p>© 2025 Galaxy Travels. All rights reserved.</p>
          <p>Dehradun, Uttarakhand · Premium Hill Cab Service</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-galaxy-green transition-colors">Privacy</a>
            <a href="#" className="hover:text-galaxy-green transition-colors">Terms</a>
            <button onClick={handleWhatsApp} className="hover:text-galaxy-green transition-colors flex items-center gap-1">
              <Mail size={12} /> Contact
            </button>
          </div>
        </div>
      </footer>

      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingDetails={bookingDetails}
      />
    </main>
  )
}
