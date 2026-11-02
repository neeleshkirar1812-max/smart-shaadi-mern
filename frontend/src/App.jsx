import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 16 WedMeGood (WMG) Master Portal Components
import WmgTopBar from './components/wmg/WmgTopBar.jsx';
import WmgHeroSearch from './components/wmg/WmgHeroSearch.jsx';
import WmgVenueFilters from './components/wmg/WmgVenueFilters.jsx';
import WmgGenieBanner from './components/wmg/WmgGenieBanner.jsx';
import WmgTopCategoriesGrid from './components/wmg/WmgTopCategoriesGrid.jsx';
import WmgPopularCities from './components/wmg/WmgPopularCities.jsx';
import WmgFeaturedVendors from './components/wmg/WmgFeaturedVendors.jsx';
import WmgRealWeddings from './components/wmg/WmgRealWeddings.jsx';
import WmgInspirationGallery from './components/wmg/WmgInspirationGallery.jsx';
import WmgAppDownloadBanner from './components/wmg/WmgAppDownloadBanner.jsx';
import WmgEditorialJournal from './components/wmg/WmgEditorialJournal.jsx';
import WmgPlanningToolsSuite from './components/wmg/WmgPlanningToolsSuite.jsx';
import WmgDestinationShowcase from './components/wmg/WmgDestinationShowcase.jsx';
import WmgTrustSocialProof from './components/wmg/WmgTrustSocialProof.jsx';
import WmgVendorOnboarding from './components/wmg/WmgVendorOnboarding.jsx';
import WmgMegaFooter from './components/wmg/WmgMegaFooter.jsx';
import WmgSearchModal from './components/wmg/WmgSearchModal.jsx';
import WmgWishlistModal from './components/wmg/WmgWishlistModal.jsx';

// Core Vendor Marketplace & Detail Modal
import VendorMarketplace from './components/VendorMarketplace.jsx';
import VendorDetailModal from './components/VendorDetailModal.jsx';

// Role-Gated Planning Desks & Workspaces
import WeddingPlanner from './components/WeddingPlanner.jsx';
import GuestManager from './components/GuestManager.jsx';
import AiConcierge from './components/AiConcierge.jsx';
import SharedBoard from './components/SharedBoard.jsx';
import VendorPortal from './components/VendorPortal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AuthModal from './components/AuthModal.jsx';
import Toast from './components/Toast.jsx';

// Guest Experiences & Modals
import DigitalShagun from './components/DigitalShagun.jsx';
import LivePhotoDrop from './components/LivePhotoDrop.jsx';
import SangeetPlaylist from './components/SangeetPlaylist.jsx';
import PublicWeddingWebsite from './components/PublicWeddingWebsite.jsx';
import SeatingPlanner from './components/SeatingPlanner.jsx';
import PrintInvoiceModal from './components/PrintInvoiceModal.jsx';
import PrintTableStandeeModal from './components/PrintTableStandeeModal.jsx';
import PrivateAccessGate from './components/PrivateAccessGate.jsx';

// Data Fallbacks for 100% Offline Resilience
import { initialVenues, initialGuests } from './data/index.js';

