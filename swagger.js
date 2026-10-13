
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dragon Task API',
    description:
      'REST API for managing categories, tasks, projects and comments. CSE 341 Final Project.',
    version: '1.0.0'
  },
  host: 'cse341-dragon-task-api.onrender.com',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Categories', description: 'Category management endpoints' },
    { name: 'Tasks', description: 'Task management endpoints' },
    { name: 'Projects', description: 'Project management endpoints' },
    { name: 'Comments', description: 'Comment management endpoints' }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./swagger-routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
