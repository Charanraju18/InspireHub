const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");
const Route = require("./routes/nodeMailerRoute");

const app = express();

connectDB();

const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "eduall", "build")));

  const clientRoutes = ["/", "/about", "/contact"];
  clientRoutes.forEach((route) => {
    app.get(route, (req, res) => {
      res.sendFile(path.join(__dirname, "eduall", "build", "index.html"));
    });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "eduall", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});