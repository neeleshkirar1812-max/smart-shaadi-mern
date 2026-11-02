import React from 'react';

export default function WmgTopCategoriesGrid({ onSelectCategory }) {
  return (
    <section className="py-12 bg-white font-sans" id="vendors">
      <div className="wmg-container">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Wedding Categories</h2>
            <p className="text-[14px] text-[#777] mt-1">Explore over 50,000+ verified wedding partners across India</p>
          </div>
          <button 
            onClick={() => onSelectCategory?.('all')}
            className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
          >
            <span>View all Categories</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* 6 Category Cards with Real WedMeGood Category Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Venues */}
          <div 
            onClick={() => onSelectCategory?.('Venue')}
            className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/venues.jpg" 
                alt="Venues" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <h3 className="font-bold text-lg text-white">Venues</h3>
                  <p className="text-[11px] text-pink-200">14,200+ Banquets &amp; Palaces</p>
                </div>
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  14,200+
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Banquet Halls</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Marriage Garden / Lawns</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Wedding Resorts</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">4 &amp; 5 Star Hotels</span>
            </div>
          </div>

          {/* Photographers */}
          <div 
            onClick={() => onSelectCategory?.('Photographer')}
            className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/photographers.jpg" 
                alt="Photographers" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <h3 className="font-bold text-lg text-white">Photographers</h3>
                  <p className="text-[11px] text-pink-200">8,150+ Cinematic &amp; Candid</p>
                </div>
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  8,150+
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Candid Photography</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Cinematographers</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Pre Wedding Shoot</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Traditional Photos</span>
            </div>
          </div>

          {/* Makeup */}
          <div 
            onClick={() => onSelectCategory?.('Makeup Artist')}
            className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/3/makeup.jpg" 
                alt="Makeup" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <h3 className="font-bold text-lg text-white">Makeup</h3>
                  <p className="text-[11px] text-pink-200">9,300+ Bridal Airbrush &amp; HD</p>
                </div>
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  9,300+
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Bridal Makeup Artists</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Airbrush HD Makeup</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Family Makeup (WMG)</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Hairstylists</span>
            </div>
          </div>

          {/* Planning & Decor */}
          <div 
            onClick={() => onSelectCategory?.('Planning & Decor')}
            className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/7/planning-decor.jpg" 
                alt="Planning & Decor" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <h3 className="font-bold text-lg text-white">Planning &amp; Decor</h3>
                  <p className="text-[11px] text-pink-200">3,800+ Theme Designers</p>
                </div>
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  3,800+
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Wedding Planners</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Decorators</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Mandap Concepts</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Floral Setups</span>
            </div>
          </div>

          {/* Virtual Planning */}
          <div 
            onClick={() => onSelectCategory?.('Virtual Planning')}
            className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/15/VirtualPlanningService.jpg" 
                alt="Virtual Planning" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <h3 className="font-bold text-lg text-white">Virtual Planning</h3>
                  <p className="text-[11px] text-emerald-200">Free Online Concierge</p>
                </div>
                <span className="bg-[#28a745] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  FREE
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Virtual Genie Concierge</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Vendor Negotiation</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Budget Planning</span>
            </div>
          </div>

          {/* Mehndi Artists */}
          <div 
            onClick={() => onSelectCategory?.('Mehndi Artist')}
            className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/6/mehendi-artists.jpg" 
                alt="Mehndi Artists" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <h3 className="font-bold text-lg text-white">Mehndi Artists</h3>
                  <p className="text-[11px] text-pink-200">4,100+ Henna Designers</p>
                </div>
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  4,100+
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Bridal Mehndi</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Arabic Patterns</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Rajasthani Traditional</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Portrait Henna</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
