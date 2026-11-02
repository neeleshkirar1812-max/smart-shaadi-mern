import React, { useState, useEffect, useRef } from 'react';
import { 
  Crown, 
  MapPin, 
  Search, 
  Heart, 
  Smartphone, 
  Star, 
  Briefcase, 
  ChevronDown, 
  User, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  CalendarCheck,
  Users,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CITIES_LIST = [
  { name: 'All Cities', state: 'Pan India', count: '50,000+' },
  { name: 'Delhi NCR', state: 'Delhi, Gurgaon, Noida', count: '4,800+ Venues' },
  { name: 'Mumbai', state: 'Maharashtra', count: '3,200+ Venues' },
  { name: 'Bangalore', state: 'Karnataka', count: '2,600+ Venues' },
  { name: 'Hyderabad', state: 'Telangana', count: '1,900+ Venues' },
  { name: 'Chennai', state: 'Tamil Nadu', count: '1,400+ Venues' },
  { name: 'Pune', state: 'Maharashtra', count: '1,650+ Venues' },
  { name: 'Kolkata', state: 'West Bengal', count: '1,500+ Venues' },
  { name: 'Jaipur', state: 'Rajasthan', count: '1,850+ Palaces & Venues' },
  { name: 'Udaipur', state: 'Rajasthan', count: '920+ Heritage Palaces' },
  { name: 'Goa', state: 'Goa Coast', count: '840+ Beach Resorts' },
  { name: 'Lucknow', state: 'Uttar Pradesh', count: '980+ Royal Lawns' }
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cityRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city) => {
    setSelectedCity(city.name === 'All Cities' ? 'All cities' : city.name);
    setCityDropdownOpen(false);
  };

  const currentDisplayCity = selectedCity === 'All cities' ? 'All Cities' : selectedCity;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      
      {/* 1. MICRO TOP-BAR (WedMeGood Signature Utility Strip) */}
      <div className="bg-[#FAF8F5] border-b border-gray-200/70 text-xs text-[#6B6866] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onScrollToSection('app-download')} 
              className="flex items-center gap-1.5 hover:text-[#E72E77] transition font-medium"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#E72E77]" />
              <span>Download WMG App</span>
            </button>
            <span className="hidden md:inline text-gray-300">|</span>
            <button 
              onClick={() => {
                if (!user) onOpenAuth();
                else onScrollToSection('real-weddings');
              }} 
              className="hidden sm:flex items-center gap-1.5 hover:text-[#E72E77] transition"
            >
              <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-[11px] text-[#8C827A]">
              India&apos;s Largest Wedding Platform • 2.5M+ Happy Couples
            </span>
            <button 
              onClick={() => {
                if (user?.role === 'vendor') {
                  setView('vendor-portal');
                } else {
                  onOpenAuth('vendor');
                }
              }}
              className="flex items-center gap-1.5 text-[#E72E77] hover:text-[#B60056] font-semibold transition"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>WedMeGood for Business / List Your Business</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & CITY PICKER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & City Selector Group */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* WMG Brand Logo */}
            <button 
              onClick={() => setView('discover')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E72E77] to-[#B60056] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Crown className="w-5 h-5 text-[#FAF8F5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1715] group-hover:text-[#E72E77] transition-colors">
                    WedMe<span className="text-[#E72E77]">Good</span>
                  </span>
                  <span className="text-[10px] bg-[#FAF3E0] text-[#8C6D23] font-bold px-1.5 py-0.5 rounded border border-[#E8D8A6]">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#8C827A] font-semibold">
                  SmartShaadi Portal
                </span>
              </div>
            </button>

            {/* City Selector Dropdown */}
            <div className="relative" ref={cityRef}>
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-gray-200 text-xs font-semibold text-[#1A1715] transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E72E77]" />
                <span className="max-w-[100px] sm:max-w-[130px] truncate">{currentDisplayCity}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                      Select Wedding City
                    </span>
                    <span className="text-[10px] text-[#E72E77] font-semibold">
                      11 Major Hubs
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1">
                    {CITIES_LIST.map((c) => {
                      const isSelected = (c.name === 'All Cities' && selectedCity === 'All cities') || selectedCity === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => handleSelectCity(c)}
                          className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#FAF8F5] transition ${isSelected ? 'bg-[#FFF0F5] text-[#E72E77] font-bold' : 'text-[#2D2B2A]'}`}
                        >
                          <div>
                            <p className="text-xs font-semibold">{c.name}</p>
                            <p className="text-[10px] text-[#8C827A]">{c.state}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400">{c.count}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#E72E77]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Desktop Mega-Menu Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#2D2B2A]">
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('featured-venues');
              }} 
              className="hover:text-[#E72E77] transition py-1"
            >
              Venues
            </button>
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('top-categories');
              }} 
              className="hover:text-[#E72E77] transition py-1"
            >
              Vendors
            </button>
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('inspiration-gallery');
              }} 
              className="hover:text-[#E72E77] transition py-1"
            >
              Photos
            </button>
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('real-weddings');
              }} 
              className="hover:text-[#E72E77] transition py-1"
            >
              Real Weddings
            </button>
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('editorial-journal');
              }} 
              className="hover:text-[#E72E77] transition py-1"
            >
              Blog
            </button>
            <button 
              onClick={() => setView('website')} 
              className="hover:text-[#E72E77] transition py-1 flex items-center gap-1"
            >
              <span>E-Invites</span>
              <span className="text-[9px] bg-[#E72E77] text-white px-1.5 py-0.2 rounded-full font-bold">New</span>
            </button>
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('genie-banner');
              }} 
              className="hover:text-[#B60056] text-[#E72E77] transition py-1 font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wedsta Concierge</span>
            </button>
          </nav>

          {/* Right Action Cluster: Search Trigger, Wishlist, Auth */}
          <div className="flex items-center gap-3">
            
            {/* Instant Search Bar Trigger with keyboard shortcut [/] */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-gray-200/80 text-xs text-[#8C827A] transition"
              title="Press / to search"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span className="hidden md:inline">Search vendors, venues...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-gray-400 border border-gray-200 shadow-xs">
                /
              </kbd>
            </button>

            {/* Wishlist Heart Icon with counter */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl hover:bg-[#FFF0F5] text-gray-600 hover:text-[#E72E77] transition"
              title="Saved Shortlist & Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#E72E77] fill-[#E72E77]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E72E77] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Auth Button or User Menu */}
            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('couple')}
                  className="px-4 py-2 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('vendor')}
                  className="hidden xl:inline-block px-3 py-2 rounded-xl border border-[#D4AF37] hover:bg-[#FAF3E0] text-[#8C6D23] text-xs font-bold transition"
                >
                  Vendor Login
                </button>
              </div>
            ) : (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-[#E72E77] transition bg-[#FAF8F5]"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E72E77] text-white flex items-center justify-center text-xs font-bold">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-[#1A1715] max-w-[80px] truncate hidden sm:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#1A1715]">{user.name}</p>
                      <p className="text-[10px] text-[#8C827A] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF3E0] text-[#8C6D23] border border-[#E8D8A6]">
                        {user.role === 'couple' ? 'Couple Host' : user.role === 'vendor' ? 'Verified Partner' : 'Admin'}
                      </span>
                    </div>

                    <div className="py-1 text-xs text-[#2D2B2A]">
                      {user.role === 'couple' && (
                        <>
                          <button
                            onClick={() => { setView('planner'); setUserMenuOpen(false); }}
                            className="w-full px-4 py-2 text-left hover:bg-[#FAF8F5] flex items-center gap-2"
                          >
                            <CalendarCheck className="w-4 h-4 text-[#E72E77]" />
                            <span>Wedding Desk & Budget</span>
                          </button>
                          <button
                            onClick={() => { setView('guests'); setUserMenuOpen(false); }}
                            className="w-full px-4 py-2 text-left hover:bg-[#FAF8F5] flex items-center gap-2"
                          >
                            <Users className="w-4 h-4 text-[#D4AF37]" />
                            <span>Guest & RSVP Manager</span>
                          </button>
                          <button
                            onClick={() => { setView('seating'); setUserMenuOpen(false); }}
                            className="w-full px-4 py-2 text-left hover:bg-[#FAF8F5] flex items-center gap-2"
                          >
                            <User className="w-4 h-4 text-emerald-600" />
                            <span>Table Seating Map</span>
                          </button>
                        </>
                      )}

                      {user.role === 'vendor' && (
                        <button
                          onClick={() => { setView('vendor-portal'); setUserMenuOpen(false); }}
                          className="w-full px-4 py-2 text-left hover:bg-[#FAF8F5] flex items-center gap-2"
                        >
                          <Briefcase className="w-4 h-4 text-[#E72E77]" />
                          <span>Vendor Studio Workspace</span>
                        </button>
                      )}

                      {user.role === 'admin' && (
                        <button
                          onClick={() => { setView('admin'); setUserMenuOpen(false); }}
                          className="w-full px-4 py-2 text-left hover:bg-[#FAF8F5] flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#E72E77]" />
                          <span>Admin Control Room</span>
                        </button>
                      )}

                      <button
                        onClick={() => { onLogout(); setUserMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 border-t border-gray-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. MOBILE SLIDEOUT DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => { setView('discover'); onScrollToSection('featured-venues'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FAF8F5] text-left hover:text-[#E72E77]"
            >
              🏰 Wedding Venues
            </button>
            <button
              onClick={() => { setView('discover'); onScrollToSection('top-categories'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FAF8F5] text-left hover:text-[#E72E77]"
            >
              📸 Wedding Vendors
            </button>
            <button
              onClick={() => { setView('discover'); onScrollToSection('inspiration-gallery'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FAF8F5] text-left hover:text-[#E72E77]"
            >
              ✨ Photo Inspiration
            </button>
            <button
              onClick={() => { setView('discover'); onScrollToSection('real-weddings'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FAF8F5] text-left hover:text-[#E72E77]"
            >
              💍 Real Weddings
            </button>
            <button
              onClick={() => { setView('website'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FAF8F5] text-left hover:text-[#E72E77]"
            >
              💌 Digital E-Invites
            </button>
            <button
              onClick={() => { setView('discover'); onScrollToSection('genie-banner'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FFF0F5] text-[#E72E77] text-left font-bold"
            >
              ⭐ Wedsta Genie Free
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => { onScrollToSection('app-download'); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-gray-600"
            >
              <Smartphone className="w-4 h-4 text-[#E72E77]" />
              <span>Get Mobile App</span>
            </button>
            <button
              onClick={() => { onOpenAuth('vendor'); setMobileMenuOpen(false); }}
              className="text-[#E72E77] font-semibold"
            >
              List Your Business
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
