import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User, Vendor, Wedding, Guest, Booking } from "../models/index.js";
import { memoryStore } from "./store.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, "fixtures");

const venuesData = JSON.parse(fs.readFileSync(path.join(fixturesDir, "venues.json"), "utf8"));
const guestsData = JSON.parse(fs.readFileSync(path.join(fixturesDir, "sample-guests.json"), "utf8"));
const traditionsData = JSON.parse(fs.readFileSync(path.join(fixturesDir, "traditions.json"), "utf8"));

const defaultUsers = [
  {
    id: "u_admin",
    name: "Admin Karan",
    email: "admin@smartshaadi.com",
    password: bcrypt.hashSync("admin123", 8),
    role: "admin",
    city: "Delhi NCR"
  },
  {
    id: "u_couple",
    name: "Ananya & Kabir",
    email: "couple@smartshaadi.com",
    password: bcrypt.hashSync("couple123", 8),
    role: "couple",
    city: "Udaipur"
  },
  {
    id: "u_vendor",
    name: "The Wedmoire Studio",
    email: "wedmoire@smartshaadi.com",
    password: bcrypt.hashSync("vendor123", 8),
    role: "vendor",
    city: "Jaipur"
  }
];

const defaultWedding = {
  userId: "u_couple",
  coupleName: "Ananya & Kabir",
  weddingDate: "2026-11-28",
  city: "Udaipur, Rajasthan",
  budget: 25000000,
  spent: 1280000,
  guestCount: 350,
  faith: "Hindu Vivah",
  tasks: [
    { id: "t1", text: "Confirm The Leela Palace lakeside mandap & floating lawns", category: "Venue", done: true },
    { id: "t2", text: "Finalize Satvik Marwari & Pure Jain Chauvihar catering contract", category: "Catering", done: true },
    { id: "t3", text: "Book Vedic Pandit & Licensed Qazi for ceremonial blessing", category: "Officiant", done: false },
    { id: "t4", text: "Order bespoke vermillion bridal lehenga & groom sherwani", category: "Attire", done: false },
    { id: "t5", text: "Lock in live dhol troupe and sound limiter telemetry for Sangeet", category: "Music", done: false }
  ],
  schedule: [
    { id: "s1", event: "Mehendi & Sufi Qawwali Night", date: "2026-11-26", time: "05:00 PM", location: "Courtyard Lotus Fountain", dressCode: "Yellow & Green Pastels" },
    { id: "s2", event: "Sangeet Beats Dance Faceoff", date: "2026-11-27", time: "07:30 PM", location: "Amphitheatre Deck", dressCode: "Indo-Western Glitz" },
    { id: "s3", event: "Saat Phere & Sunset Mandap Ceremony", date: "2026-11-28", time: "05:30 PM", location: "Floating Lake Pichola Mandap", dressCode: "Royal Traditional Silk" },
    { id: "s4", event: "Grand Royal Reception & Walima Gala", date: "2026-11-28", time: "08:30 PM", location: "Grand Mewar Ballroom", dressCode: "Black Tie / Royal Sherwani" }
  ]
};

export async function runSeed() {
  console.log("👑 [SmartShaadi Seeder] Loading JSON fixtures...");

  // 1. Update in-memory store so it reflects fixtures immediately
  memoryStore.vendors = venuesData;
  memoryStore.guests = guestsData;
  memoryStore.weddings["u_couple"] = defaultWedding;
  console.log(`✓ MemoryStore loaded with ${venuesData.length} venues, ${guestsData.length} guests, and 3 default users.`);

  // 2. Connect to MongoDB if URI is present
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/smart_shaadi_db";
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2500 });
    console.log("✨ [MongoDB] Connected to database. Seeding collections...");

    // Clear existing collections
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Wedding.deleteMany({});
    await Guest.deleteMany({});

    // Insert Users
    await User.insertMany(defaultUsers);
    console.log(`✓ Seeded ${defaultUsers.length} Users (Couple, Vendor, Admin).`);

    // Insert Venues
    await Vendor.insertMany(venuesData);
    console.log(`✓ Seeded ${venuesData.length} Palace Venues & Luxury Studios.`);

    // Insert Wedding
    await Wedding.create(defaultWedding);
    console.log(`✓ Seeded default Wedding profile for Ananya & Kabir.`);

    // Insert Guests
    const mongoGuests = guestsData.map(g => ({ ...g, userId: "u_couple" }));
    await Guest.insertMany(mongoGuests);
    console.log(`✓ Seeded ${mongoGuests.length} Guests with clan balance and dietary allocations.`);

    console.log("🎉 [MongoDB Seed Complete] All fixtures successfully written to MongoDB!");
    await mongoose.disconnect();
  } catch (err) {
    console.warn("⚠️ [MongoDB Offline] Skipping MongoDB write, in-memory store is fully ready to run:", err.message);
  }
}

// Execute if run directly
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  runSeed().then(() => process.exit(0));
}
