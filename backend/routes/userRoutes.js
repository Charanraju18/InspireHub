const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  isRegisteredForEvent,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { getInTouchToIns } = require('../utils/mailer')

router.post("/register-event", authMiddleware, registerForEvent);
router.get("/is-registered/:eventId", authMiddleware, isRegisteredForEvent);

router.post("/get-in-touch", async (req, res) => {
  const { toName, toMail, userName, userMsg, userMail, category } = req.body;

  try {
    await getInTouchToIns(toName, toMail, userName, userMsg, userMail, category);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
