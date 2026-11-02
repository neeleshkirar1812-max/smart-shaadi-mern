import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Plus, 
  MapPin, 
  UserPlus, 
  Trash2, 
  Sparkles, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Search,
  Layers,
  Armchair
} from 'lucide-react';

const ZONES = ['All Zones', 'Palace Terrace', 'Lake View Lawn', 'Poolside Gazebo', 'Main Pavilion'];

export default function SeatingPlanner({ guests = [], showToast }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState('All Zones');

  // Add Table Modal state
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableCapacity, setNewTableCapacity] = useState(10);
  const [newTableZone, setNewTableZone] = useState('Main Pavilion');
  const [submittingTable, setSubmittingTable] = useState(false);

  // Assign Guest Modal state
  const [assigningTableId, setAssigningTableId] = useState(null);
  const [selectedGuestName, setSelectedGuestName] = useState('');
  const [customGuestName, setCustomGuestName] = useState('');
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/tables');
      setTables(res.data);
    } catch {
      showToast?.('Could not load seating tables', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    if (!newTableName.trim()) {
      showToast?.('Please enter a table name', 'error');
      return;
    }

    setSubmittingTable(true);
    try {
      const res = await axios.post('/api/tables', {
        name: newTableName.trim(),
        capacity: Number(newTableCapacity),
        zone: newTableZone
      });
      setTables(prev => [...prev, res.data]);
      setNewTableName('');
      setShowAddTableModal(false);
      showToast?.(`Table "${res.data.name}" added to seating floor plan! 🪑`, 'success');
    } catch {
      showToast?.('Failed to create table', 'error');
    } finally {
      setSubmittingTable(false);
    }
  };

  const handleAssignGuest = async (e) => {
    e.preventDefault();
    const guestToAssign = customGuestName.trim() || selectedGuestName;
    if (!guestToAssign) {
      showToast?.('Please pick or enter a guest name', 'error');
      return;
    }

    setAssigning(true);
    try {
      const res = await axios.post(`/api/tables/${assigningTableId}/assign`, {
        guestName: guestToAssign
      });
      setTables(prev => prev.map(t => t.id === assigningTableId ? res.data : t));
      setAssigningTableId(null);
      setSelectedGuestName('');
      setCustomGuestName('');
      showToast?.(`${guestToAssign} assigned to table!`, 'success');
    } catch {
      showToast?.('Could not assign guest', 'error');
    } finally {
      setAssigning(false);
    }
  };

  const handleUnassignGuest = async (tableId, guestName) => {
    try {
      // Axios DELETE with body requires 'data' key
      const res = await axios.delete(`/api/tables/${tableId}/unassign`, {
        data: { guestName }
      });
      setTables(prev => prev.map(t => t.id === tableId ? res.data : t));
      showToast?.(`${guestName} unassigned`, 'info');
    } catch {
      showToast?.('Could not unassign guest', 'error');
    }
  };

  const handleExportSeatingChart = () => {
    const chartContent = tables.map(t => {
      const guestList = t.guests.length > 0 ? t.guests.map((g, i) => `   ${i + 1}. ${g}`).join('\n') : '   (No guests seated)';
      return `[${t.zone.toUpperCase()}] ${t.name} (Seats: ${t.guests.length}/${t.capacity})\n${guestList}\n`;
    }).join('\n----------------------------------------\n\n');

    const blob = new Blob([
      `=======================================================\n` +
      `SMART SHAADI - OFFICIAL BANQUET SEATING CHART & GUEST RUN\n` +
      `Venue: Oberoi Udaivilas | Generated: ${new Date().toLocaleDateString()}\n` +
      `Total Tables: ${tables.length} | Total Capacity: ${tables.reduce((s, t) => s + t.capacity, 0)}\n` +
      `=======================================================\n\n` +
      chartContent
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SmartShaadi_Seating_Chart_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.('Seating chart exported for banquet staff! 🪑', 'success');
  };

  // Compute metrics
  const totalCapacity = tables.reduce((sum, t) => sum + (t.capacity || 0), 0);
  const totalSeated = tables.reduce((sum, t) => sum + (t.guests?.length || 0), 0);
  const allAssignedNames = new Set(tables.flatMap(t => t.guests || []));

  // Available guests from guest prop not yet seated
  const unseatedGuests = guests.filter(g => !allAssignedNames.has(g.name));

  const filteredTables = selectedZone === 'All Zones'
    ? tables
    : tables.filter(t => t.zone === selectedZone);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden royal-gradient-wine p-8 sm:p-12 mb-8 shadow-2xl border border-royal-gold/30 text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-royal-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-royal-gold/40 text-royal-lightGold text-xs font-cinzel uppercase tracking-widest mb-3">
              <Armchair className="w-3.5 h-3.5" />
              <span>Royal Banquet & Hospitality Desk</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Seating & Dining Floor Planner
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
              Organize royal VVIP stages, family roundtables, and friends lounges across Palace lawns and terraces. Prevent overcrowding and ensure seamless table steward service.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAddTableModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-royal-gold hover:bg-royal-goldHover text-royal-charcoal font-bold text-sm shadow-luxury transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dining Table</span>
            </button>
            <button
              onClick={handleExportSeatingChart}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all"
            >
              <Download className="w-4 h-4 text-royal-lightGold" />
              <span>Export Floor Chart</span>
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15">
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Total Tables</p>
            <p className="font-serif text-2xl font-bold text-royal-lightGold">{tables.length}</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Total Chair Capacity</p>
            <p className="font-serif text-2xl font-bold text-white">{totalCapacity}</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Guests Seated</p>
            <p className="font-serif text-2xl font-bold text-emerald-300">{totalSeated}</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Available Chairs</p>
            <p className="font-serif text-2xl font-bold text-royal-lightGold">
              {Math.max(0, totalCapacity - totalSeated)}
            </p>
          </div>
        </div>
      </div>

      {/* Zone Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Layers className="w-4 h-4 text-royal-wine flex-shrink-0 mr-1" />
          {ZONES.map(zone => {
            const isActive = selectedZone === zone;
            return (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'royal-gradient-wine text-white shadow-md'
                    : 'bg-white text-royal-slate hover:bg-royal-sand/50 border border-royal-sand/80'
                }`}
              >
                {zone}
              </button>
            );
          })}
        </div>

        {unseatedGuests.length > 0 && (
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-medium">
            {unseatedGuests.length} RSVP guests waiting for table allocation
          </span>
        )}
      </div>

      {/* Tables Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-royal-sand">
          <Armchair className="w-10 h-10 text-royal-wine animate-pulse mx-auto mb-3" />
          <p className="text-royal-charcoal font-serif font-bold">Arranging Banquet Floor...</p>
        </div>
      ) : filteredTables.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-royal-sand">
          <Armchair className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-royal-charcoal font-serif text-lg font-bold">No tables found in this zone</p>
          <button
            onClick={() => setShowAddTableModal(true)}
            className="mt-4 px-5 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-md"
          >
            Create Table
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTables.map(table => {
            const seatsFilled = table.guests?.length || 0;
            const percentFilled = Math.min(100, Math.round((seatsFilled / table.capacity) * 100));
            const isFull = seatsFilled >= table.capacity;

            return (
              <div
                key={table.id}
                className="bg-white rounded-3xl p-6 border border-royal-sand/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-royal-pearl text-royal-wine font-cinzel border border-royal-sand">
                      <MapPin className="w-3 h-3 text-royal-gold" />
                      <span>{table.zone}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isFull ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isFull ? 'Full Table' : `${table.capacity - seatsFilled} Seats Left`}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-royal-charcoal">
                    {table.name}
                  </h3>

                  {/* Progress capacity bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Occupancy</span>
                      <span className="font-bold text-royal-charcoal">{seatsFilled} / {table.capacity} guests</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-royal-sand/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFull ? 'bg-red-500' : percentFilled > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Guests seated list */}
                  <div className="mt-5 space-y-2">
                    <p className="text-[11px] font-cinzel font-bold text-gray-400 uppercase tracking-wider">
                      Seated Guests ({seatsFilled})
                    </p>
                    {table.guests?.length === 0 ? (
                      <p className="text-xs text-gray-400 italic py-2">No guests allocated to this table yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {table.guests.map((g, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-royal-pearl border border-royal-sand text-xs text-royal-charcoal font-medium group"
                          >
                            <span>{g}</span>
                            <button
                              onClick={() => handleUnassignGuest(table.id, g)}
                              className="text-gray-400 hover:text-red-600 transition"
                              title="Unseat guest"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Table Actions */}
                <div className="mt-6 pt-4 border-t border-royal-sand flex items-center justify-between">
                  <button
                    disabled={isFull}
                    onClick={() => setAssigningTableId(table.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl royal-gradient-wine text-white text-xs font-bold hover:shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-royal-lightGold" />
                    <span>Seat Guest</span>
                  </button>

                  <span className="text-[11px] text-gray-400">
                    Max: {table.capacity} pax
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1. Modal: Create New Table */}
      {showAddTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-royal-gold/40 relative">
            <div className="flex items-center justify-between pb-4 border-b border-royal-sand">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl royal-gradient-wine flex items-center justify-center text-royal-gold">
                  <Armchair className="w-5 h-5 text-royal-lightGold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-royal-charcoal">Add Dining Table</h3>
                  <p className="text-xs text-gray-500">Configure table name, seats & zone</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddTableModal(false)}
                className="w-8 h-8 rounded-full bg-royal-pearl flex items-center justify-center text-gray-400 hover:text-royal-wine hover:bg-royal-sand transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTable} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                  Table Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Table 5: Bride Cousins Lounge"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine focus:ring-2 focus:ring-royal-wine/20 text-sm font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Chair Capacity
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={newTableCapacity}
                    onChange={(e) => setNewTableCapacity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Venue Zone
                  </label>
                  <select
                    value={newTableZone}
                    onChange={(e) => setNewTableZone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine text-sm font-sans"
                  >
                    <option value="Palace Terrace">Palace Terrace</option>
                    <option value="Lake View Lawn">Lake View Lawn</option>
                    <option value="Poolside Gazebo">Poolside Gazebo</option>
                    <option value="Main Pavilion">Main Pavilion</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-royal-sand">
                <button
                  type="button"
                  onClick={() => setShowAddTableModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-royal-pearl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingTable}
                  className="px-6 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-luxury transition disabled:opacity-50"
                >
                  {submittingTable ? 'Creating...' : 'Create Table'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Assign Guest to Table */}
      {assigningTableId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-royal-gold/40 relative">
            <div className="flex items-center justify-between pb-4 border-b border-royal-sand">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl royal-gradient-wine flex items-center justify-center text-royal-gold">
                  <UserPlus className="w-5 h-5 text-royal-lightGold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-royal-charcoal">Seat Guest at Table</h3>
                  <p className="text-xs text-gray-500">Pick from RSVP list or enter custom name</p>
                </div>
              </div>
              <button
                onClick={() => setAssigningTableId(null)}
                className="w-8 h-8 rounded-full bg-royal-pearl flex items-center justify-center text-gray-400 hover:text-royal-wine hover:bg-royal-sand transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignGuest} className="mt-5 space-y-4">
              {guests.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Select from Guest List
                  </label>
                  <select
                    value={selectedGuestName}
                    onChange={(e) => {
                      setSelectedGuestName(e.target.value);
                      if (e.target.value) setCustomGuestName('');
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine text-sm font-sans"
                  >
                    <option value="">-- Choose confirmed guest --</option>
                    {guests.map(g => (
                      <option key={g.id || g.name} value={g.name}>
                        {g.name} ({g.side || 'Guest'})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                  Or Enter Custom Guest Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Uncle Rajesh Kapoor"
                  value={customGuestName}
                  onChange={(e) => {
                    setCustomGuestName(e.target.value);
                    if (e.target.value) setSelectedGuestName('');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine text-sm font-sans"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-royal-sand">
                <button
                  type="button"
                  onClick={() => setAssigningTableId(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-royal-pearl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-6 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-luxury transition disabled:opacity-50"
                >
                  {assigning ? 'Allocating...' : 'Allocate Seat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