import { 
  Sparkles, 
  ArrowLeft, 
  CalendarCheck, 
  Users, 
  Armchair, 
  Share2, 
  Bot, 
  Gift, 
  Camera, 
  Music, 
  Globe, 
  Briefcase, 
  ShieldCheck, 
  Search 
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('board')) return 'board';
    return 'discover';
  });

  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState('couple');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [tableStandeeModalOpen, setTableStandeeModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Multi-Faith & Vendor Marketplace State
  const [selectedFaith, setSelectedFaith] = useState('All Traditions');
  const [vendors, setVendors] = useState(initialVenues);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All vendors');
  const [selectedCity, setSelectedCity] = useState('All cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeVenueFilter, setActiveVenueFilter] = useState(null);
  const [selectedVendorForDetail, setSelectedVendorForDetail] = useState(null);

  // Wishlist State (synced to localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wmg_wishlist') || '["p1", "v1"]');
    } catch {
      return ['p1', 'v1'];
    }
  });

  // Wedding & Planner State
  const [wedding, setWedding] = useState({
    id: "w1",
    coupleName: "Ananya & Kabir",
    weddingDate: "2026-11-28",
    city: "Udaipur, Rajasthan",
    budget: 25000000,
    spent: 1280000,
    tasks: [
      { id: "t1", text: "Confirm The Leela Palace lakeside mandap & floating lawns", category: "Venue", done: true },
      { id: "t2", text: "Finalize Satvik Marwari & Pure Jain Chauvihar catering contract", category: "Catering", done: true },
      { id: "t3", text: "Book Vedic Pandit & Licensed Qazi for ceremonial blessing", category: "Officiant", done: false },
      { id: "t4", text: "Order bespoke vermillion bridal lehenga & groom sherwani", category: "Attire", done: false },
      { id: "t5", text: "Lock in live dhol troupe and sound limiter telemetry for Sangeet", category: "Music", done: false }
    ],
    schedule: [
      { id: "s1", event: "Mehendi & Sufi Qawwali Night", date: "2026-11-26", time: "05:00 PM", location: "Courtyard Lotus Fountain", dressCode: "Yellow & Green Pastels" },
      { id: "s2", event: "Sangeet Beats Dance Faceoff", date: "2026-11-27", time: "07:30 PM", location: "Amphitheatre Deck", dressCode: "Indo-Western Glitz" },
      { id: "s3", event: "Saat Phere & Sunset Mandap Ceremony", date: "2026-11-28", time: "05:30 PM", location: "Floating Lake Pichola Mandap", dressCode: "Royal Traditional Silk" },
      { id: "s4", event: "Grand Royal Reception & Walima Gala", date: "2026-11-28", time: "08:30 PM", location: "Grand Mewar Ballroom", dressCode: "Black Tie / Royal Sherwani" }
    ]
  });

  // Guest list state
  const [guests, setGuests] = useState(initialGuests);
  const [guestStats, setGuestStats] = useState({ 
    total: initialGuests.length, 
    confirmed: initialGuests.filter(g => g.rsvpStatus === 'Confirmed').length, 
    pending: initialGuests.filter(g => g.rsvpStatus === 'Pending').length, 
    declined: initialGuests.filter(g => g.rsvpStatus === 'Declined').length, 
    totalAttendees: initialGuests.reduce((s, g) => s + (g.attendeesCount || 1), 0), 
    rsvpPercent: 88 
  });

  // Bookings state
  const [bookings, setBookings] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wmg_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Wishlist Handlers
  const handleToggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRemoveWishlistItem = (id) => {
    setWishlist(prev => prev.filter(item => item !== id));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared');
  };

  // Global Keyboard Shortcut: Press '/' to trigger Search Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (id) => {
    if (currentView !== 'discover') {
      setCurrentView('discover');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Initial Load & Auth Check
  useEffect(() => {
    const token = localStorage.getItem('smart_shaadi_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('smart_shaadi_token');
          delete axios.defaults.headers.common['Authorization'];
        });
    }
    loadWeddingData();
    loadGuestData();
    loadBookings();
  }, []);

  // 2. Fetch Vendors when filters change
  useEffect(() => {
    loadVendors();
  }, [selectedFaith, selectedCategory, selectedCity, verifiedOnly]);

  const loadVendors = async () => {
    setLoadingVendors(true);
    try {
      const res = await axios.get('/api/vendors', {
        params: {
          faith: selectedFaith,
          category: selectedCategory,
          city: selectedCity,
          search: searchQuery,
          verified: verifiedOnly ? 'true' : undefined
        }
      });
      if (res.data && res.data.length > 0) {
        setVendors(res.data);
      } else {
        filterLocalVenues();
      }
    } catch {
      filterLocalVenues();
    } finally {
      setLoadingVendors(false);
    }
  };

  const filterLocalVenues = () => {
    let filtered = [...initialVenues];
    if (selectedFaith !== 'All Traditions') {
      filtered = filtered.filter(v => 
        v.faith === selectedFaith || 
        v.faith === 'All Traditions' || 
        v.faithTags?.some(t => t.toLowerCase().includes(selectedFaith.toLowerCase()))
      );
    }
    if (selectedCategory !== 'All vendors') {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }
    if (selectedCity !== 'All cities') {
      filtered = filtered.filter(v => 
        v.city.toLowerCase().includes(selectedCity.toLowerCase().split(' ')[0])
      );
    }
    if (verifiedOnly) {
      filtered = filtered.filter(v => v.verified);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(q) || 
        v.description.toLowerCase().includes(q) || 
        v.city.toLowerCase().includes(q)
      );
    }
    setVendors(filtered);
  };

  const loadWeddingData = async () => {
    try {
      const res = await axios.get('/api/wedding');
      setWedding(res.data);
    } catch (err) {
      console.warn('Wedding data fetch fallback', err);
    }
  };

  const loadGuestData = async () => {
    try {
      const res = await axios.get('/api/guests');
      setGuests(res.data.guests);
      setGuestStats(res.data.stats);
    } catch (err) {
      console.warn('Guest data fetch fallback', err);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await axios.get('/api/bookings');
      setBookings(res.data);
    } catch (err) {
      console.warn('Bookings fetch fallback', err);
    }
  };

  // Auth Handlers
  const handleLogin = async (creds) => {
    try {
      const res = await axios.post('/api/auth/login', creds);
      const { token, user: loggedUser } = res.data;
      localStorage.setItem('smart_shaadi_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(loggedUser);
      showToast(`Welcome back, ${loggedUser.name}! ✨`);
      loadWeddingData();
      loadBookings();
      if (loggedUser.role === 'couple') {
        setCurrentView('planner');
      } else if (loggedUser.role === 'vendor') {
        setCurrentView('vendor-portal');
      } else if (loggedUser.role === 'admin') {
        setCurrentView('admin');
      }
    } catch (err) {
      showToast(err.response?.data?.detail || 'Invalid login credentials', 'error');
      throw err;
    }
  };

  const handleRegister = async (data) => {
    try {
      const res = await axios.post('/api/auth/register', data);
      const { token, user: newUser } = res.data;
      localStorage.setItem('smart_shaadi_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(newUser);
      showToast(`Account created for ${newUser.name}! Welcome.`);
      loadWeddingData();
      loadBookings();
      if (newUser.role === 'couple') {
        setCurrentView('planner');
      } else if (newUser.role === 'vendor') {
        setCurrentView('vendor-portal');
      }
    } catch (err) {
      showToast(err.response?.data?.detail || 'Registration failed', 'error');
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('smart_shaadi_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setCurrentView('discover');
      showToast('Logged out securely');
    }
  };

  // Planner Task & Schedule Handlers
  const handleUpdateWedding = async (updates) => {
    try {
      const res = await axios.patch('/api/wedding', updates);
      setWedding(res.data);
      showToast('Wedding details updated');
    } catch {
      setWedding(prev => ({ ...prev, ...updates }));
      showToast('Updated locally (offline mode)');
    }
  };

  const handleAddTask = async (taskText, category = "General") => {
    try {
      const res = await axios.post('/api/wedding/tasks', { text: taskText, category });
      setWedding(prev => ({
        ...prev,
        tasks: [...(prev.tasks || []), res.data]
      }));
      showToast('Task added to wedding checklist');
    } catch {
      const newTask = { id: `t_${Date.now()}`, text: taskText, category, done: false };
      setWedding(prev => ({
        ...prev,
        tasks: [...(prev.tasks || []), newTask]
      }));
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await axios.patch(`/api/wedding/tasks/${taskId}/toggle`);
      setWedding(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? res.data : t)
      }));
    } catch {
      setWedding(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
      }));
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/wedding/tasks/${taskId}`);
      setWedding(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      }));
    } catch {
      setWedding(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      }));
    }
  };

  const handleAddSchedule = async (scheduleItem) => {
    try {
      const res = await axios.post('/api/wedding/schedule', scheduleItem);
      setWedding(prev => ({
        ...prev,
        schedule: [...(prev.schedule || []), res.data]
      }));
      showToast('Event added to wedding itinerary');
    } catch {
      const newSched = { ...scheduleItem, id: `s_${Date.now()}` };
      setWedding(prev => ({
        ...prev,
        schedule: [...(prev.schedule || []), newSched]
      }));
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await axios.delete(`/api/wedding/schedule/${scheduleId}`);
      setWedding(prev => ({
        ...prev,
        schedule: prev.schedule.filter(s => s.id !== scheduleId)
      }));
    } catch {
      setWedding(prev => ({
        ...prev,
        schedule: prev.schedule.filter(s => s.id !== scheduleId)
      }));
    }
  };

  // Guest Handlers
  const handleAddGuest = async (guestData) => {
    try {
      const res = await axios.post('/api/guests', guestData);
      setGuests(prev => [res.data, ...prev]);
      loadGuestData();
      showToast(`Guest ${guestData.name} invited!`);
    } catch {
      const newGuest = { ...guestData, id: `g_${Date.now()}` };
      setGuests(prev => [newGuest, ...prev]);
    }
  };

  const handleUpdateGuest = async (guestId, updates) => {
    try {
      const res = await axios.patch(`/api/guests/${guestId}`, updates);
      setGuests(prev => prev.map(g => g.id === guestId ? res.data : g));
      loadGuestData();
      showToast('RSVP status updated');
    } catch {
      setGuests(prev => prev.map(g => g.id === guestId ? { ...g, ...updates } : g));
    }
  };

  const handleDeleteGuest = async (guestId) => {
    try {
      await axios.delete(`/api/guests/${guestId}`);
      setGuests(prev => prev.filter(g => g.id !== guestId));
      loadGuestData();
      showToast('Guest removed');
    } catch {
      setGuests(prev => prev.filter(g => g.id !== guestId));
    }
  };

  // Booking Inquiry Handler
  const handleSubmitBookingInquiry = async (inquiryData) => {
    try {
      const res = await axios.post('/api/bookings', inquiryData);
      setBookings(prev => [res.data, ...prev]);
      showToast('Inquiry dispatched to vendor studio! 💌');
    } catch {
      showToast('Could not submit inquiry', 'error');
    }
  };

  // Vendor Quote Submission
  const handleSendVendorQuote = async (bookingId, quoteData) => {
    try {
      const res = await axios.post(`/api/bookings/${bookingId}/quote`, quoteData);
      setBookings(prev => prev.map(b => b.id === bookingId ? res.data.booking : b));
    } catch {
      showToast('Could not send quote', 'error');
    }
  };

  // Admin Vendor Approval
  const handleApproveVendor = async (vendorId, approved) => {
    try {
      const res = await axios.patch(`/api/vendors/${vendorId}/approval`, { approved });
      setVendors(prev => prev.map(v => v.id === vendorId ? res.data.vendor : v));
    } catch {
      showToast('Could not update vendor approval status', 'error');
    }
  };

  const resetFilters = () => {
    setSelectedFaith('All Traditions');
    setSelectedCategory('All vendors');
    setSelectedCity('All cities');
    setSearchQuery('');
    setVerifiedOnly(false);
    setActiveVenueFilter(null);
  };

  // Filter Pill Handler
  const handleApplyFilterPill = (query) => {
    setSearchQuery(query);
    loadVendors();
    scrollToSection('catalog-marketplace');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] selection:bg-[#E72E77] selection:text-white font-sans">
      
      {/* SECTION 1: GLOBAL NAVIGATION BAR & CITY SELECTOR HEADER */}
      <WmgTopBar
        currentView={currentView}
        setView={setCurrentView}
        selectedCity={selectedCity}
        setSelectedCity={(city) => { setSelectedCity(city); loadVendors(); }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        wishlistCount={wishlist.length}
        user={user}
        onOpenAuth={(role = 'couple') => {
          setAuthModalRole(role);
          setAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        onScrollToSection={scrollToSection}
      />

      {/* QUICK WORKSPACE ACCESS STRIP (Shown when user is inside planning/management views) */}
      {currentView !== 'discover' && (
        <div className="bg-[#FAF3E0] border-b border-[#E8D8A6] px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4">
            <button
              onClick={() => setCurrentView('discover')}
              className="flex items-center gap-1.5 text-[#E72E77] font-bold hover:underline flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to WedMeGood Master Portal</span>
            </button>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setCurrentView('planner')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'planner' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                Wedding Desk
              </button>
              <button
                onClick={() => setCurrentView('guests')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'guests' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                Guest & RSVP
              </button>
              <button
                onClick={() => setCurrentView('seating')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'seating' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                Table Seating
              </button>
              <button
                onClick={() => setCurrentView('shagun')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'shagun' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                Digital Shagun
              </button>
              <button
                onClick={() => setCurrentView('photos')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'photos' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                Photo Drop
              </button>
              <button
                onClick={() => setCurrentView('playlist')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'playlist' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                DJ Sangeet
              </button>
              <button
                onClick={() => setCurrentView('website')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${currentView === 'website' ? 'bg-[#E72E77] text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
              >
                Couple Website
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: COMPLETE 16-SECTION WEDMEGOOD MASTER REPLICA */}
        {currentView === 'discover' && (
          <div>
            
            {/* SECTION 2: HERO SEARCH BANNER & CATEGORY QUICK BAR */}
            <WmgHeroSearch
              selectedFaith={selectedFaith}
              setSelectedFaith={setSelectedFaith}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExplore={() => {
                loadVendors();
                scrollToSection('catalog-marketplace');
              }}
            />

            {/* SECTION 3: POPULAR VENUE SEARCHES & FILTER PILLS */}
            <WmgVenueFilters
              activeFilter={activeVenueFilter}
              setActiveFilter={setActiveVenueFilter}
              onApplyFilter={handleApplyFilterPill}
            />

            {/* SECTION 4: WEDMEGOOD GENIE / WEDSTA CONCIERGE BANNER */}
            <WmgGenieBanner showToast={showToast} />

            {/* SECTION 5: TOP VENDOR CATEGORIES VISUAL GRID (8-CARD) */}
            <WmgTopCategoriesGrid
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                loadVendors();
                scrollToSection('catalog-marketplace');
              }}
            />

            {/* SECTION 6: POPULAR CITIES & HERITAGE DESTINATIONS */}
            <WmgPopularCities
              selectedCity={selectedCity}
              onSelectCity={(city) => {
                setSelectedCity(city);
                loadVendors();
                scrollToSection('catalog-marketplace');
              }}
            />

            {/* SECTION 7: FEATURED & WEDMEGOOD VERIFIED GOLD VENDORS */}
            <WmgFeaturedVendors
              vendors={vendors}
              onSelectVendor={(v) => setSelectedVendorForDetail(v)}
              onBookVendor={(v) => setSelectedVendorForDetail(v)}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
            />

            {/* CORE CATALOG MARKETPLACE & FILTERS */}
            <div id="catalog-marketplace">
              <VendorMarketplace
                vendors={vendors}
                loading={loadingVendors}
                selectedFaith={selectedFaith}
                setSelectedFaith={setSelectedFaith}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={setVerifiedOnly}
                onSelectVendor={(v) => setSelectedVendorForDetail(v)}
                onBookVendor={(v) => setSelectedVendorForDetail(v)}
                onResetFilters={resetFilters}
              />
            </div>

            {/* SECTION 8: REAL WEDDING STORIES (WMG REAL WEDDINGS) */}
            <WmgRealWeddings />

            {/* SECTION 9: CURATED PHOTO GALLERY & INSPIRATION FEED */}
            <WmgInspirationGallery
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              showToast={showToast}
            />

            {/* SECTION 10: OFFICIAL WEDMEGOOD MOBILE APP DOWNLOAD BANNER */}
            <WmgAppDownloadBanner showToast={showToast} />

            {/* SECTION 11: WMG EDITORIAL & WEDDING JOURNAL */}
            <WmgEditorialJournal />

            {/* SECTION 12: DIGITAL WEDDING PLANNING TOOLS SUITE */}
            <WmgPlanningToolsSuite
              setView={setCurrentView}
              onOpenStandee={() => setTableStandeeModalOpen(true)}
            />

            {/* SECTION 13: DESTINATION WEDDING SHOWCASE */}
            <WmgDestinationShowcase
              onSelectDestination={(dest) => {
                setSelectedCity(dest);
                loadVendors();
                scrollToSection('catalog-marketplace');
              }}
            />

            {/* SECTION 14: CUSTOMER TRUST, SOCIAL PROOF & MEDIA MENTIONS */}
            <WmgTrustSocialProof />

            {/* SECTION 15: VENDOR PARTNER ONBOARDING BANNER */}
            <WmgVendorOnboarding
              onOpenVendorAuth={(role) => {
                setAuthModalRole(role);
                setAuthModalOpen(true);
              }}
            />

          </div>
        )}

        {/* VIEW 2: WEDDING PLANNER & BUDGET (CONFIDENTIAL TO COUPLE) */}
        {currentView === 'planner' && (
          !user ? (
            <PrivateAccessGate
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateWebsite={() => setCurrentView('website')}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          ) : (
            <WeddingPlanner
              wedding={wedding}
              onUpdateWedding={handleUpdateWedding}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onAddSchedule={handleAddSchedule}
              onDeleteSchedule={handleDeleteSchedule}
              onOpenInvoice={() => setInvoiceModalOpen(true)}
              showToast={showToast}
            />
          )
        )}

        {/* VIEW 3: GUEST LIST & RSVP (CONFIDENTIAL TO HOST) */}
        {currentView === 'guests' && (
          !user ? (
            <PrivateAccessGate
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateWebsite={() => setCurrentView('website')}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          ) : (
            <GuestManager
              guests={guests}
              stats={guestStats}
              onAddGuest={handleAddGuest}
              onUpdateGuest={handleUpdateGuest}
              onDeleteGuest={handleDeleteGuest}
              showToast={showToast}
            />
          )
        )}

        {/* VIEW 4: AI CONCIERGE & ADVISOR */}
        {currentView === 'ai' && (
          <AiConcierge showToast={showToast} />
        )}

        {/* VIEW 5: SHARED FAMILY BOARD (CONFIDENTIAL) */}
        {currentView === 'board' && (
          !user ? (
            <PrivateAccessGate
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateWebsite={() => setCurrentView('website')}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          ) : (
            <SharedBoard user={user} showToast={showToast} />
          )
        )}

        {/* VIEW 6: DIGITAL SHAGUN & GIFT REGISTRY (PUBLIC FOR GUESTS) */}
        {currentView === 'shagun' && (
          <DigitalShagun
            onOpenStandee={() => setTableStandeeModalOpen(true)}
            showToast={showToast}
          />
        )}

        {/* VIEW 7: LIVE PHOTO DROP / CANDID ALBUM (PUBLIC FOR GUESTS) */}
        {currentView === 'photos' && (
          <LivePhotoDrop
            onOpenStandee={() => setTableStandeeModalOpen(true)}
            showToast={showToast}
          />
        )}

        {/* VIEW 8: SANGEET & DJ PLAYLIST JAM (PUBLIC FOR GUESTS) */}
        {currentView === 'playlist' && (
          <SangeetPlaylist showToast={showToast} />
        )}

        {/* VIEW 9: PUBLIC WEDDING WEBSITE & TIMELINE (PUBLIC FOR GUESTS) */}
        {currentView === 'website' && (
          <PublicWeddingWebsite
            wedding={wedding}
            onNavigateToShagun={() => setCurrentView('shagun')}
            onNavigateToPhotos={() => setCurrentView('photos')}
            showToast={showToast}
          />
        )}

        {/* VIEW 10: BANQUET SEATING & FLOOR PLANNER (CONFIDENTIAL TO HOST) */}
        {currentView === 'seating' && (
          !user ? (
            <PrivateAccessGate
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateWebsite={() => setCurrentView('website')}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          ) : (
            <SeatingPlanner
              guests={guests}
              showToast={showToast}
            />
          )
        )}

        {/* VIEW 11: VENDOR STUDIO PORTAL (CONFIDENTIAL TO VENDORS) */}
        {currentView === 'vendor-portal' && (
          user?.role !== 'vendor' ? (
            <PrivateAccessGate
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateWebsite={() => setCurrentView('website')}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          ) : (
            <VendorPortal
              bookings={bookings}
              onSendQuote={handleSendVendorQuote}
              user={user}
              showToast={showToast}
            />
          )
        )}

        {/* VIEW 12: ADMIN CONTROL ROOM (CONFIDENTIAL TO ADMINS) */}
        {currentView === 'admin' && (
          user?.role !== 'admin' ? (
            <PrivateAccessGate
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateWebsite={() => setCurrentView('website')}
              onNavigateDiscover={() => setCurrentView('discover')}
            />
          ) : (
            <AdminDashboard
              vendors={vendors}
              onApproveVendor={handleApproveVendor}
              showToast={showToast}
            />
          )
        )}

      </main>

      {/* SECTION 16: COMPREHENSIVE MEGA-FOOTER & SEO DIRECTORY */}
      <WmgMegaFooter
        setSelectedCity={(city) => { setSelectedCity(city); loadVendors(); }}
        setSelectedCategory={(cat) => { setSelectedCategory(cat); loadVendors(); }}
        setSelectedFaith={(faith) => { setSelectedFaith(faith); loadVendors(); }}
        setView={setCurrentView}
        onOpenAuth={(role) => {
          setAuthModalRole(role);
          setAuthModalOpen(true);
        }}
      />

      {/* Vendor Profile & Booking Modal */}
      {selectedVendorForDetail && (
        <VendorDetailModal
          vendor={selectedVendorForDetail}
          onClose={() => setSelectedVendorForDetail(null)}
          onSubmitInquiry={handleSubmitBookingInquiry}
          user={user}
          onRequireLogin={() => {
            setSelectedVendorForDetail(null);
            setAuthModalOpen(true);
          }}
        />
      )}

      {/* Auth Modal with Role Switching */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          initialRole={authModalRole}
        />
      )}

      {/* Royal Estimate & Invoice Modal */}
      {invoiceModalOpen && (
        <PrintInvoiceModal
          wedding={wedding}
          onClose={() => setInvoiceModalOpen(false)}
          showToast={showToast}
        />
      )}

      {/* Royal Dining Table QR Standee Card Modal */}
      {tableStandeeModalOpen && (
        <PrintTableStandeeModal
          wedding={wedding}
          onClose={() => setTableStandeeModalOpen(false)}
          showToast={showToast}
        />
      )}

      {/* Keyboard-Triggered Instant Search Modal */}
      <WmgSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          loadVendors();
          scrollToSection('catalog-marketplace');
        }}
        onSelectCity={(city) => {
          setSelectedCity(city);
          loadVendors();
          scrollToSection('catalog-marketplace');
        }}
        onExecuteSearch={() => {
          loadVendors();
          scrollToSection('catalog-marketplace');
        }}
        vendors={vendors}
      />

      {/* Persistent Saved Wishlist Modal */}
      <WmgWishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onClearWishlist={handleClearWishlist}
        vendors={vendors}
        onSelectVendor={(v) => setSelectedVendorForDetail(v)}
        onOpenGenie={() => scrollToSection('genie-banner')}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
