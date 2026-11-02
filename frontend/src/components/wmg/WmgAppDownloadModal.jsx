import React, { useState } from 'react';
import { Smartphone, Check, Send, X, QrCode } from 'lucide-react';

export default function WmgAppDownloadModal({ isOpen, onClose, showToast }) {
  if (!isOpen) return null;

  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendSms = (e) => {
    e.preventDefault();
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) {
      if (showToast) showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    setSent(true);
    if (showToast) {
      showToast(`📲 App download link sent to +91 ${clean}! Check your SMS messages.`);
    }
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-[#232323] text-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-800 relative animate-in fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#e72e77] flex items-center justify-center text-white shadow-lg">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif">Download WedMeGood App</h3>
            <p className="text-xs text-gray-400">Available free on iOS and Android</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 items-center">
          
          {/* Left: SMS input & benefits */}
          <div className="space-y-3">
            <div className="text-xs text-gray-300 space-y-1.5 font-medium">
              <p className="flex items-center space-x-2">
                <span className="text-[#e72e77] font-bold">✓</span>
                <span>Save 20,000+ bridal lehenga ideas</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-[#e72e77] font-bold">✓</span>
                <span>Chat directly with verified vendors</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-[#e72e77] font-bold">✓</span>
                <span>120-Step Indian Wedding Checklist</span>
              </p>
            </div>

            <form onSubmit={handleSendSms} className="pt-2">
              <label className="block text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                Enter Mobile Number
              </label>
              <div className="flex items-center bg-white rounded-lg p-1 text-[#333]">
                <span className="text-xs font-bold px-2 text-gray-500">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full text-xs p-1 outline-none text-[#333]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#e72e77] hover:bg-[#d11f67] text-white text-xs font-bold px-3 py-1.5 rounded-md transition whitespace-nowrap"
                >
                  {sent ? 'Sent!' : 'Send SMS'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: QR Code Scanner box */}
          <div className="bg-[#1a1715] p-4 rounded-xl border border-gray-700 text-center flex flex-col items-center">
            <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center mb-2 shadow-inner">
              {/* Scalable SVG QR Code */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                <path d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM10 50h10v10h-10zM30 50h10v10h-10zM50 50h20v20h-20zM80 50h10v30h-10zM10 70h20v20h-20zM40 70h10v20h-10zM60 80h10v10h-10zM15 15v20h20v-20zM75 15v10h10v-10zM15 75v10h10v-10z"/>
              </svg>
            </div>
            <p className="text-[11px] font-bold text-gray-300">Scan QR with Mobile Camera</p>
            <p className="text-[10px] text-gray-500">Instant app installation</p>
          </div>

        </div>

        {/* Store Badges */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-center space-x-4">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
            className="border border-gray-700 hover:border-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition"
          >
            <span className="text-lg"></span>
            <div className="text-left leading-none">
              <div className="text-[8px] text-gray-400">Download on the</div>
              <div>App Store</div>
            </div>
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="border border-gray-700 hover:border-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition"
          >
            <span className="text-lg text-emerald-400">▶</span>
            <div className="text-left leading-none">
              <div className="text-[8px] text-gray-400">GET IT ON</div>
              <div>Google Play</div>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
