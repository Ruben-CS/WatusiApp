const express = require('express');
const router = express.Router();
const controller = require('../Controllers/administrarController');

router.get('/', controller.get);

module.exports = router;