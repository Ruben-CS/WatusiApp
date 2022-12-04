const express = require('express');
const router = express.Router();
const controller = require('../Controllers/administrarController');

router.get('/', controller.get);

router.get('/ObtenerProductos', controller.ObtenerProductos);
router.post('/AgregarProducto', controller.AgregarProducto);
router.post('/ModificarProducto', controller.ModificarProducto);
router.post('/DeshabilitarProducto', controller.DeshabilitarProducto);
router.post('/EliminarProducto', controller.EliminarProducto);
/*router.get('/ObtenerTanques', controller.ObtenerTanques);
router.get('/ObtenerModulos', controller.ObtenerModulos);

router.post('/GuardarTanque', controller.GuardarTanque);
router.post('/GuardarModulo', controller.GuardarModulo);
router.post('/ModificarTanque', controller.ModificarTanque);
router.post('/ModificarModulo', controller.ModificarModulo);*/




module.exports = router;