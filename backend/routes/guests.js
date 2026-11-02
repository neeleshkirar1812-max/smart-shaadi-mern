import express from "express";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// GET /api/guests
router.get("/", (req, res) => {
  const guests = memoryStore.guests;
  const total = guests.length;
  const confirmed = guests.filter(g => g.rsvpStatus === "Confirmed").length;
  const pending = guests.filter(g => g.rsvpStatus === "Pending").length;
  const declined = guests.filter(g => g.rsvpStatus === "Declined").length;
  const totalAttendees = guests
    .filter(g => g.rsvpStatus === "Confirmed")
    .reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0);

  res.json({
    guests,
    stats: {
      total,
      confirmed,
      pending,
      declined,
      totalAttendees,
      rsvpPercent: total ? Math.round((confirmed / total) * 100) : 0
    }
  });
});

// POST /api/guests
router.post("/", (req, res) => {
  const { name, phone = "", group = "Bride Side", diet = "Vegetarian", plusOnes = 0, hotelRoomAssigned = "TBD" } = req.body;
  if (!name) {
    return res.status(400).json({ detail: "Guest name is required." });
  }

  const newGuest = {
    id: "g_" + uuidv4().slice(0, 6),
    userId: "u_couple",
    name,
    phone,
    group,
    rsvpStatus: "Pending",
    diet,
    plusOnes: Number(plusOnes) || 0,
    hotelRoomAssigned
  };

  memoryStore.guests.unshift(newGuest);
  res.status(201).json(newGuest);
});

// PATCH /api/guests/:id
router.patch("/:id", (req, res) => {
  const guest = memoryStore.guests.find(g => g.id === req.params.id);
  if (!guest) {
    return res.status(404).json({ detail: "Guest not found." });
  }

  const { rsvpStatus, diet, hotelRoomAssigned, plusOnes, group } = req.body;
  if (rsvpStatus) guest.rsvpStatus = rsvpStatus;
  if (diet) guest.diet = diet;
  if (hotelRoomAssigned) guest.hotelRoomAssigned = hotelRoomAssigned;
  if (typeof plusOnes === "number") guest.plusOnes = plusOnes;
  if (group) guest.group = group;

  res.json(guest);
});

// DELETE /api/guests/:id
router.delete("/:id", (req, res) => {
  memoryStore.guests = memoryStore.guests.filter(g => g.id !== req.params.id);
  res.json({ success: true });
});

// POST /api/guests/whatsapp-invite - Multi-faith WhatsApp Invitation Generator
router.post("/whatsapp-invite", (req, res) => {
  const { 
    guestName, 
    coupleName = "Ananya & Kabir", 
    date = "26th - 28th November 2026", 
    venue = "Riwaaz Heritage Courtyard, Lake Pichola, Udaipur", 
    faith = "Hindu" 
  } = req.body;

  let message = "";

  if (faith === "Muslim") {
    message = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\nDear ${guestName || "Family & Friends"},\n\nIn the Name of Allah, the Most Beneficent, the Most Merciful.\n\nWith immense joy and gratitude, our families cordially invite you to grace the blessed Nikah and Walima banquet of:\n\n✨ ${coupleName} ✨\n\n📅 Date: ${date}\n📍 Venue: ${venue}\n\nKindly confirm your presence (RSVP) and dietary requirements to assist with arrangements.\n\nWarm regards & Dua,\nThe Families`;
  } else if (faith === "Sikh") {
    message = `ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥\n\nRespected ${guestName || "Family & Friends"},\n\nWith the blessings of Waheguru Ji, you are cordially invited to attend the auspicious Anand Karaj (Holy Laavan) celebration of:\n\n☬ ${coupleName} ☬\n\n📅 Date: ${date}\n📍 Gurudwara & Venue: ${venue}\n\nPlease join us for Kirtan, Anand Karaj, and Guru Ka Langar.\nKindly confirm your RSVP.\n\nWarm regards,\nThe Families`;
  } else if (faith === "Christian") {
    message = `✝ "What God has joined together, let no one separate." (Mark 10:9) ✝\n\nDear ${guestName || "Family & Friends"},\n\nWith hearts full of thanksgiving to our Lord, we invite you to witness the Holy Matrimony & Nuptial Blessing of:\n\n💍 ${coupleName} 💍\n\n📅 Date: ${date}\n📍 Church & Reception: ${venue}\n\nKindly RSVP with your dietary preferences.\n\nWith love and blessings,\nThe Families`;
  } else if (faith === "Jain") {
    message = `॥ ॐ अर्हम् ॥\n\nआदरणीय ${guestName || "सादर जय जिनेंद्र"},\n\nप्रभु महावीर के पावन आशीर्वाद से ${coupleName} के शुभ विवाह लग्न उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।\n\n📅 तिथि: ${date}\n📍 स्थान: ${venue}\n(शुद्ध चौविहार जैन आहार व्यवस्था)\n\nकृपया अपनी उपस्थिति (RSVP) की पुष्टि करें।\n\nसप्रेम निमंत्रण,\nपरिवार`;
  } else {
    // Hindu / Royal Vedic
    message = `॥ श्री गणेशाय नमः ॥\n\nआदरणीय ${guestName || "अतिथि"},\n\nपरमपिता के आशीर्वाद से हमारे परिवार में ${coupleName} के शुभ विवाह एवं सात फेरे उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।\n\n📅 तिथि: ${date}\n📍 स्थान: ${venue}\n\nकृपया अपनी उपस्थिति (RSVP) की पुष्टि करें।\n\nसप्रेम निमंत्रण,\nपरिवार`;
  }

  const encodedUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  res.json({
    message,
    whatsappUrl: encodedUrl,
    faith
  });
});

export default router;
