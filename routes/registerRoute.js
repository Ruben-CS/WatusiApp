const express = require('express');
const router = express.Router();
const controller = require('../Controllers/registerController');

router.get('/', controller.get);
router.post('/GuardarUsuario', controller.GuardarUsuario);
module.exports = router;