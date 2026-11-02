import React, { useState } from 'react';
import { 
  Crown, 
  User, 
  Briefcase, 
  ShieldCheck, 
  Globe, 
  ChevronUp, 
  Sparkles, 
  Check, 
  LogOut 
} from 'lucide-react';

export default function DemoRoleSwitcher({ currentUser, onSwitchRole, onLogout, setView, showToast }) {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: 'couple',
      title: 'Couple Desk',
      subtitle: 'Ananya & Kabir (Planning Mode)',
      icon: Crown,
      creds: { email: 'couple@smartshaadi.com', password: 'couple123' },
      targetView: 'planner',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
    },
    {
      id: 'vendor',
      title: 'Vendor Studio',
      subtitle: 'WedMoire Heritage Studio',
      icon: Briefcase,
      creds: { email: 'wedmoire@smartshaadi.com', password: 'vendor123' },
      targetView: 'vendor-portal',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 'admin',
      title: 'Admin Control Room',
      subtitle: 'Master Marketplace Operations',
      icon: ShieldCheck,
      creds: { email: 'admin@smartshaadi.com', password: 'admin123' },
      targetView: 'admin',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      id: 'guest',
      title: 'Public Wedding Guest',
      subtitle: 'Live Couple Website & RSVP',
      icon: Globe,
      creds: null,
      targetView: 'website',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  ];

  const handleSelectRole = async (r) => {
    try {
      if (r.creds) {
        await onSwitchRole(r.creds, r.targetView);
      } else {
        await onLogout();
        setView(r.targetView);
        showToast?.('Switched to Public Guest View! 👥', 'info');
      }
      setIsOpen(false);
    } catch {
      showToast?.('Failed to switch role', 'error');
    }
  };

  const getCurrentRoleTitle = () => {
    if (!currentUser) return 'Guest Mode';
    if (currentUser.role === 'admin') return 'Admin Room';
    if (currentUser.role === 'vendor') return 'Vendor Studio';
    return 'Couple Desk';
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 font-sans print:hidden">
      {/* Floating Panel (Opens above the button) */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-royal-gold/40 p-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-royal-sand mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl royal-gradient-wine flex items-center justify-center text-royal-gold shadow">
                <Sparkles className="w-4 h-4 text-royal-lightGold" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-royal-charcoal leading-tight">
                  1-Click Role Switcher
                </p>
                <p className="text-[10px] text-gray-500 font-cinzel">Instant Demo Exploration</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-royal-wine text-xs px-2 py-1 rounded-lg hover:bg-royal-pearl transition"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = (r.id === 'guest' && !currentUser) || (currentUser?.role === r.id);

              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'royal-gradient-wine text-white shadow-md'
                      : 'hover:bg-royal-pearl border border-transparent hover:border-royal-sand'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/20 text-royal-lightGold' : 'bg-royal-sand/50 text-royal-wine'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold font-serif ${isActive ? 'text-white' : 'text-royal-charcoal'}`}>
                        {r.title}
                      </p>
                      <p className={`text-[10px] ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                        {r.subtitle}
                      </p>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-royal-lightGold flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400 font-cinzel uppercase tracking-wider">Switch</span>
                  )}
                </button>
              );
            })}
          </div>

          {currentUser && (
            <div className="pt-3 mt-3 border-t border-royal-sand">
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Demo Desk</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl royal-gradient-wine text-white font-bold text-xs shadow-luxury hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-royal-gold/40 group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <Crown className="w-4 h-4 text-royal-lightGold group-hover:rotate-12 transition-transform" />
        <span className="font-serif tracking-wide">{getCurrentRoleTitle()}</span>
        <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
