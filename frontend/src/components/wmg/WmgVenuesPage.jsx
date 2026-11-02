import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Search, 
  Filter, 
  CheckCircle2, 
  Maximize2, 
  Utensils, 
  Phone, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

export const VENUE_CATEGORIES = [
  { id: 'all', label: 'All Venues' },
  { id: '4star', label: '4 Star & Above Hotels', img: 'https://image.wedmegood.com/resized/300X/uploads/option_image/62/4-star-above-hotels.png' },
  { id: 'banquet', label: 'Banquet Halls', img: 'https://image.wedmegood.com/resized/300X/uploads/option_image/63/banquet-halls.png' },
  { id: 'lawns', label: 'Marriage Garden / Lawns', img: 'https://image.wedmegood.com/resized/300X/uploads/option_image/64/lawn-farm-house.jpg' },
  { id: 'palaces', label: 'Heritage Palaces', img: 'https://image.wedmegood.com/resized/300X/uploads/option_image/368/heritage.jpg' },
  { id: 'resorts', label: 'Destination Resorts', img: 'https://image.wedmegood.com/resized/300X/uploads/option_image/67/resorts.jpg' },
  { id: 'small', label: 'Small Function Halls', img: 'https://image.wedmegood.com/resized/300X/uploads/option_image/491/small_function_halls.jpg' }
];

