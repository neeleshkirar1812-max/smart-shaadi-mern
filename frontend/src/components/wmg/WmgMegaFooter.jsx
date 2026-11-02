import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function WmgMegaFooter({
  setSelectedCity,
  setSelectedCategory,
  setView,
  onOpenAuth
}) {
  const handleNav = (targetView, category = null) => {
    if (category) setSelectedCategory(category);
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1715] text-white pt-14 pb-10 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Full 5-Column Mega Footer Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Start Planning */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Start Planning
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Search By City</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Search By Vendor</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Destination Wedding</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Download Mobile App</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">WMG Genie</button></li>
              <li><button onClick={() => handleNav('discover', 'Venue')} className="hover:text-white transition">Venue Booking Service</button></li>
            </ul>
          </div>

          {/* Column 2: Wedding Ideas */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Wedding Ideas
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Wedding Blog</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Real Weddings</button></li>
              <li><button onClick={() => handleNav('discover', 'Bridal Wear')} className="hover:text-white transition">Trending Lehengas</button></li>
              <li><button onClick={() => handleNav('discover', 'Decorator')} className="hover:text-white transition">Mandap Decor</button></li>
              <li><button onClick={() => handleNav('playlist')} className="hover:text-white transition">Sangeet Choreography</button></li>
            </ul>
          </div>

          {/* Column 3: Photo Gallery */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Photo Gallery
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Bridal Lehenga Photos</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Mehndi Designs</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Wedding Sarees</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Blouse Designs</button></li>
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">Couple Poses</button></li>
            </ul>
          </div>

          {/* Column 4: Home */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Home
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNav('discover')} className="hover:text-white transition">About WedMeGood</button></li>
              <li><span className="cursor-pointer hover:text-white transition">Careers</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Contact Us</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Terms & Conditions</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Anti-Fraud Price Shield</span></li>
            </ul>
          </div>

          {/* Column 5: Wedding Invitation Maker */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Wedding Invitation Maker
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNav('website')} className="hover:text-white transition">Digital E-Invites</button></li>
              <li><button onClick={() => handleNav('website')} className="hover:text-white transition">Save The Date Videos</button></li>
              <li><button onClick={() => handleNav('website')} className="hover:text-white transition">Table Standees</button></li>
              <li><button onClick={() => handleNav('shagun')} className="hover:text-white transition">Digital Shagun Registry</button></li>
            </ul>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E72E77] flex items-center justify-center transition">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Notice */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <p>© 2026 WedMeGood. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#E72E77] fill-[#E72E77]" />
            <span>in India • India&apos;s Favourite Wedding Planning Platform.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
