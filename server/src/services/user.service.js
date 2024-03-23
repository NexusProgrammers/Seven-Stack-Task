import httpStatus from "http-status";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

export const signUpService = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email Not Available");
  }

  const newUser = await User.create(userData);

  const token = generateToken(newUser._id);

  return {
    message: "Sign Up Successfully",
    token,
    user: newUser,
  };
};

export const signInService = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordMatch = await user.matchPassword(userData.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    message: "Sign In Successfully",
    token: token,
    user,
  };
};

export const updateAccountService = async (userId, userData, image) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  Object.assign(user, userData);

  if (image) {
    user.image = image.path;
  }

  await user.save();

  return { message: "Account Updated Successfully", user };
};

export const changePasswordService = async (userId, userData) => {
  const { oldPassword, newPassword } = userData;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await user.matchPassword(oldPassword);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid old password");
  }

  user.password = newPassword;

  await user.save();

  return { message: "Password Change Successfully", user };
};

export const getProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};
