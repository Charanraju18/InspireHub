const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Instructor", "Learner"], required: true },
    profilePicture: { type: String },
    bio: { type: String, default: "", trim: true },
    phoneNumber: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    socialLinks: {
      linkedin: { type: String, default: "", trim: true },
      github: { type: String, default: "", trim: true },
      twitter: { type: String, default: "", trim: true },
      portfolio: { type: String, default: "", trim: true },
      youtube: { type: String, default: "", trim: true },
    },

    instructorProfile: {
      type: new mongoose.Schema(
        {
          experienceYears: Number,
          currentlyWorkingAt: String,
          currentRole: String,
          previousCompanies: [String],
          instructedDomains: [String],
          techStack: [String],
          content: {
            roadmapsShared: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            liveEventsHosted: [
              { type: mongoose.Schema.Types.ObjectId, ref: "event" },
            ],
          },
          followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
          followingInstructors: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          ],
          awards: [String],
          reviews: [
            {
              reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
              rating: { type: Number, min: 1, max: 5 },
              comment: String,
              createdAt: { type: Date, default: Date.now },
            },
          ],
        },
        { _id: false }
      ),
      required: false,
    },

    learnerProfile: {
      type: new mongoose.Schema(
        {
          currentEducation: String,
          yearOfStudy: String,
          interestedDomains: [String],
          skillLevel: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
          },
          followingContent: {
            roadmaps: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            registeredEvents: [
              { type: mongoose.Schema.Types.ObjectId, ref: "event" },
            ],
          },
          completedContent: {
            roadmaps: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            liveEvents: [
              { type: mongoose.Schema.Types.ObjectId, ref: "event" },
            ],
          },
          learningGoal: String,
          preferredLearningMode: {
            type: String,
            enum: ["Video", "Article", "Project-Based"],
          },
          followingInstructors: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          ],
          badges: [String],
          wishlist: {
            roadmaps: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            liveEvents: [
              { type: mongoose.Schema.Types.ObjectId, ref: "event" },
            ],
          },
        },
        { _id: false }
      ),
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
