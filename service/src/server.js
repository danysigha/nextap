require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");

const app = express();

// Dynamic port setup
const PORT = process.env.PORT || 3200; // Use port from `.env` or fallback to 3200

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow frontend URL from `.env` or fallback to localhost
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json()); // Parse JSON payloads

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("API is working on Vercel!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server for local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

//edited the UI part  
// updated the pwa into the project

// Export the app for Vercel
module.exports = app;
