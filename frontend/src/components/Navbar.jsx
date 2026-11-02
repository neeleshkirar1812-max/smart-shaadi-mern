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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-stitch-border shadow-[0_2px_20px_-4px_rgba(212,175,55,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Royal Brand Logo */}
          <button 
            onClick={() => setView(!user ? 'discover' : user.role === 'vendor' ? 'vendor-portal' : user.role === 'admin' ? 'admin' : 'planner')}
            className="flex items-center gap-3 text-left group focus:outline-none flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bridal-gradient-rose flex items-center justify-center text-stitch-gold shadow-luxury group-hover:scale-105 transition-all duration-300 ring-2 ring-stitch-gold/40">
              <Crown className="w-5 h-5 text-stitch-gold-light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-stitch-charcoal group-hover:text-stitch-rose transition-colors">
                  Smart<span className="text-stitch-rose">Shaadi</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stitch-gold-light text-stitch-charcoal font-bold tracking-widest uppercase border border-stitch-gold-border font-cinzel">
                  {user ? (user.role === 'couple' ? 'Couple Desk' : user.role === 'vendor' ? 'Studio' : 'Admin') : 'Luxe'}
                </span>
              </div>
              <p className="font-cinzel text-[9px] text-stitch-charcoal-muted font-semibold tracking-widest uppercase">
                All-Faith Luxury Wedding Concierge
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stitch-ivory p-1.5 rounded-2xl border border-stitch-border">
            {activeNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bridal-gradient-rose text-white shadow-luxury scale-[1.02]'
                      : 'text-stitch-charcoal-subtle hover:text-stitch-rose hover:bg-white/90'
                  } ${item.highlight && !isActive ? 'text-stitch-rose ring-1 ring-stitch-rose/25 bg-stitch-rose-wash' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stitch-gold-light' : 'text-gray-400'}`} />
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
                        ? 'bg-stitch-rose text-white border-stitch-rose'
                        : 'bg-white border-stitch-border text-stitch-charcoal-subtle hover:bg-stitch-ivory hover:text-stitch-rose'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-stitch-gold" />
                    <span>Preview Guest Page</span>
                  </button>
                )}

                <div className="flex items-center gap-2.5 pl-3 border-l border-stitch-border">
                  <div className="w-9 h-9 rounded-full bridal-gradient-rose flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-stitch-charcoal leading-none truncate max-w-[130px]">{user.name}</p>
                    <span className="text-[10px] text-stitch-rose capitalize font-semibold tracking-wide">
                      {user.role === 'couple' ? 'Wedding Host' : user.role === 'vendor' ? 'Verified Studio' : 'Admin'}
                    </span>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out of Wedding Desk"
                    className="p-2 text-gray-400 hover:text-stitch-rose hover:bg-rose-50/80 rounded-xl transition ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bridal-gradient-rose text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all transform hover:-translate-y-0.5 border border-stitch-rose/50"
                >
                  <Lock className="w-3.5 h-3.5 text-stitch-gold-light" />
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
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-stitch-border px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <p className="px-2 text-[10px] font-cinzel font-bold text-stitch-charcoal-muted uppercase tracking-wider mb-2">
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
                    ? 'bridal-gradient-rose text-white shadow-luxury'
                    : 'text-stitch-charcoal-subtle hover:bg-stitch-ivory'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stitch-gold-light' : 'text-stitch-gold'}`} />
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-xs font-bold text-stitch-rose bg-stitch-rose-wash border border-stitch-rose/30 transition mt-2"
            >
              <Eye className="w-4 h-4 text-stitch-gold" />
              <span>Preview Public Wedding Website</span>
            </button>
          )}

          {/* User Status / Login at bottom of Mobile Drawer */}
          <div className="pt-4 border-t border-stitch-border">
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stitch-ivory border border-stitch-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bridal-gradient-rose flex items-center justify-center text-white font-bold text-xs">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stitch-charcoal">{user.name}</p>
                    <p className="text-[10px] text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs text-rose-600 bg-rose-50 rounded-xl font-bold"
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
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bridal-gradient-rose text-white font-bold text-xs shadow-luxury"
              >
                <Lock className="w-4 h-4 text-stitch-gold-light" />
                <span>Host / Vendor Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
