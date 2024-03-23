import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  getUserProfile,
  signInUser,
  signUpUser,
  updateProfile,
} from "../../services/userService";
import { UserState } from "../../types/userTypes";

const initialState: UserState = {
  user: null,
  token: null,
  signUpLoading: false,
  signUpError: null,
  signInLoading: false,
  signInError: null,
  getProfileLoading: false,
  getProfileError: null,
  updateProfileLoading: false,
  updateProfileError: null,
  updatePasswordLoading: false,
  updatePasswordError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.signUpLoading = true;
        state.signUpError = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = action.payload?.message
          ? action.payload.message
          : "An unknown error occurred.";
      })
      .addCase(signInUser.pending, (state) => {
        state.signInLoading = true;
        state.signInError = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.signInLoading = false;
        state.signInError = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
        });
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInLoading = false;
        state.signInError = action.payload?.message
          ? action.payload.message
          : "An unknown error occurred.";
      })
      .addCase(getUserProfile.pending, (state) => {
        state.getProfileLoading = true;
        state.getProfileError = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.getProfileLoading = false;
        state.getProfileError = null;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.getProfileLoading = false;
        state.getProfileError = action.error.message ?? null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;
        state.updateProfileError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        state.updateProfileError = null;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfileLoading = false;
        state.updateProfileError = action.error.message ?? null;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
