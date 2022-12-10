const express = require('express');
const router = express.Router();
const controller = require('../Controllers/administrarPedidoController');

router.get('/', controller.get);
router.get('/ObtenerPedidos', controller.ObtenerPedidos);
router.post('/ChangeStatus', controller.ChangeStatus);


module.exports = router;