const express = require('express');
const router = express.Router();
const controller = require('../Controllers/catalogoController');

router.get('/', controller.get);
router.get('/ObtenerProductosDisponibles', controller.ObtenerProductosDisponibles);

module.exports = router;