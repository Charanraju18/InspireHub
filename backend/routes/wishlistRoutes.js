// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// POST - Add roadmap to wishlist
router.post("/add", wishlistController.addRoadmapToWishlist);

// GET - Fetch wishlist by userId
router.post("/get", wishlistController.getUserWishlist);

// Remove from wishlist
router.post("/remove", wishlistController.removeFromWishlist);

// ✅ Export router
module.exports = router;


// router.post("/add", wishlistController.addRoadmapToWishlist);
// router.post("/get", wishlistController.getUserWishlist);
// router.post("/remove", wishlistController.removeFromWishlist);
