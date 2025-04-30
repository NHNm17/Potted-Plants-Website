const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register user/admin
const RegisterUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Validate email format first
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email already registered" }); // 409 Conflict
    }

    // Determine role
    let role = "customer";
    if (email.endsWith("@useradmin.com")) {
      role = "UserAdmin"; // Exact case matching
    } else if (email.endsWith("@productadmin.com")) {
      role = "ProductAdmin";
    }else if (email.endsWith("@deliveryadmin.com")) {
      role = "DeliveryAdmin";
      }

    // Create user
    user = new User({
      name,
      email: email.toLowerCase(), // Store lowercase for consistency
      phone,
      password,
      role
    });

    await user.save();

    // JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        email: user.email // Include email for debugging
      }
    };

    // Generate token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) {
          console.error("JWT Error:", err);
          return res.status(500).json({ message: "Error generating token" });
        }
        res.status(201).json({ 
          token, 
          role: user.role,
          email: user.email
        });
      }
    );
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login user
const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email (case insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // Generic message for security
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        email: user.email
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) {
          console.error("JWT Error:", err);
          return res.status(500).json({ message: "Error generating token" });
        }
        res.json({ 
          token, 
          role: user.role,
          email: user.email
        });
      }
    );
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get user data
const UserData = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    });
  } catch (err) {
    console.error("User Data Error:", err.message);
    res.status(500).json({ message: "Server error fetching user data" });
  }
};

const UpdateUser = async (req, res) => {
    try {
        console.log("Authenticated User:", req.user); // Debugging: Check if user is authenticated

        const { name, email, phone } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Ensure req.user.id exists (protect middleware must set this)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User ID missing' });
        }

        // Prepare update fields (avoid setting undefined values)
        const updatedFields = { name, email };
        if (phone !== undefined) updatedFields.phone = phone; // Update phone only if provided

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updatedFields,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
  RegisterUser,
  LoginUser,
  UserData,
  UpdateUser
};