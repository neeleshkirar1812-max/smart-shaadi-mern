import React, { useState, useEffect, useRef } from 'react';
import { Heart, Search } from 'lucide-react';

export const CITIES_LIST = [
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
  'Kolkata'
];

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
  onScrollToSection
}) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
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
  };

  const currentDisplayCity = selectedCity === 'All cities' ? 'All Cities' : selectedCity;

  return (
    <>
      {/* 1. TOP UTILITY HEADER BAR */}
      <div className="bg-white border-b border-[#f0f0f0] text-[12px] py-1.5 px-4 hidden md:block">
        <div className="wmg-container flex items-center justify-between text-[#727272]">
          <div className="flex items-center space-x-1">
            <span className="text-[#e72e77] text-[13px] font-bold">♥</span>
            <span className="font-medium text-[#555]">India&apos;s Favourite Wedding Planning Platform</span>
          </div>
          <div className="flex items-center space-x-6 font-medium">
            <button 
              onClick={() => {
                if (!user) onOpenAuth('couple');
                else onScrollToSection('real-weddings');
              }}
              className="hover:text-[#e72e77] flex items-center space-x-1"
            >
              <span className="material-symbols-outlined text-[15px] text-[#e72e77]">edit_note</span>
              <span>Write A Review</span>
            </button>
            <button 
              onClick={() => onScrollToSection('app-download')}
              className="hover:text-[#e72e77] flex items-center space-x-1"
            >
              <span className="material-symbols-outlined text-[15px] text-[#e72e77]">install_mobile</span>
              <span>Download App</span>
            </button>
            <button 
              onClick={() => onOpenAuth('vendor')}
              className="hover:text-[#e72e77] flex items-center space-x-1"
            >
              <span className="material-symbols-outlined text-[15px]">storefront</span>
              <span>Register as a Vendor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY LOGO & NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#e72e77] text-white shadow-md">
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
                className="bg-[#d11f67] hover:bg-[#b81857] text-white text-[13px] font-semibold py-1.5 px-3.5 rounded-full flex items-center space-x-1.5 transition"
              >
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span id="active-city-label">{currentDisplayCity}</span>
                <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white text-[#4a4a4a] rounded-lg shadow-dropdown py-2 border border-[#eee] z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#888] uppercase tracking-wider">Top Destinations</div>
                  {CITIES_LIST.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleSelectCity(c)}
                      className="w-full text-left block px-3 py-2 text-[13px] hover:bg-pink-50 hover:text-[#e72e77] font-medium"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center & Right Navigation Links with Full Mega-Menu */}
          <nav className="hidden lg:flex items-center space-x-1 h-full">
            <button 
              onClick={() => { setView('discover'); onScrollToSection('popular-venues'); }}
              className="h-full px-3.5 flex items-center text-[14px] font-semibold hover:bg-[#d11f67] transition"
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
                onClick={() => setVendorsMenuOpen(!vendorsMenuOpen)}
                className="h-full px-3.5 flex items-center text-[14px] font-semibold bg-[#d11f67] text-white"
              >
                <span>Vendors</span>
              </button>

              {/* MEGA MENU OVERLAY (4 COLUMNS - EXACT VERBATIM AS IN SCREENSHOT) */}
              {vendorsMenuOpen && (
                <div className="absolute left-[-200px] top-[64px] w-[980px] bg-white text-[#2c2c2c] shadow-dropdown border-t border-[#f0f0f0] rounded-b-lg p-6 grid grid-cols-4 gap-6 z-50 text-[13px] text-left">
                  {/* Col 1 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Photographers</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Photographers</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Makeup</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Bridal Makeup Artists</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] flex items-center py-0.5 text-left w-full">
                        Family Makeup <span className="wmg-service-tag">WMG SERVICE</span>
                      </button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Planning &amp; Decor</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Wedding Planners</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Decorators</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Virtual Planning</span>
                      <button onClick={() => { onScrollToSection('genie-banner'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] flex items-center py-0.5 text-left w-full">
                        Virtual planning <span className="wmg-service-tag">WMG SERVICE</span>
                      </button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Mehndi</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Mehendi Artists</button>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Music &amp; Dance</span>
                      <button onClick={() => { setView('playlist'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">DJs</button>
                      <button onClick={() => { setView('playlist'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Sangeet Choreographer</button>
                      <button onClick={() => { setView('playlist'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Wedding Entertainment</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Invites &amp; Gifts</span>
                      <button onClick={() => { setView('website'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Invitations</button>
                      <button onClick={() => { setView('website'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Favors</button>
                      <button onClick={() => { setView('website'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Trousseau Packers</button>
                      <button onClick={() => { setView('website'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Invitation Gifts</button>
                      <button onClick={() => { setView('website'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Mehndi Favors</button>
                      <button onClick={() => { setView('website'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Invites &amp; Gifts</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Food</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Catering Services</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Cake</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Chaat &amp; Food Stalls</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Bartenders</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Food</button>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Pre Wedding Shoot</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Pre Wedding Shoot Locations</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Pre Wedding Photographers</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Bridal Wear</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Bridal Lehengas</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Kanjeevaram / Silk Sarees</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Cocktail Gowns</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Trousseau Sarees</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Bridal Lehenga on Rent</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Bridal Wear</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Groom Wear</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Sherwani</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Wedding Suits / Tuxes</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Sherwani On Rent</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Groom Wear</button>
                    </div>
                  </div>

                  {/* Col 4 */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Jewellery &amp; Accessories</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Jewellery</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Flower Jewellery</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Bridal Jewellery on Rent</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Accessories</button>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#e72e77] font-bold block pt-1 hover:underline text-[12px] text-left w-full">View All Jewellery &amp; Accessories</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Pandits</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Wedding Pandits</button>
                    </div>
                    <div>
                      <span className="font-bold text-[#e72e77] text-[14px] block mb-1">Bridal Grooming</span>
                      <button onClick={() => { setView('discover'); onScrollToSection('catalog-marketplace'); setVendorsMenuOpen(false); }} className="text-[#555] hover:text-[#e72e77] block py-0.5 text-left w-full">Beauty and Wellness</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => { setView('discover'); onScrollToSection('inspiration-gallery'); }}
              className="h-full px-3.5 flex items-center text-[14px] font-semibold hover:bg-[#d11f67] transition"
            >
              Photos
            </button>

            <button 
              onClick={() => { setView('discover'); onScrollToSection('real-weddings'); }}
              className="h-full px-3.5 flex items-center text-[14px] font-semibold hover:bg-[#d11f67] transition"
            >
              Real Weddings
            </button>

            <button 
              onClick={() => { setView('discover'); onScrollToSection('blog'); }}
              className="h-full px-3.5 flex items-center text-[14px] font-semibold hover:bg-[#d11f67] transition"
            >
              Blog
            </button>

            <button 
              onClick={() => setView('website')}
              className="h-full px-3.5 flex items-center text-[14px] font-semibold hover:bg-[#d11f67] transition"
            >
              E-Invites
            </button>

            <button 
              onClick={() => onScrollToSection('genie-banner')}
              className="h-full px-3.5 flex items-center text-[14px] font-semibold hover:bg-[#d11f67] transition space-x-1"
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
