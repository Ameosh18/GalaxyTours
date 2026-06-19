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
          ? 'border-galaxy-green bg-galaxy-green/10 shadow-green-glow'
          : 'border-galaxy-border bg-galaxy-card/50 hover:border-galaxy-green/40 hover:bg-galaxy-card/80'
      }`}
    >
      {/* Hill-Ready badge */}
      {vehicle.hillReady && (
        <span className="absolute top-3 right-3 bg-galaxy-green text-galaxy-bg text-[10px] font-bold px-2 py-0.5 rounded-full">
          Hill-Ready
        </span>
      )}

      {/* Selected indicator */}
      {isSelected && (
        <CheckCircle2
          size={18}
          className="absolute top-3 left-3 text-galaxy-green"
        />
      )}

      <div className="flex items-start gap-4 mt-2">
        <span className="text-4xl" role="img" aria-label={vehicle.type}>
          {vehicle.emoji}
        </span>

        <div className="flex-1">
          <h3 className="font-display font-bold text-galaxy-text text-base">{vehicle.type}</h3>
          <p className="text-galaxy-muted text-xs mt-0.5">{vehicle.models.join(' / ')}</p>

          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1 text-xs text-galaxy-muted">
              <Users size={12} className="text-galaxy-green" />
              {vehicle.passengers} passengers
            </div>
            <div className="flex items-center gap-1 text-xs text-galaxy-muted">
              <Luggage size={12} className="text-galaxy-green" />
              {vehicle.luggage}
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-galaxy-green font-bold text-sm">₹{vehicle.pricePerKm}/km</p>
          <p className="text-galaxy-muted text-[10px] mt-0.5">onwards</p>
        </div>
      </div>
    </button>
  )
}
