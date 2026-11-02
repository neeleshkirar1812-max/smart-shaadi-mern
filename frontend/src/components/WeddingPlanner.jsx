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
  FileText
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
  const [newBudget, setNewBudget] = useState(wedding?.budget || 2500000);
  const [selectedTradition, setSelectedTradition] = useState('Hindu Vivah');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Venue');

  // Schedule form state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-11-26');
  const [newEventTime, setNewEventTime] = useState('11:00 AM');
  const [newEventLocation, setNewEventLocation] = useState('Courtyard Lawn');
  const [newEventDressCode, setNewEventDressCode] = useState('Pastel Festive');

  const budget = wedding?.budget || 2500000;
  const spent = wedding?.spent || 1280000;
  const remaining = budget - spent;
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

  const handleSaveBudget = () => {
    onUpdateWedding({ budget: Number(newBudget) });
    setIsEditingBudget(false);
    showToast('Budget updated successfully');
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

  // Load tradition presets
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
        { text: 'Curate maternal Chooda & Kalire ceremony accessories', category: 'Attire' }
      ];
    } else if (tradition === 'Christian Nuptials') {
      presetTasks = [
        { text: 'Confirm Church Nuptial Mass date with Parish Priest', category: 'Officiant' },
        { text: 'Complete Pre-Cana marriage preparation sessions', category: 'Ritual' },
        { text: 'Rehearse bridal party procession cues & ring exchange vows', category: 'Ritual' },
        { text: 'Hire 4-part choir ensemble & organist for Ave Maria', category: 'Music' },
        { text: 'Organize Sunset Lawn Cocktail Hour & Champagne Toast', category: 'Catering' }
      ];
    } else if (tradition === 'Jain Vivah') {
      presetTasks = [
        { text: 'Conduct auspicious Lagan Patrika Vachan reading', category: 'Ritual' },
        { text: 'Arrange Banola & Tel-Baan purification bath', category: 'Ritual' },
        { text: 'Book 100% Strict Jain Maharaj (zero root veg / pure ghee)', category: 'Catering' },
        { text: 'Schedule Chouhar Pre-Sunset Royal Dinner Feast', category: 'Catering' },
        { text: 'Organize Bhakti Sandhya & devotional family sangeet', category: 'Music' }
      ];
    } else {
      presetTasks = [
        { text: 'Lock royal heritage palace venue in Rajasthan', category: 'Venue' },
        { text: 'Book Vedic Pandit Ji for Saat Phere & Mandap rituals', category: 'Officiant' },
        { text: 'Finalize 4-meal gourmet royal catering menu', category: 'Catering' },
        { text: 'Arrange organic Phoolon Ki Haldi & Chandan ubtan', category: 'Ritual' },
        { text: 'Confirm Grand Baraat vintage car & royal dhol symphony', category: 'Music' }
      ];
    }

    presetTasks.forEach(pt => onAddTask(pt));
    showToast(`Loaded ${tradition} ceremony milestones!`);
  };

  const budgetCategories = [
    { name: 'Catering & Banquets', pct: 32, amount: Math.round(budget * 0.32), color: 'bg-amber-500' },
    { name: 'Palace Venue & Rooms', pct: 25, amount: Math.round(budget * 0.25), color: 'bg-royal-ruby' },
    { name: 'Production, Mandap & Decor', pct: 15, amount: Math.round(budget * 0.15), color: 'bg-pink-500' },
    { name: 'Photography & 4K Cinema', pct: 12, amount: Math.round(budget * 0.12), color: 'bg-indigo-500' },
    { name: 'Bridal & Groom Couture', pct: 8, amount: Math.round(budget * 0.08), color: 'bg-purple-500' },
    { name: 'Pandit / Qazi / Priest & Music', pct: 4, amount: Math.round(budget * 0.04), color: 'bg-emerald-500' },
    { name: 'Buffer / Emergency Fund', pct: 4, amount: Math.round(budget * 0.04), color: 'bg-gray-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-royal-ruby block mb-1">
            Personalized Wedding Command Center
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            {wedding?.coupleName || 'Ananya & Kabir'}&apos;s Wedding Desk
          </h2>
          <p className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-royal-ruby" />
              {wedding?.city || 'Udaipur, Rajasthan'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-royal-gold" />
              {wedding?.weddingDate || '28 Nov 2026'}
            </span>
          </p>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {onOpenInvoice && (
            <button
              onClick={onOpenInvoice}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-royal-pearl border border-royal-sand shadow-sm text-royal-wine text-xs font-bold transition-all hover:shadow"
            >
              <Printer className="w-3.5 h-3.5 text-royal-gold" />
              <span>Royal Invoice & Estimate</span>
            </button>
          )}

          <div className="flex bg-white p-1 rounded-2xl border border-royal-sand shadow-sm overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 sm:px-5 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'royal-gradient-ruby text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Budget Desk
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 sm:px-5 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'checklist'
                  ? 'royal-gradient-ruby text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Milestones</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{completedTasks}/{tasks.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 sm:px-5 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'royal-gradient-ruby text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              3-Day Schedule
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BUDGET DESK */}
      {activeTab === 'budget' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Total Budget */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-royal-sand shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Planned Budget</span>
                <button
                  onClick={() => setIsEditingBudget(!isEditingBudget)}
                  className="text-xs text-royal-ruby font-semibold hover:underline"
                >
                  {isEditingBudget ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditingBudget ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full text-lg font-bold p-2 border rounded-xl"
                  />
                  <button
                    onClick={handleSaveBudget}
                    className="p-2.5 rounded-xl royal-gradient-ruby text-white font-bold"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="font-serif text-3xl font-bold text-royal-charcoal">
                  ₹{budget.toLocaleString('en-IN')}
                </div>
              )}
              <span className="text-[11px] text-gray-400 mt-1 block">Allocated for 350 guests</span>
            </div>

            {/* Spent */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-royal-sand shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Committed & Spent
              </span>
              <div className="font-serif text-3xl font-bold text-royal-ruby">
                ₹{spent.toLocaleString('en-IN')}
              </div>
              <div className="mt-3 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-royal-ruby rounded-full transition-all duration-500"
                  style={{ width: `${spentPercentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2 block font-medium">
                {spentPercentage}% of total budget utilized
              </span>
            </div>

            {/* Remaining */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-royal-sand shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Remaining Liquidity
              </span>
              <div className="font-serif text-3xl font-bold text-royal-emerald">
                ₹{remaining.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-royal-emerald font-semibold mt-2 block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Balanced cushion for contingencies
              </span>
            </div>

          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm">
            <h3 className="font-serif text-xl font-bold text-royal-charcoal mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-royal-ruby" />
              <span>Recommended Multi-Faith Wedding Sector Allocation</span>
            </h3>

            <div className="space-y-3">
              {budgetCategories.map((cat, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl hover:bg-royal-sand/30 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full ${cat.color} flex-shrink-0`} />
                    <span className="text-xs sm:text-sm font-bold text-gray-800">{cat.name}</span>
                    <span className="text-xs text-gray-400 font-semibold">({cat.pct}%)</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-sm font-bold text-royal-charcoal">
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
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-royal-sand shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-royal-charcoal">
                  Switch Tradition Checklist
                </h4>
                <p className="text-xs text-gray-500">
                  Select your ceremony style to load rituals specific to your faith:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {traditions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTraditionChecklist(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedTradition === t.id
                      ? 'royal-gradient-ruby text-white shadow-sm'
                      : 'bg-royal-sand/40 text-gray-700 hover:bg-royal-sand border border-royal-sand'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-royal-charcoal">
                  Milestone Readiness
                </h3>
                <p className="text-xs text-gray-500">
                  {completedTasks} of {tasks.length} vital preparations completed
                </p>
              </div>
              <span className="font-serif text-2xl font-bold text-royal-ruby">{taskProgress}%</span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full royal-gradient-gold rounded-full transition-all duration-700"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          {/* Add Task Input Form */}
          <form onSubmit={handleCreateTask} className="bg-white rounded-2xl p-4 border border-royal-sand shadow-sm flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add next ceremony milestone e.g. Book Qazi for Nikahnama..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl bg-royal-sand/30 border border-gray-200 focus:outline-none focus:border-royal-ruby"
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="text-xs font-bold px-3 py-3 rounded-xl bg-royal-sand/30 border border-gray-200 focus:outline-none"
            >
              <option value="Officiant">Officiant / Pandit / Qazi</option>
              <option value="Venue">Venue</option>
              <option value="Photo">Photography</option>
              <option value="Catering">Catering</option>
              <option value="Ritual">Rituals & Samagri</option>
              <option value="Decor">Decor</option>
              <option value="Music">Music & Sangeet</option>
            </select>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl royal-gradient-ruby text-white text-xs font-bold shadow flex items-center justify-center gap-1.5 hover:shadow-md transition whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </form>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  task.done
                    ? 'bg-emerald-50/50 border-emerald-200 text-gray-500'
                    : 'bg-white border-royal-sand/90 text-royal-charcoal shadow-sm hover:border-royal-gold/60'
                }`}
              >
                <button
                  onClick={() => handleToggle(task.id, task.done)}
                  className="flex items-center gap-3 text-left flex-1"
                >
                  {task.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 hover:text-royal-ruby flex-shrink-0 transition" />
                  )}
                  <span className={`text-xs sm:text-sm font-semibold ${task.done ? 'line-through text-gray-400' : ''}`}>
                    {task.text}
                  </span>
                </button>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-royal-sand text-gray-600 uppercase tracking-wider">
                    {task.category || 'General'}
                  </span>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: 3-DAY SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          <form onSubmit={handleCreateSchedule} className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-royal-sand shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-royal-charcoal">
              Add Ceremony or Event to Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder="Event e.g. Nikah / Anand Karaj"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-gray-200 font-semibold"
              />
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-gray-200 font-semibold"
              />
              <input
                type="text"
                placeholder="Time e.g. 10:30 AM"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-gray-200 font-semibold"
              />
              <input
                type="text"
                placeholder="Location e.g. Grand Courtyard"
                value={newEventLocation}
                onChange={(e) => setNewEventLocation(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-gray-200 font-semibold"
              />
              <input
                type="text"
                placeholder="Dress code e.g. Royal Silk"
                value={newEventDressCode}
                onChange={(e) => setNewEventDressCode(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-gray-200 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl royal-gradient-ruby text-white text-xs font-bold shadow hover:shadow-md transition"
            >
              Save Event to Schedule
            </button>
          </form>

          {/* Timeline */}
          <div className="space-y-3">
            {wedding?.schedule?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-royal-sand shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl royal-gradient-ruby text-royal-lightGold flex flex-col items-center justify-center font-bold flex-shrink-0">
                    <Clock className="w-4 h-4 mb-0.5" />
                    <span className="text-[10px] leading-none">{item.time?.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-royal-charcoal">
                      {item.event}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-royal-ruby" /> {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-royal-gold" /> {item.location}
                      </span>
                      {item.dressCode && (
                        <span className="px-2 py-0.5 rounded-md bg-royal-sand/60 text-gray-700 text-[10px] font-semibold">
                          👗 {item.dressCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteSchedule(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 self-end sm:self-center transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
