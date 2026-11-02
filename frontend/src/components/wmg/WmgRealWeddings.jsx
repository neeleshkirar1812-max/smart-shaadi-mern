import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, ArrowRight, X } from 'lucide-react';

export const VERBATIM_REAL_WEDDINGS = [
  {
    id: 'rw-1',
    couple: 'Anjana Arjun & Isaiah Nutter',
    date: '19 Oct 2026',
    location: 'Tuscany, Italy',
    type: 'International Destination Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    description: 'An ethereal Tuscan villa celebration with romantic olive grove mandaps, Italian wine toasts, and sunset vows.',
    vendors: [
      { role: 'Venue', name: 'Villa Medicea di Lilliano, Tuscany' },
      { role: 'Photography', name: 'Stories by Joseph Radhik' },
      { role: 'Bridal Wear', name: 'Sabyasachi Heritage' }
    ]
  },
  {
    id: 'rw-2',
    couple: 'Krishna & Anan',
    date: '08 Jan 2026',
    location: 'Udaipur, Rajasthan',
    type: 'Royal Heritage Vivah',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    description: 'A grand royal union overlooking Lake Pichola with floating candle mandaps, Sufi Qawwali night, and royal Mewari thali feast.',
    vendors: [
      { role: 'Venue', name: 'The Leela Palace Udaipur' },
      { role: 'Photography', name: 'The Wedding Story' },
      { role: 'Makeup', name: 'Namrata Soni Haute Glam' }
    ]
  },
  {
    id: 'rw-3',
    couple: 'Shwetha & Prathmesh',
    date: '13 Dec 2025',
    location: 'South Goa',
    type: 'Sunset Coastal Celebration',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    description: 'Breezy beachfront vows with pastel floral arches, barefoot beach sangeet jam, and fresh coastal seafood gala.',
    vendors: [
      { role: 'Venue', name: 'Alila Diwa Goa' },
      { role: 'Photography', name: 'Colorblind Production' },
      { role: 'Decor', name: 'VLW Events Goa' }
    ]
  }
];

export default function WmgRealWeddings() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section id="real-weddings" className="py-14 bg-[#FAF8F5] border-t border-gray-200/70 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Real Couples, Real Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1715]">
              Real Wedding Stories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Explore real wedding stories with photos, venues, and tagged vendor credits.
            </p>
          </div>
        </div>

        {/* 3 Verbatim Real Wedding Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBATIM_REAL_WEDDINGS.map((wedding) => (
            <div
              key={wedding.id}
              onClick={() => setSelectedStory(wedding)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={wedding.image}
                    alt={wedding.couple}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#1A1715]">
                    {wedding.type}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#FFE088] transition-colors">
                      {wedding.couple}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-300 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#E72E77]" />
                        <span>{wedding.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>{wedding.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {wedding.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>View Story & Vendor Credits</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-64">
              <img
                src={selectedStory.image}
                alt={selectedStory.couple}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold text-[#FFE088]">
                  {selectedStory.type}
                </span>
                <h2 className="font-serif text-2xl font-bold mt-0.5">
                  {selectedStory.couple}
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  {selectedStory.date} • {selectedStory.location}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-serif text-base font-bold text-[#1A1715] mb-1">
                  The Celebration
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {selectedStory.description}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#1A1715] mb-2">
                  Tagged Vendor Credits
                </h4>
                <div className="space-y-2">
                  {selectedStory.vendors.map((v, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                      <span className="font-bold text-[#E72E77]">{v.role}</span>
                      <span className="font-semibold text-gray-800">{v.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-5 py-2 rounded-xl bg-[#E72E77] text-white text-xs font-bold"
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
