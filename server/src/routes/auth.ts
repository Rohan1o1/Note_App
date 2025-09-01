
const express = require("express");
const User = require("../models/User").default;
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../utils/otp");
const { sendOtpEmail } = require("../utils/email");

const router = express.Router();

let otpStore = {}; // Temporary storage

// Step 1: Signup Request OTP
router.post("/signup", async (req, res) => {
  const { name, dob, email } = req.body;
  if (!name || !dob || !email) return res.status(400).json({ message: "All fields required" });

  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    await sendOtpEmail(email, otp);
    return res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Email send error (signup):", err);
    return res.status(500).json({ message: "Failed to send OTP email" });
  }
});

// Step 2: Verify OTP & Create User
router.post("/verify-otp", async (req, res) => {
  console.log("/verify-otp called", req.body);
  const { name, dob, email, otp } = req.body;
  if (otpStore[email] !== otp) {
    console.log("Invalid OTP for email:", email, "Expected:", otpStore[email], "Received:", otp);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, dob, email });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  delete otpStore[email];
  return res.json({ token, user });
});

// Login with OTP
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    await sendOtpEmail(email, otp);
    return res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Email send error (login):", err);
    return res.status(500).json({ message: "Failed to send OTP email" });
  }
});

router.post("/login/verify", async (req, res) => {
  console.log("/login/verify called", req.body);
  const { email, otp } = req.body;
  if (otpStore[email] !== otp) {
    console.log("Invalid OTP for email:", email, "Expected:", otpStore[email], "Received:", otp);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  delete otpStore[email];
  return res.json({ token, user });
});

module.exports = router;
