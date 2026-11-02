import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles,
  PieChart,
  Save,
  Check,
  RotateCcw,
  Printer,
  FileText,
  ShieldCheck,
  AlertTriangle,
  X,
  TrendingDown,
  DollarSign
} from 'lucide-react';

export default function WeddingPlanner({ 
  wedding, 
  onUpdateWedding, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask, 
  onAddSchedule, 
  onDeleteSchedule,
  onOpenInvoice,
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('budget'); // budget, checklist, schedule
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(wedding?.budget || 25000000);
  const [selectedTradition, setSelectedTradition] = useState('Hindu Vivah');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Venue');

  // Expense modal with Price Shield validation state
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseItemName, setExpenseItemName] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Catering & Banquets');
  const [expenseAmount, setExpenseAmount] = useState('450000');
  const [expenseVendor, setExpenseVendor] = useState('The Leela Palace Catering');
  const [customExpenses, setCustomExpenses] = useState([
    { id: 'exp-1', name: 'Mewar Ballroom & Floating Lawns Rental', category: 'Palace Venue', amount: 850000, vendor: 'The Leela Palace Udaipur', status: 'verified', savingPct: 12 },
    { id: 'exp-2', name: 'Satvik Royal Thali & Jain Chauvihar Degs', category: 'Catering & Banquets', amount: 980000, vendor: 'Shahi Vaishnav Rasoi', status: 'verified', savingPct: 8 },
    { id: 'exp-3', name: 'Vedic Mandap & Jasmine Floral Chandelier', category: 'Production & Decor', amount: 480000, vendor: 'Heritage Mandap Studios', status: 'verified', savingPct: 15 },
    { id: 'exp-4', name: 'RED Rigs & Drone Pilot Cinema Package', category: 'Photography & Cinema', amount: 375000, vendor: 'WedMoire 4K Cinema', status: 'verified', savingPct: 10 }
  ]);

  // Schedule form state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-11-26');
  const [newEventTime, setNewEventTime] = useState('11:00 AM');
  const [newEventLocation, setNewEventLocation] = useState('Courtyard Lawn');
  const [newEventDressCode, setNewEventDressCode] = useState('Pastel Festive');

  const budget = wedding?.budget || 25000000;
  const totalCustomExpenses = customExpenses.reduce((sum, item) => sum + item.amount, 0);
  const spent = (wedding?.spent || 1280000) + totalCustomExpenses;
  const remaining = Math.max(0, budget - spent);
  const spentPercentage = Math.min(100, Math.round((spent / budget) * 100));

  const tasks = wedding?.tasks || [];
  const completedTasks = tasks.filter(t => t.done).length;
  const taskProgress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const traditions = [
    { id: 'Hindu Vivah', emoji: '🕉️' },
    { id: 'Muslim Nikah', emoji: '☪️' },
    { id: 'Sikh Anand Karaj', emoji: '☬' },
    { id: 'Christian Nuptials', emoji: '✝️' },
    { id: 'Jain Vivah', emoji: '🪷' }
  ];

  // Price Shield benchmark reference data
  const luxuryBenchmarks = {
    'Palace Venue': 1000000,
    'Catering & Banquets': 1200000,
    'Production & Decor': 600000,
    'Photography & Cinema': 450000,
    'Bridal & Groom Couture': 350000,
    'Music, DJ & Shehnai': 250000
  };

  const currentBenchmark = luxuryBenchmarks[expenseCategory] || 500000;
  const quotedNum = Number(expenseAmount) || 0;
  const isOverpriced = quotedNum > currentBenchmark * 1.25;
  const priceShieldVariance = Math.round(((quotedNum - currentBenchmark) / currentBenchmark) * 100);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseItemName.trim() || quotedNum <= 0) return;

    const newExp = {
      id: `exp-${Date.now()}`,
      name: expenseItemName.trim(),
      category: expenseCategory,
      amount: quotedNum,
      vendor: expenseVendor.trim() || 'Verified Partner',
      status: isOverpriced ? 'flagged' : 'verified',
      savingPct: isOverpriced ? 0 : Math.abs(priceShieldVariance) || 5
    };

    setCustomExpenses([newExp, ...customExpenses]);
    setExpenseItemName('');
    setExpenseAmount('350000');
    setExpenseModalOpen(false);
    showToast(`Expense added with Price Shield validation! 🛡️`);
  };

  const handleToggle = (taskId, currentStatus) => {
    onToggleTask(taskId, !currentStatus);
    if (!currentStatus) {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#9B111E', '#FFDF73', '#084C38']
      });
      showToast('Milestone achieved! ✨');
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask({ text: newTaskText, category: newTaskCategory });
    setNewTaskText('');
    showToast('New milestone added');
  };

  const handleSaveBudget = (budgetAmount) => {
    onUpdateWedding({ budget: Number(budgetAmount || newBudget) });
    setIsEditingBudget(false);
    showToast('Corpus allocation updated successfully ✨');
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    onAddSchedule({
      event: newEventTitle,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      dressCode: newEventDressCode
    });
    setNewEventTitle('');
    showToast('Event added to schedule');
  };

  const applyTraditionChecklist = (tradition) => {
    setSelectedTradition(tradition);
    let presetTasks = [];
    if (tradition === 'Muslim Nikah') {
      presetTasks = [
        { text: 'Book Licensed Qazi for Nikah & Nikahnama documentation', category: 'Officiant' },
        { text: 'Confirm Mehr terms & bride-groom mutual consent', category: 'Ritual' },
        { text: 'Finalize 100% Halal Awadhi Dum Pukht Caterer for Walima', category: 'Catering' },
        { text: 'Arrange Manjha & Mehendi Ki Raat with live Sufi Qawwali', category: 'Music' },
        { text: 'Order bespoke Bridal Sharara & Groom Sherwani', category: 'Attire' }
      ];
    } else if (tradition === 'Sikh Anand Karaj') {
      presetTasks = [
        { text: 'Book Gurudwara Sahib & Hazuri Ragi Kirtan Jatha (4 Laavan)', category: 'Officiant' },
        { text: 'Coordinate Milni family garlands & Ardas outside Darbar', category: 'Ritual' },
        { text: 'Arrange traditional Jaggo procession & Punjabi Dhol night', category: 'Music' },
        { text: 'Coordinate Guru Ka Langar seating and pristine community service', category: 'Catering' },
        { text: 'Order ceremonial Kirpan, Rumala Sahib, and Dupatta', category: 'Ritual' }
      ];
    } else if (tradition === 'Christian Nuptials') {
      presetTasks = [
        { text: 'Schedule Pre-Cana counseling sessions with parish priest', category: 'Officiant' },
        { text: 'Book Church choir and organist for Wagner Bridal Chorus', category: 'Music' },
        { text: 'Finalize multi-tiered royal fruitcake and champagne fountain', category: 'Catering' },
        { text: 'Order bespoke white bridal gown with cathedral veil', category: 'Attire' },
        { text: 'Rehearse aisle walk & exchange of golden wedding rings', category: 'Ritual' }
      ];
    } else if (tradition === 'Jain Vivah') {
      presetTasks = [
        { text: 'Confirm Jain Vidhikar Pandit for Navkar Mantra & Sapta Niyama', category: 'Officiant' },
        { text: 'Setup 100% Pure Jain Chauvihar kitchen (Zero root vegetables)', category: 'Catering' },
        { text: 'Coordinate sunset Phere timing before twilight (Chauvihar)', category: 'Ritual' },
        { text: 'Arrange traditional Shehnai and Mangal Vaadya for Baraat entry', category: 'Music' },
        { text: 'Organize Ashirvachan thali and silver coin distribution for elders', category: 'Ritual' }
      ];
    } else {
      presetTasks = [
        { text: 'Book Vedic Pandit for Saat Phere & Kundali Lagna Muhurat', category: 'Officiant' },
        { text: 'Confirm Floating Lakeview Mandap & Agni Kund setup', category: 'Venue' },
        { text: 'Finalize live Shehnai and Dhol Tasha for royal Baraat entry', category: 'Music' },
        { text: 'Coordinate Saptapadi vows bilingual explanation for guests', category: 'Ritual' },
        { text: 'Curate 7-course Satvik Marwari & Royal Dal Baati banquet', category: 'Catering' }
      ];
    }

    presetTasks.forEach(t => onAddTask(t));
    showToast(`Loaded ${tradition} ceremony milestones!`);
  };

  const budgetCategories = [
    { name: 'Catering & Banquets', pct: 32, amount: Math.round(budget * 0.32), color: 'bg-amber-500' },
    { name: 'Palace Venue & Rooms', pct: 25, amount: Math.round(budget * 0.25), color: 'bg-stitch-rose' },
    { name: 'Production, Mandap & Decor', pct: 15, amount: Math.round(budget * 0.15), color: 'bg-pink-500' },
    { name: 'Photography & 4K Cinema', pct: 12, amount: Math.round(budget * 0.12), color: 'bg-indigo-500' },
    { name: 'Bridal & Groom Couture', pct: 8, amount: Math.round(budget * 0.08), color: 'bg-purple-500' },
    { name: 'Pandit / Qazi / Priest & Music', pct: 4, amount: Math.round(budget * 0.04), color: 'bg-emerald-500' },
    { name: 'Buffer / Contingency Fund', pct: 4, amount: Math.round(budget * 0.04), color: 'bg-gray-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-stitch-rose">
              Personalized Wedding Command Center
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Price Shield Active
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stitch-charcoal">
            {wedding?.coupleName || 'Ananya & Kabir'}&apos;s Wedding Desk
          </h2>
          <p className="text-xs text-stitch-charcoal-muted mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stitch-rose" />
              {wedding?.city || 'Udaipur, Rajasthan'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stitch-gold" />
              {wedding?.weddingDate || '28 Nov 2026'}
            </span>
          </p>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setExpenseModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stitch-gold-light border border-stitch-gold-border text-stitch-charcoal text-xs font-bold shadow-xs hover:bg-stitch-ivory transition"
          >
            <ShieldCheck className="w-4 h-4 text-stitch-gold" />
            <span>Validate Expense</span>
          </button>

          {onOpenInvoice && (
            <button
              onClick={onOpenInvoice}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stitch-ivory border border-stitch-border shadow-xs text-stitch-rose text-xs font-bold transition"
            >
              <Printer className="w-3.5 h-3.5 text-stitch-gold" />
              <span>Royal Invoice & Estimate</span>
            </button>
          )}

          <div className="flex bg-white p-1 rounded-2xl border border-stitch-border shadow-sm overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 sm:px-5 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'bridal-gradient-rose text-white shadow-luxury'
                  : 'text-stitch-charcoal-subtle hover:text-stitch-rose'
              }`}
            >
              Budget Desk
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 sm:px-5 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'checklist'
                  ? 'bridal-gradient-rose text-white shadow-luxury'
                  : 'text-stitch-charcoal-subtle hover:text-stitch-rose'
              }`}
            >
              <span>Milestones</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{completedTasks}/{tasks.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 sm:px-5 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bridal-gradient-rose text-white shadow-luxury'
                  : 'text-stitch-charcoal-subtle hover:text-stitch-rose'
              }`}
            >
              3-Day Schedule
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BUDGET & CORPUS ALLOCATION */}
      {activeTab === 'budget' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          {/* Quick Corpus Presets */}
          <div className="bg-white p-4 rounded-2xl border border-stitch-border shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-stitch-charcoal block">Corpus Presets:</span>
              <span className="text-[10px] text-stitch-charcoal-muted">Switch total wedding corpus scale with one click</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '₹50 Lakhs (Intimate Palace)', val: 5000000 },
                { label: '₹1.5 Crore (Grand Royal)', val: 15000000 },
                { label: '₹2.5 Crore (Imperial Luxury)', val: 25000000 },
                { label: '₹5 Crore (Maharaja Scale)', val: 50000000 }
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSaveBudget(p.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    budget === p.val
                      ? 'bridal-gradient-rose text-white shadow-xs'
                      : 'bg-stitch-ivory text-stitch-charcoal border border-stitch-border hover:bg-stitch-rose-wash'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Total Planned Corpus */}
            <div className="bg-white rounded-3xl p-6 border border-stitch-border shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stitch-charcoal-muted">Total Wedding Corpus</span>
                <button
                  onClick={() => setIsEditingBudget(!isEditingBudget)}
                  className="text-xs text-stitch-rose font-semibold hover:underline"
                >
                  {isEditingBudget ? 'Cancel' : 'Custom'}
                </button>
              </div>

              {isEditingBudget ? (
                <div className="space-y-3">
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full text-lg font-serif font-bold p-2.5 rounded-xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                  />
                  <button
                    onClick={() => handleSaveBudget(newBudget)}
                    className="w-full py-2 bg-stitch-rose hover:bg-stitch-rose-deep text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Apply Corpus</span>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="font-serif text-3xl font-bold text-stitch-charcoal">
                    ₹{budget.toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs text-stitch-charcoal-muted mt-2 block font-medium">
                    Allocated across 7 luxury sector categories
                  </span>
                </div>
              )}
            </div>

            {/* Committed & Spent */}
            <div className="bg-white rounded-3xl p-6 border border-stitch-border shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stitch-charcoal-muted block mb-3">
                Committed & Escrowed
              </span>
              <div className="font-serif text-3xl font-bold text-stitch-rose">
                ₹{spent.toLocaleString('en-IN')}
              </div>
              <div className="mt-3 w-full bg-stitch-ivory rounded-full h-2 overflow-hidden border border-stitch-border">
                <div
                  className="h-full bg-stitch-rose rounded-full transition-all duration-500"
                  style={{ width: `${spentPercentage}%` }}
                />
              </div>
              <span className="text-xs text-stitch-charcoal-muted mt-2 block font-medium">
                {spentPercentage}% of total corpus deployed
              </span>
            </div>

            {/* Remaining */}
            <div className="bg-white rounded-3xl p-6 border border-stitch-border shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stitch-charcoal-muted block mb-3">
                Remaining Cushion
              </span>
              <div className="font-serif text-3xl font-bold text-emerald-700">
                ₹{remaining.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-emerald-800 font-semibold mt-2 block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-stitch-gold" />
                Guaranteed reserve for unpredicted requirements
              </span>
            </div>

          </div>

          {/* Price Shield Expenses Ledger */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stitch-charcoal flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Price Shield Validated Expenses Ledger</span>
                </h3>
                <p className="text-xs text-stitch-charcoal-muted mt-0.5">
                  Every vendor quote is audited against standard luxury benchmarks to prevent wedding price inflation.
                </p>
              </div>
              <button
                onClick={() => setExpenseModalOpen(true)}
                className="px-4 py-2 rounded-xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Audit & Add Expense</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stitch-border text-stitch-charcoal-muted uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Expense Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Vendor</th>
                    <th className="py-3 px-3 text-right">Quoted Amount</th>
                    <th className="py-3 px-3 text-center">Price Shield Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stitch-border font-medium">
                  {customExpenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-stitch-ivory/60 transition">
                      <td className="py-3.5 px-3 font-bold text-stitch-charcoal">{exp.name}</td>
                      <td className="py-3.5 px-3 text-stitch-charcoal-subtle">{exp.category}</td>
                      <td className="py-3.5 px-3 text-stitch-charcoal-subtle">{exp.vendor}</td>
                      <td className="py-3.5 px-3 text-right font-serif font-bold text-stitch-charcoal">
                        ₹{exp.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {exp.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Verified ({exp.savingPct}% below peak)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            Negotiation Advisory Active
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stitch-border shadow-xs">
            <h3 className="font-serif text-xl font-bold text-stitch-charcoal mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-stitch-rose" />
              <span>Recommended Multi-Faith Wedding Sector Allocation</span>
            </h3>

            <div className="space-y-3">
              {budgetCategories.map((cat, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl hover:bg-stitch-ivory transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full ${cat.color} flex-shrink-0`} />
                    <span className="text-xs sm:text-sm font-bold text-stitch-charcoal">{cat.name}</span>
                    <span className="text-xs text-stitch-charcoal-muted font-semibold">({cat.pct}%)</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-sm font-bold text-stitch-charcoal">
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MILESTONES & CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          {/* Tradition Presets Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stitch-border shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-stitch-charcoal">
                  Switch Tradition Checklist
                </h4>
                <p className="text-xs text-stitch-charcoal-muted">
                  Select your ceremony style to load rituals specific to your faith:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {traditions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTraditionChecklist(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    selectedTradition === t.id
                      ? 'bridal-gradient-rose text-white shadow-luxury'
                      : 'bg-stitch-ivory text-stitch-charcoal border border-stitch-border hover:bg-stitch-rose-wash'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add Milestone Form */}
          <div className="bg-white rounded-3xl p-6 border border-stitch-border shadow-xs">
            <h4 className="font-serif text-base font-bold text-stitch-charcoal mb-3">Add Bespoke Milestone</h4>
            <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. Schedule rehearsal dinner with Qazi / Pandit / Priest..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
              />
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose bg-white"
              >
                <option value="Venue">Venue & Mandap</option>
                <option value="Catering">Catering & Feasts</option>
                <option value="Officiant">Officiant & Rituals</option>
                <option value="Music">Music & Sangeet</option>
                <option value="Attire">Bridal Couture</option>
              </select>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </form>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  task.done 
                    ? 'bg-stitch-ivory/50 border-stitch-border opacity-70' 
                    : 'bg-white border-stitch-border shadow-xs hover:border-stitch-gold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(task.id, task.done)}
                    className="text-stitch-rose focus:outline-none flex-shrink-0"
                  >
                    {task.done ? (
                      <CheckCircle2 className="w-6 h-6 fill-stitch-rose text-white" />
                    ) : (
                      <Circle className="w-6 h-6 text-stitch-border hover:text-stitch-rose" />
                    )}
                  </button>
                  <div>
                    <p className={`text-xs sm:text-sm font-semibold ${task.done ? 'line-through text-stitch-charcoal-muted' : 'text-stitch-charcoal'}`}>
                      {task.text}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-stitch-charcoal-muted">
                      {task.category || 'Milestone'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-2 text-gray-300 hover:text-red-500 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: 3-DAY ITINERARY SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          {/* Add Schedule Form */}
          <div className="bg-white rounded-3xl p-6 border border-stitch-border shadow-xs">
            <h4 className="font-serif text-base font-bold text-stitch-charcoal mb-3">Add Itinerary Ceremony</h4>
            <form onSubmit={handleCreateSchedule} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Ceremony Title e.g. Saat Phere / Anand Karaj / Nikah"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
                <input
                  type="date"
                  required
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Time e.g. 06:30 PM (Sunset Muhurat)"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
                <input
                  type="text"
                  placeholder="Location e.g. Lake Pichola Floating Mandap"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  className="text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
                <input
                  type="text"
                  placeholder="Dress Code e.g. Pastel Royal Chanderi Silk"
                  value={newEventDressCode}
                  onChange={(e) => setNewEventDressCode(e.target.value)}
                  className="text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury"
              >
                Save Ceremony Event to Itinerary
              </button>
            </form>
          </div>

          {/* Schedule Events List */}
          <div className="space-y-4">
            {wedding?.schedule?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-stitch-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bridal-gradient-rose text-white flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-luxury">
                    <Clock className="w-4 h-4 mb-0.5 text-stitch-gold-light" />
                    <span className="text-[10px] leading-none">{item.time?.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stitch-charcoal">
                      {item.event}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stitch-charcoal-muted mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stitch-rose" /> {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stitch-gold" /> {item.location}
                      </span>
                      {item.dressCode && (
                        <span className="px-2.5 py-0.5 rounded-full bg-stitch-rose-wash text-stitch-rose text-[10px] font-bold">
                          👗 {item.dressCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteSchedule(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 rounded-xl transition self-end sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Price Shield Expense Validation Modal */}
      {expenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setExpenseModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stitch-charcoal">
                Price Shield Expense Auditor
              </h3>
            </div>
            <p className="text-xs text-stitch-charcoal-muted mb-5">
              Live benchmark validation against authentic royal palace rates in Rajasthan & Delhi NCR.
            </p>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Expense Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Floating Mandap Setup & 1000kg Fresh Marigold"
                  value={expenseItemName}
                  onChange={(e) => setExpenseItemName(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Sector Category
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose bg-white"
                  >
                    <option value="Palace Venue">Palace Venue</option>
                    <option value="Catering & Banquets">Catering & Banquets</option>
                    <option value="Production & Decor">Production & Decor</option>
                    <option value="Photography & Cinema">Photography & Cinema</option>
                    <option value="Bridal & Groom Couture">Bridal & Groom Couture</option>
                    <option value="Music, DJ & Shehnai">Music, DJ & Shehnai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Quoted Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Vendor / Studio Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. WedMoire Studios or The Leela Palace"
                  value={expenseVendor}
                  onChange={(e) => setExpenseVendor(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              {/* Live Price Shield Telemetry Verdict */}
              <div className={`p-4 rounded-2xl border text-xs ${
                isOverpriced 
                  ? 'bg-amber-50 border-amber-300 text-amber-900' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold flex items-center gap-1.5">
                    {isOverpriced ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    {isOverpriced ? 'Price Shield Advisory Alert' : 'Price Shield Verified: Fair Luxury Rate'}
                  </span>
                  <strong className="font-mono">{priceShieldVariance > 0 ? `+${priceShieldVariance}%` : `${priceShieldVariance}%`}</strong>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {isOverpriced 
                    ? `This quote is ${priceShieldVariance}% higher than standard luxury benchmarks (₹${currentBenchmark.toLocaleString('en-IN')}). SmartShaadi advisory recommends requesting itemized breakdown.` 
                    : `This quote sits comfortably within standard vetted palace benchmarks. Zero artificial wedding markups detected.`}
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury"
              >
                Commit Expense with Price Shield Seal
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