export const VENUES_DIRECTORY_DATA = [
  {
    id: "v-leela",
    name: "The Leela Palace Udaipur",
    type: "Heritage Palaces",
    city: "Udaipur",
    locality: "Lake Pichola",
    rating: 4.98,
    reviewsCount: 312,
    vegPlatePrice: "₹ 4,800",
    nonVegPlatePrice: "₹ 5,800",
    price: "₹ 8,50,000",
    priceUnit: "day rental",
    capacity: "150 - 1,200 Guests",
    image: "https://image.wedmegood.com/resized/500X/uploads/option_image/368/heritage.jpg",
    coverImage: "https://image.wedmegood.com/resized/500X/uploads/option_image/368/heritage.jpg",
    imageReel: [
      "https://image.wedmegood.com/resized/500X/uploads/option_image/368/heritage.jpg",
      "https://image.wedmegood.com/resized/500X/uploads/city_bg_image/1/north.jpg"
    ],
    verified: true,
    tag: "Crown Luxury",
    description: "Nestled on the serene banks of Lake Pichola with majestic Mewari architecture, floating mandap decks, and pure Satvik & Mughlai royal feasts.",
    spaces: ["Indoor Ballroom", "Outdoor Lakeside Lawns", "Poolside Deck"],
    banquetSpecs: {
      indoorSqFt: "14,500 sq.ft (Grand Mewar Ballroom)",
      outdoorSqFt: "32,000 sq.ft (Lake Pichola Floating Lawns)",
      minGuests: 150,
      maxGuests: 1200,
      floatingLawns: true,
      parkingCapacity: "250 Valet Bays",
      roomsCount: "80 Luxury Suites"
    },
    phone: "919414088990"
  },
  {
    id: "v-regenta",
    name: "Regenta Central Grand Exotica",
    type: "4 Star & Above Hotels",
    city: "Pune",
    locality: "Pimpri Chinchwad",
    rating: 4.6,
    reviewsCount: 148,
    vegPlatePrice: "₹ 999",
    nonVegPlatePrice: "₹ 1,299",
    price: "₹ 999",
    priceUnit: "per plate",
    capacity: "100 - 800 Guests",
    image: "https://image.wedmegood.com/resized/450X/uploads/member/1765153/1690199512_TKM___Edited_Jpgs__129_of_133___1_.jpg?crop=18,177,1979,1113",
    verified: true,
    tag: "Top Rated",
    description: "Centrally located luxury business hotel offering pillarless banquet halls, exquisite multi-cuisine catering, and lavish stay accommodations.",
    spaces: ["Indoor Ballroom", "Rooftop Terrace"],
    banquetSpecs: {
      indoorSqFt: "9,000 sq.ft",
      outdoorSqFt: "5,000 sq.ft",
      minGuests: 100,
      maxGuests: 800,
      floatingLawns: false,
      parkingCapacity: "150 Valet Bays",
      roomsCount: "72 Luxury Rooms"
    },
    phone: "919829012346"
  },
  {
    id: "v-caelum",
    name: "Caelum Atharva Palace",
    type: "Banquet Halls",
    city: "Jaipur",
    locality: "Ajmer Road",
    rating: 4.5,
    reviewsCount: 96,
    vegPlatePrice: "₹ 1,500",
    nonVegPlatePrice: "₹ 1,800",
    price: "₹ 1,500",
    priceUnit: "per plate",
    capacity: "250 - 1,500 Guests",
    image: "https://image.wedmegood.com/resized/450X/uploads/project/326554/1780301433_DSC09361_e.jpg?crop=212,226,1624,914",
    verified: true,
    tag: "Popular",
    description: "Palatial banquet hall inspired by Rajasthani haveli architecture with manicured outdoor lawns, grand crystal chandeliers, and royal decor options.",
    spaces: ["Indoor Hall", "Lush Lawn"],
    banquetSpecs: {
      indoorSqFt: "12,000 sq.ft",
      outdoorSqFt: "25,000 sq.ft",
      minGuests: 250,
      maxGuests: 1500,
      floatingLawns: false,
      parkingCapacity: "300 Valet Bays",
      roomsCount: "25 Deluxe Rooms"
    },
    phone: "919829012347"
  },
  {
    id: "v-kings",
    name: "The King's Meadows",
    type: "Marriage Garden / Lawns",
    city: "Bangalore",
    locality: "Vidyaranyapura",
    rating: 4.9,
    reviewsCount: 180,
    vegPlatePrice: "₹ 2,200",
    nonVegPlatePrice: "₹ 2,600",
    price: "₹ 2,200",
    priceUnit: "per plate",
    capacity: "300 - 2,500 Guests",
    image: "https://image.wedmegood.com/resized/300X/uploads/option_image/64/lawn-farm-house.jpg",
    verified: true,
    tag: "WMG Handpicked",
    description: "Spread over 15 acres of sprawling green lawns with natural amphitheater settings, lotus ponds, and customized canopy wedding mandaps.",
    spaces: ["Outdoor Lawn", "Covered Dining Pavilion"],
    banquetSpecs: {
      indoorSqFt: "8,000 sq.ft",
      outdoorSqFt: "60,000 sq.ft",
      minGuests: 300,
      maxGuests: 2500,
      floatingLawns: false,
      parkingCapacity: "500 Valet Bays",
      roomsCount: "12 Green Rooms"
    },
    phone: "919829012353"
  },
  {
    id: "v-alila",
    name: "Alila Diwa South Goa",
    type: "Destination Resorts",
    city: "Goa",
    locality: "Majorda Beach",
    rating: 4.88,
    reviewsCount: 210,
    vegPlatePrice: "₹ 3,500",
    nonVegPlatePrice: "₹ 4,200",
    price: "₹ 3,500",
    priceUnit: "per plate",
    capacity: "150 - 650 Guests",
    image: "https://image.wedmegood.com/resized/500X/uploads/city_image/16/goa.png",
    verified: true,
    tag: "Beach Resort",
    description: "Pristine coastal luxury resort surrounded by paddy fields and coconut groves, featuring private beach vows, infinity pool sangeet decks, and seafood banquets.",
    spaces: ["Beachfront Lawn", "Udapa Courtyard", "Grand Ballroom"],
    banquetSpecs: {
      indoorSqFt: "7,500 sq.ft",
      outdoorSqFt: "20,000 sq.ft",
      minGuests: 150,
      maxGuests: 650,
      floatingLawns: true,
      parkingCapacity: "120 Bays",
      roomsCount: "153 Luxury Rooms"
    },
    phone: "919829012355"
  },
  {
    id: "v-itc",
    name: "ITC Grand Bharat Gurgaon",
    type: "4 Star & Above Hotels",
    city: "Delhi NCR",
    locality: "Gurgaon",
    rating: 4.95,
    reviewsCount: 275,
    vegPlatePrice: "₹ 4,200",
    nonVegPlatePrice: "₹ 5,100",
    price: "₹ 7,80,000",
    priceUnit: "day rental",
    capacity: "200 - 1,200 Guests",
    image: "https://image.wedmegood.com/resized/300X/uploads/option_image/62/4-star-above-hotels.png",
    verified: true,
    tag: "5-Star Luxury",
    description: "India's tribute to legendary architecture, featuring 300 acres of manicured greens, private pool pavilions, and palatial ballroom suites.",
    spaces: ["Prithvi Ballroom", "Amphitheatre", "Poolside Lawns"],
    banquetSpecs: {
      indoorSqFt: "12,000 sq.ft",
      outdoorSqFt: "28,000 sq.ft",
      minGuests: 200,
      maxGuests: 1200,
      floatingLawns: false,
      parkingCapacity: "300 Valet Bays",
      roomsCount: "104 Presidential Villas"
    },
    phone: "919811099887"
  }
];

