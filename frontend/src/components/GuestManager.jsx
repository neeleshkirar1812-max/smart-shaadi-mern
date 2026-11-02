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
  FileSpreadsheet
} from 'lucide-react';

export default function GuestManager({ 
  guests, 
  stats, 
  onAddGuest, 
  onUpdateGuest, 
  onDeleteGuest, 
  showToast 
}) {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [whatsappModalGuest, setWhatsappModalGuest] = useState(null);
  const [inviteFaith, setInviteFaith] = useState('Hindu');
  const [copied, setCopied] = useState(false);

  // New Guest Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('Bride Side');
  const [diet, setDiet] = useState('Vegetarian');
  const [plusOnes, setPlusOnes] = useState(0);
  const [hotelRoom, setHotelRoom] = useState('TBD');

  const groups = ['All', 'Bride Side', 'Groom Side', 'VIP Guests', 'Common Friends'];

  const filteredGuests = selectedGroup === 'All'
    ? guests
    : guests.filter(g => g.group === selectedGroup);

  const handleCreateGuest = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddGuest({
      name,
      phone,
      group,
      diet,
      plusOnes: Number(plusOnes),
      hotelRoomAssigned: hotelRoom || 'TBD'
    });

    setName('');
    setPhone('');
    setPlusOnes(0);
    setShowAddForm(false);
    showToast('Guest added to royal guest list');
  };

  const getWhatsappText = (guest) => {
    if (inviteFaith === 'Muslim') {
      return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nDear ${guest.name},\n\nIn the Name of Allah, the Most Beneficent, the Most Merciful.\n\nWith immense joy, we invite you and your family to celebrate the blessed Nikah & Walima of:\n\n✨ Ananya & Kabir ✨\n\n📅 Date: 26th - 28th November 2026\n📍 Venue: Riwaaz Heritage Courtyard, Lake Pichola, Udaipur\n\nKindly confirm your RSVP and dietary requirements (${guest.diet}).\n\nWarm regards & Dua,\nThe Sharma & Singhania Families`;
    }
    if (inviteFaith === 'Sikh') {
      return `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥\n\nRespected ${guest.name},\n\nWith the blessings of Sri Waheguru Ji, you are cordially invited to attend the auspicious Anand Karaj (Holy Laavan) celebration of:\n\n☬ Ananya & Kabir ☬\n\n📅 Date: 26th - 28th November 2026\n📍 Venue & Gurudwara: Riwaaz Heritage Courtyard, Udaipur\n\nPlease join us for Kirtan, Anand Karaj, and Guru Ka Langar.\n\nKindly confirm your RSVP.\nWarm regards,\nThe Families`;
    }
    if (inviteFaith === 'Christian') {
      return `✝ "What God has joined together, let no one separate." (Mark 10:9) ✝\n\nDear ${guest.name},\n\nWith hearts full of gratitude, we invite you to witness the Holy Matrimony & Nuptial Blessing of:\n\n💍 Ananya & Kabir 💍\n\n📅 Date: 26th - 28th November 2026\n📍 Venue: Riwaaz Courtyard & Sunset Lawns, Udaipur\n\nKindly RSVP with your dietary preferences (${guest.diet}).\n\nWith love and blessings,\nThe Families`;
    }
    if (inviteFaith === 'Jain') {
      return `॥ ॐ अर्हम् ॥\n\nआदरणीय ${guest.name} (सादर जय जिनेंद्र),\n\nप्रभु महावीर के पावन आशीर्वाद से अनन्या एवं कबीर के शुभ विवाह लग्न उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।\n\n📅 तिथि: 26 - 28 नवंबर 2026\n📍 स्थान: रिवाज़ हेरिटेज कोर्टयार्ड, उदयपुर\n(शुद्ध चौविहार जैन आहार व्यवस्था)\n\nकृपया अपनी उपस्थिति (RSVP) की पुष्टि करें।\n\nसप्रेम निमंत्रण,\nपरिवार`;
    }
    // Default Hindu
    return `॥ श्री गणेशाय नमः ॥\n\nआदरणीय ${guest.name},\n\nहमारे परिवार में अनन्या एवं कबीर के शुभ विवाह उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।\n\n📅 तिथि: 26 - 28 नवंबर 2026\n📍 स्थान: रिवाज़ हेरिटेज कोर्टयार्ड, उदयपुर\n\nकृपया अपनी उपस्थिति (RSVP) की पुष्टि करें।\n\nसप्रेम निमंत्रण,\nपरिवार`;
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
    const headers = ['Name', 'Phone', 'Group/Side', 'RSVP Status', 'Dietary Preference', 'Plus Ones', 'Hotel Room', 'Notes'];
    const rows = guests.map(g => [
      `"${(g.name || '').replace(/"/g, '""')}"`,
      `"${(g.phone || '').replace(/"/g, '""')}"`,
      `"${(g.group || g.side || '').replace(/"/g, '""')}"`,
      `"${(g.rsvpStatus || 'Pending').replace(/"/g, '""')}"`,
      `"${(g.diet || g.mealPreference || 'Standard').replace(/"/g, '""')}"`,
      `"${g.plusOnes || 0}"`,
      `"${(g.hotelRoomAssigned || 'TBD').replace(/"/g, '""')}"`,
      `"${(g.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SmartShaadi_GuestList_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Guest list exported as CSV spreadsheet! 📊');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-royal-ruby block mb-1">
            Hospitality & Atithi Satkar
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Multi-Faith Guest List & RSVP Manager
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage family suites, dietary preferences, and dispatch automated WhatsApp digital invites in all religious formats.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl border border-royal-sand bg-white hover:bg-royal-pearl text-royal-wine font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            title="Export CSV for Caterers & Hotel Reception"
          >
            <Download className="w-3.5 h-3.5 text-royal-gold" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 rounded-xl royal-gradient-ruby text-white font-bold text-xs shadow-md hover:shadow-xl transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Add New Guest'}</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-royal-sand shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Total Invited</span>
            <Users className="w-4 h-4 text-royal-charcoal" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-royal-charcoal">{stats.total || 0}</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Families & Individuals</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-600 mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Confirmed</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-700">{stats.confirmed || 0}</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5">{stats.rsvpPercent || 0}% Response</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-100 shadow-sm bg-amber-50/20">
          <div className="flex items-center justify-between text-amber-600 mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-amber-700">{stats.pending || 0}</span>
          <span className="text-[10px] text-amber-600 block mt-0.5">Awaiting Reply</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm bg-rose-50/20">
          <div className="flex items-center justify-between text-rose-500 mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Declined</span>
            <UserX className="w-4 h-4" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-rose-600">{stats.declined || 0}</span>
          <span className="text-[10px] text-rose-500 block mt-0.5">Unable to attend</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-royal-sand shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-royal-ruby mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Actual Attendees</span>
            <Utensils className="w-4 h-4 text-royal-gold" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-royal-ruby">{stats.totalAttendees || 0}</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Including +1s</span>
        </div>

      </div>

      {/* Add Guest Form (Collapsible) */}
      {showAddForm && (
        <form onSubmit={handleCreateGuest} className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-md mb-8 animate-in fade-in duration-200">
          <h3 className="font-serif text-xl font-bold text-royal-charcoal mb-4">
            Invite Royal Wedding Guest
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Guest / Family Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Tariq & Fatima Khan / Harpreet Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">WhatsApp Phone Number</label>
              <input
                type="text"
                placeholder="+91 98290 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Side / Circle</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 font-bold"
              >
                <option value="Bride Side">Bride Side</option>
                <option value="Groom Side">Groom Side</option>
                <option value="VIP Guests">VIP Guests</option>
                <option value="Common Friends">Common Friends</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Dietary Requirement</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 font-bold"
              >
                <option value="Vegetarian">Vegetarian (Pure)</option>
                <option value="Jain">Jain (Strict No Root Veg)</option>
                <option value="Halal Non-Vegetarian">Halal Non-Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Additional Family Members (+Ones)</label>
              <input
                type="number"
                min="0"
                max="10"
                value={plusOnes}
                onChange={(e) => setPlusOnes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Assigned Haveli Suite</label>
              <input
                type="text"
                placeholder="e.g. Suite 204 - Lake Wing"
                value={hotelRoom}
                onChange={(e) => setHotelRoom(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 font-semibold"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 rounded-xl border text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl royal-gradient-ruby text-white text-xs font-bold shadow"
            >
              Save Guest Entry
            </button>
          </div>
        </form>
      )}

      {/* Group Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-6">
        {groups.map((grp) => (
          <button
            key={grp}
            onClick={() => setSelectedGroup(grp)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedGroup === grp
                ? 'royal-gradient-ruby text-white shadow'
                : 'bg-white text-gray-700 border border-royal-sand hover:bg-gray-50'
            }`}
          >
            {grp}
          </button>
        ))}
      </div>

      {/* RESPONSIVE GUEST LIST: Card view on mobile, table on desktop */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-royal-sand shadow-sm overflow-hidden">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-royal-sand/40 border-b border-royal-sand text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6 font-bold">Guest & Family</th>
                <th className="py-4 px-4 font-bold">Side</th>
                <th className="py-4 px-4 font-bold">Diet</th>
                <th className="py-4 px-4 font-bold">Haveli Room</th>
                <th className="py-4 px-4 font-bold">RSVP Status</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-royal-sand/20 transition">
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900 block text-sm">{guest.name}</span>
                    <span className="text-[11px] text-gray-400">
                      {guest.phone || 'No phone'} • +{guest.plusOnes} family members
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-royal-sand text-gray-700 font-semibold text-[10px]">
                      {guest.group}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-600">
                    {guest.diet}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-royal-gold flex-shrink-0" />
                      {guest.hotelRoomAssigned}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={guest.rsvpStatus}
                      onChange={(e) => onUpdateGuest(guest.id, { rsvpStatus: e.target.value })}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none ${
                        guest.rsvpStatus === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : guest.rsvpStatus === 'Declined'
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setWhatsappModalGuest(guest)}
                      title="Send WhatsApp Digital Invite"
                      className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="font-bold text-[10px]">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => onDeleteGuest(guest.id)}
                      title="Delete Entry"
                      className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredGuests.map((guest) => (
            <div key={guest.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{guest.name}</h4>
                  <span className="text-[11px] text-gray-500 block">
                    {guest.phone || 'No phone'} • +{guest.plusOnes} members
                  </span>
                </div>
                <select
                  value={guest.rsvpStatus}
                  onChange={(e) => onUpdateGuest(guest.id, { rsvpStatus: e.target.value })}
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${
                    guest.rsvpStatus === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : guest.rsvpStatus === 'Declined'
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="px-2 py-0.5 rounded bg-royal-sand text-[10px] font-semibold">{guest.group}</span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-semibold">🍽️ {guest.diet}</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-semibold">🏨 {guest.hotelRoomAssigned}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <button
                  onClick={() => setWhatsappModalGuest(guest)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Send WhatsApp Invite</span>
                </button>
                <button
                  onClick={() => onDeleteGuest(guest.id)}
                  className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Multi-Faith WhatsApp Digital Invite Modal */}
      {whatsappModalGuest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-royal-sand relative animate-in fade-in duration-200">
            <button
              onClick={() => setWhatsappModalGuest(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Multi-Faith WhatsApp Digital Invite</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
              Invite {whatsappModalGuest.name}
            </h3>

            {/* Faith Choice Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 my-3">
              {[
                { id: 'Hindu', label: '🕉️ Hindu (Shree Ganesh)' },
                { id: 'Muslim', label: '☪️ Muslim (Bismillah)' },
                { id: 'Sikh', label: '☬ Sikh (Ik Onkar)' },
                { id: 'Christian', label: '✝️ Christian (Nuptials)' },
                { id: 'Jain', label: '🪷 Jain (Om Arham)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setInviteFaith(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                    inviteFaith === f.id
                      ? 'royal-gradient-ruby text-white border-royal-ruby shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Message Preview */}
            <div className="p-4 rounded-2xl bg-royal-sand/40 border border-royal-sand text-xs text-gray-700 font-medium whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
              {getWhatsappText(whatsappModalGuest)}
            </div>

            {/* Actions */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleCopyText(getWhatsappText(whatsappModalGuest))}
                className="py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?${whatsappModalGuest.phone ? `phone=${whatsappModalGuest.phone.replace(/[^0-9]/g, '')}&` : ''}text=${encodeURIComponent(getWhatsappText(whatsappModalGuest))}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
