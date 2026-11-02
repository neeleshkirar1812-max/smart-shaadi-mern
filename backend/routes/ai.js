import express from "express";

const router = express.Router();

// POST /api/ai/budget-planner - Algorithmic wedding budget division
router.post("/budget-planner", (req, res) => {
  const total = Number(req.body.totalBudget) || 2500000;
  const guestCount = Number(req.body.guestCount) || 300;
  const city = req.body.city || "Udaipur";
  const faith = req.body.faith || "All Traditions";

  const breakdown = [
    { category: "Food, Beverage & Royal Catering", percent: 32, amount: Math.round(total * 0.32), note: `Approx ₹${Math.round((total * 0.32) / guestCount)} per guest across all main functions.` },
    { category: "Royal Venue, Lawns & Stays", percent: 25, amount: Math.round(total * 0.25), note: `Palace banquet/lawns & hospitality suites.` },
    { category: "Production, Decor & Floral Design", percent: 15, amount: Math.round(total * 0.15), note: `Ceremony stage, mandap/arch, lighting, and ambient sound.` },
    { category: "Cinematic Photography & Film", percent: 12, amount: Math.round(total * 0.12), note: `4K Drone, 2 candid + 2 traditional photographers, teaser film & albums.` },
    { category: "Bridal & Groom Couture", percent: 8, amount: Math.round(total * 0.08), note: `Handcrafted Lehengas, Sherwanis, Shararas, or Christian Gowns.` },
    { category: "Ritual Officiant, Samagri & Music", percent: 4, amount: Math.round(total * 0.04), note: `Honorarium for Pandit / Qazi / Granthi / Priest & ceremonial requirements.` },
    { category: "Contingency & Emergency Buffer", percent: 4, amount: Math.round(total * 0.04), note: `Buffer for transportation, guest adjustments, and gratuities.` }
  ];

  let smartTips = [
    `For ${city}, booking local Rajasthani folk / Qawwali / Live Sufi artists saves up to 40% over flying in external troupes.`,
    `Curate signature mocktail/cocktail bars to streamline beverage costs by 20%.`,
    `Opt for regional seasonal blossoms for daytime ceremonies for natural fragrance and elegant photos.`
  ];

  if (faith === "Muslim") {
    smartTips.unshift("Ensure the caterer is certified 100% Halal and provides segregated family banquet seating if requested.");
  } else if (faith === "Sikh") {
    smartTips.unshift("Coordinate with the Gurudwara management in advance regarding head coverings (Rumals) and pristine Langar seating.");
  } else if (faith === "Christian") {
    smartTips.unshift("Confirm with your Parish Priest the church photography guidelines and Nuptial choir sound acoustics.");
  } else if (faith === "Jain") {
    smartTips.unshift("Schedule the main wedding banquet before sunset (Chouhar) to respect traditional Jain dietary guidelines.");
  }

  res.json({
    totalBudget: total,
    guestCount,
    city,
    faith,
    breakdown,
    smartTips
  });
});

