import React, { useState } from 'react';

export const VERBATIM_BLOGS = [
  {
    id: 'b-1',
    category: 'Wedding Trends',
    title: 'Move Over Champagne Towers, The Espresso Martini Tower Is Here!',
    date: '28 October 2026',
    image: 'https://image.wedmegood.com/resized-nw/500X300/wp-content/uploads/2026/10/hydration-station.jpg',
    content: 'Move over classic champagne flutes: Indian sangeet nights and cocktail sundowners are embracing the viral Espresso Martini Tower! From bespoke coffee beans to artisanal liqueur pairings, couples are creating immersive cocktail experiences.'
  },
  {
    id: 'b-2',
    category: 'Real Weddings',
    title: 'A Karjat Farmhouse Wedding With A Gorgeous Glass Mandap!',
    date: '26 October 2026',
    image: 'https://image.wedmegood.com/resized-nw/500X300/wp-content/uploads/2026/10/Collage18.jpg',
    content: 'Nestled between the Sahyadri mountains of Karjat, this rustic farmhouse nuptial featured an all-glass mandap surrounded by tranquil reflection pools, fairy-lit orchards, and heirloom floral rangolis.'
  },
  {
    id: 'b-3',
    category: 'Celebrity Style',
    title: 'Who Wore What For Karwachauth 2026: Celebrity Round Up',
    date: '21 October 2026',
    image: 'https://image.wedmegood.com/resized-nw/500X300/wp-content/uploads/2026/10/Collage19.jpg',
    content: 'From scarlet red Banarasi silks with real gold zari borders to emerald green tissue organza sarees, Bollywood leading ladies brought high editorial couture to their festive rooftop celebrations.'
  },
  {
    id: 'b-4',
    category: 'Bridal Fashion',
    title: '15 Sister-of-the-Groom Outfit Ideas That Stole The Show',
    date: '18 October 2026',
    image: 'https://image.wedmegood.com/resized-nw/500X300/uploads/2026/10/sister-of-groomss-tanya.jpg',
    content: 'From pre-stitched concept sarees to vibrant mirror-work lehengas, these handpicked bridesmaid and sister-of-the-groom ensembles strike the perfect balance between high glam and effortless movement.'
  },
  {
    id: 'b-5',
    category: 'Style & Tailoring',
    title: 'The Ultimate Bridal Blouse Tailoring & Neckline Guide',
    date: '14 October 2026',
    image: 'https://image.wedmegood.com/resized-nw/500X300/uploads/2026/10/tailor.jpg',
    content: 'Deep sweethearts, square plunge necklines, or traditional boat cuts? Expert bridal stylists break down the exact cuts that flatter your lehenga blouse and jewelry proportions.'
  },
  {
    id: 'b-6',
    category: 'Color Palettes',
    title: '10 Winter Wedding Color Palettes That Look Royal',
    date: '09 October 2026',
    image: 'https://image.wedmegood.com/resized-nw/500X300/uploads/2026/11/Collage.jpg',
    content: 'Step aside standard pastels: velvet jewel tones like emerald green, midnight navy, and antique ruby are dominating North Indian winter mandap decors.'
  }
];

export default function WmgEditorialJournal() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section className="py-12 bg-white font-sans" id="blog">
      <div className="wmg-container">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c]">Latest Blogs</h2>
            <p className="text-[14px] text-[#777] mt-1">Trends, fashion insights, budget guides and astrological muhurats</p>
          </div>
          <button 
            onClick={() => setActiveArticle(VERBATIM_BLOGS[0])}
            className="text-[#e72e77] font-bold text-[14px] hover:underline flex items-center space-x-1"
          >
            <span>View all Blogs</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* 3 Blog Cards with Real Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBATIM_BLOGS.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => setActiveArticle(blog)}
              className="border border-[#e4e4e4] rounded-xl overflow-hidden hover:shadow-wmg transition group bg-white cursor-pointer flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden relative bg-gray-100">
                <img 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  src={blog.image}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#e72e77] uppercase tracking-wider mb-1">
                    {blog.category}
                  </p>
                  <h3 className="font-bold text-[16px] text-[#2c2c2c] group-hover:text-[#e72e77] transition line-clamp-2 mb-2">
                    {blog.title}
                  </h3>
                </div>
                <p className="text-[12px] text-[#888]">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in">
            <div className="relative h-64 bg-gray-100">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                ✕
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-[#e72e77] text-white text-[11px] font-bold px-2 py-0.5 rounded w-max mb-1">
                  {activeArticle.category}
                </span>
                <p className="text-xs text-gray-200">{activeArticle.date}</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-3 leading-snug">
                {activeArticle.title}
              </h3>
              <p className="text-[14px] text-[#555] leading-relaxed mb-6">
                {activeArticle.content}
              </p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition"
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
