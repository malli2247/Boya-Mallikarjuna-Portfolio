/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050609',
        surface: {
          darkest: '#050609',
          dark: '#08090D',
          card: '#0B0C10',
          panel: 'rgba(20, 20, 24, 0.75)',
        },
        pink: {
          electric: '#FF1768',
          neon: '#FF1744',
        },
        purple: {
          neon: '#8B5CF6',
          electric: '#7C4DFF',
          dark: '#5B21B6',
        },
        blue: {
          neon: '#3B82F6',
          dark: '#1D4ED8',
        },
        cyan: {
          electric: '#06D6FF',
          neon: '#00E5FF',
          glow: '#22D3EE',
        },
        muted: '#9CA3AF',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass-nav': '0 10px 40px rgba(0, 0, 0, 0.35)',
        'pink-glow': '0 0 30px rgba(255, 23, 104, 0.45)',
        'purple-glow': '0 0 30px rgba(139, 92, 246, 0.45)',
        'cyan-glow': '0 0 30px rgba(6, 214, 255, 0.45)',
        'card-glow': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 35px -10px rgba(139, 92, 246, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
