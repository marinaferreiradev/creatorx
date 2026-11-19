/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0866F5', // Azul elétrico principal
          bright: '#008CFF', // Azul vibrante secundário
          navy: '#061225', // Azul-marinho extremamente escuro
          ink: '#030914', // Preto azulado
          muted: '#94A3B8', // Cinza para textos secundários
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1200px' },
      boxShadow: {
        glow: '0 0 0 1px rgba(8,102,245,.35), 0 10px 40px -10px rgba(8,102,245,.55)',
      },
    },
  },
  plugins: [],
};
