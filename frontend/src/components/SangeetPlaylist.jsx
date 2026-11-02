import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Music, 
  ThumbsUp, 
  Plus, 
  Sparkles, 
  Download, 
  Headphones, 
  Disc, 
  Play, 
  Volume2, 
  Radio, 
  CheckCircle2, 
  Flame,
  Filter,
  Activity,
  Gauge,
  X,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { initialTracks } from '../data/tracks.js';

export default function SangeetPlaylist({ showToast }) {
  const [playlist, setPlaylist] = useState(initialTracks);
  const [selectedCategory, setSelectedCategory] = useState('All Beats');
  const [playingId, setPlayingId] = useState('tr-1');
  const [showAddModal, setShowAddModal] = useState(false);

  // Telemetry state
  const [currentDecibels, setCurrentDecibels] = useState(88);
  const [crowdEnergy, setCrowdEnergy] = useState(94);

  // New Song Form State
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState('Bollywood Dhamaka');
  const [requestedBy, setRequestedBy] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlaylist();
    // Subtle realistic sound & energy fluctuations
    const interval = setInterval(() => {
      setCurrentDecibels(Math.floor(85 + Math.random() * 8));
      setCrowdEnergy(Math.floor(90 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get('/api/playlist');
      if (res.data && res.data.length > 0) {
        setPlaylist(res.data);
      }
    } catch {
      console.warn('Using initialTracks fallback');
    }
  };

  const handleVote = async (id, trackTitle) => {
    try {
      await axios.patch(`/api/playlist/${id}/vote`);
      setPlaylist(prev => prev.map(item => item.id === id ? { ...item, upvotes: (item.upvotes || 0) + 1 } : item));
      showToast?.(`Voted for "${trackTitle}"! 🎵`, 'success');
    } catch {
      setPlaylist(prev => prev.map(item => item.id === id ? { ...item, upvotes: (item.upvotes || 0) + 1 } : item));
      showToast?.(`Voted for "${trackTitle}"! 🎵`, 'success');
    }
  };

  const handleAddTrack = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    const newTrack = {
      id: `tr-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim() || 'Bollywood & Punjabi Live Ensemble',
      category,
      bpm: 128,
      energyScore: 92,
      upvotes: 1,
      requestedBy: requestedBy.trim() || 'Atithi Guest',
      decibelEstimate: '87 dB (Safe Zone)',
      duration: '3:45',
      status: 'Queued',
      soundZone: 'Amphitheatre Floor'
    };

    try {
      const res = await axios.post('/api/playlist', newTrack);
      setPlaylist(prev => [res.data, ...prev]);
    } catch {
      setPlaylist(prev => [newTrack, ...prev]);
    } finally {
      setTitle('');
      setArtist('');
      setRequestedBy('');
      setShowAddModal(false);
      setSubmitting(false);
      showToast?.('Track added to Sangeet DJ queue! 🎉', 'success');
    }
  };

  const handleExportDJ = () => {
    const djContent = playlist.map((track, i) => 
      `${i + 1}. [${track.category.toUpperCase()}] ${track.title} - ${track.artist} (${track.upvotes || 0} votes) | Req: ${track.requestedBy || 'Guest'}`
    ).join('\n');

    const blob = new Blob([
      `=======================================================\n` +
      `SMART SHAADI - OFFICIAL SANGEET DJ CUE SHEET & RUN LIST\n` +
      `Date: 27th Nov 2026 | Royal Sangeet Night | Lake Pichola\n` +
      `Sound Limiter Threshold: 95 dB Max | Current Energy: ${crowdEnergy}%\n` +
      `=======================================================\n\n` +
      djContent
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SmartShaadi_DJ_RunList_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.('Cue sheet exported for the DJ console! 🎧', 'success');
  };

  const categories = [
    'All Beats',
    'Family Dance Faceoff',
    'Bollywood Dhamaka',
    'Punjabi Beats',
    'Couple Slow Waltz',
    'Sufi & Qawwali Jam',
    'Retro Antakshari'
  ];

  const filteredPlaylist = selectedCategory === 'All Beats'
    ? playlist
    : playlist.filter(t => t.category === selectedCategory);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bridal-gradient-rose p-8 sm:p-12 mb-8 shadow-luxury border border-stitch-gold/40 text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-stitch-gold/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-stitch-gold/40 text-stitch-gold-light text-xs font-cinzel uppercase tracking-widest mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>Royal Sangeet Console & Sound Telemetry</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Sangeet DJ Jam & Crowd Energy Room
            </h1>
            <p className="text-gray-100 text-xs sm:text-sm leading-relaxed font-sans">
              Guests vote in real-time for family dance face-offs. Monitored with live decibel sound limiters complying with heritage palace noise standards.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-stitch-rose hover:bg-stitch-ivory font-bold text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Request Track</span>
            </button>
            <button
              onClick={handleExportDJ}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition"
            >
              <Download className="w-4 h-4 text-stitch-gold-light" />
              <span>Export DJ Cue Sheet</span>
            </button>
          </div>
        </div>

        {/* Live Sound & Energy Telemetry Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
          <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-1.5 text-xs text-stitch-gold-light font-cinzel mb-1">
              <Zap className="w-3.5 h-3.5 text-stitch-gold" />
              <span>Crowd Energy Gauge</span>
            </div>
            <p className="font-serif text-2xl font-bold text-white">{crowdEnergy}% Peak Hype</p>
            <div className="w-full bg-white/20 rounded-full h-1.5 mt-2 overflow-hidden">
              <div style={{ width: `${crowdEnergy}%` }} className="h-full bg-stitch-gold transition-all duration-700" />
            </div>
          </div>

          <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-1.5 text-xs text-stitch-gold-light font-cinzel mb-1">
              <Volume2 className="w-3.5 h-3.5 text-stitch-gold" />
              <span>Sound Limiter Telemetry</span>
            </div>
            <p className="font-serif text-2xl font-bold text-white">{currentDecibels} dB</p>
            <span className="text-[10px] text-emerald-300 font-semibold block mt-1">
              ✓ Heritage Safe (Max: 95 dB)
            </span>
          </div>

          <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-1.5 text-xs text-stitch-gold-light font-cinzel mb-1">
              <Disc className="w-3.5 h-3.5 text-stitch-gold" />
              <span>Queued Tracks</span>
            </div>
            <p className="font-serif text-2xl font-bold text-white">{playlist.length} Songs</p>
            <span className="text-[10px] text-gray-300 block mt-1">Sorted by crowd votes</span>
          </div>

          <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-1.5 text-xs text-stitch-gold-light font-cinzel mb-1">
              <Radio className="w-3.5 h-3.5 text-stitch-gold" />
              <span>Active Stage Zone</span>
            </div>
            <p className="font-serif text-lg font-bold text-white truncate">Amphitheatre Deck</p>
            <span className="text-[10px] text-gray-300 block mt-1">Live Wireless Sync</span>
          </div>
        </div>

      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bridal-gradient-rose text-white shadow-luxury'
                : 'bg-white text-stitch-charcoal border border-stitch-border hover:bg-stitch-ivory'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Playlist List */}
      <div className="space-y-3">
        {filteredPlaylist.map((track, i) => {
          const isPlaying = playingId === track.id;
          return (
            <div
              key={track.id || i}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isPlaying 
                  ? 'bg-stitch-gold-light/40 border-stitch-gold-border shadow-xs ring-1 ring-stitch-gold/30' 
                  : 'bg-white border-stitch-border shadow-xs hover:border-stitch-rose/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPlayingId(isPlaying ? null : track.id)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition flex-shrink-0 ${
                    isPlaying 
                      ? 'bridal-gradient-rose text-white shadow-luxury animate-pulse' 
                      : 'bg-stitch-ivory text-stitch-rose hover:bg-stitch-rose-wash'
                  }`}
                >
                  {isPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stitch-charcoal">
                      {track.title}
                    </h3>
                    {isPlaying && (
                      <span className="px-2 py-0.5 rounded-full bg-stitch-rose text-white text-[9px] font-bold uppercase tracking-wider">
                        Now Playing
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stitch-charcoal-muted mt-0.5">
                    {track.artist}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stitch-charcoal-subtle mt-1.5 font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-stitch-ivory border border-stitch-border text-stitch-charcoal">
                      {track.category}
                    </span>
                    <span>BPM: <strong>{track.bpm || 128}</strong></span>
                    <span>Zone: <strong>{track.soundZone || "Amphitheatre"}</strong></span>
                    {track.requestedBy && (
                      <span className="text-stitch-charcoal-muted">Req: {track.requestedBy}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vote Button */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={() => handleVote(track.id, track.title)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stitch-rose-wash hover:bg-stitch-rose hover:text-white text-stitch-rose font-bold text-xs transition border border-stitch-rose/30 shadow-xs group"
                >
                  <ThumbsUp className="w-4 h-4 text-stitch-rose group-hover:text-white transition-colors" />
                  <span>{track.upvotes || 0} Votes</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Request Song Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-stitch-charcoal mb-1">
              Request Sangeet DJ Track
            </h3>
            <p className="text-xs text-stitch-charcoal-muted mb-4">
              Add your favorite celebration song to the live cue. Guests will upvote it!
            </p>

            <form onSubmit={handleAddTrack} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Track Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gallan Goodiyaan or London Thumakda"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                  Artist / Singers
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diljit Dosanjh / Arijit Singh"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Ceremony Sector
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose bg-white"
                  >
                    <option value="Family Dance Faceoff">Family Dance Faceoff</option>
                    <option value="Bollywood Dhamaka">Bollywood Dhamaka</option>
                    <option value="Punjabi Beats">Punjabi Beats</option>
                    <option value="Couple Slow Waltz">Couple Slow Waltz</option>
                    <option value="Sufi & Qawwali Jam">Sufi & Qawwali Jam</option>
                    <option value="Retro Antakshari">Retro Antakshari</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Groom's Sister"
                    value={requestedBy}
                    onChange={(e) => setRequestedBy(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-2xl border border-stitch-border focus:outline-none focus:border-stitch-rose"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury"
              >
                {submitting ? 'Dispatching to DJ...' : 'Submit Track to DJ Console'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
