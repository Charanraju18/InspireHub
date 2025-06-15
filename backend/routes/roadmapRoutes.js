// routes/roadmapRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllRoadmaps,
  createRoadmap,
  getRoadmapById,
} = require("../controllers/roadmapController");

// GET all roadmaps
router.get("/", getAllRoadmaps);

// POST create roadmap
router.post("/create", createRoadmap);

// GET roadmap by ID
router.get("/:id", getRoadmapById);

module.exports = router;
