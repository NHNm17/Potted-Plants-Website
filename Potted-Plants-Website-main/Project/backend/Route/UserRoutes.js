const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/auth');


const { RegisterUser, LoginUser, UserData, UpdateUser } = require("../Controllers/UserControllers");

// @route    POST auth/register
// @desc     Register a user
router.post('/register', RegisterUser);

// @route    POST auth/login
// @desc     Login user
router.post('/login', LoginUser);

// @route    GET auth/user
// @desc     Get user data
router.get('/user', protect, UserData);

router.put('/update', protect, UpdateUser);

router.get('/me', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;