import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const WMG_6_CATEGORIES = [
  {
    id: 'Venue',
    title: 'Venues',
    count: '14,200+ Banquets & Palaces',
    badge: '14,200+',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    description: '4-Star & 5-Star Hotels, Banquet Halls, Lawns & Heritage Palaces'
  },
  {
    id: 'Photographer',
    title: 'Photographers',
    count: '8,150+ Cinematic & Candid',
    badge: '8,150+',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=80',
    description: 'Candid wedding photography, cinematic video & pre-wedding shoots'
  },
  {
    id: 'Makeup Artist',
    title: 'Makeup',
    count: '9,300+ Bridal Airbrush & HD',
    badge: '9,300+',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80',
    description: 'Bridal makeup, airbrush techniques, family makeup & hair styling'
  },
  {
    id: 'Planning & Decor',
    title: 'Planning & Decor',
    count: '3,800+ Theme Designers',
    badge: '3,800+',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    description: 'Turnkey coordinators, mandap floral setups & illumination designers'
  },
  {
    id: 'Virtual Planning',
    title: 'Virtual Planning',
    count: 'WMG Virtual Assistant',
    badge: 'FREE',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80',
    description: 'Expert online advisors to negotiate prices, verify dates & plan logistics'
  },
  {
    id: 'Mehndi Artist',
    title: 'Mehndi Artists',
    count: '4,100+ Traditional & Arabic',
    badge: '4,100+',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=700&q=80',
    description: 'Traditional Marwari, Arabic, organic henna & customized bridal portrait art'
  }
];

export default function WmgTopCategoriesGrid({ onSelectCategory }) {
  return (
    <section id="top-categories" className="py-14 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View All */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Wedding Categories</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1715]">
              Explore Wedding Categories
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory('All vendors')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E72E77] hover:text-[#B60056] group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WMG_6_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id === 'Planning & Decor' ? 'Decorator' : cat.id === 'Makeup' ? 'Makeup Artist' : cat.id === 'Venues' ? 'Venue' : cat.id)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Count / Free Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#1A1715] shadow-xs">
                  {cat.badge}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl font-bold group-hover:text-[#FFE088] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-200 mt-0.5">
                    {cat.count}
                  </p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-500 line-clamp-2">
                  {cat.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>Explore Vendors</span>
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
