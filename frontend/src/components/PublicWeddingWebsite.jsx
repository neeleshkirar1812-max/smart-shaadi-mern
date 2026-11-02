import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Gift, 
  Sparkles, 
  Check, 
  Send, 
  Music, 
  Camera, 
  Compass, 
  Share2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';

export default function PublicWeddingWebsite({ wedding, onNavigateToShagun, onNavigateToPhotos, showToast }) {
  // Couple details fallback
  const coupleName = wedding?.coupleName || 'Ananya & Kabir';
  const weddingDateStr = wedding?.weddingDate || '2026-11-28';
  const city = wedding?.city || 'Udaipur, Rajasthan';

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form state
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendees, setAttendees] = useState(2);
  const [mealPref, setMealPref] = useState('Royal Traditional (Veg & Non-Veg)');
  const [note, setNote] = useState('');
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  useEffect(() => {
    const target = new Date(`${weddingDateStr}T18:00:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDateStr]);

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      showToast?.('Please enter your name', 'error');
      return;
    }

    setSubmittingRsvp(true);
    try {
      await axios.post('/api/guests', {
        name: guestName.trim(),
        phone: phone.trim() || '+91 98000 00000',
        rsvpStatus: 'Confirmed',
        side: 'Mutual / Friends',
        mealPreference: mealPref,
        attendeesCount: Number(attendees),
        notes: note.trim()
      });
      setRsvpSuccess(true);
      showToast?.(`RSVP confirmed for ${guestName}! Looking forward to hosting you ✨`, 'success');
    } catch {
      showToast?.('Could not submit RSVP right now', 'error');
    } finally {
      setSubmittingRsvp(false);
    }
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast?.('Wedding website link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-royal-charcoal font-sans selection:bg-royal-gold selection:text-white">
      {/* 1. Hero Cover Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden royal-gradient-wine text-white">
        {/* Decorative background overlay */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-royal-charcoal/90" />

        <div className="relative z-10 max-w-4xl mx-auto py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-royal-gold/40 text-royal-lightGold text-xs font-cinzel uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Royal Union • You Are Cordially Invited</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            {coupleName}
          </h1>

          <p className="font-cinzel text-royal-lightGold text-sm sm:text-base tracking-widest uppercase">
            {new Date(weddingDateStr).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            <span className="mx-3 opacity-60">•</span>
            {city}
          </p>

          <p className="max-w-xl mx-auto text-gray-200 text-sm sm:text-base leading-relaxed italic font-serif">
            &ldquo;Two souls, intertwined by destiny, celebrating love across all sacred traditions.&rdquo;
          </p>

          {/* Countdown Clock */}
          <div className="pt-4 flex items-center justify-center gap-3 sm:gap-6">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds }
            ].map((clock, i) => (
              <div 
                key={i}
                className="w-18 sm:w-24 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-royal-gold/30 shadow-luxury"
              >
                <span className="block font-serif text-2xl sm:text-4xl font-bold text-royal-lightGold">
                  {String(clock.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-cinzel text-gray-300 tracking-wider uppercase">
                  {clock.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#rsvp-section"
              className="px-8 py-3.5 rounded-2xl bg-royal-gold hover:bg-royal-goldHover text-royal-charcoal font-bold text-sm shadow-luxury transition-all transform hover:-translate-y-0.5"
            >
              RSVP for Wedding
            </a>
            {onNavigateToShagun && (
              <button
                onClick={onNavigateToShagun}
                className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-royal-gold/50 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Gift className="w-4 h-4 text-royal-lightGold" />
                <span>Send Digital Shagun</span>
              </button>
            )}
            <button
              onClick={handleShareLink}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition"
              title="Share Wedding Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Multi-Faith Blessings Banner */}
      <section className="py-10 bg-white border-y border-royal-sand">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-3">
            <span className="text-xl">🕉️</span>
            <p className="font-cinzel text-xs font-bold text-royal-wine mt-1">Hindu Saat Phere</p>
            <p className="text-[11px] text-gray-500 italic mt-0.5">&ldquo;Saptapadi vows of friendship&rdquo;</p>
          </div>
          <div className="p-3">
            <span className="text-xl">☪️</span>
            <p className="font-cinzel text-xs font-bold text-royal-wine mt-1">Muslim Nikah</p>
            <p className="text-[11px] text-gray-500 italic mt-0.5">&ldquo;Barakallahu lakuma union&rdquo;</p>
          </div>
          <div className="p-3">
            <span className="text-xl">☬</span>
            <p className="font-cinzel text-xs font-bold text-royal-wine mt-1">Sikh Anand Karaj</p>
            <p className="text-[11px] text-gray-500 italic mt-0.5">&ldquo;Ek Joti Doe Murti&rdquo;</p>
          </div>
          <div className="p-3">
            <span className="text-xl">✝️</span>
            <p className="font-cinzel text-xs font-bold text-royal-wine mt-1">Christian Nuptials</p>
            <p className="text-[11px] text-gray-500 italic mt-0.5">&ldquo;Love is patient & kind&rdquo;</p>
          </div>
          <div className="p-3 col-span-2 md:col-span-1">
            <span className="text-xl">🪷</span>
            <p className="font-cinzel text-xs font-bold text-royal-wine mt-1">Jain Manglik</p>
            <p className="text-[11px] text-gray-500 italic mt-0.5">&ldquo;Ahimsa & eternal peace&rdquo;</p>
          </div>
        </div>
      </section>

      {/* 3. Our Love Story Timeline */}
      <section className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-cinzel text-xs uppercase tracking-widest text-royal-gold font-bold">Chapter by Chapter</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-royal-charcoal mt-1">Our Journey Together</h2>
          <div className="w-20 h-1 bg-royal-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative border-l-2 border-royal-gold/40 ml-4 sm:ml-32 space-y-12">
          {[
            {
              year: 'Winter 2021',
              title: 'The First Spark in Hauz Khas',
              desc: 'Met over hot artisanal chai and endless conversations on heritage architecture and indie cinema. What was planned as a 30-minute coffee turned into a 5-hour walk.',
              icon: '☕'
            },
            {
              year: 'Spring 2023',
              title: 'Mountain Roadtrips & True Companionship',
              desc: 'From freezing mountain passes in Spiti to navigating life career shifts, we realized we are each other’s calm harbor in every storm.',
              icon: '🏔️'
            },
            {
              year: 'Monsoon 2025',
              title: 'The Palace Proposal at Lake Pichola',
              desc: 'Under a canopy of Udaipur stars with the water glowing gold, Kabir asked the forever question. Ananya said yes with tears and joyful laughter.',
              icon: '💍'
            },
            {
              year: 'November 2026',
              title: 'The Royal Wedding Celebration',
              desc: 'Gathering our closest families and friends from all across the globe to celebrate our lifelong vows.',
              icon: '👑'
            }
          ].map((item, idx) => (
            <div key={idx} className="relative pl-8 group">
              {/* Timeline marker */}
              <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full royal-gradient-wine flex items-center justify-center text-white text-xs shadow-md border-2 border-white ring-2 ring-royal-gold/30">
                <span>{item.icon}</span>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-royal-sand/80 shadow-sm group-hover:shadow-lg transition-all group-hover:border-royal-gold/40">
                <span className="text-xs font-cinzel font-bold text-royal-wine tracking-wider uppercase">{item.year}</span>
                <h3 className="font-serif text-xl font-bold text-royal-charcoal mt-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Wedding Celebrations & Itinerary */}
      <section className="py-16 sm:py-20 bg-royal-pearl border-y border-royal-sand px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-cinzel text-xs uppercase tracking-widest text-royal-gold font-bold">Event Schedule</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-royal-charcoal mt-1">Wedding Itinerary & Dress Code</h2>
            <p className="text-gray-500 text-sm mt-2">Every ceremony is a masterpiece of music, celebration, and rituals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Haldi & Phoolon Ki Holi',
                date: 'Nov 27, 2026 • 10:30 AM',
                venue: 'Courtyard Poolside, Oberoi Udaivilas',
                dressCode: 'Sunshine Yellow & Floral Pastels',
                desc: 'Turmeric rituals, organic marigold flower petal showers, and live folk dhol.',
                mapsUrl: 'https://maps.google.com/?q=Oberoi+Udaivilas+Udaipur'
              },
              {
                name: 'Sangeet & DJ Night',
                date: 'Nov 27, 2026 • 07:30 PM',
                venue: 'Royal Ballroom & Zenana Lawns',
                dressCode: 'Royal Velvet & Mirror Work Sparkle',
                desc: 'Family dance performances, Bollywood DJ faceoff, and midnight chaat bazaar.',
                mapsUrl: 'https://maps.google.com/?q=Oberoi+Udaivilas+Udaipur'
              },
              {
                name: 'Varmala & Wedding Nuptials',
                date: 'Nov 28, 2026 • 06:00 PM',
                venue: 'Lakeside Palace Mandap & Terrace',
                dressCode: 'Imperial Silk Sherwani & Heritage Lehengas',
                desc: 'Royal sunset Baraat with vintage cavalry, sacred Saat Phere, and gala banquet.',
                mapsUrl: 'https://maps.google.com/?q=Oberoi+Udaivilas+Udaipur'
              }
            ].map((event, i) => (
              <div 
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-royal-sand/80 shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl royal-gradient-wine flex items-center justify-center text-royal-gold mb-4 shadow">
                    <Calendar className="w-6 h-6 text-royal-lightGold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-royal-charcoal">{event.name}</h3>
                  <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                    <p className="flex items-center gap-2 text-royal-wine font-semibold">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{event.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-royal-gold" />
                      <span>{event.venue}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 font-sans leading-relaxed">{event.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-royal-sand">
                  <div className="bg-royal-pearl p-2.5 rounded-xl text-center mb-3">
                    <span className="block text-[10px] font-cinzel font-bold text-royal-wine uppercase tracking-wider">Dress Code</span>
                    <span className="text-xs font-serif font-bold text-royal-charcoal">{event.dressCode}</span>
                  </div>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 text-xs font-bold text-royal-wine hover:text-royal-charcoal transition"
                  >
                    <span>View Venue on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RSVP Section */}
      <section id="rsvp-section" className="py-16 sm:py-24 px-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-royal-gold/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-royal-gold/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-cinzel text-xs uppercase tracking-widest text-royal-gold font-bold">Celebrate With Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-royal-charcoal mt-1">Kindly Confirm Your Presence</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Please let us know if you will be joining our wedding festivities in Udaipur.
            </p>
          </div>

          {rsvpSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-royal-charcoal">RSVP Successfully Confirmed!</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Thank you, <span className="font-bold text-royal-wine">{guestName}</span>. Your attendance has been registered in our wedding desk. We cannot wait to celebrate with you!
              </p>
              <button
                onClick={() => setRsvpSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-xl royal-gradient-wine text-white font-bold text-xs shadow-md"
              >
                Submit Another RSVP
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-royal-sand focus:border-royal-wine focus:ring-2 focus:ring-royal-wine/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-royal-sand focus:border-royal-wine focus:ring-2 focus:ring-royal-wine/20 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Number of Attendees
                  </label>
                  <select
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-royal-sand focus:border-royal-wine text-sm"
                  >
                    <option value={1}>1 Guest (Just Me)</option>
                    <option value={2}>2 Guests (Couple)</option>
                    <option value={3}>3 Guests (Family)</option>
                    <option value={4}>4 Guests (Family of 4)</option>
                    <option value={5}>5+ Guests (Extended Family)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                    Dietary Preference
                  </label>
                  <select
                    value={mealPref}
                    onChange={(e) => setMealPref(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-royal-sand focus:border-royal-wine text-sm"
                  >
                    <option value="Royal Traditional (Veg & Non-Veg)">Royal Traditional (Veg & Non-Veg)</option>
                    <option value="Pure Vegetarian (Satvik)">Pure Vegetarian (Satvik)</option>
                    <option value="Jain (No Onion / Garlic)">Jain Feasts (Strict No Root Veg)</option>
                    <option value="Halal Certified Cuisine">Halal Certified Mughlai</option>
                    <option value="Vegan / Gluten-Free">Vegan / Gluten-Free</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-royal-slate uppercase tracking-wider mb-1 font-cinzel">
                  Warm Wishes / Notes for the Couple
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a sweet blessing, song request, or arrival notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-royal-sand focus:border-royal-wine focus:ring-2 focus:ring-royal-wine/20 text-sm font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={submittingRsvp}
                className="w-full py-4 rounded-2xl royal-gradient-wine text-white font-bold text-sm tracking-wide shadow-luxury hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-royal-lightGold" />
                <span>{submittingRsvp ? 'Registering Attendance...' : 'Confirm RSVP Online'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 6. Guest Suite Quick Access Footer Bar */}
      <div className="bg-royal-charcoal text-white py-8 px-4 border-t border-royal-gold/20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-bold text-royal-lightGold">Attending Ananya & Kabir&apos;s Wedding?</h4>
            <p className="text-xs text-gray-400">Explore interactive guest features designed for you.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {onNavigateToShagun && (
              <button
                onClick={onNavigateToShagun}
                className="px-4 py-2 rounded-xl bg-royal-wine text-white text-xs font-bold hover:bg-royal-wine/80 transition"
              >
                UPI Shagun
              </button>
            )}
            {onNavigateToPhotos && (
              <button
                onClick={onNavigateToPhotos}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-royal-lightGold" />
                <span>Upload Photos</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
