import React from 'react';
import { Heart, X, Trash2, ArrowRight, Sparkles, Building2, Send } from 'lucide-react';
import { INSPIRATION_PHOTOS } from './WmgInspirationGallery.jsx';

export default function WmgWishlistModal({
  isOpen,
  onClose,
  wishlist = [],
  onRemoveItem,
  onClearWishlist,
  vendors = [],
  onSelectVendor,
  onOpenGenie
}) {
  if (!isOpen) return null;

  // Match saved IDs against inspiration photos or vendors
  const savedPhotos = INSPIRATION_PHOTOS.filter(p => wishlist.includes(p.id));
  const savedVendors = vendors.filter(v => wishlist.includes(v.id || v._id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] text-[#E72E77] flex items-center justify-center">
              <Heart className="w-5 h-5 fill-[#E72E77]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1715]">
                Your Wedding Wishlist & Shortlist
              </h3>
              <p className="text-xs text-gray-400">
                {wishlist.length} saved inspiration looks & verified vendors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F5] text-[#E72E77] flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-bold text-gray-800">
                Your Wishlist is Empty
              </h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Tap the heart icon on any venue card or inspiration photo to save ideas to your personal moodboard.
              </p>
            </div>
          ) : (
            <>
              {/* Saved Vendors Section */}
              {savedVendors.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                    Shortlisted Vendors ({savedVendors.length})
                  </span>
                  <div className="space-y-2">
                    {savedVendors.map(v => (
                      <div
                        key={v.id || v._id}
                        className="p-3 rounded-2xl bg-[#FAF8F5] border border-gray-100 flex items-center justify-between gap-3"
                      >
                        <div 
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() => { onSelectVendor(v); onClose(); }}
                        >
                          <img
                            src={v.imageUrl || v.image}
                            alt={v.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800 hover:text-[#E72E77] transition">
                              {v.name}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              {v.category} • {v.city}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(v.id || v._id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Photos Section */}
              {savedPhotos.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                    Inspiration Moodboard ({savedPhotos.length})
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {savedPhotos.map(p => (
                      <div
                        key={p.id}
                        className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 group"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                          <p className="text-[10px] font-bold line-clamp-1">{p.title}</p>
                          <p className="text-[9px] text-[#FFE088]">{p.category}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(p.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-rose-600 transition"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-[#FAF8F5] flex items-center justify-between text-xs">
            <button
              onClick={onClearWishlist}
              className="text-gray-400 hover:text-rose-600 font-semibold transition"
            >
              Clear All Items
            </button>

            <button
              onClick={() => {
                onClose();
                if (onOpenGenie) onOpenGenie();
              }}
              className="py-2.5 px-4 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inquire All with Free Genie</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
