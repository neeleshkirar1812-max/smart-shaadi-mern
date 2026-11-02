import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Sparkles, 
  Filter, 
  X, 
  Search, 
  Check, 
  Bookmark, 
  Camera, 
  ArrowRight 
} from 'lucide-react';

export const PHOTO_CATEGORIES = [
  { id: 'all', label: 'All Photos', count: '12,500+' },
  { id: 'lehenga', label: 'Bridal Lehengas', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/36/bridal-lehenga.jpg', count: '3,400+' },
  { id: 'outfits', label: 'Outfits & Sarees', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/4/outfits.jpg', count: '2,100+' },
  { id: 'blouse', label: 'Blouse Designs', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/37/blouse-designs.jpg', count: '1,850+' },
  { id: 'sarees', label: 'Wedding Sarees', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/38/sarees.jpg', count: '1,200+' },
  { id: 'mehndi', label: 'Mehndi Designs', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/33/mehndi.jpg', count: '2,800+' },
  { id: 'decor', label: 'Wedding Decor', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/14/decor.jpg', count: '3,900+' },
  { id: 'jewellery', label: 'Bridal Jewellery', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/3/jewellery.jpg', count: '1,650+' },
  { id: 'groom', label: 'Groom Wear', img: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/25/groom-wear.jpg', count: '1,100+' },
  { id: 'hairstyles', label: 'Hairstyles', img: 'https://image.wedmegood.com/resized/500X/uploads/im_cat_image/40/hairstyles.jpg', count: '950+' },
  { id: 'prewedding', label: 'Pre Wedding Shoot', img: 'https://image.wedmegood.com/resized/500X/uploads/im_cat_image/41/pre-wedding.jpg', count: '1,400+' }
];

export const COLOR_PALETTES = [
  { id: 'all', label: 'All Colors', hex: 'transparent' },
  { id: 'red', label: 'Red / Crimson', hex: '#b91c1c' },
  { id: 'pink', label: 'Pastel Pink', hex: '#f472b6' },
  { id: 'gold', label: 'Royal Gold', hex: '#d4af37' },
  { id: 'green', label: 'Emerald Green', hex: '#047857' },
  { id: 'ivory', label: 'Ivory / White', hex: '#f3f4f6' },
  { id: 'blue', label: 'Navy / Royal Blue', hex: '#1d4ed8' }
];

export const PHOTOS_GALLERY_FEED = [
  {
    id: 'p-1',
    category: 'Bridal Lehengas',
    catId: 'lehenga',
    title: 'Crimson Velvet Sabyasachi Heritage Lehenga with Zardozi',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/36/bridal-lehenga.jpg',
    vendor: 'Outfit: Sabyasachi Heritage Couture',
    photographer: 'Photo by Stories by Joseph Radhik',
    color: 'red',
    tags: ['Crimson Velvet', 'Double Dupatta', 'Heritage Zardozi', 'Royal Vivah']
  },
  {
    id: 'p-2',
    category: 'Wedding Decor',
    catId: 'decor',
    title: 'Fairy-lit Glass Mandap with Lotus Reflection Pool',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/14/decor.jpg',
    vendor: 'Decor: Altair Decor & Design',
    photographer: 'Photo by The Wedding Story',
    color: 'pink',
    tags: ['Glass Mandap', 'Lotus Motifs', 'Fairy Lights', 'Pastel Florals']
  },
  {
    id: 'p-3',
    category: 'Blouse Designs',
    catId: 'blouse',
    title: 'Plunging Sweetheart Blouse with Heirloom Latkan Dori',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/37/blouse-designs.jpg',
    vendor: 'Styled by Namrata Soni',
    photographer: 'Photo by Colorblind Production',
    color: 'gold',
    tags: ['Sweetheart Neck', 'Deep V Back', 'Latkan Tassels', 'Gold Threadwork']
  },
  {
    id: 'p-4',
    category: 'Wedding Sarees',
    catId: 'sarees',
    title: 'Pure Kanjeevaram Silk Saree with Real Gold Temple Borders',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/38/sarees.jpg',
    vendor: 'Outfit: Angadi Silks Bangalore',
    photographer: 'Photo by Stories by Joseph Radhik',
    color: 'red',
    tags: ['Kanjeevaram', 'Pure Silk', 'Temple Border', 'South Indian Bride']
  },
  {
    id: 'p-5',
    category: 'Mehndi Designs',
    catId: 'mehndi',
    title: 'Intricate Lotus Mandala & Couple Portrait Henna Design',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/33/mehndi.jpg',
    vendor: 'Mehndi by Geetanjali Bridal Mehndi',
    photographer: 'Photo by The Wedding Story',
    color: 'green',
    tags: ['Lotus Mandala', 'Portrait Mehndi', 'Bridal Arms', 'Dark Staining Henna']
  },
  {
    id: 'p-6',
    category: 'Bridal Jewellery',
    catId: 'jewellery',
    title: 'Uncut Polki Choker with Colombian Emerald Drops & Mathapatti',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/3/jewellery.jpg',
    vendor: 'Jewellery: Reia Diamonds & Polki',
    photographer: 'Photo by Deepa Kayakalp MUA',
    color: 'green',
    tags: ['Polki Choker', 'Emerald Beads', 'Mathapatti', 'Nath']
  },
  {
    id: 'p-7',
    category: 'Outfits & Sarees',
    catId: 'outfits',
    title: 'Pastel Mint Sharara with Mirror Work for Sangeet Night',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/4/outfits.jpg',
    vendor: 'Outfit: Abhinav Mishra Couture',
    photographer: 'Photo by Colorblind Production',
    color: 'green',
    tags: ['Mirror Work', 'Pastel Sharara', 'Sangeet Look', 'Cocktail Glam']
  },
  {
    id: 'p-8',
    category: 'Groom Wear',
    catId: 'groom',
    title: 'Royal Ivory Raw Silk Sherwani with Embroidered Kalgi & Safa',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/25/groom-wear.jpg',
    vendor: 'Outfit: Tarun Tahiliani Men',
    photographer: 'Photo by Stories by Joseph Radhik',
    color: 'ivory',
    tags: ['Raw Silk Sherwani', 'Zari Stole', 'Chanderi Safa', 'Royal Groom']
  },
  {
    id: 'p-9',
    category: 'Pre Wedding Shoot',
    catId: 'prewedding',
    title: 'Sunset Boat Portraits on Lake Pichola Facing City Palace',
    image: 'https://image.wedmegood.com/resized/500X/uploads/city_bg_image/1/north.jpg',
    vendor: 'Venue: The Leela Palace Udaipur',
    photographer: 'Photo by The Wedding Story',
    color: 'blue',
    tags: ['Sunset Vows', 'Boat Arrival', 'Lake Pichola', 'Pre-Wedding']
  }
];

export default function WmgPhotosPage({
  wishlist = [],
  onToggleWishlist,
  showToast
}) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const filteredPhotos = PHOTOS_GALLERY_FEED.filter((p) => {
    if (selectedCat !== 'all' && p.catId !== selectedCat) return false;
    if (selectedColor !== 'all' && p.color !== selectedColor) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchTag = p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">Wedding Photos &amp; Inspiration</span>
          {selectedCat !== 'all' && (
            <>
              <span>›</span>
              <span className="text-[#e72e77] font-bold">
                {PHOTO_CATEGORIES.find(c => c.id === selectedCat)?.label}
              </span>
            </>
          )}
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e72e77] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Editorial Photo Gallery</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A1715]">
                Wedding Inspiration Gallery
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Browse over 10,000+ handpicked real bride photos, mandap decor themes, lehenga blouse designs, and jewellery sets.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 flex items-center bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search lehenga, decor, mehndi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs sm:text-sm outline-none w-full text-gray-800"
              />
            </div>
          </div>

          {/* Color Palettes Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 border-t border-gray-100 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Filter By Color:
            </span>
            {COLOR_PALETTES.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedColor(col.id)}
                className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition shrink-0 border ${
                  selectedColor === col.id
                    ? 'bg-white border-[#e72e77] text-[#e72e77] shadow-xs ring-1 ring-[#e72e77]'
                    : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                }`}
              >
                {col.hex !== 'transparent' && (
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20"
                    style={{ backgroundColor: col.hex }}
                  />
                )}
                <span>{col.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Strip with Real Thumbnail Icons */}
        <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-3">
            {PHOTO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition shrink-0 ${
                  selectedCat === cat.id
                    ? 'bg-white border-[#e72e77] text-[#e72e77] shadow-sm ring-1 ring-[#e72e77]'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {cat.img && (
                  <img src={cat.img} alt="" className="w-6 h-6 rounded-md object-cover" />
                )}
                <span>{cat.label}</span>
                <span className="text-[11px] text-gray-400 font-normal">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => {
            const isSaved = wishlist.includes(photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoModal(photo)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Wishlist & Share buttons */}
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist?.(photo.id);
                        if (showToast) {
                          showToast(isSaved ? 'Removed from saved ideas' : 'Saved to your Wedding Board! ❤️');
                        }
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-md ${
                        isSaved ? 'bg-[#e72e77] text-white' : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                    {photo.category}
                  </span>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-sm leading-snug drop-shadow line-clamp-2 mb-1 group-hover:text-[#FFE088] transition-colors">
                      {photo.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1 border-t border-white/20">
                      <span className="truncate">{photo.vendor}</span>
                      <span className="text-[#FFE088] font-semibold shrink-0 ml-2">Inspect →</span>
                    </div>
                  </div>
                </div>

                {/* Tags Footer */}
                <div className="p-3 bg-[#FAF8F5] flex flex-wrap gap-1 text-[10px] text-gray-600">
                  {photo.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded border border-gray-200">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* High-Res Lightbox Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-96 bg-gray-100">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-xs font-semibold">
                {activePhotoModal.category}
              </span>
            </div>

            <div className="p-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715] mb-2">
                {activePhotoModal.title}
              </h2>
              
              <div className="space-y-1 text-xs text-gray-600 mb-4 bg-[#FAF8F5] p-3 rounded-xl border border-gray-100">
                <p><strong>Vendor Credit:</strong> {activePhotoModal.vendor}</p>
                <p><strong>Photography:</strong> {activePhotoModal.photographer}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {activePhotoModal.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-pink-50 text-[#e72e77] px-2.5 py-1 rounded-full font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onToggleWishlist?.(activePhotoModal.id);
                    if (showToast) showToast('Saved to your Inspiration Board! ❤️');
                  }}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Bookmark className="w-4 h-4 text-[#e72e77]" />
                  <span>Save to Board</span>
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Check out this wedding inspiration on WedMeGood: ${activePhotoModal.title}`);
                    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                  }}
                  className="w-full py-3 rounded-xl bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
