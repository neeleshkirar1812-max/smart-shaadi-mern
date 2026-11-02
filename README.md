# 👑 WedMeGood (WMG) 1:1 Master Portal & SmartShaadi Luxury MERN Platform

> **The ultimate 1:1 production-grade replica of India's largest and most trusted wedding planning platform (WedMeGood — WMG)**, integrated with the full **SmartShaadi** luxury multi-faith wedding planning engine (React 18 + Vite + Tailwind CSS + Node.js / Express + MongoDB).

---

## 🏛️ System Architecture & Technology Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Frontend Framework** | React 18.3.1 (Single Page Architecture, Vite 5.4) |
| **Styling & Design Tokens**| Tailwind CSS 3.4, Custom CSS Variables, Glassmorphism, Micro-interactions |
| **Color Palette** | **#E72E77** (WMG Brand Rose / Ruby), **#D4AF37** (Champagne Gold), **#FAF8F5** (Alabaster Ivory Canvas), **#1A1715** (Espresso Text) |
| **Typography** | `Playfair Display` (Editorial Serif Headers), `Cinzel` (Royal Crest), `Manrope` / `Plus Jakarta Sans` (Clean Body) |
| **Iconography** | `lucide-react` (50+ scalable SVGs) |
| **Animations & Effects** | `canvas-confetti`, Backdrop blur filters, ambient gold glow shaders |
| **Backend API** | Node.js, Express.js (RESTful endpoints, JWT Authentication, Role Middleware) |
| **Database** | MongoDB / Mongoose (with 100% resilient offline in-memory fallback fixtures) |
| **Hosting & CI/CD** | Render.com Web Service (`render.yaml`), GitHub Actions auto-deploy |

---

## 📑 Complete 16 Sections Blueprint & Component Specification

### 1. Global Navigation Bar & City Selector Header (`WmgTopBar.jsx`)
- **Micro Top-Bar**:
  - "Download WMG App" quick action with phone indicator.
  - "Write a Review" authenticated trigger.
  - "WedMeGood for Business / List your business" direct vendor onboarding portal link.
- **Main Sticky Header**:
  - **Brand Wordmark**: WedMeGood / SmartShaadi crown emblem in `#E72E77` and `#D4AF37`.
  - **Interactive City Picker**: Dropdown with 11 major wedding hubs: *Delhi NCR, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Jaipur, Udaipur, Goa, Lucknow*.
  - **Mega-Menu Navigation**: Direct routing to *Venues, Vendors, Photos, Real Weddings, Blog, E-Invites, Wedsta Concierge*.
  - **Instant Search Trigger**: Keyboard shortcut (`/`) indicator to immediately trigger auto-suggest modal.
  - **Saved Wishlist Counter**: Heart icon with live badge counter synced to `localStorage`.
  - **Dual Auth CTAs**: "Log In" for couples and "Vendor Login" for partners with profile dropdown.

### 2. Hero Search Banner & Category Quick Bar (`WmgHeroSearch.jsx`)
- **Visual Backdrop**: High-contrast luxury Indian wedding mandap & couple imagery with bottom vignette gradient.
- **Multi-Faith Tradition Selector**: Filter chips for *Hindu Vivah, Muslim Nikah, Sikh Anand Karaj, Christian Nuptials, Jain Vivah*.
- **Search Controller**:
  - Dropdown 1: "Select Category" (Venues, Photographers, Bridal Makeup, Decorators, Bridal Wear, Mehndi, Invitations, Catering).
  - Dropdown 2: "Select City or Locality" (11 major destinations).
  - Search Keyword Field: Real-time query matching.
  - Instant CTA: "Find Vendors" button.
- **Category Icon Strip**: 8 high-converting icon buttons (*Banquets & Venues, Photographers, Bridal Makeup, Wedding Decorators, Bridal Wear, Mehndi Artists, Cards & E-Invites, Catering*).

### 3. Popular Venue Searches & Filter Pills (`WmgVenueFilters.jsx`)
- 5 instant sub-filter chips with active selection states:
  - *4-Star & 5-Star Luxury Hotels*
  - *Lush Green Wedding Lawns*
  - *Palace & Heritage Forts (Rajasthan)*
  - *Intimate Farmhouses & Villas*
  - *Banquet Halls under ₹1,500/plate*

### 4. WedMeGood Genie / Wedsta Concierge Banner (`WmgGenieBanner.jsx`)
- **Value Proposition**: "Get a Dedicated Personal Wedding Manager for 100% Free".
- **Interactive Lead Form**: Couple Name, 10-digit Indian Mobile Number (`+91` with regex validation), Wedding Date, Preferred City.
- **Trust Badges**: *30,000+ Assisted Bookings • 100% Free Consultation • Guaranteed Lowest Price Shield*.
- **Confirmation State**: Automatic celebration confetti burst and callback confirmation modal.

