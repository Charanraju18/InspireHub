const Roadmap = require("../models/roadmaps");
const { User } = require("../models/user");
// Get all roadmaps
const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch roadmaps", error });
  }
};

// Create a new roadmap
const createRoadmap = async (req, res) => {
  try {
    const newRoadmap = new Roadmap({
      ...req.body,
      duration: Number(req.body.duration),
    });
    await newRoadmap.save();
    await User.findByIdAndUpdate(
      req.body.createdBy,
      { $push: { "instructorProfile.content.roadmapsShared": newRoadmap._id } },
      { new: true }
    );
    res.status(201).json({ message: "Roadmap created and added to instructor's profile.", roadmap: newRoadmap });
  } catch (error) {
    console.error("Error creating roadmap:", error);
    res.status(400).json({ message: "Failed to create roadmap", error: error.message });
  }
};



const getRoadmapById = async (req, res) => {
  // Get roadmap by ID
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllRoadmaps,
  createRoadmap,
  getRoadmapById,
};
