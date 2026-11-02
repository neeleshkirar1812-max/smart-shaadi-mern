import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Send, 
  X,
  Building2,
  Clock,
  CheckCircle2,
  Crown,
  DollarSign,
  ShieldCheck,
  CreditCard,
  FileCheck,
  Filter,
  Check,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { initialGovernance } from '../data/governance.js';

export default function VendorPortal({ bookings = [], onSendQuote, user, showToast }) {
  const [activeTab, setActiveTab] = useState('triage'); // triage, muhurat, disbursements
  const [triageFilter, setTriageFilter] = useState('all'); // all, new, quoted, confirmed

  // Quote Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [validUntil, setValidUntil] = useState('2026-11-20');
  const [submittingQuote, setSubmittingQuote] = useState(false);

  // Wire disbursements
  const [disbursements, setDisbursements] = useState(initialGovernance.escrowReleases);
  const muhuratDates = initialGovernance.shubhMuhuratCalendar;

  const defaultMockBookings = [
    {
      id: "b-1",
      coupleName: "Ananya & Kabir",
      eventType: "Full 3-Day Palace Wedding & Mandap Package",
      eventDate: "2026-11-28",
      budget: "₹8,50,000",
      notes: "Mandap over Lake Pichola, 350 guests expected, require Jain Chauvihar catering coordination.",
      status: "new",
      receivedTime: "2 hours ago"
    },
    {
      id: "b-2",
      coupleName: "Rohan & Simran",
      eventType: "Sangeet & Cocktail Night Gala",
      eventDate: "2026-12-12",
      budget: "₹4,20,000",
      notes: "Sufi Qawwali stage setup + high-energy sound system with limiter compliance.",
      status: "quoted",
      receivedTime: "1 day ago"
    },
    {
      id: "b-3",
      coupleName: "Devendra & Priyadarshini",
      eventType: "Royal Vivah & Anand Karaj Reception",
      eventDate: "2026-12-14",
      budget: "₹12,00,000",
      notes: "Grand Durbar Hall banquet + vintage car baraat entry.",
      status: "confirmed",
      receivedTime: "3 days ago"
    }
  ];

  const currentBookings = bookings.length > 0 ? bookings : defaultMockBookings;

  const filteredBookings = triageFilter === 'all'
    ? currentBookings
    : currentBookings.filter(b => b.status === triageFilter);

  const handleOpenQuoteModal = (booking) => {
    setSelectedBooking(booking);
    setQuoteAmount(booking.budget ? booking.budget.replace(/[^0-9]/g, '') : '850000');
    setQuoteMessage(`Namaste ${booking.coupleName}! We are delighted to confirm our studio availability for your celebrations on ${booking.eventDate}.`);
  };

  const handleDispatchQuote = async (e) => {
    e.preventDefault();
    if (!quoteAmount) return;

    setSubmittingQuote(true);
    try {
      if (onSendQuote) {
        await onSendQuote(selectedBooking.id, {
          amount: `₹${Number(quoteAmount).toLocaleString('en-IN')}`,
          message: quoteMessage,
          validUntil
        });
      }
      setSelectedBooking(null);
      showToast('Formal luxury quotation dispatched to couple! 📜');
    } catch {
      showToast('Quote saved in offline studio registry');
      setSelectedBooking(null);
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stitch-rose-wash text-stitch-rose border border-stitch-rose/25 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-stitch-gold" />
            <span>Vendor Studio Portal & Escrow Disbursements</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stitch-charcoal">
            Studio Lead Triage & Bank Wire Center
          </h2>
          <p className="text-xs text-stitch-charcoal-muted mt-1">
            Manage couple inquiries, verify Shubh Muhurat calendar availability, and track HDFC escrow wire disbursements.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-white p-1 rounded-2xl border border-stitch-border shadow-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('triage')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'triage'
                ? 'bridal-gradient-rose text-white shadow-luxury'
                : 'text-stitch-charcoal-subtle hover:text-stitch-rose'
            }`}
          >
            Lead Triage ({currentBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('muhurat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'muhurat'
                ? 'bridal-gradient-rose text-white shadow-luxury'
                : 'text-stitch-charcoal-subtle hover:text-stitch-rose'
            }`}
          >
            Shubh Muhurat Calendar
          </button>
          <button
            onClick={() => setActiveTab('disbursements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'disbursements'
                ? 'bridal-gradient-rose text-white shadow-luxury'
                : 'text-stitch-charcoal-subtle hover:text-stitch-rose'
            }`}
          >
            HDFC Wire Disbursements
          </button>
        </div>
      </div>

      {/* 1. LEAD TRIAGE TAB */}
      {activeTab === 'triage' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Triage Filter Pills */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Inquiries' },
              { id: 'new', label: 'New Leads' },
              { id: 'quoted', label: 'Quoted & Under Review' },
              { id: 'confirmed', label: 'Confirmed & Escrowed' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTriageFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  triageFilter === f.id
                    ? 'bridal-gradient-rose text-white shadow-luxury'
                    : 'bg-white text-stitch-charcoal border border-stitch-border hover:bg-stitch-ivory'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Inquiries Cards */}
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stitch-border shadow-xs hover:border-stitch-gold transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-xl font-bold text-stitch-charcoal">
                        {b.coupleName}
                      </h3>
                      <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'quoted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status === 'confirmed' ? '✓ Escrow Secured' : b.status === 'quoted' ? 'Quote Dispatched' : 'Action Required'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stitch-charcoal-subtle font-medium">
                      <span className="flex items-center gap-1 text-stitch-charcoal font-semibold">
                        <Briefcase className="w-3.5 h-3.5 text-stitch-rose" />
                        {b.eventType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stitch-gold" />
                        Date: <strong>{b.eventDate}</strong>
                      </span>
                      <span>Target Budget: <strong className="text-stitch-rose font-serif">{b.budget}</strong></span>
                    </div>

                    <p className="text-xs text-stitch-charcoal-subtle bg-stitch-ivory p-3.5 rounded-2xl border border-stitch-border max-w-2xl font-sans">
                      &ldquo;{b.notes}&rdquo;
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 lg:items-end flex-shrink-0">
                    <button
                      onClick={() => handleOpenQuoteModal(b)}
                      className="px-5 py-2.5 rounded-xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5 text-stitch-gold-light" />
                      <span>{b.status === 'quoted' ? 'Update Proposal' : 'Dispatch Formal Quote'}</span>
                    </button>
                    <a
                      href={`https://wa.me/919829012345?text=${encodeURIComponent(`Hello ${b.coupleName}! Regarding your wedding inquiry for ${b.eventDate}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-stitch-ivory hover:bg-stitch-rose-wash text-stitch-charcoal text-xs font-bold border border-stitch-border text-center transition"
                    >
                      Instant WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. SHUBH MUHURAT CALENDAR TAB */}
      {activeTab === 'muhurat' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stitch-charcoal flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-stitch-gold" />
                  <span>Auspicious Shubh Muhurat Calendar 2026</span>
                </h3>
                <p className="text-xs text-stitch-charcoal-muted mt-0.5">
                  Vedic planetary nakshatras & high-demand royal wedding dates. Peak rates and escrow locking apply.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {muhuratDates.map((m, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-stitch-ivory border border-stitch-border hover:border-stitch-gold transition space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-stitch-charcoal">{m.date}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stitch-gold-light border border-stitch-gold-border text-stitch-charcoal text-[10px] font-bold">
                      {m.day}
                    </span>
                  </div>
                  <div className="text-xs text-stitch-charcoal-subtle space-y-1">
                    <p>Nakshatra: <strong className="text-stitch-charcoal">{m.nakshatra}</strong></p>
                    <p>Tithi: <strong className="text-stitch-charcoal">{m.tithi}</strong></p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-stitch-border text-[11px] text-stitch-rose font-semibold">
                    ✨ {m.suitability}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. HDFC WIRE DISBURSEMENTS TAB */}
      {activeTab === 'disbursements' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stitch-charcoal flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-stitch-gold" />
                  <span>HDFC Escrow Wire Disbursement Tracker</span>
                </h3>
                <p className="text-xs text-stitch-charcoal-muted mt-0.5">
                  Funds held safely in SmartShaadi Dual-Signatory Escrow Custody and released upon milestone completion.
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
                ✓ Bank Account: HDFC Bank Current A/C ****8231 (KYC Verified)
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stitch-ivory border-b border-stitch-border text-stitch-charcoal-muted uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Milestone Description</th>
                    <th className="py-3 px-4">Couple Name</th>
                    <th className="py-3 px-4">Bank Reference</th>
                    <th className="py-3 px-4 text-right">Escrow Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stitch-border font-medium">
                  {disbursements.map((d) => (
                    <tr key={d.id} className="hover:bg-stitch-ivory/50 transition">
                      <td className="py-4 px-4 font-bold text-stitch-charcoal">{d.milestone}</td>
                      <td className="py-4 px-4 text-stitch-charcoal-subtle">{d.coupleName}</td>
                      <td className="py-4 px-4 font-mono text-[11px] text-stitch-charcoal">{d.bankWireRef}</td>
                      <td className="py-4 px-4 text-right font-serif font-bold text-stitch-charcoal text-sm">
                        ₹{d.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          d.status.includes('Disbursed')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {d.status.includes('Disbursed') ? <Check className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quote Proposal Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-stitch-charcoal mb-1">
              Dispatch Formal Luxury Quote
            </h3>
            <p className="text-xs text-stitch-charcoal-muted mb-4">
              To: <strong>{selectedBooking.coupleName}</strong> • Date: {selectedBooking.eventDate}
            </p>

            <form onSubmit={handleDispatchQuote} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Final Package Price (₹)
                </label>
                <input
                  type="number"
                  required
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="w-full text-base font-serif font-bold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Quotation Valid Until
                </label>
                <input
                  type="date"
                  required
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Scope of Services & Custom Mandap Inclusions
                </label>
                <textarea
                  rows={3}
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 font-medium">
                ✓ Once couple signs, 25% advance will be locked in SmartShaadi Escrow.
              </div>

              <button
                type="submit"
                disabled={submittingQuote}
                className="w-full py-3.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury"
              >
                {submittingQuote ? 'Locking in Escrow...' : 'Send Formal Quote to Couple'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
