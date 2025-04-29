const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');

const protect = async (req, res, next) => {
  console.log('Incoming headers:', req.headers);
  
  // 1. Check for Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  // 2. Extract token
  const token = authHeader.split(' ')[1];
  console.log('Extracted token:', token);

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // 4. Find user
    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }

    // 5. Attach user to request
    req.user = user;
    console.log('Authenticated user:', req.user);
    return next();

  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ 
      message: 'Not authorized',
      error: error.message 
    });
  }
};

const Useradmin = () => {
  return (req, res, next) => {
    console.log('UserAdmin check - Current user:', req.user);
    
    if (!req.user) {
      console.log('No user in request');
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    if (req.user.role === 'UserAdmin') {
      console.log('UserAdmin access granted');
      return next();
    }
    
    console.log('Access denied. Required: UserAdmin, Has:', req.user.role);
    return res.status(403).json({ 
      message: 'Requires UserAdmin privileges',
      yourRole: req.user.role,
      requiredRole: 'UserAdmin'
    });
  };
};



module.exports = { protect, Useradmin };