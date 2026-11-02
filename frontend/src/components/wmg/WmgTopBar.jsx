import React, { useState, useEffect, useRef } from 'react';
import { Heart, Search, Check, MapPin } from 'lucide-react';

export const TOP_CITIES_LIST = [
  'All Cities',
  'Delhi NCR',
  'Mumbai',
  'Bangalore',
  'Jaipur',
  'Udaipur',
  'Goa',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Lucknow'
];

export const CITIES_LIST = TOP_CITIES_LIST;

export const DESTINATION_CITIES_LIST = [
  'Udaipur',
  'Goa',
  'Jim Corbett',
  'Jaipur',
  'Mussoorie',
  'Kerala',
  'Jodhpur',
  'Agra',
  'Varanasi'
];

export const OTHER_POPULAR_CITIES = [
  'Nagpur',
  'Thane',
  'Surat',
  'Patna',
  'Raipur',
  'Coimbatore',
  'Gwalior',
  'Indore',
  'Dehradun',
  'Karnal',
  'Bhubaneswar',
  'Faridabad'
];

export const CITY_ICONS = {
  'Delhi NCR': 'https://image.wedmegood.com/resized/500X/uploads/city_image/1/delhi.png',
  'Mumbai': 'https://image.wedmegood.com/resized/500X/uploads/city_image/6/bombay.png',
  'Bangalore': 'https://image.wedmegood.com/resized/500X/uploads/city_image/9/banglore.png',
  'Hyderabad': 'https://image.wedmegood.com/resized/500X/uploads/city_image/11/hyderabad.png',
  'Chennai': 'https://image.wedmegood.com/resized/500X/uploads/city_image/10/chennai.png',
  'Kolkata': 'https://image.wedmegood.com/resized/500X/uploads/city_image/12/kolkata.png',
  'Jaipur': 'https://image.wedmegood.com/resized/500X/uploads/city_image/17/jaipur.png',
  'Goa': 'https://image.wedmegood.com/resized/500X/uploads/city_image/16/goa.png',
  'Pune': 'https://image.wedmegood.com/resized/500X/uploads/city_image/7/pune.jpg',
  'Lucknow': 'https://image.wedmegood.com/resized/500X/uploads/city_image/22/lucknow.png',
  'Chandigarh': 'https://image.wedmegood.com/resized/500X/uploads/city_image/15/chandigarh.png',
  'Ahmedabad': 'https://image.wedmegood.com/resized/500X/uploads/city_image/14/ahmedabad.png'
};

