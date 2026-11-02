import React from 'react';
import { Star, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function VendorCard({ vendor, onSelectVendor, onBookVendor }) {
  const getFaithBadge = (faith) => {
    switch (faith) {
      case 'Muslim': return { label: 'Nikah Specialist', color: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/30', emoji: '☪️' };
      case 'Sikh': return { label: 'Anand Karaj', color: 'bg-amber-950/80 text-amber-200 border-amber-500/30', emoji: '☬' };
      case 'Christian': return { label: 'Church Nuptials', color: 'bg-blue-950/80 text-blue-200 border-blue-500/30', emoji: '✝️' };
      case 'Jain': return { label: 'Strict Jain Pure', color: 'bg-yellow-950/80 text-yellow-200 border-yellow-500/30', emoji: '🪷' };
      case 'Hindu': return { label: 'Vedic Vivah', color: 'bg-orange-950/80 text-orange-200 border-orange-500/30', emoji: '🕉️' };
      default: return { label: 'All Traditions', color: 'bg-[#1F1F1F]/80 text-[#D4AF37] border-[#D4AF37]/30', emoji: '✨' };
    }
  };

  const badge = getFaithBadge(vendor.faith);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#F0ECE4] hover:border-[#E8D8A6] shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group">
      
      {/* Visual Image & Floating Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#B4245D] text-[10px] font-bold tracking-wider uppercase shadow-xs font-cinzel">
            {vendor.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold border shadow-xs flex items-center gap-1 font-cinzel ${badge.color}`}>
            <span>{badge.emoji}</span>
            <span>{badge.label}</span>
          </span>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span className="font-semibold">{vendor.city}</span>
          </div>

          {/* Stitch Pill-shaped Coral Rating Badge */}
          <div className="flex items-center gap-1 bg-[#E72E76] px-2.5 py-1 rounded-full text-white font-bold text-xs shadow-sm">
            <Star className="w-3 h-3 fill-white text-white flex-shrink-0" />
            <span>{vendor.rating}</span>
            <span className="text-[10px] opacity-90 font-normal">({vendor.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-[#1F1F1F] group-hover:text-[#B4245D] transition-colors leading-snug">
              {vendor.name}
            </h3>

            {/* Stitch Verified Badge: Champagne pill with micro gold shield icon */}
            {vendor.verified && (
              <span 
                title="Verified Partner" 
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FBF4E8] text-[#D4AF37] border border-[#E8D8A6] text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
              >
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-[#4A4A4A] line-clamp-2 leading-relaxed font-sans">
            {vendor.description}
          </p>

          {/* Specialty Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vendor.faithTags?.slice(0, 2).map((ft, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-lg bg-[#FFEBE8] text-[10px] font-bold text-[#B4245D] border border-[#E72E76]/20 font-cinzel"
              >
                {ft}
              </span>
            ))}
            {vendor.tags?.slice(0, 1).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F6] text-[10px] font-medium text-[#7A7A7A] border border-[#F0ECE4] font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Details & Pricing */}
        <div className="mt-5 pt-4 border-t border-[#F0ECE4]">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7A7A7A] block tracking-wider font-cinzel">Starting Package</span>
              <span className="font-serif text-xl font-bold text-[#B4245D]">{vendor.price}</span>
              <span className="text-[11px] text-[#7A7A7A] ml-1">/{vendor.priceUnit || 'ceremony'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#7A7A7A] block font-medium uppercase tracking-wider font-cinzel">Experience</span>
              <span className="text-xs font-bold text-[#1F1F1F] font-serif">{vendor.experience || '5+ Years'}</span>
            </div>
          </div>

          {/* Stitch Action Buttons: Secondary Gold Bordered + Primary Bridal Coral-Rose */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectVendor(vendor)}
              className="w-full py-2.5 px-3 rounded-2xl border border-[#D4AF37] bg-[#FBF4E8] text-xs font-bold text-[#735C00] hover:bg-[#F3E7C4] transition shadow-xs font-sans text-center"
            >
              View Profile
            </button>
            <button
              onClick={() => onBookVendor(vendor)}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#E72E76] hover:bg-[#B4245D] text-white text-xs font-bold shadow-luxury transition transform hover:-translate-y-0.5 font-sans text-center"
            >
              Request Quote
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
