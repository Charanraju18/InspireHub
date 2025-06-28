const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    roadmapId: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
