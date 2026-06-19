'use client'

import { Users, Luggage, CheckCircle2 } from 'lucide-react'
import type { Vehicle } from '@/lib/data'

interface VehicleCardProps {
  vehicle: Vehicle
  isSelected: boolean
  onSelect: (vehicle: Vehicle) => void
}

export default function VehicleCard({ vehicle, isSelected, onSelect }: VehicleCardProps) {
  return (
    <button
      onClick={() => onSelect(vehicle)}
      className={`relative w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 ${
        isSelected
          ? 'border-brand-dark bg-brand-50 shadow-btn'
          : 'border-surface-border bg-white hover:border-brand-sage hover:bg-brand-50/40'
      }`}
    >
      {vehicle.hillReady && (
        <span className="absolute top-3 right-3 bg-brand-dark text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
          Hill-Ready
        </span>
      )}
      {isSelected && (
        <CheckCircle2 size={16} className="absolute top-3 left-3 text-brand-dark" />
      )}

      <div className="flex items-start gap-4 mt-1">
        <span className="text-4xl" role="img" aria-label={vehicle.type}>{vehicle.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-ink-dark text-[15px]">{vehicle.type}</h3>
          <p className="text-ink-muted text-xs mt-0.5">{vehicle.models.join(' / ')}</p>
          <div className="flex gap-4 mt-2.5">
            <span className="flex items-center gap-1 text-[11px] text-ink-muted">
              <Users size={11} className="text-brand-mid" /> {vehicle.passengers} passengers
            </span>
            <span className="flex items-center gap-1 text-[11px] text-ink-muted">
              <Luggage size={11} className="text-brand-mid" /> {vehicle.luggage}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-brand-dark font-bold text-sm">₹{vehicle.pricePerKm}/km</p>
          <p className="text-ink-light text-[10px] mt-0.5">onwards</p>
        </div>
      </div>
    </button>
  )
}
