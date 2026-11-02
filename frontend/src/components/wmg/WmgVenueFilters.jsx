import React from 'react';

export default function WmgVenueFilters({
  activeFilter,
  setActiveFilter,
  onApplyFilter,
  onSelectCategory,
  onSelectCity
}) {
  return (
    <>
      {/* 4. POPULAR VENUE SEARCHES (3 PILL CARDS WITH REAL WMG IMAGES) */}
      <section id="popular-venues" className="py-10 bg-white border-b border-[#f0f0f0] font-sans">
        <div className="wmg-container">
          <h2 className="text-xl md:text-2xl font-bold text-[#2c2c2c] mb-6">Popular Venue Searches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: 4 Star & Above Hotels */}
            <div className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white flex flex-col justify-between group cursor-pointer">
              <div className="flex items-center space-x-4 p-5">
                <img 
                  src="https://image.wedmegood.com/resized/300X/uploads/option_image/62/4-star-above-hotels.png" 
                  alt="4 Star & Above Hotels" 
                  className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c] group-hover:text-[#e72e77] transition">
                    4 Star &amp; Above Hotels
                  </h3>
                  <p className="text-[12px] text-[#888] mt-0.5">Cities: Mumbai | Bangalore | Pune | More</p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-1 text-[13px] text-[#e72e77] font-semibold flex items-center space-x-2 border-t border-gray-100 mt-2">
                <button onClick={() => onSelectCity('Mumbai')} className="hover:underline">Mumbai</button> • 
                <button onClick={() => onSelectCity('Bangalore')} className="hover:underline">Bangalore</button> • 
                <button onClick={() => onSelectCity('Pune')} className="hover:underline">Pune</button> • 
                <button onClick={() => onApplyFilter('4 Star Hotel')} className="hover:underline font-bold">More →</button>
              </div>
            </div>

            {/* Card 2: Banquet Halls */}
            <div className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white flex flex-col justify-between group cursor-pointer">
              <div className="flex items-center space-x-4 p-5">
                <img 
                  src="https://image.wedmegood.com/resized/300X/uploads/option_image/63/banquet-halls.png" 
                  alt="Banquet Halls" 
                  className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c] group-hover:text-[#e72e77] transition">
                    Banquet Halls
                  </h3>
                  <p className="text-[12px] text-[#888] mt-0.5">Cities: Mumbai | Bangalore | Pune | More</p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-1 text-[13px] text-[#e72e77] font-semibold flex items-center space-x-2 border-t border-gray-100 mt-2">
                <button onClick={() => onSelectCity('Mumbai')} className="hover:underline">Mumbai</button> • 
                <button onClick={() => onSelectCity('Bangalore')} className="hover:underline">Bangalore</button> • 
                <button onClick={() => onSelectCity('Pune')} className="hover:underline">Pune</button> • 
                <button onClick={() => onApplyFilter('Banquet Hall')} className="hover:underline font-bold">More →</button>
              </div>
            </div>

            {/* Card 3: Marriage Garden / Lawns */}
            <div className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition bg-white flex flex-col justify-between group cursor-pointer">
              <div className="flex items-center space-x-4 p-5">
                <img 
                  src="https://image.wedmegood.com/resized/300X/uploads/option_image/64/lawn-farm-house.jpg" 
                  alt="Marriage Garden / Lawns" 
                  className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c] group-hover:text-[#e72e77] transition">
                    Marriage Garden / Lawns
                  </h3>
                  <p className="text-[12px] text-[#888] mt-0.5">Cities: Mumbai | Bangalore | Pune | More</p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-1 text-[13px] text-[#e72e77] font-semibold flex items-center space-x-2 border-t border-gray-100 mt-2">
                <button onClick={() => onSelectCity('Mumbai')} className="hover:underline">Mumbai</button> • 
                <button onClick={() => onSelectCity('Bangalore')} className="hover:underline">Bangalore</button> • 
                <button onClick={() => onSelectCity('Pune')} className="hover:underline">Pune</button> • 
                <button onClick={() => onApplyFilter('Marriage Lawn')} className="hover:underline font-bold">More →</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. POPULAR SEARCHES PILLS STRIP WITH THUMBNAILS */}
      <section className="py-6 bg-white border-b border-[#f0f0f0] font-sans">
        <div className="wmg-container flex items-center flex-wrap gap-2.5">
          <span className="text-[13px] font-bold text-[#2c2c2c] mr-2">Popular Searches:</span>
          
          <button 
            onClick={() => onSelectCategory('Bridal Wear')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/1/bridal-wear-new.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Bridal Wear</span>
          </button>

          <button 
            onClick={() => onSelectCategory('Makeup Artist')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/2/mua-new.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Bridal Makeup Artists</span>
          </button>

          <button 
            onClick={() => onSelectCategory('Photographer')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/3/photography-new.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Photographers</span>
          </button>

          <button 
            onClick={() => onSelectCategory('Invitations')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/4/cards-new.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Invitations</span>
          </button>

          <button 
            onClick={() => onSelectCategory('Food & Catering')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/5/caterers-new.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Catering Services</span>
          </button>

          <button 
            onClick={() => onSelectCategory('Planning & Decor')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/8/decorators-new.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Wedding Decorators</span>
          </button>

          <button 
            onClick={() => onSelectCategory('Mehndi Artist')}
            className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition flex items-center space-x-1.5"
          >
            <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/7/mehndi.jpg" alt="" className="w-4 h-4 rounded-full object-cover inline" />
            <span>Mehendi Artists</span>
          </button>
        </div>
      </section>
    </>
  );
}
