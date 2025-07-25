const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  intro: { type: String, required: true },
  sections: [
    {
      heading: { type: String, required: true },
      points: [{ type: String, required: true }],
      paragraph: { type: String, required: true },
    },
  ],
  schedule: {
    price: { type: String, required: true },
    instructor: { type: String, required: true },
    image: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    participants: { type: String, required: true },
    location: { type: String, required: true },
  },
  joinLink: { type: String, required: true },
  reminderSent: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = Event;
