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
  Printer,
  Coins
} from 'lucide-react';

export default function DigitalShagun({ onOpenStandee, showToast }) {
  const [shagunData, setShagunData] = useState({ 
    shagunList: [
      { id: "s-1", guestName: "Rameshwar & Sunita Verma (Mama Ji)", amount: 11001, blessing: "Sada Sukhi Raho! Enduring joy and boundless prosperity to Ananya & Kabir.", time: "10 mins ago" },
      { id: "s-2", guestName: "Col. Vikramjit & Harpreet Singh", amount: 5101, blessing: "A very warm welcome to Ananya into our clan! Shubh Vivah!", time: "25 mins ago" },
      { id: "s-3", guestName: "Dr. Farooq & Parveen Qureshi", amount: 5101, blessing: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair.", time: "1 hour ago" },
      { id: "s-4", guestName: "Capt. Ronald & Evelyn D'Costa", amount: 2101, blessing: "May God bless your sacred holy union with endless laughter and grace.", time: "2 hours ago" }
    ], 
    totalCollected: 23304, 
    totalBlessings: 4, 
    upiId: "ananya.kabir@oksbi", 
    qrCodeUrl: "" 
  });
  const [guestName, setGuestName] = useState('');
  const [amount, setAmount] = useState('2101');
  const [blessing, setBlessing] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    fetchShagun();
  }, []);

  const fetchShagun = async () => {
    try {
      const res = await axios.get('/api/shagun');
      if (res.data && res.data.shagunList) {
        setShagunData(res.data);
      }
    } catch (err) {
      console.warn('Using default royal shagun fallback', err);
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
        blessing: blessing || 'Sada Sukhi Raho! Enduring joy and prosperity to the couple.'
      });

      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#E72E76', '#FBF4E8', '#1B4332']
      });

      setShagunData(prev => ({
        ...prev,
        shagunList: [res.data, ...prev.shagunList],
        totalCollected: prev.totalCollected + Number(amount),
        totalBlessings: prev.totalBlessings + 1
      }));

      setGuestName('');
      setBlessing('');
      showToast(`Shagun of ₹${Number(amount).toLocaleString('en-IN')} sent with sacred prosperity token (+₹1)! ✨`);
    } catch {
      // Local fallback
      const mockGift = {
        id: `s-${Date.now()}`,
        guestName: guestName || 'Family Well Wisher',
        amount: Number(amount),
        blessing: blessing || 'Sada Sukhi Raho! Enduring joy to the couple.',
        time: 'Just now'
      };
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#E72E76', '#FBF4E8']
      });
      setShagunData(prev => ({
        ...prev,
        shagunList: [mockGift, ...prev.shagunList],
        totalCollected: prev.totalCollected + Number(amount),
        totalBlessings: prev.totalBlessings + 1
      }));
      setGuestName('');
      setBlessing('');
      showToast(`Shagun of ₹${Number(amount).toLocaleString('en-IN')} recorded with blessings! ✨`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(shagunData.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
    showToast('Direct UPI ID copied to clipboard!');
  };

  // Indian prosperity token (+₹1) presets
  const shagunPresets = [
    { label: 'Shubh', val: 501 },
    { label: 'Aashirwad', val: 1101 },
    { label: 'Royal Shagun', val: 2101 },
    { label: 'Grand Mangal', val: 5101 },
    { label: 'Maha Shagun', val: 11001 },
    { label: 'Imperial Token', val: 21001 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stitch-rose-wash text-stitch-rose border border-stitch-rose/25 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-stitch-gold" />
            <span>0% Fee Digital Shagun UPI Registry</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stitch-charcoal">
            Send Digital Shagun & Prosperity Token (+₹1)
          </h2>
          <p className="text-xs text-stitch-charcoal-muted mt-1">
            Zero gateway cuts. 100% of your blessings transfer directly into Ananya & Kabir&apos;s verified bank account via UPI.
          </p>
        </div>

        {/* Actions & Tally */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {onOpenStandee && (
            <button
              onClick={onOpenStandee}
              className="px-4 py-2.5 rounded-2xl border border-stitch-border bg-white hover:bg-stitch-ivory text-xs font-bold text-stitch-rose shadow-xs transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-stitch-gold" />
              <span>Print Dining Table Standee</span>
            </button>
          )}

          <div className="bg-white px-5 py-3 rounded-2xl border border-stitch-border shadow-xs flex items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted block">Direct Shagun Received</span>
              <span className="font-serif text-2xl font-bold text-stitch-rose">₹{shagunData.totalCollected.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-8 w-px bg-stitch-border" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted block">Blessings Ledger</span>
              <span className="font-serif text-2xl font-bold text-stitch-charcoal">{shagunData.totalBlessings}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct UPI & Shagun Dispatch Form */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs relative overflow-hidden">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bridal-gradient-rose flex items-center justify-center text-white mx-auto mb-3 shadow-luxury ring-2 ring-stitch-gold/40">
                <QrCode className="w-8 h-8 text-stitch-gold-light" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stitch-charcoal">Direct Couple UPI QR</h3>
              <p className="text-xs text-stitch-charcoal-muted mt-0.5">Scan with GPay, PhonePe, Paytm, BHIM or any Banking App</p>
            </div>

            {/* Simulated Clean QR Display */}
            <div className="p-4 bg-stitch-ivory rounded-2xl border border-stitch-border text-center max-w-[220px] mx-auto mb-5 shadow-xs">
              <img
                src={shagunData.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=ananya.kabir@oksbi&pn=Wedding%20Shagun"}
                alt="Shagun UPI QR"
                className="w-full h-auto rounded-xl border border-white shadow-xs"
              />
              <div className="mt-2 text-[10px] font-bold text-stitch-charcoal">Ananya & Kabir Vivah Shagun</div>
            </div>

            {/* UPI ID Pill */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stitch-ivory border border-stitch-border text-xs mb-6">
              <span className="font-semibold text-stitch-charcoal truncate">{shagunData.upiId}</span>
              <button
                onClick={handleCopyUpi}
                className="px-2.5 py-1 rounded-xl bg-white text-stitch-rose border border-stitch-border font-bold text-[10px] flex items-center gap-1 shadow-xs hover:bg-stitch-ivory"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stitch-gold" />}
                <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
              </button>
            </div>

            {/* 0% Fee Guarantee Banner */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 font-medium flex items-center gap-2 mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>0% Platform Commission. Zero gateway deduction. Traditional sacred +₹1 token honored.</span>
            </div>

            {/* Shagun Form */}
            <form onSubmit={handleSendShagun} className="space-y-4 pt-4 border-t border-stitch-border">
              <div className="flex items-center justify-between">
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stitch-rose">
                  Record Gift & Heartfelt Aashirwad
                </h4>
                <span className="text-[10px] text-stitch-gold font-bold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  +₹1 Shagun Tradition
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">Your Name & Clan / Family</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar & Sunita Verma (Mama Ji)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
              </div>

              {/* Shagun Presets with Sacred +₹1 Token */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1.5">
                  Select Auspicious Shagun Preset (+₹1)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-2">
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
                      <span className="text-[8px] block opacity-80">{p.label}</span>
                      <span className="text-xs font-bold">₹{p.val}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount in ₹"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-xs font-bold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Heartfelt Blessing Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a sweet blessing for Ananya & Kabir..."
                  value={blessing}
                  onChange={(e) => setBlessing(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-2xl bridal-gradient-rose text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Heart className="w-3.5 h-3.5 text-stitch-gold-light fill-current" />
                <span>{submitting ? 'Recording Blessing...' : 'Dispatch Shagun & Prosperity Token'}</span>
              </button>
            </form>

          </div>

        </div>

        {/* Right Column: Shagun Registry Ledger & Blessings Feed */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs">
            <div className="flex items-center justify-between border-b border-stitch-border pb-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stitch-charcoal flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-stitch-gold" />
                  <span>Sacred Blessings Wall & Registry Feed</span>
                </h3>
                <p className="text-xs text-stitch-charcoal-muted mt-0.5">
                  Live digital envelope ledger celebrating affectionate wishes from family worldwide.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-stitch-gold-light text-stitch-charcoal border border-stitch-gold-border text-[10px] font-bold">
                {shagunData.shagunList?.length || 0} Registered Blessings
              </span>
            </div>

            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
              {shagunData.shagunList?.map((gift) => (
                <div
                  key={gift.id}
                  className="p-4 sm:p-5 rounded-2xl bg-stitch-ivory/60 border border-stitch-border hover:border-stitch-gold-border transition flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm sm:text-base text-stitch-charcoal">
                        {gift.guestName}
                      </span>
                      <span className="text-[10px] text-stitch-charcoal-muted">
                        • {gift.time || 'Auspicious Moment'}
                      </span>
                    </div>
                    <p className="text-xs text-stitch-charcoal-subtle italic leading-relaxed font-serif">
                      &ldquo;{gift.blessing}&rdquo;
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 bg-white px-3.5 py-2 rounded-xl border border-stitch-border shadow-xs self-start sm:self-center">
                    <span className="text-[9px] uppercase font-bold text-stitch-charcoal-muted block">Digital Shagun</span>
                    <span className="font-serif text-base font-bold text-stitch-rose">
                      ₹{Number(gift.amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
