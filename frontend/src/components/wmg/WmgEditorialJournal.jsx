import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export const VERBATIM_LATEST_BLOGS = [
  {
    id: 'blog-1',
    category: 'Wedding Trends',
    title: 'Move Over Champagne Towers: Hydration Bars Are The New Trend!',
    date: '02 Nov 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Move over sugar-loaded cocktails and champagne pyramids. Contemporary couples are embracing luxury cold-pressed hydration bars, infused herbal elixirs, and fresh coconut counters for daytime sangeets.',
    content: `
### The Rise of Wellness at Indian Weddings

Gone are the days when alcohol towers were the only signature drink installations. Couples in 2026 are introducing artisanal hydration bars featuring:
- Tender coconut water stamped with customized monogram stamps.
- Botanical detox elixirs: hibiscus rose, lavender lemongrass, and cucumber mint.
- Freshly brewed Kashmiri Kahwa and iced matcha bars for afternoon mehendi.

It keeps guests refreshed, energetic, and ready to dance all night long!
    `
  },
  {
    id: 'blog-2',
    category: 'Real Decor',
    title: 'A Karjat Farmhouse Wedding With A Tree Mandap That Stole The Show',
    date: '30 Oct 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Set under a 100-year-old banyan tree, this couple exchanged Saat Phere surrounded by marigold root cascades, brass urlis, and warm fairy lights in lush Karjat hills.',
    content: `
### Tree Mandap Inspiration

Rather than fabricating synthetic truss structures, the couple embraced nature. The ancient banyan tree became the mandap canopy, adorned with:
- 10,000 fresh marigold ropes cascading like golden rain.
- Hand-beaten brass urlis with floating lotus flowers and camphor candles.
- Low-slung charpai floor seating with block-printed Rajasthani cushions.

A true celebration of sustainable luxury!
    `
  },
  {
    id: 'blog-3',
    category: 'Celebrity Style',
    title: 'Who Wore What For Karwachauth 2026, Bollywood Edition!',
    date: '30 Oct 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    excerpt: 'From classic red Benarasi weaves to minimal organza kurtas with vintage polki chokers, here is our comprehensive breakdown of Bollywood’s festive fashion.',
    content: `
### Bollywood Festive Glam 2026

Red made a triumphant, unapologetic comeback on Karwachauth 2026:
- Deep crimson handloom Banarasi brocade sarees paired with velvet embroidered blouses.
- Raw uncut diamond polki chokers and Chandbali earrings.
- Micro-potli bags and gajra-adorned braided buns.

Explore all celebrity looks and styling recommendations directly on WedMeGood.
    `
  }
];

export default function WmgEditorialJournal() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section id="editorial-journal" className="py-14 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WMG Wedding Journal</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1715]">
              Latest From The Blog
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Read stories, ideas and expert wedding planning tips.
            </p>
          </div>
        </div>

        {/* 3 Verbatim Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBATIM_LATEST_BLOGS.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#1A1715]">
                    {article.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1A1715] group-hover:text-[#E72E77] transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>Read Full Article</span>
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
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-60">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold text-[#FFE088]">
                  {activeArticle.category}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100">
                <span>{activeArticle.date}</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="prose prose-sm text-gray-700 whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                {activeArticle.content}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-xl bg-[#E72E77] text-white text-xs font-bold"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
