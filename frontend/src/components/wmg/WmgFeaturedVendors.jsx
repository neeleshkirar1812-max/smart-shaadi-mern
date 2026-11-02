import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Send 
} from 'lucide-react';

export const VERBATIM_FEATURED_VENDORS = [
  {
    id: 'wmg-v1',
    name: 'Makeup By Jyoti Sing',
    category: 'Bridal Makeup',
    city: 'Delhi NCR',
    rating: 5.0,
    reviewsCount: 94,
    pricingDisplay: '₹ 15,000 onwards',
    type: 'Per Function',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80',
    description: 'Renowned celebrity airbrush & HD bridal makeup artist specializing in flawless dewy bridal looks and luxury draping.'
  },
  {
    id: 'wmg-v2',
    name: 'Regenta Central Grand Exotica Pune',
    category: '4-Star Luxury Hotel',
    city: 'Pune',
    rating: 4.6,
    reviewsCount: 168,
    pricingDisplay: '₹ 999 onwards / plate',
    type: 'Per Plate Veg',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    description: 'Prime luxury property with pillar-less banquet halls, landscaped poolside lawns, and multi-cuisine hospitality.'
  },
  {
    id: 'wmg-v3',
    name: 'Caelum Atharva Palace',
    category: 'Heritage Banquet & Lawn',
    city: 'Jaipur',
    rating: 4.5,
    reviewsCount: 82,
    pricingDisplay: '₹ 1,500 onwards / plate',
    type: 'Per Plate Veg',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    description: 'Grand royal architecture with royal jharokhas, majestic banquet capacity for 800+ guests, and verified catering.'
  },
  {
    id: 'wmg-v4',
    name: 'AWM: Makeovers by Aastha',
    category: 'Bridal Makeup',
    city: 'Mumbai',
    rating: 4.7,
    reviewsCount: 112,
    pricingDisplay: '₹ 18,000 onwards',
    type: 'Per Function',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    description: 'Top-tier bridal studio offering HD airbrush, cocktail party glam, customized hair styling, and family packages.'
  }
];

export default function WmgFeaturedVendors({
  vendors = [],
  onSelectVendor,
  onBookVendor,
  onToggleWishlist,
  wishlist = []
}) {
  const handleWhatsApp = (vendor, e) => {
    e.stopPropagation();
    const phone = '919829012345';
    const message = encodeURIComponent(
      `Hello ${vendor.name}! I found your profile on WedMeGood. I would like to check availability and book a consultation.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section id="featured-venues" className="py-14 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>WMG Verified Partners</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1715]">
              Featured Wedding Vendors
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Top rated wedding professionals handpicked with transparent pricing and real customer reviews.
            </p>
          </div>
        </div>

        {/* 4 Verbatim Featured Vendor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERBATIM_FEATURED_VENDORS.map((vendor) => {
            const isWishlisted = wishlist.includes(vendor.id);
            return (
              <div
                key={vendor.id}
                onClick={() => onSelectVendor(vendor)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* WMG Verified Badge */}
                    <div className="absolute top-3 left-3 bg-[#1B4332] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#FFE088]" />
                      <span>Verified</span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(vendor.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#E72E77] transition"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'text-[#E72E77] fill-[#E72E77]' : ''}`} />
                    </button>

                    {/* Rating Tag */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <div className="flex items-center gap-1 bg-[#1B4332] text-white px-2 py-0.5 rounded-md text-xs font-bold">
                        <Star className="w-3 h-3 fill-white" />
                        <span>{vendor.rating}</span>
                      </div>
                      <span className="text-[11px] text-white/90 font-medium">
                        ({vendor.reviewsCount} reviews)
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-[11px] text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E72E77]" />
                      <span>{vendor.city}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif text-base font-bold text-[#1A1715] group-hover:text-[#E72E77] transition-colors leading-tight line-clamp-1">
                      {vendor.name}
                    </h3>
                    <p className="text-[11px] text-[#8C827A] font-semibold mt-0.5">
                      {vendor.category}
                    </p>

                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Price</span>
                        <span className="font-bold text-[#1A1715]">{vendor.pricingDisplay}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookVendor(vendor);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Inquiry</span>
                    </button>

                    <button
                      onClick={(e) => handleWhatsApp(vendor, e)}
                      className="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition border border-emerald-200"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