export default function WmgTopBar({
  currentView,
  setView,
  selectedCity,
  setSelectedCity,
  onOpenSearch,
  onOpenWishlist,
  wishlistCount = 0,
  user,
  onOpenAuth,
  onLogout,
  onScrollToSection,
  onOpenWriteReview,
  onOpenDownloadApp,
  onOpenGenie
}) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [vendorsMenuOpen, setVendorsMenuOpen] = useState(false);
  const cityRef = useRef(null);
  const vendorsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityDropdownOpen(false);
      }
      if (vendorsRef.current && !vendorsRef.current.contains(e.target)) {
        setVendorsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (c) => {
    setSelectedCity(c === 'All Cities' ? 'All cities' : c);
    setCityDropdownOpen(false);
    setCitySearchQuery('');
  };

  const currentDisplayCity = selectedCity === 'All cities' ? 'All Cities' : selectedCity;

  // Filtered cities based on search
  const allKnownCities = Array.from(new Set([...TOP_CITIES_LIST, ...DESTINATION_CITIES_LIST, ...OTHER_POPULAR_CITIES]));
  const filteredCities = citySearchQuery.trim()
    ? allKnownCities.filter((c) => c.toLowerCase().includes(citySearchQuery.toLowerCase()))
    : TOP_CITIES_LIST;

  return (
    <>
      {/* 1. TOP UTILITY HEADER BAR */}
      <div className="bg-white border-b border-[#f0f0f0] text-[12px] py-1.5 px-4 hidden md:block font-sans">
        <div className="wmg-container flex items-center justify-between text-[#727272]">
          <div className="flex items-center space-x-1">
            <span className="text-[#e72e77] text-[13px] font-bold">♥</span>
            <span className="font-medium text-[#555]">India&apos;s Favourite Wedding Planning Platform</span>
          </div>
          <div className="flex items-center space-x-6 font-medium">
            <button 
              onClick={() => onOpenWriteReview ? onOpenWriteReview() : onOpenAuth?.('couple')}
              className="hover:text-[#e72e77] flex items-center space-x-1 transition"
            >
              <span className="material-symbols-outlined text-[15px] text-[#e72e77]">edit_note</span>
              <span>Write A Review</span>
            </button>
            <button 
              onClick={() => onOpenDownloadApp ? onOpenDownloadApp() : onScrollToSection?.('app-download')}
              className="hover:text-[#e72e77] flex items-center space-x-1 transition"
            >
              <span className="material-symbols-outlined text-[15px] text-[#e72e77]">install_mobile</span>
              <span>Download App</span>
            </button>
            <button 
              onClick={() => onOpenAuth?.('vendor')}
              className="hover:text-[#e72e77] flex items-center space-x-1 transition"
            >
              <span className="material-symbols-outlined text-[15px]">storefront</span>
              <span>Register as a Vendor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY LOGO & NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#e72e77] text-white shadow-md font-sans">
        <div className="wmg-container flex items-center justify-between h-[64px]">
          
          {/* Left: Logo & City Selector */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setView('discover')}
              className="flex items-center space-x-2 text-white focus:outline-none"
            >
              {/* WMG Vector Butterfly Monogram */}
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 14.5c-2.8-4-6.8-6.5-11-6.5-2.8 0-5 2.2-5 5s2.2 5 5 5c2.5 0 5-1 7-2.8v1.6c0 4.2-2.5 8.2-6.5 10.7-1.8 1.1-2.4 3.5-1.3 5.3 1.1 1.8 3.5 2.4 5.3 1.3 5.8-3.7 9.5-9.8 9.5-16.6v-3zM16 14.5c2.8-4 6.8-6.5 11-6.5 2.8 0 5 2.2 5 5s-2.2 5-5 5c-2.5 0-5-1-7-2.8v1.6c0 4.2 2.5 8.2 6.5 10.7 1.8 1.1 2.4 3.5 1.3 5.3-1.1 1.8-3.5 2.4-5.3 1.3-5.8-3.7-9.5-9.8-9.5-16.6v-3z"></path>
              </svg>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">WedMeGood</span>
            </button>

            {/* City Dropdown Selector */}
            <div className="relative" ref={cityRef}>
              <button 
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="bg-[#d11f67] hover:bg-[#b81857] text-white text-[13px] font-semibold py-1.5 px-3.5 rounded-full flex items-center space-x-1.5 transition shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span id="active-city-label">{currentDisplayCity}</span>
                <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white text-[#4a4a4a] rounded-xl shadow-dropdown py-3 border border-[#eee] z-50 animate-in fade-in max-h-[460px] overflow-y-auto">
                  
                  {/* City Search Input */}
                  <div className="px-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center bg-[#f8f8f8] rounded-lg px-2.5 py-1.5 border border-gray-200">
                      <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Search city..."
                        value={citySearchQuery}
                        onChange={(e) => setCitySearchQuery(e.target.value)}
                        className="bg-transparent text-xs outline-none w-full text-gray-800"
                        autoFocus
                      />
                    </div>
                  </div>

                  {citySearchQuery.trim() ? (
                    <div className="py-1">
                      <div className="px-3 py-1 text-[11px] font-bold text-[#888] uppercase tracking-wider">
                        Search Results
                      </div>
                      {filteredCities.length > 0 ? (
                        filteredCities.map((c) => (
                          <button
                            key={c}
                            onClick={() => handleSelectCity(c)}
                            className={`w-full text-left px-3.5 py-2 text-[13px] flex items-center justify-between font-medium hover:bg-pink-50 hover:text-[#e72e77] transition ${
                              currentDisplayCity === c ? 'bg-pink-50 text-[#e72e77] font-bold' : ''
                            }`}
                          >
                            <span>{c}</span>
                            {currentDisplayCity === c && <Check className="w-3.5 h-3.5 text-[#e72e77]" />}
                          </button>
                        ))
                      ) : (
                        <p className="px-3.5 py-2 text-xs text-gray-400">No matching cities found</p>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Top Hubs */}
                      <div className="py-1">
                        <div className="px-3.5 py-1 text-[11px] font-bold text-[#888] uppercase tracking-wider">
                          Top Hubs
                        </div>
                        {TOP_CITIES_LIST.map((c) => (
                          <button
                            key={c}
                            onClick={() => handleSelectCity(c)}
                            className={`w-full text-left px-3.5 py-1.5 text-[13px] flex items-center justify-between font-medium hover:bg-pink-50 hover:text-[#e72e77] transition ${
                              currentDisplayCity === c ? 'bg-pink-50 text-[#e72e77] font-bold' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {CITY_ICONS[c] ? (
                                <img src={CITY_ICONS[c]} alt="" className="w-5 h-5 rounded-full object-cover shrink-0" />
                              ) : (
                                <span className="w-5 h-5 rounded-full bg-pink-100 text-[#e72e77] flex items-center justify-center text-[10px] font-bold">📍</span>
                              )}
                              <span>{c}</span>
                            </div>
                            {currentDisplayCity === c && <Check className="w-3.5 h-3.5 text-[#e72e77]" />}
                          </button>
                        ))}
                      </div>

                      {/* Destination Wedding Hubs */}
                      <div className="py-1 border-t border-gray-100">
                        <div className="px-3.5 py-1 text-[11px] font-bold text-[#b38600] uppercase tracking-wider">
                          Destination Weddings
                        </div>
                        {DESTINATION_CITIES_LIST.slice(0, 5).map((c) => (
                          <button
                            key={c}
                            onClick={() => handleSelectCity(c)}
                            className={`w-full text-left px-3.5 py-1.5 text-[12px] flex items-center justify-between font-medium hover:bg-amber-50 hover:text-[#b38600] transition ${
                              currentDisplayCity === c ? 'bg-amber-50 text-[#b38600] font-bold' : ''
                            }`}
                          >
                            <span>🏰 {c}</span>
                            {currentDisplayCity === c && <Check className="w-3.5 h-3.5 text-[#b38600]" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center & Right Navigation Links with Full Mega-Menu */}
          <nav className="hidden lg:flex items-center space-x-1 h-full">
            <button 
              onClick={() => setView('venues')}
              className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition ${
                currentView === 'venues' ? 'bg-[#b81857] text-white shadow-inner border-b-2 border-white' : 'hover:bg-[#d11f67]'
              }`}
            >
              Venues
            </button>

            {/* VENDORS DROPDOWN TRIGGER (Exact Mega Menu) */}
            <div 
              className="relative group h-full"
              ref={vendorsRef}
              onMouseEnter={() => setVendorsMenuOpen(true)}
              onMouseLeave={() => setVendorsMenuOpen(false)}
            >
              <button 
                onClick={() => setView('vendors')}
                className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition text-white ${
                  currentView === 'vendors' ? 'bg-[#b81857] shadow-inner border-b-2 border-white' : 'bg-[#d11f67] hover:bg-[#b81857]'
                }`}
              >
                <span>Vendors</span>
              </button>

              {/* MEGA MENU OVERLAY (4 COLUMNS) */}
              {vendorsMenuOpen && (
                <div className="absolute left-[-200px] top-[64px] w-[980px] bg-white text-[#2c2c2c] shadow-dropdown border-t border-[#f0f0f0] rounded-b-lg p-6 grid grid-cols-4 gap-6 z-50 text-[13px] text-left">
                  {/* Col 1 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Photographers</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Photographers</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Makeup</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Bridal Makeup Artists</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] flex items-center py-0.5 text-left w-full font-medium">
                        Family Makeup <span className="wmg-service-tag">WMG SERVICE</span>
                      </button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Planning &amp; Decor</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Wedding Planners</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Decorators</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Virtual Planning</span>
                      <button onClick={() => { setView('genie-page'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] flex items-center py-0.5 text-left w-full font-medium">
                        Virtual Planning <span className="wmg-service-tag">WMG SERVICE</span>
                      </button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Mehndi</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Mehendi Artists</button>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Music &amp; Dance</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">DJs</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Sangeet Choreographer</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Wedding Entertainment</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Invites &amp; Gifts</span>
                      <button onClick={() => { setView('e-invites-page'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Invitations</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Favors &amp; Gifting</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Trousseau Packing</button>
                      <button onClick={() => { setView('e-invites-page'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Invites &amp; Gifts</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Food</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Catering Services</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Cake</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Chaat &amp; Food Stalls</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Bartenders</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Food</button>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Pre Wedding Shoot</span>
                      <button onClick={() => { setView('photos-gallery'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Pre Wedding Shoot Locations</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Pre Wedding Photographers</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Bridal Wear</span>
                      <button onClick={() => { setView('photos-gallery'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Bridal Lehengas</button>
                      <button onClick={() => { setView('photos-gallery'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Kanjeevaram / Silk Sarees</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Cocktail Gowns</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Trousseau Sarees</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Bridal Lehenga on Rent</button>
                      <button onClick={() => { setView('photos-gallery'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Bridal Wear</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Groom Wear</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Sherwani</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Wedding Suits / Tuxes</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Sherwani On Rent</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Groom Wear</button>
                    </div>
                  </div>

                  {/* Col 4 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Jewellery &amp; Accessories</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Jewellery</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Flower Jewellery</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Jewellery On Rent</button>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Jewellery</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Pandits</span>
                      <button onClick={() => { setView('vendors'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Wedding Pandits</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Bridal Grooming</span>
                      <button onClick={() => { setView('genie-page'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full font-medium">Beauty and Wellness</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setView('photos-gallery')}
              className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition ${
                currentView === 'photos-gallery' ? 'bg-[#b81857] text-white shadow-inner border-b-2 border-white' : 'hover:bg-[#d11f67]'
              }`}
            >
              Photos
            </button>

            <button 
              onClick={() => setView('real-weddings-page')}
              className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition ${
                currentView === 'real-weddings-page' ? 'bg-[#b81857] text-white shadow-inner border-b-2 border-white' : 'hover:bg-[#d11f67]'
              }`}
            >
              Real Weddings
            </button>

            <button 
              onClick={() => setView('blog-page')}
              className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition ${
                currentView === 'blog-page' ? 'bg-[#b81857] text-white shadow-inner border-b-2 border-white' : 'hover:bg-[#d11f67]'
              }`}
            >
              Blog
            </button>

            <button 
              onClick={() => setView('e-invites-page')}
              className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition ${
                currentView === 'e-invites-page' ? 'bg-[#b81857] text-white shadow-inner border-b-2 border-white' : 'hover:bg-[#d11f67]'
              }`}
            >
              E-Invites
            </button>

            <button 
              onClick={() => setView('genie-page')}
              className={`h-full px-3.5 flex items-center text-[14px] font-semibold transition space-x-1 ${
                currentView === 'genie-page' ? 'bg-[#b81857] text-white shadow-inner border-b-2 border-white' : 'hover:bg-[#d11f67]'
              }`}
            >
              <span>Genie</span>
              <span className="bg-white text-[#e72e77] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW</span>
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full hover:bg-[#d11f67] flex items-center justify-center transition text-white"
              title="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full hover:bg-[#d11f67] text-white transition"
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-white' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#e72e77] text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {!user ? (
              <button 
                onClick={() => onOpenAuth('couple')}
                className="bg-white text-[#e72e77] hover:bg-pink-50 font-bold text-[13px] px-5 py-2 rounded-full transition shadow-sm"
              >
                Log In
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView(user.role === 'couple' ? 'planner' : user.role === 'vendor' ? 'vendor-portal' : 'admin')}
                  className="bg-white text-[#e72e77] font-bold text-xs px-3 py-1.5 rounded-full"
                >
                  {user.name.split(' ')[0]}
                </button>
                <button
                  onClick={onLogout}
                  className="text-white hover:text-pink-200 text-xs font-semibold"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
