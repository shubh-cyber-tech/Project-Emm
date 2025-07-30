const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/emailService');

// In-memory OTP store (for demo; use Redis or DB for production)
const otpStore = {};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Step 1: User submits email and password, receives OTP
exports.login = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // If OTP not provided, generate and send
        if (!otp) {
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            otpStore[email] = generatedOtp;
            await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${generatedOtp}`);
            return res.status(200).json({ message: 'OTP sent to your email' });
        }

        // If OTP provided, verify
        if (otpStore[email] !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
        delete otpStore[email];
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Send welcome email
        await sendEmail(email, 'Welcome!', `Welcome back, ${user.name}! You have successfully logged in.`);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}; 