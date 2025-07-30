import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    if (!req.headers.authorization) {
      console.error("Authorization header missing in request");
      return res.status(401).json({ error: "No token provided" });
    }
    console.log("Token Received in Request:", req.headers.authorization);
    console.log("JWT_SECRET in Middleware:", process.env.JWT_SECRET);
    
    const token = req.headers.authorization.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Admin Middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "Admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
