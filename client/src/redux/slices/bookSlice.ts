import { createSlice } from "@reduxjs/toolkit";
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../../services/bookService";
import { BookState } from "../../types/bookTypes";

const initialState: BookState = {
  book: null,
  books: [],
  addBookLoading: false,
  addBookError: null,
  getBooksLoading: false,
  getBooksError: null,
  updateBookLoading: false,
  updateBookError: null,
  deleteBookLoading: false,
  deleteBookError: null,
  getBookLoading: false,
  getBookError: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.addBookLoading = true;
        state.addBookError = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.addBookLoading = false;
        state.addBookError = null;
        state.book = action.payload.book;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.addBookLoading = false;
        state.addBookError = action.payload
          ? action.payload.message
          : "An unknown error occurred.";
      })
      .addCase(getBooks.pending, (state) => {
        state.getBooksLoading = true;
        state.getBooksError = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.getBooksLoading = false;
        state.getBooksError = null;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.getBooksLoading = false;
        state.getBooksError = action.payload
          ? (action.payload as { message: string }).message
          : "An unknown error occurred.";
      })
      .addCase(updateBook.pending, (state) => {
        state.updateBookLoading = true;
        state.updateBookError = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.updateBookLoading = false;
        state.updateBookError = null;
        state.book = action.payload.book;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.updateBookLoading = false;
        state.updateBookError = action.payload
          ? (action.payload as { message: string }).message
          : "An unknown error occurred.";
      })
      .addCase(deleteBook.pending, (state) => {
        state.deleteBookLoading = true;
        state.deleteBookError = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.deleteBookLoading = false;
        state.deleteBookError = null;
        action.payload = action.payload;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.deleteBookLoading = false;
        state.deleteBookError = action.payload
          ? (action.payload as { message: string }).message
          : "An unknown error occurred.";
      })

      .addCase(getBook.pending, (state) => {
        state.getBookLoading = true;
        state.getBookError = null;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.getBookLoading = false;
        state.getBookError = null;
        state.book = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.getBookLoading = false;
        state.getBookError = action.payload
          ? (action.payload as { message: string }).message
          : "An unknown error occurred.";
      });
  },
});

export default bookSlice.reducer;
