import { Router } from "express";
import {
  signInValidator,
  signUpValidator,
  updateAccountValidator,
} from "../../validations/user.validator.js";
import {
  changePassword,
  getProfile,
  signIn,
  signUp,
  updateAccount,
} from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import upload from "../../utils/uploadFile.js";

const userRouter = Router();

userRouter.post("/signup", signUpValidator, signUp);

userRouter.post("/signin", signInValidator, signIn);

userRouter.use(authMiddleware);

userRouter.patch("/update/account", updateAccountValidator, upload.single("image"), updateAccount);

userRouter.put("/update/password", changePassword);

userRouter.get("/profile", getProfile);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API Related User
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign Up User
 *     description: Sign up endpoint for user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Sign In User
 *     description: Sign in endpoint for user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: john1234
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /users/update/account:
 *   patch:
 *     summary: Update user account
 *     description: Update user account details including name, email, image, and phone number.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the user (optional).
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email address for the user (optional).
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image for the user (optional).
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/update/password:
 *   put:
 *     summary: Update user password
 *     description: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldpassword
 *               newPassword:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Change Successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
