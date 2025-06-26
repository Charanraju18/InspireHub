  const express = require("express");
  const router = express.Router();
  const Review = require("../models/Review");
  const authMiddleware = require("../middleware/authMiddleware");

  // POST review
  router.post("/:roadmapId", authMiddleware, async (req, res) => {
    const { text } = req.body;
    const review = new Review({
      roadmapId: req.params.roadmapId,
      user: req.user._id,
      text,
    });
    await review.save();
    const populated = await review.populate("user", "name profilePicture");
    res.status(201).json(populated);
  });

  // GET all reviews for a roadmap
  router.get("/:roadmapId", async (req, res) => {
    const reviews = await Review.find({ roadmapId: req.params.roadmapId })
      .populate("user", "name profilePicture")
      .populate("replies.user", "name profilePicture")
      .sort({ createdAt: -1 });
    res.json(reviews);
  });

  // POST reply
  router.post("/reply/:reviewId", authMiddleware, async (req, res) => {
    const { text } = req.body;
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.replies.push({ user: req.user._id, text });
    await review.save();
    const updated = await Review.findById(review._id).populate(
      "replies.user",
      "name profilePicture"
    );
    res.status(200).json(updated.replies[updated.replies.length - 1]);
  });

  module.exports = router;
