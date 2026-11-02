import React from 'react';
import { 
  Crown, 
  Sparkles, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Send
} from 'lucide-react';

export default function WmgMegaFooter({
  setSelectedCity,
  setSelectedCategory,
  setSelectedFaith,
  setView,
  onOpenAuth
}) {
  const handleCityClick = (city, category = 'Venue') => {
    setSelectedCity(city);
    setSelectedCategory(category);
    setView('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTraditionClick = (tradition) => {
    setSelectedFaith(tradition);
    setView('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1715] text-white pt-16 pb-12 border-t border-[#E8D8A6]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Banner & Newsletter */}
        <div className="pb-12 border-b border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E72E77] to-[#B60056] flex items-center justify-center text-white shadow-md">
                <Crown className="w-5 h-5 text-[#FAF8F5]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                WedMe<span className="text-[#E72E77]">Good</span>
                <span className="text-xs ml-2 font-cinzel text-[#D4AF37] uppercase tracking-widest font-normal">
                  SmartShaadi Edition
                </span>
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-lg leading-relaxed">
              India&apos;s favourite and most comprehensive wedding planning platform. Bringing together royal venues, certified wedding vendors, and modern couples across all faiths and traditions.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-end gap-4">
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
              <span>100% Verified Vendors & Guaranteed Price Shield</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Multi-Column Comprehensive SEO Directory */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Venues by City */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FFE088] uppercase tracking-wider">
              Wedding Venues
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleCityClick('Delhi NCR')} className="hover:text-white transition">Banquets in Delhi NCR</button></li>
              <li><button onClick={() => handleCityClick('Mumbai')} className="hover:text-white transition">Wedding Lawns in Mumbai</button></li>
              <li><button onClick={() => handleCityClick('Bangalore')} className="hover:text-white transition">Luxury Resorts in Bangalore</button></li>
              <li><button onClick={() => handleCityClick('Jaipur')} className="hover:text-white transition">Heritage Forts in Jaipur</button></li>
              <li><button onClick={() => handleCityClick('Udaipur')} className="hover:text-white transition">Lakeside Palaces in Udaipur</button></li>
              <li><button onClick={() => handleCityClick('Goa')} className="hover:text-white transition">Beachfront Resorts in Goa</button></li>
              <li><button onClick={() => handleCityClick('Hyderabad')} className="hover:text-white transition">Nizami Palaces in Hyderabad</button></li>
            </ul>
          </div>

          {/* Column 2: Vendors by City */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FFE088] uppercase tracking-wider">
              Top Vendors
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleCityClick('Delhi NCR', 'Photographer')} className="hover:text-white transition">Photographers in Delhi</button></li>
              <li><button onClick={() => handleCityClick('Mumbai', 'Makeup Artist')} className="hover:text-white transition">Bridal Makeup in Mumbai</button></li>
              <li><button onClick={() => handleCityClick('Jaipur', 'Decorator')} className="hover:text-white transition">Decorators in Jaipur</button></li>
              <li><button onClick={() => handleCityClick('Bangalore', 'Mehndi Artist')} className="hover:text-white transition">Mehndi Artists in Bangalore</button></li>
              <li><button onClick={() => handleCityClick('All cities', 'Bridal Wear')} className="hover:text-white transition">Bridal Wear & Lehengas</button></li>
              <li><button onClick={() => handleCityClick('All cities', 'Caterer')} className="hover:text-white transition">Catering & Food Stalls</button></li>
              <li><button onClick={() => handleCityClick('All cities', 'Wedding Planner')} className="hover:text-white transition">Destination Wedding Planners</button></li>
            </ul>
          </div>

          {/* Column 3: Multi-Faith Traditions */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FFE088] uppercase tracking-wider">
              Sacred Traditions
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleTraditionClick('Hindu')} className="hover:text-white transition">🕉️ Hindu Vivah & Saat Phere</button></li>
              <li><button onClick={() => handleTraditionClick('Muslim')} className="hover:text-white transition">☪️ Muslim Nikah & Walima</button></li>
              <li><button onClick={() => handleTraditionClick('Sikh')} className="hover:text-white transition">☬ Sikh Anand Karaj (4 Laavan)</button></li>
              <li><button onClick={() => handleTraditionClick('Christian')} className="hover:text-white transition">✝️ Christian Nuptials & Mass</button></li>
              <li><button onClick={() => handleTraditionClick('Jain')} className="hover:text-white transition">🪷 Jain Vivah & Chauvihar</button></li>
              <li><button onClick={() => handleTraditionClick('Interfaith')} className="hover:text-white transition">💫 Interfaith Fusion Weddings</button></li>
            </ul>
          </div>

          {/* Column 4: Planning Tools Suite */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FFE088] uppercase tracking-wider">
              Planning Tools
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setView('planner')} className="hover:text-white transition">Wedding Checklist (120 Steps)</button></li>
              <li><button onClick={() => setView('planner')} className="hover:text-white transition">Wedding Budget Calculator</button></li>
              <li><button onClick={() => setView('guests')} className="hover:text-white transition">Guest List & RSVP Tracker</button></li>
              <li><button onClick={() => setView('seating')} className="hover:text-white transition">CAD Table Seating Map</button></li>
              <li><button onClick={() => setView('website')} className="hover:text-white transition">Digital Wedding Website & Invites</button></li>
              <li><button onClick={() => setView('shagun')} className="hover:text-white transition">Digital Shagun & UPI Registry</button></li>
              <li><button onClick={() => setView('photos')} className="hover:text-white transition">Live Guest Photo Drop (QR)</button></li>
            </ul>
          </div>

          {/* Column 5: Support & Concierge Hotline */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FFE088] uppercase tracking-wider">
              WedMeGood Concierge
            </h4>
            <div className="space-y-2.5 text-gray-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E72E77] flex-shrink-0" />
                <span className="font-bold text-white">+91 98290 12345 (24/7)</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>WhatsApp Helpline Desk</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>support@wedmegood.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E72E77] flex-shrink-0" />
                <span>Delhi • Mumbai • Jaipur • Bangalore</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenAuth('vendor')}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-[#E72E77] text-white font-bold transition text-center"
                >
                  Vendor Partner Portal
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 WedMeGood (SmartShaadi Master Portal). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Anti-Fraud Price Shield</span>
          </div>
          <p className="flex items-center gap-1 text-gray-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#E72E77] fill-current" /> for Indian Weddings across all traditions.
          </p>
        </div>

      </div>
    </footer>
  );
}
