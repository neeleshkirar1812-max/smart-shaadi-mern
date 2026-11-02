import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Building2, Crown, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CITIES_LIST } from './WmgTopBar.jsx';
import { WMG_CATEGORIES } from './WmgHeroSearch.jsx';

export default function WmgSearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  onSelectCity,
  onExecuteSearch,
  vendors = []
}) {
  const [internalQuery, setInternalQuery] = useState(searchQuery || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredVendors = internalQuery.trim()
    ? vendors.filter(v => 
        v.name.toLowerCase().includes(internalQuery.toLowerCase()) ||
        v.city.toLowerCase().includes(internalQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(internalQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(internalQuery);
    if (onExecuteSearch) onExecuteSearch();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden relative">
        
        {/* Search Header Bar */}
        <form onSubmit={handleSearchSubmit} className="relative p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E72E77] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            placeholder="Search palaces, photographers, bridal lehengas, cities..."
            className="w-full text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-[10px] font-mono text-gray-500 border border-gray-200">
              <CornerDownLeft className="w-3 h-3" />
              <span>Enter</span>
            </kbd>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Live Suggestions Body */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-5 text-xs">
          
          {/* Real-time Matched Vendors */}
          {filteredVendors.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Matching Verified Partners
              </p>
              <div className="space-y-1.5">
                {filteredVendors.map(v => (
                  <button
                    key={v.id || v._id}
                    onClick={() => {
                      setSearchQuery(v.name);
                      if (onExecuteSearch) onExecuteSearch();
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-[#FAF8F5] transition text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF3E0] text-[#8C6D23] flex items-center justify-center font-bold">
                        🏰
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 group-hover:text-[#E72E77]">{v.name}</p>
                        <p className="text-[10px] text-gray-400">{v.category} • {v.city}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#E72E77] transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Categories */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Popular Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {WMG_CATEGORIES.slice(1, 7).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCategory(c.id);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#FFF0F5] hover:text-[#E72E77] border border-gray-200 transition font-medium text-gray-700"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Wedding Cities */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Explore By City
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CITIES_LIST.slice(1, 7).map(c => (
                <button
                  key={c.name}
                  onClick={() => {
                    onSelectCity(c.name);
                    onClose();
                  }}
                  className="p-2 rounded-xl hover:bg-gray-50 border border-gray-100 text-left flex items-center gap-2 text-gray-700"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E72E77]" />
                  <span className="font-semibold">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