export default function WmgVenuesPage({
  selectedCity,
  setSelectedCity,
  onSelectVendor,
  showToast
}) {
  const [selectedType, setSelectedType] = useState('all');
  const [activeCityFilter, setActiveCityFilter] = useState(selectedCity === 'All cities' ? 'All' : selectedCity);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  const cities = ['All', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Jaipur', 'Udaipur', 'Goa', 'Pune'];

  const filteredVenues = VENUES_DIRECTORY_DATA.filter((venue) => {
    // City filter
    if (activeCityFilter !== 'All' && !venue.city.toLowerCase().includes(activeCityFilter.toLowerCase())) {
      return false;
    }
    // Type filter
    if (selectedType !== 'all') {
      const matchType = VENUE_CATEGORIES.find(c => c.id === selectedType)?.label;
      if (matchType && venue.type !== matchType) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = venue.name.toLowerCase().includes(q);
      const matchLoc = venue.locality.toLowerCase().includes(q);
      const matchCity = venue.city.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchCity) return false;
    }
    // Price filter
    if (priceFilter === 'budget') {
      const vegNum = parseInt(venue.vegPlatePrice.replace(/\D/g, '')) || 0;
      if (vegNum > 1500) return false;
    } else if (priceFilter === 'mid') {
      const vegNum = parseInt(venue.vegPlatePrice.replace(/\D/g, '')) || 0;
      if (vegNum < 1500 || vegNum > 3000) return false;
    } else if (priceFilter === 'luxury') {
      const vegNum = parseInt(venue.vegPlatePrice.replace(/\D/g, '')) || 0;
      if (vegNum < 3000) return false;
    }
    return true;
  });

  const handleWhatsApp = (venue, e) => {
    e.stopPropagation();
    const phone = venue.phone || '919829012345';
    const text = encodeURIComponent(`Hi ${venue.name}, I found your venue on WedMeGood and would like to check availability and quote for my upcoming wedding.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">Wedding Venues</span>
          {activeCityFilter !== 'All' && (
            <>
              <span>›</span>
              <span className="text-[#e72e77] font-bold">{activeCityFilter}</span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e72e77] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verified Spaces & Banquets</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A1715]">
                Wedding Venues in {activeCityFilter === 'All' ? 'India' : activeCityFilter}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredVenues.length} vetted palaces, banquet halls, 4/5 star hotels and farmhouses with verified per-plate pricing.
              </p>
            </div>

            {/* Search Input in Header */}
            <div className="w-full md:w-80 flex items-center bg-[#FAF8F5] border border-gray-300 rounded-xl px-3.5 py-2.5">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search venue name, locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs sm:text-sm outline-none w-full text-gray-800"
              />
            </div>
          </div>

          {/* Quick City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 border-t border-gray-100 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Top Cities:
            </span>
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCityFilter(c);
                  if (c !== 'All') setSelectedCity?.(c);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition shrink-0 ${
                  activeCityFilter === c
                    ? 'bg-[#e72e77] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Venue Types Strip with Authentic Option Images */}
        <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-3">
            {VENUE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition shrink-0 ${
                  selectedType === cat.id
                    ? 'bg-white border-[#e72e77] text-[#e72e77] shadow-sm ring-1 ring-[#e72e77]'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {cat.img && (
                  <img src={cat.img} alt="" className="w-6 h-6 rounded-md object-cover" />
                )}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price & Capacity Sub-filter bar */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-medium">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-700 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#e72e77]" />
              Filter By:
            </span>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-[#FAF8F5] border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 font-semibold outline-none cursor-pointer"
            >
              <option value="all">Price per plate: All</option>
              <option value="budget">Under ₹1,500 / plate</option>
              <option value="mid">₹1,500 - ₹3,000 / plate</option>
              <option value="luxury">Luxury (₹3,000+ / plate)</option>
            </select>
          </div>

          <div className="text-gray-500 text-xs">
            Showing <strong className="text-gray-900">{filteredVenues.length}</strong> Results
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              onClick={() => onSelectVendor?.(venue)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Rating Badge */}
                  <span className="absolute top-3 right-3 bg-black/75 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center space-x-1 backdrop-blur-xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{venue.rating}</span>
                    <span className="text-[10px] text-gray-300">({venue.reviewsCount})</span>
                  </span>

                  {/* Verified & Tag */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {venue.tag && (
                      <span className="bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
                        {venue.tag}
                      </span>
                    )}
                    {venue.verified && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Price Shield</span>
                      </span>
                    )}
                  </div>

                  {/* Locality Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>{venue.locality}, {venue.city}</span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[#1A1715] group-hover:text-[#e72e77] transition line-clamp-1 mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {venue.description}
                  </p>

                  {/* Per Plate Pricing Box */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-100 grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Veg per plate</span>
                      <strong className="text-sm text-emerald-700 font-bold">{venue.vegPlatePrice}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Non-Veg per plate</span>
                      <strong className="text-sm text-amber-700 font-bold">{venue.nonVegPlatePrice}</strong>
                    </div>
                  </div>

                  {/* Banquet Specs Highlights */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">
                      👥 {venue.capacity}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">
                      🏛️ {venue.banquetSpecs?.indoorSqFt || 'Ballroom'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-5 pt-0 grid grid-cols-5 gap-2 border-t border-gray-100 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVendor?.(venue);
                  }}
                  className="col-span-4 bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs text-center"
                >
                  Send Message / Get Quote
                </button>
                <button
                  onClick={(e) => handleWhatsApp(venue, e)}
                  title="WhatsApp Direct Contact"
                  className="col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition shadow-xs text-base"
                >
                  💬
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 mt-8">
            <h3 className="text-lg font-bold text-gray-800">No venues match your current filters</h3>
            <p className="text-sm text-gray-500 mt-1">Try resetting your city or price per plate filters.</p>
            <button
              onClick={() => {
                setActiveCityFilter('All');
                setSelectedType('all');
                setPriceFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#e72e77] text-white rounded-xl font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
