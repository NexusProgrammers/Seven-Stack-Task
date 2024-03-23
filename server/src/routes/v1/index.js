import { Router } from "express";
import userRouter from "./user.route.js";
import docsRouter from "./docs.js";
import booksRouter from "./books.route.js";

const mainRouter = Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/books",
    route: booksRouter,
  },
  {
    path: "/docs",
    route: docsRouter,
  },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
