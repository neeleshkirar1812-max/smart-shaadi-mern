import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal,
  Phone,
  ArrowRight
} from 'lucide-react';

export const VENDOR_DIRECTORY_CATEGORIES = [
  'All Categories',
  'Photographers',
  'Bridal Makeup',
  'Planning & Decor',
  'Mehndi Artists',
  'Catering Services',
  'Bridal Wear',
  'Groom Wear',
  'Music & Dance',
  'Jewellery',
  'Pandits',
  'Invitations'
];

export const FULL_VENDORS_DATA = [
  {
    id: 'vd-1',
    name: 'Makeup By Jyoti Sing',
    category: 'Bridal Makeup',
    city: 'Bangalore',
    locality: 'South Bangalore',
    rating: 5.0,
    reviewsCount: 84,
    price: '₹ 15,000',
    unit: 'per function',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/4493919/1779456738_Look____deepaskayakalp_MUA___Educator___imkrititripathi_Muse___laxmi.jaiswal2002_Jewellery___da.jpg?crop=3,148,1074,604',
    verified: true,
    tag: 'Handpicked',
    description: 'Specializes in Airbrush HD Bridal makeup, dewy glass skin looks, and contemporary reception transformations using international luxury products.',
    services: ['Airbrush Makeup', 'Draping', 'Hairstyling', 'False Lashes', 'Family Makeup'],
    phone: '919829012345'
  },
  {
    id: 'vd-2',
    name: 'Stories by Joseph Radhik',
    category: 'Photographers',
    city: 'Mumbai',
    locality: 'Bandra West',
    rating: 4.98,
    reviewsCount: 340,
    price: '₹ 2,50,000',
    unit: 'per day',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/photographers.jpg',
    verified: true,
    tag: 'Celebrity Choice',
    description: 'Renowned celebrity wedding photographer capturing emotional, unscripted moments and grand cinematic wedding films across India and destination weddings globally.',
    services: ['Candid Photography', 'Cinematography', 'Drone Aerials', 'Pre-Wedding Shoot', 'Coffee Table Albums'],
    phone: '919829012349'
  },
  {
    id: 'vd-3',
    name: 'AWM: Makeovers by Aastha',
    category: 'Bridal Makeup',
    city: 'Lucknow',
    locality: 'Hazratganj',
    rating: 4.7,
    reviewsCount: 65,
    price: '₹ 18,000',
    unit: 'per function',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/2417928/1772779601_ChatGPT_Image_Mar_6__2026__12_15_25_PM.png?crop=8,169,1520,855',
    verified: true,
    tag: 'Top Rated',
    description: 'Certified bridal makeover artist with over 8 years experience in royal Awadhi bridal glam and waterproof reception looks.',
    services: ['Bridal Makeup', 'Engagement Looks', 'Party Makeup', 'Hair Extensions'],
    phone: '919829012348'
  },
  {
    id: 'vd-4',
    name: 'Altair Decor & Design',
    category: 'Planning & Decor',
    city: 'Jaipur',
    locality: 'C-Scheme',
    rating: 4.95,
    reviewsCount: 112,
    price: '₹ 3,50,000',
    unit: 'onwards decor package',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/7/planning-decor.jpg',
    verified: true,
    tag: 'Luxury Decor',
    description: 'Bespoke event architects designing magical floral mandaps, fairy-lit Mughal arches, and contemporary sangeet stage installations.',
    services: ['Theme Mandaps', 'Floral Scenography', 'Sound & Light Production', 'Signages & Photobooths'],
    phone: '919829012350'
  },
  {
    id: 'vd-5',
    name: 'Geetanjali Bridal Mehendi Art',
    category: 'Mehndi Artists',
    city: 'Delhi NCR',
    locality: 'South Extension',
    rating: 4.92,
    reviewsCount: 154,
    price: '₹ 11,000',
    unit: 'bridal package',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/6/mehendi-artists.jpg',
    verified: true,
    tag: 'Organic Henna',
    description: 'Master henna artist renowned for intricate portrait motifs, personalized love stories, and dark-staining 100% natural organic henna paste.',
    services: ['Portrait Mehndi', 'Arabic Designs', 'Bridal Feet Mehndi', 'Guest Henna Counters'],
    phone: '919829012351'
  },
  {
    id: 'vd-6',
    name: 'FoodCraft Luxury Banquets & Catering',
    category: 'Catering Services',
    city: 'Delhi NCR',
    locality: 'Vasant Kunj',
    rating: 4.88,
    reviewsCount: 190,
    price: '₹ 1,800',
    unit: 'per plate onwards',
    image: 'https://image.wedmegood.com/resized/300X/uploads/banner_image/5/caterers-new.jpg',
    verified: true,
    tag: 'Gourmet Chefs',
    description: 'Exquisite multi-cuisine wedding catering featuring authentic Satvik Marwari, Pure Jain Chauvihar, Lucknowi Dum Pukht, and live global street food stations.',
    services: ['Satvik Catering', 'Jain Pure Chauvihar', 'Halal Mughlai', 'Artisanal Desserts'],
    phone: '919829012356'
  },
  {
    id: 'vd-7',
    name: 'Reia Diamonds & Polki Atelier',
    category: 'Jewellery',
    city: 'Bangalore',
    locality: 'Indiranagar',
    rating: 4.9,
    reviewsCount: 78,
    price: 'Price on Request',
    unit: 'custom bridal set',
    image: 'https://image.wedmegood.com/resized/300X/uploads/im_cat_image/3/jewellery.jpg',
    verified: true,
    tag: 'Bespoke Heirlooms',
    description: 'Certified uncut diamond polki, heirloom emerald chokers, and hallmarked gold jewellery designed for discerning brides.',
    services: ['Polki Chokers', 'Mathapatti', 'Custom Solitaires', 'Bridal Sets on Rent'],
    phone: '919829012357'
  },
  {
    id: 'vd-8',
    name: 'Progressive Brothers Live & DJ Nights',
    category: 'Music & Dance',
    city: 'Delhi NCR',
    locality: 'Hauz Khas',
    rating: 4.96,
    reviewsCount: 220,
    price: '₹ 85,000',
    unit: 'per night sangeet',
    image: 'https://image.wedmegood.com/resized/300X/uploads/category_icons/10/music-dance.png',
    verified: true,
    tag: 'High Energy',
    description: 'Electrifying Bollywood and Punjabi EDM live DJ duo featuring crowd telemetry, bespoke sound systems, and laser sync.',
    services: ['Sangeet DJ', 'Live Dhol Troupe', 'Sound Limiter Setup', 'Laser Show'],
    phone: '919829012358'
  }
];

