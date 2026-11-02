import React, { useState } from 'react';
import { Sparkles, Heart, Eye, Bookmark, Tag, X, Check } from 'lucide-react';

export const INSPIRATION_PHOTOS = [
  {
    id: 'p1',
    category: 'Lehengas',
    title: 'Crimson Velvet Zardozi Bridal Lehenga',
    designer: 'Sabyasachi Heritage Collection',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    tags: ['Bridal Lehenga', 'Velvet', 'Zardozi', 'Royal Red']
  },
  {
    id: 'p2',
    category: 'Decor',
    title: 'Floating Lotus Lake Pichola Mandap',
    designer: 'Devika Narain Mandap Atelier',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tags: ['Mandap', 'Floating Flowers', 'Udaipur', 'Evening Lights']
  },
  {
    id: 'p3',
    category: 'Mehndi',
    title: 'Radha Krishna Bridal Portrait Mehndi',
    designer: 'Veena Nagda Studio',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=800&q=80',
    tags: ['Mehndi', 'Portraits', 'Intricate', 'Bridal Hands']
  },
  {
    id: 'p4',
    category: 'Portraits',
    title: 'Royal Sunset Palace Fort Silhouette',
    designer: 'Stories by Joseph Radhik',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    tags: ['Portraits', 'Sunset', 'Heritage Fort', 'Royal Vows']
  },
  {
    id: 'p5',
    category: 'Decor',
    title: 'Fairytale Pastel Rose Tunnel Entrance',
    designer: 'Altair Decor Design',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    tags: ['Tunnel Entry', 'Pastel Roses', 'Chandelier', 'Luxury Decor']
  },
  {
    id: 'p6',
    category: 'Lehengas',
    title: 'Pastel Blush Pink Georgette Sangeet Lehenga',
    designer: 'Manish Malhotra Glamour',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    tags: ['Pastel Pink', 'Sequin Glam', 'Sangeet Look']
  },
  {
    id: 'p7',
    category: 'Portraits',
    title: 'Golden Hour Pre-Wedding Boat Sail',
    designer: 'The Wedding Story Films',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    tags: ['Pre-Wedding', 'Lake Boat', 'Candid Love']
  },
  {
    id: 'p8',
    category: 'Decor',
    title: 'Royal Amber Courtyard Candlelight Banquet',
    designer: 'The Event Mill Jaipur',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tags: ['Courtyard', '1000 Candles', 'Royal Gala']
  }
];

export default function WmgInspirationGallery({
  wishlist = [],
  onToggleWishlist,
  showToast
}) {
  const [activeTag, setActiveTag] = useState('All');
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const tags = ['All', 'Lehengas', 'Decor', 'Mehndi', 'Portraits'];

  const filteredPhotos = activeTag === 'All'
    ? INSPIRATION_PHOTOS
    : INSPIRATION_PHOTOS.filter(p => p.category === activeTag);

  const handleWishlistClick = (photoId, e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(photoId);
      const isSaved = wishlist.includes(photoId);
      if (showToast) {
        showToast(isSaved ? 'Removed from your Dream Wishlist' : 'Saved to your Dream Wishlist! ❤️');
      }
    }
  };

  return (
    <section id="inspiration-gallery" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Tags */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pinterest-Style Visual Feed</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
              Curated Wedding Inspiration Gallery
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Browse over 250,000+ photos of trending bridal wear, royal mandap designs, and candid moments. Save ideas to your moodboard.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTag === t
                    ? 'bg-[#1A1715] text-white shadow-md'
                    : 'bg-[#FAF8F5] text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {t === 'All' ? 'All Inspiration' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest-Style Masonry Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => {
            const isSaved = wishlist.includes(photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => setPreviewPhoto(photo)}
                className="group relative rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

                  {/* Top Wishlist Heart Trigger */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => handleWishlistClick(photo.id, e)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                        isSaved
                          ? 'bg-[#E72E77] text-white scale-110'
                          : 'bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#E72E77] hover:scale-110'
                      }`}
                      title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Category Pill on Photo */}
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-[#1A1715] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {photo.category}
                  </div>

                  {/* Bottom Hover Card Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-[10px] text-[#FFE088] font-bold uppercase tracking-wider">
                      {photo.designer}
                    </p>
                    <h4 className="font-serif text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                      {photo.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {photo.tags.slice(0, 2).map((tg, i) => (
                        <span key={i} className="text-[9px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
            
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Photo View */}
            <div className="md:w-3/5 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={previewPhoto.image}
                alt={previewPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Meta View */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#E72E77]">
                  {previewPhoto.category} Inspiration
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A1715] mt-1 leading-tight">
                  {previewPhoto.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Curated design credit: <span className="font-semibold text-gray-800">{previewPhoto.designer}</span>
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-700 block mb-2">Tagged Themes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {previewPhoto.tags.map((tg, i) => (
                      <span key={i} className="text-[11px] bg-[#FAF8F5] text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    handleWishlistClick(previewPhoto.id, e);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    wishlist.includes(previewPhoto.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#E72E77] hover:bg-[#B60056] text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(previewPhoto.id) ? 'fill-white' : ''}`} />
                  <span>{wishlist.includes(previewPhoto.id) ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
