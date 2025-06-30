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

// TEMPORARY: Load routes one by one to find the problematic one
// Comment out all routes first, then uncomment them one by one

// console.log("Loading eventRoutes...");
// app.use("/api/events", require("./routes/eventRoutes"));
// console.log("✓ eventRoutes loaded successfully");

// STOP HERE FIRST - test if the error still occurs
// If no error, uncomment the next route and test again

console.log("Loading authRoutes...");
app.use("/api/auth", require("./routes/authRoutes"));
console.log("✓ authRoutes loaded successfully");

/*
console.log("Loading postRoutes...");
app.use("/api/posts", require("./routes/postRoutes"));
console.log("✓ postRoutes loaded successfully");

console.log("Loading followRoutes...");
app.use("/api/follow-instructors", require("./routes/followRoutes"));
console.log("✓ followRoutes loaded successfully");

console.log("Loading roadmapRoutes...");
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
console.log("✓ roadmapRoutes loaded successfully");

console.log("Loading nodeMailerRoute...");
app.use("/api/mail", require("./routes/nodeMailerRoute"));
console.log("✓ nodeMailerRoute loaded successfully");

console.log("Loading userRoutes...");
app.use("/api/users", require("./routes/userRoutes"));
console.log("✓ userRoutes loaded successfully");

console.log("Loading wishlistRoutes...");
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
console.log("✓ wishlistRoutes loaded successfully");

console.log("Loading controllerRoutes...");
app.use("/api/contact", require("./routes/controllerRoutes"));
console.log("✓ controllerRoutes loaded successfully");

console.log("Loading reviewsRoute...");
app.use("/api/reviews", require("./routes/reviewsRoute"));
console.log("✓ reviewsRoute loaded successfully");
*/

console.log("All routes loaded successfully!");

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// API 404 handler
app.use("/api/*", (req, res) => {
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