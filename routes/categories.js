
const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

const {
  categoryValidationRules,
  validate
} = require('../middleware/validation');

// GET all categories
router.get('/', categoriesController.getAll);

// GET category by ID
router.get('/:id', categoriesController.getSingle);

// POST create category with validation
router.post(
  '/',
  categoryValidationRules(),
  validate,
  categoriesController.create
);

// PUT update category with validation
router.put(
  '/:id',
  categoryValidationRules(),
  validate,
  categoriesController.update
);

// DELETE category
router.delete('/:id', categoriesController.remove);

module.exports = router;
