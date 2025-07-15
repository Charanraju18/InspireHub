const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const contactRoutes = require("./routes/controllerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000", // your frontend
//     origin: "https://inspirehub-frontend.onrender.com",
//     credentials: true,
//   })
// );

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
// app.use("/api/follow-instructors", require("./routes/followRoutes"));
// <<<<<<< HEAD
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/follow-instructors", require("./routes/followRoutes"));
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
app.use("/api/mail", require("./routes/nodeMailerRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/contact", require("./routes/controllerRoutes"));
app.use("/api/reviews", require("./routes/reviewsRoute"));

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(express.static(path.join(__dirname, "eduall", "build")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "eduall", "build", "index.html"));
});

require("./utils/reminderScheduler");

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