### 5. Top Vendor Categories Visual Grid (`WmgTopCategoriesGrid.jsx`)
- 8-card visual photo grid with real-world vendor counts:
  1. *Bridal Wear & Lehengas* (6,420+ Boutiques & Designers)
  2. *Wedding Photographers* (8,150+ Cinematic & Candid Artists)
  3. *Bridal Makeup Artists* (9,300+ Airbrush & HD Artists)
  4. *Wedding Venues & Palaces* (14,200+ Banquets, Lawns & Palaces)
  5. *Bridal Mehndi Artists* (4,100+ Traditional & Arabic Artists)
  6. *Wedding Decorators* (3,800+ Theme & Floral Designers)
  7. *Groom Wear & Sherwanis* (2,900+ Sherwani & Tuxedo Designers)
  8. *Wedding Planners* (2,100+ Turnkey Coordinators)

### 6. Popular Cities & Heritage Destinations (`WmgPopularCities.jsx`)
- Circular & card explorer for India's top 8 wedding hubs with venue counts and 1-click filter activation:
  - *Delhi NCR • Mumbai • Bangalore • Jaipur • Udaipur • Goa • Hyderabad • Jim Corbett*.

### 7. Featured & WedMeGood Verified Gold Vendors (`WmgFeaturedVendors.jsx`)
- Verified partner cards with:
  - "WMG Wedsta Verified" gold shield badge.
  - Pricing transparency: Per Plate (Veg & Non-Veg) and Banquet Capacity.
  - Authenticated rating: 4.8★ - 4.9★ with authenticated review counts.
  - Direct Action triggers: "Send Inquiry" (opens booking modal) and "Chat on WhatsApp" (prefilled luxury inquiry message).

### 8. Real Wedding Stories — WMG Real Weddings (`WmgRealWeddings.jsx`)
- Editorial photo cards of actual couples:
  - *Ananya & Kabir* (The Leela Palace, Udaipur • ₹1.5 Cr+ • 350 Guests)
  - *Simran & Harman* (Forest Hill Resort, Chandigarh • ₹85L • 450 Guests)
  - *Zoya & Rehan* (Taj Falaknuma Palace, Hyderabad • ₹1.8 Cr • 500 Guests)
  - *Priyanka & David* (Alila Diwa, Goa • ₹70L • 200 Guests)
- **Interactive Story & Credits Reader Modal**: Comprehensive vendor credits (Venue, Photography, Makeup, Decor, Attire).

### 9. Curated Photo Gallery & Inspiration Feed (`WmgInspirationGallery.jsx`)
- Pinterest-style masonry grid with visual discovery tags:
  - *All Inspiration • Lehengas • Decor • Mehndi • Portraits*.
- Hover "Save to Wishlist" bookmark heart with `localStorage` persistence and header counter sync.
- Full-screen photo inspection modal with tagged designer credits.

### 10. Official WedMeGood Mobile App Download Banner (`WmgAppDownloadBanner.jsx`)
- Multi-device preview illustration (iPhone mockup with live RSVP, checklist, and vendor chat previews).
- Active telephone field: "Send App Link via SMS (+91)" with instant confirmation.
- Official Apple App Store and Google Play Store badges.

### 11. WMG Editorial & Wedding Journal (`WmgEditorialJournal.jsx`)
- Expert guides written by fashion and wedding editors:
  1. *"Top 10 Sabyasachi & Manish Malhotra Lehengas of 2026: Trends, Fabrics & Prices"*
  2. *"How to Plan a 3-Day Luxury Destination Wedding in Rajasthan Under 40 Lakhs"*
  3. *"Vedic Shubh Muhurat Dates & Auspicious Timings for Weddings (2026–2027)"*
- Interactive article reader drawer with styling.

### 12. Digital Wedding Planning Tools Suite (`WmgPlanningToolsSuite.jsx`)
- 4 interactive tool cards linking directly to platform desks:
  1. **Wedding Checklist**: 120+ pre-scheduled tasks from 12 months down to wedding day.
  2. **Wedding Budget Calculator**: Dynamic % corpus allocation with anti-fraud Price Shield.
  3. **Guest List & Seating Atelier**: Clan balance, dietary matrices & CAD table maps.
  4. **Digital E-Invites & Standees**: WhatsApp video cards and printable dining standees.

### 13. Destination Wedding Showcase (`WmgDestinationShowcase.jsx`)
- Top destination packages with estimated budget brackets and venue counts:
  - *Udaipur* (Lakeside Palaces • ₹45L - ₹1.5 Cr)
  - *Goa* (Beachfront Resorts • ₹30L - ₹85L)
  - *Jaipur* (Royal Havelis & Forts • ₹35L - ₹1.2 Cr)
  - *Mussoorie / Jim Corbett* (Mountain Vows • ₹25L - ₹65L)
  - *International* (Thailand, Bali, Dubai • ₹60L - ₹2.5 Cr)

