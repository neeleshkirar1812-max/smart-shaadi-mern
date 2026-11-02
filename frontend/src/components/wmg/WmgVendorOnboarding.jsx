import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Users, Sparkles } from 'lucide-react';

export default function WmgVendorOnboarding({ onOpenVendorAuth }) {
  const benefits = [
    {
      title: 'High-Intent Direct Leads',
      description: 'Connect with verified couples actively shortlisting venues and booking wedding vendors in your city.',
      icon: Users
    },
    {
      title: 'WMG Verified Gold Badge',
      description: 'Stand out from competitors with an authenticated trust badge and verified customer reviews.',
      icon: ShieldCheck
    },
    {
      title: 'Studio CRM & Telemetry',
      description: 'Manage quote generation, lead triage, client notes, and HDFC wire disbursement tracking.',
      icon: TrendingUp
    },
    {
      title: '0% Commission Model',
      description: 'Keep 100% of your earnings on standard listing tiers with zero hidden booking commissions.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-r from-[#FAF3E0] via-[#FAF8F5] to-[#FFF0F5] border-t border-[#E8D8A6]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6D23] px-3 py-1 rounded-full bg-[#FAF3E0] border border-[#E8D8A6]">
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WedMeGood Partner Ecosystem</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715] leading-tight">
              Are You a Wedding Vendor? <br />
              <span className="text-[#E72E77]">Grow Your Business with India&apos;s #1 Portal</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              Join over 50,000+ top wedding banquets, photographers, makeup artists, and decorators. Get direct inquiries, showcase your portfolio, and supercharge your bookings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] flex items-center justify-center text-[#E72E77] flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1715]">{b.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">{b.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm bg-[#FAF8F5] p-6 rounded-3xl border border-gray-200/80 text-center space-y-4">
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                Partner Onboarding
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                List Your Business for Free
              </h3>
              <p className="text-xs text-gray-500">
                Create your verified profile in less than 3 minutes and start receiving direct inquiries.
              </p>

              <button
                onClick={() => onOpenVendorAuth('vendor')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#E72E77] hover:bg-[#B60056] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Register as a Vendor for Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No Setup Fee</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant Verification</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
