const express = require('express');
const router = express.Router();
const controller = require('../Controllers/catalogoController');

router.get('/', controller.get);
router.get('/ObtenerProductos', controller.ObtenerProductos);
router.post('/GuardarTanque', controller.GuardarTanque);
router.post('/GuardarModulo', controller.GuardarModulo);
module.exports = router;