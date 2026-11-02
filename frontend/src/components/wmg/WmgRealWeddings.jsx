import React, { useState } from 'react';

export const VERBATIM_REAL_WEDDINGS = [
  {
    id: 'rw-1',
    couple: 'Anjana Arjun and Isaiah Nutter',
    date: '19 October 2026',
    location: 'Tuscany, Italy',
    tag: 'International Destination',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    description: "Inside Arjun Sarja's Daughter Anjana Arjun's Dreamy Italian Wedding! Traditional South Indian rituals in romantic Tuscany.",
    details: 'Traditional South Indian rituals celebrated amidst the rolling Tuscan hills. From sacred Kanyadaan under an olive grove to sunset Italian dining, every frame was pure elegance.',
    vendors: [
      { role: 'Venue', name: 'Villa Medicea di Lilliano, Tuscany' },
      { role: 'Photographer', name: 'Stories by Joseph Radhik' },
      { role: 'Bridal Wear', name: 'Sabyasachi Heritage Crimson Velvet' },
      { role: 'Makeup', name: 'Namrata Soni Haute Glam' }
    ]
  },
  {
    id: 'rw-2',
    couple: 'Krishna and Anan',
    date: '08 January 2026',
    location: 'Udaipur, Rajasthan',
    tag: 'Royal Heritage Vivah',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    description: 'Lake Como Vibes, But Make It Udaipur! This Wedding Was All Kinds Of Stunning with floating mandaps and fireworks over Lake Pichola.',
    details: 'Floating crystal mandap on Lake Pichola, private royal boat arrivals for the baraat, and a 1000-candle Sufi sangeet under the star-lit Mewari skies.',
    vendors: [
      { role: 'Venue', name: 'The Leela Palace Udaipur' },
      { role: 'Photographer', name: 'The Wedding Story' },
      { role: 'Decor', name: 'Altair Decor & Design' },
      { role: 'Catering', name: 'FoodCraft Royal Mewari Feasts' }
    ]
  },
  {
    id: 'rw-3',
    couple: 'Shwetha and Prathmesh',
    date: '13 December 2025',
    location: 'South Goa',
    tag: 'Beachside Sundowner',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    description: 'Sun-drenched Goa Cross-Culture Nuptials with personalized pastel decor, Sufi sangeet night, and acoustic beach vows.',
    details: 'Barefoot beach pheras on the pristine white sands of South Goa, pastel floral canopies, and a live acoustic sunset jam that transitioned into an electric sangeet.',
    vendors: [
      { role: 'Venue', name: 'Alila Diwa Goa' },
      { role: 'Photographer', name: 'Colorblind Production' },
      { role: 'Makeup', name: 'Deepa Kayakalp Salon' },
      { role: 'Entertainment', name: 'Progressive Brothers Live' }
    ]
  },
  {
    id: 'rw-4',
    couple: 'Pavani and Karan',
    date: '12 November 2025',
    location: 'Delhi NCR',
    tag: 'Artistic Royal Gala',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    description: 'This Creative Delhi Wedding Was Basically A Love Story Told Through Art! Hand-painted Pichwai backdrops and 10,000 brass bells.',
    details: 'Celebrated across an opulent farmhouse in Chattarpur with custom brass bell chimes, lotus pond mandap setups, and a high-energy Punjabi sangeet night.',
    vendors: [
      { role: 'Venue', name: 'The Virasat Countryside Farm, Gurgaon' },
      { role: 'Photographer', name: 'Shutterdown Photography' },
      { role: 'Bridal Wear', name: 'Manish Malhotra Atelier' }
    ]
  },
  {
    id: 'rw-5',
    couple: 'Jessica and Aman',
    date: '28 October 2025',
    location: 'Jim Corbett, Uttarakhand',
    tag: 'Wilderness Destination',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    description: 'A Forest Wedding With Pichwai Pinks, Amazonia Foliage And Vedic Shlokas Suspended On Ancient Mango Trees!',
    details: 'Flanked by the Kosi river and Sal forests, this intimate destination wedding featured acoustic sitar dawn pheras, bonfire sangeet, and organic Kumaoni feast.',
    vendors: [
      { role: 'Venue', name: 'Vandhara Sarovar Premiere Patkot' },
      { role: 'Photographer', name: 'Weddings by Knotty Days' },
      { role: 'Decor', name: 'The Blooming Story India' }
    ]
  }
];

