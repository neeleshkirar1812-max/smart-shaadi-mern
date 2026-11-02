import React, { useState } from 'react';

export const VERBATIM_FEATURED_VENDORS = [
  {
    id: 'wmg-v1',
    name: 'Makeup By Jyoti Sing',
    category: 'Bridal Makeup',
    categoryDisplay: 'Bridal Makeup Artists, South Bangalore',
    rating: '5.0',
    tag: 'Handpicked',
    price: '₹ 15,000',
    unit: 'per function',
    city: 'Bangalore',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/4493919/1779456738_Look____deepaskayakalp_MUA___Educator___imkrititripathi_Muse___laxmi.jaiswal2002_Jewellery___da.jpg?crop=3,148,1074,604',
    phone: '919829012345'
  },
  {
    id: 'wmg-v2',
    name: 'Regenta Central Grand Exotica',
    category: 'Venue',
    categoryDisplay: 'Wedding Venues, Pimpri Chinchwad',
    rating: '4.6',
    price: '₹ 999',
    unit: 'onwards per plate',
    city: 'Pune',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/1765153/1690199512_TKM___Edited_Jpgs__129_of_133___1_.jpg?crop=18,177,1979,1113',
    phone: '919829012346'
  },
  {
    id: 'wmg-v3',
    name: 'Caelum Atharva Palace',
    category: 'Venue',
    categoryDisplay: 'Wedding Venues, Ajmer Road',
    rating: '4.5',
    price: '₹ 1,500',
    unit: 'onwards per plate',
    city: 'Jaipur',
    image: 'https://image.wedmegood.com/resized/450X/uploads/project/326554/1780301433_DSC09361_e.jpg?crop=212,226,1624,914',
    phone: '919829012347'
  },
  {
    id: 'wmg-v4',
    name: 'AWM: Makeovers by Aastha',
    category: 'Bridal Makeup',
    categoryDisplay: 'Bridal Makeup Artists, Hazratganj',
    rating: '4.7',
    price: '₹ 18,000',
    unit: 'per function',
    city: 'Lucknow',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/2417928/1772779601_ChatGPT_Image_Mar_6__2026__12_15_25_PM.png?crop=8,169,1520,855',
    phone: '919829012348'
  },
  {
    id: 'wmg-v5',
    name: 'Deepa\'s Kayakalp Salon & Academy',
    category: 'Bridal Makeup',
    categoryDisplay: 'Bridal Makeup, Kidwai Nagar',
    rating: '5.0',
    tag: 'Top Rated',
    price: '₹ 10,000',
    unit: 'per function',
    city: 'Kanpur',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/4493919/1779456738_Look____deepaskayakalp_MUA___Educator___imkrititripathi_Muse___laxmi.jaiswal2002_Jewellery___da.jpg?crop=3,148,1074,604',
    phone: '919829012352'
  },
  {
    id: 'wmg-v6',
    name: 'The King\'s Meadows',
    category: 'Venue',
    categoryDisplay: 'Wedding Venues, Vidyaranyapura',
    rating: '4.9',
    tag: 'Verified',
    price: '₹ 2,200',
    unit: 'onwards per plate',
    city: 'Bangalore',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/1765153/1690199512_TKM___Edited_Jpgs__129_of_133___1_.jpg?crop=18,177,1979,1113',
    phone: '919829012353'
  },
  {
    id: 'wmg-v7',
    name: 'The Leela Bhartiya City Bengaluru',
    category: 'Venue',
    categoryDisplay: '5-Star Luxury Banquet & Lawn',
    rating: '5.0',
    tag: '5-Star Luxury',
    price: '₹ 3,000',
    unit: 'onwards per plate',
    city: 'Bangalore',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/2417928/1772779601_ChatGPT_Image_Mar_6__2026__12_15_25_PM.png?crop=8,169,1520,855',
    phone: '919829012354'
  },
  {
    id: 'wmg-v8',
    name: 'Reia Diamonds',
    category: 'Jewellery',
    categoryDisplay: 'Bridal Diamond Jewellery, South Bangalore',
    rating: '4.8',
    price: 'Price on Request',
    unit: '',
    city: 'Bangalore',
    image: 'https://image.wedmegood.com/resized/450X/uploads/project/326554/1780301433_DSC09361_e.jpg?crop=212,226,1624,914',
    phone: '919829012355'
  }
];

