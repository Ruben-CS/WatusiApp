const express = require('express');
const router = express.Router();
const controller = require('../Controllers/solicitarCotizacionController.js');

router.get('/', controller.get);
module.exports = router;