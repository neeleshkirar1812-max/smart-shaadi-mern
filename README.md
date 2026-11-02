# 🏰 Smart Shaadi (SmartEvent Karo) — Ultra Advanced Luxury MERN Platform

An executive-grade, multi-faith luxury Indian wedding planning, guest experience, and vendor marketplace platform engineered on the **MERN** stack (MongoDB, Express, React, Node.js). 

Styled with Google Fonts (**Cinzel**, **Playfair Display**, **Plus Jakarta Sans**, **Outfit**), imperial wine & champagne gold palette, and powered by an **AI Marriage Ritual Concierge**.

---

## ⚡ 1-Click Launch (Windows)

Simply double-click the bundled launcher in the project root:
```text
run-smart-shaadi.bat
```
*(Or in PowerShell: `./run-smart-shaadi.ps1`)*

This script automatically verifies Node.js, launches the Express Backend (Port 5000) and Vite Frontend (Port 5173), and opens the platform in your default browser.

---

## 🌟 Master Feature Overview

### 1. 🕉️☪️☬✝️🪷 Multi-Faith & Sacred Traditions Support
* **Hindu Vivah**: Saat Phere, Vedic Mandap ceremonies, Saptapadi vows, and Godhuli Bela muhurats.
* **Muslim Nikah & Walima**: Mehr terms, Nikahnama documentation, licensed Qazi bookings, Manjha/Mehendi Sufi Qawwali, and 100% Halal catering.
* **Sikh Anand Karaj**: Gurudwara Sahib booking, Hazuri Ragi Jatha (4 Laavan), Milni garlands, and Guru Ka Langar hospitality.
* **Christian Nuptials**: Nuptial Mass, Pre-Cana sessions, choir hymns (Ave Maria), bridal processions, and champagne receptions.
* **Jain Vivah**: Auspicious Lagan Patrika Vachan, Banola & Tel-Baan purification baths, and strict Chouhar (pre-sunset pure satvik feasts).

---

### 2. 👑 Interactive Guest Suite & Advance Expansions
1. **Digital Shagun & Gift Registry**:
   - Live UPI QR Code (`ananya.kabir@oksbi`) compatible with GPay, PhonePe, Paytm, and BHIM.
   - Traditional envelopes: ₹2,100, ₹5,100, ₹11,000, ₹21,000.
   - Real-time Aashirwaad / Blessings Wall with live counter.
2. **Live Table QR Photo Drop**:
   - Guests scan the table QR standee to drop candid wedding photos straight from their phone camera.
   - Live heart/like reaction counter and royal courtyard gallery feed.
3. **Sangeet & DJ Playlist Jam**:
   - Crowd-voted wedding anthems across Baraat Dhol, Sangeet Finale, Varmala Entry, and Haldi.
   - Audio beat sample preview with animated wave equalizer.
   - **1-Click Export DJ Runsheet (.txt)** for wedding sound engineers.
4. **Public Wedding Website**:
   - Live Days/Hours/Minutes/Seconds countdown timer to wedding date.
   - Chapter-by-chapter Love Story timeline.
   - 3-Day ceremony itinerary with Google Maps links and dress codes.
   - Online RSVP registration form with dietary preferences.
5. **Banquet Seating & Floor Planner**:
   - Zone-wise layout (*Palace Terrace, Lake View Lawn, Poolside Gazebo, Main Pavilion*).
   - Real-time capacity occupancy warning bars.
   - Allocate and unseat guests directly from the confirmed RSVP list.
   - **1-Click Export Seating Chart (.txt)** for banquet stewards.
6. **Printable Royal Invoice & Estimate**:
   - Official royal crest estimate sheet.
   - Itemized service breakdown (Venue, Catering, Couture, Cinema, Decor, Officiants).
   - Taxes & GST calculations with Escrow protection assurance.
   - Print-ready CSS (`window.print()` / Save PDF).
7. **Printable Dining Table QR Standee Card**:
   - Elegant 5x7 table card format with dual QR codes for instant photo drop & digital shagun.
8. **1-Click Demo Role Switcher**:
   - Floating widget in bottom-left to instantly switch between **Couple**, **Vendor**, **Admin**, and **Guest** view without typing credentials.

---

### 3. 📋 Wedding Desk & Hospitality Manager
- **Multi-Faith Budget Engine**: Expenditure sliders, percentage breakdowns, and liquidity tracking.
- **Milestone Checklist**: Interactive tasks with celebratory confetti animations (`canvas-confetti`).
- **Hospitality & Guest List**: RSVP tracker, room allotments, and dietary flags (Pure Veg, Satvik, Jain, Halal, Continental).
- **1-Click Export Guest List to CSV / Excel**: Instant download for hotel reception and catering teams.
- **WhatsApp Digital Invites**: Generates bespoke WhatsApp invitation messages in traditional religious scripts.

---

### 4. 🤖 AI Concierge & Family Board
- **AI Budget Allocator**: Custom mathematical budget generator by guest count and city.
- **AI 3-Day Itinerary**: Bespoke schedule generator for any tradition.
- **AI Ritual Advisor**: Direct answers on marriage customs, traditions, and timings.
- **Shared Family Board**: Collaborative board with invite links (`?board=<token>`).

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Direct View |
| :--- | :--- | :--- | :--- |
| **Couple / Wedding Host** | `couple@smartshaadi.com` | `couple123` | Wedding Desk & Planner |
| **Vendor Studio Partner** | `wedmoire@smartshaadi.com` | `vendor123` | Vendor Studio Portal |
| **Platform Administrator** | `admin@smartshaadi.com` | `admin123` | Admin Control Room |
| **Public Guest** | *(No login required)* | — | Public Wedding Landing Page |

*(You can also use the **👑 Floating Demo Switcher** at the bottom-left of the screen for 1-click switching).*

---

## 🧪 Comprehensive Smoke Test Suite (49 API Tests)

To verify the entire backend API suite with live assertions:
```bash
cd backend
python smoke_test.py
```
**Output**: `49 PASSED, 0 FAILED` (100% Pass Rate).

---

## 📦 Manual Setup & Run

### Backend (Port 5000)
```bash
cd backend
npm install
node server.js
```

### Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

---

## 🏛️ Architecture & Technologies

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Canvas Confetti.
- **Google Fonts**: `Cinzel`, `Playfair Display`, `Plus Jakarta Sans`, `Outfit`.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose with resilient in-memory zero-configuration store fallback.
- **Security**: JWT authentication, role-based authorization, sanitization.
- **Brand Identity**: SmartEvent Karo & Smart Shaadi.
