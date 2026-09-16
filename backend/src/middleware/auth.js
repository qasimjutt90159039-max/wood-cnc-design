const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'realcnc_super_secret_jwt_ledger_key_2026_lahore'
      );
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user && decoded.username === (process.env.ADMIN_USER || 'admin')) {
        req.user = { username: decoded.username, role: 'admin' };
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token verification failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

module.exports = { protect };
