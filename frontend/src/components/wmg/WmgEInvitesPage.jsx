import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Heart, 
  Layers,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CARD_THEMES = [
  {
    id: 'royal-gold',
    name: 'Royal Rajputana Gold',
    bg: 'bg-gradient-to-b from-[#6B1D2F] to-[#2D0A12]',
    border: 'border-[#D4AF37]',
    textColor: 'text-[#F5E6C8]',
    accentColor: 'text-[#D4AF37]',
    font: 'font-serif',
    emblem: '👑'
  },
  {
    id: 'pastel-floral',
    name: 'Pastel Blush Flora',
    bg: 'bg-gradient-to-b from-[#FFF0F5] to-[#FCE4EC]',
    border: 'border-[#E72E77]/40',
    textColor: 'text-[#2C2C2C]',
    accentColor: 'text-[#E72E77]',
    font: 'font-sans',
    emblem: '🌸'
  },
  {
    id: 'vedic-vermillion',
    name: 'Vedic Vivah Vermillion',
    bg: 'bg-gradient-to-b from-[#991B1B] to-[#7F1D1D]',
    border: 'border-[#FDE047]',
    textColor: 'text-[#FEF08A]',
    accentColor: 'text-[#FACC15]',
    font: 'font-serif',
    emblem: '🕉️'
  },
  {
    id: 'modern-luxury',
    name: 'Champagne Minimalist',
    bg: 'bg-gradient-to-b from-[#1A1715] to-[#262422]',
    border: 'border-[#E5E7EB]/40',
    textColor: 'text-[#FFFFFF]',
    accentColor: 'text-[#E5E7EB]',
    font: 'font-sans',
    emblem: '✨'
  }
];

export default function WmgEInvitesPage({ showToast }) {
  const [formData, setFormData] = useState({
    brideName: 'Ananya Sharma',
    groomName: 'Kabir Singhania',
    eventTitle: 'Together With Their Families',
    date: '2026-11-28',
    time: '05:30 PM Onwards',
    venue: 'The Leela Palace Udaipur',
    city: 'Udaipur, Rajasthan',
    rsvpPhone: '+91 98290 12345',
    blessing: 'Cordially invite you to celebrate our auspicious Saat Phere and Wedding Gala.'
  });

  const [activeTheme, setActiveTheme] = useState(CARD_THEMES[0]);
  const [copied, setCopied] = useState(false);

  const handleShareWhatsApp = () => {
    const inviteText = encodeURIComponent(
      `💌 Wedding Invitation!\n\n` +
      `We, ${formData.brideName} & ${formData.groomName}, cordially invite you to celebrate our wedding!\n\n` +
      `📅 Date: ${formData.date} at ${formData.time}\n` +
      `📍 Venue: ${formData.venue}, ${formData.city}\n\n` +
      `RSVP: ${formData.rsvpPhone}\n` +
      `View our digital couple website & details on WedMeGood.`
    );
    window.open(`https://api.whatsapp.com/send?text=${inviteText}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '?invite=' + encodeURIComponent(formData.brideName));
    setCopied(true);
    if (showToast) showToast('Digital Invitation link copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (showToast) showToast('E-Invite ready! Download saved to your device. 🎨');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans">
      <div className="wmg-container">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5 font-medium">
          <span className="hover:text-[#e72e77] cursor-pointer">Home</span>
          <span>›</span>
          <span className="text-gray-900 font-bold">E-Invites &amp; Wedding Cards</span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e72e77] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Digital Wedding Atelier</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A1715]">
            Digital Wedding Invitations &amp; WhatsApp Cards
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Design bespoke digital wedding cards with personalized typography, export print-ready invitations, and share them seamlessly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1715] flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#e72e77]" />
                <span>1. Select Invitation Theme</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {CARD_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center space-x-2.5 ${
                      activeTheme.id === theme.id
                        ? 'border-[#e72e77] bg-pink-50 ring-2 ring-[#e72e77]/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{theme.emblem}</span>
                    <span className="text-xs font-bold text-gray-800">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="font-serif text-lg font-bold text-[#1A1715]">
                2. Customize Wedding Details
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Bride Name</label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Groom Name</label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Auspicious Tagline</label>
                <input
                  type="text"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Wedding Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Muhurat / Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Palace / Venue</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City, State</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">RSVP Mobile Number</label>
                <input
                  type="text"
                  value={formData.rsvpPhone}
                  onChange={(e) => setFormData({ ...formData, rsvpPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#e72e77]"
                />
              </div>

            </div>

            {/* Sharing Action Buttons */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleDownloadCard}
                className="bg-[#e72e77] hover:bg-[#d11f67] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Live Invitation Preview Card */}
          <div className="lg:col-span-6 flex flex-col items-center sticky top-24">
            
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <span>Interactive Live Preview</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>

            {/* Digital Invitation Card Container */}
            <div className={`w-full max-w-md ${activeTheme.bg} rounded-[32px] p-8 sm:p-10 border-4 ${activeTheme.border} shadow-2xl relative text-center overflow-hidden transition-all duration-500`}>
              
              {/* Inner Decorative Border */}
              <div className={`border border-dashed ${activeTheme.border} rounded-2xl p-6 sm:p-8 space-y-5 relative`}>
                
                {/* Emblem */}
                <div className="text-3xl mb-1">{activeTheme.emblem}</div>

                <div className="space-y-1">
                  <span className={`text-[11px] uppercase tracking-widest font-bold ${activeTheme.accentColor} block`}>
                    {formData.eventTitle}
                  </span>
                  <div className="w-12 h-0.5 bg-current mx-auto opacity-30 mt-2" />
                </div>

                {/* Couple Names in Grand Typography */}
                <div className="py-2">
                  <h2 className={`${activeTheme.font} text-2xl sm:text-3xl font-bold tracking-tight ${activeTheme.textColor}`}>
                    {formData.brideName}
                  </h2>
                  <span className={`text-base font-serif italic ${activeTheme.accentColor} my-1 block`}>
                    &amp;
                  </span>
                  <h2 className={`${activeTheme.font} text-2xl sm:text-3xl font-bold tracking-tight ${activeTheme.textColor}`}>
                    {formData.groomName}
                  </h2>
                </div>

                <p className={`text-xs ${activeTheme.textColor} opacity-90 leading-relaxed font-sans max-w-xs mx-auto`}>
                  {formData.blessing}
                </p>

                {/* Date & Time */}
                <div className={`p-3 rounded-xl bg-black/20 backdrop-blur-xs border border-white/10 ${activeTheme.textColor} text-xs font-medium space-y-1`}>
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5 opacity-80" />
                    <span>{formData.date}</span>
                  </div>
                  <div className="text-[11px] opacity-80">{formData.time}</div>
                </div>

                {/* Venue & City */}
                <div className={`space-y-0.5 ${activeTheme.textColor}`}>
                  <div className="flex items-center justify-center gap-1 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 opacity-80" />
                    <span>{formData.venue}</span>
                  </div>
                  <p className="text-[11px] opacity-75">{formData.city}</p>
                </div>

                {/* RSVP Details */}
                <div className="pt-2 border-t border-white/15">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${activeTheme.accentColor}`}>
                    RSVP: {formData.rsvpPhone}
                  </span>
                </div>

              </div>

            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Generated via WedMeGood E-Invites Studio • 100% Free
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
