import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  CalendarCheck, 
  Users, 
  Bot, 
  Share2, 
  Briefcase, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Crown,
  Gift,
  Camera,
  Music,
  Globe,
  Armchair,
  Eye,
  Lock
} from 'lucide-react';

export default function Navbar({ currentView, setView, user, onOpenAuth, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. PUBLIC / GUEST NAVIGATION (Shown when NOT logged in)
  const publicNavItems = [
    { id: 'discover', label: 'Curated Vendors', icon: Search },
    { id: 'website', label: 'Wedding Website & Itinerary', icon: Globe, highlight: true },
    { id: 'shagun', label: 'Digital Shagun', icon: Gift },
    { id: 'photos', label: 'Photo Drop', icon: Camera },
    { id: 'playlist', label: 'Sangeet DJ Jam', icon: Music }
  ];

  // 2. COUPLE / HOST PRIVATE NAVIGATION (Shown when logged in as couple)
  const coupleNavItems = [
    { id: 'planner', label: 'Wedding Desk', icon: CalendarCheck },
    { id: 'guests', label: 'Guest & RSVP Manager', icon: Users, isPrivate: true },
    { id: 'seating', label: 'Table Seating', icon: Armchair, isPrivate: true },
    { id: 'board', label: 'Family Board', icon: Share2, isPrivate: true },
    { id: 'ai', label: 'AI Concierge', icon: Bot },
    { id: 'discover', label: 'Find Vendors', icon: Search }
  ];

  // 3. VENDOR STUDIO NAVIGATION
  const vendorNavItems = [
    { id: 'vendor-portal', label: 'Vendor Studio (Inquiries & Quotes)', icon: Briefcase },
    { id: 'discover', label: 'Marketplace Directory', icon: Search }
  ];

  // 4. ADMIN CONTROL ROOM NAVIGATION
  const adminNavItems = [
    { id: 'admin', label: 'Control Room (Approvals & Vetting)', icon: ShieldCheck },
    { id: 'discover', label: 'All Vendors', icon: Search }
  ];

  const activeNavItems = !user
    ? publicNavItems
    : user.role === 'vendor'
      ? vendorNavItems
      : user.role === 'admin'
        ? adminNavItems
        : coupleNavItems;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-royal-sand shadow-[0_2px_15px_-3px_rgba(26,23,21,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Royal Brand Logo */}
          <button 
            onClick={() => setView(!user ? 'discover' : user.role === 'vendor' ? 'vendor-portal' : user.role === 'admin' ? 'admin' : 'planner')}
            className="flex items-center gap-3 text-left group focus:outline-none flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl royal-gradient-wine flex items-center justify-center text-royal-gold shadow-royal group-hover:scale-105 transition-all duration-300 ring-1 ring-royal-gold/40">
              <Crown className="w-5 h-5 text-royal-lightGold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-royal-charcoal group-hover:text-royal-wine transition-colors">
                  Smart<span className="text-royal-wine">Shaadi</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-royal-lightGold/60 text-royal-amber font-bold tracking-widest uppercase border border-royal-gold/30 font-cinzel">
                  {user ? (user.role === 'couple' ? 'Couple Desk' : user.role === 'vendor' ? 'Studio' : 'Admin') : 'Luxe'}
                </span>
              </div>
              <p className="font-cinzel text-[9px] text-gray-500 font-semibold tracking-widest uppercase">
                All-Faith Luxury Wedding Concierge
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-royal-sand/30 p-1.5 rounded-2xl border border-royal-sand/60">
            {activeNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'royal-gradient-wine text-white shadow-md scale-[1.02]'
                      : 'text-royal-slate hover:text-royal-wine hover:bg-white/80'
                  } ${item.highlight && !isActive ? 'text-royal-wine ring-1 ring-royal-wine/20 bg-royal-wine/5' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-royal-lightGold' : 'text-gray-400'}`} />
                  <span className="font-sans font-semibold">{item.label}</span>
                  {item.isPrivate && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-white/20 text-white font-mono" title="Confidential Host View">🔒</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Auth, Guest Preview & Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {/* For Couples: Button to preview the public guest website */}
                {user.role === 'couple' && (
                  <button
                    onClick={() => setView('website')}
                    title="Preview Public Wedding Website (What your guests see)"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                      currentView === 'website'
                        ? 'bg-royal-wine text-white border-royal-wine'
                        : 'bg-white border-royal-sand text-royal-slate hover:bg-royal-pearl hover:text-royal-wine'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-royal-gold" />
                    <span>Preview Guest Page</span>
                  </button>
                )}

                <div className="flex items-center gap-2.5 pl-3 border-l border-royal-sand">
                  <div className="w-9 h-9 rounded-full royal-gradient-gold flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-royal-charcoal leading-none truncate max-w-[130px]">{user.name}</p>
                    <span className="text-[10px] text-royal-wine capitalize font-semibold tracking-wide">
                      {user.role === 'couple' ? 'Wedding Host' : user.role === 'vendor' ? 'Verified Studio' : 'Admin'}
                    </span>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out of Wedding Desk"
                    className="p-2 text-gray-400 hover:text-royal-wine hover:bg-red-50/80 rounded-xl transition ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-royal hover:shadow-luxury transition-all transform hover:-translate-y-0.5 border border-royal-wine/50"
                >
                  <Lock className="w-3.5 h-3.5 text-royal-lightGold" />
                  <span>Host / Vendor Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-royal-charcoal hover:bg-royal-sand/50 rounded-xl transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Strictly Role-Aware) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-royal-sand px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <p className="px-2 text-[10px] font-cinzel font-bold text-gray-400 uppercase tracking-wider mb-2">
            {user ? `${user.role.toUpperCase()} PORTAL NAVIGATION` : 'GUEST EXPERIENCES & DIRECTORY'}
          </p>

          {activeNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-xs font-bold transition ${
                  isActive
                    ? 'royal-gradient-wine text-white shadow-royal'
                    : 'text-royal-slate hover:bg-royal-sand/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-royal-lightGold' : 'text-royal-gold'}`} />
                  <span>{item.label}</span>
                </div>
                {item.isPrivate && (
                  <span className="text-[10px] opacity-70">🔒 Private</span>
                )}
              </button>
            );
          })}

          {user && user.role === 'couple' && (
            <button
              onClick={() => {
                setView('website');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-xs font-bold text-royal-wine bg-royal-wine/5 border border-royal-wine/20 transition mt-2"
            >
              <Eye className="w-4 h-4 text-royal-gold" />
              <span>Preview Public Wedding Website</span>
            </button>
          )}

          {/* User Status / Login at bottom of Mobile Drawer */}
          <div className="pt-4 border-t border-royal-sand/60">
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-royal-sand/30 border border-royal-sand/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full royal-gradient-gold flex items-center justify-center text-white font-bold text-xs">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-royal-charcoal">{user.name}</p>
                    <p className="text-[10px] text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs text-red-600 bg-red-50 rounded-xl font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl royal-gradient-wine text-white font-bold text-xs shadow-royal"
              >
                <Lock className="w-4 h-4 text-royal-lightGold" />
                <span>Host / Vendor Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
