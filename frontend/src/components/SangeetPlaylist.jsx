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
  Filter
} from 'lucide-react';

const CATEGORIES = [
  'All Beats',
  'Sangeet',
  'Baraat',
  'Varmala',
  'Haldi',
  'Cocktail & Afterparty'
];

export default function SangeetPlaylist({ showToast }) {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Beats');
  const [playingId, setPlayingId] = useState(null);

  // New Song Form State
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState('Sangeet');
  const [requestedBy, setRequestedBy] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/playlist');
      setPlaylist(res.data);
    } catch {
      showToast?.('Could not load playlist beats', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id, title) => {
    try {
      const res = await axios.patch(`/api/playlist/${id}/vote`);
      setPlaylist(prev => prev.map(item => item.id === id ? res.data : item));
      showToast?.(`Voted for "${title}"! 🎵`, 'success');
    } catch {
      showToast?.('Could not register vote', 'error');
    }
  };

  const handleAddTrack = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast?.('Please enter a song title', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post('/api/playlist', {
        title: title.trim(),
        artist: artist.trim() || 'Bollywood & Punjabi Beats',
        category,
        requestedBy: requestedBy.trim() || 'Guest'
      });
      setPlaylist(prev => [res.data, ...prev]);
      setTitle('');
      setArtist('');
      setRequestedBy('');
      setShowAddModal(false);
      showToast?.('Track added to Sangeet Jam! 🎉', 'success');
    } catch {
      showToast?.('Failed to add track', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportDJ = () => {
    const djContent = playlist.map((track, i) => 
      `${i + 1}. [${track.category.toUpperCase()}] ${track.title} - ${track.artist} (${track.votes} votes) | Req: ${track.requestedBy}`
    ).join('\n');

    const blob = new Blob([
      `=======================================================\n` +
      `SMART SHAADI - OFFICIAL DJ RUN-SHEET & CROWD FAVORITES\n` +
      `Couple: Ananya & Kabir | Royal Grand Palace\n` +
      `Total Tracks: ${playlist.length} | Generated: ${new Date().toLocaleDateString()}\n` +
      `=======================================================\n\n` +
      djContent
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SmartShaadi_DJ_Runsheet_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.('DJ Run-sheet exported successfully! 🎧', 'success');
  };

  const toggleMockPlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      showToast?.('Playing sample audio preview... 🎶', 'info');
    }
  };

  const filteredPlaylist = selectedCategory === 'All Beats'
    ? playlist
    : playlist.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  const totalVotes = playlist.reduce((sum, item) => sum + (item.votes || 0), 0);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden royal-gradient-wine p-8 sm:p-12 mb-8 shadow-2xl border border-royal-gold/30 text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-royal-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-royal-gold/40 text-royal-lightGold text-xs font-cinzel uppercase tracking-widest mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>Live Dancefloor Crowd Jam</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              Sangeet & DJ Playlist Collaborator
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
              Guests vote for their top bangers! From high-energy Baraat dhol beats to romantic Varmala entrance harmonies, curate the ultimate dancefloor setlist together.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-royal-gold hover:bg-royal-goldHover text-royal-charcoal font-bold text-sm shadow-luxury transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>Request a Track</span>
            </button>
            <button
              onClick={handleExportDJ}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all"
            >
              <Download className="w-4 h-4 text-royal-lightGold" />
              <span>Export DJ Runsheet</span>
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15">
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Total Anthems</p>
            <p className="font-serif text-2xl font-bold text-royal-lightGold">{playlist.length}</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Crowd Votes</p>
            <p className="font-serif text-2xl font-bold text-white">{totalVotes}</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Trending Song</p>
            <p className="font-serif text-sm font-bold text-royal-gold truncate">
              {playlist[0]?.title || 'Awaiting Beats'}
            </p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <p className="text-xs text-gray-300 font-cinzel">Sound Rig</p>
            <p className="font-serif text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live DJ Synced
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <Filter className="w-4 h-4 text-royal-wine flex-shrink-0 mr-1" />
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'royal-gradient-wine text-white shadow-md'
                  : 'bg-white text-royal-slate hover:bg-royal-sand/50 border border-royal-sand/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Playlist Tracks List */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-royal-sand">
          <Disc className="w-10 h-10 text-royal-wine animate-spin mx-auto mb-3" />
          <p className="text-royal-charcoal font-serif font-bold">Spinning DJ Console...</p>
        </div>
      ) : filteredPlaylist.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-royal-sand">
          <Music className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-royal-charcoal font-serif text-lg font-bold">No songs requested in this category yet</p>
          <p className="text-gray-500 text-xs mt-1">Be the first to request a dance track for the wedding!</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-5 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-md"
          >
            Add First Track
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlaylist.map((track, idx) => {
            const isPlaying = playingId === track.id;
            const isTop3 = idx < 3;
            return (
              <div
                key={track.id}
                className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-xl ${
                  isPlaying 
                    ? 'border-royal-wine ring-2 ring-royal-wine/20' 
                    : 'border-royal-sand/80 hover:border-royal-gold/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Position / Play button */}
                    <button
                      onClick={() => toggleMockPlay(track.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 flex-shrink-0 ${
                        isPlaying
                          ? 'royal-gradient-wine text-white shadow-lg animate-pulse'
                          : isTop3
                            ? 'bg-amber-50 text-royal-amber border border-amber-200 hover:bg-amber-100'
                            : 'bg-royal-pearl text-royal-slate hover:bg-royal-sand'
                      }`}
                      title={isPlaying ? 'Pause Sample' : 'Play Beat Sample'}
                    >
                      {isPlaying ? (
                        <Volume2 className="w-5 h-5 text-royal-lightGold animate-bounce" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Play className="w-4 h-4 ml-0.5" />
                        </div>
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-royal-sand/60 text-royal-wine font-cinzel">
                          {track.category}
                        </span>
                        {isTop3 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>Top #{idx + 1}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-royal-charcoal text-base mt-1 group-hover:text-royal-wine transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-sans">{track.artist}</p>
                      <p className="text-[11px] text-gray-400 mt-1 italic">
                        Requested by: <span className="text-royal-charcoal font-medium">{track.requestedBy}</span>
                      </p>
                    </div>
                  </div>

                  {/* Vote Button */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleVote(track.id, track.title)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-royal-pearl hover:bg-royal-wine hover:text-white text-royal-charcoal border border-royal-sand/80 hover:border-transparent transition-all shadow-sm active:scale-95 group/btn"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-royal-gold group-hover/btn:text-royal-lightGold transition-colors" />
                      <span className="font-bold text-xs">{track.votes || 0}</span>
                    </button>
                    <span className="text-[10px] text-gray-400">upvotes</span>
                  </div>
                </div>

                {/* Animated wave bars if playing */}
                {isPlaying && (
                  <div className="mt-3 pt-3 border-t border-royal-sand/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-royal-wine font-semibold">
                      <Radio className="w-3.5 h-3.5 animate-spin" />
                      <span>Soundstage Audio Preview Active</span>
                    </div>
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-royal-wine rounded-full animate-[bounce_0.8s_infinite_100ms] h-2" />
                      <span className="w-1 bg-royal-gold rounded-full animate-[bounce_0.8s_infinite_200ms] h-4" />
                      <span className="w-1 bg-royal-wine rounded-full animate-[bounce_0.8s_infinite_300ms] h-3" />
                      <span className="w-1 bg-royal-gold rounded-full animate-[bounce_0.8s_infinite_400ms] h-1" />
                      <span className="w-1 bg-royal-wine rounded-full animate-[bounce_0.8s_infinite_150ms] h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Suggest Track Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-royal-gold/40 relative">
            <div className="flex items-center justify-between pb-4 border-b border-royal-sand">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl royal-gradient-wine flex items-center justify-center text-royal-gold">
                  <Music className="w-5 h-5 text-royal-lightGold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-royal-charcoal">Request a Wedding Track</h3>
                  <p className="text-xs text-gray-500">Add your anthem to the live Sangeet DJ deck</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-royal-pearl flex items-center justify-center text-gray-400 hover:text-royal-wine hover:bg-royal-sand transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTrack} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                  Song Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gallan Goodiyaan or Kala Chashma"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine focus:ring-2 focus:ring-royal-wine/20 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                  Artist / Movie
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diljit Dosanjh, Arijit Singh, Baadshah"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine focus:ring-2 focus:ring-royal-wine/20 text-sm font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Ceremony Moment
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine text-sm font-sans"
                  >
                    <option value="Sangeet">Sangeet Danceoff</option>
                    <option value="Baraat">Baraat Dhol Entry</option>
                    <option value="Varmala">Varmala Entrance</option>
                    <option value="Haldi">Haldi & Mehendi Rain</option>
                    <option value="Cocktail & Afterparty">Cocktail & Afterparty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Requested By
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Groom Squad, Mama Ji, Priya"
                    value={requestedBy}
                    onChange={(e) => setRequestedBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine text-sm font-sans"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-royal-sand">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-royal-pearl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-luxury hover:shadow-2xl transition disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add to DJ Deck 🎶'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
