import bcrypt from "bcrypt";
import { User } from "../models/user.js"; // Correct path
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Signup
async function signup(req, res) {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Hash the password
    const saltRounds = process.env.SALT_ROUNDS || 10;
    const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

    // Create the user
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully.",
      user: { email: newUser.email },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Login

// Login function
/*
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token will expire in 1 hour
    );

    res.json({
      message: "User logged in successfully.",
      token, // Send the token back to the client
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
*/

// Login function
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token will expire in 1 hour
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // This makes the cookie accessible only via HTTP requests, not JavaScript
      secure: process.env.NODE_ENV === "production", // Only set the cookie over HTTPS in production
      maxAge: 3600 * 1000, // Cookie will expire in 1 hour
      sameSite: "Strict", // Helps protect against CSRF attacks
    });

    res.json({ message: "User logged in successfully." });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Logout
function logout(req, res) {
  // Example: Clear session or token (depending on your authentication strategy)
  res.json({ message: "User logged out successfully. Token invalidated." });
}

export { signup, login, logout };