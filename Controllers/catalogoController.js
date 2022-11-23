const path = require("path");
const catalogoModel = require('../Models/catalogoModel');
var model = new catalogoModel();
module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/catalogo.html'));
    },
    ObtenerProductos: (req, res) => {
        model.obtenerProductos().then(function (data) {
            res.type('json');
            res.send({ "Success": true, "Data": data });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    }
}