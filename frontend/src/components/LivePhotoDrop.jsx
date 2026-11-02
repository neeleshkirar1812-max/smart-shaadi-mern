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
  Printer
} from 'lucide-react';

export default function LivePhotoDrop({ onOpenStandee, showToast }) {
  const [photos, setPhotos] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [tableQrModalOpen, setTableQrModalOpen] = useState(false);
  
  // Form State
  const [guestName, setGuestName] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get('/api/photos');
      setPhotos(res.data.photos || []);
    } catch (err) {
      console.warn('Failed to fetch photos', err);
    }
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('/api/photos', {
        guestName: guestName || 'Guest',
        caption: caption || 'Candid wedding celebration moment! ✨',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
      });
      setPhotos(prev => [res.data, ...prev]);
      setGuestName('');
      setCaption('');
      setImageUrl('');
      setUploadModalOpen(false);
      showToast('Photo added to live wedding album! 📸');
    } catch {
      showToast('Could not upload photo', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikePhoto = async (id) => {
    try {
      const res = await axios.patch(`/api/photos/${id}/like`);
      setPhotos(prev => prev.map(p => p.id === id ? res.data : p));
    } catch {}
  };

  const samplePhotoOptions = [
    { label: "Baraat Dhol", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" },
    { label: "Haldi Courtyard", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80" },
    { label: "Mandap & Phere", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80" },
    { label: "Sangeet Night", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80" },
    { label: "Palace Lake Sunset", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-ruby/5 text-royal-ruby border border-royal-ruby/15 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-royal-gold" />
            <span>Atithi Candid Moments • Live Table QR Drop</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-charcoal">
            Live Guest Photo Album
          </h2>
          <p className="text-xs text-royal-muted mt-1">
            Guests can scan the table QR code from any smartphone to drop raw candid memories instantly without installing any app.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenStandee || (() => setTableQrModalOpen(true))}
            className="px-4 py-2.5 rounded-2xl border border-royal-sand bg-white hover:bg-royal-sand/30 text-xs font-bold text-royal-charcoal shadow-sm transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-royal-gold" />
            <span>Print Table QR Standee</span>
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-stitch-gold-light" />
            <span>Drop Candid Photo</span>
          </button>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-3xl overflow-hidden border border-royal-sand/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-xs">
                  <User className="w-3.5 h-3.5 text-royal-lightGold" />
                  {photo.guestName}
                </span>
                <button
                  onClick={() => handleLikePhoto(photo.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md hover:bg-royal-ruby/90 transition text-xs font-bold border border-white/10"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{photo.likes || 1}</span>
                </button>
              </div>
            </div>

            <div className="p-4">
              <p className="text-xs text-royal-slate font-medium leading-relaxed">
                &ldquo;{photo.caption}&rdquo;
              </p>
              <div className="mt-2 text-[10px] text-royal-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-royal-gold" />
                {new Date(photo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-royal-sand/80 relative">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-royal-muted hover:text-royal-charcoal rounded-full hover:bg-royal-sand/40"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-royal-ruby block mb-1">
              Live Atithi Photo Drop
            </span>
            <h3 className="font-serif text-2xl font-bold text-royal-charcoal mb-4">
              Share a Candid Memory
            </h3>

            <form onSubmit={handleUploadPhoto} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohit (Groom's Friend)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1">Candid Caption</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dancing with the bride during Sangeet! 🎉"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand font-semibold focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-royal-muted mb-1.5">Choose Photo Presets or Enter URL</label>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {samplePhotoOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(opt.url)}
                      className={`text-left p-2 rounded-xl border text-[11px] font-semibold truncate transition ${
                        imageUrl === opt.url
                          ? 'border-royal-ruby bg-royal-ruby/5 text-royal-ruby'
                          : 'border-royal-sand bg-white text-royal-slate hover:bg-royal-sand/20'
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
                  className="w-full text-xs p-3 rounded-2xl border border-royal-sand font-medium focus:outline-none focus:border-royal-ruby"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bridal-gradient-rose text-white text-xs font-bold shadow-luxury hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Upload className="w-3.5 h-3.5 text-stitch-gold-light" />
                <span>{submitting ? 'Dropping...' : 'Post Photo to Live Wall'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table QR Code Modal */}
      {tableQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl border border-royal-sand/80 relative">
            <button
              onClick={() => setTableQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-royal-muted hover:text-royal-charcoal rounded-full hover:bg-royal-sand/40"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-royal-ruby block mb-1">
              Table Standee Print Ready
            </span>
            <h3 className="font-serif text-2xl font-bold text-royal-charcoal mb-2">
              Scan to Drop Photos
            </h3>
            <p className="text-xs text-royal-muted mb-4">
              Print and place this QR on dining tables. Guests can scan to share raw memories instantly!
            </p>

            <div className="p-4 bg-royal-sand/20 rounded-2xl border border-royal-sand/60 inline-block mb-4 shadow-sm">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://smartshaadi.com/photo-drop/royal-wedding-2026"
                alt="Table QR Code"
                className="w-48 h-48 rounded-xl border border-white shadow-xs mx-auto"
              />
              <div className="mt-2 text-xs font-bold text-royal-charcoal">Ananya & Kabir Vivah • Table 01</div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full py-2.5 rounded-xl border border-royal-sand text-xs font-bold text-royal-charcoal hover:bg-royal-sand/30 transition"
            >
              Print Table QR Standee
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
