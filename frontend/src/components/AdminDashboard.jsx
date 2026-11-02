import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Building2, 
  Calendar, 
  Star,
  Crown,
  DollarSign,
  Sun,
  Moon,
  FileCheck,
  CreditCard,
  Lock,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { initialGovernance } from '../data/governance.js';

export default function AdminDashboard({ vendors, onApproveVendor, showToast }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('telemetry'); // telemetry, escrow, kyc, vendors
  const [escrowReleases, setEscrowReleases] = useState(initialGovernance.escrowReleases);
  const [kycList, setKycList] = useState(initialGovernance.kycQueue);

  const pendingVendors = vendors.filter(v => v.approval_status === 'pending');
  const approvedVendors = vendors.filter(v => v.approval_status === 'approved');

  const telemetry = initialGovernance.telemetry;

  const handleDualSignEscrow = (id) => {
    setEscrowReleases(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          signatory2_AdminApproval: {
            signed: true,
            signerName: "Chief Escrow Auditor (SmartShaadi Control Room)",
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + " IST"
          },
          status: "Disbursed via HDFC RTGS"
        };
      }
      return item;
    }));
    showToast('Dual-Signatory Authorization Granted! Funds released via HDFC RTGS wire. 🏛️');
  };

  const handleApproveKyc = (id) => {
    setKycList(prev => prev.map(k => k.id === id ? { ...k, status: 'Approved' } : k));
    showToast('KYC & Bank Accounts Verified successfully! 🛡️');
  };

  const themeBg = isDarkTheme ? 'bg-[#141211] text-[#F3EFEA]' : 'bg-[#FAF8F6] text-[#1F1F1F]';
  const cardBg = isDarkTheme ? 'bg-[#1E1B19] border-[#38332E]' : 'bg-white border-stitch-border';
  const textMuted = isDarkTheme ? 'text-[#A0988E]' : 'text-stitch-charcoal-muted';
  const textPrimary = isDarkTheme ? 'text-[#FAF6F0]' : 'text-stitch-charcoal';

  return (
    <div className={`min-h-screen py-8 sm:py-12 transition-colors duration-300 ${themeBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stitch-rose">
                Executive Operations & Governance
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stitch-gold-light border border-stitch-gold-border text-[10px] font-bold text-stitch-charcoal">
                Dual-Signatory Vault Active
              </span>
            </div>
            <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold ${textPrimary}`}>
              Admin Control Room & Escrow Custody
            </h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Platform telemetry oversight, dual-signatory escrow release authorization, and KYC compliance queues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2.5 rounded-2xl border transition flex items-center gap-2 text-xs font-bold ${
                isDarkTheme ? 'bg-[#2A2623] border-[#484039] text-[#E8D8A6]' : 'bg-white border-stitch-border text-stitch-charcoal shadow-xs'
              }`}
              title="Toggle Light / Dark Royal Theme"
            >
              {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stitch-rose" />}
              <span>{isDarkTheme ? 'Light Theme' : 'Obsidian Dark'}</span>
            </button>

            <div className="bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chief Auditor Active</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'telemetry', label: 'Telemetry & GMV Oversight' },
            { id: 'escrow', label: `Dual-Signatory Escrow Vault (${escrowReleases.length})` },
            { id: 'kyc', label: `KYC Compliance Queues (${kycList.length})` },
            { id: 'vendors', label: `Studio Approvals (${pendingVendors.length} Pending)` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                activeAdminTab === tab.id
                  ? 'bridal-gradient-rose text-white shadow-luxury'
                  : `${cardBg} ${textPrimary} hover:opacity-90`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. TELEMETRY & GMV OVERSIGHT TAB */}
        {activeAdminTab === 'telemetry' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Primary KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-6 rounded-3xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>
                    Gross Merchandise Value (GMV)
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className={`font-serif text-2xl sm:text-3xl font-bold ${textPrimary}`}>
                  {telemetry.grossMerchandiseValue}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">+28.4% YoY Palace Bookings</span>
              </div>

              <div className={`p-6 rounded-3xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>
                    Escrow Funds in Custody
                  </span>
                  <Lock className="w-4 h-4 text-stitch-gold" />
                </div>
                <div className={`font-serif text-2xl sm:text-3xl font-bold text-stitch-rose`}>
                  {telemetry.escrowInCustody}
                </div>
                <span className={`text-[10px] block mt-1 ${textMuted}`}>100% Protected under HDFC Escrow</span>
              </div>

              <div className={`p-6 rounded-3xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>
                    Price Shield Savings
                  </span>
                  <ShieldCheck className="w-4 h-4 text-stitch-rose" />
                </div>
                <div className={`font-serif text-2xl sm:text-3xl font-bold text-emerald-600`}>
                  {telemetry.priceShieldSavings}
                </div>
                <span className={`text-[10px] block mt-1 ${textMuted}`}>Protected from wedding inflation</span>
              </div>

              <div className={`p-6 rounded-3xl border shadow-xs ${cardBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>
                    Dispute Rate
                  </span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div className={`font-serif text-2xl sm:text-3xl font-bold ${textPrimary}`}>
                  {telemetry.disputeRate}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">Zero Escrow Chargebacks</span>
              </div>
            </div>

            {/* Hub Activity Bar */}
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs ${cardBg}`}>
              <h3 className={`font-serif text-xl font-bold mb-4 ${textPrimary}`}>
                Destination Wedding Hub Telemetry
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { city: 'Udaipur, Rajasthan', share: 44, gmv: '₹2,13,40,000' },
                  { city: 'Jodhpur, Rajasthan', share: 26, gmv: '₹1,26,10,000' },
                  { city: 'Jaipur, Rajasthan', share: 18, gmv: '₹87,30,000' },
                  { city: 'Delhi NCR Hub', share: 12, gmv: '₹58,20,000' }
                ].map((hub, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${isDarkTheme ? 'bg-[#181614] border-[#302B26]' : 'bg-stitch-ivory border-stitch-border'}`}>
                    <span className="text-xs font-bold block">{hub.city}</span>
                    <span className="font-serif text-lg font-bold text-stitch-rose block mt-1">{hub.gmv}</span>
                    <span className={`text-[10px] block mt-0.5 ${textMuted}`}>{hub.share}% Platform Volume</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. DUAL-SIGNATORY ESCROW VAULT TAB */}
        {activeAdminTab === 'escrow' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs ${cardBg}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className={`font-serif text-xl font-bold flex items-center gap-2 ${textPrimary}`}>
                    <Lock className="w-5 h-5 text-stitch-gold" />
                    <span>Dual-Signatory Milestone Escrow Release</span>
                  </h3>
                  <p className={`text-xs mt-0.5 ${textMuted}`}>
                    Security Protocol: Funds require <strong>Signatory 1 (Host Couple)</strong> and <strong>Signatory 2 (Admin Chief Auditor)</strong> before HDFC bank wire triggers.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {escrowReleases.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isDarkTheme ? 'bg-[#181614] border-[#302B26]' : 'bg-stitch-ivory/50 border-stitch-border'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className={`font-serif text-lg font-bold ${textPrimary}`}>
                            {item.vendorName}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status.includes('Disbursed')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        <p className={`text-xs font-semibold ${textPrimary}`}>
                          Milestone: {item.milestone}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                          <span>Ref: <strong>{item.bankWireRef}</strong></span>
                          <span>Couple: <strong>{item.coupleName}</strong></span>
                          <span>Amount: <strong className="text-stitch-rose font-serif text-sm">₹{item.totalAmount.toLocaleString('en-IN')}</strong></span>
                        </div>

                        {/* Dual Signatures status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className={`p-2.5 rounded-xl border text-xs ${
                            item.signatory1_HostConsent.signed 
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                              : 'bg-amber-50/60 border-amber-200 text-amber-900'
                          }`}>
                            <span className="block font-bold">Signatory 1 (Host Couple Consent):</span>
                            <span>{item.signatory1_HostConsent.signed ? `✓ Signed by ${item.signatory1_HostConsent.signerName}` : 'Pending Host Signature'}</span>
                          </div>

                          <div className={`p-2.5 rounded-xl border text-xs ${
                            item.signatory2_AdminApproval.signed 
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                              : 'bg-amber-50/60 border-amber-200 text-amber-900'
                          }`}>
                            <span className="block font-bold">Signatory 2 (Admin Chief Auditor):</span>
                            <span>{item.signatory2_AdminApproval.signed ? `✓ Signed by ${item.signatory2_AdminApproval.signerName}` : 'Awaiting Chief Auditor Signatory'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="self-end lg:self-center flex-shrink-0">
                        {!item.signatory2_AdminApproval.signed ? (
                          <button
                            onClick={() => handleDualSignEscrow(item.id)}
                            className="px-5 py-3 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition flex items-center gap-2"
                          >
                            <Lock className="w-4 h-4 text-stitch-gold-light" />
                            <span>Authorize Dual-Signatory Release</span>
                          </button>
                        ) : (
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                              <Check className="w-4 h-4" />
                              Wire Wire Disbursed
                            </span>
                            <span className={`block text-[10px] ${textMuted}`}>HDFC RTGS Confirmed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* 3. KYC COMPLIANCE QUEUES TAB */}
        {activeAdminTab === 'kyc' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs ${cardBg}`}>
              <h3 className={`font-serif text-xl font-bold mb-4 ${textPrimary}`}>
                Vendor Studio KYC & Bank Verification Queue
              </h3>
              
              <div className="space-y-4">
                {kycList.map((k) => (
                  <div
                    key={k.id}
                    className={`p-5 rounded-2xl border ${isDarkTheme ? 'bg-[#181614] border-[#302B26]' : 'bg-stitch-ivory/50 border-stitch-border'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h4 className={`font-serif text-lg font-bold ${textPrimary}`}>{k.vendorName}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          k.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {k.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span>GST: <strong className="font-mono">{k.gstNumber}</strong></span>
                        <span>Bank: <strong>{k.bankName}</strong></span>
                        <span>A/C: <strong className="font-mono">{k.accountNumber}</strong></span>
                        <span>IFSC: <strong className="font-mono">{k.ifscCode}</strong></span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {k.documentsSubmitted.map((doc, i) => (
                          <span key={i} className={`text-[10px] px-2 py-0.5 rounded-md border ${isDarkTheme ? 'bg-[#221F1C] border-[#3D3730]' : 'bg-white border-stitch-border'}`}>
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {k.status !== 'Approved' && (
                      <button
                        onClick={() => handleApproveKyc(k.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
                      >
                        Approve KYC Dossier
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. STUDIO APPROVALS TAB */}
        {activeAdminTab === 'vendors' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs ${cardBg}`}>
              <h3 className={`font-serif text-xl font-bold mb-4 ${textPrimary}`}>
                New Vendor Studio Listings Queue ({pendingVendors.length})
              </h3>

              {pendingVendors.length === 0 ? (
                <div className="text-center py-12 bg-emerald-50/40 rounded-2xl border border-dashed border-emerald-200 text-emerald-800">
                  <Check className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <h4 className="font-bold text-sm">All studio listings are vetted!</h4>
                  <p className="text-xs text-emerald-600 mt-0.5">No pending vendor submissions awaiting review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingVendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDarkTheme ? 'bg-[#181614] border-[#302B26]' : 'bg-stitch-ivory/50 border-stitch-border'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-stitch-border"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-serif text-lg font-bold ${textPrimary}`}>{vendor.name}</h4>
                            <span className="px-2 py-0.5 rounded-full bg-stitch-rose-wash text-stitch-rose text-[10px] font-bold uppercase shadow-xs">
                              {vendor.category}
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 ${textMuted}`}>{vendor.city} • Starts {vendor.price}</p>
                          <p className={`text-xs mt-1 max-w-xl ${textPrimary}`}>{vendor.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            onApproveVendor(vendor.id, true);
                            showToast(`${vendor.name} approved & verified! ✨`);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
