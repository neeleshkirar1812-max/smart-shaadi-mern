import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  MapPin, 
  Search, 
  ChevronDown, 
  Star, 
  Smartphone, 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Check, 
  Sparkles,
  Camera,
  Brush,
  Paintbrush,
  Music,
  Mail,
  UtensilsCrossed,
  Shirt,
  Gem,
  Flame,
  CalendarCheck,
  Users
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
  { name: 'Jaipur', state: 'Rajasthan', count: '1,850+ Palaces' },
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
  const [vendorsMenuOpen, setVendorsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cityRef = useRef(null);
  const vendorsRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityDropdownOpen(false);
      }
      if (vendorsRef.current && !vendorsRef.current.contains(e.target)) {
        setVendorsMenuOpen(false);
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

  const handleMegaMenuCategory = (catName) => {
    setVendorsMenuOpen(false);
    setView('discover');
    onScrollToSection('catalog-marketplace');
  };

  const currentDisplayCity = selectedCity === 'All cities' ? 'All Cities' : selectedCity;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 font-sans">
      
      {/* 1. TOP UTILITY BAR (Verbatim WedMeGood Style) */}
      <div className="bg-[#FAF8F5] border-b border-gray-200/70 text-xs text-[#6B6866] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Tagline with Pink Heart */}
          <div className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs text-[#2D2B2A]">
            <span>India&apos;s Favourite Wedding Planning Platform</span>
            <Heart className="w-3.5 h-3.5 text-[#E72E77] fill-[#E72E77] inline animate-pulse" />
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <button 
              onClick={() => {
                if (!user) onOpenAuth('couple');
                else onScrollToSection('real-weddings');
              }} 
              className="flex items-center gap-1 text-[#6B6866] hover:text-[#E72E77] transition font-medium"
            >
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Write A Review</span>
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => onScrollToSection('app-download')} 
              className="flex items-center gap-1 text-[#6B6866] hover:text-[#E72E77] transition font-medium"
            >
              <Smartphone className="w-3 h-3 text-[#E72E77]" />
              <span>Download App</span>
            </button>
            <span className="hidden sm:inline text-gray-300">|</span>
            <button 
              onClick={() => onOpenAuth('vendor')}
              className="hidden sm:flex items-center gap-1 text-[#E72E77] hover:text-[#B60056] font-bold transition"
            >
              <Briefcase className="w-3 h-3" />
              <span>Register as a Vendor</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. BRAND NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Signature WedMeGood Butterfly Monogram Wordmark */}
            <button 
              onClick={() => setView('discover')}
              className="flex items-center gap-2.5 text-left group focus:outline-none flex-shrink-0"
            >
              {/* Butterfly Monogram Emblem */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E72E77] to-[#B60056] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path d="M12 2C11.5 3.5 10 5 8 5C5.5 5 4 7 4 10C4 13.5 6.5 17 11 20C11.5 20.3 12.5 20.3 13 20C17.5 17 20 13.5 20 10C20 7 18.5 5 16 5C14 5 12.5 3.5 12 2ZM8 7C9.5 7 10.8 7.8 11.5 9C10.5 10.5 9 12 7 12C6.5 12 6 11.5 6 10.5C6 8.5 7 7 8 7ZM16 7C17 7 18 8.5 18 10.5C18 11.5 17.5 12 17 12C15 12 13.5 10.5 12.5 9C13.2 7.8 14.5 7 16 7Z"/>
                </svg>
              </div>

              {/* Wordmark */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1715] group-hover:text-[#E72E77] transition-colors">
                    WedMe<span className="text-[#E72E77]">Good</span>
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#8C827A] font-semibold">
                  SmartShaadi Edition
                </span>
              </div>
            </button>

            {/* City Dropdown Selector */}
            <div className="relative" ref={cityRef}>
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-gray-200 text-xs font-semibold text-[#1A1715] transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E72E77]" />
                <span className="max-w-[90px] sm:max-w-[130px] truncate">{currentDisplayCity}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                      Select Wedding City
                    </span>
                    <span className="text-[10px] text-[#E72E77] font-bold">
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

          {/* Desktop Nav Tabs with 4-Column Vendors Mega-Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#2D2B2A]">
            
            {/* Tab: Venues */}
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('featured-venues');
              }} 
              className="hover:text-[#E72E77] transition py-2"
            >
              Venues
            </button>

            {/* Tab: Vendors (EXACT 4-COLUMN MEGA-MENU) */}
            <div 
              className="relative" 
              ref={vendorsRef}
              onMouseEnter={() => setVendorsMenuOpen(true)}
              onMouseLeave={() => setVendorsMenuOpen(false)}
            >
              <button 
                onClick={() => setVendorsMenuOpen(!vendorsMenuOpen)}
                className="hover:text-[#E72E77] transition py-2 flex items-center gap-1 group"
              >
                <span>Vendors</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-[#E72E77] transition-transform ${vendorsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* 4-COLUMN MEGA-MENU DROPDOWN */}
              {vendorsMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-[880px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-4 gap-6 text-left">
                    
                    {/* COLUMN 1 */}
                    <div className="space-y-4">
                      {/* Photographers */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" />
                          <span>Photographers</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Photographer')} className="hover:text-[#E72E77] transition">Candid Photographers</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Photographer')} className="hover:text-[#E72E77] transition">Traditional Photographers</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Photographer')} className="hover:text-[#E72E77] transition">Cinema / Video</button></li>
                        </ul>
                      </div>

                      {/* Makeup */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Brush className="w-3.5 h-3.5" />
                          <span>Makeup</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Makeup Artist')} className="hover:text-[#E72E77] transition">Bridal Makeup</button></li>
                          <li className="flex items-center gap-1">
                            <button onClick={() => handleMegaMenuCategory('Makeup Artist')} className="hover:text-[#E72E77] transition">Family Makeup</button>
                            <span className="text-[8px] bg-[#E72E77] text-white px-1 py-0.2 rounded font-bold">WMG SERVICE</span>
                          </li>
                        </ul>
                      </div>

                      {/* Planning & Decor */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Paintbrush className="w-3.5 h-3.5" />
                          <span>Planning & Decor</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Wedding Planner')} className="hover:text-[#E72E77] transition">Wedding Planners</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Decorator')} className="hover:text-[#E72E77] transition">Decorators</button></li>
                        </ul>
                      </div>

                      {/* Virtual Planning */}
                      <div className="pt-1">
                        <div className="p-2.5 rounded-xl bg-[#FAF3E0] border border-[#E8D8A6] flex items-center justify-between">
                          <span className="text-xs font-bold text-[#8C6D23]">Virtual Planning</span>
                          <span className="text-[8px] bg-[#D4AF37] text-white px-1.5 py-0.5 rounded font-bold uppercase">WMG SERVICE</span>
                        </div>
                      </div>

                      {/* Mehndi */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1 flex items-center gap-1.5">
                          <span>Mehndi</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Mehndi Artist')} className="hover:text-[#E72E77] transition">Bridal Mehndi Artists</button></li>
                        </ul>
                      </div>
                    </div>

                    {/* COLUMN 2 */}
                    <div className="space-y-4">
                      {/* Music & Dance */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5" />
                          <span>Music & Dance</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Music')} className="hover:text-[#E72E77] transition">DJs & Sound</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Music')} className="hover:text-[#E72E77] transition">Sangeet Choreographer</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Music')} className="hover:text-[#E72E77] transition">Live Entertainment</button></li>
                        </ul>
                      </div>

                      {/* Invites & Gifts */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          <span>Invites & Gifts</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Invitations')} className="hover:text-[#E72E77] transition">Wedding Invitations</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Invitations')} className="hover:text-[#E72E77] transition">Favors & Gifts</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Invitations')} className="hover:text-[#E72E77] transition">Trousseau Packing</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Invitations')} className="text-[#E72E77] font-bold hover:underline">View All Invites</button></li>
                        </ul>
                      </div>

                      {/* Food */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <UtensilsCrossed className="w-3.5 h-3.5" />
                          <span>Food</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Caterer')} className="hover:text-[#E72E77] transition">Catering Services</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Caterer')} className="hover:text-[#E72E77] transition">Wedding Cake</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Caterer')} className="hover:text-[#E72E77] transition">Chaat & Food Stalls</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Caterer')} className="hover:text-[#E72E77] transition">Bartenders</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Caterer')} className="text-[#E72E77] font-bold hover:underline">View All Food</button></li>
                        </ul>
                      </div>
                    </div>

                    {/* COLUMN 3 */}
                    <div className="space-y-4">
                      {/* Pre Wedding Shoot */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" />
                          <span>Pre Wedding Shoot</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Photographer')} className="hover:text-[#E72E77] transition">Pre Wedding Shoot Locations</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Photographer')} className="hover:text-[#E72E77] transition">Pre Wedding Photographers</button></li>
                        </ul>
                      </div>

                      {/* Bridal Wear */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Shirt className="w-3.5 h-3.5" />
                          <span>Bridal Wear</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Bridal Wear')} className="hover:text-[#E72E77] transition">Bridal Lehengas</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Bridal Wear')} className="hover:text-[#E72E77] transition">Kanjeevaram / Silk Sarees</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Bridal Wear')} className="hover:text-[#E72E77] transition">Cocktail Gowns</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Bridal Wear')} className="hover:text-[#E72E77] transition">Bridal Lehengas on Rent</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Bridal Wear')} className="text-[#E72E77] font-bold hover:underline">View All Bridal Wear</button></li>
                        </ul>
                      </div>

                      {/* Groom Wear */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Shirt className="w-3.5 h-3.5" />
                          <span>Groom Wear</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Groom Wear')} className="hover:text-[#E72E77] transition">Sherwani</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Groom Wear')} className="hover:text-[#E72E77] transition">Wedding Suits / Tuxedos</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Groom Wear')} className="hover:text-[#E72E77] transition">Sherwani on Rent</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Groom Wear')} className="text-[#E72E77] font-bold hover:underline">View All Groom Wear</button></li>
                        </ul>
                      </div>
                    </div>

                    {/* COLUMN 4 */}
                    <div className="space-y-4">
                      {/* Jewellery & Accessories */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Gem className="w-3.5 h-3.5" />
                          <span>Jewellery & Accessories</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Jewellery')} className="hover:text-[#E72E77] transition">Bridal Jewellery</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Jewellery')} className="hover:text-[#E72E77] transition">Floral Jewellery</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Jewellery')} className="hover:text-[#E72E77] transition">Jewellery on Rent</button></li>
                          <li><button onClick={() => handleMegaMenuCategory('Jewellery')} className="text-[#E72E77] font-bold hover:underline">View All Jewellery</button></li>
                        </ul>
                      </div>

                      {/* Pandits */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" />
                          <span>Pandits</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Pandit')} className="hover:text-[#E72E77] transition">Wedding Pandits & Priests</button></li>
                        </ul>
                      </div>

                      {/* Bridal Grooming */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Bridal Grooming</span>
                        </h4>
                        <ul className="text-xs space-y-1 text-gray-600">
                          <li><button onClick={() => handleMegaMenuCategory('Beauty')} className="hover:text-[#E72E77] transition">Beauty & Wellness</button></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Tab: Photos */}
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('inspiration-gallery');
              }} 
              className="hover:text-[#E72E77] transition py-2"
            >
              Photos
            </button>

            {/* Tab: Real Weddings */}
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('real-weddings');
              }} 
              className="hover:text-[#E72E77] transition py-2"
            >
              Real Weddings
            </button>

            {/* Tab: Blog */}
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('editorial-journal');
              }} 
              className="hover:text-[#E72E77] transition py-2"
            >
              Blog
            </button>

            {/* Tab: E-Invites */}
            <button 
              onClick={() => setView('website')} 
              className="hover:text-[#E72E77] transition py-2 flex items-center gap-1"
            >
              <span>E-Invites</span>
              <span className="text-[9px] bg-[#E72E77] text-white px-1.5 py-0.2 rounded-full font-bold">New</span>
            </button>

            {/* Tab: Genie [NEW] */}
            <button 
              onClick={() => {
                setView('discover');
                onScrollToSection('genie-banner');
              }} 
              className="text-[#E72E77] hover:text-[#B60056] transition py-2 font-bold flex items-center gap-1.5"
            >
              <span>Genie</span>
              <span className="text-[9px] bg-[#E72E77] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                NEW
              </span>
            </button>

          </nav>

          {/* Right Action Cluster: Search Trigger, Wishlist, Auth */}
          <div className="flex items-center gap-3">
            
            {/* Instant Search Bar Trigger with [/] shortcut */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-gray-200/80 text-xs text-[#8C827A] transition"
              title="Press / to search"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-gray-400 border border-gray-200">
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E72E77] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Auth Button or User Profile */}
            {!user ? (
              <button
                onClick={() => onOpenAuth('couple')}
                className="px-5 py-2.5 rounded-full bg-[#E72E77] hover:bg-[#B60056] text-white text-xs font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Log In
              </button>
            ) : (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#E72E77] transition bg-[#FAF8F5]"
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
                    </div>

                    <div className="py-1 text-xs text-[#2D2B2A]">
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

            {/* Mobile Hamburger Menu */}
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
              ✨ Photos
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
              💌 E-Invites
            </button>
            <button
              onClick={() => { setView('discover'); onScrollToSection('genie-banner'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#FFF0F5] text-[#E72E77] text-left font-bold"
            >
              ⭐ Genie [NEW]
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => { onScrollToSection('app-download'); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-gray-600"
            >
              <Smartphone className="w-4 h-4 text-[#E72E77]" />
              <span>Download App</span>
            </button>
            <button
              onClick={() => { onOpenAuth('vendor'); setMobileMenuOpen(false); }}
              className="text-[#E72E77] font-semibold"
            >
              Register as a Vendor
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
