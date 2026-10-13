const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const controller = require('../controllers/comments');
const { commentValidationRules, validate } = require('../middleware/validation');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', requireAuth, commentValidationRules(), validate, controller.create);
router.put('/:id', requireAuth, commentValidationRules(), validate, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
