'use client'

import { useState } from 'react'
import { VEHICLES } from '@/lib/data'

export default function PricingCalculator() {
  const [distance, setDistance] = useState('')
  const [cabType,  setCabType]  = useState('sedan')

  const vehicle = VEHICLES.find(v => v.id === cabType) ?? VEHICLES[1]
  const fare = distance ? Math.round(parseFloat(distance) * vehicle.pricePerKm) : null

  return (
    <div className="mt-10 bg-white rounded-2xl border border-surface-border p-6 md:p-8">
      <h3 className="font-display font-bold text-ink-dark text-[1.2rem] mb-1">Fare Estimator</h3>
      <p className="text-ink-muted text-[13px] mb-6">Get an instant fare estimate before you call.</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block mb-2">Distance (km)</label>
          <input
            type="number"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            placeholder="e.g. 290"
            className="w-full rounded-xl border border-surface-border px-4 py-2.5 text-[14px] font-semibold text-ink-dark outline-none focus:border-brand-dark transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block mb-2">Cab Type</label>
          <select
            value={cabType}
            onChange={e => setCabType(e.target.value)}
            className="w-full rounded-xl border border-surface-border px-4 py-2.5 text-[14px] font-semibold text-ink-dark outline-none focus:border-brand-dark cursor-pointer bg-white transition-colors"
          >
            {VEHICLES.map(v => <option key={v.id} value={v.id}>{v.type} — ₹{v.pricePerKm}/km</option>)}
          </select>
        </div>
      </div>

      {fare !== null && !isNaN(fare) ? (
        <div className="bg-brand-dark/5 rounded-xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-light">Estimated Fare</p>
            <p className="font-display font-bold text-ink-dark text-[2rem]">₹{fare.toLocaleString('en-IN')}</p>
          </div>
          <p className="text-ink-muted text-[11px] max-w-[140px] text-right">Actual price may vary based on route conditions</p>
        </div>
      ) : (
        <div className="bg-surface-input rounded-xl px-6 py-4 text-ink-muted text-[13px] text-center">
          Enter distance above to see your estimate
        </div>
      )}
    </div>
  )
}
