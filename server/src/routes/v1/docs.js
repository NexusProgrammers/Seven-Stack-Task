import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "../../docs/swaggerDef.js";

const docsRouter = Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/docs/*.yml", "src/routes/v1/*.js"],
});

docsRouter.use("/", swaggerUi.serve);
docsRouter.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

export default docsRouter;
