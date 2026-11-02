import React from 'react';
import { Star, ShieldCheck, Heart, Award, Sparkles, Quote, CheckCircle2 } from 'lucide-react';

export const MEDIA_LOGOS = [
  { name: 'Vogue India', tagline: 'The Ultimate Wedding Authority' },
  { name: 'Forbes', tagline: 'Top Wedding Tech Innovator' },
  { name: 'The Economic Times', tagline: 'India\'s Largest Wedding Portal' },
  { name: 'Harper\'s Bazaar Bride', tagline: 'Luxury Wedding Trendsetter' },
  { name: 'Business Standard', tagline: 'Leader in Event Tech' }
];

export const COUPLE_TESTIMONIALS = [
  {
    couple: 'Rhea & Aditya',
    city: 'Jaipur Heritage Wedding',
    rating: 5,
    quote: 'WedMeGood Genie saved us over ₹6 Lakhs on our palace booking in Jaipur! The verified vendor price shield gave our parents immense peace of mind.',
    badge: 'Verified Bride'
  },
  {
    couple: 'Manan & Tanya',
    city: 'Delhi NCR Vivah',
    rating: 5,
    quote: 'The digital RSVP and dietary matrices were a lifesaver. Being able to track pure Jain meals for 150 relatives separately avoided all wedding chaos.',
    badge: 'Verified Groom'
  },
  {
    couple: 'Meher & Danish',
    city: 'Udaipur Lakeside Nikah',
    rating: 5,
    quote: 'Found our photographer and makeup artist within 48 hours. The transparent per-plate pricing and honest reviews are unlike any other site.',
    badge: 'Verified Couple'
  }
];

export default function WmgTrustSocialProof() {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Big Numbers Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-14 border-b border-gray-200">
          <div className="text-center p-4">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-[#E72E77] block">
              2.5 Million+
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mt-1 block">
              Registered Couples
            </span>
            <span className="text-[11px] text-gray-500">Across 100+ Indian cities</span>
          </div>

          <div className="text-center p-4">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-[#D4AF37] block">
              50,000+
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mt-1 block">
              Verified Vendors
            </span>
            <span className="text-[11px] text-gray-500">100% physically vetted spaces</span>
          </div>

          <div className="text-center p-4">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-emerald-600 block">
              4.8 ★
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mt-1 block">
              Average App Rating
            </span>
            <span className="text-[11px] text-gray-500">Over 100,000+ App store reviews</span>
          </div>

          <div className="text-center p-4">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1715] block">
              ₹0 Cost
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mt-1 block">
              Free Genie Concierge
            </span>
            <span className="text-[11px] text-gray-500">Zero commission on couples</span>
          </div>
        </div>

        {/* Media Mentions & Press Badges */}
        <div className="py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Featured & Recognized By Global Publications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {MEDIA_LOGOS.map((media) => (
              <div key={media.name} className="text-center">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-gray-800 block">
                  {media.name}
                </span>
                <span className="text-[9px] text-gray-400 block">{media.tagline}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Couple Testimonials */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715]">
              Loved by Millions of Indian Families
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Read real stories from couples who planned their celebration on WedMeGood / SmartShaadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUPLE_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {t.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#1A1715]">{t.couple}</h4>
                    <p className="text-[11px] text-gray-400">{t.city}</p>
                  </div>
                  <Heart className="w-4 h-4 text-[#E72E77] fill-[#E72E77]" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
