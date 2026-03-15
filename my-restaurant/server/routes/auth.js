const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.json({ message: 'User created', userId: user._id });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.findOneAndUpdate(
      { email },
      { otp, otpExpiry: expiry },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}. Valid for 10 minutes.`
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Send OTP Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });
    await User.findOneAndUpdate({ email }, { otp: null, otpExpiry: null });
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Verify OTP Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});
// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;