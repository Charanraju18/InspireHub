// const wishlistModel = require("../models/wishlistModel");

// module.exports = {
//   async addRoadmapToWishlist(req, res) {
//     try {
//       const { userId, roadmap } = req.body;
//       if (!userId || !roadmap) return res.status(400).json({ message: "Missing data" });

//       const result = await wishlistModel.addToWishlist(userId, roadmap);
//       res.status(200).json({ message: "Added to wishlist", result });
//     } catch (err) {
//       console.error("Add wishlist error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   async getUserWishlist(req, res) {
//     try {
//       const { userId } = req.body;
//       if (!userId) return res.status(400).json({ message: "User ID (email) required" });

//       const wishlist = await wishlistModel.getWishlist(userId);
//       res.status(200).json({ wishlist: wishlist?.roadmaps || [] });
//     } catch (err) {
//       console.error("Fetch wishlist error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   async removeFromWishlist(req, res) {
//     try {
//       const { userId, roadmapId } = req.body;
//       if (!userId || !roadmapId) return res.status(400).json({ message: "Missing data" });

//       const result = await wishlistModel.removeFromWishlist(userId, roadmapId);
//       res.status(200).json({ message: "Removed from wishlist", result });
//     } catch (err) {
//       console.error("Remove wishlist error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// };










// const wishlistModel = require("../models/wishlistModel");

// module.exports = {
//   async addRoadmapToWishlist(req, res) {
//     try {
//       console.log("🔔 addRoadmapToWishlist called with:", req.body);

//       const { userId, roadmap } = req.body;
//       if (!userId || !roadmap) {
//         console.log("🚫 Missing userId or roadmap", req.body);
//         return res.status(400).json({ message: "Missing data" });
//       }

//       const result = await wishlistModel.addToWishlist(userId, roadmap);
//       console.log("✅ DB add result:", result);

//       res.status(200).json({ message: "Added to wishlist", result });
//     } catch (err) {
//       console.error("❌ Add wishlist error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   async getUserWishlist(req, res) {
//     try {
//       const { userId } = req.body;
//       if (!userId) return res.status(400).json({ message: "User ID (email) required" });

//       const wishlist = await wishlistModel.getWishlist(userId);
//       res.status(200).json({ wishlist: wishlist?.roadmaps || [] });
//     } catch (err) {
//       console.error("❌ Fetch wishlist error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   async removeFromWishlist(req, res) {
//     try {
//       const { userId, roadmapId } = req.body;
//       if (!userId || !roadmapId) return res.status(400).json({ message: "Missing data" });

//       const result = await wishlistModel.removeFromWishlist(userId, roadmapId);
//       res.status(200).json({ message: "Removed from wishlist", result });
//     } catch (err) {
//       console.error("❌ Remove wishlist error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// };





const wishlistModel = require("../models/wishlistModel");

module.exports = {
  // Add a roadmap to the user's wishlist
  async addRoadmapToWishlist(req, res) {
    try {
      console.log("🔔 addRoadmapToWishlist called with:", req.body);

      const { userId, roadmap } = req.body;
      if (!userId || !roadmap) {
        console.log("🚫 Missing userId or roadmap", req.body);
        return res.status(400).json({ message: "Missing data" });
      }

      const result = await wishlistModel.addToWishlist(userId, roadmap);
      console.log("✅ DB add result:", result);

      res.status(200).json({ message: "Added to wishlist", result });
    } catch (err) {
      console.error("❌ Add wishlist error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get the user's wishlist
  async getUserWishlist(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User ID (email) required" });
      }

      const wishlist = await wishlistModel.getWishlist(userId);
      res.status(200).json({ wishlist: wishlist?.roadmaps || [] });
    } catch (err) {
      console.error("❌ Fetch wishlist error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Remove a roadmap from the user's wishlist
  async removeFromWishlist(req, res) {
    try {
      const { userId, roadmapId } = req.body;
      if (!userId || !roadmapId) {
        return res.status(400).json({ message: "Missing data" });
      }

      const result = await wishlistModel.removeFromWishlist(userId, roadmapId);
      res.status(200).json({ message: "Removed from wishlist", result });
    } catch (err) {
      console.error("❌ Remove wishlist error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
};
