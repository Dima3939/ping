/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FFFDF5',
          dark: '#121214',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1C1C21',
        },
        card: {
          light: '#FFFFFF',
          dark: '#24242C',
        },
        brutal: {
          black: '#121212',
          coral: '#FF5A36',
          'coral-hover': '#FF421A',
          mint: '#00D2B4',
          'mint-hover': '#00B89D',
          yellow: '#FFD13B',
          'yellow-hover': '#ECC028',
          lavender: '#C4B5FD',
          blue: '#3B82F6',
          pink: '#F472B6',
        },
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #121212',
        'brutal': '4px 4px 0px #121212',
        'brutal-lg': '6px 6px 0px #121212',
        'brutal-xl': '8px 8px 0px #121212',
        'brutal-dark-sm': '2px 2px 0px #000000',
        'brutal-dark': '4px 4px 0px #000000',
        'brutal-dark-lg': '6px 6px 0px #000000',
      },
      borderWidth: {
        '3': '2.5px',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        pop: 'pop 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        wiggle: 'wiggle 0.3s ease-in-out',
        pulseSubtle: 'pulseSubtle 2s infinite',
      }
    },
  },
  plugins: [],
}
