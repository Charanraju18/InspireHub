const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  profilePicture: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps: [
    {
      stepTitle: { type: String, required: true },
      stepDescription: { type: String, required: true },
    },
  ],
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);


