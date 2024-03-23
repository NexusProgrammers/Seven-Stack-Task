import expressAsyncHandler from "express-async-handler";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Bearer token is required");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Token has been expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
    }
    throw new Error(httpStatus.UNAUTHORIZED, "Invalid or expired token");
  }
});

export default authMiddleware;
