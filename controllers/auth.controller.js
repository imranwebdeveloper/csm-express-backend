const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, "your_secret_key", { expiresIn: "1h" }); // Change to env variable
};

// Register User
async function register(req, res) {
  try {
    // Validate user input
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { name, email, password } = req.body;

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
      name,
      email,
      password: hashedPassword,
      role: "user",
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
        message: error.details[0].message,
        success: false,
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

module.exports = { register, login };