### 14. Customer Trust, Social Proof & Media Mentions (`WmgTrustSocialProof.jsx`)
- Platform Metrics: *2.5M+ Registered Couples • 50,000+ Verified Vendors • 4.8★ App Rating • ₹0 Free Concierge*.
- Media Logos: *Vogue India, Forbes, The Economic Times, Harper's Bazaar Bride, Business Standard*.
- Verified couple testimonials with authentic review ratings.

### 15. Vendor Partner Onboarding ("Grow Your Wedding Business") (`WmgVendorOnboarding.jsx`)
- Partner ecosystem showcase targeting wedding service providers.
- Key benefits: *Direct High-Intent Leads, Verified WMG Wedsta Badge, Studio CRM & Telemetry, 0% Commission Model*.
- Action CTA: "Register as a Vendor for Free" (opens AuthModal in vendor registration mode).

### 16. Comprehensive Mega-Footer & SEO Directory (`WmgMegaFooter.jsx`)
- Multi-column link clusters:
  - **Wedding Venues by City**: Delhi NCR, Mumbai, Bangalore, Jaipur, Udaipur, Goa, Hyderabad.
  - **Top Vendors by City**: Photographers, Makeup, Decorators, Mehndi, Bridal Wear, Caterers, Planners.
  - **Sacred Traditions**: Hindu Vivah, Muslim Nikah, Sikh Anand Karaj, Christian Nuptials, Jain Vivah.
  - **Planning Tools**: Checklist, Budget Calculator, RSVP Tracker, Table Seating, E-Invites, Digital Shagun.
  - **24/7 Helpline & Concierge**: +91 98290 12345 • WhatsApp Desk • `support@wedmegood.com`.

---

## ⚡ Auxiliary Interaction Modals & Features

1. **Instant Search Modal (`WmgSearchModal.jsx`)**:
   - Press `/` anywhere on the keyboard to immediately launch the auto-suggest search console.
   - Live matching across verified vendors, categories, and top destinations.
2. **Saved Wishlist & Shortlist Drawer (`WmgWishlistModal.jsx`)**:
   - Displays all saved inspiration photos and shortlisted vendor cards.
   - Synchronized with browser `localStorage`.
   - "Inquire All with Free Genie" 1-click batch lead trigger.
3. **Dining Table QR Standee Modal (`PrintTableStandeeModal.jsx`)**:
   - Print-ready 5x7 table card format with dual QR codes for live photo drop and 0% UPI shagun.
4. **Royal Estimate & Invoice Modal (`PrintInvoiceModal.jsx`)**:
   - Itemized invoice generator with GST and dual-signatory escrow validation.

---

## 🚀 Live Production & Deployment Guide

### Live Cloud Production URL:
- **Render Production App**: [https://smart-shaadi-mern.onrender.com/](https://smart-shaadi-mern.onrender.com/)
- **Live Health Status**: [https://smart-shaadi-mern.onrender.com/api/health](https://smart-shaadi-mern.onrender.com/api/health) (`HTTP 200 OK`)
- **GitHub Repository**: [https://github.com/neeleshkirar1812-max/smart-shaadi-mern](https://github.com/neeleshkirar1812-max/smart-shaadi-mern)

### Deploying Your Own Instance to Render:
1. Fork or push to your GitHub account (`smart-shaadi-mern`).
2. Visit [Render Dashboard](https://dashboard.render.com).
3. Connect repo — Render auto-detects `render.yaml`:
   - **Build**: `npm run build`
   - **Start**: `npm start`
   - **Health**: `/api/health`
4. Deployed in under 3 minutes!

---

## 💻 Local Development & Windows 1-Click Launch

### Option 1: 1-Click Windows Batch Launcher
Double click:
```cmd
run-smart-shaadi.bat
```
*(Or in PowerShell: `./run-smart-shaadi.ps1`)*

### Option 2: Manual Terminal Commands
```bash
# 1. Install dependencies
npm run install-all

# 2. Run backend and frontend concurrently
npm run dev

# 3. Access in browser
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000/api/health
```

### Option 3: Backend Smoke Test Suite
```bash
python backend/smoke_test.py
# 49 Passed, 0 Failed
```

---

## 🔒 Demo Credentials for Instant Exploration

| Role | Email | Password | Primary Workspace |
| :--- | :--- | :--- | :--- |
| **Couple (Host)** | `couple@smartshaadi.com` | `couple123` | Wedding Desk, Budget Planner, Guest RSVP, CAD Seating |
| **Vendor (Studio)** | `wedmoire@smartshaadi.com` | `vendor123` | Vendor Studio, Inquiries, Quotes, Muhurat Calendar |
| **Admin (Control)** | `admin@smartshaadi.com` | `admin123` | Control Room, Dual-Signatory Escrow Release, KYC Vetting |

---

## 📜 Copyright & Licenses
© 2026 **WedMeGood (SmartShaadi Master Portal Edition)**. Built for celebrating love across all Indian faiths and sacred traditions.