export default function WmgFeaturedVendors({
  onSelectVendor,
  onBookVendor,
  onToggleWishlist,
  wishlist = [],
  showToast
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [showAllVendors, setShowAllVendors] = useState(false);

  const displayList = VERBATIM_FEATURED_VENDORS.filter((v) => {
    if (activeCategoryFilter === 'All') return true;
    if (activeCategoryFilter === 'Venues') return v.category === 'Venue';
    if (activeCategoryFilter === 'Makeup') return v.category === 'Bridal Makeup';
    if (activeCategoryFilter === 'Jewellery') return v.category === 'Jewellery';
    return true;
  });

  const visibleVendors = showAllVendors ? displayList : displayList.slice(0, 4);

  const handleWhatsApp = (vendor, e) => {
    e.stopPropagation();
    const phone = vendor.phone || '919829012345';
    const text = encodeURIComponent(
      `Hello ${vendor.name}! I found your profile on WedMeGood. I would like to check availability and request a quote.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 bg-[#faf8f6] border-t border-b border-[#f0f0f0] font-sans" id="featured-venues">
      <div className="wmg-container">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Featured Vendors</h2>
            <p className="text-[14px] text-[#777] mt-1">Handpicked and rated by thousands of verified couples</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Filter Chips */}
            <div className="flex items-center bg-white rounded-full p-1 border border-gray-200 text-xs font-semibold">
              {['All', 'Venues', 'Makeup', 'Jewellery'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full transition ${
                    activeCategoryFilter === cat
                      ? 'bg-[#e72e77] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowAllVendors(!showAllVendors)}
              className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
            >
              <span>{showAllVendors ? 'Show Less' : 'View all Vendors'}</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleVendors.map((vendor) => {
            const isWishlisted = wishlist.includes(vendor.id);
            return (
              <div 
                key={vendor.id}
                onClick={() => onSelectVendor?.(vendor)}
                className="bg-white rounded-xl overflow-hidden shadow-wmg border border-[#e8e8e8] flex flex-col justify-between group cursor-pointer hover:border-[#e72e77]/40 transition duration-300"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      alt={vendor.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      src={vendor.image}
                    />
                    
                    {/* Star Rating Badge */}
                    <span className="absolute top-2.5 right-2.5 bg-black/75 text-white text-[12px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 backdrop-blur-xs">
                      <span className="text-yellow-400">★</span>
                      <span>{vendor.rating}</span>
                    </span>

                    {/* Handpicked / Tag Badge */}
                    {vendor.tag && (
                      <span className="absolute bottom-2.5 left-2.5 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                        {vendor.tag}
                      </span>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist?.(vendor.id);
                        if (showToast) {
                          showToast(isWishlisted ? `Removed ${vendor.name} from saved` : `Saved ${vendor.name} to Board! ❤️`);
                        }
                      }}
                      className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-xs"
                    >
                      <span className={`text-xs ${isWishlisted ? 'text-[#e72e77]' : 'text-white'}`}>
                        {isWishlisted ? '♥' : '♡'}
                      </span>
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-[16px] text-[#2c2c2c] group-hover:text-[#e72e77] transition truncate">
                      {vendor.name}
                    </h3>
                    <p className="text-[12px] text-[#777] truncate">{vendor.categoryDisplay}</p>
                    <div className="mt-3 font-bold text-[15px] text-[#2c2c2c]">
                      {vendor.price} <span className="text-[11px] font-normal text-[#888]">{vendor.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 grid grid-cols-5 gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookVendor ? onBookVendor(vendor) : onSelectVendor?.(vendor);
                    }}
                    className="col-span-4 bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[13px] py-2.5 rounded-lg transition shadow-xs text-center"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={(e) => handleWhatsApp(vendor, e)}
                    title="Chat on WhatsApp"
                    className="col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition shadow-xs"
                  >
                    <span className="text-base">💬</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
