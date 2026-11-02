/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          ruby: "#6B1D2F",        // Deep imperial wine / burgundy
          deepRuby: "#4E1220",    // Rich dark velvet
          lightRuby: "#8B263E",   // Lighter wine accent
          gold: "#C5A059",        // Refined champagne metallic gold
          lightGold: "#F3E7C4",   // Soft champagne silk
          amber: "#9D7B32",       // Warm gold shadow
          emerald: "#1B4332",     // Deep forest emerald for verified
          lightEmerald: "#E8F5E9",
          cream: "#FAF8F5",       // Warm pearl ivory canvas
          sand: "#EFE8DC",        // Delicate warm border
          charcoal: "#1A1715",    // Espresso onyx text
          slate: "#3A3532",       // Subtle secondary text
          muted: "#78716C"        // Slate muted text
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif']
      },
      boxShadow: {
        'royal': '0 12px 36px -12px rgba(107, 29, 47, 0.22)',
        'royal-gold': '0 10px 30px -8px rgba(197, 160, 89, 0.35)',
        'card': '0 4px 20px -2px rgba(26, 23, 21, 0.06)',
        'card-hover': '0 16px 36px -4px rgba(26, 23, 21, 0.12)',
        'luxury': '0 20px 40px -15px rgba(107, 29, 47, 0.25)'
      }
    },
  },
  plugins: [],
}
