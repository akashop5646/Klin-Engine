import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import apiRouter from "./api/routes/index.js";

// Fix DNS resolution issues on Windows for MongoDB Atlas SRV records
dns.setDefaultResultOrder("ipv4first");

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes Router
app.use("/api", apiRouter);

// DB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/klin";
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Bootstrap Express Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
