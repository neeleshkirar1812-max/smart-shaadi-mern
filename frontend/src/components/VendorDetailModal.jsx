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
  MessageCircle,
  FileText,
  Users,
  Utensils,
  Maximize2,
  Sparkles,
  Download,
  Printer
} from 'lucide-react';

export default function VendorDetailModal({ vendor, onClose, onSubmitInquiry, user, onRequireLogin }) {
  if (!vendor) return null;

  const [activeImage, setActiveImage] = useState(vendor.coverImage || vendor.image);
  const [eventDate, setEventDate] = useState('2026-11-28');
  const [eventType, setEventType] = useState('Full Wedding & Ceremony Package');
  const [guestCount, setGuestCount] = useState(350);
  const [cateringPlan, setCateringPlan] = useState('veg'); // veg or both
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showFormalQuote, setShowFormalQuote] = useState(false);

  const imageList = vendor.imageReel && vendor.imageReel.length > 0
    ? vendor.imageReel
    : [vendor.coverImage || vendor.image, vendor.image];

  // Calculated estimates for quote
  const vegRateNum = vendor.vegPlatePrice ? parseInt(vendor.vegPlatePrice.replace(/[^0-9]/g, '')) || 4800 : 4800;
  const nonVegRateNum = vendor.nonVegPlatePrice ? parseInt(vendor.nonVegPlatePrice.replace(/[^0-9]/g, '')) || 5800 : 5800;
  const plateRate = cateringPlan === 'both' ? nonVegRateNum : vegRateNum;
  const cateringSubtotal = plateRate * guestCount;
  const venueRentNum = parseInt(vendor.price.replace(/[^0-9]/g, '')) || 850000;
  const totalEstimatedCost = venueRentNum + (vendor.category === 'Venue' ? cateringSubtotal : 0);

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
        budget: `₹${totalEstimatedCost.toLocaleString('en-IN')}`,
        notes: notes || `Formal Inquiry for ${vendor.name} (${guestCount} guests, ${cateringPlan} catering) for our upcoming wedding in ${vendor.city}.`
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stitch-border my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Interactive Image Reel */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden group">
          <img
            src={activeImage}
            alt={vendor.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Thumbnails reel */}
          {imageList.length > 1 && (
            <div className="absolute top-4 left-6 z-20 flex gap-2 overflow-x-auto no-scrollbar py-1">
              {imageList.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-stitch-gold scale-105 shadow-luxury ring-2 ring-white/50' : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stitch-gold-light border border-white/20">
                  {vendor.category}
                </span>
                {vendor.verified && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-stitch-gold-light/95 backdrop-blur-md text-stitch-charcoal border border-stitch-gold-border text-[10px] sm:text-xs font-bold shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-stitch-gold" />
                    Verified Luxury Partner
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-emerald-900/80 backdrop-blur-md text-emerald-200 border border-emerald-500/30 text-[10px] sm:text-xs font-semibold">
                  🛡️ SmartShaadi Price Shield
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                {vendor.name}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-300">
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-4 h-4 text-stitch-gold" />
                  {vendor.city}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stitch-rose text-white font-bold text-xs shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {vendor.rating} ({vendor.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <div className="text-right bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-lg">
              <span className="text-[10px] text-gray-300 block uppercase font-bold tracking-wider">Base Tariff</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stitch-gold-light">{vendor.price}</span>
              <span className="text-xs text-gray-300 block">/{vendor.priceUnit}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[65vh] overflow-y-auto">
          
          {/* Left Details: Specs & Per-Plate Pricing */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-stitch-rose mb-2">
                Palace Dossier & Heritage Profile
              </h4>
              <p className="text-xs sm:text-sm text-stitch-charcoal-subtle leading-relaxed font-sans">
                {vendor.description}
              </p>
            </div>

            {/* Per Plate Pricing Highlight (Mandatory for Palace & Banquet) */}
            {(vendor.vegPlatePrice || vendor.nonVegPlatePrice) && (
              <div className="p-4 rounded-2xl bg-stitch-rose-wash/60 border border-stitch-rose/25">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-4 h-4 text-stitch-rose" />
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stitch-rose">
                    Royal Banquet Culinary Tariff (Per Plate)
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3.5 rounded-xl border border-stitch-border shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted block">
                      Satvik & Pure Veg Plate
                    </span>
                    <span className="font-serif text-xl font-bold text-stitch-charcoal mt-0.5 block">
                      {vendor.vegPlatePrice || '₹4,800'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                      ✓ Includes Jain Chauvihar Live Counters
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-stitch-border shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted block">
                      Non-Veg & Mughlai Plate
                    </span>
                    <span className="font-serif text-xl font-bold text-stitch-charcoal mt-0.5 block">
                      {vendor.nonVegPlatePrice || '₹5,800'}
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                      ✓ 100% Halal Certified Dum Pukht
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Banquet & Architecture Specs */}
            {vendor.banquetSpecs && (
              <div className="p-4 rounded-2xl bg-stitch-ivory border border-stitch-border">
                <div className="flex items-center gap-2 mb-3">
                  <Maximize2 className="w-4 h-4 text-stitch-gold" />
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stitch-charcoal">
                    Architectural & Banquet Specifications
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-stitch-border">
                    <span className="text-[10px] text-stitch-charcoal-muted block">Indoor Ballroom</span>
                    <strong className="text-stitch-charcoal block">{vendor.banquetSpecs.indoorSqFt}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stitch-border">
                    <span className="text-[10px] text-stitch-charcoal-muted block">Outdoor Lawns</span>
                    <strong className="text-stitch-charcoal block">{vendor.banquetSpecs.outdoorSqFt}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stitch-border">
                    <span className="text-[10px] text-stitch-charcoal-muted block">Guest Capacity</span>
                    <strong className="text-stitch-charcoal block">{vendor.banquetSpecs.minGuests} - {vendor.banquetSpecs.maxGuests} Guests</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stitch-border">
                    <span className="text-[10px] text-stitch-charcoal-muted block">Floating Lawns</span>
                    <strong className="text-stitch-charcoal block">{vendor.banquetSpecs.floatingLawns ? 'Yes (Lakeside Deck)' : 'Standard Baradari'}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stitch-border">
                    <span className="text-[10px] text-stitch-charcoal-muted block">Valet Parking</span>
                    <strong className="text-stitch-charcoal block">{vendor.banquetSpecs.parkingCapacity}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stitch-border">
                    <span className="text-[10px] text-stitch-charcoal-muted block">Luxury Rooms</span>
                    <strong className="text-stitch-charcoal block">{vendor.banquetSpecs.roomsCount}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Badges / Experience Stats */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-stitch-border shadow-xs text-center">
              <div>
                <Award className="w-5 h-5 text-stitch-rose mx-auto mb-1" />
                <span className="text-xs font-bold text-stitch-charcoal block">{vendor.experience || '15+ Years'}</span>
                <span className="text-[10px] text-stitch-charcoal-muted uppercase">Royal Lineage</span>
              </div>
              <div>
                <Calendar className="w-5 h-5 text-stitch-rose mx-auto mb-1" />
                <span className="text-xs font-bold text-stitch-charcoal block">{vendor.eventsDone || '500+'}</span>
                <span className="text-[10px] text-stitch-charcoal-muted uppercase">Weddings Hosted</span>
              </div>
              <div>
                <ShieldCheck className="w-5 h-5 text-stitch-rose mx-auto mb-1" />
                <span className="text-xs font-bold text-stitch-charcoal block">Price Shield</span>
                <span className="text-[10px] text-stitch-charcoal-muted uppercase">100% Rate Lock</span>
              </div>
            </div>

            {/* Faith Tags */}
            <div>
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-stitch-charcoal-muted mb-3">
                Ceremonial Specialties Supported
              </h4>
              <div className="flex flex-wrap gap-2">
                {vendor.faithTags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-stitch-rose-wash text-stitch-rose border border-stitch-rose/25 text-xs font-bold shadow-xs"
                  >
                    ✨ {tag}
                  </span>
                ))}
                {vendor.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-stitch-ivory border border-stitch-border text-xs font-semibold text-stitch-charcoal-subtle shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Hotline */}
            <div className="pt-4 border-t border-stitch-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stitch-charcoal-muted gap-2">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stitch-gold" />
                Direct Concierge Hotline: <strong className="text-stitch-charcoal">{vendor.contact || "+91 98290 12345"}</strong>
              </span>
              <span className="text-emerald-700 font-bold">Zero Brokerage Guarantee</span>
            </div>
          </div>

          {/* Right Column: Quote Generator & Inquiry Form */}
          <div className="lg:col-span-5 bg-stitch-ivory rounded-3xl p-6 border border-stitch-border shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stitch-charcoal">Official Inquiry Dispatched!</h3>
                <p className="text-xs text-stitch-charcoal-subtle leading-relaxed">
                  Your formal dossier for <strong>{vendor.name}</strong> has been secured. The studio wedding coordinator will share official contracts and booking slots shortly.
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-800 font-medium">
                  ✓ Price Shield locked: No seasonal surcharges will apply.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stitch-charcoal">
                      Formal Quote & Booking Desk
                    </h3>
                    <p className="text-xs text-stitch-charcoal-muted mt-0.5">
                      Direct palace contract with zero agent commissions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFormalQuote(!showFormalQuote)}
                    className="p-2 rounded-xl bg-white border border-stitch-border hover:border-stitch-rose text-stitch-rose text-xs font-bold flex items-center gap-1 shadow-xs"
                    title="Toggle Interactive Quote Breakdown"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{showFormalQuote ? 'Hide Breakdown' : 'Preview Estimate'}</span>
                  </button>
                </div>

                {/* Live Quote Breakdown Preview */}
                {showFormalQuote && (
                  <div className="p-3.5 bg-white rounded-2xl border border-stitch-gold-border shadow-sm space-y-2 animate-in fade-in duration-200 text-xs">
                    <div className="flex justify-between text-stitch-charcoal-muted">
                      <span>Palace Venue Rental ({eventType})</span>
                      <strong className="text-stitch-charcoal">₹{venueRentNum.toLocaleString('en-IN')}</strong>
                    </div>
                    {vendor.category === 'Venue' && (
                      <div className="flex justify-between text-stitch-charcoal-muted">
                        <span>Catering ({guestCount} guests @ ₹{plateRate.toLocaleString('en-IN')}/plate)</span>
                        <strong className="text-stitch-charcoal">₹{cateringSubtotal.toLocaleString('en-IN')}</strong>
                      </div>
                    )}
                    <div className="border-t border-stitch-border pt-1.5 flex justify-between font-bold text-stitch-charcoal">
                      <span>Total Estimated Cost</span>
                      <span className="font-serif text-stitch-rose text-sm">₹{totalEstimatedCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 bg-emerald-50 p-1.5 rounded-lg text-center font-semibold">
                      🛡️ Covered under SmartShaadi Escrow & Price Shield
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Ceremony & Wedding Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-stitch-border focus:outline-none focus:border-stitch-rose shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={3000}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-stitch-border focus:outline-none focus:border-stitch-rose shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                      Catering Preference
                    </label>
                    <select
                      value={cateringPlan}
                      onChange={(e) => setCateringPlan(e.target.value)}
                      className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-stitch-border focus:outline-none focus:border-stitch-rose shadow-xs"
                    >
                      <option value="veg">Pure Veg / Jain</option>
                      <option value="both">Veg + Non-Veg (Halal)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Ceremonial Package Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl bg-white border border-stitch-border focus:outline-none focus:border-stitch-rose shadow-xs"
                  >
                    <option value="Full Wedding & Ceremony Package">Full 3-Day Wedding Package (Phere + Sangeet + Reception)</option>
                    <option value="Main Vivah / Nikah / Anand Karaj">Main Ceremony Only (Saat Phere / Nikah / Anand Karaj)</option>
                    <option value="Sangeet / Qawwali / Cocktail Night">Grand Sangeet & Cocktail Night Gala</option>
                    <option value="Haldi / Manjha / Mehendi Event">Courtyard Haldi & Mehendi Celebration</option>
                    <option value="Grand Walima / Royal Reception">Grand Walima / Royal Banquet Reception</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Bespoke Notes & Architectural Requests
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Floating mandap over Lake Pichola, baraat vintage car access..."
                    className="w-full text-xs p-3 rounded-2xl bg-white border border-stitch-border focus:outline-none focus:border-stitch-rose shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-2xl bridal-gradient-rose text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-stitch-gold-light" />
                  <span>{submitting ? 'Generating Official Dossier...' : 'Dispatch Formal Quote Request'}</span>
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="h-px bg-stitch-border flex-1" />
                  <span className="text-[10px] uppercase font-bold text-stitch-charcoal-muted">or instant concierge</span>
                  <div className="h-px bg-stitch-border flex-1" />
                </div>

                <a
                  href={`https://wa.me/919829012345?text=${encodeURIComponent(`Namaste! I am interested in ${vendor.name} on SmartShaadi for ${guestCount} guests on ${eventDate}. Please connect us with the palace sales director.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-100" />
                  <span>Direct Palace Sales WhatsApp</span>
                </a>

                <p className="text-[10px] text-stitch-charcoal-muted text-center">
                  🔒 Zero spam. Direct luxury studio coordinator guaranteed.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
