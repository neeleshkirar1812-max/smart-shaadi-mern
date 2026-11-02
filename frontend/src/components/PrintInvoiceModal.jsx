import React from 'react';
import { 
  Printer, 
  X, 
  Download, 
  Sparkles, 
  Crown, 
  CheckCircle, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export default function PrintInvoiceModal({ wedding, onClose, showToast }) {
  const coupleName = wedding?.coupleName || 'Ananya Sharma & Kabir Singhania';
  const weddingDate = wedding?.weddingDate || '2026-11-28';
  const city = wedding?.city || 'Udaipur, Rajasthan';
  const budget = wedding?.budget || {};

  // Standard budget categories fallback or from wedding
  const categories = budget?.categories || [
    { name: 'Palace Venue & Royal Suites', allocated: 2200000, spent: 2200000, status: 'Paid in Full' },
    { name: 'Royal Banquets & Multi-Faith Catering', allocated: 1500000, spent: 1100000, status: 'Partial (Advance Paid)' },
    { name: 'Bridal Heritage Couture & Groom Sherwani', allocated: 800000, spent: 750000, status: 'Paid in Full' },
    { name: 'Cinematography & Drone Production', allocated: 600000, spent: 300000, status: 'Advance 50%' },
    { name: 'Soundstage, DJ & Live Dhol Symphony', allocated: 450000, spent: 250000, status: 'Booked' },
    { name: 'Sacred Rituals, Officiants & Flora Decor', allocated: 450000, spent: 350000, status: 'Confirmed' }
  ];

  const totalAllocated = categories.reduce((sum, c) => sum + (c.allocated || 0), 0);
  const totalSpent = categories.reduce((sum, c) => sum + (c.spent || 0), 0);
  const balanceOutstanding = Math.max(0, totalAllocated - totalSpent);

  const invoiceNumber = `SS-ROYAL-${new Date().getFullYear()}-0892`;
  const invoiceDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const lines = categories.map((c, i) => 
      `${i + 1}. ${c.name.padEnd(45)} | Est: ₹${c.allocated.toLocaleString('en-IN')} | Spent: ₹${c.spent.toLocaleString('en-IN')} | ${c.status}`
    ).join('\n');

    const content = 
`========================================================================================
                          SMART SHAADI LUXURY WEDDING PORTAL
                    Official Wedding Estimate, Quotation & Budget Invoice
========================================================================================
Invoice Reference : ${invoiceNumber}
Issue Date        : ${invoiceDate}
Couple Names      : ${coupleName}
Wedding Destination: ${city}
Wedding Date      : ${weddingDate}
----------------------------------------------------------------------------------------
ITEMIZED WEDDING BUDGET BREAKDOWN
----------------------------------------------------------------------------------------
${lines}
----------------------------------------------------------------------------------------
TOTAL ESTIMATED WEDDING BUDGET   : ₹${totalAllocated.toLocaleString('en-IN')}
TOTAL DISBURSED & CLEARED        : ₹${totalSpent.toLocaleString('en-IN')}
OUTSTANDING VENDOR BALANCES      : ₹${balanceOutstanding.toLocaleString('en-IN')}
----------------------------------------------------------------------------------------
Payment Routing   : RTGS / NEFT / UPI Desk (ananya.kabir@oksbi)
Authorised Seal   : Smart Shaadi Concierge Bureau (Udaipur & New Delhi)
========================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SmartShaadi_Royal_Invoice_${invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.('Invoice downloaded! 📄', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Top action toolbar (hidden during window.print) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-luxury hover:shadow-2xl transition"
        >
          <Printer className="w-4 h-4 text-royal-lightGold" />
          <span>Print / Save PDF</span>
        </button>
        <button
          onClick={handleDownloadText}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-royal-charcoal font-bold text-xs border border-royal-sand shadow hover:bg-royal-pearl transition"
        >
          <Download className="w-4 h-4 text-royal-wine" />
          <span>Download TXT</span>
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/90 text-royal-charcoal flex items-center justify-center shadow hover:bg-red-50 hover:text-royal-wine transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Invoice Sheet container */}
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 sm:p-12 shadow-2xl border border-royal-gold/40 my-8 text-royal-charcoal print:border-none print:shadow-none print:m-0 print:p-6 print:rounded-none">
        
        {/* Header with Royal Crest */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-royal-gold/40 pb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl royal-gradient-wine flex items-center justify-center text-royal-gold shadow-luxury ring-2 ring-royal-gold/40">
              <Crown className="w-8 h-8 text-royal-lightGold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-bold tracking-tight text-royal-charcoal">
                  Smart<span className="text-royal-wine">Shaadi</span>
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-royal-lightGold text-royal-amber font-bold tracking-widest uppercase border border-royal-gold/30 font-cinzel">
                  Royal Invoice
                </span>
              </div>
              <p className="font-cinzel text-xs text-gray-500 font-semibold tracking-widest uppercase mt-0.5">
                Executive Luxury Wedding Concierge
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="font-cinzel text-xs font-bold text-royal-wine uppercase tracking-wider">Invoice Reference</p>
            <p className="font-mono text-base font-bold text-royal-charcoal">{invoiceNumber}</p>
            <p className="text-xs text-gray-500 mt-1">Date: {invoiceDate}</p>
          </div>
        </div>

        {/* Client & Destination Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-royal-sand">
          <div>
            <span className="font-cinzel text-xs font-bold text-gray-400 uppercase tracking-wider">Prepared For</span>
            <h3 className="font-serif text-xl font-bold text-royal-charcoal mt-1">{coupleName}</h3>
            <p className="text-xs text-gray-600 mt-0.5">Destination: <span className="font-semibold text-royal-charcoal">{city}</span></p>
            <p className="text-xs text-gray-600">Wedding Date: <span className="font-semibold text-royal-charcoal">{weddingDate}</span></p>
          </div>

          <div className="sm:text-right">
            <span className="font-cinzel text-xs font-bold text-gray-400 uppercase tracking-wider">Billing Agency</span>
            <h4 className="font-serif text-base font-bold text-royal-charcoal mt-1">SmartEvent Karo Private Ltd</h4>
            <p className="text-xs text-gray-600">Heritage Palace Wing, Lake Palace Road</p>
            <p className="text-xs text-gray-600">Udaipur, Rajasthan • GSTIN: 08AAACS1234F1Z8</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-royal-sand font-cinzel text-royal-wine uppercase tracking-wider">
                <th className="py-3 font-bold">Ceremony / Service Category</th>
                <th className="py-3 text-right font-bold">Estimated Budget</th>
                <th className="py-3 text-right font-bold">Disbursed</th>
                <th className="py-3 text-right font-bold">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-royal-sand/60">
              {categories.map((c, i) => (
                <tr key={i} className="hover:bg-royal-pearl/40 transition">
                  <td className="py-3.5 pr-2 font-medium text-royal-charcoal font-serif text-sm">
                    {c.name}
                  </td>
                  <td className="py-3.5 text-right font-mono font-semibold text-royal-slate">
                    ₹{(c.allocated || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold text-royal-charcoal">
                    ₹{(c.spent || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-royal-sand/60 text-royal-wine font-cinzel">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary & Calculations */}
        <div className="border-t-2 border-royal-gold/40 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <span className="font-cinzel text-xs font-bold text-royal-wine uppercase tracking-wider">Payment Routing & Disbursal</span>
            <div className="bg-royal-pearl rounded-2xl p-4 border border-royal-sand text-xs space-y-1.5 font-sans">
              <p><span className="text-gray-500">Bank:</span> State Bank of India (SBI Luxury Heritage Branch)</p>
              <p><span className="text-gray-500">Account:</span> SmartEvent Shaadi Escrow Desk</p>
              <p><span className="text-gray-500">IFSC Code:</span> SBIN0001892</p>
              <p><span className="text-gray-500">UPI VPA:</span> <span className="font-mono font-bold text-royal-wine">ananya.kabir@oksbi</span></p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>All vendor advances protected under 100% Escrow Guarantee.</span>
            </div>
          </div>

          <div className="bg-royal-pearl rounded-2xl p-6 border border-royal-sand space-y-3">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Gross Wedding Budget:</span>
              <span className="font-mono font-bold text-royal-charcoal">₹{totalAllocated.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Advances & Cleared Spend:</span>
              <span className="font-mono font-bold text-emerald-700">- ₹{totalSpent.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Taxes & Luxury Cess:</span>
              <span className="text-gray-500 italic">Inclusive (18% GST)</span>
            </div>
            <div className="pt-3 border-t border-royal-sand flex justify-between items-baseline">
              <span className="font-cinzel text-sm font-bold text-royal-wine uppercase">Balance Due:</span>
              <span className="font-serif text-2xl font-bold text-royal-wine font-mono">
                ₹{balanceOutstanding.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Seal & Formal Signature Stamp */}
        <div className="mt-8 pt-6 border-t border-royal-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-royal-gold flex items-center justify-center text-royal-gold text-[10px] font-cinzel font-bold text-center leading-tight">
              ROYAL<br/>SEAL
            </div>
            <p className="text-[11px] text-gray-500 italic max-w-xs font-serif">
              Computer-generated official statement under Smart Shaadi Concierge protocol. Valid across all booking partners.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="h-10 border-b border-gray-400 w-44 mb-1 flex items-end justify-center">
              <span className="font-serif text-sm italic text-royal-wine font-semibold">SmartShaadi Desk</span>
            </div>
            <span className="text-[10px] font-cinzel text-gray-400 uppercase tracking-widest font-bold">Authorized Signatory</span>
          </div>
        </div>

      </div>
    </div>
  );
}
