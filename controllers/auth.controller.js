const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require("../validations/authValidation");
const User = require("../models/User");
const { formatJoiErrors } = require("../utils/errorFormatter");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, "your_secret_key");
};

// Register User
async function register(req, res) {
  try {
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).json({
        message: "validation error",
        success: false,
        errors: formatJoiErrors(error),
      });
    }

    const { email, password, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "user",
      username,
    });

    // Generate token
    const token = generateToken(newUser.id);

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
      data: {
        token,
        user: newUser,
      },
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

// Login User
async function login(req, res) {
  try {
    // Validate user input
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "validation error",
        success: false,
        errors: formatJoiErrors(error),
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = generateToken(user.id);

    // Remove password before sending response
    user.password = undefined;

    res.json({
      data: {
        token,
        user,
      },
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: formatJoiErrors(error),
      });
    }

    const { username, email, image } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.update({
      username: username || user.username,
      email: email || user.email,
      image: image || user.image,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "image", "role", "createdAt"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, updateProfile, getProfile };
