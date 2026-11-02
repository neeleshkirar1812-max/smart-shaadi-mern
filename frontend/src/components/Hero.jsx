import React from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, Award, Crown, Check } from 'lucide-react';

export default function Hero({ 
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
  const faiths = [
    { id: 'All Traditions', label: 'All Traditions', emoji: '✨' },
    { id: 'Hindu', label: 'Hindu Vivah', emoji: '🕉️' },
    { id: 'Muslim', label: 'Muslim Nikah', emoji: '☪️' },
    { id: 'Sikh', label: 'Sikh Anand Karaj', emoji: '☬' },
    { id: 'Christian', label: 'Christian Nuptials', emoji: '✝️' },
    { id: 'Jain', label: 'Jain Vivah', emoji: '🪷' },
    { id: 'Interfaith', label: 'Interfaith & Fusion', emoji: '💫' }
  ];

  const categories = [
    "All vendors", 
    "Venue", 
    "Pandit / Officiant", 
    "Photographer", 
    "Caterer", 
    "Decorator", 
    "Mehndi Artist", 
    "Bridal Wear", 
    "DJ / Music"
  ];

  const cities = [
    "All cities", 
    "Udaipur", 
    "Jaipur", 
    "Delhi NCR", 
    "Mumbai", 
    "Goa"
  ];

  return (
    <section className="relative overflow-hidden bg-[#1A1715] text-white pt-14 pb-20 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36 border-b border-royal-gold/20">
      {/* Editorial High-Resolution Luxury Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Royal Indian Wedding"
          className="w-full h-full object-cover object-center opacity-30 scale-105 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1715]/95 via-[#1A1715]/70 to-[#1A1715]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-ruby/30 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-royal-gold/40 text-royal-lightGold text-[11px] font-cinzel font-semibold tracking-widest uppercase mb-6 shadow-luxury">
          <Crown className="w-3.5 h-3.5 text-royal-gold" />
          <span>Bespoke Multi-Faith Indian Wedding Concierge</span>
        </div>

        {/* Grand Headline with Google Fonts Cinzel & Playfair Display */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Curating Your Royal Celebration Across <br className="hidden sm:inline" />
          <span className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-royal-lightGold via-yellow-100 to-royal-gold">
            Every Sacred Tradition
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed font-light">
          From Vedic Saat Phere & Royal Nikah to Anand Karaj, Holy Matrimony, and Jain Vivah — discover vetted heritage venues, certified officiants, and award-winning artisans.
        </p>

        {/* MULTI-FAITH TRADITION SELECTOR PILLS */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
          {faiths.map((f) => {
            const isSelected = selectedFaith === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFaith(f.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'royal-gradient-wine text-white shadow-luxury scale-[1.03] ring-1 ring-royal-gold/60'
                    : 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/15 backdrop-blur-md'
                }`}
              >
                <span>{f.emoji}</span>
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* EXECUTIVE SEARCH CONSOLE */}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-5 shadow-2xl text-royal-charcoal border border-royal-gold/40">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Category Dropdown */}
            <div className="sm:col-span-4 text-left border-b sm:border-b-0 sm:border-r border-royal-sand pb-2 sm:pb-0 sm:px-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted font-cinzel">
                Service Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-royal-charcoal focus:outline-none cursor-pointer mt-1 font-serif"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="sm:col-span-4 text-left border-b sm:border-b-0 sm:border-r border-royal-sand pb-2 sm:pb-0 sm:px-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted font-cinzel">
                Wedding Destination
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-royal-wine flex-shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-royal-charcoal focus:outline-none cursor-pointer font-serif"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword Input & Action Button */}
            <div className="sm:col-span-4 flex items-center gap-2 sm:pl-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. Qazi, Pandit, Palace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-semibold py-3 px-3.5 rounded-2xl bg-royal-sand/30 border border-royal-sand/80 focus:outline-none focus:border-royal-wine text-royal-charcoal placeholder-gray-400 font-sans"
                />
              </div>
              <button
                onClick={onExplore}
                className="px-6 py-3 rounded-2xl royal-gradient-wine text-white font-bold text-xs sm:text-sm shadow-luxury hover:shadow-2xl transition-all flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4 text-royal-lightGold" />
                <span>Explore</span>
              </button>
            </div>

          </div>
        </div>

        {/* High-End Trust Badges */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-5 sm:gap-10 text-xs font-medium text-gray-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-royal-gold flex-shrink-0" />
            <span>100% Vetted Qazis, Pandits, Priests & Granthis</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-royal-gold flex-shrink-0" />
            <span>AI Multi-Faith Muhurat & Budget Planner</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-royal-gold flex-shrink-0" />
            <span>Direct Studio Pricing (Zero Markups)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
