import React from 'react';

export const VERBATIM_FEATURED_VENDORS = [
  {
    id: 'wmg-v1',
    name: 'Makeup By Jyoti Sing',
    category: 'Bridal Makeup Artists, South Bangalore',
    rating: '5.0',
    tag: 'Handpicked',
    price: '₹ 15,000',
    unit: 'per function',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'wmg-v2',
    name: 'Regenta Central Grand Exotica',
    category: 'Wedding Venues, Pimpri Chinchwad',
    rating: '4.6',
    price: '₹ 999',
    unit: 'onwards per plate',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'wmg-v3',
    name: 'Caelum Atharva Palace',
    category: 'Wedding Venues, Ajmer Road',
    rating: '4.5',
    price: '₹ 1,500',
    unit: 'onwards per plate',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'wmg-v4',
    name: 'AWM: Makeovers by Aastha',
    category: 'Bridal Makeup Artists, Hazratganj',
    rating: '4.7',
    price: '₹ 18,000',
    unit: 'per function',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80'
  }
];

export default function WmgFeaturedVendors({
  onSelectVendor,
  onBookVendor,
  onToggleWishlist,
  wishlist = []
}) {
  return (
    <section className="py-12 bg-[#faf8f6] border-t border-b border-[#f0f0f0] font-sans" id="featured-venues">
      <div className="wmg-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Featured Vendors</h2>
            <p className="text-[14px] text-[#777] mt-1">Handpicked and rated by thousands of verified couples</p>
          </div>
          <button 
            onClick={() => onSelectVendor?.(VERBATIM_FEATURED_VENDORS[0])}
            className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
          >
            <span>View all Vendors</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERBATIM_FEATURED_VENDORS.map((vendor) => (
            <div 
              key={vendor.id}
              onClick={() => onSelectVendor?.(vendor)}
              className="bg-white rounded-xl overflow-hidden shadow-wmg border border-[#e8e8e8] flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    alt={vendor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    src={vendor.image}
                  />
                  <span className="absolute top-2.5 right-2.5 bg-black/75 text-white text-[12px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span>{vendor.rating}</span>
                  </span>
                  {vendor.tag && (
                    <span className="absolute bottom-2.5 left-2.5 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {vendor.tag}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[16px] text-[#2c2c2c] group-hover:text-[#e72e77] transition truncate">
                    {vendor.name}
                  </h3>
                  <p className="text-[12px] text-[#777]">{vendor.category}</p>
                  <div className="mt-3 font-bold text-[15px] text-[#2c2c2c]">
                    {vendor.price} <span className="text-[11px] font-normal text-[#888]">{vendor.unit}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookVendor ? onBookVendor(vendor) : onSelectVendor?.(vendor);
                  }}
                  className="w-full bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[13px] py-2.5 rounded-lg transition"
                >
                  Send Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
