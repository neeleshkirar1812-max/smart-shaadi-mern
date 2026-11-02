// Governance, Escrow & Telemetry Data for SmartShaadi
export const initialGovernance = {
  // Admin Telemetry
  telemetry: {
    grossMerchandiseValue: "₹4,85,00,000",
    escrowInCustody: "₹1,92,40,000",
    activeWeddingsCount: 18,
    verifiedVendorsCount: 46,
    kycQueueCount: 3,
    disputeRate: "0.00%",
    priceShieldSavings: "₹24,80,000"
  },

  // KYC Verification Queue
  kycQueue: [
    {
      id: "kyc-1",
      vendorName: "Heritage Mandap Decorators & Co.",
      category: "Decor & Production",
      city: "Udaipur",
      gstNumber: "08AAACH7412K1Z9",
      bankName: "HDFC Bank (Pichola Branch)",
      accountNumber: "50200048192831",
      ifscCode: "HDFC0001429",
      documentsSubmitted: ["GST Certificate", "Cancelled Cheque", "FSSAI / Safety Audit", "Portfolio Dossier"],
      status: "Under Audit",
      submittedDate: "2026-11-01"
    },
    {
      id: "kyc-2",
      vendorName: "Shree Giriraj Royal Shehnai Ensemble",
      category: "Music & Shehnai",
      city: "Varanasi / Delhi",
      gstNumber: "07AABFG9182E1Z4",
      bankName: "State Bank of India",
      accountNumber: "38910029102",
      ifscCode: "SBIN0000691",
      documentsSubmitted: ["Aadhaar KYC", "Bank Passbook", "All-India Radio A-Grade Artist Certificate"],
      status: "Approved",
      submittedDate: "2026-10-28"
    }
  ],

  // Dual-Signatory Escrow Releases
  escrowReleases: [
    {
      id: "escrow-101",
      weddingId: "w1",
      coupleName: "Ananya & Kabir",
      vendorName: "The Leela Palace Udaipur",
      milestone: "50% Palace Booking Advance & Mandap Setup Deposit",
      totalAmount: 425000,
      bankWireRef: "HDFC-RTGS-20261102-881921",
      signatory1_HostConsent: {
        signed: true,
        signerName: "Kabir Mehta (Groom)",
        timestamp: "2026-11-01 14:32 IST"
      },
      signatory2_AdminApproval: {
        signed: true,
        signerName: "Chief Escrow Auditor (SmartShaadi)",
        timestamp: "2026-11-01 16:15 IST"
      },
      status: "Disbursed via HDFC Wire",
      disbursementDate: "2026-11-01"
    },
    {
      id: "escrow-102",
      weddingId: "w1",
      coupleName: "Ananya & Kabir",
      vendorName: "WedMoire 4K Cinema & Drone Studio",
      milestone: "25% Mobilization Advance for 4K RED Rigs & Drone Pilot",
      totalAmount: 93750,
      bankWireRef: "HDFC-NEFT-20261102-441029",
      signatory1_HostConsent: {
        signed: true,
        signerName: "Ananya Sharma (Bride)",
        timestamp: "2026-11-02 11:20 IST"
      },
      signatory2_AdminApproval: {
        signed: false,
        signerName: "Chief Escrow Auditor",
        timestamp: null
      },
      status: "Awaiting Admin Dual-Signatory Signature",
      disbursementDate: "Pending"
    }
  ],

  // Shubh Muhurat Calendar
  shubhMuhuratCalendar: [
    { date: "2026-11-26", day: "Thursday", nakshatra: "Rohini Nakshatra", tithi: "Shukla Dwitiya", suitability: "Auspicious for Mehendi & Ring Exchange" },
    { date: "2026-11-27", day: "Friday", nakshatra: "Mrigashirsha", tithi: "Shukla Tritiya", suitability: "High Energy for Sangeet & Qawwali Night" },
    { date: "2026-11-28", day: "Saturday", nakshatra: "Ardra / Punarvasu", tithi: "Shukla Chaturthi", suitability: "Supreme Shubh Muhurat for Saat Phere / Nikah" },
    { date: "2026-12-12", day: "Saturday", nakshatra: "Pushya Nakshatra", tithi: "Shukla Panchami", suitability: "Winter Royal Weddings Peak Date" },
    { date: "2026-12-14", day: "Monday", nakshatra: "Magha Nakshatra", tithi: "Shukla Saptami", suitability: "Grand Reception & Walima Favored" }
  ]
};
