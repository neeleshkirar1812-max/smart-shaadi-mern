import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  UserX, 
  Plus, 
  Trash2, 
  MessageSquare, 
  Utensils, 
  Bed, 
  ExternalLink,
  X,
  Copy,
  Check,
  Download,
  FileSpreadsheet,
  PieChart,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function GuestManager({ 
  guests = [], 
  stats, 
  onAddGuest, 
  onUpdateGuest, 
  onDeleteGuest, 
  showToast 
}) {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedDietFilter, setSelectedDietFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [whatsappModalGuest, setWhatsappModalGuest] = useState(null);
  const [inviteFaith, setInviteFaith] = useState('Hindu');
  const [copied, setCopied] = useState(false);

  // New Guest Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [side, setSide] = useState("Ladkewale (Groom's Clan)");
  const [diet, setDiet] = useState('Pure Jain Chauvihar');
  const [attendeesCount, setAttendeesCount] = useState(2);
  const [relation, setRelation] = useState('Family Relative');
  const [notes, setNotes] = useState('');

  // Clan Balance Counts
  const groomClanCount = guests.filter(g => g.side?.toLowerCase().includes('groom') || g.side?.toLowerCase().includes('ladkewale')).length;
  const brideClanCount = guests.filter(g => g.side?.toLowerCase().includes('bride') || g.side?.toLowerCase().includes('ladkiwale')).length;
  const mutualClanCount = guests.filter(g => !g.side?.toLowerCase().includes('groom') && !g.side?.toLowerCase().includes('bride') && !g.side?.toLowerCase().includes('ladkewale') && !g.side?.toLowerCase().includes('ladkiwale')).length;
  const totalGuestsCount = guests.length || 1;
  const groomPct = Math.round((groomClanCount / totalGuestsCount) * 100);
  const bridePct = Math.round((brideClanCount / totalGuestsCount) * 100);
  const mutualPct = Math.max(0, 100 - groomPct - bridePct);

  // Dietary Matrix Counts
  const jainCount = guests.filter(g => g.dietary?.toLowerCase().includes('jain') || g.diet?.toLowerCase().includes('jain')).length;
  const satvikCount = guests.filter(g => g.dietary?.toLowerCase().includes('satvik') || g.diet?.toLowerCase().includes('satvik') || g.dietary?.toLowerCase().includes('veg')).length;
  const halalCount = guests.filter(g => g.dietary?.toLowerCase().includes('halal') || g.diet?.toLowerCase().includes('halal')).length;
  const globalCount = guests.filter(g => g.dietary?.toLowerCase().includes('global') || g.dietary?.toLowerCase().includes('non-veg') || g.diet?.toLowerCase().includes('non-veg')).length;

  const filteredGuests = guests.filter(g => {
    const matchesGroup = selectedGroup === 'All' 
      ? true 
      : selectedGroup === 'Groom Side' 
        ? (g.side?.toLowerCase().includes('groom') || g.side?.toLowerCase().includes('ladkewale'))
        : selectedGroup === 'Bride Side'
          ? (g.side?.toLowerCase().includes('bride') || g.side?.toLowerCase().includes('ladkiwale'))
          : (!g.side?.toLowerCase().includes('groom') && !g.side?.toLowerCase().includes('bride') && !g.side?.toLowerCase().includes('ladkewale') && !g.side?.toLowerCase().includes('ladkiwale'));
    
    const matchesDiet = selectedDietFilter === 'All'
      ? true
      : selectedDietFilter === 'Jain'
        ? (g.dietary?.toLowerCase().includes('jain') || g.diet?.toLowerCase().includes('jain'))
        : selectedDietFilter === 'Halal'
          ? (g.dietary?.toLowerCase().includes('halal') || g.diet?.toLowerCase().includes('halal'))
          : selectedDietFilter === 'Satvik'
            ? (g.dietary?.toLowerCase().includes('satvik') || g.diet?.toLowerCase().includes('satvik'))
            : true;

    return matchesGroup && matchesDiet;
  });

  const handleCreateGuest = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddGuest({
      name: name.trim(),
      phone: phone.trim() || '+91 98000 00000',
      side,
      relation,
      dietary: diet,
      rsvpStatus: 'Confirmed',
      attendeesCount: Number(attendeesCount) || 1,
      notes
    });

    setName('');
    setPhone('');
    setNotes('');
    setShowAddForm(false);
    showToast('Guest added to royal guest list ✨');
  };

  const getWhatsappText = (guest) => {
    if (inviteFaith === 'Muslim') {
      return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nDear ${guest.name},\n\nIn the Name of Allah, the Most Beneficent, the Most Merciful.\n\nWith immense joy, we invite you and your family to celebrate the blessed Nikah & Walima of:\n\n✨ Ananya & Kabir ✨\n\n📅 Date: 26th - 28th November 2026\n📍 Venue: The Leela Palace, Lake Pichola, Udaipur\n\nKindly confirm your RSVP and dietary requirements (${guest.dietary || guest.diet || 'Halal Certified'}).\n\nWarm regards & Dua,\nThe Sharma & Mehta Families`;
    }
    if (inviteFaith === 'Sikh') {
      return `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥\n\nRespected ${guest.name},\n\nWith the blessings of Sri Waheguru Ji, you are cordially invited to attend the auspicious Anand Karaj (Holy Laavan) celebration of:\n\n☬ Ananya & Kabir ☬\n\n📅 Date: 26th - 28th November 2026\n📍 Venue: The Leela Palace, Udaipur\n\nPlease join us for Kirtan, Anand Karaj, and Guru Ka Langar.\n\nKindly confirm your RSVP.\nWarm regards,\nThe Families`;
    }
    if (inviteFaith === 'Christian') {
      return `✝ "What God has joined together, let no one separate." (Mark 10:9) ✝\n\nDear ${guest.name},\n\nWith hearts full of gratitude, we invite you to witness the Holy Matrimony & Nuptial Blessing of:\n\n💍 Ananya & Kabir 💍\n\n📅 Date: 26th - 28th November 2026\n📍 Venue: The Leela Palace Courtyard & Sunset Lawns, Udaipur\n\nKindly RSVP with your dietary preferences (${guest.dietary || guest.diet || 'Global Gourmet'}).\n\nWith love and blessings,\nThe Families`;
    }
    if (inviteFaith === 'Jain') {
      return `॥ ॐ अर्हम् ॥\n\nआदरणीय ${guest.name} (सादर जय जिनेंद्र),\n\nप्रभु महावीर के पावन आशीर्वाद से अनन्या एवं कबीर के शुभ विवाह लग्न उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।\n\n📅 तिथि: 26 - 28 नवंबर 2026\n📍 स्थान: द लीला पैलेस, उदयपुर\n(शुद्ध चौविहार जैन आहार व्यवस्था - Chauvihar Dining)\n\nकृपया अपनी उपस्थिति (RSVP) की पुष्टि करें।\n\nसप्रेम निमंत्रण,\nपरिवार`;
    }
    // Default Hindu
    return `॥ श्री गणेशाय नमः ॥\n\nआदरणीय ${guest.name},\n\nहमारे परिवार में अनन्या एवं कबीर के शुभ विवाह उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।\n\n📅 तिथि: 26 - 28 नवंबर 2026\n📍 स्थान: द लीला पैलेस, पिछोला झील, उदयपुर\n\nकृपया अपनी उपस्थिति (RSVP) की पुष्टि करें।\n\nसप्रेम निमंत्रण,\nशर्मा एवं मेहता परिवार`;
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Invitation copied to clipboard');
  };

  const handleExportCsv = () => {
    if (!guests || guests.length === 0) {
      showToast('No guests to export', 'error');
      return;
    }
    const headers = ['Name', 'Phone', 'Clan Side', 'Relation', 'RSVP Status', 'Dietary Preference', 'Attendees', 'Table Assigned', 'Notes'];
    const rows = guests.map(g => [
      `"${(g.name || '').replace(/"/g, '""')}"`,
      `"${(g.phone || '').replace(/"/g, '""')}"`,
      `"${(g.side || '').replace(/"/g, '""')}"`,
      `"${(g.relation || '').replace(/"/g, '""')}"`,
      `"${(g.rsvpStatus || 'Confirmed').replace(/"/g, '""')}"`,
      `"${(g.dietary || g.diet || 'Standard').replace(/"/g, '""')}"`,
      g.attendeesCount || 1,
      `"${(g.tableName || 'Unassigned').replace(/"/g, '""')}"`,
      `"${(g.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartShaadi_Guest_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Guest roster exported to CSV file');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-stitch-rose block mb-1">
            Guest RSVP Hub & Clan Seating Atelier
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stitch-charcoal">
            Guest Protocol & Dietary Atelier
          </h2>
          <p className="text-xs text-stitch-charcoal-muted mt-1">
            Track clan ratios, automate multi-faith WhatsApp invitations, and manage zero-compromise dietary matrices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-stitch-ivory border border-stitch-border text-xs font-bold text-stitch-charcoal shadow-xs transition"
          >
            <Download className="w-4 h-4 text-stitch-gold" />
            <span>Export Roster (CSV)</span>
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Atithi (Guest)</span>
          </button>
        </div>
      </div>

      {/* 1. Clan Balance Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-stitch-rose" />
            <h3 className="font-serif text-lg font-bold text-stitch-charcoal">
              Clan Balance Tracker
            </h3>
          </div>
          <span className="text-xs font-semibold text-stitch-charcoal-muted">
            Total Confirmed Headcount: <strong>{guests.reduce((sum, g) => sum + (g.attendeesCount || 1), 0)} Guests</strong>
          </span>
        </div>

        {/* Visual Ratio Bar */}
        <div className="h-4 w-full bg-stitch-ivory rounded-full overflow-hidden flex border border-stitch-border mb-4">
          <div style={{ width: `${groomPct}%` }} className="bg-stitch-rose transition-all duration-500" title={`Ladkewale: ${groomPct}%`} />
          <div style={{ width: `${bridePct}%` }} className="bg-stitch-gold transition-all duration-500" title={`Ladkiwale: ${bridePct}%`} />
          <div style={{ width: `${mutualPct}%` }} className="bg-emerald-600 transition-all duration-500" title={`Mutual / Friends: ${mutualPct}%`} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-stitch-rose-wash/60 border border-stitch-rose/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stitch-rose">Ladkewale (Groom Clan)</span>
              <span className="font-serif text-lg font-bold text-stitch-rose">{groomPct}%</span>
            </div>
            <p className="text-xl font-serif font-bold text-stitch-charcoal mt-1">{groomClanCount} Invitations</p>
            <span className="text-[10px] text-stitch-charcoal-muted">Baraat procession & Milni participants</span>
          </div>

          <div className="p-4 rounded-2xl bg-stitch-gold-light/60 border border-stitch-gold-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stitch-charcoal">Ladkiwale (Bride Clan)</span>
              <span className="font-serif text-lg font-bold text-stitch-charcoal">{bridePct}%</span>
            </div>
            <p className="text-xl font-serif font-bold text-stitch-charcoal mt-1">{brideClanCount} Invitations</p>
            <span className="text-[10px] text-stitch-charcoal-muted">Toran welcome & Kanyadaan witnesses</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">Mutual & Global Friends</span>
              <span className="font-serif text-lg font-bold text-emerald-800">{mutualPct}%</span>
            </div>
            <p className="text-xl font-serif font-bold text-stitch-charcoal mt-1">{mutualClanCount} Invitations</p>
            <span className="text-[10px] text-stitch-charcoal-muted">Sangeet squad & college batchmates</span>
          </div>
        </div>
      </div>

      {/* 2. Dietary Matrices Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setSelectedDietFilter(selectedDietFilter === 'Jain' ? 'All' : 'Jain')}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDietFilter === 'Jain' ? 'border-stitch-rose bg-stitch-rose-wash shadow-xs' : 'border-stitch-border bg-white hover:bg-stitch-ivory'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">🪷</span>
            <span className="font-serif text-xl font-bold text-stitch-charcoal">{jainCount}</span>
          </div>
          <p className="text-xs font-bold text-stitch-charcoal mt-1">Pure Jain Chauvihar</p>
          <p className="text-[10px] text-stitch-charcoal-muted">Zero root vegetables, before sunset</p>
        </button>

        <button
          onClick={() => setSelectedDietFilter(selectedDietFilter === 'Satvik' ? 'All' : 'Satvik')}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDietFilter === 'Satvik' ? 'border-stitch-rose bg-stitch-rose-wash shadow-xs' : 'border-stitch-border bg-white hover:bg-stitch-ivory'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">🕉️</span>
            <span className="font-serif text-xl font-bold text-stitch-charcoal">{satvikCount}</span>
          </div>
          <p className="text-xs font-bold text-stitch-charcoal mt-1">Satvik Vaishnav</p>
          <p className="text-[10px] text-stitch-charcoal-muted">Pure ghee, no onion/garlic options</p>
        </button>

        <button
          onClick={() => setSelectedDietFilter(selectedDietFilter === 'Halal' ? 'All' : 'Halal')}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDietFilter === 'Halal' ? 'border-stitch-rose bg-stitch-rose-wash shadow-xs' : 'border-stitch-border bg-white hover:bg-stitch-ivory'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">☪️</span>
            <span className="font-serif text-xl font-bold text-stitch-charcoal">{halalCount}</span>
          </div>
          <p className="text-xs font-bold text-stitch-charcoal mt-1">Halal Certified</p>
          <p className="text-[10px] text-stitch-charcoal-muted">100% Halal Awadhi Dum Pukht</p>
        </button>

        <button
          onClick={() => setSelectedDietFilter('All')}
          className="p-4 rounded-2xl border border-stitch-border bg-white hover:bg-stitch-ivory text-left transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">🍷</span>
            <span className="font-serif text-xl font-bold text-stitch-charcoal">{globalCount}</span>
          </div>
          <p className="text-xs font-bold text-stitch-charcoal mt-1">Global & Continental</p>
          <p className="text-[10px] text-stitch-charcoal-muted">Live grill & international baradari</p>
        </button>
      </div>

      {/* 3. Filter Pills */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {['All', 'Groom Side', 'Bride Side', 'Common Friends'].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedGroup === grp
                  ? 'bridal-gradient-rose text-white shadow-luxury'
                  : 'bg-white text-stitch-charcoal border border-stitch-border hover:bg-stitch-ivory'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
        {selectedDietFilter !== 'All' && (
          <button
            onClick={() => setSelectedDietFilter('All')}
            className="text-xs text-stitch-rose font-bold hover:underline"
          >
            Clear Diet Filter ({selectedDietFilter}) ✕
          </button>
        )}
      </div>

      {/* 4. Guest Roster Table */}
      <div className="bg-white rounded-3xl border border-stitch-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stitch-ivory border-b border-stitch-border text-stitch-charcoal-muted uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Guest Name & Clan</th>
                <th className="py-3 px-4">Phone / Contact</th>
                <th className="py-3 px-4">Dietary Matrix</th>
                <th className="py-3 px-4">Attendees</th>
                <th className="py-3 px-4">Dining Table</th>
                <th className="py-3 px-4 text-center">RSVP</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stitch-border font-medium">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-stitch-ivory/50 transition">
                  <td className="py-4 px-4">
                    <div className="font-bold text-stitch-charcoal">{guest.name}</div>
                    <span className="text-[10px] text-stitch-rose font-semibold">{guest.side || "Family Guest"}</span>
                    {guest.relation && (
                      <span className="text-[10px] text-stitch-charcoal-muted ml-1.5">({guest.relation})</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-stitch-charcoal-subtle font-mono text-[11px]">
                    {guest.phone || '+91 98290 12345'}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stitch-gold-light border border-stitch-gold-border text-[10px] font-bold text-stitch-charcoal">
                      <Utensils className="w-3 h-3 text-stitch-gold" />
                      {guest.dietary || guest.diet || 'Pure Jain Chauvihar'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-stitch-charcoal">
                    {guest.attendeesCount || 1}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[11px] font-semibold text-stitch-charcoal">
                      {guest.tableName || 'Table 01 - Royal Diwan'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Confirmed
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setWhatsappModalGuest(guest)}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                        title="Send Multi-Faith WhatsApp Card"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteGuest(guest.id)}
                        className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guest Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-stitch-charcoal mb-1">
              Add Royal Atithi (Guest)
            </h3>
            <p className="text-xs text-stitch-charcoal-muted mb-4">
              Enter details for clan balancing and dietary meal allocations.
            </p>

            <form onSubmit={handleCreateGuest} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Full Name / Family Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar & Sunita Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98290 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Attendees Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Clan Affiliation
                  </label>
                  <select
                    value={side}
                    onChange={(e) => setSide(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose bg-white"
                  >
                    <option value="Ladkewale (Groom's Clan)">Ladkewale (Groom)</option>
                    <option value="Ladkiwale (Bride's Clan)">Ladkiwale (Bride)</option>
                    <option value="Mutual / Friends">Mutual / Friends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Dietary Matrix
                  </label>
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose bg-white"
                  >
                    <option value="Pure Jain Chauvihar">Pure Jain Chauvihar</option>
                    <option value="Satvik Vaishnav">Satvik Vaishnav (No Onion/Garlic)</option>
                    <option value="Halal Certified">Halal Certified Mughlai</option>
                    <option value="Global Gourmet">Global Gourmet / Continental</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Family Relation / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maternal Uncle (Mama Ji) or Best Friend"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury"
              >
                Register Atithi to Clan Roster
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Multi-Faith WhatsApp Card Modal */}
      {whatsappModalGuest && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setWhatsappModalGuest(null)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-stitch-charcoal mb-1">
              Multi-Faith WhatsApp Invitation Card
            </h3>
            <p className="text-xs text-stitch-charcoal-muted mb-4">
              Select faith tradition to auto-format auspicious invocations for {whatsappModalGuest.name}:
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain'].map((f) => (
                <button
                  key={f}
                  onClick={() => setInviteFaith(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    inviteFaith === f
                      ? 'bridal-gradient-rose text-white shadow-luxury'
                      : 'bg-stitch-ivory text-stitch-charcoal border border-stitch-border'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-stitch-ivory border border-stitch-border mb-4 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {getWhatsappText(whatsappModalGuest)}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleCopyText(getWhatsappText(whatsappModalGuest))}
                className="py-3 rounded-2xl border border-stitch-border bg-white hover:bg-stitch-ivory text-stitch-charcoal text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(getWhatsappText(whatsappModalGuest))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
