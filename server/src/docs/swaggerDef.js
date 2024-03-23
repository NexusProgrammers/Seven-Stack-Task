import { config } from "dotenv";

config();

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    description: "Documentation for the API endpoints",
    version: "1.0.0",
    license: {
      name: "MIT License",
      url: "https://github.com/",
    },
  },
  servers: [
    {
      url: `http://localhost:${process?.env?.PORT || "3000"}/api/v1`,
      description: "Development Server",
    },
  ],
};

export default swaggerDef;
