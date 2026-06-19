'use client'

import { useState } from 'react'
import { MapPin, CalendarDays, Car, Search, Loader2 } from 'lucide-react'

interface BookingBarProps {
  onSearch: (details: { pickup: string; dropoff: string; date: string; cabType: string }) => void
}

const CAB_TYPES = ['Any Type', 'Hatchback', 'Sedan', 'SUV']

export default function BookingBar({ onSearch }: BookingBarProps) {
  const [pickup, setPickup] = useState('Dehradun')
  const [dropoff, setDropoff] = useState('')
  const [date, setDate] = useState('')
  const [cabType, setCabType] = useState('Any Type')
  const [isDetecting, setIsDetecting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const detectLocation = () => {
    if (!('geolocation' in navigator)) return
    setIsDetecting(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          )
          const data = await res.json()
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'Current Location'
          setPickup(city)
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

  const inputBase =
    'bg-transparent outline-none text-galaxy-text placeholder-galaxy-muted text-sm w-full focus:text-galaxy-green transition-colors'

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Desktop: single pill row */}
      <div className="hidden md:flex items-center glass rounded-full px-2 py-2 gap-1 shadow-card">
        {/* Pickup */}
        <div className="flex items-center gap-2 flex-1 px-4 py-2 group">
          <button
            onClick={detectLocation}
            className="shrink-0 text-galaxy-green hover:text-galaxy-forest transition-colors"
            title="Auto-detect location"
          >
            {isDetecting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <MapPin size={18} />
            )}
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-galaxy-muted text-[10px] font-semibold uppercase tracking-wide">
              Pickup Location
            </span>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Dehradun"
              className={inputBase}
            />
          </div>
        </div>

        <div className="w-px h-10 bg-galaxy-border" />

        {/* Drop */}
        <div className="flex items-center gap-2 flex-1 px-4 py-2">
          <MapPin size={18} className="text-galaxy-green shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-galaxy-muted text-[10px] font-semibold uppercase tracking-wide">
              Drop Location
            </span>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Where to?"
              className={inputBase}
            />
          </div>
        </div>

        <div className="w-px h-10 bg-galaxy-border" />

        {/* Date */}
        <div className="flex items-center gap-2 flex-1 px-4 py-2">
          <CalendarDays size={18} className="text-galaxy-green shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-galaxy-muted text-[10px] font-semibold uppercase tracking-wide">
              Travel Date
            </span>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputBase} [color-scheme:dark]`}
            />
          </div>
        </div>

        <div className="w-px h-10 bg-galaxy-border" />

        {/* Cab Type */}
        <div className="flex items-center gap-2 flex-1 px-4 py-2">
          <Car size={18} className="text-galaxy-green shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-galaxy-muted text-[10px] font-semibold uppercase tracking-wide">
              Cab Type
            </span>
            <select
              value={cabType}
              onChange={(e) => setCabType(e.target.value)}
              className={`${inputBase} cursor-pointer bg-transparent`}
            >
              {CAB_TYPES.map((t) => (
                <option key={t} value={t} className="bg-galaxy-card text-galaxy-text">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="shrink-0 rounded-full bg-galaxy-forest text-white p-4 hover:shadow-green-glow hover:bg-galaxy-forest/90 transition-all ml-1"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Mobile: 2x2 grid */}
      <div className="md:hidden glass rounded-2xl p-4 shadow-card space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Pickup */}
          <div className="flex items-center gap-2 bg-galaxy-card/50 rounded-xl px-3 py-2.5">
            <button onClick={detectLocation}>
              {isDetecting ? (
                <Loader2 size={16} className="animate-spin text-galaxy-green" />
              ) : (
                <MapPin size={16} className="text-galaxy-green" />
              )}
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-galaxy-muted text-[9px] font-semibold uppercase">Pickup</span>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Dehradun"
                className={`${inputBase} text-xs`}
              />
            </div>
          </div>

          {/* Drop */}
          <div className="flex items-center gap-2 bg-galaxy-card/50 rounded-xl px-3 py-2.5">
            <MapPin size={16} className="text-galaxy-green shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-galaxy-muted text-[9px] font-semibold uppercase">Drop</span>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Where to?"
                className={`${inputBase} text-xs`}
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 bg-galaxy-card/50 rounded-xl px-3 py-2.5">
            <CalendarDays size={16} className="text-galaxy-green shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-galaxy-muted text-[9px] font-semibold uppercase">Date</span>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputBase} text-xs [color-scheme:dark]`}
              />
            </div>
          </div>

          {/* Cab Type */}
          <div className="flex items-center gap-2 bg-galaxy-card/50 rounded-xl px-3 py-2.5">
            <Car size={16} className="text-galaxy-green shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-galaxy-muted text-[9px] font-semibold uppercase">Cab</span>
              <select
                value={cabType}
                onChange={(e) => setCabType(e.target.value)}
                className={`${inputBase} text-xs cursor-pointer bg-transparent`}
              >
                {CAB_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-galaxy-card">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-galaxy-forest text-white py-3 font-semibold text-sm hover:shadow-green-glow transition-all"
        >
          <Search size={16} /> Search Cabs
        </button>
      </div>
    </div>
  )
}
