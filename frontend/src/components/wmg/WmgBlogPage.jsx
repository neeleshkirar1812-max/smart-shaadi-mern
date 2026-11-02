import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Sparkles, 
  ArrowRight, 
  X, 
  Share2, 
  Bookmark, 
  BookOpen 
} from 'lucide-react';
import { VERBATIM_BLOGS } from './WmgEditorialJournal.jsx';

export const BLOG_CATEGORIES = [
  'All Articles',
  'Wedding Trends',
  'Bridal Fashion',
  'Real Weddings',
  'Celebrity Style',
  'Style & Tailoring',
  'Color Palettes'
];

export default function WmgBlogPage({ showToast }) {
  const [selectedCat, setSelectedCat] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const filteredBlogs = VERBATIM_BLOGS.filter((b) => {
    if (selectedCat !== 'All Articles' && b.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = b.title.toLowerCase().includes(q);
      const matchContent = b.content.toLowerCase().includes(q);
      if (!matchTitle && !matchContent) return false;
    }
    return true;
  });

  const featured = VERBATIM_BLOGS[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">Wedding Blog</span>
          {selectedCat !== 'All Articles' && (
            <>
              <span>›</span>
              <span className="text-[#e72e77] font-bold">{selectedCat}</span>
            </>
          )}
        </div>

        {/* Featured Editorial Hero */}
        {featured && (
          <div 
            onClick={() => setActiveArticle(featured)}
            className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 mb-10 group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 h-72 sm:h-96 overflow-hidden relative">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-[#e72e77] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Trending Editorial
                </span>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="text-[#e72e77] font-bold uppercase tracking-wider">{featured.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>3 min read</span>
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715] group-hover:text-[#e72e77] transition leading-snug">
                  {featured.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {featured.content}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e72e77] group-hover:underline">
                    <span>Read Full Editorial Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills & Search */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition shrink-0 border ${
                    selectedCat === cat
                      ? 'bg-[#e72e77] text-white border-[#e72e77] shadow-xs'
                      : 'bg-[#FAF8F5] text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 flex items-center bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 shrink-0">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search articles & trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs outline-none w-full text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => setActiveArticle(blog)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-2 text-[11px] text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>4 min read</span>
                  </div>
                  <h3 className="font-bold text-base text-[#1A1715] group-hover:text-[#e72e77] transition line-clamp-2 leading-snug mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-100 mt-2">
                <span className="text-xs font-bold text-[#e72e77] flex items-center space-x-1 pt-3">
                  <span>Read Article</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-80 bg-gray-100">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-[#FFE088] uppercase tracking-wider">
                  {activeArticle.category} • {activeArticle.date}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center space-x-3 text-xs text-gray-500 pb-3 border-b border-gray-100">
                <span>By <strong>WedMeGood Editorial Desk</strong></span>
                <span>•</span>
                <span>Published {activeArticle.date}</span>
                <span>•</span>
                <span>4 Min Read</span>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                {activeArticle.content}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#e72e77] mb-1">
                  💡 WedMeGood Stylist Advice
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Before confirming your vendors, verify their date availability for the current Shubh Muhurat window. You can get free expert assistance by connecting with our dedicated Genie team.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Read "${activeArticle.title}" on WedMeGood: ${window.location.href}`);
                    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                  }}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="w-full py-3 rounded-xl bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs transition"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
