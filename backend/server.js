import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import vendorRoutes from "./routes/vendors.js";
import weddingRoutes from "./routes/wedding.js";
import bookingRoutes from "./routes/bookings.js";
import boardRoutes from "./routes/boards.js";
import guestRoutes from "./routes/guests.js";
import aiRoutes from "./routes/ai.js";
import featureRoutes from "./routes/features.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/smart_shaadi_db";

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Attempt MongoDB connection, but gracefully continue with in-memory persistence if offline
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => console.log("✨ [MongoDB] Connected successfully to:", MONGODB_URI))
  .catch((err) => {
    console.warn("⚠️ [MongoDB] Local Mongo not detected, switching to High-Speed In-Memory Data Store (Zero setup required!).", err.message);
  });

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Smart Shaadi & SmartEvent Karo MERN Backend",
    version: "2.0.0",
    time: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/wedding", weddingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", featureRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error", detail: err.message });
});

app.listen(PORT, () => {
  console.log(`🏰 [Smart Shaadi Backend] Royal wedding server live on http://localhost:${PORT}`);
});
