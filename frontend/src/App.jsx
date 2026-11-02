import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import VendorMarketplace from './components/VendorMarketplace.jsx';
import VendorDetailModal from './components/VendorDetailModal.jsx';
import WeddingPlanner from './components/WeddingPlanner.jsx';
import GuestManager from './components/GuestManager.jsx';
import AiConcierge from './components/AiConcierge.jsx';
import SharedBoard from './components/SharedBoard.jsx';
import VendorPortal from './components/VendorPortal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AuthModal from './components/AuthModal.jsx';
import Toast from './components/Toast.jsx';

// 6 Royal Feature Expansions
import DigitalShagun from './components/DigitalShagun.jsx';
import LivePhotoDrop from './components/LivePhotoDrop.jsx';
import SangeetPlaylist from './components/SangeetPlaylist.jsx';
import PublicWeddingWebsite from './components/PublicWeddingWebsite.jsx';
import SeatingPlanner from './components/SeatingPlanner.jsx';
import PrintInvoiceModal from './components/PrintInvoiceModal.jsx';

// Interactive Productivity, Print & Gatekeeper Modals
import PrivateAccessGate from './components/PrivateAccessGate.jsx';
import PrintTableStandeeModal from './components/PrintTableStandeeModal.jsx';

// Data Fallbacks for 100% Standalone Offline Resilience
import { initialVenues, initialGuests, initialTracks, initialGovernance, multiFaithTraditions } from './data/index.js';

