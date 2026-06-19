'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PopularRoutes from '@/components/PopularRoutes'
import CustomTripPlanner from '@/components/CustomTripPlanner'
import VehicleModal from '@/components/VehicleModal'
import { type Route, PHONE_NUMBER, PHONE_RAW, WHATSAPP_NUMBER } from '@/lib/data'
import { MessageCircle, Phone, MapPin } from 'lucide-react'

interface BookingDetails {
  pickup: string
  dropoff: string
  date: string
  cabType: string
}

const PRICING = [
  { route: 'Dehradun → Mussoorie', sedan: '₹2,800', suv: '₹3,800', distance: '290 km' },
  { route: 'Dehradun → Rishikesh', sedan: '₹3,200', suv: '₹4,200', distance: '240 km' },
  { route: 'Dehradun → Haridwar',  sedan: '₹2,600', suv: '₹3,500', distance: '210 km' },
  { route: 'Dehradun → Chopta',    sedan: '₹4,500', suv: '₹6,000', distance: '390 km' },
]

export default function Home() {
  const [isModalOpen,    setIsModalOpen]    = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    pickup: 'Dehradun', dropoff: '', date: '', cabType: 'Select type',
  })

  const handleSearch = (d: BookingDetails) => {
    setBookingDetails(d)
    setIsModalOpen(true)
  }

  const handleRouteBook = (route: Route) => {
    setBookingDetails((p) => ({ ...p, dropoff: route.name }))
    setIsModalOpen(true)
  }

  const openWhatsApp = (msg = 'Hi Galaxy Travels, I want to book a cab.') =>
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')

  return (
    <main>
      <Navbar />
      <Hero onSearch={handleSearch} />
      <PopularRoutes onBook={handleRouteBook} />
      <CustomTripPlanner />

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-off">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-mid px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
              Transparent Pricing
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-dark mb-2">No Hidden Charges</h2>
            <p className="text-ink-muted text-base">Fixed fares, GST included. What you see is what you pay.</p>
          </div>

          <div className="bg-white border border-surface-border rounded-2xl overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-off">
                  <tr className="border-b border-surface-border">
                    {['Route', 'Distance', 'Sedan', 'SUV'].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-ink-muted font-semibold text-[11px] uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING.map((row, i) => (
                    <tr key={row.route} className={`hover:bg-brand-50 transition-colors ${i < PRICING.length - 1 ? 'border-b border-surface-border' : ''}`}>
                      <td className="px-5 py-4 font-medium text-ink-dark">{row.route}</td>
                      <td className="px-5 py-4 text-ink-muted">{row.distance}</td>
                      <td className="px-5 py-4 text-brand-dark font-semibold">{row.sedan}</td>
                      <td className="px-5 py-4 text-brand-dark font-semibold">{row.suv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-ink-light text-xs text-center mt-3">
            * One-way fares. Return trip discounts available. Toll & parking extra.
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => openWhatsApp('Hi Galaxy Travels, I want a custom pricing quote.')}
              className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-semibold text-sm shadow-btn hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all"
            >
              <MessageCircle size={15} /> Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-mid px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            Get in Touch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-dark mb-2">
            We&apos;re Always Available
          </h2>
          <p className="text-ink-muted text-base mb-10">Available 24/7 for bookings, queries, and last-minute changes.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: <Phone size={22} className="text-brand-mid" />,
                label: 'Call Us',
                sub: PHONE_NUMBER,
                action: () => window.open(`tel:${PHONE_RAW}`),
              },
              {
                icon: <MessageCircle size={22} className="text-[#25D366]" />,
                label: 'WhatsApp',
                sub: 'Chat instantly',
                action: () => openWhatsApp(),
              },
              {
                icon: <MapPin size={22} className="text-brand-mid" />,
                label: 'Based In',
                sub: 'Dehradun, Uttarakhand',
                action: undefined,
              },
            ].map((c) => (
              <button
                key={c.label}
                onClick={c.action}
                disabled={!c.action}
                className="bg-surface-off border border-surface-border rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-brand-sage hover:shadow-card-hover transition-all group disabled:cursor-default"
              >
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  {c.icon}
                </div>
                <div>
                  <p className="text-ink-dark font-semibold text-sm">{c.label}</p>
                  <p className="text-ink-muted text-xs mt-0.5">{c.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-surface-border py-7 px-4 sm:px-6 lg:px-8 mb-14 md:mb-0 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-ink-muted text-xs">
          <p>© 2025 Galaxy Travels. All rights reserved.</p>
          <p>Dehradun, Uttarakhand · Premium Hill Cab Service</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-dark transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Terms</a>
            <button onClick={() => openWhatsApp()} className="hover:text-brand-dark transition-colors">Contact</button>
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
