import { Router } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otp";

const router = Router();

let otpStore: Record<string, string> = {}; // Temporary storage

// Step 1: Signup Request OTP
router.post("/signup", async (req, res) => {
  const { name, dob, email } = req.body;
  if (!name || !dob || !email) return res.status(400).json({ message: "All fields required" });

  const otp = generateOTP();
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // In real-world, send email
  return res.json({ message: "OTP sent to email" });
});

// Step 2: Verify OTP & Create User
router.post("/verify-otp", async (req, res) => {
  const { name, dob, email, otp } = req.body;
  if (otpStore[email] !== otp) return res.status(400).json({ message: "Invalid OTP" });

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, dob, email });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
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

  console.log(`OTP for login ${email}: ${otp}`);
  return res.json({ message: "OTP sent" });
});

router.post("/login/verify", async (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] !== otp) return res.status(400).json({ message: "Invalid OTP" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
  delete otpStore[email];
  return res.json({ token, user });
});

export default router;
