/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        ivory: '#F7F5F1',
        ash: '#ECE9E3',
        charcoal: '#221F1C',
        'warm-gray': '#6E6A63',
        'hairline': '#DAD5CC',
        walnut: '#8A5A34',
        'walnut-hover': '#744A29',
        'walnut-light': 'rgba(138, 90, 52, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'Courier New', 'monospace']
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.25em'
      }
    },
  },
  plugins: [],
}
