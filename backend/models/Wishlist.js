const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  thumbnail: String,
});

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  roadmaps: [RoadmapSchema],
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
