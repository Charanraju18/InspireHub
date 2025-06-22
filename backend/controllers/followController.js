const { User } = require("../models/user");
const mongoose = require("mongoose");

const followInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const followerId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid instructor ID",
      });
    }
    if (instructorId === followerId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }
    const instructorToFollow = await User.findById(instructorId);
    if (!instructorToFollow) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    if (instructorToFollow.role !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "You can only follow instructors",
      });
    }
    const follower = await User.findById(followerId);
    if (!follower) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isAlreadyFollowing =
      follower.role === "Learner"
        ? follower.learnerProfile?.followingInstructors?.includes(instructorId)
        : follower.instructorProfile?.followingInstructors?.includes(
            instructorId
          );

    if (isAlreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already following this instructor",
      });
    }
    if (follower.role === "Learner") {
      if (!follower.learnerProfile.followingInstructors) {
        follower.learnerProfile.followingInstructors = [];
      }
      follower.learnerProfile.followingInstructors.push(instructorId);
    } else if (follower.role === "Instructor") {
      if (!follower.instructorProfile.followingInstructors) {
        follower.instructorProfile.followingInstructors = [];
      }
      follower.instructorProfile.followingInstructors.push(instructorId);
    }
    if (!instructorToFollow.instructorProfile.followers) {
      instructorToFollow.instructorProfile.followers = [];
    }
    instructorToFollow.instructorProfile.followers.push(followerId);
    await Promise.all([follower.save(), instructorToFollow.save()]);

    res.status(200).json({
      success: true,
      message: "Successfully followed instructor",
      data: {
        followedInstructor: {
          id: instructorToFollow._id,
          name: instructorToFollow.name,
          email: instructorToFollow.email,
        },
      },
    });
  } catch (error) {
    console.error("Error in followInstructor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const unfollowInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const followerId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid instructor ID",
      });
    }
    const instructorToUnfollow = await User.findById(instructorId);
    if (!instructorToUnfollow) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    const follower = await User.findById(followerId);
    if (!follower) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isCurrentlyFollowing =
      follower.role === "Learner"
        ? follower.learnerProfile?.followingInstructors?.includes(instructorId)
        : follower.instructorProfile?.followingInstructors?.includes(
            instructorId
          );

    if (!isCurrentlyFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are not following this instructor",
      });
    }
    if (follower.role === "Learner") {
      follower.learnerProfile.followingInstructors =
        follower.learnerProfile.followingInstructors.filter(
          (id) => id.toString() !== instructorId
        );
    } else if (follower.role === "Instructor") {
      follower.instructorProfile.followingInstructors =
        follower.instructorProfile.followingInstructors.filter(
          (id) => id.toString() !== instructorId
        );
    }
    instructorToUnfollow.instructorProfile.followers =
      instructorToUnfollow.instructorProfile.followers.filter(
        (id) => id.toString() !== followerId
      );

    await Promise.all([follower.save(), instructorToUnfollow.save()]);

    res.status(200).json({
      success: true,
      message: "Successfully unfollowed instructor",
      data: {
        unfollowedInstructor: {
          id: instructorToUnfollow._id,
          name: instructorToUnfollow.name,
          email: instructorToUnfollow.email,
        },
      },
    });
  } catch (error) {
    console.error("Error in unfollowInstructor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFollowingInstructors = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const populatedUser = await User.findById(userId).populate({
      path:
        user.role === "Learner"
          ? "learnerProfile.followingInstructors"
          : "instructorProfile.followingInstructors",
      select:
        "name email profilePicture instructorProfile.experienceYears instructorProfile.currentRole",
    });

    const followingInstructors =
      user.role === "Learner"
        ? populatedUser.learnerProfile?.followingInstructors || []
        : populatedUser.instructorProfile?.followingInstructors || [];

    res.status(200).json({
      success: true,
      message: "Following instructors retrieved successfully",
      data: {
        followingCount: followingInstructors.length,
        followingInstructors,
      },
    });
  } catch (error) {
    console.error("Error in getFollowingInstructors:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can view their followers",
      });
    }

    const instructorId = req.user._id.toString();

    const instructor = await User.findById(instructorId).populate({
      path: "instructorProfile.followers",
      select: "name email profilePicture role",
    });

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const followers = instructor.instructorProfile?.followers || [];

    res.status(200).json({
      success: true,
      message: "Followers retrieved successfully",
      data: {
        followersCount: followers.length,
        followers,
      },
    });
  } catch (error) {
    console.error("Error in getFollowers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const checkFollowStatus = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid instructor ID",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing =
      user.role === "Learner"
        ? user.learnerProfile?.followingInstructors?.includes(instructorId)
        : user.instructorProfile?.followingInstructors?.includes(instructorId);

    res.status(200).json({
      success: true,
      data: {
        isFollowing: !!isFollowing,
      },
    });
  } catch (error) {
    console.error("Error in checkFollowStatus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  followInstructor,
  unfollowInstructor,
  getFollowingInstructors,
  getFollowers,
  checkFollowStatus,
};
