import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Send, 
  X,
  Building2,
  Clock,
  CheckCircle2,
  Crown
} from 'lucide-react';

export default function VendorPortal({ bookings, onSendQuote, user, showToast }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [validUntil, setValidUntil] = useState('2026-11-15');

  const handleOpenQuoteModal = (booking) => {
    setSelectedBooking(booking);
    setQuoteAmount('');
    setQuoteMessage('');
  };

  const handleDispatchQuote = async (e) => {
    e.preventDefault();
    if (!quoteAmount) return;

    await onSendQuote(selectedBooking.id, {
      amount: quoteAmount,
      message: quoteMessage || 'Custom wedding package quotation.',
      validUntil
    });

    setSelectedBooking(null);
    showToast('Official quote dispatched to couple! 📜');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-royal-ruby block mb-1">
            Vendor Studio & B2B Dashboard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Partner Inquiries & Quotation Studio
          </h2>
          <p className="text-xs text-royal-muted mt-1">
            Review incoming couple booking inquiries, manage availability, and dispatch bespoke royal proposals.
          </p>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-2xl border border-royal-sand/80 text-xs font-bold text-royal-charcoal shadow-sm flex items-center gap-2">
          <Building2 className="w-4 h-4 text-royal-gold" />
          <span>Studio: <strong className="text-royal-ruby">{user?.name || 'The Wedmoire Studio & Films'}</strong></span>
        </div>
      </div>

      {/* Bookings & Inquiries List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-royal-sand/80 p-8 text-royal-muted">
            No incoming booking inquiries yet.
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-royal-sand/80 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-card-hover transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl font-bold text-royal-charcoal">
                    {b.coupleName}
                  </span>
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    b.status === 'quoted'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : b.status === 'confirmed'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-royal-slate">
                  <span className="flex items-center gap-1 font-semibold text-royal-charcoal">
                    <Briefcase className="w-3.5 h-3.5 text-royal-ruby" /> {b.eventType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-royal-gold" /> Dates: {b.eventDate}
                  </span>
                  <span>Budget: <strong className="text-royal-charcoal">{b.budget}</strong></span>
                </div>

                <p className="text-xs text-royal-slate bg-royal-sand/20 p-3.5 rounded-2xl border border-royal-sand/60 max-w-2xl font-medium">
                  &ldquo;{b.notes}&rdquo;
                </p>

                {b.quote && (
                  <div className="mt-2 text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 inline-block font-semibold">
                    ✅ Quote sent: ₹{b.quote.amount.toLocaleString('en-IN')} (Valid until {b.quote.validUntil})
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 self-end lg:self-center">
                <button
                  onClick={() => handleOpenQuoteModal(b)}
                  className="px-5 py-2.5 rounded-2xl royal-gradient-ruby text-white text-xs font-bold shadow-royal hover:shadow-luxury transition-all flex items-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5 text-royal-lightGold" />
                  <span>{b.quote ? 'Revise Quote' : 'Send Official Quote'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quote Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-royal-sand/80 relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 p-2 text-royal-muted hover:text-royal-charcoal rounded-full hover:bg-royal-sand/40"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-royal-ruby block mb-1">
              Official Quotation Studio
            </span>
            <h3 className="font-serif text-2xl font-bold text-royal-charcoal mb-4">
              Quote for {selectedBooking.coupleName}
            </h3>

            <form onSubmit={handleDispatchQuote} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Quoted Total Amount (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 250000"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="w-full text-sm font-bold p-3 rounded-2xl border border-royal-sand focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Offer Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-royal-sand focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Included Deliverables & Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Includes 2 Cinematographers + 4K Drone + Royal Layflat Album..."
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl royal-gradient-ruby text-white text-xs font-bold shadow-royal hover:shadow-luxury transition"
              >
                Dispatch Quote to Couple
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
