import React from 'react';
import { Lock, Crown, ArrowRight, ShieldCheck, Heart, Sparkles, Globe } from 'lucide-react';

export default function PrivateAccessGate({ onOpenAuth, onNavigateWebsite, onNavigateDiscover }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F5]">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-royal-gold/40 relative overflow-hidden">
        {/* Subtle decorative gold backdrop blur */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-royal-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-royal-ruby/5 rounded-full blur-3xl pointer-events-none" />

        {/* Royal Crest Lock Emblem */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bridal-gradient-rose flex items-center justify-center text-stitch-gold shadow-luxury mb-6 ring-4 ring-stitch-gold/25">
          <Crown className="w-9 h-9 text-stitch-gold-light" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-stitch-gold border-2 border-white flex items-center justify-center text-white shadow">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>

        <span className="font-cinzel text-xs uppercase font-bold tracking-widest text-stitch-rose block mb-2">
          Confidential Bridal Suite
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stitch-charcoal tracking-tight mb-3">
          Host Access Required
        </h2>

        <p className="text-sm text-stitch-charcoal-subtle leading-relaxed max-w-md mx-auto mb-8 font-sans">
          This portal contains confidential wedding budgets, guest phone numbers, seating charts, and family notes. Access is restricted exclusively to the <strong>Couple & Registered Hosts</strong>.
        </p>

        {/* Primary Action Button: Sign In */}
        <div className="space-y-3">
          <button
            onClick={onOpenAuth}
            className="w-full py-4 px-6 rounded-2xl bridal-gradient-rose text-white font-bold text-sm tracking-wide shadow-luxury hover:opacity-95 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 text-stitch-gold-light" />
            <span>Sign In to Couple Wedding Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={onNavigateWebsite}
              className="py-3 px-4 rounded-xl border border-royal-sand bg-royal-pearl text-royal-charcoal text-xs font-bold hover:bg-royal-sand/50 transition flex items-center justify-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-royal-gold" />
              <span>Public Wedding Website</span>
            </button>
            <button
              onClick={onNavigateDiscover}
              className="py-3 px-4 rounded-xl border border-royal-sand bg-royal-pearl text-royal-charcoal text-xs font-bold hover:bg-royal-sand/50 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-royal-wine" />
              <span>Explore Vendors</span>
            </button>
          </div>
        </div>

        {/* Security badge note */}
        <div className="mt-8 pt-6 border-t border-royal-sand/80 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Protected under Smart Shaadi Multi-Faith Privacy Protocol</span>
        </div>
      </div>
    </div>
  );
}
