import React, { useState } from 'react';

export const VERBATIM_REAL_WEDDINGS = [
  {
    id: 'rw-1',
    couple: 'Anjana Arjun and Isaiah Nutter',
    date: '19 October 2026',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    description: "Inside Arjun Sarja's Daughter Anjana Arjun's Dreamy Italian Wedding! Traditional South Indian rituals in romantic Tuscany.",
    details: 'Traditional South Indian rituals celebrated amidst the rolling Tuscan hills. From sacred Kanyadaan under an olive grove to sunset Italian dining, every frame was pure elegance.'
  },
  {
    id: 'rw-2',
    couple: 'Krishna and Anan',
    date: '08 January 2026',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    description: 'Lake Como Vibes, But Make It Udaipur! This Wedding Was All Kinds Of Stunning with floating mandaps and fireworks over Lake Pichola.',
    details: 'Floating crystal mandap on Lake Pichola, private royal boat arrivals for the baraat, and a 1000-candle Sufi sangeet under the star-lit Mewari skies.'
  },
  {
    id: 'rw-3',
    couple: 'Shwetha and Prathmesh',
    date: '13 December 2025',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    description: 'Sun-drenched Goa Cross-Culture Nuptials with personalized pastel decor, Sufi sangeet night, and acoustic beach vows.',
    details: 'Barefoot beach pheras on the pristine white sands of South Goa, pastel floral canopies, and a live acoustic sunset jam that transitioned into an electric sangeet.'
  }
];

export default function WmgRealWeddings() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section className="py-12 bg-white font-sans" id="real-weddings">
      <div className="wmg-container">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBATIM_REAL_WEDDINGS.map((story) => (
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in">
            <div className="relative h-64">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.couple} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {selectedStory.date}
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">{selectedStory.couple}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[14px] text-[#4a4a4a] leading-relaxed mb-4">
                {selectedStory.description}
              </p>
              <p className="text-[13px] text-[#777] leading-relaxed bg-[#f8f8f8] p-4 rounded-xl border border-[#eee]">
                {selectedStory.details}
              </p>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition"
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
