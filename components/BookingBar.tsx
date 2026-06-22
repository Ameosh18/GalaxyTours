'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, CalendarDays, Car, Loader2, Users } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/data'

const CAB_TYPES = ['Select type', 'Hatchback', 'Sedan', 'SUV']

interface Suggestion {
  display_name: string
  place_id: number
}

function useLocationSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading]         = useState(false)
  const timerRef                       = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) { setSuggestions([]); return }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res  = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&countrycodes=in&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data: Suggestion[] = await res.json()
        setSuggestions(data)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 350)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query])

  const clear = useCallback(() => setSuggestions([]), [])
  return { suggestions, loading, clear }
}

export default function BookingBar() {
  const [pickup,       setPickup]      = useState('Dehradun')
  const [dropoff,      setDropoff]     = useState('')
  const [date,         setDate]        = useState('')
  const [cabType,      setCabType]     = useState('Select type')
  const [passengers,   setPassengers]  = useState('')
  const [isDetecting,  setIsDetecting] = useState(false)
  const [errors,       setErrors]      = useState<Record<string, boolean>>({})
  const [showCallback, setShowCallback] = useState(false)
  const [cbName,       setCbName]      = useState('')
  const [cbPhone,      setCbPhone]     = useState('')

  // Track which field is actively being typed in for suggestions
  const [activeField, setActiveField] = useState<'pickup' | 'dropoff' | null>(null)

  const pickupSug  = useLocationSuggestions(activeField === 'pickup'  ? pickup  : '')
  const dropoffSug = useLocationSuggestions(activeField === 'dropoff' ? dropoff : '')

  const today = new Date().toISOString().split('T')[0]

  const detectLocation = () => {
    if (!('geolocation' in navigator)) return
    setIsDetecting(true)
    setActiveField(null)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`)
          const data = await res.json()
          setPickup(data.address?.city || data.address?.town || data.address?.village || 'Current Location')
        } catch { setPickup('Current Location') }
        finally  { setIsDetecting(false) }
      },
      () => setIsDetecting(false)
    )
  }

  const chooseSuggestion = (field: 'pickup' | 'dropoff', value: string) => {
    const short = formatSuggestion(value)
    if (field === 'pickup')  { setPickup(short);  pickupSug.clear()  }
    else                     { setDropoff(short); dropoffSug.clear(); setErrors(p => ({...p, dropoff: false})) }
    setActiveField(null)
  }

  // Close suggestions on outside click
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveField(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleWhatsApp = () => {
    const errs: Record<string, boolean> = {}
    if (!dropoff) errs.dropoff = true
    if (!date)    errs.date    = true
    setErrors(errs)
    if (Object.keys(errs).length) return

    const msg = encodeURIComponent(
      `Hi Asif, I want to book a cab.\nPickup: ${pickup}\nDrop: ${dropoff}\nDate: ${date}\nPassengers: ${passengers || 'Not specified'}\nCab type: ${cabType === 'Select type' ? 'Any' : cabType}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const handleCallback = () => {
    const errs: Record<string, boolean> = {}
    if (!cbName.trim())  errs.cbName  = true
    if (!cbPhone.trim()) errs.cbPhone = true
    setErrors(errs)
    if (Object.keys(errs).length) return

    const msg = encodeURIComponent(
      `Hi Asif, please call me back.\nName: ${cbName}\nPhone: ${cbPhone}${dropoff ? `\nDrop: ${dropoff}` : ''}${date ? `\nDate: ${date}` : ''}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const fieldCls = (key: string) =>
    `block w-full text-[13px] font-semibold bg-transparent outline-none placeholder-ink-light ${errors[key] ? 'text-red-500' : 'text-ink-dark'}`

  return (
    <section id="booking" className="py-14 md:py-16 bg-surface-off">
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-brand-light mb-3">Quick Booking</p>
          <h2 className="font-display font-bold text-ink-dark text-[1.9rem] md:text-[2.4rem]">Plan Your Trip</h2>
          <p className="text-ink-muted text-[15px] mt-2">Fill in your details and reach Asif in one tap.</p>
        </div>

        <div className="glass-bar rounded-2xl shadow-bar p-6 md:p-8" ref={containerRef}>

          {/* Desktop pill row */}
          <div className="hidden md:flex items-center gap-0 bg-white rounded-full border border-surface-border px-2 py-2 mb-6">

            {/* Pickup with suggestions */}
            <div className="relative flex-1 min-w-0">
              <Field
                icon={isDetecting ? <Loader2 size={15} className="animate-spin text-brand-light" /> : <MapPin size={15} className="text-brand-light" />}
                label="Pickup"
                id="pickup-input"
              >
                <input
                  id="pickup-input"
                  type="text"
                  value={pickup}
                  onChange={e => { setPickup(e.target.value); setActiveField('pickup') }}
                  onFocus={() => { setActiveField('pickup'); if (!pickup) detectLocation() }}
                  placeholder="Dehradun"
                  className={fieldCls('pickup')}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={activeField === 'pickup' && pickupSug.suggestions.length > 0}
                />
              </Field>
              <SuggestionDropdown
                suggestions={pickupSug.suggestions}
                loading={pickupSug.loading}
                show={activeField === 'pickup'}
                onSelect={v => chooseSuggestion('pickup', v)}
              />
            </div>

            <div className="w-px h-10 bg-surface-border shrink-0" />

            {/* Drop with suggestions */}
            <div className="relative flex-1 min-w-0">
              <Field icon={<MapPin size={15} className="text-brand-light" />} label="Drop" error={errors.dropoff} id="dropoff-input">
                <input
                  id="dropoff-input"
                  type="text"
                  value={dropoff}
                  onChange={e => { setDropoff(e.target.value); setActiveField('dropoff'); setErrors(p => ({...p, dropoff: false})) }}
                  onFocus={() => setActiveField('dropoff')}
                  placeholder={errors.dropoff ? 'Required' : 'Where to?'}
                  className={fieldCls('dropoff')}
                  autoComplete="off"
                  aria-required="true"
                  aria-invalid={errors.dropoff}
                  aria-autocomplete="list"
                  aria-expanded={activeField === 'dropoff' && dropoffSug.suggestions.length > 0}
                />
              </Field>
              <SuggestionDropdown
                suggestions={dropoffSug.suggestions}
                loading={dropoffSug.loading}
                show={activeField === 'dropoff'}
                onSelect={v => chooseSuggestion('dropoff', v)}
              />
            </div>

            <div className="w-px h-10 bg-surface-border shrink-0" />

            <Field icon={<CalendarDays size={15} className="text-brand-light" />} label="Date" error={errors.date}>
              <input type="date" value={date} min={today} onChange={e => { setDate(e.target.value); setErrors(p => ({...p, date: false})) }}
                className={`${fieldCls('date')} [color-scheme:light]`} />
            </Field>
            <div className="w-px h-10 bg-surface-border shrink-0" />

            <Field icon={<Car size={15} className="text-brand-light" />} label="Cab Type">
              <select value={cabType} onChange={e => setCabType(e.target.value)}
                className="block w-full text-[13px] font-semibold text-ink-dark bg-transparent outline-none cursor-pointer">
                {CAB_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <div className="w-px h-10 bg-surface-border shrink-0" />

            <Field icon={<Users size={15} className="text-brand-light" />} label="Passengers">
              <input type="number" min={1} max={12} value={passengers} onChange={e => setPassengers(e.target.value)}
                placeholder="How many?" className={fieldCls('passengers')} />
            </Field>
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-5">

            {/* Pickup mobile */}
            <div className="relative">
              <MobileField
                icon={isDetecting ? <Loader2 size={14} className="animate-spin text-brand-light" /> : <MapPin size={14} className="text-brand-light" />}
                label="Pickup"
              >
                <input
                  type="text"
                  value={pickup}
                  onChange={e => { setPickup(e.target.value); setActiveField('pickup') }}
                  onFocus={() => setActiveField('pickup')}
                  placeholder="Dehradun"
                  className="block w-full text-xs font-semibold text-ink-dark bg-transparent outline-none placeholder-ink-light"
                  autoComplete="off"
                />
              </MobileField>
              <SuggestionDropdown
                suggestions={pickupSug.suggestions}
                loading={pickupSug.loading}
                show={activeField === 'pickup'}
                onSelect={v => chooseSuggestion('pickup', v)}
                mobile
              />
            </div>

            {/* Drop mobile */}
            <div className="relative">
              <MobileField icon={<MapPin size={14} className={errors.dropoff ? 'text-red-400' : 'text-brand-light'} />} label="Drop">
                <input
                  type="text"
                  value={dropoff}
                  onChange={e => { setDropoff(e.target.value); setActiveField('dropoff'); setErrors(p => ({...p, dropoff: false})) }}
                  onFocus={() => setActiveField('dropoff')}
                  placeholder={errors.dropoff ? 'Required' : 'Where to?'}
                  className={`block w-full text-xs font-semibold bg-transparent outline-none placeholder-ink-light ${errors.dropoff ? 'text-red-500' : 'text-ink-dark'}`}
                  autoComplete="off"
                />
              </MobileField>
              <SuggestionDropdown
                suggestions={dropoffSug.suggestions}
                loading={dropoffSug.loading}
                show={activeField === 'dropoff'}
                onSelect={v => chooseSuggestion('dropoff', v)}
                mobile
              />
            </div>

            <MobileField icon={<CalendarDays size={14} className={errors.date ? 'text-red-400' : 'text-brand-light'} />} label="Date">
              <input type="date" value={date} min={today} onChange={e => { setDate(e.target.value); setErrors(p => ({...p, date: false})) }}
                className={`block w-full text-xs font-semibold bg-transparent outline-none [color-scheme:light] ${errors.date ? 'text-red-500' : 'text-ink-dark'}`} />
            </MobileField>

            <MobileField icon={<Car size={14} className="text-brand-light" />} label="Cab">
              <select value={cabType} onChange={e => setCabType(e.target.value)}
                className="block w-full text-xs font-semibold text-ink-dark bg-transparent outline-none cursor-pointer">
                {CAB_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </MobileField>

            <MobileField icon={<Users size={14} className="text-brand-light" />} label="Passengers">
              <input type="number" min={1} max={12} value={passengers} onChange={e => setPassengers(e.target.value)}
                placeholder="How many?"
                className="block w-full text-xs font-semibold text-ink-dark bg-transparent outline-none placeholder-ink-light" />
            </MobileField>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-dark text-white py-3.5 font-semibold text-[14px] shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book via WhatsApp
            </button>
            <button onClick={() => setShowCallback(v => !v)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-brand-dark text-brand-dark py-3.5 font-semibold text-[14px] hover:bg-brand-dark/5 transition-all">
              Request a Callback
            </button>
          </div>

          {/* Inline callback form */}
          {showCallback && (
            <div className="mt-5 pt-5 border-t border-surface-border">
              <p className="text-ink-muted text-[13px] mb-4">Enter your details — Asif will call you back.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <input type="text" value={cbName} onChange={e => { setCbName(e.target.value); setErrors(p => ({...p, cbName: false})) }}
                  placeholder="Your name"
                  className={`rounded-xl border px-4 py-2.5 text-[13px] outline-none focus:border-brand-dark ${errors.cbName ? 'border-red-400 placeholder-red-400' : 'border-surface-border'}`} />
                <input type="tel" value={cbPhone} onChange={e => { setCbPhone(e.target.value); setErrors(p => ({...p, cbPhone: false})) }}
                  placeholder="Phone number"
                  className={`rounded-xl border px-4 py-2.5 text-[13px] outline-none focus:border-brand-dark ${errors.cbPhone ? 'border-red-400 placeholder-red-400' : 'border-surface-border'}`} />
              </div>
              <button onClick={handleCallback}
                className="w-full rounded-xl bg-[#25D366] text-white py-3 font-semibold text-[14px] hover:bg-[#1DA851] transition-all">
                Send via WhatsApp
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

// ── Suggestion dropdown ───────────────────────────────────────────────────────

function SuggestionDropdown({
  suggestions, loading, show, onSelect, mobile,
}: {
  suggestions: Suggestion[]
  loading: boolean
  show: boolean
  onSelect: (value: string) => void
  mobile?: boolean
}) {
  if (!show || (!loading && suggestions.length === 0)) return null

  return (
    <ul className={`absolute left-0 top-full mt-1 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-surface-border overflow-hidden z-50 ${mobile ? 'w-64 text-xs' : 'w-72 text-[13px]'}`}>
      {loading && (
        <li className="flex items-center gap-2 px-4 py-3 text-ink-muted">
          <Loader2 size={13} className="animate-spin text-brand-light shrink-0" />
          Searching…
        </li>
      )}
      {!loading && suggestions.map((s) => (
        <li key={s.place_id}>
          <button
            type="button"
            onMouseDown={e => { e.preventDefault(); onSelect(s.display_name) }}
            className="w-full text-left px-4 py-2.5 hover:bg-surface-off flex items-start gap-2.5 transition-colors"
          >
            <MapPin size={12} className="text-brand-light shrink-0 mt-0.5" />
            <span className="text-ink-dark leading-snug">{formatSuggestion(s.display_name)}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function formatSuggestion(raw: string): string {
  const parts = raw
    .split(',')
    .map(s => s.trim())
    .filter(s => s && !/^\d+$/.test(s)) // drop pure numeric parts (pin codes)
  if (parts.length <= 2) return parts.join(', ')
  // first segment + state + country (last two)
  return [parts[0], parts[parts.length - 2], parts[parts.length - 1]].join(', ')
}

// ── Layout helpers ────────────────────────────────────────────────────────────

function Field({ icon, label, error, children, id }: { icon: React.ReactNode; label: string; error?: boolean; children: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0 px-5 py-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${error ? 'bg-red-50' : 'bg-surface-input'}`} aria-hidden="true">{icon}</div>
      <div className="min-w-0 flex-1">
        {id
          ? <label htmlFor={id} className={`block text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${error ? 'text-red-400' : 'text-ink-muted'}`}>{error ? 'Required' : label}</label>
          : <p className={`text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${error ? 'text-red-400' : 'text-ink-muted'}`}>{error ? 'Required' : label}</p>
        }
        {children}
      </div>
    </div>
  )
}

function MobileField({ icon, label, children, onClick }: { icon: React.ReactNode; label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-surface-input rounded-xl px-3 py-2.5" onClick={onClick}>
      {icon}
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider">{label}</p>
        {children}
      </div>
    </div>
  )
}
