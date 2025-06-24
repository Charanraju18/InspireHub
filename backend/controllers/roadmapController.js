const Roadmap = require("../models/roadmaps");
const { User } = require("../models/user");

// ✅ Get all roadmaps with instructor details
const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find()
      .populate({
        path: 'createdBy',
        model: 'User',
        select: 'name email profilePicture instructorProfile city state country'
      })
      .sort({ createdAt: -1 });
    
    res.status(200).json(roadmaps);
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    res.status(500).json({ message: "Failed to fetch roadmaps", error: error.message });
  }
};

// ✅ COMPLETELY FIXED: Search roadmaps
const searchRoadmaps = async (req, res) => {
  try {
    console.log("🔍 Search request received:", req.query);
    
    const { domain, techstack, difficulty, search } = req.query;
    let filter = {};

    // ✅ Exact domain match (case insensitive)
    if (domain && domain.trim() !== '' && domain !== 'All Categories') {
      filter.domain = domain.trim();
      console.log("🎯 Filtering by domain:", domain.trim());
    }
    
    // ✅ Difficulty filter
    if (difficulty && difficulty.trim() !== '') {
      filter.difficulty = difficulty.trim();
      console.log("📊 Filtering by difficulty:", difficulty.trim());
    }
    
    // ✅ Tech stack filter
    if (techstack && techstack.trim() !== '') {
      filter.techstack = { $in: [new RegExp(techstack.trim(), 'i')] };
      console.log("🛠️ Filtering by techstack:", techstack.trim());
    }
    
    // ✅ Text search
    if (search && search.trim() !== '') {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { tags: { $elemMatch: { $regex: search.trim(), $options: 'i' } } }
      ];
      console.log("🔍 Text search for:", search.trim());
    }

    console.log("📋 Final filter object:", JSON.stringify(filter, null, 2));

    const roadmaps = await Roadmap.find(filter)
      .populate({
        path: 'createdBy',
        model: 'User',
        select: 'name email profilePicture instructorProfile city state country'
      })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${roadmaps.length} roadmaps`);
    res.status(200).json(roadmaps);

  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ 
      message: "Search failed", 
      error: error.message,
      details: "Check server logs for more information"
    });
  }
};

// ✅ FIXED: Get unique domains
const getUniqueDomains = async (req, res) => {
  try {
    console.log("🌐 Fetching unique domains...");
    
    const domains = await Roadmap.distinct('domain');
    console.log("✅ Found domains:", domains);
    
    // ✅ Ensure we return an array
    const validDomains = Array.isArray(domains) ? domains : [];
    
    res.status(200).json(validDomains);
  } catch (error) {
    console.error("❌ Error fetching domains:", error);
    // ✅ Return empty array on error instead of crashing
    res.status(200).json([]); 
  }
};

// ✅ Enhanced create roadmap
const createRoadmap = async (req, res) => {
  try {
    const isAuthenticated = req.user && req.user.id;
    const createdBy = req.body.createdBy;

    if (!createdBy) {
      return res.status(400).json({ 
        message: "createdBy field is required" 
      });
    }

    if (isAuthenticated && req.user.id !== createdBy) {
      return res.status(403).json({ 
        message: "You can only create roadmaps for yourself" 
      });
    }

    const newRoadmap = new Roadmap({
      ...req.body,
      duration: Number(req.body.duration),
    });
    
    await newRoadmap.save();

    try {
      await User.findByIdAndUpdate(
        createdBy,
        { $push: { "instructorProfile.content.roadmapsShared": newRoadmap._id } },
        { new: true }
      );
    } catch (userUpdateError) {
      console.warn("Could not update user profile:", userUpdateError.message);
    }

    const populatedRoadmap = await Roadmap.findById(newRoadmap._id)
      .populate({
        path: 'createdBy',
        model: 'User',
        select: 'name email profilePicture instructorProfile city state country'
      });

    res.status(201).json({ 
      message: "Roadmap created successfully.", 
      roadmap: populatedRoadmap 
    });
  } catch (error) {
    console.error("Error creating roadmap:", error);
    res.status(400).json({ 
      message: "Failed to create roadmap", 
      error: error.message 
    });
  }
};

// ✅ Get roadmap by ID
const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
      .populate({
        path: 'createdBy',
        model: 'User',
        select: 'name email profilePicture instructorProfile bio city state country'
      });
      
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.json(roadmap);
  } catch (err) {
    console.error("Error fetching roadmap:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete roadmap (requires auth)
const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    if (roadmap.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this roadmap" });
    }

    await Roadmap.findByIdAndDelete(id);

    await User.findByIdAndUpdate(
      userId,
      { $pull: { "instructorProfile.content.roadmapsShared": id } },
      { new: true }
    );

    res.status(200).json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    console.error("Error deleting roadmap:", error);
    res.status(500).json({ message: "Failed to delete roadmap", error: error.message });
  }
};

// ✅ Add step to roadmap (requires auth)
const addStepToRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const { step } = req.body;
    const userId = req.user.id;

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    if (roadmap.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to modify this roadmap" });
    }

    if (!step.title || !step.description) {
      return res.status(400).json({ message: "Step title and description are required" });
    }

    if (!step.resources || step.resources.length === 0) {
      step.resources = [{ title: "", link: "", type: "video" }];
    }

    roadmap.steps.push(step);
    await roadmap.save();

    res.status(200).json({ 
      message: "Step added successfully", 
      roadmap: roadmap 
    });
  } catch (error) {
    console.error("Error adding step to roadmap:", error);
    res.status(500).json({ message: "Failed to add step", error: error.message });
  }
};

// ✅ Update roadmap (requires auth)
const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    if (roadmap.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this roadmap" });
    }

    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      id,
      { ...updateData, duration: Number(updateData.duration) },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      message: "Roadmap updated successfully", 
      roadmap: updatedRoadmap 
    });
  } catch (error) {
    console.error("Error updating roadmap:", error);
    res.status(500).json({ message: "Failed to update roadmap", error: error.message });
  }
};

// ✅ Get roadmaps by user (requires auth)
const getRoadmapsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const roadmaps = await Roadmap.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.status(200).json(roadmaps);
  } catch (error) {
    console.error("Error fetching user roadmaps:", error);
    res.status(500).json({ message: "Failed to fetch roadmaps", error: error.message });
  }
};

const followRoadmap = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.user.id;
    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }
    if (roadmap.followers.includes(userId)) {
      return res.status(400).json({ success: false, message: "Already following this roadmap" });
    }
    roadmap.followers.push(userId);
    await roadmap.save();
    const user = await User.findById(userId);
    if (user && user.role === "Learner") {
      if (!user.learnerProfile.followingContent) {
        user.learnerProfile.followingContent = { roadmaps: [] };
      }
      if (!user.learnerProfile.followingContent.roadmaps) {
        user.learnerProfile.followingContent.roadmaps = [];
      }
      if (!user.learnerProfile.followingContent.roadmaps.map(r=>r.toString()).includes(id)) {
        user.learnerProfile.followingContent.roadmaps.push(id);
        await user.save();
      }
    }
    res.status(200).json({ success: true, message: "Followed roadmap successfully" });
  } catch (error) {
    console.error("Error following roadmap:", error);
    res.status(500).json({ success: false, message: "Failed to follow roadmap" });
  }
};

const unfollowRoadmap = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.user.id;
    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }
    if (!roadmap.followers.includes(userId)) {
      return res.status(400).json({ success: false, message: "You are not following this roadmap" });
    }
    roadmap.followers = roadmap.followers.filter(f => f.toString() !== userId);
    await roadmap.save();
    const user = await User.findById(userId);
    if (user && user.role === "Learner" && user.learnerProfile.followingContent && user.learnerProfile.followingContent.roadmaps) {
      user.learnerProfile.followingContent.roadmaps = user.learnerProfile.followingContent.roadmaps.filter(rid => rid.toString() !== id);
      await user.save();
    }
    res.status(200).json({ success: true, message: "Unfollowed roadmap successfully" });
  } catch (error) {
    console.error("Error unfollowing roadmap:", error);
    res.status(500).json({ success: false, message: "Failed to unfollow roadmap" });
  }
};

module.exports = {
  getAllRoadmaps,
  createRoadmap,
  getRoadmapById,
  searchRoadmaps,      // ✅ FIXED
  getUniqueDomains,    // ✅ FIXED  
  deleteRoadmap,        
  addStepToRoadmap,     
  updateRoadmap,        
  getRoadmapsByUser,    
  followRoadmap,
  unfollowRoadmap,
};