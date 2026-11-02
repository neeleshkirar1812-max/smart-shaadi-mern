import express from "express";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "smart_shaadi_super_secret_jwt_key_2026";

function getUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return "u_couple"; // default guest couple
  try {
    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch {
    return "u_couple";
  }
}

// GET /api/wedding - Couple wedding dashboard data
router.get("/", (req, res) => {
  const userId = getUserId(req);
  if (!memoryStore.weddings[userId]) {
    memoryStore.weddings[userId] = {
      userId,
      coupleName: "Ananya & Kabir",
      weddingDate: "2026-11-28",
      city: "Udaipur, Rajasthan",
      budget: 2500000,
      spent: 1280000,
      guestCount: 350,
      theme: "Royal Rajputana Pastel Romance",
      tasks: [
        { id: "t1", text: "Lock the royal palace venue in Udaipur", done: true, category: "Venue" },
        { id: "t2", text: "Book Wedmoire photography & cinematic drone team", done: true, category: "Photo" },
        { id: "t3", text: "Finalize Royal Shahi Dawat 4-meal catering menu", done: true, category: "Catering" },
        { id: "t4", text: "Finalize Pandit Ji for Vedic Saat Phere ceremony", done: false, category: "Ritual" },
        { id: "t5", text: "Confirm Floral Mandap & Fairy Lights design", done: false, category: "Decor" }
      ],
      schedule: [
        { id: "s1", event: "Ganesh Sthapana & Haldi", date: "2026-11-26", time: "10:30 AM", location: "Poolside Lawn", dressCode: "Yellow Floral Kurtas & Lehengas" },
        { id: "s2", event: "Grand Royal Sangeet Night", date: "2026-11-26", time: "07:30 PM", location: "Courtyard Ballroom", dressCode: "Glamorous Indo-Western & Tuxedos" }
      ]
    };
  }

  res.json(memoryStore.weddings[userId]);
});

// PUT /api/wedding - Update couple wedding details
router.put("/", (req, res) => {
  const userId = getUserId(req);
  const existing = memoryStore.weddings[userId] || {};
  memoryStore.weddings[userId] = {
    ...existing,
    ...req.body,
    userId
  };
  res.json(memoryStore.weddings[userId]);
});

// POST /api/wedding/tasks - Add checklist task
router.post("/tasks", (req, res) => {
  const userId = getUserId(req);
  const wedding = memoryStore.weddings[userId];
  const { text, category = "General", dueDate } = req.body;

  if (!text) {
    return res.status(400).json({ detail: "Task text is required." });
  }

  const newTask = {
    id: "t_" + uuidv4().slice(0, 6),
    text,
    done: false,
    category,
    dueDate: dueDate || ""
  };

  wedding.tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /api/wedding/tasks/:id - Toggle task done
router.patch("/tasks/:id", (req, res) => {
  const userId = getUserId(req);
  const wedding = memoryStore.weddings[userId];
  const task = wedding.tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ detail: "Task not found." });
  }

  if (typeof req.body.done === "boolean") {
    task.done = req.body.done;
  }
  if (req.body.text) {
    task.text = req.body.text;
  }

  res.json(task);
});

// DELETE /api/wedding/tasks/:id
router.delete("/tasks/:id", (req, res) => {
  const userId = getUserId(req);
  const wedding = memoryStore.weddings[userId];
  wedding.tasks = wedding.tasks.filter(t => t.id !== req.params.id);
  res.json({ success: true, remaining: wedding.tasks.length });
});

// POST /api/wedding/schedule - Add schedule event
router.post("/schedule", (req, res) => {
  const userId = getUserId(req);
  const wedding = memoryStore.weddings[userId];
  const { event, date, time, location, dressCode } = req.body;

  const newEvent = {
    id: "s_" + uuidv4().slice(0, 6),
    event,
    date,
    time,
    location,
    dressCode
  };

  wedding.schedule.push(newEvent);
  res.status(201).json(newEvent);
});

// DELETE /api/wedding/schedule/:id
router.delete("/schedule/:id", (req, res) => {
  const userId = getUserId(req);
  const wedding = memoryStore.weddings[userId];
  wedding.schedule = wedding.schedule.filter(s => s.id !== req.params.id);
  res.json({ success: true });
});

export default router;
