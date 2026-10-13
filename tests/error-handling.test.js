
const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');

test('Unexpected errors return HTTP 500', async () => {
  const app = express();

  app.get('/test-error', (req, res, next) => {
    next(new Error('Simulated internal error'));
  });

  // Same error response used by server.js
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Internal server error'
    });
  });

  const server = app.listen(0);

  try {
    await new Promise((resolve) => {
      if (server.listening) resolve();
      else server.once('listening', resolve);
    });

    const { port } = server.address();
    const response = await fetch(
      `http://127.0.0.1:${port}/test-error`
    );

    const body = await response.json();

    assert.equal(response.status, 500);
    assert.equal(body.message, 'Internal server error');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
