const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email= email.trim().toLowerCase();
     const existingUser = await
   User.findOne({ email });
     if (existingUser) {
        return res.send("User already exists");
     }
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({ message: "Signup successful ✅" });
  } catch (err) {
    res.json({ message: "User already exists ❌" });
  }
});
// 🔹 LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // user find karo
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    // password match (no encryption)
    if (user.password !== password) {
      return res.json({ message: "Wrong password ❌" });
    }

    res.json({ message: "Login successful ✅" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;