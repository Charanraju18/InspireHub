const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Client-side routing - Express 5 compatible splat parameter
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "eduall", "build")));

  // Proper Express 5 splat parameter handling
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "eduall", "build", "index.html"), (err) => {
      if (err) {
        res.status(500).send('Error loading the application');
      }
    });
  });
}

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});