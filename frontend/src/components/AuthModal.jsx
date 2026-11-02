import React, { useState } from 'react';
import { X, Lock, Mail, User, Building, ShieldCheck, Heart, Crown } from 'lucide-react';

export default function AuthModal({ onClose, onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('couple');
  const [city, setCity] = useState('Udaipur');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await onRegister({ name, email, password, role, city });
      } else {
        await onLogin({ email, password });
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoRole) => {
    let creds = null;
    if (demoRole === 'couple') {
      creds = { email: 'couple@smartshaadi.com', password: 'couple123' };
    } else if (demoRole === 'vendor') {
      creds = { email: 'wedmoire@smartshaadi.com', password: 'vendor123' };
    } else if (demoRole === 'admin') {
      creds = { email: 'admin@smartshaadi.com', password: 'admin123' };
    }
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
      setLoading(true);
      try {
        await onLogin(creds);
        onClose();
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-royal-sand/80 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-royal-muted hover:text-royal-charcoal rounded-full hover:bg-royal-sand/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Emblem */}
        <div className="w-12 h-12 rounded-2xl royal-gradient-ruby flex items-center justify-center text-royal-gold mx-auto mb-4 shadow-royal ring-1 ring-royal-gold/40">
          <Crown className="w-6 h-6 text-royal-lightGold" />
        </div>

        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl font-bold text-royal-charcoal">
            {isRegister ? 'Join Smart Shaadi Luxe' : 'Welcome to Your Wedding Desk'}
          </h3>
          <p className="text-xs text-royal-muted mt-1">
            {isRegister
              ? 'Create a bespoke account to coordinate your celebrations'
              : 'Sign in to access your planner, guest manager, and vendor quotes'}
          </p>
        </div>

        {/* Quick Demo 1-Click Logins */}
        {!isRegister && (
          <div className="mb-6 p-3.5 rounded-2xl bg-royal-sand/30 border border-royal-sand/70 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-royal-wine font-cinzel block mb-2.5">
              👑 Instant 1-Click Host & Partner Access:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickLogin('couple')}
                className="p-2 rounded-xl bg-white border border-royal-sand hover:border-royal-wine text-royal-charcoal hover:bg-royal-pearl transition shadow-xs flex flex-col items-center justify-center gap-1 group"
              >
                <Heart className="w-4 h-4 text-royal-wine group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold font-serif leading-tight">Couple Host</span>
                <span className="text-[8px] text-gray-400 font-sans">Ananya & Kabir</span>
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickLogin('vendor')}
                className="p-2 rounded-xl bg-white border border-royal-sand hover:border-royal-gold text-royal-charcoal hover:bg-royal-pearl transition shadow-xs flex flex-col items-center justify-center gap-1 group"
              >
                <Building className="w-4 h-4 text-royal-gold group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold font-serif leading-tight">Vendor Studio</span>
                <span className="text-[8px] text-gray-400 font-sans">WedMoire</span>
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickLogin('admin')}
                className="p-2 rounded-xl bg-white border border-royal-sand hover:border-emerald-600 text-royal-charcoal hover:bg-emerald-50 transition shadow-xs flex flex-col items-center justify-center gap-1 group"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold font-serif leading-tight">Control Room</span>
                <span className="text-[8px] text-gray-400 font-sans">Master Admin</span>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-royal-muted absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma & Kabir Singhania"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 pl-10 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand font-bold focus:outline-none focus:border-royal-ruby"
                >
                  <option value="couple">Couple / Wedding Organizer</option>
                  <option value="vendor">Wedding Vendor Studio</option>
                  <option value="admin">Platform Governance Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Destination City</label>
                <input
                  type="text"
                  placeholder="e.g. Udaipur or Delhi NCR"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-royal-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 pl-10 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-royal-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs p-3 pl-10 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl royal-gradient-ruby text-white font-bold text-xs shadow-royal hover:shadow-luxury transition-all transform hover:-translate-y-0.5 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Create My Account' : 'Sign In to Wedding Desk'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-royal-muted">
          {isRegister ? (
            <span>
              Already registered?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="font-bold text-royal-ruby hover:underline ml-1"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Planning a new celebration?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="font-bold text-royal-ruby hover:underline ml-1"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
