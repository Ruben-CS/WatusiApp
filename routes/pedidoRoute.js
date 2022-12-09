const express = require('express');
const router = express.Router();
const controller = require('../Controllers/pedidoController');

router.get('/', controller.get);
router.post('/guardarPedido', controller.GuardarPedido);

module.exports = router;