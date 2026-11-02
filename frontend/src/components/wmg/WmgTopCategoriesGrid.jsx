import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const TOP_CATEGORIES_DATA = [
  {
    id: 'Bridal Wear',
    title: 'Bridal Wear & Lehengas',
    count: '6,420+ Boutiques & Designers',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    description: 'Bespoke silk lehengas, bridal sarees & couture anarkalis'
  },
  {
    id: 'Photographer',
    title: 'Wedding Photographers',
    count: '8,150+ Cinematic & Candid Artists',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=80',
    description: 'Candid storytelling, drone cinematography & pre-wedding shoots'
  },
  {
    id: 'Makeup Artist',
    title: 'Bridal Makeup Artists',
    count: '9,300+ Airbrush & HD Artists',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80',
    description: 'HD airbrush glam, saree draping & flawless bridal makeovers'
  },
  {
    id: 'Venue',
    title: 'Wedding Venues & Palaces',
    count: '14,200+ Banquets, Lawns & Palaces',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    description: '5-star luxury hotels, heritage forts, lush lawns & banquet halls'
  },
  {
    id: 'Mehndi Artist',
    title: 'Bridal Mehndi Artists',
    count: '4,100+ Traditional & Arabic Artists',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=700&q=80',
    description: 'Intricate Rajasthani Marwari, Arabic & customized bridal portrait mehndi'
  },
  {
    id: 'Decorator',
    title: 'Wedding Decorators',
    count: '3,800+ Theme & Floral Designers',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    description: 'Royal mandap setups, floral installations & dream illumination'
  },
  {
    id: 'Groom Wear',
    title: 'Groom Wear & Sherwanis',
    count: '2,900+ Sherwani & Tuxedo Designers',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
    description: 'Regal achkans, bandhgalas, silk safas & tuxedo ensembles'
  },
  {
    id: 'Wedding Planner',
    title: 'Wedding Planners',
    count: '2,100+ Turnkey Coordinators',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80',
    description: 'End-to-end hospitality, hospitality logistics & vendor coordination'
  }
];

export default function WmgTopCategoriesGrid({ onSelectCategory }) {
  return (
    <section id="top-categories" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Curated Directory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
              Top Wedding Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Browse top-rated wedding specialists handpicked and authenticated by WedMeGood editors.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('All vendors')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E72E77] hover:text-[#B60056] group"
          >
            <span>View All 50,000+ Vendors</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8-Card Visual Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              {/* Photo Reel */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                
                {/* Count Badge on Photo */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1A1715] shadow-xs">
                  {cat.count.split(' ')[0]}
                </div>

                {/* Bottom title on Photo */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#FFE088] transition-colors">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Card Meta & Subtitle */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-500 line-clamp-2">
                  {cat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>Explore Listings</span>
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
