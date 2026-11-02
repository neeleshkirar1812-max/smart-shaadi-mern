import React from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  Camera, 
  Sparkle, 
  Brush, 
  Shirt, 
  Paintbrush, 
  Mail, 
  UtensilsCrossed, 
  Building2, 
  Crown 
} from 'lucide-react';
import { CITIES_LIST } from './WmgTopBar.jsx';

export const WMG_CATEGORIES = [
  { id: 'All vendors', label: 'All Categories', icon: Crown, count: '50,000+' },
  { id: 'Venue', label: 'Banquets & Venues', icon: Building2, count: '14,200+' },
  { id: 'Photographer', label: 'Photographers', icon: Camera, count: '8,150+' },
  { id: 'Makeup Artist', label: 'Bridal Makeup', icon: Brush, count: '9,300+' },
  { id: 'Decorator', label: 'Wedding Decorators', icon: Paintbrush, count: '3,800+' },
  { id: 'Bridal Wear', label: 'Bridal Wear & Lehengas', icon: Shirt, count: '6,420+' },
  { id: 'Mehndi Artist', label: 'Mehndi Artists', icon: Sparkle, count: '4,100+' },
  { id: 'Invitations', label: 'Cards & E-Invites', icon: Mail, count: '2,900+' },
  { id: 'Caterer', label: 'Catering & Chaat', icon: UtensilsCrossed, count: '3,200+' }
];

export default function WmgHeroSearch({
  selectedFaith,
  setSelectedFaith,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  onExplore
}) {
  const traditions = [
    { id: 'All Traditions', label: 'All Traditions', emoji: '✨' },
    { id: 'Hindu', label: 'Hindu Vivah', emoji: '🕉️' },
    { id: 'Muslim', label: 'Muslim Nikah', emoji: '☪️' },
    { id: 'Sikh', label: 'Sikh Anand Karaj', emoji: '☬' },
    { id: 'Christian', label: 'Christian Nuptials', emoji: '✝️' },
    { id: 'Jain', label: 'Jain Vivah', emoji: '🪷' }
  ];

  const handleCategoryIconClick = (catId) => {
    setSelectedCategory(catId);
    if (onExplore) onExplore();
  };

  return (
    <div className="relative bg-[#1A1715] text-white overflow-hidden">
      
      {/* High-Resolution Luxury Indian Wedding Backdrop with Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
          alt="Royal Indian Wedding Mandap & Couple"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-90 contrast-110 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1715]/90 via-[#1A1715]/60 to-[#1A1715]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E72E77]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
        
        {/* Crown Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>India&apos;s Most Trusted Wedding Planning Platform</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Find Your Trusted Wedding Vendors & <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9EC4] via-[#FFE088] to-[#D4AF37]">
            Royal Heritage Venues
          </span>
        </h1>

        <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-sans font-light">
          Shortlist from 50,000+ verified wedding banquets, candid photographers, bridal makeup artists, and royal decorators across India.
        </p>

        {/* Multi-Faith Tradition Selector Chips */}
        <div className="mt-6 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {traditions.map((t) => {
            const isSelected = selectedFaith === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedFaith(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#E72E77] text-white shadow-lg shadow-[#E72E77]/40 ring-2 ring-white/30'
                    : 'bg-white/15 hover:bg-white/25 text-gray-200 border border-white/20 backdrop-blur-sm'
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* SECTION 2 SEARCH CONTROLLER BAR (Dual Dropdown + Search + CTA) */}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl p-2.5 sm:p-3 shadow-2xl text-left border border-gray-100 flex flex-col md:flex-row items-center gap-2">
          
          {/* Dropdown 1: Select Category */}
          <div className="w-full md:w-1/3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Vendor Category
            </label>
            <div className="relative mt-0.5">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#1A1715] focus:outline-none appearance-none cursor-pointer pr-6 py-1"
              >
                {WMG_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id} className="text-gray-800">
                    {c.label} ({c.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Dropdown 2: Select City or Locality */}
          <div className="w-full md:w-1/3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              City / Destination
            </label>
            <div className="relative mt-0.5">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#1A1715] focus:outline-none appearance-none cursor-pointer pr-6 py-1"
              >
                {CITIES_LIST.map((c) => (
                  <option key={c.name} value={c.name === 'All Cities' ? 'All cities' : c.name} className="text-gray-800">
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-[#E72E77] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Keywords Field */}
          <div className="w-full md:w-1/3 px-3 py-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Keywords or Venue Name
            </label>
            <div className="relative mt-0.5 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onExplore(); }}
                placeholder="e.g. The Leela, Taj, Candid..."
                className="w-full bg-transparent font-medium text-xs sm:text-sm text-[#1A1715] placeholder-gray-400 focus:outline-none py-1"
              />
            </div>
          </div>

          {/* Instant CTA Button */}
          <button
            onClick={onExplore}
            className="w-full md:w-auto px-7 py-3.5 rounded-2xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Find Vendors</span>
          </button>

        </div>

        {/* SECTION 2: CATEGORY ICON STRIP (8 High-Converting Icon Buttons) */}
        <div className="mt-10 pt-8 border-t border-white/10 max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
            Popular Vendor Searches
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {WMG_CATEGORIES.slice(1).map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryIconClick(cat.id)}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 group text-center ${
                    isActive 
                      ? 'bg-white text-[#E72E77] shadow-xl scale-105' 
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                    isActive ? 'bg-[#FFF0F5] text-[#E72E77]' : 'bg-white/15 text-[#D4AF37]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">
                    {cat.label.split('&')[0]}
                  </span>
                  <span className="text-[9px] text-gray-300 font-medium mt-0.5 opacity-80">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
