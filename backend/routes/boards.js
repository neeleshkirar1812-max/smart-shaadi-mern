import express from "express";
import { memoryStore } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// POST /api/boards - Create a new shared wedding board
router.post("/", (req, res) => {
  const { title = "Our Royal Wedding Board", coupleName = "Ananya & Kabir", city = "Udaipur", weddingDate = "2026-11-28" } = req.body;
  const token = "board_" + uuidv4().slice(0, 10);

  const newBoard = {
    token,
    title,
    ownerId: "u_couple",
    coupleName,
    city,
    weddingDate,
    members: [
      { email: "host@smartshaadi.com", role: "Organizer", joinedAt: new Date().toISOString() }
    ],
    notes: [
      { id: "n1", text: "Welcome to our shared wedding circle board! Family members can view and discuss planning updates here.", author: "Smart Shaadi Bot", createdAt: new Date().toISOString() }
    ]
  };

  memoryStore.boards[token] = newBoard;
  res.status(201).json(newBoard);
});

// GET /api/boards/:token - Fetch shared board details
router.get("/:token", (req, res) => {
  const board = memoryStore.boards[req.params.token];
  if (!board) {
    // If not found, return default royal board for preview convenience
    return res.json(memoryStore.boards["royal-wedding-2026"] || {
      token: req.params.token,
      title: "Royal Wedding Family Board",
      coupleName: "Ananya & Kabir",
      weddingDate: "2026-11-28",
      members: [],
      notes: []
    });
  }
  res.json(board);
});

// POST /api/boards/:token/members - Invite family member
router.post("/:token/members", (req, res) => {
  const board = memoryStore.boards[req.params.token] || memoryStore.boards["royal-wedding-2026"];
  if (!board) {
    return res.status(404).json({ detail: "Board not found." });
  }

  const { email, role = "Family Member" } = req.body;
  if (!email) {
    return res.status(400).json({ detail: "Email is required to invite family." });
  }

  board.members.push({
    email,
    role,
    joinedAt: new Date().toISOString()
  });

  res.json({ success: true, members: board.members });
});

// POST /api/boards/:token/notes - Add note
router.post("/:token/notes", (req, res) => {
  const board = memoryStore.boards[req.params.token] || memoryStore.boards["royal-wedding-2026"];
  if (!board) {
    return res.status(404).json({ detail: "Board not found." });
  }

  const { text, author = "Family" } = req.body;
  if (!text) {
    return res.status(400).json({ detail: "Note text is required." });
  }

  const note = {
    id: "n_" + uuidv4().slice(0, 6),
    text,
    author,
    createdAt: new Date().toISOString()
  };

  board.notes.push(note);
  res.status(201).json(note);
});

export default router;
