import React from 'react';
import { 
  Printer, 
  X, 
  Camera, 
  Gift, 
  Crown, 
  Sparkles, 
  Heart,
  QrCode
} from 'lucide-react';

export default function PrintTableStandeeModal({ wedding, onClose, showToast }) {
  const coupleName = wedding?.coupleName || 'Ananya & Kabir';
  const weddingDate = wedding?.weddingDate || '28 November 2026';
  const city = wedding?.city || 'Udaipur, Rajasthan';

  const photoDropQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://smartshaadi.com/photo-drop/royal-wedding-2026";
  const shagunQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=ananya.kabir@oksbi&pn=Ananya%20Kabir%20Wedding%20Shagun&cu=INR";

  const handlePrint = () => {
    window.print();
    showToast?.('Print dialogue triggered! 🖨️', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Top action toolbar (hidden during window.print) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-luxury hover:shadow-2xl transition"
        >
          <Printer className="w-4 h-4 text-royal-lightGold" />
          <span>Print Table Standee</span>
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/90 text-royal-charcoal flex items-center justify-center shadow hover:bg-red-50 hover:text-royal-wine transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Standee Card Container (Standard 5x7 or A5 Table Tent Ratio) */}
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 sm:p-12 shadow-2xl border-4 border-royal-gold/40 my-8 text-royal-charcoal text-center relative print:border-4 print:border-amber-700 print:shadow-none print:m-0 print:p-8 print:w-full print:rounded-2xl">
        
        {/* Subtle decorative gold frame corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-royal-gold" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-royal-gold" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-royal-gold" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-royal-gold" />

        {/* Royal Crest */}
        <div className="w-16 h-16 mx-auto rounded-2xl royal-gradient-wine flex items-center justify-center text-royal-gold shadow-luxury mb-4 ring-2 ring-royal-gold/40">
          <Crown className="w-8 h-8 text-royal-lightGold" />
        </div>

        <p className="font-cinzel text-xs uppercase tracking-widest text-royal-wine font-bold">
          The Royal Wedding Celebration
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-royal-charcoal mt-1">
          {coupleName}
        </h1>

        <p className="font-cinzel text-xs text-gray-500 tracking-wider mt-1">
          {weddingDate} • {city}
        </p>

        <div className="w-24 h-0.5 bg-royal-gold mx-auto my-5 rounded-full" />

        <p className="text-xs sm:text-sm text-gray-600 font-serif italic max-w-sm mx-auto mb-6">
          &ldquo;Dear Guests, thank you for gracing our special day with your warmth and blessings.&rdquo;
        </p>

        {/* Dual QR Code Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
          
          {/* QR 1: Photo Drop */}
          <div className="bg-royal-pearl p-5 rounded-2xl border border-royal-sand flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl royal-gradient-wine flex items-center justify-center text-royal-gold mb-3 shadow">
              <Camera className="w-5 h-5 text-royal-lightGold" />
            </div>
            <h3 className="font-serif font-bold text-sm text-royal-charcoal">Table Photo Drop</h3>
            <p className="text-[10px] text-gray-500 font-sans mt-0.5 mb-3">
              Upload candid moments from your phone
            </p>
            <div className="p-2 bg-white rounded-xl shadow-inner border border-royal-sand">
              <img
                src={photoDropQrUrl}
                alt="Table Photo Drop QR"
                className="w-36 h-36 object-contain"
              />
            </div>
            <span className="text-[10px] font-cinzel font-bold text-royal-wine uppercase tracking-wider mt-3">
              Scan to Share Photos
            </span>
          </div>

          {/* QR 2: Digital Shagun */}
          <div className="bg-royal-pearl p-5 rounded-2xl border border-royal-sand flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl royal-gradient-wine flex items-center justify-center text-royal-gold mb-3 shadow">
              <Gift className="w-5 h-5 text-royal-lightGold" />
            </div>
            <h3 className="font-serif font-bold text-sm text-royal-charcoal">Digital Shagun</h3>
            <p className="text-[10px] text-gray-500 font-sans mt-0.5 mb-3">
              GPay, PhonePe, Paytm, BHIM UPI
            </p>
            <div className="p-2 bg-white rounded-xl shadow-inner border border-royal-sand">
              <img
                src={shagunQrUrl}
                alt="Digital Shagun QR"
                className="w-36 h-36 object-contain"
              />
            </div>
            <span className="text-[10px] font-cinzel font-bold text-royal-wine uppercase tracking-wider mt-3">
              UPI: ananya.kabir@oksbi
            </span>
          </div>

        </div>

        {/* Footer instruction note */}
        <div className="pt-4 border-t border-royal-sand/80 text-xs text-gray-500 space-y-1">
          <p className="font-sans">Simply open your smartphone camera to scan directly. No app installation needed.</p>
          <p className="text-[10px] font-cinzel text-royal-wine font-bold tracking-widest uppercase mt-2">
            Smart Shaadi • Live Guest Experience Desk
          </p>
        </div>

      </div>
    </div>
  );
}
