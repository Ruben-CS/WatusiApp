const express = require('express');
const router = express.Router();
const controller = require('../Controllers/signInController');

router.get('/', controller.get);
router.post('/Login', controller.Login);
module.exports = router;