import React from 'react';
import { Search, MapPin, ChevronDown, Camera, Brush, Paintbrush, Shirt, Sparkle, Mail, UtensilsCrossed, Building2 } from 'lucide-react';
import { CITIES_LIST } from './WmgTopBar.jsx';

export const WMG_HERO_CATEGORIES = [
  { id: 'All vendors', label: 'All Categories' },
  { id: 'Venue', label: 'Wedding Venues' },
  { id: 'Photographer', label: 'Wedding Photographers' },
  { id: 'Makeup Artist', label: 'Bridal Makeup Artists' },
  { id: 'Decorator', label: 'Wedding Decorators' },
  { id: 'Bridal Wear', label: 'Bridal Wear & Lehengas' },
  { id: 'Mehndi Artist', label: 'Mehendi Artists' },
  { id: 'Invitations', label: 'Invitations & Gifts' },
  { id: 'Caterer', label: 'Catering Services' },
  { id: 'Wedding Planner', label: 'Wedding Planners' }
];

export const WMG_CATEGORIES = WMG_HERO_CATEGORIES;

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

  return (
    <div className="relative bg-[#1A1715] text-white overflow-hidden">
      
      {/* Full Dark-Overlay Mandap Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
          alt="Royal Wedding Mandap"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#1A1715]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-24 sm:pb-20 text-center">
        
        {/* Main Title: Your Wedding, Your Way */}
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Your Wedding, Your Way
        </h1>

        {/* Verbatim Subtitle */}
        <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-sans font-light">
          Find the best wedding vendors with thousands of trusted reviews
        </p>

        {/* Multi-Faith Tradition Selector Chips */}
        <div className="mt-6 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          {traditions.map((t) => {
            const isSelected = selectedFaith === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedFaith(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#E72E77] text-white shadow-lg ring-2 ring-white/30'
                    : 'bg-white/15 hover:bg-white/25 text-gray-200 border border-white/20 backdrop-blur-sm'
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dual-Dropdown Search Controller */}
        <div className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl p-2.5 sm:p-3 shadow-2xl text-left border border-gray-100 flex flex-col md:flex-row items-center gap-2">
          
          {/* Dropdown 1: Select Vendor Type */}
          <div className="w-full md:w-1/2 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Select Vendor Type
            </label>
            <div className="relative mt-0.5">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#1A1715] focus:outline-none appearance-none cursor-pointer pr-6 py-1"
              >
                {WMG_HERO_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id} className="text-gray-800">
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Dropdown 2: Destination City */}
          <div className="w-full md:w-1/2 px-3 py-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Destination City
            </label>
            <div className="relative mt-0.5">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#1A1715] focus:outline-none appearance-none cursor-pointer pr-6 py-1"
              >
                {CITIES_LIST.map((c) => (
                  <option key={c.name} value={c.name === 'All Cities' ? 'All cities' : c.name} className="text-gray-800">
                    {c.name}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-[#E72E77] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Get Started Pink CTA Button */}
          <button
            onClick={onExplore}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Get Started</span>
          </button>

        </div>

        {/* Sub-bar: Popular Searches + Photo Credits */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-300 max-w-3xl mx-auto gap-2">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span className="font-semibold text-gray-400">Popular Searches:</span>
            <button onClick={() => { setSelectedCategory('Venue'); onExplore(); }} className="hover:text-white underline decoration-dotted">4 Star & Above Hotels</button>
            <span>•</span>
            <button onClick={() => { setSelectedCategory('Venue'); onExplore(); }} className="hover:text-white underline decoration-dotted">Banquet Halls</button>
            <span>•</span>
            <button onClick={() => { setSelectedCategory('Venue'); onExplore(); }} className="hover:text-white underline decoration-dotted">Lawns</button>
          </div>

          <div className="text-[11px] text-gray-400">
            Photo Credits : <span className="font-semibold text-gray-300">Shutterdown</span>
          </div>
        </div>

      </div>

    </div>
  );
}
