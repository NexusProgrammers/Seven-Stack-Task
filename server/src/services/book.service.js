import Book from "../models/book.model.js";
import User from "../models/user.model.js";

export const addBookService = async (userId, bookData, image) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const newBookData = {
    ...bookData,
    user: userId,
  };

  if (image) {
    newBookData.image = image.path;
  }

  const newBook = await Book.create(newBookData);

  user.books.push(newBook._id);

  await user.save();

  return { message: "Book Added Successfully", book: newBook };
};

export const updateBookService = async (userId, bookId, updatedBookData, image) => {
  const book = await Book.findOne({ _id: bookId, user: userId });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(bookId, { ...updatedBookData }, { new: true });

  if (!updatedBook) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }

  if (image) {
    updatedBook.image = image.path;
    await updatedBook.save();
  }

  return { message: "Book Updated Successfully", book: updatedBook };
};

export const deleteBookService = async (userId, bookId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  user.books.pull(bookId);

  await user.save();

  const book = await Book.findByIdAndDelete(bookId);

  return { message: "Book Deleted Successfully", book };
};

export const getBookService = async (userId, bookId) => {
  const book = await Book.findOne({ _id: bookId, user: userId });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  return book;
};

export const getBooksService = async (userId) => {
  const books = await Book.find({ user: userId });

  return books;
};
