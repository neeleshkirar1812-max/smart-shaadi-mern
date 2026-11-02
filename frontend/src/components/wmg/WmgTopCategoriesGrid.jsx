import React from 'react';

export default function WmgTopCategoriesGrid({ onSelectCategory }) {
  return (
    <section className="py-12 bg-white font-sans" id="vendors">
      <div className="wmg-container">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Venues */}
          <div 
            onClick={() => onSelectCategory?.('Venue')}
            className="border border-[#e4e4e4] rounded-xl p-5 hover:shadow-wmg transition bg-white group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#e72e77]">
                  <span className="material-symbols-outlined text-[22px]">villa</span>
                </div>
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition">Venues</h3>
              </div>
              <span className="text-[12px] font-bold text-[#888]">14,200+</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Banquet Halls</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Marriage Garden / Lawns</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Wedding Resorts</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Destination Venues</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">4 &amp; 5 Star Hotels</span>
            </div>
          </div>

          {/* Photographers */}
          <div 
            onClick={() => onSelectCategory?.('Photographer')}
            className="border border-[#e4e4e4] rounded-xl p-5 hover:shadow-wmg transition bg-white group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#e72e77]">
                  <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                </div>
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition">Photographers</h3>
              </div>
              <span className="text-[12px] font-bold text-[#888]">8,150+</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Candid Wedding Photography</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Cinematographers</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Pre Wedding Shoot</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Traditional Photography</span>
            </div>
          </div>

          {/* Makeup */}
          <div 
            onClick={() => onSelectCategory?.('Makeup Artist')}
            className="border border-[#e4e4e4] rounded-xl p-5 hover:shadow-wmg transition bg-white group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#e72e77]">
                  <span className="material-symbols-outlined text-[22px]">face_retouching_natural</span>
                </div>
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition">Makeup</h3>
              </div>
              <span className="text-[12px] font-bold text-[#888]">9,300+</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Bridal Makeup Artists</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Airbrush HD Makeup</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Family Makeup (WMG)</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Hairstylists</span>
            </div>
          </div>

          {/* Planning & Decor */}
          <div 
            onClick={() => onSelectCategory?.('Planning & Decor')}
            className="border border-[#e4e4e4] rounded-xl p-5 hover:shadow-wmg transition bg-white group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#e72e77]">
                  <span className="material-symbols-outlined text-[22px]">event_seat</span>
                </div>
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition">Planning &amp; Decor</h3>
              </div>
              <span className="text-[12px] font-bold text-[#888]">3,800+</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Wedding Planners</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Decorators</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Mandap Concepts</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Floral Installations</span>
            </div>
          </div>

          {/* Virtual Planning */}
          <div 
            onClick={() => onSelectCategory?.('Virtual Planning')}
            className="border border-[#e4e4e4] rounded-xl p-5 hover:shadow-wmg transition bg-white group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#e72e77]">
                  <span className="material-symbols-outlined text-[22px]">support_agent</span>
                </div>
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition">Virtual Planning</h3>
              </div>
              <span className="text-[12px] font-bold text-[#28a745]">FREE</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Virtual Genie Concierge</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Vendor Negotiation</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Budget Planning</span>
            </div>
          </div>

          {/* Mehndi Artists */}
          <div 
            onClick={() => onSelectCategory?.('Mehndi Artist')}
            className="border border-[#e4e4e4] rounded-xl p-5 hover:shadow-wmg transition bg-white group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#e72e77]">
                  <span className="material-symbols-outlined text-[22px]">brush</span>
                </div>
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition">Mehndi Artists</h3>
              </div>
              <span className="text-[12px] font-bold text-[#888]">4,100+</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[12px] text-[#666]">
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Bridal Mehndi</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Arabic Patterns</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Rajasthani Traditional</span>
              <span className="bg-[#f7f7f7] px-2 py-0.5 rounded">Portrait Mehendi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
