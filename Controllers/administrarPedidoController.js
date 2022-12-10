const path = require("path");
const pedidoModel = require('../Models/pedidoModel');
var model = new pedidoModel();
module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/administrarPedido.html'));
    },
    ObtenerPedidos: (req, res) => {
        model.obtenerPedidos().then(function (data) {
            res.type('json');
            res.send({ "Success": true, "Data": data });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    },
    ChangeStatus: (req, res) => {
        var data = {
            idpedido: req.body.idpedido,
            estado: req.body.estado
        };
        model.changeStatus(data).then(function () {
            res.type('json');
            res.send({ "Success": true });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });
    },
}