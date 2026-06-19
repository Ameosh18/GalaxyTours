export interface Route {
  id: string
  name: string
  image: string
  travelTime: string
  startingPrice: number
  distance: string
  highlight: string
}

export interface Vehicle {
  id: string
  type: 'Hatchback' | 'Sedan' | 'SUV'
  models: string[]
  passengers: number
  luggage: string
  hillReady: boolean
  pricePerKm: number
  emoji: string
}

export const ROUTES: Route[] = [
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    image: '/images/mussoorie.jpg',
    travelTime: '4–5 hrs',
    startingPrice: 2800,
    distance: '290 km',
    highlight: 'Queen of Hills',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    image: '/images/rishikesh.jpg',
    travelTime: '5–6 hrs',
    startingPrice: 3200,
    distance: '240 km',
    highlight: 'Yoga Capital of the World',
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    image: '/images/haridwar.jpg',
    travelTime: '4–5 hrs',
    startingPrice: 2600,
    distance: '210 km',
    highlight: 'Gateway to the Gods',
  },
  {
    id: 'chopta',
    name: 'Chopta',
    image: '/images/chopta.jpg',
    travelTime: '7–8 hrs',
    startingPrice: 4500,
    distance: '390 km',
    highlight: 'Mini Switzerland of India',
  },
]

export const VEHICLES: Vehicle[] = [
  {
    id: 'hatchback',
    type: 'Hatchback',
    models: ['Maruti Swift', 'Hyundai i20'],
    passengers: 4,
    luggage: '1–2 small bags',
    hillReady: false,
    pricePerKm: 12,
    emoji: '🚗',
  },
  {
    id: 'sedan',
    type: 'Sedan',
    models: ['Maruti Dzire', 'Toyota Etios'],
    passengers: 4,
    luggage: '2 medium bags',
    hillReady: true,
    pricePerKm: 14,
    emoji: '🚕',
  },
  {
    id: 'suv',
    type: 'SUV',
    models: ['Toyota Innova', 'Maruti Ertiga'],
    passengers: 7,
    luggage: '4 large bags',
    hillReady: true,
    pricePerKm: 18,
    emoji: '🚙',
  },
]

export const WHATSAPP_NUMBER = '919876543210'
export const PHONE_NUMBER = '+91 98765 43210'
export const PHONE_RAW = '+919876543210'

export const TRUST_SIGNALS = [
  { label: 'Hill-Expert Drivers', icon: '🏔️', desc: '10+ years mountain driving experience' },
  { label: 'Sanitized Cabs', icon: '✨', desc: 'Deep cleaned before every trip' },
  { label: 'GPS Tracked', icon: '📍', desc: 'Real-time tracking for your safety' },
  { label: '24/7 Support', icon: '📞', desc: 'Always available, day or night' },
]
