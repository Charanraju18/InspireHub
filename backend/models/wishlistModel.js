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


const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "your_db";
const collectionName = "wishlists";

async function getCollection() {
  await client.connect();
  return client.db(dbName).collection(collectionName);
}

module.exports = {
  async addToWishlist(userId, roadmap) {
    const collection = await getCollection();
    return await collection.updateOne(
      { userId },
      { $addToSet: { roadmaps: roadmap } },
      { upsert: true }
    );
  },

  async getWishlist(userId) {
    const collection = await getCollection();
    return await collection.findOne({ userId });
  },

  async removeFromWishlist(userId, roadmapId) {
    const collection = await getCollection();
    return await collection.updateOne(
      { userId },
      { $pull: { roadmaps: { _id: roadmapId } } }
    );
  }
};
