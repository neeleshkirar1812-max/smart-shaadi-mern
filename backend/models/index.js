import mongoose from "mongoose";

/* -------------------------------------------------------------
 * 1. USER SCHEMA & MODEL
 * ----------------------------------------------------------- */
export const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["couple", "vendor", "admin"], 
    default: "couple" 
  },
  phone: { type: String, default: "" },
  city: { type: String, default: "Udaipur" },
  createdAt: { type: Date, default: Date.now }
});

/* -------------------------------------------------------------
 * 2. VENDOR & PALACE SCHEMA & MODEL
 * ----------------------------------------------------------- */
export const BanquetSpecsSchema = new mongoose.Schema({
  indoorSqFt: { type: String, default: "14,500 sq.ft (Grand Ballroom)" },
  outdoorSqFt: { type: String, default: "32,000 sq.ft (Floating Lawns)" },
  minGuests: { type: Number, default: 150 },
  maxGuests: { type: Number, default: 1200 },
  floatingLawns: { type: Boolean, default: true },
  parkingCapacity: { type: String, default: "250 Valet Bays" },
  roomsCount: { type: String, default: "80 Luxury Suites" }
}, { _id: false });

export const VendorSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true,
    enum: ["Venue", "Pandit / Officiant", "Catering", "Photography", "Decor", "Music", "Attire", "Makeup"] 
  },
  faith: { type: String, default: "All Traditions" },
  city: { type: String, required: true },
  price: { type: String, required: true },
  priceUnit: { type: String, default: "day rental" },
  vegPlatePrice: { type: String, default: "₹4,800" },
  nonVegPlatePrice: { type: String, default: "₹5,800" },
  rating: { type: Number, default: 4.9, min: 1, max: 5 },
  reviewsCount: { type: Number, default: 12 },
  description: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String, default: "" },
  imageReel: [{ type: String }],
  verified: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  approval_status: { 
    type: String, 
    enum: ["approved", "pending", "rejected"], 
    default: "approved" 
  },
  banquetSpecs: { type: BanquetSpecsSchema, default: () => ({}) },
  faithTags: [{ type: String }],
  tags: [{ type: String }],
  contact: { type: String, default: "+91 98290 12345" },
  experience: { type: String, default: "15+ Years" },
  eventsDone: { type: Number, default: 250 },
  userId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

/* -------------------------------------------------------------
 * 3. WEDDING TASK & SCHEDULE SCHEMAS
 * ----------------------------------------------------------- */
export const WeddingTaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  category: { type: String, default: "Ritual" },
  dueDate: { type: String, default: "" }
}, { _id: false });

export const ScheduleEventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  event: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: "11:00 AM" },
  location: { type: String, default: "Courtyard Lawn" },
  dressCode: { type: String, default: "Pastel Royal" }
}, { _id: false });

export const WeddingSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coupleName: { type: String, default: "Ananya & Kabir" },
  weddingDate: { type: String, default: "2026-11-28" },
  city: { type: String, default: "Udaipur, Rajasthan" },
  budget: { type: Number, default: 25000000 },
  spent: { type: Number, default: 1280000 },
  guestCount: { type: Number, default: 350 },
  faith: { type: String, default: "Hindu Vivah" },
  tasks: [WeddingTaskSchema],
  schedule: [ScheduleEventSchema],
  createdAt: { type: Date, default: Date.now }
});

/* -------------------------------------------------------------
 * 4. BOOKING & ESCROW SCHEMA & MODEL
 * ----------------------------------------------------------- */
export const QuoteSubSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  message: { type: String, default: "Formal quotation for palace celebration." },
  validUntil: { type: String, default: "" },
  submittedAt: { type: Date, default: Date.now }
}, { _id: false });

export const BookingSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  coupleName: { type: String, default: "Ananya & Kabir" },
  vendorId: { type: String, required: true },
  vendorName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventType: { type: String, default: "Full 3-Day Wedding Package" },
  budget: { type: String, default: "₹8,50,000" },
  notes: { type: String, default: "" },
  status: { 
    type: String, 
    enum: ["pending", "quoted", "confirmed", "declined"], 
    default: "pending" 
  },
  quote: { type: QuoteSubSchema, default: null },
  escrowWireRef: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

/* -------------------------------------------------------------
 * 5. GUEST & SEATING SCHEMA & MODEL
 * ----------------------------------------------------------- */
export const GuestSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  side: { 
    type: String, 
    enum: ["Ladkewale (Groom's Clan)", "Ladkiwale (Bride's Clan)", "Mutual / Friends", "Groom Side", "Bride Side", "Common Friends", "VIP Guests"], 
    default: "Ladkiwale (Bride's Clan)" 
  },
  relation: { type: String, default: "Family Relative" },
  rsvpStatus: { 
    type: String, 
    enum: ["Confirmed", "Pending", "Declined"], 
    default: "Pending" 
  },
  dietary: { 
    type: String, 
    enum: [
      "Pure Jain Chauvihar", 
      "Satvik Vaishnav", 
      "Halal Certified", 
      "Global Gourmet", 
      "Vegetarian", 
      "Jain", 
      "Non-Vegetarian", 
      "Vegan"
    ], 
    default: "Pure Jain Chauvihar" 
  },
  attendeesCount: { type: Number, default: 2 },
  tableId: { type: String, default: null },
  tableName: { type: String, default: "Unassigned" },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

/* -------------------------------------------------------------
 * 6. COLLABORATION BOARD SCHEMA
 * ----------------------------------------------------------- */
export const BoardSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  coupleName: { type: String, default: "Ananya & Kabir" },
  city: { type: String, default: "Udaipur" },
  weddingDate: { type: String, default: "2026-11-28" },
  members: [{ email: String, role: String, joinedAt: { type: Date, default: Date.now } }],
  notes: [{ id: String, text: String, author: String, createdAt: { type: Date, default: Date.now } }]
});

// Model Exports
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema);
export const Wedding = mongoose.models.Wedding || mongoose.model("Wedding", WeddingSchema);
export const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export const Guest = mongoose.models.Guest || mongoose.model("Guest", GuestSchema);
export const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);
