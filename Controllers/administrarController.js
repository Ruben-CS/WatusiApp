const path = require("path");
const administrarModel = require('../Models/administrarModel');
var model = new administrarModel();
module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/administrar.html'));
    },
    ObtenerProductos: (req, res) => {
        model.obtenerProductos().then(function (data) {
            res.type('json');
            res.send({ "Success": true, "Data": data });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    },
    GuardarTanque: (req, res) => {
        var data = {
            idproducto: req.body.idproducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            estado: req.body.estado,
            tipo: req.body.tipo,
            capacidadlitros: req.body.capacidadlitros,
            diametro: req.body.diametro,
            volumen: req.body.volumen,
            espesor: req.body.espesor
        };
        model.guardarTanque(data).then(result => {
            res.type('json');
            res.send({ "Success": true, "Data": result.idproducto });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    },
    GuardarModulo: (req, res) => {
        var data = {
            idproducto: req.body.idproducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            estado: req.body.estado,
            tipo: req.body.tipo,
            medida: req.body.medida,
            cantpersonas: req.body.cantpersonas,
            cantpuertas: req.body.cantpuertas,
            cantventanas: req.body.cantventanas
        };
        model.guardarModulo(data).then(result => {
            res.type('json');
            res.send({ "Success": true, "Data": result.idproducto });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    },
    DeshabilitarProducto: (req, res) => {
        var data = {
            idproducto: req.body.idproducto,
            estado: req.body.estado
        };
        model.deshabilitarProducto(data).then(function () {
            res.type('json');
            res.send({ "Success": true });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    },
    EliminarProducto: (req, res) => {
        var data = { idproducto: req.body.idproducto };
        model.eliminarProducto(data).then(function () {
            res.type('json');
            res.send({ "Success": true });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    }
}
