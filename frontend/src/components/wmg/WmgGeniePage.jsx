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
  Crown, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X as CloseIcon,
  IndianRupee,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GENIE_FAQS = [
  {
    q: "Is WedMeGood Genie really 100% free for couples?",
    a: "Yes! WedMeGood Genie is completely free for couples. There are no hidden consultation fees, retainers, or booking commissions charged to you. Our goal is to ensure you get the best verified wedding vendors and venues at the lowest price."
  },
  {
    q: "How does Genie get lower prices than what I can negotiate myself?",
    a: "Because WedMeGood brings thousands of weddings to venues and vendors every year, our senior managers have pre-negotiated wholesale rates and priority dates that individual couples cannot access on their own."
  },
  {
    q: "What vendors does Genie help me book?",
    a: "Your dedicated Genie manager assists with end-to-end planning: banquet halls and 5-star hotels, candid wedding photographers, bridal makeup artists, wedding decorators, catering, and guest entertainment."
  },
  {
    q: "How soon will my Genie manager call me after submitting?",
    a: "A dedicated senior wedding advisor will call you within 15 to 30 minutes during business hours (10 AM to 8 PM) to understand your family's exact requirements."
  }
];

export default function WmgGeniePage({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    weddingDate: '',
    city: 'Delhi NCR',
    budget: '₹25 Lakhs - ₹50 Lakhs',
    guests: '300 - 500 Guests'
  });

  const [openFaq, setOpenFaq] = useState(0);
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

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number (+91 9xxxx xxxxx)');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (showToast) {
        showToast('WedMeGood Genie Concierge booked! Your advisor will call shortly. ✨');
      }
    }, 600);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">WedMeGood Genie Concierge</span>
        </div>

        {/* Hero Official Web Banner */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 mb-10 bg-white">
          <img
            src="https://image.wedmegood.com/resized/1000X/uploads/Genie_Banner_Web.jpg"
            alt="WedMeGood Genie"
            className="w-full h-auto object-cover max-h-72"
          />
        </div>

        {/* Value Prop & Lead Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E72E77]/10 text-[#E72E77] text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WedMeGood Genie • Free Personal Wedding Manager</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1715] leading-tight">
              Plan Your Dream Wedding Within Your Budget —{' '}
              <span className="text-[#E72E77] underline decoration-[#D4AF37] decoration-wavy decoration-2">
                100% Free!
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Planning an Indian wedding involves hundreds of calls, confusing vendor quotes, and budget headaches. Let our certified WedMeGood Genie compare 50+ venues, negotiate the best quotes, schedule accompanied recces, and protect your bookings with our Price Shield.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="font-bold text-sm text-[#1A1715]">Price Shield</h4>
                <p className="text-xs text-gray-500 mt-0.5">Guaranteed lowest verified rates with 0% markup</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <Headphones className="w-6 h-6 text-[#E72E77] mb-2" />
                <h4 className="font-bold text-sm text-[#1A1715]">Dedicated Expert</h4>
                <p className="text-xs text-gray-500 mt-0.5">1-on-1 certified wedding planner assigned to you</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <Clock className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-[#1A1715]">Save 40+ Hours</h4>
                <p className="text-xs text-gray-500 mt-0.5">Zero spam calls. We handle all vendor negotiations</p>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mt-8">
              <h3 className="font-serif text-xl font-bold text-[#1A1715] mb-4">
                Why Plan With WedMeGood Genie?
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider">
                      <th className="py-2.5">Feature</th>
                      <th className="py-2.5 text-gray-500">Planning Alone</th>
                      <th className="py-2.5 text-[#e72e77] font-bold">With WMG Genie (Free)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 font-semibold text-gray-800">Venue &amp; Catering Rates</td>
                      <td className="py-3 text-gray-500">Standard retail rates</td>
                      <td className="py-3 text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 10-15% Negotiated Discount
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-800">Site Visits &amp; Recces</td>
                      <td className="py-3 text-gray-500">Coordinate alone in traffic</td>
                      <td className="py-3 text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Scheduled &amp; Accompanied
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-800">Price Shield Guarantee</td>
                      <td className="py-3 text-gray-400">None</td>
                      <td className="py-3 text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 100% Protected
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-800">Service Fee</td>
                      <td className="py-3 text-gray-500">Wedding planners charge 10%</td>
                      <td className="py-3 text-[#e72e77] font-bold">
                        ₹0 (100% Free for Couples)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 sticky top-24">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1A1715] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Book Your Free Genie Manager</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter details below. Your manager will call within 15 minutes.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#E72E77]"
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
                      className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#E72E77]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Wedding City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#E72E77]"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Goa">Goa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Approx Date</label>
                    <input
                      type="date"
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#E72E77]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Wedding Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#E72E77]"
                  >
                    <option value="Under ₹15 Lakhs">Under ₹15 Lakhs</option>
                    <option value="₹15 Lakhs - ₹30 Lakhs">₹15 Lakhs - ₹30 Lakhs</option>
                    <option value="₹30 Lakhs - ₹60 Lakhs">₹30 Lakhs - ₹60 Lakhs</option>
                    <option value="₹60 Lakhs - ₹1.5 Crore">₹60 Lakhs - ₹1.5 Crore</option>
                    <option value="₹1.5 Crore+">₹1.5 Crore+ Luxury Palace</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#E72E77] hover:bg-[#D11F67] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group mt-2"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>{loading ? 'Submitting...' : 'Request Free Genie Manager Call'}</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center pt-1">
                  🔒 We protect your privacy. Zero spam guarantee.
                </p>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Genie Manager Booked!
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A dedicated senior wedding manager has been assigned and will call you on <strong>+91 {formData.phone}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#E72E77] hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            )}
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-[#1A1715] mb-6 text-center">
            Frequently Asked Questions About Genie
          </h3>
          <div className="divide-y divide-gray-100 space-y-3">
            {GENIE_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="pt-3">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between text-left py-2 font-bold text-sm text-[#1A1715] hover:text-[#e72e77] transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-gray-600 leading-relaxed pb-3 pt-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
