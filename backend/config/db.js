// const mongoose = require("mongoose");

// const connectDB = async () => {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then((conn) => {
//       console.log(`Connected to MongoDB: ${conn.connection.name}`);
//     })
//     .catch((err) => console.error("MongoDB connection error:", err));
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected via Mongoose");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;


