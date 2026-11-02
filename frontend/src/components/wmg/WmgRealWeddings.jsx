import React, { useState } from 'react';
import { Sparkles, Heart, MapPin, Users, IndianRupee, Camera, Brush, Paintbrush, ArrowRight, X, ExternalLink } from 'lucide-react';

export const REAL_WEDDINGS_DATA = [
  {
    id: 'rw1',
    couple: 'Ananya & Kabir',
    title: 'A Royal Regal Vivah at The Leela Palace',
    city: 'Udaipur, Rajasthan',
    tradition: 'Hindu Vivah',
    budget: '₹1.5 Cr+',
    guests: '350 Guests',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    story: 'Ananya and Kabir wanted a sunset lake wedding reflecting Mewari heritage. With floating candle mandaps on Lake Pichola, 7-course royal thali curated by heritage chefs, and a Sufi Qawwali sangeet, their celebration was an unforgettable royal spectacle.',
    vendors: [
      { role: 'Venue', name: 'The Leela Palace Udaipur' },
      { role: 'Photography', name: 'Stories by Joseph Radhik' },
      { role: 'Bridal Makeup', name: 'Namrata Soni Haute Glam' },
      { role: 'Decor', name: 'Devika Narain & Co.' },
      { role: 'Bridal Wear', name: 'Sabyasachi Mukherjee' }
    ]
  },
  {
    id: 'rw2',
    couple: 'Simran & Harman',
    title: 'A Serene Anand Karaj amidst Rolling Hills',
    city: 'Chandigarh / Mohali',
    tradition: 'Sikh Anand Karaj',
    budget: '₹85 Lakhs',
    guests: '450 Guests',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    story: 'Surrounded by pine-scented hills, Simran and Harman tied the knot through sacred 4 Laavan blessings at the Gurudwara followed by a whimsical pastel brunch lawn reception featuring live acoustic Punjabi folk performances.',
    vendors: [
      { role: 'Venue', name: 'Forest Hill Golf & Country Resort' },
      { role: 'Photography', name: 'The Wedding Story' },
      { role: 'Bridal Makeup', name: 'Parul Garg HD Studio' },
      { role: 'Decor', name: 'The Millennial Minx' }
    ]
  },
  {
    id: 'rw3',
    couple: 'Zoya & Rehan',
    title: 'A Majestic Nizami Nikah at Taj Falaknuma',
    city: 'Hyderabad, Telangana',
    tradition: 'Muslim Nikah',
    budget: '₹1.8 Cr',
    guests: '500 Guests',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=1000&q=80'
    ],
    story: 'From horse-drawn royal carriages to candlelit jade courtyards and the iconic 101-seater dining table serving slow-cooked dum biryani, Zoya and Rehan’s Nikah honored centuries of Nizami grandeur and poetry.',
    vendors: [
      { role: 'Venue', name: 'Taj Falaknuma Palace' },
      { role: 'Photography', name: 'House On The Clouds' },
      { role: 'Bridal Makeup', name: 'Aliya Baig Makeovers' },
      { role: 'Attire', name: 'Manish Malhotra Couture' }
    ]
  },
  {
    id: 'rw4',
    couple: 'Priyanka & David',
    title: 'Sunset Beach Vows & Tropical Gala',
    city: 'South Goa',
    tradition: 'Christian / Fusion',
    budget: '₹70 Lakhs',
    guests: '200 Guests',
    coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80'
    ],
    story: 'A breezy coastal union with white floral arches set right on pristine sands. Guests danced barefoot to live brass jazz while enjoying fresh Goan coastal seafood and coconut rum cocktails.',
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
    <section id="real-weddings" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Real Couples, Real Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
              WedMeGood Real Weddings
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Get inspired by actual couple celebrations across India. View budget breakdowns, decor setups, and tagged vendor credits.
            </p>
          </div>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REAL_WEDDINGS_DATA.map((wedding) => (
            <div
              key={wedding.id}
              onClick={() => setSelectedStory(wedding)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={wedding.coverImage}
                  alt={wedding.couple}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Tradition & City Tags */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1A1715]">
                  {wedding.tradition}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-[#FFE088]">
                    {wedding.couple}
                  </p>
                  <h3 className="font-serif text-base font-bold leading-tight line-clamp-2">
                    {wedding.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E72E77]" />
                      <span>{wedding.city}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-gray-700">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>{wedding.guests}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <IndianRupee className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Estimated Budget: {wedding.budget}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      <span className="font-semibold text-gray-700">Key Vendors: </span>
                      {wedding.vendors.map(v => `${v.name}`).join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>View Story & Credits</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Story & Vendor Credits Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Reel */}
            <div className="relative h-72">
              <img
                src={selectedStory.coverImage}
                alt={selectedStory.couple}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#FFE088] font-bold">
                  {selectedStory.tradition} • {selectedStory.city}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {selectedStory.couple}
                </h2>
                <p className="text-sm text-gray-200 mt-0.5">
                  {selectedStory.title}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Stat Chips */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 text-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Budget</span>
                  <span className="font-bold text-[#1A1715]">{selectedStory.budget}</span>
                </div>
                <div className="border-x border-gray-200">
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Guest Count</span>
                  <span className="font-bold text-[#1A1715]">{selectedStory.guests}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Destination</span>
                  <span className="font-bold text-[#1A1715]">{selectedStory.city.split(',')[0]}</span>
                </div>
              </div>

              {/* Story Narrative */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#1A1715] mb-2">
                  The Couple&apos;s Story
                </h4>
                <p className="text-sm text-[#6B6866] leading-relaxed">
                  {selectedStory.story}
                </p>
              </div>

              {/* Verified Vendor Credits */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#1A1715] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Verified Wedding Vendor Credits
                </h4>
                <div className="space-y-2.5">
                  {selectedStory.vendors.map((vendor, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E72E77] block">
                          {vendor.role}
                        </span>
                        <span className="font-bold text-gray-800 text-sm">
                          {vendor.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        WMG Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs font-bold"
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
