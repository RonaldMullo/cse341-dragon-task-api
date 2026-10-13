
const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const {
  categoryValidationRules,
  taskValidationRules,
  validate
} = require('../middleware/validation');

async function checkInvalidRequest(method, path, rules) {
  const app = express();
  app.use(express.json());

  app[method](path, rules(), validate, (req, res) => {
    res.status(201).json({ message: 'Unexpected success' });
  });

  const server = app.listen(0);

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const address = server.address();

    const response = await fetch(
      `http://127.0.0.1:${address.port}${path}`,
      {
        method: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }
    );

    const data = await response.json();

    assert.equal(response.status, 400);
    assert.equal(data.message, 'Validation failed');
    assert.ok(Array.isArray(data.errors));
    assert.ok(data.errors.length > 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('Categories POST rejects invalid data with 400', async () => {
  await checkInvalidRequest('post', '/categories', categoryValidationRules);
});

test('Categories PUT rejects invalid data with 400', async () => {
  await checkInvalidRequest('put', '/categories/123', categoryValidationRules);
});

test('Tasks POST rejects invalid data with 400', async () => {
  await checkInvalidRequest('post', '/tasks', taskValidationRules);
});

test('Tasks PUT rejects invalid data with 400', async () => {
  await checkInvalidRequest('put', '/tasks/123', taskValidationRules);
});
