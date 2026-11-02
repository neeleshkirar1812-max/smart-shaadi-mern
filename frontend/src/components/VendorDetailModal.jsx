import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Award, 
  Calendar, 
  Send, 
  ShieldCheck,
  Check,
  Crown,
  MessageCircle
} from 'lucide-react';

export default function VendorDetailModal({ vendor, onClose, onSubmitInquiry, user, onRequireLogin }) {
  if (!vendor) return null;

  const [eventDate, setEventDate] = useState('2026-11-28');
  const [eventType, setEventType] = useState('Full Wedding & Ceremony Package');
  const [budget, setBudget] = useState(vendor.price);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      onRequireLogin();
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitInquiry({
        vendorId: vendor.id,
        vendorName: vendor.name,
        eventDate,
        eventType,
        budget,
        notes: notes || `Inquiry for ${vendor.name} for our upcoming wedding in ${vendor.city}.`
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2200);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stitch-border my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Cover */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={vendor.coverImage || vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-charcoal via-royal-charcoal/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stitch-gold-light border border-white/20">
                  {vendor.category}
                </span>
                {vendor.verified && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-stitch-gold-light/95 backdrop-blur-md text-stitch-charcoal border border-stitch-gold-border text-[10px] sm:text-xs font-bold shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-stitch-gold" />
                    Verified Partner
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {vendor.name}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-stitch-gold" />
                  {vendor.city}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stitch-rose text-white font-bold text-xs shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {vendor.rating} ({vendor.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <div className="text-right bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 shadow-lg">
              <span className="text-[10px] text-gray-300 block uppercase font-bold tracking-wider">Pricing Starts At</span>
              <span className="font-serif text-2xl font-bold text-stitch-gold-light">{vendor.price}</span>
              <span className="text-xs text-gray-300 block">/{vendor.priceUnit}</span>
            </div>
          </div>
        </div>

        {/* Modal Body: Split into Profile & Inquiry Form */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-royal-ruby mb-2">
                About The Studio
              </h4>
              <p className="text-xs sm:text-sm text-royal-slate leading-relaxed">
                {vendor.description}
              </p>
            </div>

            {/* Badges / Stats */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-royal-sand/30 border border-royal-sand/80 text-center">
              <div>
                <Award className="w-5 h-5 text-royal-ruby mx-auto mb-1" />
                <span className="text-xs font-bold text-royal-charcoal block">{vendor.experience || '8+ Years'}</span>
                <span className="text-[10px] text-royal-muted uppercase">Experience</span>
              </div>
              <div>
                <Calendar className="w-5 h-5 text-royal-ruby mx-auto mb-1" />
                <span className="text-xs font-bold text-royal-charcoal block">{vendor.eventsDone || '200+'}</span>
                <span className="text-[10px] text-royal-muted uppercase">Weddings Done</span>
              </div>
              <div>
                <ShieldCheck className="w-5 h-5 text-royal-ruby mx-auto mb-1" />
                <span className="text-xs font-bold text-royal-charcoal block">100% Quality</span>
                <span className="text-[10px] text-royal-muted uppercase">Verified Seal</span>
              </div>
            </div>

            {/* Highlights & Tags */}
            <div>
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-royal-muted mb-3">
                Ceremonial Specialties
              </h4>
              <div className="flex flex-wrap gap-2">
                {vendor.faithTags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-royal-ruby/5 text-royal-ruby border border-royal-ruby/20 text-xs font-bold shadow-xs"
                  >
                    ✨ {tag}
                  </span>
                ))}
                {vendor.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-white border border-royal-sand text-xs font-semibold text-royal-slate shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Line */}
            <div className="pt-4 border-t border-royal-sand/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-royal-muted gap-2">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-royal-gold" />
                Direct Concierge Hotline: <strong className="text-royal-charcoal">{vendor.contact || "+91 98290 12345"}</strong>
              </span>
              <span className="text-emerald-700 font-bold">Direct Studio Rate</span>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-5 bg-royal-sand/20 rounded-3xl p-6 border border-royal-sand/80 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-royal-charcoal">Inquiry Dispatched!</h3>
                <p className="text-xs text-royal-slate leading-relaxed">
                  Your request has been forwarded directly to <strong>{vendor.name}</strong>. Their studio coordinator will share an official quotation shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-royal-charcoal">
                    Request Direct Quotation
                  </h3>
                  <p className="text-xs text-royal-muted mt-1">
                    Connect directly without intermediaries or extra fees.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">
                    Wedding / Ceremony Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-royal-sand focus:outline-none focus:border-royal-ruby shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">
                    Ceremony Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-royal-sand focus:outline-none focus:border-royal-ruby shadow-xs"
                  >
                    <option value="Full Wedding & Ceremony Package">Full Wedding & Ceremony Package</option>
                    <option value="Main Vivah / Nikah / Anand Karaj">Main Vivah / Nikah / Anand Karaj</option>
                    <option value="Sangeet / Qawwali / Cocktail Night">Sangeet / Qawwali / Cocktail Night</option>
                    <option value="Haldi / Manjha / Mehendi Event">Haldi / Manjha / Mehendi Event</option>
                    <option value="Grand Walima / Reception Gala">Grand Walima / Reception Gala</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">
                    Expected Budget Range
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹1,50,000"
                    className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-royal-sand focus:outline-none focus:border-royal-ruby shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">
                    Special Requirements & Guest Count
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. 350 guests expected, lakeview mandap setup needed..."
                    className="w-full text-xs p-3 rounded-2xl bg-white border border-royal-sand focus:outline-none focus:border-royal-ruby shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-2xl bridal-gradient-rose text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-stitch-gold-light" />
                  <span>{submitting ? 'Dispatching...' : 'Dispatch Inquiry to Studio'}</span>
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="h-px bg-royal-sand flex-1" />
                  <span className="text-[10px] uppercase font-bold text-gray-400">or instant connect</span>
                  <div className="h-px bg-royal-sand flex-1" />
                </div>

                <a
                  href={`https://wa.me/919829012345?text=${encodeURIComponent(`Namaste! I found ${vendor.name} on Smart Shaadi. We are planning our wedding on ${eventDate} in ${vendor.city} and would like to check availability and package details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-100" />
                  <span>Chat Direct on WhatsApp</span>
                </a>

                <p className="text-[10px] text-royal-muted text-center">
                  🔒 Zero spam. Direct studio coordination guaranteed.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
