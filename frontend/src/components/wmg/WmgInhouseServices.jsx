import React from 'react';

export default function WmgInhouseServices({ onSelectService, onOpenGenie, onOpenInhouseModal }) {
  const handleOpen = (type) => {
    if (onOpenInhouseModal) {
      onOpenInhouseModal(type);
    } else if (type === 'venue') {
      onSelectService?.('Venue');
    } else {
      onOpenGenie?.(type);
    }
  };

  return (
    <section className="py-10 bg-[#faf8f6] border-b border-[#f0f0f0] font-sans">
      <div className="wmg-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#2c2c2c]">WMG Inhouse Services</h2>
          <span className="text-[12px] font-bold text-[#e72e77] bg-pink-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            100% Guaranteed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Wedsta */}
          <div 
            onClick={() => handleOpen('wedsta')} 
            className="bg-white border border-[#ffe0ea] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition relative cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/wedsta_dweb.jpg" 
                alt="Wedsta" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <span className="absolute top-3 left-3 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-xs">
                WMG SERVICE
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#2c2c2c] group-hover:text-[#e72e77] transition mb-1">
                  Wedsta
                </h3>
                <p className="text-[13px] text-[#666] mb-4">
                  WMG At Home, Family Makeup Services by certified beauty artists.
                </p>
              </div>
              <button className="text-[#e72e77] font-bold text-[13px] hover:underline flex items-center space-x-1 text-left">
                <span>Know More</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Genie Services */}
          <div 
            onClick={() => handleOpen('genie')} 
            className="bg-white border border-[#d6ecff] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition relative cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/genie_dweb.jpg" 
                alt="Genie Services" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <span className="absolute top-3 left-3 bg-[#0070ba] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-xs">
                WMG SERVICE
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#2c2c2c] group-hover:text-[#0070ba] transition mb-1">
                  Genie Services
                </h3>
                <p className="text-[13px] text-[#666] mb-4">
                  Plan your dream wedding in your budget with dedicated personal wedding managers.
                </p>
              </div>
              <button className="text-[#0070ba] font-bold text-[13px] hover:underline flex items-center space-x-1 text-left">
                <span>Know More</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Venue Booking Service */}
          <div 
            onClick={() => handleOpen('venue')} 
            className="bg-white border border-[#fff2ce] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition relative cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img 
                src="https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/venue_dweb.jpg" 
                alt="Venue Booking Service" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <span className="absolute top-3 left-3 bg-[#b38600] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-xs">
                WMG SERVICE
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#2c2c2c] group-hover:text-[#b38600] transition mb-1">
                  Venue Booking Service
                </h3>
                <p className="text-[13px] text-[#666] mb-4">
                  Best Price Guaranteed &amp; exclusive date holding directly with palace banquets.
                </p>
              </div>
              <button className="text-[#b38600] font-bold text-[13px] hover:underline flex items-center space-x-1 text-left">
                <span>Know More</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
