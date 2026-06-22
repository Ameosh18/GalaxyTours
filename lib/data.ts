export interface Route {
  id: string
  name: string
  image: string
  travelTime: string
  startingPrice: number
  distance: string
  highlight: string
  asifTip: string
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
  bestFor: string
  image?: string
}

export const ROUTES: Route[] = [
  {
    id: 'manali',
    name: 'Manali',
    image: '/images/manali.jpg',
    travelTime: '10–12 hrs',
    startingPrice: 7500,
    distance: '510 km',
    highlight: 'Valley of the Gods',
    asifTip: 'Book SUV for Rohtang Pass. I\'ve done this route 200+ times.',
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    image: '/images/mussoorie.jpg',
    travelTime: '4–5 hrs',
    startingPrice: 2800,
    distance: '290 km',
    highlight: 'Queen of Hills',
    asifTip: 'Best October to March. I know every shortcut.',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    image: '/images/rishikesh.jpg',
    travelTime: '5–6 hrs',
    startingPrice: 3200,
    distance: '240 km',
    highlight: 'Yoga Capital of the World',
    asifTip: 'Early morning start beats the pilgrim traffic.',
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    image: '/images/haridwar.jpg',
    travelTime: '4–5 hrs',
    startingPrice: 2600,
    distance: '210 km',
    highlight: 'Gateway to the Gods',
    asifTip: 'Plan around Ganga Aarti timing for the full experience.',
  },
  {
    id: 'chopta',
    name: 'Chopta',
    image: '/images/chotpa.jpg',
    travelTime: '7–8 hrs',
    startingPrice: 4500,
    distance: '390 km',
    highlight: 'Mini Switzerland of India',
    asifTip: 'Snow possible Nov–Feb. SUV is the safe choice.',
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
    bestFor: 'Budget solo or couple trips on shorter routes.',
    image: '/images/hatchback.png',
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
    bestFor: 'Families and small groups on most Himalayan routes.',
    image: '/images/sedan.png',
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
    bestFor: 'Large groups, snow routes, or luggage-heavy trips.',
    image: '/images/suv.png',
  },
]

export const WHATSAPP_NUMBER = '918433130989'
export const PHONE_NUMBER = '+91 84331 30989'
export const PHONE_RAW = '+918433130989'
