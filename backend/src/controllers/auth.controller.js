import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

// 🔐 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


// 🔹 Register User (Admin or Normal User)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Check if role exists
    const roleExists = await Role.findById(role);
    if (!roleExists) {
      return res.status(400).json({
        message: "Invalid role selected"
      });
    }

    // Create user (password auto-hashed in model)
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// 🔹 Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email }).populate("role");

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "User account is inactive"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// get all users by protected route
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.status(200).json({
      users
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};