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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Pre-select based on cabType from booking bar
  useEffect(() => {
    if (isOpen) {
      const matched = VEHICLES.find(
        (v) => v.type.toLowerCase() === bookingDetails.cabType.toLowerCase()
      )
      setSelectedVehicle(matched ?? null)
    }
  }, [isOpen, bookingDetails.cabType])

  const handleBook = () => {
    if (!selectedVehicle) return
    const dateStr = bookingDetails.date
      ? new Date(bookingDetails.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'TBD'

    const msg = encodeURIComponent(
      `Hi Galaxy Travels, I'd like to book a ${selectedVehicle.type} (${selectedVehicle.models[0]}) from ${bookingDetails.pickup} to ${bookingDetails.dropoff} on ${dateStr}. Please confirm availability and pricing.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const handleCall = () => {
    window.open(`tel:${PHONE_RAW}`)
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
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          {/* Panel — slides up on mobile, centered on desktop */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 z-[70] md:inset-0 md:flex md:items-center md:justify-center md:p-4"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="bg-galaxy-card border border-galaxy-border rounded-t-3xl md:rounded-3xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto shadow-card"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-galaxy-border sticky top-0 bg-galaxy-card z-10">
                <div>
                  <h2 className="font-display font-bold text-galaxy-text text-lg">Choose Your Cab</h2>
                  <p className="text-galaxy-muted text-xs mt-0.5">Select a vehicle to continue</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-galaxy-bg transition-colors text-galaxy-muted hover:text-galaxy-text"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Booking summary */}
              {(bookingDetails.pickup || bookingDetails.dropoff) && (
                <div className="mx-5 mt-4 p-3 bg-galaxy-bg/60 rounded-xl border border-galaxy-border text-xs space-y-1.5">
                  {bookingDetails.pickup && (
                    <div className="flex items-center gap-2 text-galaxy-muted">
                      <MapPin size={11} className="text-galaxy-green shrink-0" />
                      From: <span className="text-galaxy-text font-medium">{bookingDetails.pickup}</span>
                    </div>
                  )}
                  {bookingDetails.dropoff && (
                    <div className="flex items-center gap-2 text-galaxy-muted">
                      <MapPin size={11} className="text-galaxy-green shrink-0" />
                      To: <span className="text-galaxy-text font-medium">{bookingDetails.dropoff}</span>
                    </div>
                  )}
                  {bookingDetails.date && (
                    <div className="flex items-center gap-2 text-galaxy-muted">
                      <CalendarDays size={11} className="text-galaxy-green shrink-0" />
                      Date: <span className="text-galaxy-text font-medium">
                        {new Date(bookingDetails.date).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Vehicle Cards */}
              <div className="p-5 space-y-3">
                {VEHICLES.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isSelected={selectedVehicle?.id === vehicle.id}
                    onSelect={setSelectedVehicle}
                  />
                ))}
              </div>

              {/* Action buttons */}
              <div className="p-5 pt-0 space-y-3">
                <button
                  onClick={handleBook}
                  disabled={!selectedVehicle}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white py-3.5 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all"
                >
                  <MessageCircle size={18} />
                  {selectedVehicle ? `Book ${selectedVehicle.type} via WhatsApp` : 'Select a Vehicle'}
                </button>

                <button
                  onClick={handleCall}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-galaxy-border text-galaxy-text py-3.5 font-semibold text-sm hover:bg-galaxy-card/80 transition-colors"
                >
                  <Phone size={16} className="text-galaxy-green" /> Call to Book
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
