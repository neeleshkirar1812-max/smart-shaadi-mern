import express from "express";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Initialize in-memory collections if not present
if (!memoryStore.shagun) {
  memoryStore.shagun = [
    { id: "sh1", guestName: "Suresh & Meena Sharma (Mama Ji)", amount: 11000, blessing: "Sada Sukhi Raho! Heartiest congratulations and endless blessings to Ananya & Kabir.", timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), upiRef: "UPI/982901/771" },
    { id: "sh2", guestName: "Tariq & Fatima Khan", amount: 5100, blessing: "Barakallahu lakuma! May Allah bless your union with endless happiness and peace.", timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), upiRef: "UPI/981104/882" },
    { id: "sh3", guestName: "Bhai Harpreet & Simran Singh", amount: 5100, blessing: "Lakh lakh vadaiyan ji! Waheguru bless the royal couple with infinite love.", timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), upiRef: "UPI/987228/993" },
    { id: "sh4", guestName: "David & Sarah D'Souza", amount: 2100, blessing: "Wishing you both a lifetime of laughter, joy and togetherness!", timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), upiRef: "UPI/982213/114" }
  ];
}

if (!memoryStore.photos) {
  memoryStore.photos = [
    { id: "p1", guestName: "Rohan Mehta", caption: "The royal courtyard at sunset during Haldi! ✨", imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80", likes: 24, timestamp: new Date(Date.now() - 3600000 * 18).toISOString() },
    { id: "p2", guestName: "Priya Sharma", caption: "Baraat entry with live Punjabi Dhol symphony! 🎉", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", likes: 38, timestamp: new Date(Date.now() - 3600000 * 14).toISOString() },
    { id: "p3", guestName: "Simran Kaur", caption: "Beautiful phoolon ki chadar for the bride 🌸", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80", likes: 45, timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { id: "p4", guestName: "Kabir's College Friends", caption: "Sangeet night squad with the groom! 🕺", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80", likes: 52, timestamp: new Date(Date.now() - 3600000 * 4).toISOString() }
  ];
}

if (!memoryStore.playlist) {
  memoryStore.playlist = [
    { id: "pl1", title: "Kala Chashma (Sangeet Finale)", artist: "Baadshah & Neha Kakkar", category: "Sangeet", votes: 48, requestedBy: "Bride Squad" },
    { id: "pl2", title: "Sauda Khara Khara (Baraat Dhol)", artist: "Diljit Dosanjh & Sukhbir", category: "Baraat", votes: 42, requestedBy: "Groom's Gang" },
    { id: "pl3", title: "Gallan Goodiyaan (Family Flashmob)", artist: "Shankar Mahadevan & Farhan", category: "Sangeet", votes: 39, requestedBy: "Mama & Chacha Ji" },
    { id: "pl4", title: "Mast Magan (Varmala Entry)", artist: "Arijit Singh", category: "Varmala", votes: 35, requestedBy: "The Couple" },
    { id: "pl5", title: "London Thumakda (Haldi Rain)", artist: "Labh Janjua & Sonu Kakkar", category: "Haldi", votes: 29, requestedBy: "Ananya's Sisters" }
  ];
}

if (!memoryStore.tables) {
  memoryStore.tables = [
    { id: "tbl1", name: "Table 1: Royal VVIP & Grandparents", capacity: 8, zone: "Palace Terrace", guests: ["Suresh Sharma", "Meena Sharma", "Uncle Rajesh Kapoor", "Dadi Ji"] },
    { id: "tbl2", name: "Table 2: Bride Immediate Family", capacity: 10, zone: "Lake View Lawn", guests: ["Tariq Khan", "Fatima Khan", "Priya Mehta", "Rohan Mehta"] },
    { id: "tbl3", name: "Table 3: Groom Immediate Family", capacity: 10, zone: "Lake View Lawn", guests: ["Bhai Harpreet Singh", "Simran Kaur", "Vikram Singhania"] },
    { id: "tbl4", name: "Table 4: College & Friends Lounge", capacity: 12, zone: "Poolside Gazebo", guests: ["David D'Souza", "Sarah D'Souza", "Rohit Best Man"] }
  ];
}

/* ==========================================================================
   1. DIGITAL SHAGUN ROUTES (/api/shagun)
   ========================================================================== */
router.get("/shagun", (req, res) => {
  const list = memoryStore.shagun || [];
  const totalAmount = list.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  res.json({
    shagunList: list,
    totalCollected: totalAmount,
    totalBlessings: list.length,
    upiId: "ananya.kabir@oksbi",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=ananya.kabir@oksbi&pn=Ananya%20Kabir%20Wedding%20Shagun&cu=INR"
  });
});

router.post("/shagun", (req, res) => {
  const { guestName, amount, blessing } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ detail: "Valid Shagun amount is required." });
  }

  const newShagun = {
    id: "sh_" + uuidv4().slice(0, 6),
    guestName: guestName || "Well Wisher",
    amount: Number(amount),
    blessing: blessing || "Sada Sukhi Raho! Heartiest congratulations and blessings.",
    timestamp: new Date().toISOString(),
    upiRef: "UPI/" + Math.floor(100000 + Math.random() * 900000) + "/SH"
  };

  memoryStore.shagun.unshift(newShagun);
  res.status(201).json(newShagun);
});

