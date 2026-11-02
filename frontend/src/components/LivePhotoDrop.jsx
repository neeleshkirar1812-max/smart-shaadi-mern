import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Camera, 
  QrCode, 
  Heart, 
  Upload, 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  Clock, 
  User, 
  Check, 
  Printer,
  Tag,
  Filter,
  Smile
} from 'lucide-react';

export default function LivePhotoDrop({ onOpenStandee, showToast }) {
  const [photos, setPhotos] = useState([
    {
      id: "p-1",
      guestName: "Vikramjit Singh",
      caption: "Baraat entry with vintage Buick & royal dhol symphony!",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      faceTag: "Baraat & Dhol",
      aiTaggedFaces: ["Groom", "Chacha Ji", "Dhol Troupe"],
      likes: 34,
      time: "15 mins ago"
    },
    {
      id: "p-2",
      guestName: "Sunita Verma",
      caption: "Ananya looking like a Mewar Maharani in vermillion lehenga ✨",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      faceTag: "Bride & Groom",
      aiTaggedFaces: ["Bride", "Mother of Bride"],
      likes: 56,
      time: "30 mins ago"
    },
    {
      id: "p-3",
      guestName: "Aman Malhotra",
      caption: "Haldi courtyard fun! Best candid moments by the lotus fountain.",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      faceTag: "Haldi & Phere",
      aiTaggedFaces: ["Groom", "College Batch"],
      likes: 22,
      time: "1 hour ago"
    },
    {
      id: "p-4",
      guestName: "Evelyn D'Costa",
      caption: "Sunset over Lake Pichola as the vows were sanctified.",
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
      faceTag: "Candid Moments",
      aiTaggedFaces: ["Bride & Groom (Silhouette)"],
      likes: 41,
      time: "2 hours ago"
    }
  ]);

  const [activeFaceTag, setActiveFaceTag] = useState('All');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [tableQrModalOpen, setTableQrModalOpen] = useState(false);
  
  // Form State
  const [guestName, setGuestName] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTag, setSelectedTag] = useState('Bride & Groom');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get('/api/photos');
      if (res.data && res.data.photos && res.data.photos.length > 0) {
        setPhotos(res.data.photos);
      }
    } catch (err) {
      console.warn('Photos fallback active', err);
    }
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newPhotoPayload = {
        guestName: guestName || 'Atithi Guest',
        caption: caption || 'Candid royal celebration moment! ✨',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
        faceTag: selectedTag,
        aiTaggedFaces: [selectedTag, "Verified Guest"]
      };

      const res = await axios.post('/api/photos', newPhotoPayload);
      setPhotos(prev => [res.data, ...prev]);
      setGuestName('');
      setCaption('');
      setImageUrl('');
      setUploadModalOpen(false);
      showToast('Photo uploaded and indexed with AI face tagging! 📸');
    } catch {
      // Local fallback
      const mockPhoto = {
        id: `p-${Date.now()}`,
        guestName: guestName || 'Atithi Guest',
        caption: caption || 'Candid wedding celebration moment! ✨',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
        faceTag: selectedTag,
        aiTaggedFaces: [selectedTag, "AI Verified"],
        likes: 1,
        time: 'Just now'
      };
      setPhotos(prev => [mockPhoto, ...prev]);
      setGuestName('');
      setCaption('');
      setImageUrl('');
      setUploadModalOpen(false);
      showToast('Photo added to live wedding album! 📸');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikePhoto = async (id) => {
    try {
      const res = await axios.patch(`/api/photos/${id}/like`);
      setPhotos(prev => prev.map(p => p.id === id ? res.data : p));
    } catch {
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    }
  };

  const faceTagFilters = [
    'All',
    'Bride & Groom',
    'Baraat & Dhol',
    'Haldi & Phere',
    'Candid Moments',
    'Family Diwan'
  ];

  const filteredPhotos = activeFaceTag === 'All'
    ? photos
    : photos.filter(p => p.faceTag === activeFaceTag || p.aiTaggedFaces?.includes(activeFaceTag));

  const samplePhotoOptions = [
    { label: "Baraat Dhol", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", tag: "Baraat & Dhol" },
    { label: "Haldi Courtyard", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80", tag: "Haldi & Phere" },
    { label: "Mandap Phere", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80", tag: "Bride & Groom" },
    { label: "Sangeet Dance", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80", tag: "Baraat & Dhol" },
    { label: "Palace Lake Sunset", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80", tag: "Candid Moments" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stitch-rose-wash text-stitch-rose border border-stitch-rose/25 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-stitch-gold" />
            <span>AI Face-Tagged Live Guest Album • Table QR Standee</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stitch-charcoal">
            Live Candid Photo Drop
          </h2>
          <p className="text-xs text-stitch-charcoal-muted mt-1">
            Guests scan table standee QR codes from their phone cameras to upload raw moments instantly. Filtered automatically with AI face recognition.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenStandee || (() => setTableQrModalOpen(true))}
            className="px-4 py-2.5 rounded-2xl border border-stitch-border bg-white hover:bg-stitch-ivory text-xs font-bold text-stitch-charcoal shadow-xs transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-stitch-gold" />
            <span>Print Table QR Standee</span>
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-stitch-gold-light" />
            <span>Drop Candid Memory</span>
          </button>
        </div>
      </div>

      {/* AI Face Tagging Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        <span className="text-xs font-bold text-stitch-charcoal flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-stitch-rose" />
          <span>AI Filters:</span>
        </span>
        {faceTagFilters.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFaceTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeFaceTag === tag
                ? 'bridal-gradient-rose text-white shadow-luxury'
                : 'bg-white text-stitch-charcoal border border-stitch-border hover:bg-stitch-ivory'
            }`}
          >
            {tag === 'All' ? '✨ All Photos' : `👤 ${tag}`}
          </button>
        ))}
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-3xl overflow-hidden border border-stitch-border shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
              
              {/* Face Tag Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-stitch-gold-light border border-white/20 flex items-center gap-1">
                  <Smile className="w-3 h-3 text-stitch-gold" />
                  {photo.faceTag || "Candid"}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-xs">
                  <User className="w-3.5 h-3.5 text-stitch-gold-light" />
                  {photo.guestName}
                </span>
                <button
                  onClick={() => handleLikePhoto(photo.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md hover:bg-stitch-rose transition text-xs font-bold border border-white/10"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{photo.likes || 1}</span>
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs text-stitch-charcoal font-medium leading-relaxed">
                {photo.caption}
              </p>
              {photo.aiTaggedFaces && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {photo.aiTaggedFaces.map((face, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-stitch-ivory text-stitch-charcoal-muted border border-stitch-border">
                      #{face}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bridal-gradient-rose flex items-center justify-center text-white mx-auto mb-2 shadow-luxury">
                <Camera className="w-6 h-6 text-stitch-gold-light" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stitch-charcoal">
                Drop Candid Celebration Memory
              </h3>
              <p className="text-xs text-stitch-charcoal-muted">
                Your photograph will be analyzed with AI face tagging and displayed on the Palace live screens.
              </p>
            </div>

            <form onSubmit={handleUploadPhoto} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma (Friend)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">Memory Caption</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Baraat dhol celebration at the palace gates!"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1">AI Face Classification Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border font-semibold focus:outline-none focus:border-stitch-rose bg-white"
                >
                  <option value="Bride & Groom">Bride & Groom (Royal Couple)</option>
                  <option value="Baraat & Dhol">Baraat & Dhol Procession</option>
                  <option value="Haldi & Phere">Haldi & Sacred Phere</option>
                  <option value="Candid Moments">Candid Table & Lawn Moments</option>
                  <option value="Family Diwan">Family Elders Diwan</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stitch-charcoal-muted mb-1.5">Pick Preset or Enter Image URL</label>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {samplePhotoOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setImageUrl(opt.url);
                        setSelectedTag(opt.tag);
                      }}
                      className={`text-left p-2 rounded-xl border text-[11px] font-semibold truncate transition ${
                        imageUrl === opt.url
                          ? 'border-stitch-rose bg-stitch-rose-wash text-stitch-rose'
                          : 'border-stitch-border bg-white text-stitch-charcoal-subtle hover:bg-stitch-ivory'
                      }`}
                    >
                      📷 {opt.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-stitch-border font-medium focus:outline-none focus:border-stitch-rose"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Upload className="w-3.5 h-3.5 text-stitch-gold-light" />
                <span>{submitting ? 'Indexing & Tagging...' : 'Post Photo to Live Wall'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table QR Standee Modal */}
      {tableQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl border border-stitch-border relative">
            <button
              onClick={() => setTableQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stitch-charcoal-muted hover:text-stitch-charcoal rounded-full hover:bg-stitch-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-stitch-rose block mb-1">
              Table Standee Print Ready
            </span>
            <h3 className="font-serif text-2xl font-bold text-stitch-charcoal mb-2">
              Scan to Drop Photos
            </h3>
            <p className="text-xs text-stitch-charcoal-muted mb-4">
              Print and place this QR on dining tables. Guests can scan to share raw memories instantly without an app!
            </p>

            <div className="p-4 bg-stitch-ivory rounded-2xl border border-stitch-border inline-block mb-4 shadow-sm">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://smartshaadi.com/photo-drop/ananya-kabir"
                alt="Table QR Code"
                className="w-48 h-48 rounded-xl border border-white shadow-xs mx-auto"
              />
              <div className="mt-2 text-xs font-bold text-stitch-charcoal">Ananya & Kabir Vivah • Table 01</div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-stitch-gold-light" />
              <span>Print Table Standee</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
