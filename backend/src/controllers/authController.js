const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id, username) => {
  return jwt.sign(
    { id, username },
    process.env.JWT_SECRET || 'realcnc_super_secret_jwt_ledger_key_2026_lahore',
    { expiresIn: '30d' }
  );
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }

    const trimmedUser = username.trim().toLowerCase();
    const envAdminUser = (process.env.ADMIN_USER || 'admin').toLowerCase();
    const envAdminPass = process.env.ADMIN_PASS || 'realcnc2026!';

    // Check in database first
    let user = await User.findOne({ username: trimmedUser });

    // If database user not found, but matches environment admin credentials
    if (!user && trimmedUser === envAdminUser && password === envAdminPass) {
      // Auto-create in database if possible
      try {
        user = await User.create({
          username: envAdminUser,
          password: envAdminPass,
          role: 'admin'
        });
      } catch (e) {
        // In case DB is in memory or write fails
        const token = generateToken('fallback-admin-id', envAdminUser);
        return res.json({
          success: true,
          token,
          user: {
            username: envAdminUser,
            role: 'admin'
          }
        });
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // Also allow direct env password match if needed
      if (trimmedUser === envAdminUser && password === envAdminPass) {
        // proceed
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }

    const token = generateToken(user._id, user.username);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe
};
