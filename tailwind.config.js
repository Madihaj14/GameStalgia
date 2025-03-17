/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: '#0A192F',
          cyan: '#00E5FF',
          purple: '#8E44AD',
          yellow: '#FFD700',
          orange: '#FF8C42',
          text: '#D3D3D3'
        }
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' }
        }
      },
      animation: {
        flicker: 'flicker 2s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};