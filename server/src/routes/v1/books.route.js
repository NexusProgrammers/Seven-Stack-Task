import { Router } from "express";
import { addBookValidator } from "../../validations/book.validator.js";
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../../controllers/book.controller.js";
import upload from "../../utils/uploadFile.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const booksRouter = Router();

booksRouter.use(authMiddleware);

booksRouter.post("/add", upload.single("image"), addBook);

booksRouter.patch("/update/:bookId", upload.single("image"), updateBook);

booksRouter.delete("/delete/:bookId", deleteBook);

booksRouter.get("/get-one/:bookId", getBook);

booksRouter.get("/get-all", getBooks);

export default booksRouter;

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: API Related Book
 */

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add Book
 *     description: Add a new book with title, description, and image.
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               description:
 *                 type: string
 *                 description: The description of the book.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the book cover.
 *     responses:
 *       "201":
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       "400":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /books/update/{bookId}:
 *   patch:
 *     summary: Update Book
 *     description: Update a book by its ID.
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the book.
 *               description:
 *                 type: string
 *                 description: The new description of the book.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new image file of the book cover.
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /books/delete/{bookId}:
 *   delete:
 *     summary: Delete Book
 *     description: Delete a book by its ID.
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /books/get-one/{bookId}:
 *   get:
 *     summary: Get Book by ID
 *     description: Retrieve a single book by its ID.
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /books/get-all:
 *   get:
 *     summary: Get All Books
 *     description: Retrieve all books.
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
