import React from 'react';
import { 
  CheckSquare, 
  Calculator, 
  Users, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Armchair,
  ShieldCheck 
} from 'lucide-react';

export default function WmgPlanningToolsSuite({ setView, onOpenStandee }) {
  const tools = [
    {
      id: 'checklist',
      title: 'Wedding Checklist',
      subtitle: '120+ Auspicious Vedic & Modern Tasks',
      description: 'From booking mandap priests 12 months out to final safa tying on the wedding day. Never miss an important ritual.',
      icon: CheckSquare,
      badge: '120 Tasks',
      color: 'from-amber-500 to-amber-700',
      actionText: 'Open Wedding Checklist',
      action: () => setView('planner')
    },
    {
      id: 'budget',
      title: 'Wedding Budget Calculator',
      subtitle: 'Dynamic % Corpus Allocation & Shield',
      description: 'Real-time expenditure tracking with anti-fraud Price Shield validation across venue, catering, decor, and couture.',
      icon: Calculator,
      badge: 'Smart Calculator',
      color: 'from-[#E72E77] to-[#B60056]',
      actionText: 'Calculate Budget',
      action: () => setView('planner')
    },
    {
      id: 'guests',
      title: 'Guest List & Seating Atelier',
      subtitle: 'Clan Balance, Dietary Matrices & CAD Map',
      description: 'Track bride/groom clan headcounts, Satvik/Jain/Halal diets, and arrange 8-seater circular banquet tables.',
      icon: Users,
      badge: 'RSVP Engine',
      color: 'from-emerald-600 to-teal-800',
      actionText: 'Manage Guest List',
      action: () => setView('guests')
    },
    {
      id: 'invites',
      title: 'Digital E-Invites & QR Standees',
      subtitle: 'WhatsApp Cards & Live Photo Drop',
      description: 'Generate bespoke wedding websites, digital RSVP links, and print-ready QR standees for reception dining tables.',
      icon: Mail,
      badge: 'WhatsApp Ready',
      color: 'from-purple-600 to-indigo-800',
      actionText: 'View E-Invites & Site',
      action: () => setView('website')
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E72E77] mb-2">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Digital Wedding Office</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715]">
            Everything You Need to Plan Your Wedding
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Comprehensive digital planning suite to manage budgets, guest lists, auspicious checklists, and table seating with zero stress.
          </p>
        </div>

        {/* 4-Card Interactive Feature Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={tool.action}
                className="group cursor-pointer rounded-3xl bg-white p-6 border border-gray-100 hover:border-[#E8D8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF8F5] text-gray-700 border border-gray-200">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1A1715] group-hover:text-[#E72E77] transition-colors leading-tight">
                    {tool.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4AF37] mt-1">
                    {tool.subtitle}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#E72E77] group-hover:text-[#B60056]">
                  <span>{tool.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
