import React from 'react';

export const WMG_HERO_CATEGORIES = [
  { id: 'All vendors', label: 'Select vendor type' },
  { id: 'Venue', label: 'Wedding Venues (Banquets, Palaces, Lawns)' },
  { id: 'Makeup Artist', label: 'Bridal Makeup Artists' },
  { id: 'Photographer', label: 'Wedding Photographers' },
  { id: 'Decorator', label: 'Wedding Decorators' },
  { id: 'Bridal Wear', label: 'Bridal Wear & Lehengas' },
  { id: 'Groom Wear', label: 'Groom Wear & Sherwani' },
  { id: 'Wedding Planner', label: 'Wedding Planners' },
  { id: 'Mehndi Artist', label: 'Mehndi Artists' },
  { id: 'Caterer', label: 'Catering & Food Services' }
];

export const WMG_CATEGORIES = WMG_HERO_CATEGORIES;

export const HERO_CITIES = [
  'Select city',
  'Delhi NCR (Gurgaon, Noida, Delhi)',
  'Mumbai & Suburbs',
  'Bangalore',
  'Jaipur (Heritage Havelis & Forts)',
  'Udaipur (Lakeside Palaces)',
  'Goa (Beach Resorts)',
  'Hyderabad',
  'Pune',
  'Kolkata'
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
  return (
    <section className="relative bg-black text-white min-h-[460px] flex items-center justify-center overflow-hidden font-sans">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Royal Wedding"
          className="w-full h-full object-cover opacity-60"
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>
      </div>

      <div className="relative z-10 wmg-container text-center py-16">
        <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight mb-3 font-serif text-white">
          Your Wedding, Your Way
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-light mb-10">
          Find the best wedding vendors with thousands of trusted reviews
        </p>

        {/* Exact WedMeGood Search Bar Controller */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2">
          {/* Dropdown 1: Select Vendor Type */}
          <div className="flex-1 w-full relative border-b md:border-b-0 md:border-r border-gray-200 py-2 px-3 text-left">
            <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wider">Vendor Type</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-[14px] font-semibold text-[#333] bg-transparent outline-none cursor-pointer"
            >
              {WMG_HERO_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id === 'All vendors' ? 'All vendors' : c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 2: Select City */}
          <div className="flex-1 w-full relative py-2 px-3 text-left">
            <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wider">Destination City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value.split(' ')[0] === 'Select' ? 'All cities' : e.target.value.split(' ')[0])}
              className="w-full text-[14px] font-semibold text-[#333] bg-transparent outline-none cursor-pointer"
            >
              {HERO_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Get Started Button */}
          <button
            onClick={onExplore}
            className="w-full md:w-auto bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[15px] px-8 py-3.5 rounded-md transition whitespace-nowrap shadow-md"
          >
            Get Started
          </button>
        </div>

        {/* Quick Popular Keywords & Photo Credits */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-[12px] text-gray-300 max-w-3xl mx-auto px-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Popular Searches:</span>
            <button onClick={() => { setSelectedCategory('Bridal Wear'); onExplore(); }} className="hover:text-white underline">Bridal Wear</button>
            <span>•</span>
            <button onClick={() => { setSelectedCategory('Makeup Artist'); onExplore(); }} className="hover:text-white underline">Bridal Makeup Artists</button>
            <span>•</span>
            <button onClick={() => { setSelectedCategory('Photographer'); onExplore(); }} className="hover:text-white underline">Photographers</button>
          </div>
          <div className="text-gray-400 italic">
            Photo Credits : Shutterdown
          </div>
        </div>
      </div>
    </section>
  );
}
