import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "smart_shaadi_super_secret_jwt_key_2026";

// Helper to find user by email
function findUserByEmail(email) {
  return memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "couple", city = "Delhi NCR" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ detail: "Name, email, and password are required." });
    }

    if (findUserByEmail(email)) {
      return res.status(400).json({ detail: "An account with this email already exists." });
    }

    const newUser = {
      id: "u_" + uuidv4().slice(0, 8),
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 8),
      role,
      city
    };

    memoryStore.users.push(newUser);

    // Initialize blank wedding profile if couple
    if (role === "couple") {
      memoryStore.weddings[newUser.id] = {
        userId: newUser.id,
        coupleName: name,
        weddingDate: "2026-12-15",
        city,
        budget: 2000000,
        spent: 0,
        guestCount: 250,
        theme: "Royal Elegance",
        tasks: [
          { id: "t_" + uuidv4().slice(0, 6), text: "Finalize wedding venue and booking advance", done: false, category: "Venue" },
          { id: "t_" + uuidv4().slice(0, 6), text: "Shortlist photography & cinematic film team", done: false, category: "Photo" },
          { id: "t_" + uuidv4().slice(0, 6), text: "Curate guest list for invitations", done: false, category: "Guests" }
        ],
        schedule: []
      };
    }

    const token = jwt.sign({ id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, city: newUser.city }
    });
  } catch (err) {
    res.status(500).json({ detail: "Registration failed: " + err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ detail: "Email and password are required." });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ detail: "Invalid email or credentials." });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ detail: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, city: user.city }
    });
  } catch (err) {
    res.status(500).json({ detail: "Login failed: " + err.message });
  }
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ detail: "No authentication token provided." });
    }

    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = memoryStore.users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ detail: "User not found." });
    }

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, city: user.city });
  } catch (err) {
    res.status(401).json({ detail: "Session expired or invalid." });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully." });
});

export default router;
