'use client'

import { useState } from 'react'
import { MapPin, CalendarDays, Car, Search, Loader2 } from 'lucide-react'

interface BookingBarProps {
  onSearch: (details: { pickup: string; dropoff: string; date: string; cabType: string }) => void
}

const CAB_TYPES = ['Select type', 'Hatchback', 'Sedan', 'SUV']

export default function BookingBar({ onSearch }: BookingBarProps) {
  const [pickup,      setPickup]      = useState('Dehradun')
  const [dropoff,     setDropoff]     = useState('')
  const [date,        setDate]        = useState('')
  const [cabType,     setCabType]     = useState('Select type')
  const [isDetecting, setIsDetecting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const detectLocation = () => {
    if (!('geolocation' in navigator)) return
    setIsDetecting(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          )
          const data = await res.json()
          setPickup(
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            'Current Location'
          )
        } catch {
          setPickup('Current Location')
        } finally {
          setIsDetecting(false)
        }
      },
      () => setIsDetecting(false)
    )
  }

  const handleSearch = () => {
    if (!dropoff || !date) return
    onSearch({ pickup, dropoff, date, cabType })
  }

  const divider = <div className="hidden md:block w-px h-10 bg-surface-border flex-shrink-0" />

  return (
    <div className="w-full max-w-5xl mx-auto px-4">

      {/* Desktop pill */}
      <div className="hidden md:flex items-center glass-bar rounded-full shadow-bar px-2 py-2 gap-0">

        {/* Pickup */}
        <div className="flex items-center gap-3 flex-1 px-5 py-2 cursor-pointer" onClick={detectLocation}>
          <div className="w-8 h-8 rounded-full bg-surface-input flex items-center justify-center shrink-0">
            {isDetecting
              ? <Loader2 size={15} className="animate-spin text-brand-mid" />
              : <MapPin    size={15} className="text-brand-mid" />
            }
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-0.5">Pickup Location</p>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Dehradun"
              className="block w-full text-[13px] font-semibold text-ink-dark bg-transparent outline-none placeholder-ink-light"
            />
          </div>
        </div>

        {divider}

        {/* Drop */}
        <div className="flex items-center gap-3 flex-1 px-5 py-2">
          <div className="w-8 h-8 rounded-full bg-surface-input flex items-center justify-center shrink-0">
            <MapPin size={15} className="text-brand-mid" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-0.5">Drop Location</p>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Where to?"
              className="block w-full text-[13px] font-semibold text-ink-dark bg-transparent outline-none placeholder-ink-light"
            />
          </div>
        </div>

        {divider}

        {/* Date */}
        <div className="flex items-center gap-3 flex-1 px-5 py-2">
          <div className="w-8 h-8 rounded-full bg-surface-input flex items-center justify-center shrink-0">
            <CalendarDays size={15} className="text-brand-mid" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-0.5">Travel Date</p>
            {date ? (
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full text-[13px] font-semibold text-ink-dark bg-transparent outline-none [color-scheme:light]"
              />
            ) : (
              <button
                onClick={() => {
                  const el = document.getElementById('hero-date-input') as HTMLInputElement
                  el?.showPicker?.()
                  el?.click()
                }}
                className="block text-left w-full text-[13px] font-semibold text-ink-dark bg-transparent outline-none"
              >
                Select date
                <input
                  id="hero-date-input"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
              </button>
            )}
          </div>
        </div>

        {divider}

        {/* Cab type */}
        <div className="flex items-center gap-3 flex-1 px-5 py-2">
          <div className="w-8 h-8 rounded-full bg-surface-input flex items-center justify-center shrink-0">
            <Car size={15} className="text-brand-mid" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-0.5">Cab Type</p>
            <select
              value={cabType}
              onChange={(e) => setCabType(e.target.value)}
              className="block w-full text-[13px] font-semibold text-ink-dark bg-transparent outline-none cursor-pointer"
            >
              {CAB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="ml-2 shrink-0 w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden glass-bar rounded-2xl shadow-bar p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Pickup', icon: isDetecting ? <Loader2 size={14} className="animate-spin text-brand-mid" /> : <MapPin size={14} className="text-brand-mid" />, value: pickup, onChange: setPickup, ph: 'Dehradun', onClick: detectLocation },
            { label: 'Drop',   icon: <MapPin size={14} className="text-brand-mid" />, value: dropoff, onChange: setDropoff, ph: 'Where to?' },
          ].map((f) => (
            <div key={f.label} onClick={f.onClick} className="flex items-center gap-2 bg-surface-input rounded-xl px-3 py-2.5">
              {f.icon}
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider">{f.label}</p>
                <input type="text" value={f.value} onChange={(e) => f.onChange(e.target.value)} placeholder={f.ph}
                  className="block w-full text-xs font-semibold text-ink-dark bg-transparent outline-none placeholder-ink-light" />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 bg-surface-input rounded-xl px-3 py-2.5">
            <CalendarDays size={14} className="text-brand-mid shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider">Date</p>
              <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)}
                className="block w-full text-xs font-semibold text-ink-dark bg-transparent outline-none [color-scheme:light]" />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-surface-input rounded-xl px-3 py-2.5">
            <Car size={14} className="text-brand-mid shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider">Cab</p>
              <select value={cabType} onChange={(e) => setCabType(e.target.value)}
                className="block w-full text-xs font-semibold text-ink-dark bg-transparent outline-none cursor-pointer">
                {CAB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-dark text-white py-3 font-semibold text-sm shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all">
          <Search size={15} /> Search Cabs
        </button>
      </div>
    </div>
  )
}
