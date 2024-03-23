import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import bookReducer from "../slices/bookSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export default store;
