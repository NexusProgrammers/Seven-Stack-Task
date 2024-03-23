import expressAsyncHandler from "express-async-handler";
import httpStatus from "http-status";
import {
  changePasswordService,
  getProfileService,
  signInService,
  signUpService,
  updateAccountService,
} from "../services/user.service.js";

export const signUp = expressAsyncHandler(async (req, res) => {
  try {
    const userData = req.body;
    const user = await signUpService(userData);
    return res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const signIn = expressAsyncHandler(async (req, res) => {
  try {
    const userData = req.body;
    const user = await signInService(userData);
    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const updateAccount = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = req.body;
    const image = req.file;
    const updatedUser = await updateAccountService(userId, userData, image);
    return res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const changePassword = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = req.body;
    const result = await changePasswordService(userId, userData);
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const getProfile = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await getProfileService(userId);
    return res.status(httpStatus.OK).json(profile);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});
