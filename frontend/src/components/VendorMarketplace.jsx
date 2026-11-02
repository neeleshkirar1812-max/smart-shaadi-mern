import React from 'react';
import VendorCard from './VendorCard.jsx';
import { Filter, Sparkles, MapPin, CheckCircle2, RotateCcw } from 'lucide-react';

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
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-royal-wine block mb-1">
            Handpicked & Multi-Faith Verified
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Browse Curated Wedding Partners
          </h2>
          <p className="text-xs text-gray-500 mt-1 font-sans">
            Showing verified specialists for <strong className="text-royal-charcoal font-semibold">{selectedFaith}</strong> in <strong className="text-royal-charcoal font-semibold">{selectedCity}</strong>
          </p>
        </div>

        {/* Filters Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
              verifiedOnly
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>

          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-royal-charcoal hover:bg-royal-sand/50 transition border border-transparent hover:border-gray-200"
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition font-sans ${
                isSelected
                  ? 'bg-royal-charcoal text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-royal-sand hover:bg-royal-sand/30'
              }`}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm font-sans ${
                isSelected
                  ? 'royal-gradient-wine text-white shadow-md'
                  : 'bg-white text-gray-700 border border-royal-sand hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* City Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-8 text-xs font-sans">
        <span className="text-gray-400 font-bold uppercase tracking-wider mr-2 flex items-center gap-1 flex-shrink-0 font-cinzel text-[10px]">
          <MapPin className="w-3.5 h-3.5 text-royal-wine" /> Destination:
        </span>
        {cities.map((city) => {
          const isSelected = selectedCity === city;
          return (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-royal-wine text-white font-bold'
                  : 'bg-royal-sand/50 text-gray-600 hover:bg-royal-sand'
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
            <div key={n} className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 p-8">
          <Sparkles className="w-10 h-10 text-royal-gold mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-gray-800">No matching partners found for this filter</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto font-sans">
            Try switching your tradition or destination city filter to explore more approved vendors.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 rounded-xl royal-gradient-wine text-white text-xs font-bold shadow"
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
