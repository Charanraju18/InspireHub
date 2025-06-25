// // models/wishlistModel.js
// const { MongoClient } = require("mongodb");
// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri);
// const dbName = "your_db";
// const collectionName = "wishlists";

// async function getCollection() {
//   await client.connect();
//   return client.db(dbName).collection(collectionName);
// }

// module.exports = {
//   async addToWishlist(userId, roadmap) {
//     const collection = await getCollection();
//     return await collection.updateOne(
//       { userId },
//       { $addToSet: { roadmaps: roadmap } },
//       { upsert: true }
//     );
//   },

//   async getWishlist(userId) {
//     const collection = await getCollection();
//     return await collection.findOne({ userId });
//   }
// };


// const Wishlist = require("./Wishlist"); // Import the Mongoose model

// module.exports = {
//   // ✅ Add roadmap to user's wishlist
//   async addToWishlist(userId, roadmap) {
//     let wishlist = await Wishlist.findOne({ userId });

//     if (!wishlist) {
//       // Create new wishlist if none exists
//       wishlist = new Wishlist({ userId, roadmaps: [roadmap] });
//     } else {
//       // Avoid duplicate entries
//       const alreadyExists = wishlist.roadmaps.some(r => r._id === roadmap._id);
//       if (!alreadyExists) {
//         wishlist.roadmaps.push(roadmap);
//       }
//     }

//     return await wishlist.save();
//   },

//   // ✅ Get wishlist for a user
//   async getWishlist(userId) {
//     return await Wishlist.findOne({ userId });
//   },

//   // ✅ Remove roadmap from user's wishlist
//   async removeFromWishlist(userId, roadmapId) {
//     return await Wishlist.updateOne(
//       { userId },
//       { $pull: { roadmaps: { _id: roadmapId } } }
//     );
//   }
// };


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

        // 🚫 TEMPORARILY DISABLED: Duplicate check (for debugging insert issue)
        // const alreadyExists = wishlist.roadmaps.some(
        //   (r) => r._id.toString() === roadmap._id.toString()
        // );
        // if (!alreadyExists) {
        //   wishlist.roadmaps.push(roadmap);
        // }

        // ✅ Force add roadmap (even if duplicate)
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
  }
};
