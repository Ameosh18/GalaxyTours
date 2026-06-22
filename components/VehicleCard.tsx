'use client'

import { Users, Briefcase } from 'lucide-react'
import { type Vehicle } from '@/lib/data'
import { WHATSAPP_NUMBER } from '@/lib/data'
import { asset } from '@/lib/asset'

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const handleBook = () => {
    const msg = encodeURIComponent(`Hi Asif, I want to book a ${vehicle.type} (${vehicle.models.join(' / ')}).\nCapacity: ${vehicle.passengers} passengers\nRate: ₹${vehicle.pricePerKm}/km`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="card rounded-2xl overflow-hidden flex flex-col hover:shadow-card-hover transition-shadow">
      {/* Vehicle image */}
      {vehicle.image && (
        <div className="w-full h-40 bg-surface-off overflow-hidden">
          <img src={asset(vehicle.image)} alt={vehicle.type} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      <div className="p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{vehicle.emoji}</span>
            <h3 className="font-display font-bold text-ink-dark text-[1.2rem]">{vehicle.type}</h3>
          </div>
          <p className="text-ink-muted text-[12px]">{vehicle.models.join(' / ')}</p>
        </div>
        {vehicle.hillReady && (
          <span className="text-[10px] font-bold text-brand-dark bg-brand-dark/10 px-2.5 py-1 rounded-full shrink-0">
            Hill-Ready
          </span>
        )}
      </div>

      {/* Specs */}
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5 text-ink-muted text-[12px]">
          <Users size={13} className="text-brand-light" /> {vehicle.passengers} pax
        </span>
        <span className="flex items-center gap-1.5 text-ink-muted text-[12px]">
          <Briefcase size={13} className="text-brand-light" /> {vehicle.luggage}
        </span>
      </div>

      {/* Best for */}
      <p className="text-ink-muted text-[12.5px] italic border-l-2 border-brand-light/30 pl-3">
        {vehicle.bestFor}
      </p>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-border">
        <div>
          <p className="text-[10px] text-ink-muted uppercase tracking-wider">Rate</p>
          <p className="font-bold text-ink-dark text-[1.2rem]">₹{vehicle.pricePerKm}<span className="text-ink-muted font-normal text-[12px]">/km</span></p>
        </div>
        <button onClick={handleBook}
          className="rounded-full bg-brand-dark text-white px-5 py-2 text-[13px] font-semibold shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all">
          Book this →
        </button>
      </div>
      </div>
    </div>
  )
}
