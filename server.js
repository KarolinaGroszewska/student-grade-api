import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/students.js"; 
import authRoutes from "./routes/auth.js";
import { authenticationToken } from "./middleware/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Helper Functions ---

// Validate student ID
export function isValidStudentId(id) {
  const regex = /^S2025\d{4}$/;
  return regex.test(id);
}

// --- Routes ---

app.get("/", (req, res) => {
  res.send("Welcome to the Student Grade API!");
});

app.use("/auth", authRoutes);


app.use("/students", authenticationToken, studentRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
