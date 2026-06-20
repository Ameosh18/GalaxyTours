'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'Services',    href: '#services' },
  { label: 'Custom Trip', href: '#custom-trip' },
  { label: 'Pricing',     href: '#pricing' },
  { label: 'Contact',     href: '#contact' },
]

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    // no scroll handler needed for simplified navbar
  }, [])

  const handleNav = (href: string, label: string) => {
    setActiveLink(label)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto glass-nav shadow-nav rounded-2xl transition-all duration-300">
        <nav className="px-5 h-[60px] flex items-center justify-between gap-6">

          {/* Logo — always visible */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home', 'Home') }}
            className="flex items-center gap-2 shrink-0"
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="7" fill="#1B4332" />
              <ellipse cx="17" cy="17" rx="15" ry="5.5" stroke="#2D6A4F" strokeWidth="1.8" fill="none" />
              <circle cx="17" cy="8" r="2.5" fill="#40916C" className="animate-orbit" style={{ transformOrigin: '17px 17px' }} />
              <circle cx="4"  cy="17" r="1.5" fill="#74C69D" opacity="0.7" />
              <path d="M17 10 L17 17 L22 17" stroke="#74C69D" strokeWidth="0.8" strokeOpacity="0.5" />
            </svg>
            <span className="font-display font-bold text-[17px] text-ink-dark tracking-tight">
              Galaxy Travels
            </span>
          </a>

          {/* Desktop nav links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href, link.label)}
                  className={`text-[13.5px] font-medium transition-colors pb-0.5 ${
                    activeLink === link.label
                      ? 'text-ink-dark border-b-2 border-brand-dark'
                      : 'text-ink-muted hover:text-ink-dark'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — hidden on mobile */}
          <button
            onClick={() => handleNav('#home', 'Home')}
            className="hidden md:flex items-center gap-1.5 rounded-full bg-brand-dark text-white px-5 py-2.5 text-[13.5px] font-semibold shadow-btn hover:shadow-btn-hover hover:bg-brand-mid transition-all shrink-0"
          >
            Book a Cab <ArrowRight size={14} />
          </button>
        </nav>
      </div>
    </header>
  )
}
