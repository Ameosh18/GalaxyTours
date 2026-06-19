'use client'

import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Custom Trip', href: '#custom-trip' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-card' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          className="flex items-center gap-2 group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Planet SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="7" fill="#428643" />
              <ellipse cx="16" cy="16" rx="14" ry="5" stroke="#7ee8a6" strokeWidth="1.5" fill="none" />
              <circle
                cx="16"
                cy="16"
                r="2.5"
                fill="#7ee8a6"
                className="animate-orbit"
                style={{ transformOrigin: '16px 16px' }}
              />
              <circle cx="16" cy="7" r="1.5" fill="#7ee8a6" opacity="0.8" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-galaxy-text group-hover:text-galaxy-green transition-colors">
            Galaxy Travels
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-galaxy-muted hover:text-galaxy-text text-sm font-medium transition-colors hover:text-galaxy-green"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNavClick('#home')}
          className="hidden md:flex items-center gap-1.5 rounded-full bg-galaxy-forest text-white px-5 py-2 text-sm font-semibold hover:shadow-green-glow hover:bg-galaxy-forest/90 transition-all"
        >
          Book a Cab <ArrowRight size={14} />
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-galaxy-text p-1"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden glass border-t border-galaxy-border"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-3 py-3 text-galaxy-muted hover:text-galaxy-green hover:bg-galaxy-card/60 rounded-lg text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNavClick('#home')}
                  className="w-full flex items-center justify-center gap-1.5 rounded-full bg-galaxy-forest text-white px-5 py-3 text-sm font-semibold"
                >
                  Book a Cab <ArrowRight size={14} />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