export default function WmgVendorsPage({
  selectedCity,
  setSelectedCity,
  onSelectVendor,
  showToast
}) {
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [activeCity, setActiveCity] = useState(selectedCity === 'All cities' ? 'All' : selectedCity);
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['All', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Jaipur', 'Lucknow', 'Goa'];

  const filtered = FULL_VENDORS_DATA.filter((vendor) => {
    // Category Filter
    if (selectedCat !== 'All Categories' && vendor.category !== selectedCat) {
      return false;
    }
    // City Filter
    if (activeCity !== 'All' && !vendor.city.toLowerCase().includes(activeCity.toLowerCase())) {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = vendor.name.toLowerCase().includes(q);
      const matchCat = vendor.category.toLowerCase().includes(q);
      const matchLoc = vendor.locality.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchLoc) return false;
    }
    return true;
  });

  const handleWhatsApp = (vendor, e) => {
    e.stopPropagation();
    const phone = vendor.phone || '919829012345';
    const text = encodeURIComponent(`Hi ${vendor.name}, I found your profile on WedMeGood and would like to inquire about your services and packages.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">Wedding Vendors</span>
          {selectedCat !== 'All Categories' && (
            <>
              <span>›</span>
              <span className="text-[#e72e77] font-bold">{selectedCat}</span>
            </>
          )}
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e72e77] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verified Wedding Specialists</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A1715]">
                Wedding Vendors in {activeCity === 'All' ? 'India' : activeCity}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Connect with top rated wedding photographers, bridal makeup artists, decorators, and planners with transparent quotes and reviews.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full md:w-80 flex items-center bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search vendor name, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs sm:text-sm outline-none w-full text-gray-800"
              />
            </div>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 border-t border-gray-100 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Filter City:
            </span>
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCity(c);
                  if (c !== 'All') setSelectedCity?.(c);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition shrink-0 ${
                  activeCity === c
                    ? 'bg-[#e72e77] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Strip */}
        <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2">
            {VENDOR_DIRECTORY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 border ${
                  selectedCat === cat
                    ? 'bg-[#e72e77] text-white border-[#e72e77] shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => onSelectVendor?.(vendor)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo Reel */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Rating Badge */}
                  <span className="absolute top-2.5 right-2.5 bg-black/75 text-white text-[12px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 backdrop-blur-xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating}</span>
                  </span>

                  {/* Tag Badge */}
                  {vendor.tag && (
                    <span className="absolute bottom-2.5 left-2.5 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                      {vendor.tag}
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <span className="text-[11px] font-bold text-[#e72e77] uppercase tracking-wider">
                    {vendor.category}
                  </span>
                  <h3 className="font-bold text-[15px] text-[#1A1715] group-hover:text-[#e72e77] transition truncate mt-0.5">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1 mb-3">
                    <MapPin className="w-3 h-3 text-gray-400 mr-1 shrink-0" />
                    <span className="truncate">{vendor.locality}, {vendor.city}</span>
                  </div>

                  <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-3">
                    {vendor.description}
                  </p>

                  <div className="font-bold text-sm text-[#1A1715]">
                    {vendor.price} <span className="text-[11px] font-normal text-gray-500">/{vendor.unit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 pt-0 grid grid-cols-5 gap-2 border-t border-gray-100 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVendor?.(vendor);
                  }}
                  className="col-span-4 bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs py-2.5 rounded-lg transition shadow-xs text-center"
                >
                  Send Message
                </button>
                <button
                  onClick={(e) => handleWhatsApp(vendor, e)}
                  title="WhatsApp Chat"
                  className="col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition shadow-xs text-sm"
                >
                  💬
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 mt-8">
            <h3 className="text-lg font-bold text-gray-800">No vendors found in this category</h3>
            <p className="text-sm text-gray-500 mt-1">Try selecting &apos;All Categories&apos; or changing your city filter.</p>
            <button
              onClick={() => {
                setSelectedCat('All Categories');
                setActiveCity('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#e72e77] text-white rounded-xl font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
