const express = require('express');
const router = express.Router();
const { protect, Useradmin } = require('../Middleware/auth');
const User = require('../Model/UserModel');

// @route    GET /api/admin/users
// @desc     Get all users (paginated)
router.get('/users', protect, Useradmin(), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .select('-password -__v')
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error('GET /users error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route    DELETE /auth/admin/users/:id
// @desc     Delete a user
router.delete('/users/:id', protect, Useradmin(), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error('DELETE /users error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;