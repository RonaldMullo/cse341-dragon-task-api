
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dragon Task API',
    description:
      'REST API for managing tasks and categories. CSE 341 Final Project.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Categories',
      description: 'Category management endpoints'
    },
    {
      name: 'Tasks',
      description: 'Task management endpoints'
    }
  ]
};

const outputFile = './swagger.json';

// Generate documentation from a dedicated Swagger routes file
const endpointsFiles = ['./swagger-routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
