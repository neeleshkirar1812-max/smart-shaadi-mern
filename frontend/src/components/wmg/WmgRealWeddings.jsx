import React, { useState } from 'react';

export const VERBATIM_REAL_WEDDINGS = [
  {
    id: 'rw-1',
    couple: 'Anjana Arjun and Isaiah Nutter',
    date: '19 October 2026',
    location: 'Tuscany, Italy',
    tag: 'International Destination',
    image: 'https://image.wedmegood.com/resized/450X/uploads/images/b4c1f91cd37946449ff1949049615282realwedding/SnapInsta.to_863289625_18651994333053040_8390938957610353626_n.jpg?crop=279,864,1630,917',
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
    image: 'https://image.wedmegood.com/resized/450X/uploads/images/0cc1b60a50b1484685134820f13886farealwedding/Ombrebyhj_KA_Highlights-07211_websize.jpg?crop=119,256,1267,713',
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
    image: 'https://image.wedmegood.com/resized/450X/uploads/images/71ab715ec988443a9c6f87f7ba4a6f63realwedding/RP_05090(1).jpg?crop=103,1251,1631,917',
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
    couple: 'Rhea and Kunal',
    date: '15 November 2025',
    location: 'Jaipur, Rajasthan',
    tag: 'Palace Extravaganza',
    image: 'https://image.wedmegood.com/resized/500X/uploads/images/05a78a174ca4441fb69933010d7d06b0realwedding/Collage.jpg',
    description: 'Grand Royal Rajputana Vivah at Rambagh Palace featuring an elephant baraat procession and mirror-work mandap.',
    details: 'A three-day royal spectacle with bespoke Shekhawati decor, sit-down royal thali dinner by royal khansamas, and Sufi night under the starlit sky.',
    vendors: [
      { role: 'Venue', name: 'Rambagh Palace Jaipur' },
      { role: 'Photographer', name: 'Stories by Joseph Radhik' },
      { role: 'Bridal Wear', name: 'Tarun Tahiliani Couture' },
      { role: 'Decor', name: 'Altair Decor' }
    ]
  },
  {
    id: 'rw-5',
    couple: 'Sanjana and Arjun',
    date: '28 October 2025',
    location: 'Kapalua, Hawaii',
    tag: 'Oceanfront Vows',
    image: 'https://image.wedmegood.com/resized/500X/uploads/images/8a7fae98bdaa43f796d5ffed8c59ba8crealwedding/Chris-J-Evans-Ritz-Carlton-Kapalua_PS_13618.jpg',
    description: 'Clifftop Pacific Ocean Mandap with Vedic chants, Hawaiian ukulele fusion, and floral garlands.',
    details: 'Intimate destination wedding with 120 closest family members. Pure white floral mandap framed against turquoise waves and golden sunset.',
    vendors: [
      { role: 'Venue', name: 'The Ritz-Carlton Kapalua' },
      { role: 'Photographer', name: 'Chris J Evans' },
      { role: 'Makeup', name: 'Namrata Soni' }
    ]
  },
  {
    id: 'rw-6',
    couple: 'Aishwarya and Dev',
    date: '02 October 2025',
    location: 'Delhi NCR',
    tag: 'Classic Heritage Vivah',
    image: 'https://image.wedmegood.com/resized/500X/uploads/images/bfe70ae598684afca766501ed475e3darealwedding/WN_JA_R1_093.jpg',
    description: 'Bespoke farmhouse wedding with pastel lotus motifs, Sufi qawwali sundowner, and royal Marwari catering.',
    details: 'Fairy-lit orchards, authentic Satvik and Jain counters, and a grand midnight pheras ceremony by the pool.',
    vendors: [
      { role: 'Venue', name: 'ITC Grand Bharat' },
      { role: 'Photographer', name: 'The Wedding Story' },
      { role: 'Catering', name: 'FoodCraft Luxury Catering' }
    ]
  }
];

export default function WmgRealWeddings() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section className="py-12 bg-white font-sans" id="real-weddings">
      <div className="wmg-container">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Real Wedding Stories</h2>
            <p className="text-[14px] text-[#777] mt-1">Get inspired by real couples, their outfits, decor, and vendor recommendations</p>
          </div>
          <button 
            onClick={() => setSelectedStory(VERBATIM_REAL_WEDDINGS[0])}
            className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
          >
            <span>View all Stories</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* 3 Real Wedding Cards with Real Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBATIM_REAL_WEDDINGS.map((story) => (
            <div 
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition group bg-white cursor-pointer flex flex-col justify-between"
            >
              <div className="h-60 overflow-hidden relative bg-gray-100">
                <img 
                  alt={story.couple} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  src={story.image}
                />
                <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-xs">
                  {story.date}
                </span>
                <span className="absolute top-3 right-3 bg-[#e72e77] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {story.location}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e72e77] transition mb-1">
                    {story.couple}
                  </h3>
                  <p className="text-[13px] text-[#666] line-clamp-2 mb-3">
                    {story.description}
                  </p>
                </div>
                <div className="text-[12px] font-semibold text-[#e72e77] flex items-center space-x-1">
                  <span>View Wedding Story</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Story Detail Lightbox Modal */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
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
    </section>
  );
}
