// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
// connectDB();

// app.use(
//   cors({
//     origin: "https://inspirehub-frontend.onrender.com",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// // Routes
// app.use("/api/events", require("./routes/eventRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// // <<<<<<< HEAD
// app.use("/api/posts", require("./routes/postRoutes"));

// // Root Route
// // =======
// app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
// app.use("/api/follow-instructors", require("./routes/followRoutes"));

// // >>>>>>> main
// app.get("/", (req, res) => {
//   res.send("Hello from Express and MongoDB!");
// });

// // Error Handler Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// -----------------------------------
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

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// <<<<<<< HEAD
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/follow-instructors", require("./routes/followRoutes"));

// Root Route
// =======
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
app.use("/api/mail", require("./routes/nodeMailerRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use('/api/contact', require("./routes/controllerRoutes"));
app.use("/api/reviews", require("./routes/reviewsRoute"));

// >>>>>>> main
app.get("/", (req, res) => {
  res.send("Hello from Express and MongoDB!");
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

require("./utils/reminderScheduler");

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
