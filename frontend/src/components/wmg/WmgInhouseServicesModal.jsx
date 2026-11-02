import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Check, Calendar, Phone, MapPin, Users, Heart, ArrowRight } from 'lucide-react';

export default function WmgInhouseServicesModal({
  serviceType = 'wedsta', // 'wedsta' | 'genie' | 'venue'
  isOpen,
  onClose,
  showToast,
  onSelectCategory
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(serviceType);
  const [coupleName, setCoupleName] = useState('Pooja & Rohan');
  const [phone, setPhone] = useState('9829012345');
  const [city, setCity] = useState('Delhi NCR');
  const [weddingDate, setWeddingDate] = useState('2026-11-28');
  const [budget, setBudget] = useState('25-50L');
  const [selectedServices, setSelectedServices] = useState(['Venues', 'Photographers', 'Bridal Makeup']);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (showToast) {
      if (activeTab === 'wedsta') {
        showToast('💄 Wedsta appointment consultation booked! Our certified artist manager will call you within 2 hours.');
      } else if (activeTab === 'genie') {
        showToast('✨ WMG Free Genie Manager assigned! Your dedicated wedding coordinator will contact you shortly.');
      } else {
        showToast('🏰 Venue Price Shield Activated! Our luxury venue booking specialist will share discounted palace slots.');
      }
    }
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4 bg-[#faf8f6] rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <span className="bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              WMG Inhouse Service
            </span>
            <span className="text-xs font-bold text-[#888]">100% Quality Assurance</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 border-b border-gray-200 text-center font-bold text-xs sm:text-sm">
          <button
            onClick={() => { setActiveTab('wedsta'); setSubmitted(false); }}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'wedsta'
                ? 'border-[#e72e77] text-[#e72e77] bg-pink-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Wedsta (Makeup)
          </button>
          <button
            onClick={() => { setActiveTab('genie'); setSubmitted(false); }}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'genie'
                ? 'border-[#0070ba] text-[#0070ba] bg-blue-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Genie Services (Free)
          </button>
          <button
            onClick={() => { setActiveTab('venue'); setSubmitted(false); }}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'venue'
                ? 'border-[#b38600] text-[#b38600] bg-yellow-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Venue Booking Shield
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-[#2c2c2c]">Request Confirmed!</h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your inquiry has been routed to the senior WedMeGood inhouse coordination desk. You will receive an official WhatsApp confirmation at +91 {phone}.
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* 1. WEDSTA CONTENT */}
            {activeTab === 'wedsta' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between bg-gradient-to-r from-pink-50 to-white p-4 rounded-xl border border-pink-100">
                  <div>
                    <h3 className="text-xl font-bold text-[#2c2c2c]">Wedsta At-Home Luxury Beauty</h3>
                    <p className="text-xs text-[#666] mt-1">
                      Certified bridal stylists &amp; makeup artists with sanitized luxury vanity kits at your home or wedding venue.
                    </p>
                  </div>
                  <span className="bg-[#e72e77] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    WMG Certified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="border border-pink-100 rounded-lg p-3 bg-white">
                    <p className="font-bold text-[#e72e77]">Bridal HD Makeup</p>
                    <p className="text-base font-bold text-[#2c2c2c] mt-1">₹ 15,000</p>
                    <p className="text-[11px] text-gray-500">Includes draping, hair &amp; lashes</p>
                  </div>
                  <div className="border border-pink-100 rounded-lg p-3 bg-white">
                    <p className="font-bold text-[#e72e77]">Family Package</p>
                    <p className="text-base font-bold text-[#2c2c2c] mt-1">₹ 4,500 <span className="text-[10px] font-normal">/person</span></p>
                    <p className="text-[11px] text-gray-500">For mother, sisters &amp; bridesmaids</p>
                  </div>
                  <div className="border border-pink-100 rounded-lg p-3 bg-white">
                    <p className="font-bold text-[#e72e77]">Pre-Bridal Trial</p>
                    <p className="text-base font-bold text-[#2c2c2c] mt-1">₹ 2,000</p>
                    <p className="text-[11px] text-gray-500">Adjustable against final bridal package</p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        value={coupleName} 
                        onChange={(e) => setCoupleName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#e72e77]" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number (+91)</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#e72e77]" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">City</label>
                      <input 
                        type="text" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#e72e77]" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Wedding / Function Date</label>
                      <input 
                        type="date" 
                        value={weddingDate} 
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#e72e77]" 
                        required 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-sm py-3 rounded-lg transition shadow-md"
                  >
                    Book Wedsta Makeup Consultation
                  </button>
                </form>
              </div>
            )}

            {/* 2. GENIE SERVICES CONTENT */}
            {activeTab === 'genie' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-xl font-bold text-[#2c2c2c]">WedMeGood Genie Concierge</h3>
                    <p className="text-xs text-[#666] mt-1">
                      A dedicated personal wedding advisor assigned to negotiate rates, verify venue dates, and manage logistics — 100% Free!
                    </p>
                  </div>
                  <span className="bg-[#0070ba] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    100% FREE
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1.5 text-gray-700">
                  <p className="flex items-center space-x-2">
                    <span className="text-[#0070ba] font-bold">✓</span>
                    <span>Guaranteed price discounts negotiated directly with top 5-star properties and banquets.</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-[#0070ba] font-bold">✓</span>
                    <span>Curated list of available venues matching your exact Muhurat date and guest count.</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-[#0070ba] font-bold">✓</span>
                    <span>Zero commission, zero markup, 100% transparent direct quotes.</span>
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Couple Name</label>
                      <input 
                        type="text" 
                        value={coupleName} 
                        onChange={(e) => setCoupleName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0070ba]" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number (+91)</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0070ba]" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Planned Wedding Budget</label>
                    <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                      {['₹ 10L - 25L', '₹ 25L - 50L', '₹ 50L - 1 Cr', '₹ 1 Cr+'].map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`py-2 rounded-lg border transition ${
                            budget === b 
                              ? 'bg-[#0070ba] text-white border-[#0070ba]' 
                              : 'bg-white text-gray-700 border-gray-200 hover:border-[#0070ba]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Services Needed (Select all that apply)</label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Venues', 'Photographers', 'Bridal Makeup', 'Decorators', 'Catering', 'Mehendi Artists'].map((srv) => (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`px-3 py-1.5 rounded-full border transition ${
                            selectedServices.includes(srv)
                              ? 'bg-[#0070ba] text-white border-[#0070ba]'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#0070ba] hover:bg-[#005a96] text-white font-bold text-sm py-3 rounded-lg transition shadow-md"
                  >
                    Assign Free Genie Wedding Advisor
                  </button>
                </form>
              </div>
            )}

            {/* 3. VENUE BOOKING SERVICE CONTENT */}
            {activeTab === 'venue' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between bg-gradient-to-r from-yellow-50 to-white p-4 rounded-xl border border-yellow-200">
                  <div>
                    <h3 className="text-xl font-bold text-[#2c2c2c]">WMG Venue Booking Guarantee</h3>
                    <p className="text-xs text-[#666] mt-1">
                      Direct contract rates with 14,200+ verified hotels, palaces, banquet halls and lawns.
                    </p>
                  </div>
                  <span className="bg-[#b38600] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    BEST PRICE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="border border-yellow-200 rounded-lg p-3 bg-white">
                    <p className="font-bold text-[#b38600]">Price Shield Guarantee</p>
                    <p className="text-[11px] text-gray-600 mt-1">
                      If you find a lower price anywhere online for the same date and banquet, WedMeGood will match the rate and give ₹ 10,000 WMG cash.
                    </p>
                  </div>
                  <div className="border border-yellow-200 rounded-lg p-3 bg-white">
                    <p className="font-bold text-[#b38600]">Free Date Holding</p>
                    <p className="text-[11px] text-gray-600 mt-1">
                      Hold auspicious Shubh Muhurat dates for up to 48 hours without paying non-refundable token deposits.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      onClose();
                      onSelectCategory?.('Venue');
                    }}
                    className="text-xs font-bold text-[#b38600] hover:underline"
                  >
                    Browse 14,200+ Venues First →
                  </button>
                  <button 
                    onClick={handleBookingSubmit}
                    className="bg-[#b38600] hover:bg-[#997300] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition shadow-md"
                  >
                    Request Palace Rate Card
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
