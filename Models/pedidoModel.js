const dao = require("./dao");
const objDao = new dao();

class pedidoModel {
    constructor() {
    }
    guardarPedido(data_pedido, list_data_d) {
        var sql_m = 'INSERT INTO pedido (fechasolicitud, preciototal, estado, kmdesdescz, precioenvio, iduser) VALUES($1,$2,$3,$4,$5,$6) RETURNING idpedido';

        var params_m = [data_pedido.fechasolicitud, data_pedido.preciototal, data_pedido.estado, data_pedido.kmdesdescz, data_pedido.precioenvio, data_pedido.iduser];

        var sql_d = 'INSERT INTO detallepedido (idpedido, idproducto,cantidad, precioproducto, subtotal) VALUES($1,$2,$3,$4,$5)';
        var list_params_d = [];

        list_data_d.forEach(data_d => {
            var elem = [0, data_d.idproducto, data_d.cantidad, data_d.precioproducto, data_d.subtotal];
            list_params_d.push(elem);
        });
        return objDao.master_detail(sql_m, sql_d, params_m, list_params_d);
    }
    /*guardarNota(data_n, list_data_d) {
        var sql_m = 'INSERT INTO nota_venta(Fecha, Descripcion, Cliente, Total ) VALUES($1,$2,$3,$4) RETURNING idNotaVenta';
        var params_m = [data_n.fecha, data_n.descripcion, data_n.cliente, data_n.total];
        var sql_d = 'INSERT INTO detalle_venta(IdNotaVenta, IdProducto, Cantidad, Precio, Subtotal ) VALUES($1,$2,$3,$4,$5) ';
        var list_params_d = [];
        list_data_d.forEach(data_d => {
            var elem = [0, data_d.idproducto, data_d.cantidad, data_d.precio, data_d.subtotal];
            list_params_d.push(elem);
        });
        return objDao.master_detail(sql_m, sql_d, params_m, list_params_d);
    }*/
}

module.exports = pedidoModel;