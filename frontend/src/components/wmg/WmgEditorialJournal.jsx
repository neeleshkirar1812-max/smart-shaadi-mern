import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Sparkles, X, Share2, Bookmark } from 'lucide-react';

export const EDITORIAL_ARTICLES = [
  {
    id: 'art1',
    category: 'Bridal Fashion & Couture',
    title: 'Top 10 Sabyasachi & Manish Malhotra Lehengas of 2026',
    excerpt: 'From deep vermillion heritage velvet zardozi to shimmering pastel metallics, explore the most anticipated bridal silhouettes and price estimates for this season.',
    readTime: '6 min read',
    author: 'Tarana Patel, Fashion Editor',
    date: 'Oct 28, 2026',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    content: `
### The 2026 Bridal Renaissance

Every Indian wedding season brings a redefining moment in bridal couture. For 2026, designers have turned back to rich imperial velvets, hand-beaten gold zardozi, and micro-embroidered storytelling dupattas.

#### 1. The Heritage Vermillion Velvet by Sabyasachi
Priced between ₹4,50,000 to ₹12,00,000, Sabyasachi’s latest 'Mewar' collection celebrates deep ruby tones bordered with antique dabka needlework. Pair it with double dupattas—one organza veil and one velvet shoulder drape.

#### 2. Shimmering Champagne Metallic by Manish Malhotra
A modern favorite for sangeet and cocktail galas, these lehengas feature micro-sequins, Swarovski crystal droplets, and dramatic floor-sweeping cape sleeves.

#### Styling Pro Tip
Always finalize your wedding jewellery before bridal lehenga necklines are cut. Kundan and Polki choker sets need wide sweetheart necklines for optimal framing.
    `
  },
  {
    id: 'art2',
    category: 'Destination Planning & Budgeting',
    title: 'How to Plan a 3-Day Luxury Destination Wedding in Rajasthan Under 40 Lakhs',
    excerpt: 'An insider guide to booking heritage havelis, locking off-peak pricing, negotiating banqueting corkage, and managing 150 guests without compromising on royal grandeur.',
    readTime: '8 min read',
    author: 'Vikramaditya Rathore, Destination Specialist',
    date: 'Nov 01, 2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    content: `
### Breaking Down the ₹40 Lakh Royal Dream

Destination weddings in Rajasthan do not need to cost crores. With tactical venue shortlisting and local vendor sourcing, a majestic 3-day royal experience is achievable.

#### The Budget Blueprint
* **Venue & Accommodation (150 guests, 2 nights):** ₹18,00,000 in Pushkar, Kumbhalgarh, or outskirts of Jaipur.
* **Catering (3 Dinners, 2 Lunches, High Teas):** ₹11,00,000 with authentic Rajasthani Dal Baati Churma and multi-cuisine counters.
* **Decor & Mandap:** ₹5,00,000 utilizing indigenous marigold, brass diyas, and printed Rajasthani canopies.
* **Photography & Cinematography:** ₹3,50,000 for candid storytelling and drone reels.
* **Music & Officiant:** ₹2,50,000 for local Manganiyar folk singers, DJ setup, and Vedic Pandit.

#### Secret Negotiation Hack
Book mid-week dates (Tuesday to Thursday) to unlock up to 35% discount on room tariffs and banquets!
    `
  },
  {
    id: 'art3',
    category: 'Sacred Rituals & Muhurat',
    title: 'Vedic Shubh Muhurat Dates & Auspicious Timings 2026–2027',
    excerpt: 'Complete astrological guide for Hindu Vivah, Anand Karaj, and Nikah auspicious dates based on planetary alignments and Nakshatras.',
    readTime: '5 min read',
    author: 'Pandit Rajesh Shastri, Vedic Astrologer',
    date: 'Nov 02, 2026',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    content: `
### Auspicious Planetary Alignments for 2026-2027

Astrological alignment (Kundali Milan and Shubh Lagna) remains the heartbeat of Indian wedding planning. Here are prime dates:

#### Peak Winter Muhurat (November - December 2026)
* **November:** 18th, 22nd, 24th, 28th (Grand Rohini Nakshatra)
* **December:** 4th, 9th, 14th, 19th

#### Spring & Summer Muhurat (January - May 2027)
* **January:** 17th, 21st, 26th
* **February:** 2nd, 8th, 12th, 16th, 23rd
* **April:** 18th, 22nd, 29th (Akshaya Tritiya - Infinite Prosperity)

Ensure venue bookings are initiated at least 9 months prior for these auspicious dates.
    `
  }
];

export default function WmgEditorialJournal() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section id="editorial-journal" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WMG Wedding Journal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
              Expert Wedding Guides & Fashion Edits
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Curated articles, budget hacks, trend forecasts, and Vedic Muhurat guides written by India&apos;s leading wedding editors.
            </p>
          </div>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1A1715]">
                  {article.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A1715] group-hover:text-[#E72E77] transition-colors leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-[#FFE088] font-bold">
                  {activeArticle.category}
                </span>
                <h2 className="font-serif text-2xl font-bold mt-1">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800">{activeArticle.author}</span>
                <span>{activeArticle.readTime} • {activeArticle.date}</span>
              </div>

              <div className="prose prose-sm text-[#2D2B2A] max-w-none space-y-4 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs font-bold"
                >
                  Done Reading
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
