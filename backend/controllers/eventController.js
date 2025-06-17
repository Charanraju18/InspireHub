const Event = require("../models/events");
const { User } = require("../models/user");

// POST: Create new event
exports.createEvent = async (req, res) => {
  try {
    const { body, file } = req;

    // Parse schedule and sections first (same as you already do)

    let parsedSchedule = {};
    if (body.schedule) {
      try {
        parsedSchedule = JSON.parse(body.schedule);
      } catch (error) {
        console.error("Error parsing schedule JSON:", error.message);
        return res.status(400).json({ error: "Invalid schedule format" });
      }
    }
    let parsedSections = [];

    if (body.sections) {
      try {
        parsedSections = JSON.parse(body.sections);
      } catch (error) {
        console.error("Error parsing sections JSON:", error.message);
        return res.status(400).json({ error: "Invalid sections format" });
      }
    }
    const base64Image = file
      ? `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      : parsedSchedule.image || null;

    // **Tie the event to a User (instructor)**
    // Here we take it from the body; alternatively from req.user if you have auth
    const createdBy = body.createdBy; // make sure to send this from frontend

    if (!createdBy) {
      return res.status(400).json({ error: "createdBy (User) is required" });
    }
  
    const newEvent = new Event({ 
      title: body.title,
      intro: body.intro,
      joinLink: body.joinLink,
      sections: parsedSections,
      schedule: { 
        ...parsedSchedule, 
        image: base64Image 
      },
      createdBy
    });

    await newEvent.save();

    // Push this event's ID into instructor's profile
    await User.findByIdAndUpdate(
      createdBy,
      { $push: { "instructorProfile.content.liveEventsHosted": newEvent._id } },
      { new: true }
    );

    res.status(201).json({ message: "Event created and added to instructor's profile.", event: newEvent });

  } catch (err) {
    console.error("Error saving event:", err.message);
    res.status(500).json({ error: "Failed to save event" });
  }
};



// GET: All events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};