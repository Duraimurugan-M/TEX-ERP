import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.userId).populate("role");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "User account is inactive",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};