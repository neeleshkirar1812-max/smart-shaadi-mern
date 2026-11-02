import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Headphones, 
  CheckCircle2, 
  Send, 
  Calendar, 
  Phone, 
  User, 
  Crown 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WmgGenieBanner({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    weddingDate: '',
    city: 'Delhi NCR'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your name');
      return;
    }

    // 10-digit Indian Mobile Validation
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number (+91 9xxxx xxxxx)');
      return;
    }

    if (!formData.weddingDate) {
      setError('Please select an approximate wedding date');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Save lead to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('wmg_genie_leads') || '[]');
        existing.push({ ...formData, phone: cleanPhone, createdAt: new Date().toISOString() });
        localStorage.setItem('wmg_genie_leads', JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (showToast) {
        showToast('WedMeGood Genie Concierge booked! Our senior manager will call you shortly. ✨');
      }
    }, 600);
  };

  return (
    <section id="genie-banner" className="py-12 bg-gradient-to-r from-[#FAF3E0] via-[#FCF9F8] to-[#FFEBE8] border-y border-[#E8D8A6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Value Proposition & Trust Badges */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E72E77]/10 text-[#E72E77] text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WedMeGood Genie • Free Concierge Service</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715] leading-tight">
              Get a Dedicated Personal Wedding Manager for{' '}
              <span className="text-[#E72E77] underline decoration-[#D4AF37] decoration-wavy decoration-2">
                100% Free
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#6B6866] leading-relaxed">
              Planning a wedding can be overwhelming. Let our certified Wedsta Genie compare 50+ venues, negotiate the lowest vendor quotes, schedule recce visits, and manage all contracts with zero stress.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-2xl border border-white shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#FAF3E0] flex items-center justify-center text-[#8C6D23] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1715]">Price Shield</h4>
                  <p className="text-[11px] text-gray-500">Guaranteed lowest pricing on verified venues</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-2xl border border-white shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] flex items-center justify-center text-[#E72E77] flex-shrink-0">
                  <Headphones className="w-5 h-5 text-[#E72E77]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1715]">Dedicated Expert</h4>
                  <p className="text-[11px] text-gray-500">1-on-1 advisor assigned to your big day</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 p-3.5 rounded-2xl border border-white shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1715]">30,000+ Assisted</h4>
                  <p className="text-[11px] text-gray-500">Trusted by over 30,000 Indian families</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-serif text-lg font-bold text-[#1A1715] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      Request Free Concierge Callback
                    </h3>
                    <p className="text-xs text-gray-500">
                      Our expert will call you within 15 minutes
                    </p>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Name / Couple Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya & Kabir"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#E72E77] focus:ring-1 focus:ring-[#E72E77]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number (+91)
                    </label>
                    <div className="relative">
                      <span className="text-xs font-bold text-gray-500 absolute left-3 top-1/2 -translate-y-1/2">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="98290 12345"
                        className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#E72E77] focus:ring-1 focus:ring-[#E72E77]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Wedding Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.weddingDate}
                        onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#E72E77]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Preferred City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#E72E77]"
                      >
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Goa">Goa</option>
                        <option value="Hyderabad">Hyderabad</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <span>Connecting with Genie...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Free Call back</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-gray-400 mt-2">
                    🔒 No spam. 100% confidential wedding advisor support.
                  </p>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                      Concierge Lead Confirmed!
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Thank you, <span className="font-bold text-[#1A1715]">{formData.name}</span>. A senior Wedsta advisor will call you at <span className="font-bold text-[#E72E77]">+91 {formData.phone}</span> within 15 minutes.
                    </p>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-2xl text-[11px] text-[#6B6866] border border-gray-100">
                    ✨ Your personalized quote sheet and shortlisted venues in <span className="font-semibold text-gray-800">{formData.city}</span> are being compiled.
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#E72E77] font-bold hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
