const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const controller = require('../controllers/projects');
const { projectValidationRules, validate } = require('../middleware/validation');

router.get('/', controller.getAll);
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', requireAuth, projectValidationRules(), validate, controller.create);
router.put('/:id', requireAuth, projectValidationRules(), validate, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
