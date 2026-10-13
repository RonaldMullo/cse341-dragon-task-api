
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


// W06 SWAGGER ENDPOINTS - documentation only; these do not register production routes
app.get('/projects', (req, res) => {
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Get all projects'
  // #swagger.responses[200] = { description: 'Success' }
  res.end();
});
app.post('/projects', (req, res) => {
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Create a Project'
  /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { name: "Website Redesign", description: "Update the website", status: "Active", startDate: "2026-10-12", endDate: "2026-11-12" } } */
  // #swagger.responses[201] = { description: 'Project created' }
  // #swagger.responses[400] = { description: 'Validation failed' }
  res.end();
});
app.get('/projects/{id}', (req, res) => {
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Get Project by ID'
  // #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Project not found' }
  res.end();
});
app.put('/projects/{id}', (req, res) => {
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Update Project'
  // #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { name: "Website Redesign", description: "Update the website", status: "Active", startDate: "2026-10-12", endDate: "2026-11-12" } } */
  // #swagger.responses[400] = { description: 'Validation failed or invalid ID' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Project not found' }
  res.end();
});
app.delete('/projects/{id}', (req, res) => {
  // #swagger.tags = ['Projects']
  // #swagger.summary = 'Delete Project'
  // #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Project not found' }
  res.end();
});
app.get('/comments', (req, res) => {
  // #swagger.tags = ['Comments']
  // #swagger.summary = 'Get all comments'
  // #swagger.responses[200] = { description: 'Success' }
  res.end();
});
app.post('/comments', (req, res) => {
  // #swagger.tags = ['Comments']
  // #swagger.summary = 'Create a Comment'
  /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { taskId: "6ac9285a2a9ddf7df90512f2", author: "Ronald", content: "Progress update" } } */
  // #swagger.responses[201] = { description: 'Comment created' }
  // #swagger.responses[400] = { description: 'Validation failed' }
  res.end();
});
app.get('/comments/{id}', (req, res) => {
  // #swagger.tags = ['Comments']
  // #swagger.summary = 'Get Comment by ID'
  // #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Comment not found' }
  res.end();
});
app.put('/comments/{id}', (req, res) => {
  // #swagger.tags = ['Comments']
  // #swagger.summary = 'Update Comment'
  // #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { taskId: "6ac9285a2a9ddf7df90512f2", author: "Ronald", content: "Progress update" } } */
  // #swagger.responses[400] = { description: 'Validation failed or invalid ID' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Comment not found' }
  res.end();
});
app.delete('/comments/{id}', (req, res) => {
  // #swagger.tags = ['Comments']
  // #swagger.summary = 'Delete Comment'
  // #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Comment not found' }
  res.end();
});
