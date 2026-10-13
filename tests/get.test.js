const { test, mock } = require('node:test');
const assert = require('node:assert/strict');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const id = '507f1f77bcf86cd799439011';
const collections = ['categories', 'tasks', 'projects', 'comments'];

function response() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; }
  };
}

for (const name of collections) {
  test(`${name}: GET all returns collection records`, async () => {
    const expected = [{ _id: id, name: 'sample' }];
    const collection = { find: mock.fn(() => ({ toArray: async () => expected })) };
    const getDb = mock.method(mongodb, 'getDb', () => ({ collection: (requested) => {
      assert.equal(requested, name);
      return collection;
    } }));
    try {
      const controller = require(`../controllers/${name}`);
      const res = response();
      let error;
      await controller.getAll({}, res, (err) => { error = err; });
      assert.equal(error, undefined);
      assert.equal(res.statusCode, 200);
      assert.deepEqual(res.body, expected);
      assert.equal(collection.find.mock.callCount(), 1);
    } finally { getDb.mock.restore(); }
  });

  test(`${name}: GET by ID returns matching record`, async () => {
    const expected = { _id: new ObjectId(id), name: 'sample' };
    const collection = { findOne: mock.fn(async () => expected) };
    const getDb = mock.method(mongodb, 'getDb', () => ({ collection: (requested) => {
      assert.equal(requested, name);
      return collection;
    } }));
    try {
      const controller = require(`../controllers/${name}`);
      const res = response();
      let error;
      await controller.getSingle({ params: { id } }, res, (err) => { error = err; });
      assert.equal(error, undefined);
      assert.equal(res.statusCode, 200);
      assert.deepEqual(res.body, expected);
      assert.equal(collection.findOne.mock.callCount(), 1);
      assert.equal(collection.findOne.mock.calls[0].arguments[0]._id.toHexString(), id);
    } finally { getDb.mock.restore(); }
  });
}
