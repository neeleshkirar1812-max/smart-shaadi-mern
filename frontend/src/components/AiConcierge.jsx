import React, { useState } from 'react';
import axios from 'axios';
import { 
  Bot, 
  Sparkles, 
  Send, 
  PieChart, 
  Calendar, 
  BookOpen, 
  Check, 
  Lightbulb, 
  ScrollText
} from 'lucide-react';

export default function AiConcierge({ showToast }) {
  const [activeTab, setActiveTab] = useState('budget'); // budget, itinerary, pandit
  const [selectedFaith, setSelectedFaith] = useState('Hindu');

  // Budget Planner State
  const [budgetInput, setBudgetInput] = useState(2500000);
  const [guestsInput, setGuestsInput] = useState(300);
  const [cityInput, setCityInput] = useState('Udaipur');
  const [budgetResult, setBudgetResult] = useState(null);
  const [loadingBudget, setLoadingBudget] = useState(false);

  // Itinerary Planner State
  const [itineraryResult, setItineraryResult] = useState(null);
  const [loadingItinerary, setLoadingItinerary] = useState(false);

  // Ritual Advisor State
  const [questionInput, setQuestionInput] = useState('');
  const [advisorChat, setAdvisorChat] = useState([
    {
      sender: 'advisor',
      scholar: 'All-Faith Wedding Scholar',
      text: 'Greetings and blessings! I am your AI Multi-Faith Marriage Scholar. You can ask me about sacred traditions across all faiths: Islamic Nikah & Mehr, Sikh Anand Karaj & the 4 Laavan, Christian Holy Matrimony & vows, Hindu Vedic Saat Phere, or Jain Vivah.'
    }
  ]);
  const [loadingAdvisor, setLoadingAdvisor] = useState(false);

  // 1. Calculate Budget Breakdown
  const handleCalculateBudget = async (e) => {
    e.preventDefault();
    setLoadingBudget(true);
    try {
      const res = await axios.post('/api/ai/budget-planner', {
        totalBudget: budgetInput,
        guestCount: guestsInput,
        city: cityInput,
        faith: selectedFaith
      });
      setBudgetResult(res.data);
      showToast('AI Budget optimization prepared! ✨');
    } catch {
      showToast('Could not calculate budget', 'error');
    } finally {
      setLoadingBudget(false);
    }
  };

  // 2. Generate Itinerary
  const handleGenerateItinerary = async (e) => {
    e.preventDefault();
    setLoadingItinerary(true);
    try {
      const res = await axios.post('/api/ai/itinerary-generator', {
        faith: selectedFaith,
        city: cityInput
      });
      setItineraryResult(res.data.itinerary);
      showToast(`3-Day ${selectedFaith} Timeline drafted!`);
    } catch {
      showToast('Could not generate itinerary', 'error');
    } finally {
      setLoadingItinerary(false);
    }
  };

  // 3. Ask Multi-Faith Ritual Advisor
  const handleAskAdvisor = async (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    const userQ = questionInput;
    setQuestionInput('');
    setAdvisorChat(prev => [...prev, { sender: 'user', text: userQ }]);
    setLoadingAdvisor(true);

    try {
      const res = await axios.post('/api/ai/ask-pandit', {
        question: userQ,
        faith: selectedFaith
      });
      setAdvisorChat(prev => [
        ...prev,
        {
          sender: 'advisor',
          scholar: res.data.scholar,
          text: res.data.answer,
          tip: res.data.guruAdvice
        }
      ]);
    } catch {
      setAdvisorChat(prev => [
        ...prev,
        {
          sender: 'advisor',
          scholar: 'Wedding Scholar',
          text: 'Marriage is a sacred covenant celebrating the union of two families in love and spiritual harmony.'
        }
      ]);
    } finally {
      setLoadingAdvisor(false);
    }
  };

  const quickPromptsByFaith = {
    Hindu: [
      "Explain the 7 sacred vows (Saat Phere)",
      "What makes Godhuli Bela auspicious?",
      "Meaning of Kanyadaan & Varmala"
    ],
    Muslim: [
      "What is Mehr & how is it calculated?",
      "What are the requirements for Nikahnama?",
      "Walima banquet protocols & Sunnah"
    ],
    Sikh: [
      "Explain the meaning of the 4 Sacred Laavan",
      "Milni family greeting ceremony",
      "Gurudwara Anand Karaj protocol"
    ],
    Christian: [
      "Meaning of traditional vows & wedding rings",
      "Church Nuptial Mass order of service",
      "Bridal party procession rehearsal tips"
    ],
    Jain: [
      "Lagan Patrika Vachan & Jain Vivah",
      "Chouhar pre-sunset feast requirements"
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full royal-gradient-gold text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Multi-Faith Wedding Intelligence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Smart Shaadi AI Concierge
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Algorithmic budget allocation, authentic 3-day timelines, and scholar guidance across all religious rites.
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-royal-sand shadow-sm self-start md:self-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'budget'
                ? 'royal-gradient-ruby text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Budget Allocator</span>
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'itinerary'
                ? 'royal-gradient-ruby text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Royal Timeline</span>
          </button>
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'advisor'
                ? 'royal-gradient-ruby text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>Ritual Advisor</span>
          </button>
        </div>
      </div>

      {/* Faith Switcher Pill for the AI Concierge */}
      <div className="bg-white p-4 rounded-2xl border border-royal-sand shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Select Ceremony Faith:</span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'Hindu', label: '🕉️ Hindu Vivah' },
            { id: 'Muslim', label: '☪️ Muslim Nikah' },
            { id: 'Sikh', label: '☬ Sikh Anand Karaj' },
            { id: 'Christian', label: '✝️ Christian Nuptials' },
            { id: 'Jain', label: '🪷 Jain Vivah' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFaith(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedFaith === f.id
                  ? 'royal-gradient-ruby text-white shadow'
                  : 'bg-royal-sand/40 text-gray-700 hover:bg-royal-sand border border-royal-sand'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. BUDGET ALLOCATOR */}
      {activeTab === 'budget' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          <form onSubmit={handleCalculateBudget} className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm">
            <h3 className="font-serif text-xl font-bold text-royal-charcoal mb-4">
              Enter Parameters for {selectedFaith} Optimization
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Target Budget (₹)</label>
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="w-full text-sm font-bold p-3 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Expected Guests</label>
                <input
                  type="number"
                  value={guestsInput}
                  onChange={(e) => setGuestsInput(e.target.value)}
                  className="w-full text-sm font-bold p-3 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Destination City</label>
                <select
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="w-full text-sm font-bold p-3 rounded-xl border border-gray-200"
                >
                  <option value="Udaipur">Udaipur, Rajasthan</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingBudget}
              className="mt-6 px-6 py-3 rounded-xl royal-gradient-ruby text-white text-xs font-bold shadow hover:shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-royal-lightGold" />
              <span>{loadingBudget ? 'Calculating...' : `Optimize Budget for ${selectedFaith}`}</span>
            </button>
          </form>

          {budgetResult && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm">
                <h4 className="font-serif text-xl font-bold text-royal-charcoal mb-6">
                  Recommended Spending Breakdown (₹{budgetResult.totalBudget.toLocaleString('en-IN')})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {budgetResult.breakdown.map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-royal-sand/30 border border-royal-sand flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">{item.category}</span>
                          <span className="text-[11px] text-gray-500">{item.note}</span>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-royal-ruby shadow-sm">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="mt-3 font-serif text-lg font-bold text-royal-ruby">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Tips */}
              <div className="bg-royal-charcoal text-white rounded-3xl p-6 sm:p-8 border border-royal-gold/40 shadow-xl">
                <h4 className="font-serif text-xl font-bold text-royal-lightGold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span>AI Cost & Tradition Tips for {budgetResult.faith} in {budgetResult.city}</span>
                </h4>
                <ul className="space-y-3">
                  {budgetResult.smartTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                      <Check className="w-4 h-4 text-royal-gold flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 2. ROYAL TIMELINE ITINERARY */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-royal-charcoal">
                3-Day Itinerary for {selectedFaith}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Generate an authentic, traditional timeline with exact times, dress codes, and ritual ceremonies.
              </p>
            </div>
            <button
              onClick={handleGenerateItinerary}
              disabled={loadingItinerary}
              className="px-6 py-3 rounded-xl royal-gradient-ruby text-white text-xs font-bold shadow flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingItinerary ? 'Drafting...' : 'Generate 3-Day Itinerary'}</span>
            </button>
          </div>

          {itineraryResult && (
            <div className="space-y-6">
              {itineraryResult.map((dayPlan, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm">
                  <div className="border-b border-gray-100 pb-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-royal-ruby">Tradition Schedule</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-charcoal">{dayPlan.day}</h3>
                  </div>

                  <div className="space-y-3">
                    {dayPlan.events.map((ev, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-royal-sand/20 transition">
                        <div className="w-16 sm:w-20 font-bold text-xs text-royal-ruby flex-shrink-0 pt-0.5">
                          {ev.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900">{ev.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{ev.description}</p>
                          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-royal-sand text-gray-700 text-[10px] font-semibold">
                            👗 Dress Code: {ev.dressCode}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* 3. MULTI-FAITH RITUAL ADVISOR */}
      {activeTab === 'advisor' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand shadow-sm space-y-6 animate-in fade-in duration-200">
          
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-serif text-2xl font-bold text-royal-charcoal flex items-center gap-2">
              <ScrollText className="w-6 h-6 text-royal-ruby" />
              <span>Multi-Faith Marriage Ritual Advisor</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Ask any question regarding Nikah & Mehr, Anand Karaj Laavan, Christian Nuptials, Vedic Saat Phere, or Jain Vivah rites.
            </p>
          </div>

          {/* Chat Stream */}
          <div className="space-y-4 max-h-96 overflow-y-auto p-4 rounded-2xl bg-royal-sand/30 border border-royal-sand">
            {advisorChat.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'royal-gradient-ruby text-white'
                      : 'bg-white border border-royal-sand text-royal-charcoal'
                  }`}
                >
                  {msg.scholar && (
                    <span className="text-[10px] font-bold text-royal-ruby uppercase tracking-wider block mb-1">
                      {msg.scholar}
                    </span>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.tip && (
                    <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-amber-700 font-medium">
                      📜 <strong>Ceremonial Note:</strong> {msg.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loadingAdvisor && (
              <div className="text-xs text-gray-400 italic">Consulting traditional marriage scriptures...</div>
            )}
          </div>

          {/* Quick Prompts for Selected Faith */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1">Quick Inquiries:</span>
            {(quickPromptsByFaith[selectedFaith] || quickPromptsByFaith.Hindu).map((p, idx) => (
              <button
                key={idx}
                onClick={() => setQuestionInput(p)}
                className="px-3 py-1 rounded-lg bg-royal-sand text-gray-700 hover:bg-royal-gold/20 font-medium transition text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Question Input Box */}
          <form onSubmit={handleAskAdvisor} className="flex gap-2">
            <input
              type="text"
              placeholder={`Ask about ${selectedFaith} marriage customs, vows, or protocols...`}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-royal-ruby font-medium"
            />
            <button
              type="submit"
              disabled={loadingAdvisor}
              className="px-5 py-3 rounded-xl royal-gradient-ruby text-white text-xs font-bold shadow hover:shadow-md transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
