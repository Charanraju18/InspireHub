const { User } = require("../models/user");
const Roadmap = require("../models/roadmaps");
const Event = require("../models/events");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "instructorProfile.content.roadmapsShared",
        model: "Roadmap"
      })
      .populate({
        path: "instructorProfile.content.liveEventsHosted",
        model: "Event"
      });
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const loggedInId = req.user.id;
    const instructors = await User.find({
      role: "Instructor",
      _id: { $ne: loggedInId }
    });
    if (!instructors || instructors.length === 0) {
      return res.status(404).json({ msg: "No instructors found" });
    }
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getSelectedInstructor = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await User.findOne({ _id: id, role: "Instructor" })
      .populate({
        path: "instructorProfile.content.roadmapsShared",
        model: "Roadmap"
      })
      .populate({
        path: "instructorProfile.content.liveEventsHosted",
        model: "Event"
      });
    if (!instructor) {
      return res.status(404).json({ msg: "Instructor not found" });
    }
    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.learnerContent = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("learnerProfile")
      .populate({
        path: "learnerProfile.followingContent.roadmaps",
        model: "Roadmap"
      })
      .populate({
        path: "learnerProfile.completedContent.roadmaps",
        model: "Roadmap"
      })
      .populate({
        path: "learnerProfile.completedContent.liveEvents",
        model: "Event"
      });
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user.learnerProfile);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

