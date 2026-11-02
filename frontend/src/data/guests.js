// Guest list & Seating Atelier Data for SmartShaadi
export const initialGuests = [
  {
    id: "g-1",
    name: "Rameshwar & Sunita Verma",
    phone: "+91 98290 11223",
    email: "ramesh.verma@udaipur.in",
    side: "Ladkiwale (Bride's Clan)",
    relation: "Maternal Uncle (Mama Ji)",
    rsvpStatus: "Confirmed",
    attendeesCount: 4,
    dietary: "Pure Jain Chauvihar",
    tableId: "t-1",
    tableName: "Table 01 - Royal Diwan",
    notes: "Requires ground floor seating and Chauvihar dinner before sunset."
  },
  {
    id: "g-2",
    name: "Col. Vikramjit & Harpreet Singh",
    phone: "+91 98110 44556",
    email: "col.vikram@punjabreg.org",
    side: "Ladkewale (Groom's Clan)",
    relation: "Paternal Uncle (Chacha Ji)",
    rsvpStatus: "Confirmed",
    attendeesCount: 3,
    dietary: "Royal Traditional (Non-Veg)",
    tableId: "t-2",
    tableName: "Table 02 - Baraat VIPs",
    notes: "Leading the Baraat vintage car procession."
  },
  {
    id: "g-3",
    name: "Dr. Farooq & Parveen Qureshi",
    phone: "+91 98711 77889",
    email: "dr.farooq@apollohosp.com",
    side: "Mutual / Friends",
    relation: "Family Physician & Mentor",
    rsvpStatus: "Confirmed",
    attendeesCount: 2,
    dietary: "Halal Certified",
    tableId: "t-3",
    tableName: "Table 03 - Lakeview Terrace",
    notes: "Arriving for Sangeet Night on 27th Nov."
  },
  {
    id: "g-4",
    name: "Shailesh & Meena Kothari",
    phone: "+91 94140 33221",
    email: "shailesh.kothari@mewartextiles.com",
    side: "Ladkiwale (Bride's Clan)",
    relation: "Senior Elder (Nanaji Family)",
    rsvpStatus: "Confirmed",
    attendeesCount: 2,
    dietary: "Satvik Vaishnav (No Onion/Garlic)",
    tableId: "t-1",
    tableName: "Table 01 - Royal Diwan",
    notes: "VIP Aarti thali arranged for welcoming."
  },
  {
    id: "g-5",
    name: "Capt. Ronald & Evelyn D'Costa",
    phone: "+91 98200 66554",
    email: "capt.dcosta@airindia.in",
    side: "Ladkewale (Groom's Clan)",
    relation: "Groom's Godparents",
    rsvpStatus: "Confirmed",
    attendeesCount: 2,
    dietary: "Global Gourmet / Continental",
    tableId: "t-4",
    tableName: "Table 04 - Global Delegates",
    notes: "Flying in from Goa via Mumbai."
  },
  {
    id: "g-6",
    name: "Aman & Natasha Malhotra",
    phone: "+91 99100 88776",
    email: "aman.malhotra@zomato.com",
    side: "Mutual / Friends",
    relation: "College Best Friends (IIM-A)",
    rsvpStatus: "Confirmed",
    attendeesCount: 2,
    dietary: "Royal Traditional (Veg & Non-Veg)",
    tableId: "t-5",
    tableName: "Table 05 - Sangeet Squad",
    notes: "Anchor for Sangeet Dance Face-off!"
  },
  {
    id: "g-7",
    name: "Justice Hemant & Saroj Joshi",
    phone: "+91 98280 55443",
    email: "justice.joshi@rajasthanhighcourt.nic",
    side: "Ladkiwale (Bride's Clan)",
    relation: "Grandfather's Brother",
    rsvpStatus: "Pending",
    attendeesCount: 2,
    dietary: "Satvik Vaishnav",
    tableId: null,
    tableName: "Unassigned",
    notes: "Flight schedule awaiting confirmation."
  },
  {
    id: "g-8",
    name: "Zubair & Sana Merchant",
    phone: "+91 98920 11998",
    email: "zubair@merchantexim.com",
    side: "Mutual / Friends",
    relation: "Business Partner",
    rsvpStatus: "Declined",
    attendeesCount: 0,
    dietary: "Halal Certified",
    tableId: null,
    tableName: "Unassigned",
    notes: "Sent digital shagun ₹11,001 with apologies for travel conflict."
  }
];

export const initialTables = [
  { id: "t-1", name: "Table 01 - Royal Diwan", capacity: 8, zone: "Indoor Ballroom", shape: "Round" },
  { id: "t-2", name: "Table 02 - Baraat VIPs", capacity: 8, zone: "Main Mandap Lawn", shape: "Round" },
  { id: "t-3", name: "Table 03 - Lakeview Terrace", capacity: 6, zone: "Lakeside Deck", shape: "Round" },
  { id: "t-4", name: "Table 04 - Global Delegates", capacity: 8, zone: "Palace Courtyard", shape: "Round" },
  { id: "t-5", name: "Table 05 - Sangeet Squad", capacity: 10, zone: "Dancefloor Amphitheatre", shape: "Round" },
  { id: "t-6", name: "Table 06 - Elders & Mentors", capacity: 6, zone: "Quiet Pavilion", shape: "Round" }
];
