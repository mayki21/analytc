const express = require("express");
const router = express.Router();
const User = require("../model/user");
require('dotenv').config();
let jwt = require("jsonwebtoken");

// POST route to register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, userType } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password, phoneNumber, userType });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the passwords match
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If everything is okay, user is authenticated
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    
    // Return token to the client
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