export default function WmgRealWeddings({ onSelectVendor }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [filterTag, setFilterTag] = useState('All');

  const filteredStories = filterTag === 'All'
    ? VERBATIM_REAL_WEDDINGS
    : VERBATIM_REAL_WEDDINGS.filter((s) => s.tag.toLowerCase().includes(filterTag.toLowerCase()));

  return (
    <section className="py-12 bg-white font-sans" id="real-weddings">
      <div className="wmg-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Real Wedding Stories</h2>
            <p className="text-[14px] text-[#777] mt-1">Get inspired by real couples, their outfits, decor, and vendor recommendations</p>
          </div>
          <button 
            onClick={() => setShowAllModal(true)}
            className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
          >
            <span>View all Stories ({VERBATIM_REAL_WEDDINGS.length})</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* 3 Main Display Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBATIM_REAL_WEDDINGS.slice(0, 3).map((story) => (
            <div 
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition group bg-white cursor-pointer"
            >
              <div className="h-60 overflow-hidden relative">
                <img 
                  alt={story.couple} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  src={story.image}
                />
                <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                  {story.date}
                </span>
                <span className="absolute top-3 right-3 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {story.location}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition mb-1">
                  {story.couple}
                </h3>
                <p className="text-[13px] text-[#666] line-clamp-2 mb-3">
                  {story.description}
                </p>
                <div className="text-[12px] font-semibold text-[#e72e77] flex items-center space-x-1">
                  <span>View Wedding Story</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in">
            <div className="relative h-72">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.couple} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                ✕
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {selectedStory.tag}
                  </span>
                  <span className="text-xs text-gray-200">📍 {selectedStory.location} • {selectedStory.date}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif">{selectedStory.couple}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6 text-[#2c2c2c]">
              <div>
                <h4 className="text-base font-bold text-[#2c2c2c] mb-2">The Love Story &amp; Celebration</h4>
                <p className="text-sm text-[#555] leading-relaxed mb-3">
                  {selectedStory.description}
                </p>
                <p className="text-xs text-gray-600 bg-[#faf8f6] p-4 rounded-xl border border-gray-200 leading-relaxed">
                  {selectedStory.details}
                </p>
              </div>

              {/* Hired Vendors breakdown */}
              {selectedStory.vendors && selectedStory.vendors.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#e72e77] mb-3">
                    Vendors Hired by the Couple
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {selectedStory.vendors.map((v, i) => (
                      <div key={i} className="border border-gray-200 p-3 rounded-lg flex items-center justify-between bg-white hover:border-[#e72e77] transition">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{v.role}</p>
                          <p className="font-bold text-[#2c2c2c]">{v.name}</p>
                        </div>
                        <span className="text-[#e72e77] text-xs font-bold">Verified ✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Curated by WedMeGood Real Weddings Desk</span>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition shadow-sm"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Stories Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 relative animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#2c2c2c]">All Real Wedding Stories</h3>
                <p className="text-xs text-gray-500">Discover authentic celebration albums from couples across India and abroad</p>
              </div>
              <button 
                onClick={() => setShowAllModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {VERBATIM_REAL_WEDDINGS.map((story) => (
                <div 
                  key={story.id}
                  onClick={() => {
                    setShowAllModal(false);
                    setSelectedStory(story);
                  }}
                  className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition group bg-white cursor-pointer"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      alt={story.couple} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      src={story.image}
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                      {story.location}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-[#2c2c2c] group-hover:text-[#e72e77] transition truncate">
                      {story.couple}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
