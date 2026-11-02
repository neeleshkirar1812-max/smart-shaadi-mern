import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Share2, 
  Users, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  MapPin,
  Heart,
  Crown
} from 'lucide-react';

export default function SharedBoard({ user, showToast }) {
  const [boardToken] = useState(() => new URLSearchParams(window.location.search).get('board') || 'royal-wedding-2026');
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('Family Member');
  const [noteText, setNoteText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, [boardToken]);

  const fetchBoard = async () => {
    try {
      const res = await axios.get(`/api/boards/${boardToken}`);
      setBoard(res.data);
    } catch {
      showToast('Board details not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!memberEmail.trim()) return;

    try {
      const res = await axios.post(`/api/boards/${board.token}/members`, {
        email: memberEmail,
        role: memberRole
      });
      setBoard(prev => ({ ...prev, members: res.data.members }));
      setMemberEmail('');
      showToast('Family member invited to board!');
    } catch {
      showToast('Could not invite member', 'error');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      const author = user?.name || 'Family';
      const res = await axios.post(`/api/boards/${board.token}/notes`, {
        text: noteText,
        author
      });
      setBoard(prev => ({ ...prev, notes: [...(prev.notes || []), res.data] }));
      setNoteText('');
      showToast('Note posted to family board');
    } catch {
      showToast('Failed to post note', 'error');
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?board=${board?.token || 'royal-wedding-2026'}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Share link copied to clipboard!');
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-royal-muted">Loading private family circle...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-royal-sand/80 shadow-card mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-ruby/5 text-royal-ruby border border-royal-ruby/15 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Crown className="w-3.5 h-3.5 text-royal-gold" />
              <span>Private Wedding Circle & Family Board</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-royal-charcoal">
              {board?.title || "Ananya & Kabir's Royal Udaipur Shaadi"}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-royal-muted mt-2">
              <span className="flex items-center gap-1 font-semibold text-royal-charcoal">
                <Heart className="w-3.5 h-3.5 text-royal-ruby fill-current" />
                {board?.coupleName || 'Ananya & Kabir'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-royal-gold" />
                {board?.city || 'Udaipur, Rajasthan'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-royal-ruby" />
                {board?.weddingDate || '28 Nov 2026'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-5 py-3 rounded-2xl border border-royal-sand bg-white hover:bg-royal-sand/30 text-xs font-bold text-royal-charcoal shadow-sm transition flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-royal-gold" />}
              <span>{copied ? 'Link Copied!' : 'Copy Private Invite Link'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Family Circle Members & Invite */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand/80 shadow-card">
            <h3 className="font-serif text-xl font-bold text-royal-charcoal mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-royal-ruby" />
              <span>Family Circle Members ({board?.members?.length || 0})</span>
            </h3>

            {/* Invite Form */}
            <form onSubmit={handleInvite} className="space-y-3 mb-6 p-4 rounded-2xl bg-royal-sand/20 border border-royal-sand/80">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted">
                Invite Co-Host / Family Member
              </label>
              <input
                type="email"
                required
                placeholder="family.member@email.com"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl bg-white border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
              />
              <select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl bg-white border border-royal-sand font-bold focus:outline-none focus:border-royal-ruby"
              >
                <option value="Co-Host (Parents)">Co-Host (Parents)</option>
                <option value="Best Man / Maid of Honor">Best Man / Maid of Honor</option>
                <option value="Hospitality & Logistics Lead">Hospitality & Logistics Lead</option>
                <option value="Family Member">Family Member</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 rounded-2xl royal-gradient-ruby text-white text-xs font-bold shadow-royal hover:shadow-luxury transition"
              >
                Send Board Invite
              </button>
            </form>

            {/* Member List */}
            <div className="space-y-2.5">
              {board?.members?.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-royal-sand/20 border border-royal-sand/60 text-xs">
                  <div>
                    <span className="font-bold text-royal-charcoal block">{m.email}</span>
                    <span className="text-[10px] text-royal-ruby font-semibold">{m.role}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Family Bulletin & Discussion Notes */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-royal-sand/80 shadow-card space-y-6">
          <div className="border-b border-royal-sand/60 pb-4">
            <h3 className="font-serif text-xl font-bold text-royal-charcoal flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-royal-ruby" />
              <span>Family Coordination Bulletin</span>
            </h3>
            <p className="text-xs text-royal-muted mt-1">
              Share real-time logistics reminders, haldi/manjha timings, and celebration updates with your wedding circle.
            </p>
          </div>

          {/* New Note Form */}
          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              placeholder="Post a ceremony update or reminder to family..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="flex-1 text-xs sm:text-sm p-3 rounded-2xl bg-royal-sand/20 border border-royal-sand/80 focus:outline-none focus:border-royal-ruby font-medium"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl royal-gradient-ruby text-white text-xs font-bold shadow-royal hover:shadow-luxury transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5 text-royal-lightGold" />
              <span>Post</span>
            </button>
          </form>

          {/* Notes Feed */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {board?.notes?.map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-royal-sand/25 border border-royal-sand/70 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-royal-ruby">{n.author}</span>
                  <span className="text-royal-muted text-[10px]">
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-royal-charcoal leading-relaxed font-medium">{n.text}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
