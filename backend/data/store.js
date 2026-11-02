import { seedVendors } from "./seedVendors.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// In-Memory store fallback
export const memoryStore = {
  users: [
    {
      id: "u_admin",
      name: "Admin Karan",
      email: "admin@smartshaadi.com",
      passwordHash: bcrypt.hashSync("admin123", 8),
      role: "admin",
      city: "Delhi NCR"
    },
    {
      id: "u_couple",
      name: "Ananya & Kabir",
      email: "couple@smartshaadi.com",
      passwordHash: bcrypt.hashSync("couple123", 8),
      role: "couple",
      city: "Udaipur"
    },
    {
      id: "u_vendor",
      name: "The Wedmoire Studio",
      email: "wedmoire@smartshaadi.com",
      passwordHash: bcrypt.hashSync("vendor123", 8),
      role: "vendor",
      city: "Jaipur"
    }
  ],
  vendors: [...seedVendors],
  weddings: {
    "u_couple": {
      userId: "u_couple",
      coupleName: "Ananya & Kabir",
      weddingDate: "2026-11-28",
      city: "Udaipur, Rajasthan",
      faith: "Hindu Vivah",
      budget: 2500000,
      spent: 1280000,
      guestCount: 350,
      theme: "Royal Rajputana Pastel Romance",
      tasks: [
        { id: "t1", text: "Lock the royal palace venue in Udaipur", done: true, category: "Venue", dueDate: "2026-06-15" },
        { id: "t2", text: "Book Wedmoire photography & cinematic drone team", done: true, category: "Photo", dueDate: "2026-07-01" },
        { id: "t3", text: "Finalize Royal Shahi Dawat 4-meal catering menu", done: true, category: "Catering", dueDate: "2026-08-10" },
        { id: "t4", text: "Finalize Vedic Pandit / Qazi / Priest for solemnization", done: false, category: "Ritual", dueDate: "2026-09-01" },
        { id: "t5", text: "Confirm Floral Mandap / Ceremony stage design", done: false, category: "Decor", dueDate: "2026-09-20" },
        { id: "t6", text: "Send WhatsApp digital invites with multi-faith RSVP links", done: false, category: "Guests", dueDate: "2026-10-05" },
        { id: "t7", text: "Sangeet choreography songs & rehearsals", done: false, category: "Music", dueDate: "2026-10-25" }
      ],
      schedule: [
        { id: "s1", event: "Ganesh Sthapana & Haldi / Manjha", date: "2026-11-26", time: "10:30 AM", location: "Poolside Lawn", dressCode: "Yellow Floral Kurtas & Lehengas" },
        { id: "s2", event: "Grand Royal Sangeet & Qawwali Night", date: "2026-11-26", time: "07:30 PM", location: "Courtyard Ballroom", dressCode: "Glamorous Indo-Western & Tuxedos" },
        { id: "s3", event: "Baraat Procession & Welcome", date: "2026-11-27", time: "05:00 PM", location: "Palace Grand Entry", dressCode: "Regal Sherwanis & Safas" },
        { id: "s4", event: "Sacred Vivah / Nikah / Anand Karaj / Vows", date: "2026-11-27", time: "08:00 PM", location: "Sunset Mandap & Pavilion", dressCode: "Traditional Royal Silks" },
        { id: "s5", event: "Royal Feast & Walima / Reception Banquet", date: "2026-11-28", time: "08:00 PM", location: "Grand Amphitheatre", dressCode: "Formal Elegance" }
      ]
    }
  },
  bookings: [
    {
      id: "b1",
      userId: "u_couple",
      coupleName: "Ananya & Kabir",
      vendorId: "v8",
      vendorName: "The Wedmoire Studio & Films",
      eventDate: "2026-11-26 to 2026-11-28",
      eventType: "Full 3-Day Wedding Coverage",
      budget: "₹1,25,000 / day",
      notes: "Need 2 candid photographers + 2 cinematographers + 4K drone setup for Sangeet & Ceremony.",
      status: "quoted",
      quote: {
        amount: 320000,
        message: "Exclusive 3-Day Package: 2 Cinematographers, 2 Candid Photographers, 1 Drone Pilot, 40-page Layflat Royal Album included.",
        validUntil: "2026-11-01",
        submittedAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString()
    }
  ],
  boards: {
    "royal-wedding-2026": {
      token: "royal-wedding-2026",
      title: "Ananya & Kabir's Royal Udaipur Shaadi",
      ownerId: "u_couple",
      coupleName: "Ananya & Kabir",
      city: "Udaipur, Rajasthan",
      weddingDate: "2026-11-28",
      members: [
        { email: "parents@ananyakabir.com", role: "Co-Host (Parents)", joinedAt: new Date().toISOString() },
        { email: "rohit.bestman@gmail.com", role: "Best Man / Logistics", joinedAt: new Date().toISOString() }
      ],
      notes: [
        { id: "n1", text: "Baraat vintage car booked for 4:30 PM sharp at palace gate.", author: "Kabir", createdAt: new Date().toISOString() },
        { id: "n2", text: "Haldi organic phool-patti delivery confirmed by florist.", author: "Ananya", createdAt: new Date().toISOString() }
      ]
    }
  },
  guests: [
    { 
      id: "g1", 
      userId: "u_couple", 
      name: "Rameshwar & Sunita Verma", 
      phone: "+91 98290 11223", 
      side: "Ladkiwale (Bride's Clan)", 
      relation: "Maternal Uncle (Mama Ji)", 
      group: "Bride Side", 
      rsvpStatus: "Confirmed", 
      dietary: "Pure Jain Chauvihar", 
      diet: "Jain", 
      attendeesCount: 4, 
      plusOnes: 3, 
      tableName: "Table 01 - Royal Diwan", 
      hotelRoomAssigned: "Room 204 - Haveli Wing",
      notes: "Requires ground floor seating and Chauvihar dinner before sunset."
    },
    { 
      id: "g2", 
      userId: "u_couple", 
      name: "Col. Vikramjit & Harpreet Singh", 
      phone: "+91 98110 44556", 
      side: "Ladkewale (Groom's Clan)", 
      relation: "Paternal Uncle (Chacha Ji)", 
      group: "Groom Side", 
      rsvpStatus: "Confirmed", 
      dietary: "Global Gourmet", 
      diet: "Non-Vegetarian", 
      attendeesCount: 3, 
      plusOnes: 2, 
      tableName: "Table 02 - Baraat VIPs", 
      hotelRoomAssigned: "Room 302 - Lake View",
      notes: "Leading the Baraat vintage car procession."
    },
    { 
      id: "g3", 
      userId: "u_couple", 
      name: "Dr. Farooq & Parveen Qureshi", 
      phone: "+91 98711 77889", 
      side: "Mutual / Friends", 
      relation: "Family Physician & Mentor", 
      group: "Common Friends", 
      rsvpStatus: "Confirmed", 
      dietary: "Halal Certified", 
      diet: "Non-Vegetarian", 
      attendeesCount: 2, 
      plusOnes: 1, 
      tableName: "Table 03 - Lakeview Terrace", 
      hotelRoomAssigned: "Suite 105 - Maharaja Suite",
      notes: "Arriving for Sangeet Night on 27th Nov."
    },
    { 
      id: "g4", 
      userId: "u_couple", 
      name: "Shailesh & Meena Kothari", 
      phone: "+91 94140 33221", 
      side: "Ladkiwale (Bride's Clan)", 
      relation: "Senior Elder (Nanaji Family)", 
      group: "Bride Side", 
      rsvpStatus: "Confirmed", 
      dietary: "Satvik Vaishnav", 
      diet: "Vegetarian", 
      attendeesCount: 2, 
      plusOnes: 1, 
      tableName: "Table 01 - Royal Diwan", 
      hotelRoomAssigned: "Room 101 - Ground Floor",
      notes: "VIP Aarti thali arranged for welcoming."
    },
    { 
      id: "g5", 
      userId: "u_couple", 
      name: "Capt. Ronald & Evelyn D'Costa", 
      phone: "+91 98200 66554", 
      side: "Ladkewale (Groom's Clan)", 
      relation: "Groom's Godparents", 
      group: "Groom Side", 
      rsvpStatus: "Confirmed", 
      dietary: "Global Gourmet", 
      diet: "Non-Vegetarian", 
      attendeesCount: 2, 
      plusOnes: 1, 
      tableName: "Table 04 - Global Delegates", 
      hotelRoomAssigned: "Room 210 - Palm Court",
      notes: "Flying in from Goa via Mumbai."
    },
    { 
      id: "g6", 
      userId: "u_couple", 
      name: "Aman & Natasha Malhotra", 
      phone: "+91 99100 88776", 
      side: "Mutual / Friends", 
      relation: "College Best Friends (IIM-A)", 
      group: "Common Friends", 
      rsvpStatus: "Confirmed", 
      dietary: "Global Gourmet", 
      diet: "Non-Vegetarian", 
      attendeesCount: 2, 
      plusOnes: 1, 
      tableName: "Table 05 - Sangeet Squad", 
      hotelRoomAssigned: "Room 305 - Lake View",
      notes: "Anchor for Sangeet Dance Face-off!"
    },
    { 
      id: "g7", 
      userId: "u_couple", 
      name: "Justice Hemant & Saroj Joshi", 
      phone: "+91 98280 55443", 
      side: "Ladkiwale (Bride's Clan)", 
      relation: "Grandfather's Brother", 
      group: "Bride Side", 
      rsvpStatus: "Pending", 
      dietary: "Satvik Vaishnav", 
      diet: "Vegetarian", 
      attendeesCount: 2, 
      plusOnes: 1, 
      tableName: "Unassigned", 
      hotelRoomAssigned: "TBD",
      notes: "Flight schedule awaiting confirmation."
    },
    { 
      id: "g8", 
      userId: "u_couple", 
      name: "Zubair & Sana Merchant", 
      phone: "+91 98920 11998", 
      side: "Mutual / Friends", 
      relation: "Business Partner", 
      group: "Common Friends", 
      rsvpStatus: "Declined", 
      dietary: "Halal Certified", 
      diet: "Non-Vegetarian", 
      attendeesCount: 0, 
      plusOnes: 0, 
      tableName: "Unassigned", 
      hotelRoomAssigned: "None",
      notes: "Sent digital shagun ₹11,001 with apologies for travel conflict."
    }
  ]
};
