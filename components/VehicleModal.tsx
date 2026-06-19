'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, MessageCircle, Phone, MapPin, CalendarDays } from 'lucide-react'
import VehicleCard from './VehicleCard'
import { VEHICLES, WHATSAPP_NUMBER, PHONE_RAW, type Vehicle } from '@/lib/data'

interface BookingDetails {
  pickup: string
  dropoff: string
  date: string
  cabType: string
}

interface VehicleModalProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: BookingDetails
}

export default function VehicleModal({ isOpen, onClose, bookingDetails }: VehicleModalProps) {
  const [selected, setSelected] = useState<Vehicle | null>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const match = VEHICLES.find(
      (v) => v.type.toLowerCase() === bookingDetails.cabType.toLowerCase()
    )
    setSelected(match ?? null)
  }, [isOpen, bookingDetails.cabType])

  const handleBook = () => {
    if (!selected) return
    const dateStr = bookingDetails.date
      ? new Date(bookingDetails.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'TBD'
    const msg = encodeURIComponent(
      `Hi Galaxy Travels, I'd like to book a ${selected.type} (${selected.models[0]}) from ${bookingDetails.pickup} to ${bookingDetails.dropoff} on ${dateStr}. Please confirm availability and pricing.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 z-[70] md:inset-0 md:flex md:items-center md:justify-center md:p-4"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-white border border-surface-border rounded-t-3xl md:rounded-3xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border sticky top-0 bg-white z-10">
                <div>
                  <h2 className="font-display font-bold text-ink-dark text-[17px]">Choose Your Cab</h2>
                  <p className="text-ink-muted text-xs mt-0.5">Select a vehicle to proceed</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-surface-off text-ink-muted hover:text-ink-dark transition-colors"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Booking summary */}
              {(bookingDetails.pickup || bookingDetails.dropoff) && (
                <div className="mx-5 mt-4 p-3 bg-brand-50 rounded-xl border border-brand-200 text-xs space-y-1.5">
                  {bookingDetails.pickup && (
                    <div className="flex items-center gap-2 text-ink-muted">
                      <MapPin size={11} className="text-brand-mid shrink-0" />
                      From: <span className="text-ink-dark font-semibold">{bookingDetails.pickup}</span>
                    </div>
                  )}
                  {bookingDetails.dropoff && (
                    <div className="flex items-center gap-2 text-ink-muted">
                      <MapPin size={11} className="text-brand-mid shrink-0" />
                      To: <span className="text-ink-dark font-semibold">{bookingDetails.dropoff}</span>
                    </div>
                  )}
                  {bookingDetails.date && (
                    <div className="flex items-center gap-2 text-ink-muted">
                      <CalendarDays size={11} className="text-brand-mid shrink-0" />
                      Date: <span className="text-ink-dark font-semibold">
                        {new Date(bookingDetails.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Vehicle cards */}
              <div className="p-5 space-y-3">
                {VEHICLES.map((v) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    isSelected={selected?.id === v.id}
                    onSelect={setSelected}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 space-y-3">
                <button
                  onClick={handleBook}
                  disabled={!selected}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white py-3.5 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all"
                >
                  <MessageCircle size={17} />
                  {selected ? `Book ${selected.type} via WhatsApp` : 'Select a Vehicle'}
                </button>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-surface-border text-ink-body py-3.5 font-semibold text-sm hover:bg-surface-off transition-colors"
                >
                  <Phone size={15} className="text-brand-mid" /> Call to Book
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
