import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'awiful API',
      version: '1.0.0',
      description: 'API documentation for awiful app',
    },
    servers: [
      {
        url: 'https://awiful.onrender.com/api', 
      },
    ],
  },
  apis: ['./routes/*.ts'], // Path to route files
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
