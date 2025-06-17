const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "article", "book", "course"], required: true },
    link: { type: String, required: true }
});

const StepSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    resources: { type: [ResourceSchema], default: [] }
});

const RoadmapSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    domain: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: { type: Number, required: true },
    thumbnail: { type: String },
    prerequisites: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    steps: { type: [StepSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model("Roadmap", RoadmapSchema);

module.exports = Roadmap;