/* ==========================================================================
   2. LIVE PHOTO DROP ROUTES (/api/photos)
   ========================================================================== */
router.get("/photos", (req, res) => {
  res.json({
    photos: memoryStore.photos || [],
    uploadQrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://smartshaadi.com/photo-drop/royal-wedding-2026",
    totalPhotos: (memoryStore.photos || []).length
  });
});

router.post("/photos", (req, res) => {
  const { guestName, caption, imageUrl } = req.body;
  const newPhoto = {
    id: "p_" + uuidv4().slice(0, 6),
    guestName: guestName || "Guest",
    caption: caption || "Candid royal moment! ✨",
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    likes: 1,
    timestamp: new Date().toISOString()
  };

  memoryStore.photos.unshift(newPhoto);
  res.status(201).json(newPhoto);
});

router.patch("/photos/:id/like", (req, res) => {
  const photo = (memoryStore.photos || []).find(p => p.id === req.params.id);
  if (!photo) return res.status(404).json({ detail: "Photo not found" });
  photo.likes = (photo.likes || 0) + 1;
  res.json(photo);
});

/* ==========================================================================
   3. SANGEET & DJ PLAYLIST ROUTES (/api/playlist)
   ========================================================================== */
router.get("/playlist", (req, res) => {
  const sorted = [...(memoryStore.playlist || [])].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  res.json(sorted);
});

router.post("/playlist", (req, res) => {
  const { title, artist, category = "Sangeet", requestedBy = "Family Member" } = req.body;
  if (!title) return res.status(400).json({ detail: "Song title is required." });

  const newTrack = {
    id: "pl_" + uuidv4().slice(0, 6),
    title,
    artist: artist || "Bollywood / Punjabi Hit",
    category,
    votes: 1,
    requestedBy
  };

  memoryStore.playlist.push(newTrack);
  res.status(201).json(newTrack);
});

router.patch("/playlist/:id/vote", (req, res) => {
  const track = (memoryStore.playlist || []).find(t => t.id === req.params.id);
  if (!track) return res.status(404).json({ detail: "Track not found" });
  track.votes = (track.votes || 0) + 1;
  res.json(track);
});

/* ==========================================================================
   4. SEATING & TABLE PLANNER ROUTES (/api/tables)
   ========================================================================== */
router.get("/tables", (req, res) => {
  res.json(memoryStore.tables || []);
});

router.post("/tables", (req, res) => {
  const { name, capacity = 8, zone = "Main Pavilion" } = req.body;
  if (!name) return res.status(400).json({ detail: "Table name is required." });

  const newTable = {
    id: "tbl_" + uuidv4().slice(0, 6),
    name,
    capacity: Number(capacity),
    zone,
    guests: []
  };

  memoryStore.tables.push(newTable);
  res.status(201).json(newTable);
});

router.post("/tables/:id/assign", (req, res) => {
  const table = (memoryStore.tables || []).find(t => t.id === req.params.id);
  if (!table) return res.status(404).json({ detail: "Table not found" });

  const { guestName } = req.body;
  if (!guestName) return res.status(400).json({ detail: "Guest name is required." });

  if (!table.guests.includes(guestName)) {
    table.guests.push(guestName);
  }
  res.json(table);
});

router.delete("/tables/:id/unassign", (req, res) => {
  const table = (memoryStore.tables || []).find(t => t.id === req.params.id);
  if (!table) return res.status(404).json({ detail: "Table not found" });

  const { guestName } = req.body;
  table.guests = table.guests.filter(g => g !== guestName);
  res.json(table);
});

export default router;
