
const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');
const {
  categoryValidationRules,
  validate
} = require('../middleware/validation');

// GET all categories
router.get('/', (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get all categories'
  categoriesController.getAll(req, res, next);
});

// GET category by ID
router.get('/:id', (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get category by ID'
  categoriesController.getSingle(req, res, next);
});

// POST create category
router.post(
  '/',
  categoryValidationRules(),
  validate,
  (req, res, next) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Create a new category'
    categoriesController.create(req, res, next);
  }
);

// PUT update category
router.put(
  '/:id',
  categoryValidationRules(),
  validate,
  (req, res, next) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Update a category'
    categoriesController.update(req, res, next);
  }
);

// DELETE category
router.delete('/:id', (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Delete a category'
  categoriesController.remove(req, res, next);
});

module.exports = router;
