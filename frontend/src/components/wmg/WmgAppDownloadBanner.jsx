import React, { useState } from 'react';

export default function WmgAppDownloadBanner({ showToast, onOpenDownloadModal }) {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendLink = (e) => {
    e.preventDefault();
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) {
      if (showToast) showToast('Please enter a valid 10-digit mobile number');
      return;
    }
    setSent(true);
    if (showToast) {
      showToast(`SMS sent to +91 ${clean} with your WedMeGood App download link! 📲`);
    }
  };

  return (
    <section className="py-12 bg-[#232323] text-white overflow-hidden relative font-sans" id="app-download">
      <div className="wmg-container flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text & Form Left */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
            Download The WedMeGood Mobile App Today!
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-[14px] text-gray-300 mb-6 font-medium">
            <span className="flex items-center space-x-1.5">
              <span className="text-[#e72e77] font-bold">✓</span>
              <span>Save Wedding Ideas</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="text-[#e72e77] font-bold">✓</span>
              <span>Shortlist Vendors</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="text-[#e72e77] font-bold">✓</span>
              <span>Get Free Wedding Checklist</span>
            </span>
          </div>

          <p className="text-[12px] text-gray-400 mb-3">You will receive an SMS with a link to download the App</p>

          {/* SMS Input Box */}
          <form onSubmit={handleSendLink} className="flex items-center gap-2 max-w-md mb-6">
            <div className="bg-white rounded-lg px-3 py-2.5 text-[#333] flex items-center space-x-2 flex-1">
              <span className="text-[#777] font-bold text-[14px]">+91</span>
              <input 
                className="w-full text-[14px] outline-none text-[#333]" 
                placeholder="Enter mobile number" 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[14px] px-6 py-2.5 rounded-lg transition whitespace-nowrap shadow-sm"
            >
              {sent ? 'SMS Sent!' : 'Download the App'}
            </button>
          </form>

          {/* Badges */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onOpenDownloadModal ? onOpenDownloadModal() : window.open('https://apps.apple.com', '_blank')}
              className="inline-block border border-gray-600 rounded-lg p-1.5 hover:border-white transition"
            >
              <div className="flex items-center space-x-2 px-2">
                <span className="text-xl"></span>
                <div className="text-left leading-none">
                  <div className="text-[9px] text-gray-400 uppercase">Download on the</div>
                  <div className="text-[12px] font-bold">App Store</div>
                </div>
              </div>
            </button>
            <button 
              onClick={() => onOpenDownloadModal ? onOpenDownloadModal() : window.open('https://play.google.com', '_blank')}
              className="inline-block border border-gray-600 rounded-lg p-1.5 hover:border-white transition"
            >
              <div className="flex items-center space-x-2 px-2">
                <span className="text-xl">▶</span>
                <div className="text-left leading-none">
                  <div className="text-[9px] text-gray-400 uppercase">GET IT ON</div>
                  <div className="text-[12px] font-bold">Google Play</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Smartphone Mockup Graphic Right */}
        <div 
          onClick={() => onOpenDownloadModal && onOpenDownloadModal()}
          className="w-full md:w-[320px] flex justify-center cursor-pointer group"
          title="Click to view QR Scanner"
        >
          <div className="relative w-64 h-[440px] bg-black border-4 border-gray-800 group-hover:border-[#e72e77] rounded-[36px] shadow-2xl p-2.5 flex flex-col items-center overflow-hidden transition duration-300">
            {/* Screen */}
            <div className="w-full h-full bg-[#fcf9f8] rounded-[26px] overflow-hidden flex flex-col">
              <div className="bg-[#e72e77] p-3 text-white text-center font-bold text-[13px]">
                WedMeGood App
              </div>
              <div className="p-3 space-y-2 flex-1 overflow-hidden">
                <div className="h-28 rounded-lg overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80" 
                    alt="WedMeGood App"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xs">
                    Your Dream Vivah
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-bold text-[#333]">
                  <div className="bg-white p-2 rounded shadow-sm border border-gray-100">Venues (14k+)</div>
                  <div className="bg-white p-2 rounded shadow-sm border border-gray-100">Photographers</div>
                  <div className="bg-white p-2 rounded shadow-sm border border-gray-100">Bridal Wear</div>
                  <div className="bg-white p-2 rounded shadow-sm border border-gray-100">Genie (Free)</div>
                </div>
                <div className="bg-pink-50 p-2 rounded text-[10px] text-[#e72e77] text-center font-bold">
                  Tap to Scan App QR 📲
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
