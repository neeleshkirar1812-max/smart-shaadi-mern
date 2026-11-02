import React from 'react';
import { Sparkles, Building, Trees, Castle, Home, IndianRupee, Check } from 'lucide-react';

export const VENUE_FILTER_PILLS = [
  { id: 'luxury', label: '4-Star & 5-Star Luxury Hotels', icon: Building, query: '5-star hotel luxury resort' },
  { id: 'lawns', label: 'Lush Green Wedding Lawns', icon: Trees, query: 'lawn open garden outdoor' },
  { id: 'palaces', label: 'Palace & Heritage Forts (Rajasthan)', icon: Castle, query: 'palace heritage fort royal' },
  { id: 'villas', label: 'Intimate Farmhouses & Villas', icon: Home, query: 'villa farmhouse intimate pool' },
  { id: 'budget', label: 'Banquet Halls under ₹1,500/plate', icon: IndianRupee, query: 'affordable banquet under 1500' }
];

export default function WmgVenueFilters({
  activeFilter,
  setActiveFilter,
  onApplyFilter
}) {
  const handleToggle = (pill) => {
    if (activeFilter === pill.id) {
      setActiveFilter(null);
      if (onApplyFilter) onApplyFilter('');
    } else {
      setActiveFilter(pill.id);
      if (onApplyFilter) onApplyFilter(pill.query);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-4 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Popular Venue Searches:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {VENUE_FILTER_PILLS.map((pill) => {
              const Icon = pill.icon;
              const isSelected = activeFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => handleToggle(pill)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#E72E77] text-white border-[#E72E77] shadow-sm'
                      : 'bg-white hover:bg-gray-50 text-[#2D2B2A] border-gray-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#8C827A]'}`} />
                  <span>{pill.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-white ml-0.5" />}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
