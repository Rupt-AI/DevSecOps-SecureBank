const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SecureBank API",
      version: "1.0.0",
      description:
        "Enterprise Secure Banking System",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },

  apis: ["./src/modules/**/*.routes.js"],
};

const swaggerSpec =
  swaggerJSDoc(options);

module.exports = swaggerSpec;