import { Heart, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('board')) return 'board';
    return 'discover';
  });

  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [tableStandeeModalOpen, setTableStandeeModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Multi-Faith & Vendor Marketplace state
  const [selectedFaith, setSelectedFaith] = useState('All Traditions');
  const [vendors, setVendors] = useState(initialVenues);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All vendors');
  const [selectedCity, setSelectedCity] = useState('All cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedVendorForDetail, setSelectedVendorForDetail] = useState(null);

  // Wedding & Planner state
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

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
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

  // 2. Fetch Vendors when filters (including faith) change
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
      filtered = filtered.filter(v => v.city === selectedCity);
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
      // Auto-switch view to their primary workspace
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
    } catch {}
    localStorage.removeItem('smart_shaadi_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setCurrentView('discover');
    showToast('Signed out of wedding desk');
  };

  const handleSwitchRole = async (creds, targetView) => {
    await handleLogin(creds);
    if (targetView) {
      setCurrentView(targetView);
    }
  };

  // Wedding & Planner Handlers
  const handleUpdateWedding = async (updates) => {
    try {
      const res = await axios.put('/api/wedding', updates);
      setWedding(res.data);
    } catch {
      showToast('Could not save wedding updates', 'error');
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await axios.post('/api/wedding/tasks', taskData);
      setWedding(prev => ({
        ...prev,
        tasks: [...(prev?.tasks || []), res.data]
      }));
    } catch {
      showToast('Could not add task', 'error');
    }
  };

  const handleToggleTask = async (taskId, done) => {
    try {
      await axios.patch(`/api/wedding/tasks/${taskId}`, { done });
      setWedding(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, done } : t)
      }));
    } catch {
      showToast('Could not update task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/wedding/tasks/${taskId}`);
      setWedding(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      }));
      showToast('Milestone removed');
    } catch {
      showToast('Could not delete task', 'error');
    }
  };

  const handleAddSchedule = async (scheduleData) => {
    try {
      const res = await axios.post('/api/wedding/schedule', scheduleData);
      setWedding(prev => ({
        ...prev,
        schedule: [...(prev?.schedule || []), res.data]
      }));
    } catch {
      showToast('Could not add event', 'error');
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await axios.delete(`/api/wedding/schedule/${scheduleId}`);
      setWedding(prev => ({
        ...prev,
        schedule: prev.schedule.filter(s => s.id !== scheduleId)
      }));
      showToast('Event removed from schedule');
    } catch {
      showToast('Could not delete event', 'error');
    }
  };

  // Guest Handlers
  const handleAddGuest = async (guestData) => {
    try {
      const res = await axios.post('/api/guests', guestData);
      setGuests(prev => [res.data, ...prev]);
      loadGuestData();
    } catch {
      showToast('Could not add guest', 'error');
    }
  };

  const handleUpdateGuest = async (guestId, updates) => {
    try {
      const res = await axios.patch(`/api/guests/${guestId}`, updates);
      setGuests(prev => prev.map(g => g.id === guestId ? res.data : g));
      loadGuestData();
      showToast('RSVP status updated');
    } catch {
      showToast('Could not update guest', 'error');
    }
  };

  const handleDeleteGuest = async (guestId) => {
    try {
      await axios.delete(`/api/guests/${guestId}`);
      setGuests(prev => prev.filter(g => g.id !== guestId));
      loadGuestData();
      showToast('Guest removed');
    } catch {
      showToast('Could not delete guest', 'error');
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] selection:bg-[#D4AF37] selection:text-white">
      
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setView={setCurrentView}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: DISCOVER VENDORS MARKETPLACE */}
        {currentView === 'discover' && (
          <div>
            <Hero
              selectedFaith={selectedFaith}
              setSelectedFaith={setSelectedFaith}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExplore={loadVendors}
            />

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

      {/* Royal Multi-Faith Footer */}
      <footer className="bg-royal-charcoal text-white border-t border-royal-gold/20 pt-12 sm:pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl royal-gradient-ruby flex items-center justify-center text-royal-gold font-serif font-bold text-xl shadow">
                  S
                </div>
                <span className="font-serif text-2xl font-bold tracking-wide">
                  Smart<span className="text-royal-ruby">Shaadi</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                India&apos;s all-faith luxury wedding planning platform. Connecting couples across Hindu Vivah, Muslim Nikah, Sikh Anand Karaj, Christian Nuptials, and Jain Vivah with verified venues, officiants, and artisans.
              </p>
              <div className="text-xs text-royal-lightGold font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-royal-gold flex-shrink-0" />
                <span>SmartEvent Karo • MERN Architecture</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-royal-lightGold uppercase tracking-wider mb-4">
                Sacred Traditions
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => { setSelectedFaith('Hindu'); setCurrentView('discover'); }} className="hover:text-white transition">🕉️ Hindu Vivah & Saat Phere</button></li>
                <li><button onClick={() => { setSelectedFaith('Muslim'); setCurrentView('discover'); }} className="hover:text-white transition">☪️ Muslim Nikah & Walima</button></li>
                <li><button onClick={() => { setSelectedFaith('Sikh'); setCurrentView('discover'); }} className="hover:text-white transition">☬ Sikh Anand Karaj (4 Laavan)</button></li>
                <li><button onClick={() => { setSelectedFaith('Christian'); setCurrentView('discover'); }} className="hover:text-white transition">✝️ Christian Nuptials & Mass</button></li>
                <li><button onClick={() => { setSelectedFaith('Jain'); setCurrentView('discover'); }} className="hover:text-white transition">🪷 Jain Vivah & Chouhar Feasts</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-royal-lightGold uppercase tracking-wider mb-4">
                Interactive Guest Suite
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => setCurrentView('shagun')} className="hover:text-white transition">🎁 Digital Shagun & UPI Registry</button></li>
                <li><button onClick={() => setCurrentView('photos')} className="hover:text-white transition">📸 Live Guest Photo Drop (QR)</button></li>
                <li><button onClick={() => setCurrentView('playlist')} className="hover:text-white transition">🎶 Sangeet & DJ Playlist Jam</button></li>
                <li><button onClick={() => setCurrentView('website')} className="hover:text-white transition">💍 Public Couple Wedding Site</button></li>
                <li><button onClick={() => setCurrentView('seating')} className="hover:text-white transition">🪑 Banquet Seating & Floor Map</button></li>
                <li><button onClick={() => setInvoiceModalOpen(true)} className="hover:text-white transition text-royal-gold">📄 Royal Estimate & Invoice</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-royal-lightGold uppercase tracking-wider mb-4">
                Concierge Hotline
              </h4>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-royal-ruby flex-shrink-0" />
                <span>Udaipur • Jaipur • Delhi NCR • Mumbai • Goa</span>
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-royal-gold flex-shrink-0" />
                <span>+91 98290 12345 (24/7 Desk)</span>
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-royal-ruby flex-shrink-0" />
                <span>concierge@smartshaadi.com</span>
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© 2026 Smart Shaadi (SmartEvent Karo). All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-royal-ruby fill-current" /> on MERN Stack for all Indian Wedding Traditions.
            </p>
          </div>
        </div>
      </footer>

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

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
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

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
