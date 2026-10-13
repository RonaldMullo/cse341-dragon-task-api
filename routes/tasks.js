
const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');
const {
  taskValidationRules,
  validate
} = require('../middleware/validation');

// GET all tasks
router.get('/', tasksController.getAll);

// GET task by ID
router.get('/:id', tasksController.getSingle);

// POST create task
router.post(
  '/',
  taskValidationRules(),
  validate,
  tasksController.create
);

// PUT update task
router.put(
  '/:id',
  taskValidationRules(),
  validate,
  tasksController.update
);

// DELETE task
router.delete('/:id', tasksController.remove);

module.exports = router;
