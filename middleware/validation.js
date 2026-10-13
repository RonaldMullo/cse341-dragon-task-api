
const { body, validationResult } = require('express-validator');

const categoryValidationRules = () => [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('description')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('color')
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color must be a valid HEX color'),

  body('icon')
    .isString()
    .withMessage('Icon must be a string')
    .trim()
    .notEmpty()
    .withMessage('Icon is required'),

  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  next();
};

const taskValidationRules = () => [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('priority')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),

  body('status')
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid task status'),

  body('dueDate')
    .isISO8601({ strict: true })
    .withMessage('Due date must be a valid ISO 8601 date'),

  
body('categoryId')
  .isMongoId()
  .withMessage('Category ID must be a valid MongoDB ID')
  .bail()
  .custom(async (value) => {
    const { ObjectId } = require('mongodb');
    const mongodb = require('../db/connect');

    const category = await mongodb
      .getDb()
      .collection('categories')
      .findOne({ _id: new ObjectId(value) });

    if (!category) {
      throw new Error('Category does not exist');
    }

    return true;
  })

];




// Week 06: Projects and Comments
const projectValidationRules = () => [
  body('name').isString().withMessage('Name must be a string').trim().notEmpty().withMessage('Name is required'),
  body('description').isString().withMessage('Description must be a string').trim().notEmpty().withMessage('Description is required'),
  body('status').isIn(['Planning', 'Active', 'Completed']).withMessage('Invalid project status'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) throw new Error('End date must not precede start date');
      return true;
    })
];

const commentValidationRules = () => [
  body('taskId').isMongoId().withMessage('Task ID must be a valid MongoDB ID')
    .bail().custom(async (value) => {
      const { ObjectId } = require('mongodb');
      const mongodb = require('../db/connect');
      const task = await mongodb.getDb().collection('tasks').findOne({ _id: new ObjectId(value) });
      if (!task) throw new Error('Task does not exist');
      return true;
    }),
  body('author').isString().withMessage('Author must be a string').trim().notEmpty().withMessage('Author is required'),
  body('content').isString().withMessage('Content must be a string').trim().notEmpty().withMessage('Content is required')
];
module.exports = { categoryValidationRules, taskValidationRules, projectValidationRules, commentValidationRules, validate };
