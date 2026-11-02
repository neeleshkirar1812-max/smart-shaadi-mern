import React, { useState } from 'react';
import { Star, X, CheckCircle, ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';

const POPULAR_REVIEW_VENDORS = [
  { name: 'Makeup By Jyoti Sing', category: 'Bridal Makeup', city: 'Bangalore' },
  { name: 'Regenta Central Grand Exotica', category: 'Wedding Venues', city: 'Pune' },
  { name: 'Caelum Atharva Palace', category: 'Wedding Venues', city: 'Jaipur' },
  { name: 'AWM: Makeovers by Aastha', category: 'Bridal Makeup', city: 'Lucknow' },
  { name: 'The Leela Palace Bangalore', category: 'Wedding Venues', city: 'Bangalore' },
  { name: 'The Raj Palace by Small Luxury Hotels', category: 'Wedding Venues', city: 'Jaipur' },
  { name: 'The King\'s Meadows', category: 'Wedding Venues', city: 'Bangalore' },
  { name: 'Stories by Joseph Radhik', category: 'Photographers', city: 'Mumbai' }
];

const EXPERIENCE_STICKERS = [
  '#ValueForMoney',
  '#ProfessionalCrew',
  '#StunningOutfits',
  '#PunctualArrival',
  '#LovedByFamily',
  '#MagicalLighting',
  '#FlawlessMakeup',
  '#DeliciousCatering',
  '#HassleFreeCoordination'
];

export default function WmgWriteReviewModal({ isOpen, onClose, showToast, user }) {
  if (!isOpen) return null;

  const [selectedVendor, setSelectedVendor] = useState(POPULAR_REVIEW_VENDORS[0].name);
  const [customVendorName, setCustomVendorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedStickers, setSelectedStickers] = useState(['#ValueForMoney', '#ProfessionalCrew']);
  const [reviewTitle, setReviewTitle] = useState('Truly made our big day completely unforgettable!');
  const [reviewText, setReviewText] = useState('We hired them for our wedding celebrations. The entire team was punctual, extremely courteous with our family, and executed everything flawlessly. Highly recommended to all couples on WedMeGood!');
  const [weddingDate, setWeddingDate] = useState('2026-10-18');
  const [amountSpent, setAmountSpent] = useState('150000');
  const [submitted, setSubmitted] = useState(false);

  const toggleSticker = (sticker) => {
    if (selectedStickers.includes(sticker)) {
      setSelectedStickers(selectedStickers.filter((s) => s !== sticker));
    } else {
      setSelectedStickers([...selectedStickers, sticker]);
    }
  };

  const getRatingLabel = (val) => {
    switch (val) {
      case 1: return '1.0 - Terrible Experience';
      case 2: return '2.0 - Poor / Below Average';
      case 3: return '3.0 - Average Service';
      case 4: return '4.0 - Very Good Service';
      case 5: return '5.0 - Excellent! Highly Recommended';
      default: return 'Rate your overall experience';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      if (showToast) showToast('Please write a few words about your experience.');
      return;
    }

    setSubmitted(true);
    const vendorName = customVendorName.trim() || selectedVendor;
    if (showToast) {
      showToast(`⭐ Review published for ${vendorName}! Thank you for helping thousands of couples.`);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in">
        
        {/* Header */}
        <div className="bg-[#e72e77] text-white p-5 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-2xl">rate_review</span>
            <div>
              <h3 className="font-bold text-lg">Write A Wedding Review</h3>
              <p className="text-xs text-pink-100">Help 2 Million+ couples choose verified wedding vendors</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-[#2c2c2c]">Review Submitted!</h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your verified review and rating have been recorded. It will appear on the vendor&apos;s WedMeGood dossier profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-[#2c2c2c]">
            
            {/* Vendor Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#555] mb-1.5">
                Select Wedding Vendor
              </label>
              <select
                value={selectedVendor}
                onChange={(e) => {
                  setSelectedVendor(e.target.value);
                  setCustomVendorName('');
                }}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white outline-none focus:border-[#e72e77]"
              >
                {POPULAR_REVIEW_VENDORS.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} — {v.category} ({v.city})
                  </option>
                ))}
                <option value="other">Other / Custom Vendor Name</option>
              </select>

              {selectedVendor === 'other' && (
                <input
                  type="text"
                  placeholder="Enter vendor business name..."
                  value={customVendorName}
                  onChange={(e) => setCustomVendorName(e.target.value)}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#e72e77]"
                  required
                />
              )}
            </div>

            {/* Star Rating Picker */}
            <div className="bg-[#faf8f6] p-4 rounded-xl border border-gray-200 text-center">
              <p className="text-xs font-bold text-[#777] uppercase tracking-wider mb-2">
                Overall Rating
              </p>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star 
                        className={`w-8 h-8 ${active ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-bold text-[#e72e77] mt-2">
                {getRatingLabel(hoverRating || rating)}
              </p>
            </div>

            {/* Experience Sticker Tags */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#555] mb-2">
                What did you love about them?
              </label>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_STICKERS.map((tag) => {
                  const isSelected = selectedStickers.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleSticker(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                        isSelected 
                          ? 'bg-[#e72e77] text-white' 
                          : 'bg-gray-100 text-[#555] hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Title & Content */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#555] mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="E.g., Flawless bridal glam and great punctuality!"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#e72e77]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#555] mb-1">
                Detailed Review
              </label>
              <textarea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience: service quality, responsiveness, punctuality, pricing transparency..."
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#e72e77]"
                required
              />
              <span className="text-[11px] text-gray-400 block mt-1">
                Minimum 20 words required for verified reviews.
              </span>
            </div>

            {/* Wedding Date & Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555] mb-1">
                  Wedding Date
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#e72e77]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555] mb-1">
                  Amount Spent (₹)
                </label>
                <input
                  type="number"
                  value={amountSpent}
                  onChange={(e) => setAmountSpent(e.target.value)}
                  placeholder="₹ Total paid"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-[#e72e77]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-sm px-6 py-2.5 rounded-lg transition shadow-md flex items-center space-x-1.5"
              >
                <span>Publish Review</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
