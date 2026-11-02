import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Briefcase, CheckCircle2, Crown } from 'lucide-react';

export default function WmgCorporateContactDesk({ onOpenVendorAuth, showToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      if (showToast) {
        showToast('Subscribed to WedMeGood wedding newsletter! 💌');
      }
    }
  };

  return (
    <section className="py-14 bg-white border-t border-gray-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. Verbatim About WedMeGood Editorial Block */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#E72E77] flex items-center justify-center font-bold">
              👑
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">
              WedMeGood - Your Personal Wedding Planner
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            WedMeGood is an Indian Wedding Planning Website and app where you can find the best wedding vendors, with prices and reviews at the click of a button. Whether you are looking to hire wedding planners in Delhi NCR, or looking for the top photographers, or just some ideas and inspiration for your wedding. WedMeGood can help you solve your wedding planning woes through its unique features. With a checklist, detailed vendor list, inspiration gallery, and convenience of connecting directly with vendors, you won&apos;t need to spend hours planning a wedding anymore.
          </p>
        </div>

        {/* 2. Contact Matrix & Registered Office Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Contact for Vendors */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E72E77] block">
              Contact Us to Get Listed
            </span>
            <h4 className="font-bold text-gray-800 text-sm">For Vendors</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E72E77]" />
                <span className="font-bold text-gray-900">0124-6812346</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>vendors@wedmegood.com</span>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onOpenVendorAuth('vendor')}
                className="w-full py-2 px-3 rounded-xl bg-[#E72E77] text-white text-xs font-bold hover:bg-[#B60056] transition"
              >
                Register as a Vendor
              </button>
            </div>
          </div>

          {/* Contact for Users */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
              Customer Support
            </span>
            <h4 className="font-bold text-gray-800 text-sm">For Couples & Families</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-gray-900">0124-6812345</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>info@wedmegood.com</span>
              </p>
            </div>
            <p className="text-[10px] text-gray-400 pt-1">
              Available Monday - Saturday (10 AM to 7 PM IST)
            </p>
          </div>

          {/* Registered Address */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
              Registered Office
            </span>
            <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E72E77]" />
              <span>Gurugram, Haryana</span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Second Floor, Ocus Technopolis, Golf Course Road, Sector 54, Gurugram, Haryana 122002
            </p>
          </div>

          {/* Newsletter Alert */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
              Wedding Ideas in Your Inbox
            </span>
            <h4 className="font-bold text-gray-800 text-sm">Get Latest Updates</h4>
            
            {!subscribed ? (
              <form onSubmit={handleNewsletter} className="space-y-2 pt-1">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:outline-none focus:border-[#E72E77]"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Subscribe</span>
                </button>
              </form>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
