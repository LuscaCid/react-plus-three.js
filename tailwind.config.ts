import type { Config } from 'tailwindcss'

/** Every color is a token defined in src/styles/tokens.css as RGB channels,
 *  so a single utility class works in both themes with no `dark:` variant. */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: rgb('bg'),
        'bg-elev': rgb('bg-elev'),
        surface: rgb('surface'),
        line: rgb('line'),
        'line-strong': rgb('line-strong'),
        ink: rgb('ink'),
        'ink-muted': rgb('ink-muted'),
        'ink-subtle': rgb('ink-subtle'),
        brand: {
          300: rgb('brand-300'),
          400: rgb('brand-400'),
          500: rgb('brand-500'),
          600: rgb('brand-600'),
        },
        accent: {
          300: rgb('accent-300'),
          400: rgb('accent-400'),
          500: rgb('accent-500'),
          600: rgb('accent-600'),
        },
        beam: rgb('beam'),
        success: rgb('success'),
        danger: rgb('danger'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        glass: '1rem',
        'glass-lg': '1.5rem',
      },
      maxWidth: {
        content: 'var(--content-w)',
      },
      keyframes: {
        'aurora-a': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(6vw,-4vh,0) scale(1.18)' },
        },
        'aurora-b': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.1)' },
          '50%': { transform: 'translate3d(-7vw,5vh,0) scale(0.92)' },
        },
        'aurora-c': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(0.95)' },
          '50%': { transform: 'translate3d(4vw,6vh,0) scale(1.25)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-24' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'aurora-a': 'aurora-a 34s ease-in-out infinite',
        'aurora-b': 'aurora-b 42s ease-in-out infinite',
        'aurora-c': 'aurora-c 38s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'flow-dash': 'flow-dash 1s linear infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
