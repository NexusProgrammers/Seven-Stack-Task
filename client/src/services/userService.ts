import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../api/userApi";
import toast from "react-hot-toast";
import {
  CustomError,
  GetProfileResponse,
  SignInFormValues,
  SignInResponse,
  SignUpFormValues,
  SignUpResponse,
  UpdatePasswordFormValues,
  UpdatePasswordResponse,
  UpdateProfileFormValues,
  UpdateProfileResponse,
} from "../types/userTypes";

export interface ErrorResponse {
  message: string;
}

export const signUpUser = createAsyncThunk<
  SignUpResponse,
  SignUpFormValues,
  { rejectValue: ErrorResponse }
>("user/signUp", async (values, { rejectWithValue }) => {
  try {
    const response = await userAPI.post("/signup", values);
    toast.success(response.data.message, {
      duration: 2000,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;
      if (
        customError.response &&
        customError.response.data &&
        customError.response.data.message
      ) {
        toast.error(customError.response.data.message, {
          duration: 2000,
        });
      } else {
        toast.error("An unknown error occurred.", {
          duration: 2000,
        });
      }
      return rejectWithValue({ message: error.message });
    }
  }
});

export const signInUser = createAsyncThunk<
  SignInResponse,
  SignInFormValues,
  { rejectValue: ErrorResponse }
>("user/signIn", async (values, { rejectWithValue }) => {
  try {
    const response = await userAPI.post("/signin", values);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;
      if (
        customError.response &&
        customError.response.data &&
        customError.response.data.message
      ) {
        toast.error(customError.response.data.message, {
          duration: 2000,
        });
      } else {
        toast.error("An unknown error occurred.", {
          duration: 2000,
        });
      }
      return rejectWithValue({ message: "An unknown error occurred." });
    }
  }
});

export const getUserProfile = createAsyncThunk<GetProfileResponse>(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.get("/profile");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        if (
          customError.response &&
          customError.response.data &&
          customError.response.data.message
        ) {
          toast.error(customError.response.data.message, {
            duration: 2000,
          });
        } else {
          toast.error("An unknown error occurred.", {
            duration: 2000,
          });
        }
        return rejectWithValue({ message: "An unknown error occurred." });
      }
    }
  }
);

export const updateProfile = createAsyncThunk<
  UpdateProfileResponse,
  UpdateProfileFormValues,
  { rejectValue: ErrorResponse }
>("user/udpateProfile", async (values, { rejectWithValue }) => {
  try {
    const response = await userAPI.patch("/update/account", values);
    toast.success(response.data.message, {
      duration: 2000,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;
      if (
        customError.response &&
        customError.response.data &&
        customError.response.data.message
      ) {
        toast.error(customError.response.data.message, {
          duration: 2000,
        });
      } else {
        toast.error("An unknown error occurred.", {
          duration: 2000,
        });
      }
      return rejectWithValue({ message: error.message });
    }
  }
});

export const updatePassword = createAsyncThunk<
  UpdatePasswordFormValues,
  UpdatePasswordResponse,
  { rejectValue: ErrorResponse }
>("user/updatePassword", async (values, { rejectWithValue }) => {
  try {
    const response = await userAPI.put("/update/password", values);
    toast.success(response.data.message, {
      duration: 2000,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;
      if (
        customError.response &&
        customError.response.data &&
        customError.response.data.message
      ) {
        toast.error(customError.response.data.message, {
          duration: 2000,
        });
      } else {
        toast.error("An unknown error occurred.", {
          duration: 2000,
        });
      }
      return rejectWithValue({ message: error.message });
    }
  }
});
