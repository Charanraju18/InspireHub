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
      })
      .populate({
        path: "learnerProfile.followingContent.registeredEvents",
        model: "Event"
      });
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user.learnerProfile);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const bcrypt = require("bcryptjs");
const _ = require("lodash");

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = { ...req.body };
    delete updates._id;
    delete updates.email;
    delete updates.phoneNumber;
    delete updates.role;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    if (updates.instructorProfile) {
      _.merge(user.instructorProfile, updates.instructorProfile);
      delete updates.instructorProfile;
    }
    if (updates.learnerProfile) {
      _.merge(user.learnerProfile, updates.learnerProfile);
      delete updates.learnerProfile;
    }
    Object.assign(user, updates);
    const updatedUser = await user.save();
    const userObj = updatedUser.toObject();
    delete userObj.password;
    res.status(200).json(userObj);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
