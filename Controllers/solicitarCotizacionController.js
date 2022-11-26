const path = require("path");
const catalogoModel = require("../Models/catalogoModel");
//const solicitarCotizacionModel = require('../Models/solicitarCotizacionModel');
//var model = new solicitarCotizacionModel();

module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/solicitarCotizacion.html'));
    },

}
