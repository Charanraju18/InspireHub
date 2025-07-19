const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../utils/mailer");

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Trim input to avoid trailing spaces causing mismatch
    email = email.trim();
    password = password.trim();

    const user = await User.findOne({ email });
    console.log("🔍 DB lookup user:", user);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials: no user found" });
    }
    console.log("Password from request (trimmed):", password); // Add this
    console.log("Hashed password from DB:", user.password); // Add this
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials: password mismatch" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("❌ Login server error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Full Signup
exports.fullSignup = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      gender,
      role,
      bio,
      profilePicture,
      socialLinks,
      phoneNumber,
      location,
      instructorProfile,
      learnerProfile,
    } = req.body;

    // Trim email and password for safety
    email = email.trim();
    password = password.trim();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    let profilePictureUrl = "";
    if (profilePicture && profilePicture.startsWith("data:image")) {
      profilePictureUrl = profilePicture;
    }

    const userData = {
      name,
      email,
      password,
      gender,
      role,
      bio,
      profilePicture: profilePictureUrl,
      socialLinks,
      phoneNumber,
      location,
    };

    if (role === "Instructor") {
      userData.instructorProfile = instructorProfile;
    } else if (role === "Learner") {
      userData.learnerProfile = learnerProfile;
    }

    const newUser = new User(userData);
    await newUser.save();

    await sendWelcomeEmail(newUser.email, newUser.name, newUser.role);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        role: newUser.role,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const resetLink = `https://inspirehub-frontend.onrender.com/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `<${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword)
      return res.status(400).json({ message: "New password is required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};
