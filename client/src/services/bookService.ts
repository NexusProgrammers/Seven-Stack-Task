import { createAsyncThunk } from "@reduxjs/toolkit";
import bookAPI from "../api/bookApi";
import { CustomError } from "../types/userTypes";
import toast from "react-hot-toast";
import {
  AddBookFormValues,
  AddBookResponse,
  Book,
  BookState,
  UpdateBookFormValues,
  updateBookResponse,
} from "../types/bookTypes";

export interface ErrorResponse {
  message: string;
}

export const addBook = createAsyncThunk<
  AddBookResponse,
  AddBookFormValues,
  { rejectValue: ErrorResponse }
>("book/addBook", async (values, { rejectWithValue }) => {
  try {
    const response = await bookAPI.post("/add", values);
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

export const getBooks = createAsyncThunk<
  BookState["books"],
  void,
  { rejectValue: ErrorResponse }
>("book/getBooks", async (_, { rejectWithValue }) => {
  try {
    const response = await bookAPI.get("/get-all");
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

export const getBook = createAsyncThunk<
  Book,
  string,
  { rejectValue: ErrorResponse }
>("book/getBook", async (id, { rejectWithValue }) => {
  try {
    const response = await bookAPI.get(`/get-one/${id}`);
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

export const updateBook = createAsyncThunk<
  updateBookResponse,
  { id: string; values: UpdateBookFormValues },
  { rejectValue: ErrorResponse }
>("user/updateBook", async ({ id, values }, { rejectWithValue }) => {
  try {
    const response = await bookAPI.patch(`/update/${id}`, values);
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

export const deleteBook = createAsyncThunk<
  void,
  string,
  { rejectValue: ErrorResponse }
>("book/deleteBook", async (id, { rejectWithValue }) => {
  try {
    const response = await bookAPI.delete(`/delete/${id}`);
    toast.success(response.data.message, {
      duration: 2000,
    });
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
