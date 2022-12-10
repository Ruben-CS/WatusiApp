const path = require("path");
const pedidoModel = require('../Models/pedidoModel');
var model = new pedidoModel();
module.exports = {
    get: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Views/pedido.html'));
    },
    GuardarPedido: (req, res) => {
        var data_m = {
            idpedido: req.body.idpedido,
            fechasolicitud: req.body.fechasolicitud,
            preciototal: req.body.preciototal,
            estado: req.body.estado,
            kmdesdescz: req.body.kmdesdescz,
            precioenvio: req.body.precioenvio,
            iduser: req.body.iduser,
        };
        var list_data_d = [];
        for (var i = 0; i < req.body.list_data_d.length; i++) {
            var item = req.body.list_data_d[i];
            var data_d = {
                idpedido: item.idpedido,
                idproducto: item.idproducto,
                cantidad: item.cantidad,
                precioproducto: item.precioproducto,
                subtotal: item.subtotal,
            };
            list_data_d.push(data_d);
        }
        if (data_m.idpedido == 0) {
            model.guardarPedido(data_m, list_data_d).then(result => {
                res.type('json');
                res.send({ "Success": true, "Data": data_m, list_data_d });
            }).catch(function (error) {
                res.type('json');
                res.send({ "Success": false, "Mensaje": error.message });
            });
        } else {
            /*model.modificarTipo(data).then(function() {
                res.type('json');
                res.send({ "Success" : true } );    
            }).catch(function(error){
                res.type('json');
                res.send({ "Success" : false, "Mensaje" : error.message } );    
            });*/
        }
    }
}