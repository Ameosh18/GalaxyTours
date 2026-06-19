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
        brand: {
          50:   '#f0fdf4',
          100:  '#dcfce7',
          200:  '#bbf7d0',
          500:  '#22c55e',
          600:  '#16a34a',
          700:  '#15803d',
          800:  '#166534',
          900:  '#14532d',
          dark: '#1B4332',   // primary dark green — buttons, headings
          mid:  '#2D6A4F',   // medium green — eyebrow, accents
          sage: '#40916C',   // sage — hover states
          mist: '#74C69D',   // light green — subtle accents
        },
        surface: {
          white:  '#FFFFFF',
          off:    '#F8FAF9',
          border: '#E2E8E4',
          input:  '#F1F5F2',
        },
        ink: {
          dark:  '#0C2A1A',   // near-black heading text
          body:  '#374151',   // body text
          muted: '#6B7280',   // secondary text
          light: '#9CA3AF',   // placeholder text
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'nav':        '0 4px 24px rgba(0,0,0,0.08)',
        'card':       '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
        'bar':        '0 8px 40px rgba(0,0,0,0.18)',
        'btn':        '0 4px 12px rgba(27,67,50,0.35)',
        'btn-hover':  '0 6px 20px rgba(27,67,50,0.45)',
      },
      animation: {
        'slide-up':   'slideUp 0.5s ease-out forwards',
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'orbit':      'orbit 8s linear infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
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
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%':      { transform: 'scale(1.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
