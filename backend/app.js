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

// Helper function to safely load routes
function loadRoute(routePath, mountPath, routeName) {
  try {
    console.log(`Loading ${routeName}...`);
    const router = require(routePath);
    app.use(mountPath, router);
    console.log(`✓ ${routeName} loaded successfully`);
  } catch (error) {
    console.error(`❌ Error in ${routeName}:`, error.message);
    console.error(`Full error stack:`, error.stack);
    process.exit(1);
  }
}

// Load routes with better error handling
loadRoute("./routes/eventRoutes", "/api/events", "eventRoutes");
loadRoute("./routes/authRoutes", "/api/auth", "authRoutes");
loadRoute("./routes/postRoutes", "/api/posts", "postRoutes");
loadRoute("./routes/followRoutes", "/api/follow-instructors", "followRoutes");
loadRoute("./routes/roadmapRoutes", "/api/roadmaps", "roadmapRoutes");
loadRoute("./routes/nodeMailerRoute", "/api/mail", "nodeMailerRoute");
loadRoute("./routes/userRoutes", "/api/users", "userRoutes");
loadRoute("./routes/wishlistRoutes", "/api/wishlist", "wishlistRoutes");
loadRoute("./routes/controllerRoutes", "/api/contact", "controllerRoutes");
loadRoute("./routes/reviewsRoute", "/api/reviews", "reviewsRoute");

console.log("All routes loaded successfully!");

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log("getting error here in 1");
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Simple test route
app.get("/", (req, res) => {
  console.log("getting error here in 2");
  res.json({ message: "Backend is working!" });
});

// API 404 handler
app.use("/api/*", (req, res) => {
  console.log("getting error here in 3");
  res.status(404).json({ error: "API endpoint not found" });
});

console.log("About to load reminderScheduler...");
try {
  require("./utils/reminderScheduler");
  console.log("✓ reminderScheduler loaded successfully");
} catch (error) {
  console.error("❌ Error in reminderScheduler:", error.message);
  process.exit(1);
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});