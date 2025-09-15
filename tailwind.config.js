/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Primary Black/Gray shades
        'dark-bg': '#000000',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#2a2a2a',
        
        // Primary Blue shades (bleu dur)
        'primary-blue': '#1e40af',
        'primary-blue-light': '#3b82f6',
        'primary-blue-dark': '#1e3a8a',
        
        // Accent Violet shades
        'accent-violet': '#7c3aed',
        'accent-violet-light': '#a855f7',
        'accent-violet-dark': '#5b21b6',
        
        // White variations
        'white-pure': '#ffffff',
        'white-soft': '#f8fafc',
        
        // Functional colors (keep existing)
        'accent': '#14b8a6', // For legacy compatibility
        'accent-light': '#2dd4bf'
      }
    },
  },
  plugins: [],
}
