import React from 'react';

export const WMG_HERO_CATEGORIES = [
  'Venues',
  'Photographers',
  'Bridal Makeup',
  'Wedding Decorators',
  'Bridal Wear',
  'Mehndi Artists',
  'Wedding Cards',
  'Catering'
];

export const WMG_CATEGORIES = WMG_HERO_CATEGORIES;

export default function WmgHeroSearch({
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  onExplore
}) {
  const currentCityVal = selectedCity === 'All cities' ? 'All Cities' : selectedCity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onExplore) onExplore();
  };

  return (
    <section 
      id="hero-search" 
      className="relative text-white min-h-[480px] flex items-center justify-center overflow-hidden font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.65)), url('https://image.wedmegood.com/resized/1900X/uploads/city_bg_image/1/north.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="wmg-container relative z-10 text-center py-16 px-4">
        {/* Main Heading Verbatim */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
          Your Wedding, Your Way
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-8 font-medium drop-shadow">
          Find the best wedding vendors with thousands of trusted reviews
        </p>

        {/* Exact WedMeGood Search Bar Controller */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-full p-2.5 shadow-2xl flex flex-col md:flex-row items-center gap-2">
          
          {/* Dropdown 1: Select Vendor Type */}
          <div className="w-full md:w-1/2 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <span className="material-symbols-outlined text-gray-400 mr-2">search</span>
            <select
              value={selectedCategory === 'All vendors' ? '' : selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value || 'All vendors')}
              className="w-full text-[14px] text-gray-700 bg-transparent outline-none cursor-pointer font-medium"
            >
              <option value="">Select Vendor Category (e.g. Venues, Makeup)</option>
              <option value="Venue">Venues (Banquet Halls, Lawns, 4/5 Star Hotels)</option>
              <option value="Photographer">Photographers (Candid, Pre-Wedding, Cinematic)</option>
              <option value="Makeup Artist">Makeup Artists (Bridal, Airbrush HD, Family)</option>
              <option value="Planning & Decor">Planning &amp; Decor (Decorators, Planners)</option>
              <option value="Mehndi Artist">Mehndi Artists (Bridal, Arabic, Traditional)</option>
              <option value="Music & Dance">Music &amp; Dance (DJs, Choreographers)</option>
              <option value="Food & Catering">Catering Services &amp; Chaat Stalls</option>
              <option value="Bridal Wear">Bridal Wear &amp; Lehengas</option>
            </select>
          </div>

          {/* Dropdown 2: Select City */}
          <div className="w-full md:w-1/3 flex items-center px-4 py-2">
            <span className="material-symbols-outlined text-gray-400 mr-2">location_on</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-[14px] text-gray-700 bg-transparent outline-none cursor-pointer font-medium"
            >
              <option value="All cities">All Cities (Pan India)</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Goa">Goa</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Jim Corbett">Jim Corbett</option>
            </select>
          </div>

          {/* Get Started Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[15px] px-8 py-3.5 rounded-lg md:rounded-full transition shadow-md whitespace-nowrap"
          >
            Get Started
          </button>
        </form>

        {/* Quick Popular Keywords & Photo Credits */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300 max-w-4xl mx-auto px-2">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className="font-semibold text-gray-400 whitespace-nowrap">Popular Searches:</span>
            <button 
              type="button"
              onClick={() => { setSelectedCategory('Venue'); if (onExplore) onExplore(); }} 
              className="hover:text-white underline whitespace-nowrap"
            >
              Wedding Venues in {currentCityVal}
            </button>
            <span>•</span>
            <button 
              type="button"
              onClick={() => { setSelectedCategory('Photographer'); if (onExplore) onExplore(); }} 
              className="hover:text-white underline whitespace-nowrap"
            >
              Bridal Makeup
            </button>
            <span>•</span>
            <button 
              type="button"
              onClick={() => { setSelectedCategory('Photographer'); if (onExplore) onExplore(); }} 
              className="hover:text-white underline whitespace-nowrap"
            >
              Photographers
            </button>
          </div>
          <div className="mt-2 md:mt-0 text-[11px] text-gray-400">
            Photo Credits: <span className="text-gray-300 font-medium">Shutterdown</span>
          </div>
        </div>

      </div>
    </section>
  );
}
