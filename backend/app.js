const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: "https://inspirehub-frontend.onrender.com",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes with error handling
try {
  console.log("Loading eventRoutes...");
  app.use("/api/events", require("./routes/eventRoutes"));

  console.log("Loading authRoutes...");
  app.use("/api/auth", require("./routes/authRoutes"));

  console.log("Loading postRoutes...");
  app.use("/api/posts", require("./routes/postRoutes"));

  console.log("Loading followRoutes...");
  app.use("/api/follow-instructors", require("./routes/followRoutes"));

  console.log("Loading roadmapRoutes...");
  app.use("/api/roadmaps", require("./routes/roadmapRoutes"));

  console.log("Loading nodeMailerRoute...");
  app.use("/api/mail", require("./routes/nodeMailerRoute"));

  console.log("Loading userRoutes...");
  app.use("/api/users", require("./routes/userRoutes"));

  console.log("Loading wishlistRoutes...");
  app.use("/api/wishlist", require("./routes/wishlistRoutes"));

  console.log("Loading controllerRoutes...");
  app.use("/api/contact", require("./routes/controllerRoutes"));

  console.log("Loading reviewsRoute...");
  app.use("/api/reviews", require("./routes/reviewsRoute"));

  console.log("All routes loaded successfully!");
} catch (error) {
  console.error("Error loading routes:", error.message);
  process.exit(1);
}

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "eduall", "build")));

// Catch-all handler for frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "eduall", "build", "index.html"));
});

require("./utils/reminderScheduler");

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});