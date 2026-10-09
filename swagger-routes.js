
const express = require('express');
const app = express();

// Documentation-only routes.
// This file is not used by the running API.

app.get('/categories', (req, res) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get all categories'
  // #swagger.responses[200] = { description: 'Success' }
});

app.get('/categories/:id', (req, res) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get category by ID'
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[400] = { description: 'Invalid ID' }
  // #swagger.responses[404] = { description: 'Category not found' }
});

app.post('/categories', (req, res) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Create a category'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      name: 'University',
      description: 'University tasks',
      color: '#2563EB',
      icon: 'book',
      isActive: true
    }
  } */
  // #swagger.responses[201] = { description: 'Created' }
  // #swagger.responses[400] = { description: 'Validation failed' }
});

app.put('/categories/:id', (req, res) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Update a category'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      name: 'University',
      description: 'University tasks',
      color: '#2563EB',
      icon: 'book',
      isActive: true
    }
  } */
  // #swagger.responses[200] = { description: 'Updated' }
  // #swagger.responses[400] = { description: 'Validation failed' }
  // #swagger.responses[404] = { description: 'Category not found' }
});

app.delete('/categories/:id', (req, res) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Delete a category'
  // #swagger.responses[200] = { description: 'Deleted' }
  // #swagger.responses[400] = { description: 'Invalid ID' }
  // #swagger.responses[404] = { description: 'Category not found' }
});

app.get('/tasks', (req, res) => {
  // #swagger.tags = ['Tasks']
  // #swagger.summary = 'Get all tasks'
  // #swagger.responses[200] = { description: 'Success' }
});

app.get('/tasks/:id', (req, res) => {
  // #swagger.tags = ['Tasks']
  // #swagger.summary = 'Get task by ID'
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[400] = { description: 'Invalid ID' }
  // #swagger.responses[404] = { description: 'Task not found' }
});

app.post('/tasks', (req, res) => {
  // #swagger.tags = ['Tasks']
  // #swagger.summary = 'Create a task'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      title: 'Complete CSE 341 Project',
      description: 'Develop and test the REST API',
      priority: 'High',
      status: 'Pending',
      dueDate: '2026-10-20',
      categoryId: 'REPLACE_WITH_EXISTING_CATEGORY_ID'
    }
  } */
  // #swagger.responses[201] = { description: 'Created' }
  // #swagger.responses[400] = { description: 'Validation failed' }
});

app.put('/tasks/:id', (req, res) => {
  // #swagger.tags = ['Tasks']
  // #swagger.summary = 'Update a task'
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      title: 'Complete CSE 341 Project',
      description: 'Updated task description',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2026-10-20',
      categoryId: 'REPLACE_WITH_EXISTING_CATEGORY_ID'
    }
  } */
  // #swagger.responses[200] = { description: 'Updated' }
  // #swagger.responses[400] = { description: 'Validation failed' }
  // #swagger.responses[404] = { description: 'Task not found' }
});

app.delete('/tasks/:id', (req, res) => {
  // #swagger.tags = ['Tasks']
  // #swagger.summary = 'Delete a task'
  // #swagger.responses[200] = { description: 'Deleted' }
  // #swagger.responses[400] = { description: 'Invalid ID' }
  // #swagger.responses[404] = { description: 'Task not found' }
});
