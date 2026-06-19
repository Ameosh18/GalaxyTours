import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        galaxy: {
          bg:     '#0B101A',
          card:   '#151C28',
          green:  '#7ee8a6',
          forest: '#428643',
          text:   '#E2E8F0',
          muted:  '#94A3B8',
          border: '#1E2A3A',
          glow:   'rgba(126,232,166,0.25)',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-galaxy': 'linear-gradient(135deg, #0B101A 0%, #0f1726 50%, #0B101A 100%)',
        'gradient-green':  'linear-gradient(135deg, #7ee8a6 0%, #428643 100%)',
        'gradient-card':   'linear-gradient(145deg, rgba(21,28,40,0.9) 0%, rgba(11,16,26,0.95) 100%)',
      },
      boxShadow: {
        'green-glow':    '0 0 20px rgba(126,232,166,0.3), 0 0 40px rgba(126,232,166,0.1)',
        'green-glow-sm': '0 0 10px rgba(126,232,166,0.2)',
        'card':          '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'twinkle':      'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'twinkle-fast': 'twinkle 2s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'slide-up':     'slideUp 0.4s ease-out forwards',
        'fade-in':      'fadeIn 0.6s ease-out forwards',
        'orbit':        'orbit 8s linear infinite',
        'pulse-ring':   'pulseRing 2s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.2', transform: 'scale(0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(8px) rotate(0deg)' },
          to:   { transform: 'rotate(360deg) translateX(8px) rotate(-360deg)' },
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%':      { transform: 'scale(1.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
