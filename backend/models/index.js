import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["couple", "vendor", "admin"], default: "couple" },
  phone: { type: String, default: "" },
  city: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const VendorSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: String, required: true },
  priceUnit: { type: String, default: "onwards" },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 12 },
  description: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String, default: "" },
  verified: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  approval_status: { type: String, enum: ["approved", "pending", "rejected"], default: "approved" },
  tags: [{ type: String }],
  contact: { type: String, default: "" },
  experience: { type: String, default: "5+ Years" },
  eventsDone: { type: Number, default: 50 },
  userId: { type: String, default: null }
});

const WeddingSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  coupleName: { type: String, default: "Ananya & Kabir" },
  weddingDate: { type: String, default: "2026-11-28" },
  city: { type: String, default: "Udaipur, Rajasthan" },
  budget: { type: Number, default: 2500000 },
  spent: { type: Number, default: 1280000 },
  guestCount: { type: Number, default: 350 },
  theme: { type: String, default: "Royal Rajputana Pastel Romance" },
  tasks: [
    {
      id: String,
      text: String,
      done: Boolean,
      category: String,
      dueDate: String
    }
  ],
  schedule: [
    {
      id: String,
      event: String,
      date: String,
      time: String,
      location: String,
      dressCode: String
    }
  ]
});

const BookingSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  userId: { type: String, required: true },
  coupleName: { type: String, default: "The Couple" },
  vendorId: { type: String, required: true },
  vendorName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventType: { type: String, default: "Wedding Ceremony" },
  budget: { type: String, default: "" },
  notes: { type: String, default: "" },
  status: { type: String, enum: ["pending", "quoted", "confirmed", "declined"], default: "pending" },
  quote: {
    amount: Number,
    message: String,
    validUntil: String,
    submittedAt: Date
  },
  createdAt: { type: Date, default: Date.now }
});

const BoardSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  coupleName: { type: String, default: "Our Royal Wedding" },
  city: { type: String, default: "Udaipur" },
  weddingDate: { type: String, default: "2026-11-28" },
  members: [{ email: String, role: String, joinedAt: Date }],
  notes: [{ id: String, text: String, author: String, createdAt: Date }]
});

const GuestSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  group: { type: String, enum: ["Groom Side", "Bride Side", "Common Friends", "VIP Guests"], default: "Bride Side" },
  rsvpStatus: { type: String, enum: ["Confirmed", "Pending", "Declined"], default: "Pending" },
  diet: { type: String, enum: ["Vegetarian", "Jain", "Non-Vegetarian", "Vegan"], default: "Vegetarian" },
  plusOnes: { type: Number, default: 0 },
  hotelRoomAssigned: { type: String, default: "TBD" }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema);
export const Wedding = mongoose.models.Wedding || mongoose.model("Wedding", WeddingSchema);
export const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);
export const Guest = mongoose.models.Guest || mongoose.model("Guest", GuestSchema);
