const Wishlist = require("./Wishlist"); // Import the Mongoose model

module.exports = {
  // ✅ Add roadmap to user's wishlist
  async addToWishlist(userId, roadmap) {
    try {
      let wishlist = await Wishlist.findOne({ userId });

      if (!wishlist) {
        console.log("🆕 Creating new wishlist for user:", userId);
        wishlist = new Wishlist({ userId, roadmaps: [roadmap] });
      } else {
        console.log("📌 Existing wishlist found for user:", userId);

        wishlist.roadmaps.push(roadmap);
        console.log("➕ Roadmap added to wishlist:", roadmap.title);
      }

      const saved = await wishlist.save();
      console.log("✅ Wishlist saved to DB for:", userId);
      return saved;
    } catch (err) {
      console.error("❌ Error saving wishlist:", err);
      throw err;
    }
  },

  // ✅ Get wishlist for a user
  async getWishlist(userId) {
    try {
      const data = await Wishlist.findOne({ userId });
      console.log("📤 Fetched wishlist for:", userId);
      return data;
    } catch (err) {
      console.error("❌ Error fetching wishlist:", err);
      throw err;
    }
  },

  // ✅ Remove roadmap from user's wishlist
  async removeFromWishlist(userId, roadmapId) {
    try {
      const result = await Wishlist.updateOne(
        { userId },
        { $pull: { roadmaps: { _id: roadmapId } } }
      );
      console.log("❌ Removed roadmap from wishlist:", roadmapId);
      return result;
    } catch (err) {
      console.error("❌ Error removing from wishlist:", err);
      throw err;
    }
  },
};
