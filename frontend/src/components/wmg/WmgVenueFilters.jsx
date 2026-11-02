import React from 'react';
import { Sparkles, Building, Trees, Castle, Home, IndianRupee, Check, ArrowRight } from 'lucide-react';

export const POPULAR_VENUE_TYPES = [
  { id: 'hotels', label: '4 Star & Above Hotels', cities: ['Mumbai', 'Bangalore', 'Pune', 'Delhi NCR'] },
  { id: 'banquets', label: 'Banquet Halls', cities: ['Delhi NCR', 'Mumbai', 'Kolkata', 'Hyderabad'] },
  { id: 'lawns', label: 'Marriage Garden / Lawns', cities: ['Jaipur', 'Bangalore', 'Lucknow', 'Pune'] }
];

export const POPULAR_SEARCH_PILLS = [
  { id: 'Bridal Wear', label: 'Bridal Wear' },
  { id: 'Makeup Artist', label: 'Bridal Makeup Artists' },
  { id: 'Photographer', label: 'Photographers' },
  { id: 'Invitations', label: 'Invitations' },
  { id: 'Caterer', label: 'Catering Services' },
  { id: 'Decorator', label: 'Wedding Decorators' },
  { id: 'Mehndi Artist', label: 'Mehendi Artists' }
];

export default function WmgVenueFilters({
  activeFilter,
  setActiveFilter,
  onApplyFilter,
  onSelectCategory,
  onSelectCity
}) {
  return (
    <div className="bg-[#FAF8F5] py-6 border-b border-gray-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Strip 1: Popular Venue Searches with City Links */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-gray-200/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Popular Venue Searches:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {POPULAR_VENUE_TYPES.map((type) => (
              <div key={type.id} className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setActiveFilter(type.id);
                    if (onApplyFilter) onApplyFilter(type.label);
                  }}
                  className="font-bold text-gray-800 hover:text-[#E72E77] transition"
                >
                  {type.label}
                </button>
                <span className="text-gray-400 text-[11px]">(</span>
                {type.cities.map((city, idx) => (
                  <React.Fragment key={city}>
                    <button
                      onClick={() => onSelectCity(city)}
                      className="text-gray-500 hover:text-[#E72E77] transition text-[11px]"
                    >
                      {city}
                    </button>
                    {idx < type.cities.length - 1 && <span className="text-gray-300">•</span>}
                  </React.Fragment>
                ))}
                <span className="text-gray-400 text-[11px]">)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strip 2: Popular Searches Quick Pills Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-gray-600 flex-shrink-0">
            Popular Searches:
          </span>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {POPULAR_SEARCH_PILLS.map((pill) => (
              <button
                key={pill.id}
                onClick={() => onSelectCategory(pill.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-white hover:bg-[#FFF0F5] hover:text-[#E72E77] border border-gray-200 hover:border-[#E72E77] transition-all shadow-xs"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
