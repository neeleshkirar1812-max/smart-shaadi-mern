import React, { useState } from 'react';
import { Smartphone, Check, Send, Heart, Star, ShieldCheck } from 'lucide-react';

export default function WmgAppDownloadBanner({ showToast }) {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendLink = (e) => {
    e.preventDefault();
    setError('');

    const clean = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(clean)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setSent(true);
    if (showToast) {
      showToast(`SMS sent to +91 ${clean} with your WedMeGood App download link! 📲`);
    }
  };

  return (
    <section id="app-download" className="py-16 bg-[#1A1715] text-white relative overflow-hidden font-sans">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E72E77]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Realistic Smartphone App Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              
              {/* Phone Mockup Frame */}
              <div className="w-64 sm:w-72 h-[460px] bg-black rounded-[40px] p-3 shadow-2xl border-4 border-gray-700 ring-1 ring-white/20 relative overflow-hidden">
                <div className="w-24 h-4 bg-black rounded-b-xl absolute top-3 left-1/2 -translate-x-1/2 z-20" />
                
                {/* Inside Screen */}
                <div className="w-full h-full bg-[#FAF8F5] rounded-[32px] overflow-hidden text-[#1A1715] flex flex-col pt-5">
                  <div className="px-4 py-2 bg-white border-b border-gray-100 flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E72E77]">WedMeGood</span>
                    <Heart className="w-4 h-4 text-[#E72E77] fill-[#E72E77]" />
                  </div>

                  <div className="p-3 space-y-2 flex-1">
                    <div className="h-24 rounded-2xl bg-gradient-to-tr from-[#E72E77] to-[#B60056] p-3 text-white flex flex-col justify-end">
                      <p className="font-serif text-xs font-bold">Your Big Day</p>
                      <p className="text-[10px] text-gray-200">128 Days To Go</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-gray-100 text-[10px]">
                      <p className="font-bold text-gray-800">✅ Checklist (120 Tasks)</p>
                      <p className="text-gray-400">82% Completed</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-gray-100 text-[10px]">
                      <p className="font-bold text-[#E72E77]">💬 Real-Time Vendor Chat</p>
                      <p className="text-gray-400 truncate">The Leela Palace: Banquet layout confirmed</p>
                    </div>
                  </div>

                  <div className="bg-white px-4 py-2 border-t border-gray-100 flex items-center justify-around text-[9px] text-gray-400 font-bold">
                    <span className="text-[#E72E77]">Home</span>
                    <span>Vendors</span>
                    <span>Checklist</span>
                    <span>RSVP</span>
                  </div>
                </div>
              </div>

              {/* Floating Rating Pill */}
              <div className="absolute -bottom-3 -left-4 bg-white text-[#1A1715] p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2">
                <span className="font-bold text-emerald-600 text-sm">4.8★</span>
                <span className="text-[10px] text-gray-500 font-semibold">100K+ Reviews</span>
              </div>

            </div>
          </div>

          {/* Right Column: Copy, 3 Bullets & SMS Form */}
          <div className="lg:col-span-7 space-y-6">
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Download The WedMeGood <br />
              <span className="text-[#FF9EC4]">Mobile App Today!</span>
            </h2>

            {/* 3 Tick Bullet Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Save vendor contacts & chat directly on the go</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Manage 120-step wedding checklist & guest RSVPs</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Read 200,000+ authentic reviews & photos</span>
              </div>
            </div>

            {/* SMS Form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-300 mb-2">
                You will receive an SMS with a link to download the App
              </p>

              {!sent ? (
                <form onSubmit={handleSendLink} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <div className="relative flex-1">
                    <span className="text-xs font-bold text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter mobile number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#E72E77]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    <span>Download the App</span>
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300 max-w-md">
                  <span>Download link dispatched to +91 {phone}!</span>
                </div>
              )}

              {error && (
                <p className="text-xs text-rose-400 mt-1 font-medium">{error}</p>
              )}
            </div>

            {/* App Store & Google Play Badges */}
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left"
              >
                <span className="text-base">🍎</span>
                <div>
                  <span className="text-[8px] uppercase tracking-wider block text-gray-400">Download on the</span>
                  <span className="text-xs font-bold text-white">App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left"
              >
                <span className="text-base">▶️</span>
                <div>
                  <span className="text-[8px] uppercase tracking-wider block text-gray-400">Get it on</span>
                  <span className="text-xs font-bold text-white">Google Play</span>
                </div>
              </a>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
