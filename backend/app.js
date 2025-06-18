const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyparser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyparser.json({ limit: "10mb" }));
app.use(bodyparser.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
app.use("/api/follow-instructors", require("./routes/followRoutes"));

app.get("/", (req, res) => {
  res.send("Hello from Express and MongoDB!");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
