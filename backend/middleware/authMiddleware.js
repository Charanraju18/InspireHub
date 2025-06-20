const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Full Authorization header:", authHeader);
  
  const token = authHeader?.split(" ")[1];
  console.log("Extracted token:", token);
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
  
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log("JWT verification error:", err.message);
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;