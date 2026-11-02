import React, { useState, useEffect } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { 
  IndianRupee, 
  QrCode, 
  Heart, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Gift, 
  Clock, 
  Check, 
  Copy,
  Crown,
  Printer
} from 'lucide-react';

export default function DigitalShagun({ onOpenStandee, showToast }) {
  const [shagunData, setShagunData] = useState({ shagunList: [], totalCollected: 0, totalBlessings: 0, upiId: "ananya.kabir@oksbi", qrCodeUrl: "" });
  const [guestName, setGuestName] = useState('');
  const [amount, setAmount] = useState('2100');
  const [blessing, setBlessing] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    fetchShagun();
  }, []);

  const fetchShagun = async () => {
    try {
      const res = await axios.get('/api/shagun');
      setShagunData(res.data);
    } catch (err) {
      console.warn('Failed to fetch shagun', err);
    }
  };

  const handleSendShagun = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    setSubmitting(true);
    try {
      const res = await axios.post('/api/shagun', {
        guestName: guestName || 'Family Well Wisher',
        amount: Number(amount),
        blessing: blessing || 'Sada Sukhi Raho! Enduring joy and blessings to the couple.'
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#9B111E', '#F3E5AB']
      });

      setShagunData(prev => ({
        ...prev,
        shagunList: [res.data, ...prev.shagunList],
        totalCollected: prev.totalCollected + Number(amount),
        totalBlessings: prev.totalBlessings + 1
      }));

      setGuestName('');
      setBlessing('');
      showToast(`Shagun of ₹${Number(amount).toLocaleString('en-IN')} sent with blessings! ✨`);
    } catch {
      showToast('Could not record shagun', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(shagunData.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
    showToast('UPI ID copied!');
  };

  const shagunPresets = [
    { label: 'Shubh', val: 501 },
    { label: 'Aashirwad', val: 1100 },
    { label: 'Royal', val: 2100 },
    { label: 'Grand', val: 5100 },
    { label: 'Maha Shagun', val: 11000 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-ruby/5 text-royal-ruby border border-royal-ruby/15 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-royal-gold" />
            <span>Digital Shagun & E-Blessings Registry</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Send Shagun & Warmest Blessings
          </h2>
          <p className="text-xs text-royal-muted mt-1">
            Empowering family & loved ones near and far to gift digital shagun directly via UPI with personalized blessings.
          </p>
        </div>

        {/* Actions & Total Tally Box */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {onOpenStandee && (
            <button
              onClick={onOpenStandee}
              className="px-4 py-2.5 rounded-2xl border border-royal-sand bg-white hover:bg-royal-pearl text-xs font-bold text-royal-wine shadow-sm transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-royal-gold" />
              <span>Print Table QR Standee</span>
            </button>
          )}

          <div className="bg-white px-5 py-3 rounded-2xl border border-royal-sand/80 shadow-card flex items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-muted block">Total Shagun Received</span>
              <span className="font-serif text-2xl font-bold text-royal-ruby">₹{shagunData.totalCollected.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-8 w-px bg-royal-sand" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-muted block">Blessings</span>
              <span className="font-serif text-2xl font-bold text-royal-charcoal">{shagunData.totalBlessings}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct UPI & Shagun Dispatch Form */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand/80 shadow-card relative overflow-hidden">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl royal-gradient-gold flex items-center justify-center text-white mx-auto mb-3 shadow-royal-gold">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-royal-charcoal">Direct Couple UPI QR</h3>
              <p className="text-xs text-royal-muted mt-0.5">Scan with GPay, PhonePe, Paytm or any BHIM UPI app</p>
            </div>

            {/* Simulated Clean QR Display */}
            <div className="p-4 bg-royal-sand/20 rounded-2xl border border-royal-sand/60 text-center max-w-[220px] mx-auto mb-5 shadow-xs">
              <img
                src={shagunData.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=ananya.kabir@oksbi&pn=Wedding%20Shagun"}
                alt="Shagun UPI QR"
                className="w-full h-auto rounded-xl border border-white shadow-xs"
              />
              <div className="mt-2 text-[10px] font-bold text-royal-charcoal">Ananya & Kabir Wedding Shagun</div>
            </div>

            {/* UPI ID Pill */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-royal-sand/30 border border-royal-sand/80 text-xs mb-6">
              <span className="font-semibold text-royal-charcoal truncate">{shagunData.upiId}</span>
              <button
                onClick={handleCopyUpi}
                className="px-2.5 py-1 rounded-xl bg-white text-royal-ruby border border-royal-sand font-bold text-[10px] flex items-center gap-1 shadow-xs hover:bg-royal-sand/30"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-royal-gold" />}
                <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
              </button>
            </div>

            {/* Shagun Form */}
            <form onSubmit={handleSendShagun} className="space-y-4 pt-4 border-t border-royal-sand/60">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-royal-ruby">
                Record Your Gift & Blessings
              </h4>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Your Name / Family</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh & Sunita Verma (Mama Ji)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
                />
              </div>

              {/* Shagun Presets */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1.5">Select Shagun Amount</label>
                <div className="grid grid-cols-5 gap-1.5 mb-2">
                  {shagunPresets.map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setAmount(String(p.val))}
                      className={`py-2 px-1 rounded-xl text-center transition ${
                        amount === String(p.val)
                          ? 'bridal-gradient-rose text-white font-bold shadow-xs'
                          : 'bg-stitch-ivory text-stitch-charcoal border border-stitch-border hover:bg-stitch-rose-wash font-semibold'
                      }`}
                    >
                      <span className="text-[9px] block text-royal-gold/90">{p.label}</span>
                      <span className="text-xs font-bold">₹{p.val}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount in ₹"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-xs font-bold p-3 rounded-2xl border border-royal-sand focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Heartfelt Blessing Note</label>
                <textarea
                  rows={2}
                  placeholder="Write a sweet blessing for Ananya & Kabir..."
                  value={blessing}
                  onChange={(e) => setBlessing(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-2xl bridal-gradient-rose text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Heart className="w-3.5 h-3.5 text-stitch-gold-light fill-current" />
                <span>{submitting ? 'Recording...' : 'Send Shagun & Blessing'}</span>
              </button>
            </form>

          </div>

        </div>

        {/* Right Column: Shagun Registry Ledger & Blessings Feed */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand/80 shadow-card">
            <div className="flex items-center justify-between border-b border-royal-sand/60 pb-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-royal-charcoal flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-royal-gold" />
                  <span>The Royal Shagun Registry & Blessings Feed</span>
                </h3>
                <p className="text-xs text-royal-muted mt-0.5">
                  Chronological record of family gifts, digital blessings, and congratulations.
                </p>
              </div>
            </div>

            {/* Blessings List */}
            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {shagunData.shagunList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-royal-sand/20 border border-royal-sand/70 hover:border-royal-gold/40 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-royal-charcoal">{item.guestName}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-royal-muted mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-royal-gold" />
                          {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-gray-400">{item.upiRef}</span>
                      </div>
                    </div>
                    
                    <span className="font-serif text-lg font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-xs text-royal-slate leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-royal-sand/40">
                    &ldquo;{item.blessing}&rdquo;
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
