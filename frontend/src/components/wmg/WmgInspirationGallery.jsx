import React, { useState } from 'react';
import { Sparkles, Heart, X, ArrowRight } from 'lucide-react';

export const GALLERY_TO_LOOK_FOR = [
  {
    id: 'g-1',
    title: 'Bridal Lehenga',
    count: '65,000+ Photos',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    tags: ['Zardozi', 'Red Velvet', 'Pastel Pink']
  },
  {
    id: 'g-2',
    title: 'Outfits',
    count: '42,000+ Photos',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    tags: ['Anarkali', 'Sharara', 'Gown']
  },
  {
    id: 'g-3',
    title: 'Blouse Designs',
    count: '28,000+ Photos',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    tags: ['Deep Back', 'Sweetheart', 'Mirror Work']
  },
  {
    id: 'g-4',
    title: 'Wedding Sarees',
    count: '35,000+ Photos',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    tags: ['Kanjeevaram', 'Banarasi Silk', 'Chiffon']
  },
  {
    id: 'g-5',
    title: 'Mehndi Designs',
    count: '54,000+ Photos',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=600&q=80',
    tags: ['Marwari', 'Arabic Henna', 'Bridal Hands']
  }
];

export const INSPIRATION_PHOTOS = GALLERY_TO_LOOK_FOR;

export default function WmgInspirationGallery({
  wishlist = [],
  onToggleWishlist,
  showToast
}) {
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const handleWishlistClick = (photoId, e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(photoId);
      const isSaved = wishlist.includes(photoId);
      if (showToast) {
        showToast(isSaved ? 'Removed from your Wishlist' : 'Saved to your Wishlist! ❤️');
      }
    }
  };

  return (
    <section id="inspiration-gallery" className="py-14 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Wedding Photo Inspiration</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1715]">
              Gallery to Look For
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Browse over 250,000+ trending bridal wear, lehengas, and decor ideas.
            </p>
          </div>
        </div>

        {/* 5 Visual Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {GALLERY_TO_LOOK_FOR.map((tile) => {
            const isSaved = wishlist.includes(tile.id);
            return (
              <div
                key={tile.id}
                onClick={() => setPreviewPhoto(tile)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Bookmark Heart */}
                  <button
                    onClick={(e) => handleWishlistClick(tile.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#E72E77] transition shadow-sm z-10"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'text-[#E72E77] fill-[#E72E77]' : ''}`} />
                  </button>

                  {/* Title & Count */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-base font-bold leading-tight group-hover:text-[#FFE088] transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-[11px] text-gray-300 mt-0.5">
                      {tile.count}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Zoom */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={previewPhoto.image}
              alt={previewPhoto.title}
              className="w-full aspect-[4/3] object-cover"
            />

            <div className="p-5">
              <span className="text-xs font-bold text-[#E72E77] uppercase">
                WedMeGood Gallery
              </span>
              <h3 className="font-serif text-xl font-bold text-gray-800 mt-0.5">
                {previewPhoto.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Explore thousands of curated images and design inspiration.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {previewPhoto.tags.map((tg, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">
                    #{tg}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setPreviewPhoto(null)}
                  className="px-5 py-2 rounded-xl bg-[#E72E77] text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