// POST /api/ai/itinerary-generator - Multi-faith 3-day royal Indian wedding timeline
router.post("/itinerary-generator", (req, res) => {
  const { faith = "Hindu", coupleName = "The Couple" } = req.body;

  let itinerary = [];

  if (faith === "Muslim") {
    itinerary = [
      {
        day: "Day 1 - Manjha (Haldi) & Vibrant Mehendi Night",
        events: [
          { time: "01:00 PM", title: "Manjha (Ubtan & Turmeric Ceremony)", description: "Traditional turmeric paste application on the bride and groom by aunts and sisters.", dressCode: "Yellows & Mustard Silks" },
          { time: "07:30 PM", title: "Mehendi Ki Raat & Live Sufi Qawwali", description: "Bespoke henna application, street food stations, and enchanting live Qawwali performance.", dressCode: "Emerald Green & Teal" }
        ]
      },
      {
        day: "Day 2 - Sacred Nikah & Ijab-o-Qubool",
        events: [
          { time: "04:30 PM", title: "Baraat Arrival & Royal Welcome", description: "Groom entry accompanied by traditional brass band and floral welcome.", dressCode: "Regal Sherwanis" },
          { time: "06:00 PM", title: "Nikah Ceremony & Khutbah", description: "Official Nikah solemnization by Qazi, Mehr declaration, and signing of the Nikahnama.", dressCode: "Royal Pastels" },
          { time: "08:30 PM", title: "Dastarkhwan Nikah Dinner", description: "Lavish Awadhi Mughlai banquet featuring Dum Biryanis and fragrant desserts.", dressCode: "Traditional Formal" }
        ]
      },
      {
        day: "Day 3 - Grand Walima Banquet & Reception",
        events: [
          { time: "08:00 PM", title: "Grand Walima Reception", description: "Formal dinner hosted by the groom's family with music, photo sessions, and congratulations.", dressCode: "Black Tie Tuxedos & Heavy Shararas" }
        ]
      }
    ];
  } else if (faith === "Sikh") {
    itinerary = [
      {
        day: "Day 1 - Roka, Mehndi & Vibrant Jaggo Night",
        events: [
          { time: "02:00 PM", title: "Mehndi & Chooda Ceremony", description: "Maternal uncles present the sacred ivory & red Chooda bathed in milk.", dressCode: "Punjabi Phulkaris & Bright Pinks" },
          { time: "08:00 PM", title: "High-Energy Jaggo & Sangeet", description: "Traditional Jaggo lights carried on heads through the village/resort, followed by Bhangra & Dhol.", dressCode: "Glittering Punjabi Suits & Kurta Pajama" }
        ]
      },
      {
        day: "Day 2 - Sacred Anand Karaj (The Holy Laavan)",
        events: [
          { time: "09:30 AM", title: "Milni Ceremony & Ardas", description: "Warm greeting and garland exchange between corresponding family elders outside Gurudwara.", dressCode: "Pastel Turbans & Salwar Kameez" },
          { time: "11:00 AM", title: "Anand Karaj (4 Sacred Laavan)", description: "Solemn four circumambulations around Sri Guru Granth Sahib Ji accompanied by divine Gurbani Kirtan.", dressCode: "Respectful Head-Covered Modest Attire" },
          { time: "01:00 PM", title: "Guru Ka Langar", description: "Blessed community meal served with humility and joy to all attendees.", dressCode: "Traditional Attire" }
        ]
      },
      {
        day: "Day 3 - Grand Royal Reception",
        events: [
          { time: "07:30 PM", title: "Wedding Reception & Dinner Gala", description: "Live Punjabi Dhol symphony, DJ, dance performances, and multi-cuisine royal feast.", dressCode: "Formal Suits & Designer Lehengas" }
        ]
      }
    ];
  } else if (faith === "Christian") {
    itinerary = [
      {
        day: "Day 1 - Bachelor/Bachelorette & Rehearsal Dinner",
        events: [
          { time: "06:30 PM", title: "Church Rehearsal & Walkthrough", description: "Bridal party, groomsmen, and flower girls rehearse procession order.", dressCode: "Smart Casual" },
          { time: "08:00 PM", title: "Family Rehearsal Dinner & Roce", description: "Traditional blessing feast with coconut juice (Roce ceremony) and speeches.", dressCode: "Cocktail Attire" }
        ]
      },
      {
        day: "Day 2 - Holy Matrimony & Nuptial Blessing",
        events: [
          { time: "03:30 PM", title: "Procession & Nuptial Mass", description: "Father walks bride down the aisle to Ave Maria; scripture readings and homily.", dressCode: "Formal Churchwear" },
          { time: "04:30 PM", title: "Exchange of Sacred Vows & Rings", description: "Solemn exchange of vows, blessing of rings, and 'You may now kiss the bride'.", dressCode: "Formal Elegance" },
          { time: "06:00 PM", title: "Sunset Lawn Cocktail Hour", description: "Acoustic violin music, sparkling wine, and canapés as the sun sets.", dressCode: "Cocktail Glamour" }
        ]
      },
      {
        day: "Day 3 - Grand Reception Ball & Toasts",
        events: [
          { time: "07:30 PM", title: "Grand Couple Entrance & First Dance", description: "Newlyweds' first dance, cake cutting, toasts by Best Man and Maid of Honor.", dressCode: "Black Tie Tuxedos & Evening Gowns" }
        ]
      }
    ];
  } else if (faith === "Jain") {
    itinerary = [
      {
        day: "Day 1 - Lagan Lekhan & Mameru (Paternal Gifts)",
        events: [
          { time: "11:00 AM", title: "Lagan Patrika Vachan", description: "Sacred reading of the wedding letter and date confirmation with blessings.", dressCode: "Traditional Marwari Silks" },
          { time: "06:00 PM", title: "Sunset Jain Mahaprasad", description: "Strict sunset dinner feast prepared with holy purity.", dressCode: "Traditional Yellows" }
        ]
      },
      {
        day: "Day 2 - Banola, Mehendi & Bhajan Sandhya",
        events: [
          { time: "10:30 AM", title: "Banola & Tel-Baan Purification", description: "Auspicious bath and blessings by maternal family.", dressCode: "Pastel Kurtas" },
          { time: "07:00 PM", title: "Bhakti Sandhya & Family Sangeet", description: "Soulful Jain stavans followed by celebratory family dances.", dressCode: "Indo-Western" }
        ]
      },
      {
        day: "Day 3 - Vivah Sanskar & Saat Phere",
        events: [
          { time: "09:30 AM", title: "Baraat Swagat & Toran Ritual", description: "Groom touches sacred Toran at the entryway.", dressCode: "Regal Safas" },
          { time: "11:30 AM", title: "Vivah Mandap Phere & Kanyadaan", description: "Circumambulations around sacred Agni with sacred Jain mantras.", dressCode: "Pure Silk Dhotis & Lehengas" },
          { time: "01:00 PM", title: "Chouhar Pre-Sunset Royal Feast", description: "Grand daytime feast prepared without onion/garlic/root vegetables.", dressCode: "Regal Formal" }
        ]
      }
    ];
  } else {
    // Default Hindu / Royal Rajputana
    itinerary = [
      {
        day: "Day 1 - Phoolon Ki Haldi & Mehendi Bazaar",
        events: [
          { time: "11:00 AM", title: "Phoolon Ki Haldi & Ubtan", description: "Natural turmeric paste application with marigold petals shower.", dressCode: "Sunny Yellow Kurtas" },
          { time: "06:30 PM", title: "Mehendi Bazaar & Street Chaat", description: "Henna artists, folk dancers, and vibrant Rajasthani food stalls.", dressCode: "Mehendi Greens & Pinks" }
        ]
      },
      {
        day: "Day 2 - Grand Royal Sangeet & Cocktail Night",
        events: [
          { time: "07:30 PM", title: "Grand Royal Sangeet", description: "High-voltage family choreography on stage followed by DJ & live percussions.", dressCode: "Indo-Western Tuxedos & Heavy Lehengas" }
        ]
      },
      {
        day: "Day 3 - The Royal Vivah (Baraat & Saat Phere)",
        events: [
          { time: "04:30 PM", title: "Royal Baraat Procession", description: "Groom entry with vintage open car, dhol symphony, and cold pyros.", dressCode: "Regal Sherwanis & Safas" },
          { time: "07:00 PM", title: "Varmala & Sacred Saat Phere", description: "Exchange of garlands and 7 eternal vows around Agni Kund by Lake Pichola.", dressCode: "Traditional Royal Silks" },
          { time: "09:30 PM", title: "Shahi Dawat Royal Feast", description: "Gourmet sit-down feast celebrating the newlyweds.", dressCode: "Regal Formal" }
        ]
      }
    ];
  }

  res.json({
    coupleName,
    faith,
    itinerary
  });
});

