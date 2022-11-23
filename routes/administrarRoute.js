const express = require('express');
const router = express.Router();
const controller = require('../Controllers/administrarController');

router.get('/', controller.get);
router.post('/GuardarTanque', controller.GuardarTanque);
router.post('/GuardarModulo', controller.GuardarModulo);

module.exports = router;