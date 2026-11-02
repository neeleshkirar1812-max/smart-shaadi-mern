import React from 'react';
import { Sparkles, ShieldCheck, Heart, ArrowRight, Brush, Crown, Building2 } from 'lucide-react';

export default function WmgInhouseServices({ onSelectService, onOpenGenie }) {
  const services = [
    {
      id: 'wedsta',
      title: 'Wedsta',
      subtitle: 'WMG At Home, Family Makeup Services',
      description: 'Certified luxury bridal makeup & hair stylists at your doorstep with sanitized high-end vanity kits.',
      badge: 'WMG SERVICE',
      badgeColor: 'bg-[#E72E77]',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
      actionText: 'Book Wedsta Artist',
      action: () => onOpenGenie('Wedsta')
    },
    {
      id: 'genie',
      title: 'Genie Services',
      subtitle: 'Plan your dream wedding in your budget',
      description: 'Dedicated personal wedding manager assigned to your celebration. Shortlist vendors and negotiate prices for free.',
      badge: '100% FREE',
      badgeColor: 'bg-[#D4AF37]',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      actionText: 'Get Free Genie Advisor',
      action: () => onOpenGenie('Genie')
    },
    {
      id: 'venue-booking',
      title: 'Venue Booking Service',
      subtitle: 'Best Price Guaranteed',
      description: 'Guaranteed lowest rates on 4-star, 5-star, and heritage palaces with 0% cancellation price shield.',
      badge: 'BEST PRICE',
      badgeColor: 'bg-emerald-600',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      actionText: 'Explore Verified Venues',
      action: () => onSelectService('Venue')
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-1">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>WMG Inhouse Services</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715]">
            Curated Services by WedMeGood
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Handpicked, standardized inhouse wedding solutions delivered with complete quality assurance.
          </p>
        </div>

        {/* 3 Dedicated Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={srv.action}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#FAF8F5] border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${srv.badgeColor}`}>
                    {srv.badge}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#FFE088] font-medium mt-0.5">
                      {srv.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>{srv.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
