import React, { useState } from 'react';

export const GALLERY_TO_LOOK_FOR = [
  {
    id: 'gal-1',
    title: 'Bridal Lehenga',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    tags: ['Sabyasachi', 'Crimson Velvet', 'Zardozi Embroidery']
  },
  {
    id: 'gal-2',
    title: 'Outfits',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    tags: ['Pastel Shararas', 'Mirror Work', 'Cocktail Gowns']
  },
  {
    id: 'gal-3',
    title: 'Blouse Designs',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    tags: ['Sweetheart Neck', 'Deep V Back', 'Tassels & Dori']
  },
  {
    id: 'gal-4',
    title: 'Wedding Sarees',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    tags: ['Kanjeevaram Silk', 'Pure Gold Zari', 'Temple Borders']
  },
  {
    id: 'gal-5',
    title: 'Mehndi Designs',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=600&q=80',
    tags: ['Lotus Motifs', 'Portrait Henna', 'Intricate Mandalas']
  }
];

export const INSPIRATION_PHOTOS = GALLERY_TO_LOOK_FOR;

export default function WmgInspirationGallery({ onToggleWishlist, wishlist = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-12 bg-[#faf8f6] border-t border-b border-[#f0f0f0] font-sans" id="photos">
      <div className="wmg-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Gallery to Look for</h2>
            <p className="text-[14px] text-[#777] mt-1">Discover trending bridal lehengas, jewelry styles, and decor motifs</p>
          </div>
          <button 
            onClick={() => setSelectedItem(GALLERY_TO_LOOK_FOR[0])}
            className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
          >
            <span>View all Photos</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {GALLERY_TO_LOOK_FOR.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="relative h-64 rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <img 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold text-[16px]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in">
            <div className="relative h-80">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[13px] text-[#777] mb-4">Trending inspirations &amp; real wedding looks curated by WedMeGood editorial team.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedItem.tags?.map((t, idx) => (
                  <span key={idx} className="bg-[#f0f0f0] text-[#555] text-xs font-semibold px-3 py-1 rounded-full">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    onToggleWishlist?.(selectedItem.id);
                  }}
                  className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
                    wishlist.includes(selectedItem.id)
                      ? 'bg-rose-100 text-[#e72e77]'
                      : 'bg-[#f5f5f5] text-[#444] hover:bg-[#ffeef4]'
                  }`}
                >
                  {wishlist.includes(selectedItem.id) ? '♥ Saved to Board' : '♡ Save to Board'}
                </button>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[13px] px-6 py-2 rounded-lg transition"
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
