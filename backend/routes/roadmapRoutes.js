const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllRoadmaps,
  createRoadmap,
  getRoadmapById,
  searchRoadmaps,
  getUniqueDomains,
  deleteRoadmap,
  addStepToRoadmap,
  updateRoadmap,
  getRoadmapsByUser,
  followRoadmap,
  unfollowRoadmap,
} = require("../controllers/roadmapController");

// ✅ Public routes - IMPORTANT: Order matters! More specific routes first
router.get("/search", searchRoadmaps); // ✅ Must come before /:id
router.get("/domains", getUniqueDomains); // ✅ New - get unique domains
router.get("/user/my-roadmaps", authMiddleware, getRoadmapsByUser); // ✅ MOVED: Must come before /:id
router.get("/", getAllRoadmaps);
router.get("/:id", getRoadmapById); // ✅ Must come after specific routes

// Protected routes (require authentication)
router.post("/create", authMiddleware, createRoadmap);
router.delete("/:id", authMiddleware, deleteRoadmap);
router.put("/:id/add-step", authMiddleware, addStepToRoadmap);
router.put("/:id", authMiddleware, updateRoadmap);
router.post("/:id/follow", authMiddleware, followRoadmap);
router.post("/:id/unfollow", authMiddleware, unfollowRoadmap);

module.exports = router;