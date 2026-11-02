import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Send, 
  Heart, 
  Crown, 
  MessageCircle, 
  ArrowRight,
  Check
} from 'lucide-react';

export default function WmgFeaturedVendors({
  vendors = [],
  onSelectVendor,
  onBookVendor,
  onToggleWishlist,
  wishlist = []
}) {
  // Show top verified vendors
  const featured = vendors.slice(0, 6);

  const handleWhatsApp = (vendor, e) => {
    e.stopPropagation();
    const phone = vendor.phone || '919829012345';
    const message = encodeURIComponent(
      `Hello ${vendor.name}! I discovered your luxury wedding profile on WedMeGood / SmartShaadi. I would love to check your availability, banquet packages, and arrange a site visit.`
    );
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="featured-venues" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>WMG Handpicked & Wedsta Verified</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
              Featured Luxury Venues & Partners
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              100% physically vetted spaces with verified pricing transparency, banquet capacity, and zero-cancellation price shield.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              Showing {featured.length} Premium Picks
            </span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((vendor) => {
            const isWishlisted = wishlist.includes(vendor.id || vendor._id);
            const vegPrice = vendor.pricing?.vegPlate || vendor.pricePerPlateVeg || 2800;
            const nonVegPrice = vendor.pricing?.nonVegPlate || vendor.pricePerPlateNonVeg || 3200;
            const rating = vendor.rating || 4.9;
            const reviewCount = vendor.reviewsCount || 128;
            const image = vendor.imageUrl || vendor.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={vendor.id || vendor._id}
                onClick={() => onSelectVendor(vendor)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                {/* Photo & Overlay Badges */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image}
                    alt={vendor.name}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* WMG Wedsta Verified Badge */}
                  <div className="absolute top-3 left-3 bg-[#1B4332] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFE088]" />
                    <span>Wedsta Verified</span>
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleWishlist) onToggleWishlist(vendor.id || vendor._id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#E72E77] hover:scale-110 transition shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'text-[#E72E77] fill-[#E72E77]' : ''}`} />
                  </button>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-[#1B4332] text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                      <Star className="w-3 h-3 fill-white" />
                      <span>{rating}</span>
                    </div>
                    <span className="text-[11px] text-white/90 font-medium">
                      ({reviewCount} reviews)
                    </span>
                  </div>

                  {/* City */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] text-white/90 font-medium">
                    <MapPin className="w-3 h-3 text-[#E72E77]" />
                    <span>{vendor.city || 'Udaipur'}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#1A1715] group-hover:text-[#E72E77] transition-colors leading-tight">
                        {vendor.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {vendor.description || 'Iconic royal heritage palace with lakeside floating mandaps and royal courtyards.'}
                    </p>

                    {/* Per-Plate Pricing Transparency Strip */}
                    <div className="mt-4 p-3 rounded-2xl bg-white border border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Veg Plate</span>
                        <span className="font-bold text-[#1A1715] text-sm">₹{vegPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400"> + taxes</span>
                      </div>
                      <div className="h-6 w-px bg-gray-200" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Non-Veg Plate</span>
                        <span className="font-bold text-[#1A1715] text-sm">₹{nonVegPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400"> + taxes</span>
                      </div>
                      <div className="h-6 w-px bg-gray-200" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Guests</span>
                        <span className="font-bold text-[#1A1715] text-sm">{vendor.capacity || '100 - 800'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons: Send Inquiry & WhatsApp */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookVendor(vendor);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry</span>
                    </button>

                    <button
                      onClick={(e) => handleWhatsApp(vendor, e)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-emerald-200"
                      title="Chat directly on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline">WhatsApp</span>
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
