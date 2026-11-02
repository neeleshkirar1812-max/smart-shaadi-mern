import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  X, 
  Users, 
  Share2,
  CheckCircle2 
} from 'lucide-react';
import { VERBATIM_REAL_WEDDINGS } from './WmgRealWeddings.jsx';

export default function WmgRealWeddingsPage({
  selectedCity,
  onSelectVendor,
  showToast
}) {
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);

  const destinationCities = ['All', 'Udaipur', 'Jaipur', 'Goa', 'Delhi NCR', 'Tuscany, Italy', 'Kapalua, Hawaii'];

  const filteredWeddings = VERBATIM_REAL_WEDDINGS.filter((w) => {
    if (selectedCityFilter !== 'All' && !w.location.toLowerCase().includes(selectedCityFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">Real Wedding Stories</span>
          {selectedCityFilter !== 'All' && (
            <>
              <span>›</span>
              <span className="text-[#e72e77] font-bold">{selectedCityFilter}</span>
            </>
          )}
        </div>

        {/* Page Header Hero */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e72e77] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Real Couples &amp; Trusted Reviews</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A1715]">
                Real Wedding Stories &amp; Experiences
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-2xl">
                Get inspired by real brides and grooms, explore candid wedding pictures, read rituals narratives, and see which vetted vendors they hired.
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center shrink-0">
              <span className="font-serif text-2xl font-bold text-[#e72e77] block">
                {VERBATIM_REAL_WEDDINGS.length * 15}+
              </span>
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                Real Weddings Documented
              </span>
            </div>
          </div>

          {/* Quick Destination Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 border-t border-gray-100 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Destinations:
            </span>
            {destinationCities.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedCityFilter(dest)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition shrink-0 ${
                  selectedCityFilter === dest
                    ? 'bg-[#e72e77] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Real Weddings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWeddings.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Photo Reel */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={story.image}
                    alt={story.couple}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90" />

                  <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    <span>{story.date}</span>
                  </span>

                  <span className="absolute top-3 right-3 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                    {story.location}
                  </span>

                  {story.tag && (
                    <span className="absolute top-3 left-3 bg-white/90 text-[#1A1715] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs backdrop-blur-xs">
                      {story.tag}
                    </span>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#1A1715] group-hover:text-[#e72e77] transition mb-2 leading-tight">
                    {story.couple}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {story.description}
                  </p>

                  {/* Hired Vendors Quick Summary */}
                  {story.vendors && story.vendors.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-100 space-y-1.5 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Hired Vendors:
                      </span>
                      {story.vendors.slice(0, 3).map((v, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] text-gray-700">
                          <span className="font-semibold text-gray-500">{v.role}:</span>
                          <span className="font-bold text-[#1A1715] truncate max-w-[170px]">{v.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStory(story);
                  }}
                  className="w-full bg-[#FAF8F5] group-hover:bg-[#e72e77] text-gray-700 group-hover:text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Real Wedding Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Real Wedding Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-80 bg-gray-100">
              <img
                src={selectedStory.image}
                alt={selectedStory.couple}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-[#FFE088] uppercase tracking-wider">
                  {selectedStory.location} • {selectedStory.date}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {selectedStory.couple}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#e72e77] mb-1">
                  The Wedding Story
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed font-sans">
                  {selectedStory.details || selectedStory.description}
                </p>
              </div>

              {/* Complete Hired Vendors Breakdown */}
              {selectedStory.vendors && selectedStory.vendors.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-200">
                  <h4 className="font-serif text-base font-bold text-[#1A1715] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Hired Wedding Vendors</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedStory.vendors.map((v, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-gray-100">
                        <span className="font-bold text-[#e72e77] uppercase tracking-wider text-[11px]">
                          {v.role}
                        </span>
                        <span className="font-bold text-gray-800">{v.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Read ${selectedStory.couple}'s wedding story on WedMeGood: ${selectedStory.location}`);
                    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                  }}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Story</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    if (showToast) showToast('Browse similar venues in ' + selectedStory.location);
                  }}
                  className="w-full py-3 rounded-xl bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs transition"
                >
                  Close &amp; Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
