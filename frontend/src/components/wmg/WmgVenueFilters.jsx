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
      {/* 4. POPULAR VENUE SEARCHES (3 PILL CARDS) */}
      <section id="popular-venues" className="py-10 bg-white border-b border-[#f0f0f0] font-sans">
        <div className="wmg-container">
          <h2 className="text-xl md:text-2xl font-bold text-[#2c2c2c] mb-6">Popular Venue Searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="border border-[#e4e4e4] rounded-lg p-5 hover:shadow-wmg transition bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2 text-[#e72e77]">
                  <span className="material-symbols-outlined text-[24px]">hotel</span>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c]">4 Star &amp; Above Hotels</h3>
                </div>
                <p className="text-[12px] text-[#888] mb-4">Cities: Mumbai | Bangalore | Pune | More</p>
              </div>
              <div className="text-[13px] text-[#e72e77] font-semibold flex items-center space-x-2">
                <button onClick={() => onSelectCity('Mumbai')} className="hover:underline">Mumbai</button> • 
                <button onClick={() => onSelectCity('Bangalore')} className="hover:underline">Bangalore</button> • 
                <button onClick={() => onSelectCity('Pune')} className="hover:underline">Pune</button> • 
                <button onClick={() => onApplyFilter('4 Star Hotel')} className="hover:underline font-bold">More →</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-[#e4e4e4] rounded-lg p-5 hover:shadow-wmg transition bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2 text-[#e72e77]">
                  <span className="material-symbols-outlined text-[24px]">meeting_room</span>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c]">Banquet Halls</h3>
                </div>
                <p className="text-[12px] text-[#888] mb-4">Cities: Mumbai | Bangalore | Pune | More</p>
              </div>
              <div className="text-[13px] text-[#e72e77] font-semibold flex items-center space-x-2">
                <button onClick={() => onSelectCity('Mumbai')} className="hover:underline">Mumbai</button> • 
                <button onClick={() => onSelectCity('Bangalore')} className="hover:underline">Bangalore</button> • 
                <button onClick={() => onSelectCity('Pune')} className="hover:underline">Pune</button> • 
                <button onClick={() => onApplyFilter('Banquet Hall')} className="hover:underline font-bold">More →</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-[#e4e4e4] rounded-lg p-5 hover:shadow-wmg transition bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2 text-[#e72e77]">
                  <span className="material-symbols-outlined text-[24px]">yard</span>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c]">Marriage Garden / Lawns</h3>
                </div>
                <p className="text-[12px] text-[#888] mb-4">Cities: Mumbai | Bangalore | Pune | More</p>
              </div>
              <div className="text-[13px] text-[#e72e77] font-semibold flex items-center space-x-2">
                <button onClick={() => onSelectCity('Mumbai')} className="hover:underline">Mumbai</button> • 
                <button onClick={() => onSelectCity('Bangalore')} className="hover:underline">Bangalore</button> • 
                <button onClick={() => onSelectCity('Pune')} className="hover:underline">Pune</button> • 
                <button onClick={() => onApplyFilter('Lawn Garden')} className="hover:underline font-bold">More →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR SEARCHES PILLS STRIP */}
      <section className="py-6 bg-white border-b border-[#f0f0f0] font-sans">
        <div className="wmg-container flex items-center flex-wrap gap-2.5">
          <span className="text-[13px] font-bold text-[#2c2c2c] mr-2">Popular Searches:</span>
          <button onClick={() => onSelectCategory('Bridal Wear')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Bridal Wear
          </button>
          <button onClick={() => onSelectCategory('Makeup Artist')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Bridal Makeup Artists
          </button>
          <button onClick={() => onSelectCategory('Photographer')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Photographers
          </button>
          <button onClick={() => onSelectCategory('Invitations')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Invitations
          </button>
          <button onClick={() => onSelectCategory('Caterer')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Catering Services
          </button>
          <button onClick={() => onSelectCategory('Decorator')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Wedding Decorators
          </button>
          <button onClick={() => onSelectCategory('Mehndi Artist')} className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#e72e77] hover:text-white px-3.5 py-1.5 rounded-full transition">
            Mehendi Artists
          </button>
        </div>
      </section>
    </>
  );
}
