
const express = require('express');
const router = express.Router();

router.use('/categories', require('./categories'));
router.use('/tasks', require('./tasks'));

module.exports = router;
