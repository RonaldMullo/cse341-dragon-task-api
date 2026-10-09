
const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');
const {
  taskValidationRules,
  validate
} = require('../middleware/validation');

// GET all tasks
router.get('/', (req, res, next) => {
  tasksController.getAll(req, res, next);
});

// GET task by ID
router.get('/:id', (req, res, next) => {
  tasksController.getSingle(req, res, next);
});

// POST create task
router.post(
  '/',
  taskValidationRules(),
  validate,
  (req, res, next) => {
    tasksController.create(req, res, next);
  }
);

// PUT update task
router.put(
  '/:id',
  taskValidationRules(),
  validate,
  (req, res, next) => {
    tasksController.update(req, res, next);
  }
);

// DELETE task
router.delete('/:id', (req, res, next) => {
  tasksController.remove(req, res, next);
});

module.exports = router;
