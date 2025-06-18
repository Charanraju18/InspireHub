const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); 
const {
  followInstructor,
  unfollowInstructor,
  getFollowingInstructors,
  getFollowers,
  checkFollowStatus
} = require("../controllers/followController"); 

router.post("/follow/:instructorId", auth, followInstructor);

router.delete("/unfollow/:instructorId", auth, unfollowInstructor);

router.get("/following", auth, getFollowingInstructors);

router.get("/followers", auth, getFollowers);

router.get("/check-follow/:instructorId", auth, checkFollowStatus);

module.exports = router;