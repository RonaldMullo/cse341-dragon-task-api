
const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const {
  projectValidationRules,
  commentValidationRules,
  validate
} = require('../middleware/validation');

const VALID_ID = '507f1f77bcf86cd799439011';

// Simulated database for validation tests
const originalGetDb = mongodb.getDb;

mongodb.getDb = () => ({
  collection: () => ({
    findOne: async () => ({ _id: new ObjectId(VALID_ID) })
  })
});

async function checkValidation(rules, method, path, body) {
  const app = express();
  app.use(express.json());

  app[method](path, rules(), validate, (req, res) => {
    res.status(200).json({ message: 'Valid data' });
  });

  const server = app.listen(0);

  try {
    const port = server.address().port;

    const response = await fetch(
      `http://127.0.0.1:${port}${path}`,
      {
        method: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    return {
      status: response.status,
      body: await response.json()
    };
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

test('Projects POST rejects invalid data with 400', async () => {
  const result = await checkValidation(
    projectValidationRules,
    'post',
    '/projects',
    {}
  );

  assert.equal(result.status, 400);
  assert.equal(result.body.message, 'Validation failed');
});

test('Projects PUT rejects invalid data with 400', async () => {
  const result = await checkValidation(
    projectValidationRules,
    'put',
    '/projects/123',
    {
      name: 'Test Project',
      description: 'Testing validation',
      status: 'Invalid',
      startDate: '2026-10-12',
      endDate: '2026-10-10'
    }
  );

  assert.equal(result.status, 400);
  assert.equal(result.body.message, 'Validation failed');
});

test('Comments POST rejects invalid data with 400', async () => {
  const result = await checkValidation(
    commentValidationRules,
    'post',
    '/comments',
    {
      taskId: 'invalid',
      author: '',
      content: ''
    }
  );

  assert.equal(result.status, 400);
  assert.equal(result.body.message, 'Validation failed');
});

test('Comments PUT rejects invalid data with 400', async () => {
  const result = await checkValidation(
    commentValidationRules,
    'put',
    '/comments/123',
    {
      taskId: VALID_ID,
      author: '',
      content: ''
    }
  );

  assert.equal(result.status, 400);
  assert.equal(result.body.message, 'Validation failed');
});

test.after(() => {
  mongodb.getDb = originalGetDb;
});
