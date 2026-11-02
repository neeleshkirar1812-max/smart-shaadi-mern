import React from 'react';
import { MapPin, Sparkles, ArrowRight, IndianRupee, ShieldCheck } from 'lucide-react';

export const DESTINATIONS = [
  {
    name: 'Udaipur',
    theme: 'Lakeside Palaces & Royal Vivah',
    range: '₹45 Lakhs - ₹1.5 Cr',
    venuesCount: '84 Palaces',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Lake Pichola views, floating candle mandaps, and imperial Mewari royal hospitality.'
  },
  {
    name: 'Goa',
    theme: 'Beachfront Resorts & Coastal Vows',
    range: '₹30 Lakhs - ₹85 Lakhs',
    venuesCount: '112 Resorts',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Sunset mandaps on private beaches, coconut grove sangeets, and tropical cocktails.'
  },
  {
    name: 'Jaipur',
    theme: 'Regal Havelis & Historic Forts',
    range: '₹35 Lakhs - ₹1.2 Cr',
    venuesCount: '96 Forts & Lawns',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    description: 'Royal courtyards, elephant procession gates, and Shekhawati mirrored ballrooms.'
  },
  {
    name: 'Jim Corbett & Mussoorie',
    theme: 'Misty Mountains & Forest Retreats',
    range: '₹25 Lakhs - ₹65 Lakhs',
    venuesCount: '48 Retreats',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description: 'Pine-forested riverbanks, campfire sangeet jams, and serene Himalayan backdrops.'
  },
  {
    name: 'International (Thailand, Bali, Dubai)',
    theme: 'Exotic Island & Skyline Weddings',
    range: '₹60 Lakhs - ₹2.5 Cr',
    venuesCount: '72 Luxury Venues',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Cliffside ocean vows in Bali, Phuket beachfront villas, and Dubai desert ballrooms.'
  }
];

export default function WmgDestinationShowcase({ onSelectDestination }) {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Royal Getaways</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
              Destination Wedding Packages & Showcase
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Turnkey destination wedding packages with vetted palace rates, guest room blocks, and verified catering price shields.
            </p>
          </div>
        </div>

        {/* 5 Destination Cards Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              onClick={() => onSelectDestination(dest.name.split(' ')[0])}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-[#1A1715]">
                    {dest.venuesCount}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#FFE088] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-gray-200 line-clamp-1 mt-0.5">
                      {dest.theme}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="p-2 rounded-xl bg-white border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Estimated Package</span>
                    <span className="text-xs font-bold text-[#E72E77]">{dest.range}</span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {dest.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>Explore Venues</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
