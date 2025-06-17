// routes/roadmapRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllRoadmaps,
  createRoadmap,
  getRoadmapById,
} = require("../controllers/roadmapController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all roadmaps
router.get("/", getAllRoadmaps);

// POST create roadmap
router.post("/create", upload.single("thumbnail"), createRoadmap);

// GET roadmap by ID
router.get("/:id", getRoadmapById);

module.exports = router;
