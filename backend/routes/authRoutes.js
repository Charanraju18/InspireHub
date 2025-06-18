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
  learnerContent
} = require("../controllers/DetailsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/full-signup", fullSignup);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/instructors", authMiddleware, getAllInstructors);
router.get("/instructors/:id", getSelectedInstructor);
router.get("/learner-content", authMiddleware, learnerContent);


module.exports = router;