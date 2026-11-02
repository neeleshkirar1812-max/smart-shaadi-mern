import React, { useState } from 'react';
import { Smartphone, CheckCircle2, Send, QrCode, Star, ShieldCheck, Heart } from 'lucide-react';

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
    <section id="app-download" className="py-14 sm:py-20 bg-gradient-to-r from-[#1A1715] via-[#2A2320] to-[#1A1715] text-white relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E72E77]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Multi-Device Preview Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              
              {/* Phone Mockup Frame */}
              <div className="w-64 sm:w-72 h-[480px] bg-black rounded-[40px] p-3 shadow-2xl border-4 border-gray-700/80 ring-1 ring-white/20 relative overflow-hidden">
                <div className="w-28 h-4 bg-black rounded-b-xl absolute top-3 left-1/2 -translate-x-1/2 z-20" />
                
                {/* Inside Screen */}
                <div className="w-full h-full bg-[#FAF8F5] rounded-[32px] overflow-hidden text-[#1A1715] flex flex-col pt-6">
                  {/* Mock App Header */}
                  <div className="px-4 py-2 bg-white border-b border-gray-100 flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#E72E77]">WedMeGood</span>
                    <Heart className="w-4 h-4 text-[#E72E77] fill-[#E72E77]" />
                  </div>

                  {/* Mock Feed Content */}
                  <div className="p-3 space-y-2.5 overflow-hidden flex-1">
                    <div className="h-28 rounded-2xl bg-gradient-to-tr from-[#6B1D2F] to-[#B4245D] p-3 text-white flex flex-col justify-end">
                      <p className="text-[10px] uppercase font-bold text-[#FFE088]">Ananya & Kabir</p>
                      <p className="font-serif text-xs font-bold">128 Days to Wedding</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-gray-100 text-[10px]">
                      <p className="font-bold text-gray-800">✅ Checklist Progress: 82%</p>
                      <p className="text-gray-400">18 tasks remaining</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-gray-100 text-[10px] flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-800">💌 Guest RSVPs: 350</p>
                        <p className="text-emerald-600 font-semibold">92% Confirmed</p>
                      </div>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Live</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-gray-100 text-[10px]">
                      <p className="font-bold text-[#E72E77]">💬 Vendor Messages (3)</p>
                      <p className="text-gray-400 truncate">The Leela: Banquet layout ready...</p>
                    </div>
                  </div>

                  {/* Mock Tab Bar */}
                  <div className="bg-white px-4 py-2.5 border-t border-gray-100 flex items-center justify-around text-[9px] text-gray-400 font-bold">
                    <span className="text-[#E72E77]">Home</span>
                    <span>Vendors</span>
                    <span>Checklist</span>
                    <span>Guests</span>
                  </div>
                </div>
              </div>

              {/* Floating Floating Badge 1 */}
              <div className="absolute -bottom-4 -left-6 bg-white text-[#1A1715] p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 animate-bounce duration-1000">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  4.8★
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">App of the Year</p>
                  <p className="text-[10px] text-gray-500">100K+ 5-Star Reviews</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Copy & SMS Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E72E77]/20 border border-[#E72E77]/40 text-[#FF9EC4] text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Available for iOS & Android</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Plan Your Dream Wedding <br />
              <span className="text-[#FFE088]">On The Go with WMG App</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              Real-time vendor chat, digital guest RSVP tracking, 120-step checklist notifications, and collaborative family budget planning right in your pocket.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Real-Time Vendor WhatsApp & Chat</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Instant Guest RSVP & Food Matrices</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>120+ Auspicious Vedic Muhurat Tasks</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>0% Commission Vendor Price Shield</span>
              </div>
            </div>

            {/* SMS Form */}
            <div className="pt-2">
              <p className="text-xs font-bold text-gray-300 mb-2">
                Get download link via SMS:
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
                      placeholder="98290 12345"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#E72E77]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Link</span>
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 max-w-md">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Download SMS dispatched to +91 {phone}! Check your SMS inbox.</span>
                </div>
              )}

              {error && (
                <p className="text-xs text-rose-400 mt-1 font-medium">{error}</p>
              )}
            </div>

            {/* App Store & Google Play Badges */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left"
              >
                <div className="text-lg">🍎</div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block text-gray-400">Download on the</span>
                  <span className="text-xs font-bold text-white">Apple App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition text-left"
              >
                <div className="text-lg">▶️</div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block text-gray-400">Get it on</span>
                  <span className="text-xs font-bold text-white">Google Play Store</span>
                </div>
              </a>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
