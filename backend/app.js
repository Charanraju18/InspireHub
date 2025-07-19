const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// 1. Increase backend port to avoid conflict with frontend
const PORT = process.env.PORT || 5000; // Changed from 3000 to 5000

// 2. Enhanced CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000", // Your React app
    // Add other allowed origins as needed
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

// 3. Middleware ordering optimized
app.use(cors(corsOptions)); // CORS first

// Body parsing middleware (express.json is enough, no need for body-parser in Express 4.16+)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. API Routes - moved before static React files
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/follow-instructors", require("./routes/followRoutes"));
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
app.use("/api/mail", require("./routes/nodeMailerRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/contact", require("./routes/controllerRoutes"));
app.use("/api/reviews", require("./routes/reviewsRoute"));

// 5. Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 6. Static files for React app - only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "eduall", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "eduall", "build", "index.html"));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});