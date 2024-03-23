import expressAsyncHandler from "express-async-handler";
import httpStatus from "http-status";
import {
  addBookService,
  deleteBookService,
  getBookService,
  getBooksService,
  updateBookService,
} from "../services/book.service.js";

export const addBook = expressAsyncHandler(async (req, res) => {
  try {
    const bookData = req.body;
    const userId = req.user._id;
    const image = req.file;
    const book = await addBookService(userId, bookData, image);
    return res.status(httpStatus.CREATED).json(book);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const updateBook = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;
    const updatedBookData = req.body;
    const image = req.file;
    const updatedBook = await updateBookService(userId, bookId, updatedBookData, image);
    return res.status(httpStatus.OK).json(updatedBook);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const deleteBook = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;
    const book = await deleteBookService(userId, bookId);
    return res.status(httpStatus.OK).json(book);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const getBook = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;
    const book = await getBookService(userId, bookId);
    return res.status(httpStatus.OK).json(book);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

export const getBooks = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const books = await getBooksService(userId);
    return res.status(httpStatus.OK).json(books);
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});
