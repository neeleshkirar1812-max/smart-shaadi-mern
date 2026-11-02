import express from "express";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "smart_shaadi_super_secret_jwt_key_2026";

function getUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  try {
    const token = authHeader.replace(/^Bearer\s+/, "");
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// GET /api/bookings - List bookings based on role
router.get("/", (req, res) => {
  const user = getUser(req);
  if (!user) {
    // Return sample bookings if not logged in
    return res.json(memoryStore.bookings);
  }

  if (user.role === "vendor") {
    // Return inquiries targeting this vendor or any
    const vendorBookings = memoryStore.bookings.filter(b => b.vendorId === user.id || b.vendorName.includes(user.name) || true);
    return res.json(vendorBookings);
  }

  // If couple, return their bookings
  const coupleBookings = memoryStore.bookings.filter(b => b.userId === user.id || b.userId === "u_couple");
  res.json(coupleBookings);
});

// POST /api/bookings - Create new inquiry / booking
router.post("/", (req, res) => {
  const user = getUser(req) || { id: "u_couple", name: "Ananya & Kabir" };
  const { vendorId, vendorName, eventDate, eventType, budget, notes } = req.body;

  if (!vendorId) {
    return res.status(400).json({ detail: "Vendor ID is required." });
  }

  const newBooking = {
    id: "b_" + uuidv4().slice(0, 8),
    userId: user.id,
    coupleName: user.name || "The Couple",
    vendorId,
    vendorName: vendorName || "Selected Vendor",
    eventDate: eventDate || "2026-11-28",
    eventType: eventType || "Wedding Main Event",
    budget: budget || "As per package",
    notes: notes || "Please check availability for our wedding.",
    status: "pending",
    quote: null,
    createdAt: new Date().toISOString()
  };

  memoryStore.bookings.unshift(newBooking);
  res.status(201).json(newBooking);
});

// POST /api/bookings/:id/quote - Vendor submits a quote
router.post("/:id/quote", (req, res) => {
  const booking = memoryStore.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ detail: "Booking inquiry not found." });
  }

  const { amount, message, validUntil } = req.body;
  if (!amount) {
    return res.status(400).json({ detail: "Quote amount is required." });
  }

  booking.quote = {
    amount: Number(amount),
    message: message || "Here is our custom quotation for your wedding dates.",
    validUntil: validUntil || "2026-11-15",
    submittedAt: new Date().toISOString()
  };
  booking.status = "quoted";

  res.json({ success: true, booking });
});

// PATCH /api/bookings/:id/status - Update booking status (confirm/decline)
router.patch("/:id/status", (req, res) => {
  const booking = memoryStore.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ detail: "Booking inquiry not found." });
  }

  const { status } = req.body;
  if (!["confirmed", "declined", "pending"].includes(status)) {
    return res.status(400).json({ detail: "Invalid status value." });
  }

  booking.status = status;
  res.json({ success: true, booking });
});

export default router;
