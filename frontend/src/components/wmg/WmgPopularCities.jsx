import React from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const POPULAR_CITIES = [
  {
    name: 'Delhi NCR',
    subtitle: 'Banquets, Farmhouses & 5-Stars',
    count: '2,840+ Venues',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80',
    tag: 'Trending'
  },
  {
    name: 'Mumbai',
    subtitle: 'Seafront Lawns & Luxury Ballrooms',
    count: '1,920+ Venues',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80',
    tag: 'Bespoke'
  },
  {
    name: 'Bangalore',
    subtitle: 'Lush Gardens & Heritage Villas',
    count: '1,450+ Venues',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=500&q=80',
    tag: 'Green Lawns'
  },
  {
    name: 'Jaipur',
    subtitle: 'Royal Havelis & Imperial Forts',
    count: '1,180+ Venues & Forts',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80',
    tag: 'Royal Heritage'
  },
  {
    name: 'Udaipur',
    subtitle: 'Lake Pichola Palaces & Royal Vivah',
    count: '780+ Heritage Palaces',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
    tag: 'Crown Gem'
  },
  {
    name: 'Goa',
    subtitle: 'Sun-Kissed Beachfront Mandaps',
    count: '620+ Beach Resorts',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=500&q=80',
    tag: 'Beach Vows'
  },
  {
    name: 'Hyderabad',
    subtitle: 'Nizami Grandeur & Historic Courtyards',
    count: '890+ Nizami Palaces',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=500&q=80',
    tag: 'Nizami Grandeur'
  },
  {
    name: 'Jim Corbett',
    subtitle: 'Wilderness Vows & Forest Retreats',
    count: '310+ Wilderness Resorts',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=80',
    tag: 'Nature Bliss'
  }
];

export default function WmgPopularCities({ selectedCity, onSelectCity }) {
  return (
    <section className="py-14 bg-[#FAF8F5] border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Destination Explorer</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1715]">
              Popular Wedding Cities & Destinations
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Find palaces, 5-star banquet lawns, and beach resorts across India&apos;s most sought-after wedding hubs.
            </p>
          </div>
        </div>

        {/* 8-Card Circular/Card Explorer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {POPULAR_CITIES.map((city) => {
            const isSelected = selectedCity.toLowerCase().includes(city.name.toLowerCase().split(' ')[0]);
            return (
              <button
                key={city.name}
                onClick={() => onSelectCity(city.name)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 group ${
                  isSelected
                    ? 'bg-white shadow-lg ring-2 ring-[#E72E77] scale-105'
                    : 'bg-white/80 hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Circular Photo */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2.5 ring-2 ring-gray-100 group-hover:ring-[#D4AF37] transition-all">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#E72E77]/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#E72E77] ring-2 ring-white" />
                    </div>
                  )}
                </div>

                <h4 className="text-xs font-bold text-[#1A1715] group-hover:text-[#E72E77] transition-colors leading-tight">
                  {city.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                  {city.count}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
