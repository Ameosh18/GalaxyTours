'use client'

import { useEffect, useState } from 'react'

interface Star {
  id: number
  top: string
  left: string
  size: number
  delay: string
  speed: string
  opacity: number
}

const SPEEDS = ['animate-twinkle', 'animate-twinkle-slow', 'animate-twinkle-fast']

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 160 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      speed: SPEEDS[Math.floor(Math.random() * SPEEDS.length)],
      opacity: Math.random() * 0.6 + 0.4,
    }))
    setStars(generated)
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className={`absolute rounded-full bg-white ${s.speed}`}
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  )
}
