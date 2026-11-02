/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stitch: {
          surface: "#FCF9F8",
          ivory: "#FAF8F6",
          card: "#FFFFFF",
          gold: "#D4AF37",
          "gold-light": "#FBF4E8",
          "gold-border": "#E8D8A6",
          rose: "#E72E76",
          "rose-deep": "#B4245D",
          "rose-wash": "#FFEBE8",
          tertiary: "#BA0F44",
          charcoal: "#1F1F1F",
          "charcoal-subtle": "#4A4A4A",
          "charcoal-muted": "#7A7A7A",
          border: "#F0ECE4",
          emerald: "#1B4332",
        },
        royal: {
          ruby: "#6B1D2F",        // Deep imperial wine / burgundy
          deepRuby: "#4E1220",    // Rich dark velvet
          lightRuby: "#8B263E",   // Lighter wine accent
          wine: "#6B1D2F",        // Wine theme key
          gold: "#D4AF37",        // Royal champagne metallic gold
          lightGold: "#FBF4E8",   // Soft champagne silk
          amber: "#9D7B32",       // Warm gold shadow
          emerald: "#1B4332",     // Deep forest emerald for verified
          lightEmerald: "#E8F5E9",
          cream: "#FAF8F6",       // Warm pearl ivory canvas
          sand: "#F0ECE4",        // Delicate warm border
          charcoal: "#1F1F1F",    // Espresso onyx text
          slate: "#4A4A4A",       // Subtle secondary text
          muted: "#7A7A7A",       // Slate muted text
          pearl: "#FAF8F6",
          rose: "#E72E76",        // Bridal coral rose
          roseDeep: "#B4245D"     // Bridal deep rose
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Manrope"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif']
      },
      boxShadow: {
        'ambient-gold': '0px 12px 32px rgba(212, 175, 55, 0.08)',
        'modal': '0px 20px 48px rgba(31, 31, 31, 0.12)',
        'card': '0 4px 20px -2px rgba(26, 23, 21, 0.06)',
        'card-hover': '0 16px 36px -4px rgba(26, 23, 21, 0.12)',
        'luxury': '0 12px 32px -4px rgba(231, 46, 118, 0.28)',
        'royal': '0 12px 36px -12px rgba(107, 29, 47, 0.22)',
        'royal-gold': '0 10px 30px -8px rgba(212, 175, 55, 0.35)'
      }
    },
  },
  plugins: [],
}
