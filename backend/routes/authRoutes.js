const express = require("express");
const router = express.Router();
const {
  login,
  fullSignup,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const {
  getUserProfile,
  getAllInstructors,
  getSelectedInstructor,
  learnerContent,
  updateUserProfile
} = require("../controllers/DetailsController");
const authMiddleware = require("../middleware/authMiddleware");
const { emailVerifyWithOtp } = require("../utils/mailer");

const otpStore = {};

router.post("/login", login);
router.post("/full-signup", fullSignup);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/instructors", authMiddleware, getAllInstructors);
router.get("/instructors/:id", getSelectedInstructor);
router.get("/learner-content", authMiddleware, learnerContent);
router.put("/update-profile", authMiddleware, updateUserProfile);

router.post("/otp-send", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = await emailVerifyWithOtp(email);
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry
    res.status(200).json({ message: "OTP sent to email!" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/otp-verify", async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];
  if (!record) {
    return res.status(400).json({ error: "No OTP sent to this email." });
  }
  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.status(400).json({ error: "OTP expired." });
  }
  if (record.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP." });
  }
  delete otpStore[email];
  res.status(200).json({ message: "OTP verified successfully!" });
});


module.exports = router;