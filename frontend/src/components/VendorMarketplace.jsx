import React from 'react';
import VendorCard from './VendorCard.jsx';
import { Sparkles, MapPin, CheckCircle2, RotateCcw } from 'lucide-react';

export default function VendorMarketplace({
  vendors,
  loading,
  selectedFaith,
  setSelectedFaith,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  verifiedOnly,
  setVerifiedOnly,
  onSelectVendor,
  onBookVendor,
  onResetFilters
}) {
  const faiths = [
    { id: 'All Traditions', label: 'All Traditions', emoji: '🌟' },
    { id: 'Hindu', label: 'Hindu Vivah', emoji: '🕉️' },
    { id: 'Muslim', label: 'Muslim Nikah', emoji: '☪️' },
    { id: 'Sikh', label: 'Sikh Anand Karaj', emoji: '☬' },
    { id: 'Christian', label: 'Christian Nuptials', emoji: '✝️' },
    { id: 'Jain', label: 'Jain Vivah', emoji: '🪷' }
  ];

  const categories = [
    "All vendors",
    "Venue",
    "Pandit / Officiant",
    "Photographer",
    "Caterer",
    "Decorator",
    "Mehndi Artist",
    "Bridal Wear",
    "DJ / Music"
  ];

  const cities = ["All cities", "Udaipur", "Jaipur", "Delhi NCR", "Mumbai", "Goa"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#B4245D] block mb-1">
            Handpicked & Multi-Faith Verified
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1F1F]">
            Browse Curated Wedding Partners
          </h2>
          <p className="text-xs text-[#7A7A7A] mt-1 font-sans">
            Showing verified specialists for <strong className="text-[#1F1F1F] font-semibold">{selectedFaith}</strong> in <strong className="text-[#1F1F1F] font-semibold">{selectedCity}</strong>
          </p>
        </div>

        {/* Filters Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition font-sans ${
              verifiedOnly
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                : 'bg-white text-[#4A4A4A] border-[#F0ECE4] hover:border-[#D4AF37]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>

          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-[#7A7A7A] hover:text-[#1F1F1F] hover:bg-[#FAF8F6] transition border border-transparent hover:border-[#F0ECE4]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Faith Selector Sub-pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-4">
        {faiths.map((f) => {
          const isSelected = selectedFaith === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFaith(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition font-sans ${
                isSelected
                  ? 'bg-[#1F1F1F] text-white shadow-xs'
                  : 'bg-white text-[#4A4A4A] border border-[#F0ECE4] hover:bg-[#FAF8F6]'
              }`}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Stitch Category Filter Chips: Pill-shaped with ivory background, transitioning to rose outline and #FFEBE8 fill when active */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition font-sans ${
                isSelected
                  ? 'bg-[#FFEBE8] text-[#B4245D] border-2 border-[#E72E76] font-bold shadow-xs'
                  : 'bg-[#FAF8F6] text-[#4A4A4A] border border-[#F0ECE4] hover:border-[#E8D8A6]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* City Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-8 text-xs font-sans">
        <span className="text-[#7A7A7A] font-bold uppercase tracking-wider mr-2 flex items-center gap-1 flex-shrink-0 font-cinzel text-[10px]">
          <MapPin className="w-3.5 h-3.5 text-[#E72E76]" /> Destination:
        </span>
        {cities.map((city) => {
          const isSelected = selectedCity === city;
          return (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-[#E72E76] text-white font-bold'
                  : 'bg-[#FAF8F6] text-[#7A7A7A] hover:bg-[#F0ECE4]'
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>

      {/* Vendors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-3xl h-80 animate-pulse border border-[#F0ECE4]" />
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#E8D8A6] p-8 shadow-ambient-gold">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#1F1F1F]">No matching partners found for this filter</h3>
          <p className="text-xs text-[#7A7A7A] mt-1 max-w-sm mx-auto font-sans">
            Try switching your tradition or destination city filter to explore more approved vendors.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 px-5 py-2.5 rounded-2xl bg-[#E72E76] hover:bg-[#B4245D] text-white text-xs font-bold shadow-luxury"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onSelectVendor={onSelectVendor}
              onBookVendor={onBookVendor}
            />
          ))}
        </div>
      )}

    </div>
  );
}
