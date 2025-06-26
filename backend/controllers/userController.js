const { User } = require("../models/user");
const { sendRegistrationMail } = require("../utils/mailer");
const Event = require("../models/events");

const isRegisteredForEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    const user = await User.findById(userId);
    const registeredEvents =
      user?.learnerProfile?.followingContent?.registeredEvents || [];

    const isRegistered = registeredEvents.some(
      (event) => event.toString() === eventId
    );
    res.json({ isRegistered });
  } catch (error) {
    console.error("Error checking registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerForEvent = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  try {
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || user.role !== "Learner") {
      return res.status(403).json({ message: "Only learners can register" });
    }

    const registeredEvents =
      user.learnerProfile?.followingContent?.registeredEvents || [];

    if (registeredEvents.includes(eventId)) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    // Initialize nested object if missing
    if (!user.learnerProfile) user.learnerProfile = {};
    if (!user.learnerProfile.followingContent)
      user.learnerProfile.followingContent = {};
    if (!user.learnerProfile.followingContent.registeredEvents) {
      user.learnerProfile.followingContent.registeredEvents = [];
    }

    // Push the eventId
    user.learnerProfile.followingContent.registeredEvents.push(eventId);
    await user.save();

    // Send confirmation email
    if (user.email && event) {
      await sendRegistrationMail(user.email, event.title);
    }

    res.status(200).json({ message: "Successfully registered for the event" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = { registerForEvent, isRegisteredForEvent };
