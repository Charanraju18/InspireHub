const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  isRegisteredForEvent,
} = require("../controllers/userController"); // ✅ Ensure this path is correct
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Common mistake: this must be the function, not an object

router.post("/register-event", authMiddleware, registerForEvent);
router.get("/is-registered/:eventId", authMiddleware, isRegisteredForEvent);

module.exports = router;
