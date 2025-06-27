const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', authMiddleware, async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const contact = new Contact({
            name,
            email,
            phone,
            message,
            userId: req.user.id, // Add userId to the contact data
        });

        await contact.save();
        res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get("/", async (req, res) => {
  try {
    // Use populate to fetch user details based on userId
    const contacts = await Contact.find().populate("userId", "profilePicture name role");
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});



module.exports = router;
