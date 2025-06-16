const express = require("express");
const multer = require("multer");
const Post = require("../models/post");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create post
router.post("/", upload.single("postImage"), async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      profilePicture: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : null,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Update likes
router.put("/:id", async (req, res) => {
  try {
    const { likes } = req.body;

    if (typeof likes !== "number" || likes < 0) {
      return res.status(400).json({ error: "Invalid likes count" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes = likes;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update likes" });
  }
});

module.exports = router;
