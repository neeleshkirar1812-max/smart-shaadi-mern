import express from "express";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// GET /api/vendors - List with category, city, search, and FAITH / RELIGION filtering
router.get("/", (req, res) => {
  try {
    const { category, city, search, verified, featured, faith } = req.query;
    let list = [...memoryStore.vendors];

    // Faith / Tradition filter
    if (faith && faith !== "All Traditions" && faith !== "all") {
      list = list.filter(v => 
        v.faith === "All Traditions" || 
        (v.faith && v.faith.toLowerCase() === faith.toLowerCase()) ||
        (v.faithTags && v.faithTags.some(t => t.toLowerCase().includes(faith.toLowerCase())))
      );
    }

    // Category filter
    if (category && category !== "All vendors" && category !== "all") {
      list = list.filter(v => v.category.toLowerCase().includes(category.toLowerCase()));
    }

    // City filter
    if (city && city !== "All cities" && city !== "all") {
      list = list.filter(v => v.city.toLowerCase() === city.toLowerCase());
    }

    // Search query
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        (v.tags && v.tags.some(t => t.toLowerCase().includes(q))) ||
        (v.faithTags && v.faithTags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (verified === "true") {
      list = list.filter(v => v.verified);
    }

    if (featured === "true") {
      list = list.filter(v => v.featured);
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ detail: "Error fetching vendors: " + err.message });
  }
});

// GET /api/vendors/:id
router.get("/:id", (req, res) => {
  const vendor = memoryStore.vendors.find(v => v.id === req.params.id);
  if (!vendor) {
    return res.status(404).json({ detail: "Vendor not found." });
  }
  res.json(vendor);
});

// POST /api/vendors - Add vendor
router.post("/", (req, res) => {
  try {
    const { name, category, city, price, priceUnit = "onwards", description, image, contact, faith = "All Traditions" } = req.body;
    if (!name || !category || !city || !price) {
      return res.status(400).json({ detail: "Name, category, city, and price are required." });
    }

    const newVendor = {
      id: "v_" + uuidv4().slice(0, 8),
      name,
      category,
      city,
      faith,
      price,
      priceUnit,
      rating: 5.0,
      reviewsCount: 1,
      description: description || "Bespoke professional Indian wedding service.",
      image: image || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      coverImage: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=80",
      verified: false,
      featured: false,
      approval_status: "pending",
      faithTags: [faith],
      tags: ["New Listing", "Handcrafted Service"],
      contact: contact || "+91 90000 00000",
      experience: "3+ Years",
      eventsDone: 12
    };

    memoryStore.vendors.unshift(newVendor);
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(500).json({ detail: "Failed to add vendor: " + err.message });
  }
});

// PATCH /api/vendors/:id/approval
router.patch("/:id/approval", (req, res) => {
  const vendor = memoryStore.vendors.find(v => v.id === req.params.id);
  if (!vendor) {
    return res.status(404).json({ detail: "Vendor not found." });
  }

  const { approved } = req.body;
  vendor.approval_status = approved ? "approved" : "rejected";
  if (approved) vendor.verified = true;

  res.json({ success: true, vendor });
});

export default router;