// POST /api/ai/ask-pandit - Multi-Faith Wedding Ritual Advisor
router.post("/ask-pandit", (req, res) => {
  const { question = "", faith = "Hindu" } = req.body;
  const q = question.toLowerCase();

  let answer = "";
  let scholar = "Vedic Scholar";
  let tip = "";

  if (faith === "Muslim" || q.includes("nikah") || q.includes("mehr") || q.includes("walima")) {
    scholar = "Qazi & Islamic Marriage Scholar";
    if (q.includes("mehr") || q.includes("mahr")) {
      answer = "Mehr is the mandatory bridal gift given by the groom to the bride at the time of marriage, symbolizing respect, honor, and financial security. It becomes the sole, exclusive property of the bride.";
      tip = "Mehr should be mutually agreed upon before the Nikah and explicitly recorded in the official Nikahnama.";
    } else if (q.includes("ijab") || q.includes("qubool")) {
      answer = "The fundamental pillars of a valid Nikah are Ijab (proposal by one party) and Qubool (acceptance by the other), witnessed by two sane adult witnesses in the presence of the Qazi.";
      tip = "Both the bride and groom must give free and clear consent.";
    } else if (q.includes("walima")) {
      answer = "The Walima is the joyous feast hosted by the groom's family to formally celebrate and announce the marriage to society and the community.";
      tip = "Sunnah encourages sharing the feast with family, friends, and the less fortunate.";
    } else {
      answer = "An Islamic marriage (Nikah) is a solemn sacred covenant (Mithaqan Ghalidha) based on love, mutual mercy, and legal protection.";
      tip = "Ensure all official Nikahnama registration documents are signed in triplicate.";
    }
  } else if (faith === "Sikh" || q.includes("laavan") || q.includes("anand karaj") || q.includes("gurudwara")) {
    scholar = "Granthi & Sikh Heritage Scholar";
    if (q.includes("laavan") || q.includes("lavan")) {
      answer = "The 4 Laavan are the sacred marriage hymns composed by Guru Ram Das Ji. Each circumambulation of Sri Guru Granth Sahib Ji represents a progressive spiritual stage: 1) Performing righteous worldly duties, 2) Meeting the True Guru, 3) Divine detachment and joy, 4) Attaining union with the Divine and complete harmony between the couple as one soul in two bodies (Ek Jot Doi Murti).";
      tip = "The groom leads, holding the Palla (scarf), which symbolizes devotion to the Guru's path.";
    } else if (q.includes("milni")) {
      answer = "Milni is the auspicious meeting outside the Gurudwara where corresponding elders (fathers, maternal uncles, brothers) from both families embrace and exchange garlands and gifts with Ardas.";
      tip = "Milni represents the unification of the two family lineages.";
    } else {
      answer = "Anand Karaj translates to 'Blissful Union'. It signifies not merely a social contract, but the spiritual union of two souls walking together on the path of truth and devotion.";
      tip = "All guests must cover their heads and remove footwear before entering the Darbar Sahib.";
    }
  } else if (faith === "Christian" || q.includes("church") || q.includes("vows") || q.includes("priest") || q.includes("mass")) {
    scholar = "Christian Nuptial & Liturgical Advisor";
    if (q.includes("vow") || q.includes("ring")) {
      answer = "The Christian wedding vows ('To have and to hold, from this day forward, for better, for worse, in sickness and in health...') signify an unbreakable, unconditional covenant before God. The unbroken circle of the ring symbolizes eternity and unbroken fidelity.";
      tip = "Couples can personalize their vows following consultation with the presiding officiant.";
    } else if (q.includes("rehearsal") || q.includes("mass")) {
      answer = "The Nuptial Mass includes the Liturgy of the Word, the Consent, the Blessing & Exchange of Rings, the Nuptial Blessing, and the Holy Communion.";
      tip = "Schedule a 45-minute church rehearsal 1-2 days before the wedding so attendants know their procession cues.";
    } else {
      answer = "In Christian theology, Holy Matrimony is a sacred sacrament reflecting the everlasting love between Christ and the Church.";
      tip = "Check with your parish 6 months in advance for Pre-Cana counseling requirements.";
    }
  } else if (faith === "Jain" || q.includes("jain") || q.includes("lagan")) {
    scholar = "Jain Vidhikar Scholar";
    answer = "In Jain Vivah Sanskar, the marriage is conducted with solemn mantras focusing on non-violence (Ahimsa), truth, and mutual spiritual upliftment. Key ceremonies include Lagan Patrika, Kanyadaan, and Pheras around the sacred fire or Jain Yantra.";
    tip = "Feasts should be arranged before sunset (Chouhar) strictly avoiding underground roots (kandmool).";
  } else {
    // Hindu
    scholar = "Acharya Pandit Ji (Vedic Scholar)";
    if (q.includes("phera") || q.includes("saat") || q.includes("vows")) {
      answer = "The 7 Sacred Phere (Saptapadi) around the holy Agni represent: 1) Food & Nourishment, 2) Strength & Vitality, 3) Prosperity & Righteousness, 4) Joy & Family Blessings, 5) Noble Progeny, 6) Harmony across all seasons, 7) Eternal Friendship & Spiritual Companionship.";
      tip = "The bride leads the first 4 phere for domestic & family duties, while the groom leads the remaining 3 for social & spiritual protection.";
    } else if (q.includes("muhurat") || q.includes("godhuli")) {
      answer = "Godhuli Bela (sunset twilight when cattle return from fields) is considered one of the most naturally auspicious muhurats for Hindu matrimony, as dust raised by cows purifies all planetary doshas.";
      tip = "Ensure Havan samagri and dry coconut are prepared 30 minutes before Godhuli Bela.";
    } else {
      answer = "In Vedic tradition, Vivah is the 13th of the 16 sacred Sanskars, turning two lives into one single dharmic chariot walking the path of Artha, Kama, and Moksha.";
      tip = "Pure unpolished Akshat (rice) and natural flowers should be showered on the couple during Varmala.";
    }
  }

  res.json({
    question,
    faith,
    scholar,
    answer,
    guruAdvice: tip || "Always maintain calm and joyful devotion during the ceremonies."
  });
});

export default router;
