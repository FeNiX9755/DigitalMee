/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Caveat"', 'cursive'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#fdf8f2',
          100: '#f9f0e6',
          200: '#f0e4d4',
          300: '#e8d5c0',
        },
        ink: {
          DEFAULT: '#3d2f28',
          soft: '#6b5a52',
          faint: '#9a8b82',
        },
        blush: '#e8b4b8',
        rose: '#c97b84',
        dusk: '#7d6b8a',
      },
      boxShadow: {
        polaroid: '0 4px 24px -4px rgba(61, 47, 40, 0.12), 0 2px 8px -2px rgba(61, 47, 40, 0.08)',
        card: '0 8px 40px -8px rgba(61, 47, 40, 0.18)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(201, 123, 132, 0.45)',
          },
          '50%': {
            transform: 'scale(1.03)',
            boxShadow: '0 0 0 14px rgba(201, 123, 132, 0)',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
